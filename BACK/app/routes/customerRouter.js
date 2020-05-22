const express = require('express');

const router = express.Router();

const customerController = require('../controllers/customerController');

/**
 * ROUTES
 **/

router.get('/', customerController.findAll);
router.get('/:id', customerController.findOne);
router.post('/add', customerController.add);
router.patch('/edit/:id', customerController.edit);
router.get('/page/:page/nb/:nbElement', customerController.pagination);


module.exports = router;