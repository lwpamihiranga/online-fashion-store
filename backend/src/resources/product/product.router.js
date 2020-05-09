const express = require('express');
const router = express.Router();

const Product = require('./product.model');
const ProductController = require('./product.controller');
const FileHandler = require('../../utils/file-upload');

router
    .route('/')
    .get(ProductController.getAll)
    .post(FileHandler.single('imageLink'), ProductController.createOne);

router
    .route('/:id')
    .get(ProductController.getOne)
    .patch(ProductController.updateOne)
    .delete(ProductController.deleteOne);

router.get('/findByCategoryId', (req, res) => {
    const id = req.query.id;
    Product.find({ categoryId: id })
        .exec()
        .then((docs) => {
            res.status(200).json(docs);
        })
        .catch((err) => {
            res.status(500).json({
                error: {
                    message: 'Cannot find',
                },
            });
        });
});

router.get('/findByProductId', (req, res) => {
    const id = req.query.id;
    Product.find({ _id: id })
        .exec()
        .then((docs) => {
            res.status(200).json(docs);
        })
        .catch((err) => {
            res.status(500).json({
                error: {
                    message: 'Cannot find',
                },
            });
        });
});

module.exports = router;
