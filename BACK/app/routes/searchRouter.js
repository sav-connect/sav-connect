const express = require('express');

const router = express.Router();

const searchController = require('../controllers/searchController');

/**
 * ROUTES
 **/

router.get('/user/lastname/', searchController.userLastname);
router.get('/user/mail/', searchController.userMail);
router.get('/user/phone/', searchController.userPhone);
router.get('/product/', searchController.product);
router.get('/', searchController.search);
router.get('/user/', searchController.user);


module.exports = router;