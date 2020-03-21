const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');

const Product = require('../models/product');

router.get('/', (req, res) => {
    res.status(200).json({
        message: 'product route'
    });
});

router.post('/', (req, res) => {
    const product = new Product({
        _id: new mongoose.Types.ObjectId(),
        name: req.body.name,
        price: req.body.price
    });

    product
        .save()
        .then(result => {
            console.log(result);
        })
        .catch(error => {
            console.log(error);
        });

    res.send({
        message: 'create a product',
        createdProduct: product
    });
});

router.get('/:id', (req, res) => {
    const id = req.params.id;
    res.send({
        message: `get product with id - ${id}`
    });
});

router.put('/:id', (req, res) => {
    const id = req.params.id;
    res.send({
        message: `upadating the product with id - ${id}`
    });
});

router.delete('/:id', (req, res) => {
    const id = req.params.id;
    res.send({
        message: `deleting the product with id - ${id}`
    });
});

module.exports = router;
