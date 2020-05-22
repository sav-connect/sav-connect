const express = require('express');

const router = express.Router();

/**
 * IMPORT CONTROLLERS
 */
const loginController = require('../controllers/loginController');

/**
 * IMPORT ROUTER
 */
const tagRouter = require('./tagRouter');
const userRouter = require('./userRouter');
const actionRouter = require('./actionRouter');
const customerRouter = require('./customerRouter');
const productRouter = require('./productRouter');
const orderRepairRouter = require('./orderRepairRouter');
const searchRouter = require('./searchRouter');
const activityRouter = require('./activityRouter');
const configPanneRouter = require('./configPanneRouter');
/**
 * IMPORT MIDDLEWARE
 */
const authMiddleware = require('../middlewares/authMiddleware');


/**
 * ROUTES
**/

// page d'accueil
router.get('/', (req, res) => {
    res.send('Hello world !');
});

router.post('/api/login', loginController.login);
router.get('/api/logout', loginController.logout);
router.get('/api/get-user-session', loginController.getUserSession);

router.use('/api/user', authMiddleware,userRouter);
router.use('/api/tag', authMiddleware,tagRouter);
router.use('/api/action', authMiddleware,actionRouter);
router.use('/api/client', authMiddleware,customerRouter);
router.use('/api/product', authMiddleware,productRouter);
router.use('/api/sav', authMiddleware,orderRepairRouter);
router.use('/api/search', authMiddleware, searchRouter);
router.use('/api/activity', authMiddleware, activityRouter);
router.use('/api/config-panne', authMiddleware, configPanneRouter);



module.exports = router;