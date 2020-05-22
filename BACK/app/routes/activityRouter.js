const express = require('express');

const router = express.Router();

const activityController = require('../controllers/activityController');

/**
 * ROUTES
 **/

router.get('/:nb', activityController.allActivities);
router.get('/sav/:order_number', activityController.activitiesForOneSav);
router.get('/user/:userId', activityController.activitiesForOneUser);


module.exports = router;