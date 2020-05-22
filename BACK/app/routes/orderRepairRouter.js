const express = require('express');

const router = express.Router();

const orderRepairController = require('../controllers/orderRepairController');

/**
 * ROUTES
**/

router.get('/', orderRepairController.findAll);
router.get('/:id', orderRepairController.findOne);
router.get('/archive/:id', orderRepairController.archive);
router.post('/add', orderRepairController.add);
router.patch('/edit/:id', orderRepairController.edit);
router.get('/page/:page/nb/:nbElement', orderRepairController.pagination);
router.get('/archive/page/:page/nb/:nbElement', orderRepairController.paginationArchive);

router.post('/stepone', orderRepairController.postStepOne);
router.get('/stepone/:order_number', orderRepairController.getStepOne);

router.patch('/steptwo/:order_number', orderRepairController.patchStepTwo);
router.get('/steptwo/:order_number', orderRepairController.getStepTwo);

router.patch('/stepthree/:order_number', orderRepairController.patchStepThree);
router.get('/stepthree/:order_number', orderRepairController.getStepThree);

router.patch('/stepfive/:order_number', orderRepairController.patchStepFive);
router.get('/stepfive/:order_number', orderRepairController.getStepFive);

router.post('/stepfour/:order_number', orderRepairController.postStepFour);
router.get('/stepfour/:order_number', orderRepairController.getStepFour);
router.get('/stepfour/delete/:order_number/:idGallery', orderRepairController.getStepFourDelete);


module.exports = router;