const express = require('express');
const router = express.Router();
const mongoose =  require('mongoose');

router.get('/', (req, res) => {

    res.json("Category Router reached");
});

module.exports = router;