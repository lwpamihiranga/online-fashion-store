const express = require('express');
const router = express.Router();

const categoryModel = require('./category.model');

const CategoryController = require('./category.controller');
const Auth = require('../../utils/auth');

router.get('/', (req, res) => {
    categoryModel
        .find()
        .then((categories) => res.status(200).json(categories))
        .catch((err) => res.status(400).json('Error: ' + err));
});

router.post('/create', Auth.checkAdmin, CategoryController.createOne);

module.exports = router;
