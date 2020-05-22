const express = require('express');

const router = express.Router();

const configPanneController = require('../controllers/configPanneController');

/**
 * ROUTES
**/

router.get('/', configPanneController.findAll);
router.get('/:idConfigPanne/sav/:idSav', configPanneController.addConfigPanneOnSav);
router.get('/remove/:idConfigPanne/sav/:idSav', configPanneController.removeConfigPanneOnSav);
router.get('/:id', configPanneController.findOne);
router.post('/add', configPanneController.add);
router.patch('/edit/:id', configPanneController.edit);
router.get('/archive/:id', configPanneController.archive);


module.exports = router;