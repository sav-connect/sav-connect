const User = require('../models/User');
const jwt = require('../utils/jwt.utils');

module.exports = async (req, res, next) => {
    try {
        // console.log(req.headers);
        let headerAuth = req.headers.authorization;
        // On récupère l'id stocké dans le code
        const userId = jwt.getUserId(headerAuth);
        
        if (userId < 0) {
            return res.status(400).json({
                'error': 'wrong token'
            });
        }

        // On récupère la deuxième partie du token
        headerAuth = jwt.parseAuthorization(headerAuth);

        // On cherche l'user relié à l'id
        const result = await User.findOne(userId);

        if(result.token === headerAuth){
            next();
        }else{
            res.send({"erreur": "Wrong token or exprired token"});
        }
    } catch (error) {
        console.log(error);
        
    }
};