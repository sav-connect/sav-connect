const express = require('express');

const router = express.Router();

const userController = require('../controllers/userController');

/**
 * ROUTES
 **/

router.get('/', userController.findAll);
router.get('/:id', userController.findOne);
router.get('/archive/:id', userController.archive);
router.post('/add', userController.add);
router.patch('/edit/:id', userController.edit);


module.exports = router;