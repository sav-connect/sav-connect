const express = require('express');

const router = express.Router();

const tagController = require('../controllers/tagController');

/**
 * ROUTES
 **/

router.get('/', tagController.findAll);
router.get('/:id', tagController.findOne);
router.post('/add', tagController.add);
router.patch('/edit/:id', tagController.edit);
router.get('/:idTag/sav/:idSav', tagController.addTagOnSav);
router.get('/remove/:idTag/sav/:idSav', tagController.removeTagOnSav);
router.get('/sav/:idSav', tagController.tagsOnSav);

router.get('/archive/:id', tagController.archive);


module.exports = router;