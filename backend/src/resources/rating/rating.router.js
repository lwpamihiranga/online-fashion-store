const express = require('express');
const router = express.Router();

const RatingController = require('./rating.cotroller');

router.get('/', RatingController.getAll);
router.get('/findByProductId', RatingController.findByProductId);
router.get('/findByUserAndProductId', RatingController.findByUserAndProductId);

router.post('/create', RatingController.createRating);
router.post('/update', RatingController.updateRating);
router.post('/delete', RatingController.deleteRating);

module.exports = router;
