const express = require('express');
const router = express.Router();
const mongoose =  require('mongoose');
const categoryModel = require('./category.model');

router.get('/', (req, res) => {

    categoryModel.find()
        .then(categories => res.status(200).json(categories))
        .catch(err => res.status(400).json('Error: ' + err));
});

router.post('/create',(req,res) => {

    const catName = req.body.catName;

    if(catName != null)
    {

        let category = new categoryModel();
        category.catName = catName;

        category
            .save()
            .then(()=> res.json('Category was added!'))
            .catch(err => res.status(400).json('Error: ' + err));
    }
    else
    {
        res.status(400).json('Error : parameters are missing!');
    }
});

module.exports = router;