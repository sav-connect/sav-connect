const db = require('../dbConnect');

module.exports = class Action {

    id;
    name;
    created_at;
    updated_at;

    constructor(params) {
        if(params.id) { this.id = params.id }
        if(params.name) { this.name = params.name}
        if(params.created_at) { this.created_at = params.created_at }
        if(params.updated_at) { this.updated_at = params.updated_at }
    }

    /**
     * Save action
     */
    async save() {
        try {
            const query = 'INSERT INTO "action" (name) VALUES($1) RETURNING *;';
            const values = [this.name];
            const result = await db.query(query, values);
            if(result.rowCount == 1){
                this.id = result.rows[0].id;
                this.created_at = result.rows[0].created_at;
                return this;
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
            const query = 'SELECT * FROM "action" WHERE "archive"=0;';
            const result = await db.query(query);
            if(result.rowCount < 1){
                return {"message": "Pas de résultat."};
            }
            return result.rows;
        } catch (error) {
            console.log(error);
            return false;
        }
    }
    /**
     * Search one action by ID
     * @param {id} id int  
     */
    static async findOne(id) {
        try {
            if(!id) { false };
            const query = 'SELECT * FROM "action" WHERE id=$1;';
            const values = [id];
            const result = await db.query(query, values);
            if(result.rowCount == 1) {
                return result.rows[0];
            }else{
                return {"message": "Pas de résultat."};
            }
        } catch (error) {
            console.log(error);
            return res.send(error);
        }
    }

    /**
     * Edit action
     * @param {id} id 
     * @param {name} name 
     */
    static async edit(id, name) {
        try {
            const query = 'UPDATE "action" SET name=$1, updated_at=now() WHERE id=$2 RETURNING *;';
            const values = [name, id];
            const result = await db.query(query, values);
            if(result.rowCount == 1){
                return result.rows[0];
            }else {
                return false;
            }
        } catch (error) {
            console.log(error);
            return res.send(error);
        }
    }

    static async addActionOnSav(idAction, idSav, idUser) {
        try {
            const query = 'INSERT INTO "order_repair_action" (order_repair_id, action_id, user_id) VALUES ($1, $2, $3);';
            const values = [idSav, idAction, idUser];
            const result = await db.query(query, values);
            if(result.rowCount == 1){
                return true;
            }else {
                return false;
            }
        } catch (error) {
            console.log(error);
            return false;
        }
    }

    static async allActionsOnSav(){
        try {
            const query = 'SELECT name, "order_repair".order_number, "user".lastname, "user".firstname ,"order_repair_action".created_at FROM "action" JOIN "order_repair_action" ON "order_repair_action".action_id="action".id JOIN "order_repair" ON "order_repair".id="order_repair_action".order_repair_id JOIN "user" ON "user".id="order_repair_action".user_id ORDER BY "order_repair_action".created_at DESC LIMIT 20;'
            const result = await db.query(query);
            if(result.rowCount == 0) {
                return false;
            }else{
                return result.rows;
            }
        } catch (error) {
            console.log(error);
            return false;
        }
    }

};

