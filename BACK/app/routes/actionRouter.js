const express = require('express');

const router = express.Router();

const actionController = require('../controllers/actionController');

/**
 * ROUTES
 **/

router.get('/', actionController.findAll);
router.get('/:idAction/sav/:idSav', actionController.addActionOnSav);
router.get('/:id', actionController.findOne);
router.post('/add', actionController.add);
router.patch('/edit/:id', actionController.edit);


module.exports = router;