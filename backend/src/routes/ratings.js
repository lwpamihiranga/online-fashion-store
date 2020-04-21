const express = require('express');
const router = express.Router();
const mongoose =  require('mongoose');
const ratingModel = require('../models/ratings');

router.get('/', (req, res) => {
   res.send("Rating router reached!");
});

module.exports = router;