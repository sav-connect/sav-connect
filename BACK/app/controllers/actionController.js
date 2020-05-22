/// TAG CONTROLLER
const Action = require('../models/Action');
const jwt = require('../utils/jwt.utils');

module.exports = actionController = {

    /**
     * FindAll Actions
     */
    findAll: async (req, res) => {
        try {
            // I search all actions on data
            const actions = await Action.findAll();
            if(actions) {
                // If i result, i send all actions
                return res.send(actions);
            }else{
                // or i send an error
                return res.status(403).send({"error" : "Une erreur s'est produite."});
            }
        } catch (error) {
            console.log(error);
            res.send(error);
        }
    },

    /**
     * FindOne for select one action
     */
    findOne: async (req, res) => {
        try {
            const id = req.params.id;
            // If no id, i send an error with message
            if(!id) {
                return res.status('403').send({"error": "Il vous manque un paramètre pour effectuer votre demande."});
            }
            // I search this action with id
            const action = await Action.findOne(id);
            if(action == false) {
                return res.send({"error": "Pas de résultat trouvé."});
            }
            return res.send(action);
        } catch (error) {
            console.log(error);
            return res.send(error);
        }
    },

    /**
     * SAVE Action
     */
    add: async (req, res) => {
        try {
            const {name} = req.body;
            // Check exist name
            if(name) {
                const action = new Action({
                    name
                });
                // Save this new action
                const result = await action.save();
                // is the result is good
                if(result !== false){
                    // Send data for the new action
                    return res.send(result);
                }else{
                    // or send an error with status code 403
                    return res.status(403).send({"error": "Une erreur s'est produite lors de la sauvegarde du Action."});
                }
            }
            return res.status(403).send({"error": "Vous n'avez pas complété tous les champs."});
        } catch (error) {
            console.log(error);
            res.status(403).send(error);
        }
    },

    /**
     * Edit Action
     */
    edit: async (req, res) => {
        try {
            const id = req.params.id;
            // If no id, i send an error with message
            if(!id) {
                return res.status('403').send({"error": "Il vous manque un paramètre pour effectuer votre demande."});
            }

            let { name } = req.body;

            // I search this action with id
            const action = await Action.findOne(id);
            if(action == false) {
                return res.send({"error": "Pas de résultat trouvé pour éditer le action."});
            }
            // if not body params i save hold values
            if(!name) {
                name = action.name;
            }

            // edit action with class
            const result = await Action.edit(action.id, name);
            if(result == false) {
                return res.status(403).send({"error": "Une erreur s'est produite lors de la modification du Action."});
            }else{
                return res.send(result);
            }

        } catch (error) {
            console.log(error);
            return res.send(error);
        }
    },

    /**
     * Add action on order_repair
     */
    addActionOnSav: async (req, res) => {
        try {
            const { idAction, idSav } = req.params;
            let headerAuth = req.headers.authorization;
            // On récupère l'id stocké dans le code
            const userId = jwt.getUserId(headerAuth);
            // Save acion for an order_repair with idAction, idSav and userId
            const result = await Action.addActionOnSav(idAction, idSav, userId);
            if(result){
                return res.send(true);
            }else{
                return res.send(false);
            }
        } catch (error) {
            console.log(error);
            return res.send(error);
        }
    }

};
