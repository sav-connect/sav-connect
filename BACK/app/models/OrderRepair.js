const db = require('../dbConnect');

const Tag = require('./Tag');
const ConfigPanne = require('./ConfigPanne');
const Customer = require('./Customer');

module.exports = class OrderRepair {

    id;
    order_number;
    picture;
    device_name;
    device_brand;
    date_enter;
    interval_repair;
    actif;
    urgent;
    customer_id;
    created_at;
    updated_at;

    device_model;
    panne;
    intervention;
    date_intervention;
    date_devis;
    amount_devis;
    amount_diag;
    amount;
    recall_devis;
    recall_finish;

    constructor(params) {
        if(params.id) { this.id = params.id }
        if(params.order_number) { this.order_number = params.order_number}
        if(params.picture) { this.picture = params.picture}
        if(params.device_name) { this.device_name = params.device_name}
        if(params.device_brand) { this.device_brand = params.device_brand}
        if(params.date_enter) { this.date_enter = params.date_enter}
        if(params.interval_repair) { this.interval_repair = params.interval_repair}
        if(params.actif) { this.actif = params.actif}
        if(params.urgent) { this.urgent = params.urgent}
        if(params.customer_id) { this.customer_id = params.customer_id}
        if(params.created_at) { this.created_at = params.created_at }
        if(params.updated_at) { this.updated_at = params.updated_at }

        if(params.device_model) { this.device_model = params.device_model }
        if(params.panne) { this.panne = params.panne }
        if(params.intervention) { this.intervention = params.intervention }
        if(params.date_intervention) { this.date_intervention = params.date_intervention }
        if(params.date_devis) { this.date_devis = params.date_devis }
        if(params.amount_devis) { this.amount_devis = params.amount_devis }
        if(params.amount_diag) { this.amount_diag = params.amount_diag }
        if(params.amount) { this.amount = params.amount }
        if(params.recall_devis) { this.recall_devis = params.recall_devis }
        if(params.recall_finish) { this.recall_finish = params.recall_finish }
    }

    static async getStepFive(order_number) {
        try {
            const query = `
            SELECT 	"order_repair".id,
                    "order_repair".order_number,
                    "order_detail".devis_is_accepted,
                    "order_detail".date_devis,
                    "order_detail".amount_diag,
                    "order_detail".amount_devis,
                    "order_detail".recall_devis
            FROM "order_repair"
            JOIN "order_detail"
            ON "order_detail"."order_number_id"="order_repair"."order_number"
            WHERE order_number=$1 LIMIT 1;
            `;
            const values = [order_number];
            const result = await db.query(query,values);

            result.rowCount != 1 ? false : '';

            return result.rows;


        } catch (error) {
            console.log(error);
            return false;
        }
    }

    static async getStepFourDelete(data) {
        try {
            const queryRelation = 'DELETE FROM "order_repair_gallery" WHERE "gallery_id"=$1;';
            const valuesRelation = [data.idGallery];

            const result = await db.query(queryRelation, valuesRelation);
            
            result.rowCount != 1 ? false : '';

            const queryGallery = 'DELETE FROM "gallery" WHERE id=$1;';
            const valuesGallery = [data.idGallery];

            const resultGallery = await db.query(queryGallery, valuesGallery);

            resultGallery.rowCount != 1 ? false : '';

            return true;

        } catch (error) {
            console.log(error);
            return false;
        }
    }

    static async getStepFour(order_number) {
        try {
            const query = `
                SELECT "gallery".*, "order_repair_gallery".order_repair_id  FROM "gallery"
                JOIN "order_repair_gallery"
                ON "order_repair_gallery".gallery_id="gallery".id
                WHERE "order_repair_gallery".order_repair_id=$1;
            `;

            const values = [order_number];
            const result = await db.query(query,values);

            result.rowCount != 1 ? false : '';

            return result.rows;

        } catch (error) {
            console.log(error);
            return false;
        }
    }

    static async postStepFour(data) {
        try {
            const query = 'INSERT INTO "gallery" ("title") VALUES ($1) RETURNING *;'
            const values = [data.name];
            const result = await db.query(query, values);

            result.rowCount !== 1 ? false : '';

            const galleryId = result.rows[0].id;

            const queryRelation = 'INSERT INTO "order_repair_gallery" ("gallery_id", "order_repair_id", "user_id") VALUES ($1, $2, $3);';
            const valuesRelation = [galleryId, data.order_number, data.userId];
            const resultRelation = await db.query(queryRelation, valuesRelation);

            result.rowCount !== 1 ? false : '';

            return {
                title: result.rows[0].title,
                id: result.rows[0].id
            };

        } catch (error) {
            console.log(error);
            return false;
        }
    }

    static async patchStepFive(data) {
        try {

            
            const query = `UPDATE "order_detail" SET
            devis_is_accepted=$1,
            date_devis=$2,
            amount_devis=$3,
            amount_diag=$4,
            recall_devis=$5
            WHERE order_number_id=$6
            RETURNING *;`;

            const values = [
                data.devis_is_accepted,
                data.date_devis,
                data.amount_devis,
                data.amount_diag,
                data.recall_devis,
                data.order_number
            ];

            const result = await db.query(query, values);

            !result.rowCount == 1 ? false : '';

            return true;

        } catch (error) {
            console.trace(error);
            return false;
        }
    }

    static async getStepThree(order_number) {
        try {
            const query = `
            SELECT 	"order_repair".id,
                    "order_repair".order_number,
                    "order_detail".intervention,
                    "order_detail".date_intervention
            FROM "order_repair"
            JOIN "order_detail"
            ON "order_detail"."order_number_id"="order_repair"."order_number"
            WHERE order_number=$1 LIMIT 1;
            `;
            const values = [order_number];
            const result = await db.query(query,values);

            result.rowCount != 1 ? false : '';

            return result.rows;


        } catch (error) {
            console.log(error);
            return false;
        }
    }

    static async patchStepThree(data) {
        try {
            const query = 'UPDATE "order_detail" SET intervention=$1, date_intervention=$2 WHERE order_number_id=$3 RETURNING *;';
            const values = [data.intervention, data.date_intervention, data.order_number];
            const result = await db.query(query, values);

            !result.rowCount == 1 ? false : '';

            return true;

        } catch (error) {
            console.log(error);
            return false;
        }
    }

    static async getStepTwo(order_number) {
        try {
            const query = `
            SELECT 	"order_repair".id,
                    "order_repair".order_number,
                    "order_repair".device_brand,
                    "order_repair".interval_repair,
                    "order_detail".panne
            FROM "order_repair"
            JOIN "order_detail"
            ON "order_detail"."order_number_id"="order_repair"."order_number"
            WHERE order_number=$1 LIMIT 1;
            `;
            const values = [order_number];
            const result = await db.query(query,values);
            result.rowCount != 1 ? false : '';

            return result.rows;

        } catch (error) {
            console.log(error);
            return false;
        }
    }

    static async patchStepTwo(data) {
        try {
            const query = 'UPDATE "order_repair" SET device_brand=$1, interval_repair=$2 WHERE order_number=$3 RETURNING *;';
            const values = [data.device_brand, data.interval_repair, data.order_number];
            const result = await db.query(query, values);

            if(result.rowCount !== 1) {
                return false;
            }

            const queryDetail = 'UPDATE "order_detail" SET panne=$1 WHERE order_number_id=$2 RETURNING *;';
            const valuesDetail = [data.panne, data.order_number];
            const resultDetail = await db.query(queryDetail, valuesDetail);

            if(resultDetail.rowCount !== 1){
                return false;
            }

            return true;

        } catch (error) {
            console.log(error);
            return false;
        }
    }

    static async getStepOne(order_number) {
        try {
            const query = `
            SELECT "order_repair".id, "order_repair".order_number, "order_repair".device_name, "customer".firstname, "customer".lastname, "customer".mail, "customer".phone, "customer".phone_two, "customer".customer_detail 
            FROM "order_repair"
            JOIN "customer"
            ON "customer".id="order_repair".customer_id
            WHERE order_number=$1 LIMIT 1;
            `;
            const values = [order_number];
            const result = await db.query(query, values);
            if(result.rowCount !== 1){
                return false;
            }

            return result.rows;

        } catch (error) {
            console.log(error);
            return false;
        }
    }


    static async postStepOne(data){
        try {
            const query = 'INSERT INTO "order_repair" (customer_id, device_name, date_enter) VALUES ($1, $2, now()) RETURNING *;';
            const values = [data.customer_id, data.device_name];
            const result = await db.query(query, values);
            if(result.rowCount !== 1){
                return false;
            }
        
            const order_number = result.rows[0].order_number;
            const id = result.rows[0].id;
            const queryOrderDetail = 'INSERT INTO "order_detail" (order_number_id) VALUES ($1) RETURNING *;';
            const valuesOrderDetail = [order_number];
            const resultOrderDetail = await db.query(queryOrderDetail, valuesOrderDetail);
            if(result.rowCount !== 1){
                return false;
            }
            return {
                order_number,
                id
            };

        } catch (error) {
            console.log(error);
            return false;
        }
    }

    /**
     * Save product
     */
    async save() {
        try {
            const query = 'INSERT INTO "order_repair" (picture, device_name, device_brand, date_enter, interval_repair, urgent, customer_id) VALUES($1, $2, $3, now(), $4, $5, $6) RETURNING *;';
            const values = [
                this.picture,
                this.device_name,
                this.device_brand,
                this.interval_repair,
                this.urgent,
                this.customer_id
            ];
            
            const result = await db.query(query, values);
            if(result.rowCount == 1){
                this.id = result.rows[0].id;
                this.order_number = result.rows[0].order_number;
                this.created_at = result.rows[0].created_at;

                return this;
            }else{
                return false;
            }
        } catch (error) {
            console.log(error);
            const errMessage = {
                "error" : error.detail
            }
            return errMessage;
        }
    }

    static async addUserInSav(idSav, idUser) {
        try {
            const query = 'INSERT INTO "order_repair_user" (user_id, order_repair_id) VALUES ($1, $2);';
            const values = [idUser, idSav];
            const result = await db.query(query,values);
            if(result.rowCount == 1){
                return true;
            }else{
                return false;
            }
        } catch (error) {
            console.log(error);
            return false;
        }
    }

    /**
     * FindALL 
     */
    static async findAll() {
        try {
            const query = 'SELECT * FROM "order_repair";';
            const result = await db.query(query);

            for(let i = 0; i < result.rowCount; i++){
                const tags = await Tag.tagBySav(result.rows[i].id);
                result.rows[i].tags = tags;
                const customer = await Customer.findOne(result.rows[i].customer_id);
                result.rows[i].customer = customer;
            }

            if(result.rowCount < 1){
                return {"message": "Pas de résultat."};
            }
            return result.rows;
        } catch (error) {
            console.log(error);
            const errMessage = {
                "error" : error.detail
            }
            return errMessage;
        }
    }
    /**
     * Search one product by ID
     * @param {id} id int  
     */
    static async findOne(id) {
        try {
            if(!id) { false };
            const query = 'SELECT * FROM "order_repair" LEFT JOIN "order_detail" ON "order_repair".order_number="order_detail".order_number_id WHERE "order_repair".id=$1;';
            const values = [id];
            const result = await db.query(query, values);

            if(result.rowCount == 1) {
                const tags = await Tag.tagBySav(result.rows[0].id);
                result.rows[0].tags = tags;
                const configPannes = await ConfigPanne.configPanneBySav(result.rows[0].id);
                result.rows[0].config_pannes = configPannes;
                const customer = await Customer.findOne(result.rows[0].customer_id);
                result.rows[0].customer = customer;
                return result.rows[0];
            }else{
                return {"message": "Pas de résultat."};
            }
        } catch (error) {
            console.log(error);
            return {"error": "Une erreur s'est produites. Contacter le technicien."};
        }
    }

    static async paginate(limit, offset, actif){
        try {
            const query = `
            SELECT * from "savs"
            WHERE actif=$1
            ORDER BY "date_enter" 
            DESC 
            LIMIT $2 
            OFFSET $3;
            `;
            const values = [actif,limit, offset];
            const result = await db.query(query,values);
            if(result.rows){
                return result.rows;
            }else{
                return false;
            }
        } catch (error) {
            console.log(error);
            return false;
        }
    }
    

    static async countOrderRepair(actif) {
        try {
            const query = 'SELECT count(id) FROM "order_repair" WHERE actif=$1;';
            const values = [actif];
            const result = await db.query(query, values);
            if(result.rows[0].count){
                return result.rows[0].count;
            }else{
                return false;
            }
        } catch (error) {
            console.log(error);
            return false;
        }
    }

    /**
     * Edit product
     * @param {id} id 
     * @param {name} name 
     */
    async edit() {
        try {

            this.actif = parseInt(this.actif, 10);
            this.urgent = parseInt(this.urgent, 10);
            this.recall_devis = parseInt(this.recall_devis, 10);
            this.recall_finish = parseInt(this.recall_finish, 10);


            const queryRepair = 'UPDATE "order_repair" SET device_name=$1, device_brand=$2, urgent=$3, interval_repair=$4, updated_at=now() WHERE order_number=$5;';
            const valuesRepair = [this.device_name, this.device_brand, this.urgent, this.interval_repair, this.order_number];
            const resultRepair = await db.query(queryRepair, valuesRepair);

            const queryIfDetail = 'SELECT * FROM "order_detail" WHERE "order_number_id"=$1;';
            const valuesIfDetail = [this.order_number];
            const resultIfDetail = await db.query(queryIfDetail, valuesIfDetail);

            if(resultIfDetail.rowCount == 1){
                // UPDATE
                const queryDetail = 'UPDATE "order_detail" SET panne=$1, intervention=$2, date_intervention=$3, date_devis=$4, amount=$5, amount_devis=$6, recall_devis=$7, recall_finish=$8 WHERE order_number_id=$9;';
                const valuesDetail = [this.panne, this.intervention, this.date_intervention, this.date_devis, this.amount, this.amount_devis, this.recall_devis, this.recall_finish, this.order_number];
                const result = await db.query(queryDetail, valuesDetail);
                if(result.rowCount == 1) {
                    return true;
                }else{
                    return false;
                }
            }else{
                // INSERT
                const queryDetail = 'INSERT INTO "order_detail" (panne, intervention, date_intervention, date_devis, amount, amount_devis, recall_devis, recall_finish, order_number_id) VALUES ($1,$2,$3,$4,$5,$6,$7,$8,$9::text);';
                const valuesDetail = [this.panne, this.intervention, this.date_intervention, this.date_devis, this.amount, this.amount_devis, this.recall_devis, this.recall_finish, this.order_number];
                const result = await db.query(queryDetail, valuesDetail);
                if(result.rowCount == 1){
                    return true;
                }else{
                    return false;
                }
            }
        } catch (error) {
            const errMessage = {
                "error" : error.detail
            }
            return errMessage;
        }
    }

    static async archive(id) {
        try {
            const query = 'UPDATE "order_repair" SET actif=0, updated_at=now() WHERE id=$1;';
            const values = [id];
            const result = await db.query(query, values);
            if(result.rowCount == 1) {
                return true;
            }else{
                return false;
            }
        } catch (error) {
            console.log(error);
            return error;
        }
    }

    static async search(search) {
        try {
            const query = 'SELECT "order_repair".id ,order_number, device_name, device_brand, date_enter, actif, urgent, "customer".lastname, "customer".firstname FROM "order_repair" JOIN "customer" ON "customer".id="order_repair".customer_id WHERE lower(order_number) LIKE $1 OR lower(device_name) LIKE $1 LIMIT 10;';
            const values = ['%'+search+'%'];
            const result = await db.query(query, values);

            return result.rows;
        } catch (error) {
            console.log(error);
            return error;
        }
    }

};

