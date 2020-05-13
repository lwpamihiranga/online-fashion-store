const mongoose = require('mongoose');
const slash = require('slash');

const Product = require('../product/product.model');

exports.getAll = (req, res, next) => {
    Product.find()
        .exec()
        .then((docs) => {
            res.status(200).json(docs);
        })
        .catch((err) => {
            res.status(500).json({
                error: err,
            });
        });
};

exports.getOne = (req, res, next) => {
    Product.findById(req.params.id)
        .exec()
        .then((product) => {
            if (product) {
                res.status(200).json({
                    message: product,
                });
            } else {
                res.status(404).json({
                    error: {
                        message: 'unable to find',
                    },
                });
            }
        })
        .catch((err) => {
            res.status(500).json({ error: err });
        });
};

exports.createOne = (req, res, next) => {
    // convert windows path to linux path
    const imagePath = slash(req.file.path);

    const product = new Product({
        _id: new mongoose.Types.ObjectId(),
        name: req.body.name,
        price: req.body.price,
        description: req.body.description,
        categoryId: req.body.categoryId,
        categoryName: req.body.categoryName,
        hasDiscount: req.body.hasDiscount,
        discount: req.body.discount,
        imageLink: imagePath,
    });

    product
        .save()
        .then((result) => {
            res.status(201).json({
                message: 'product created',
                created: result,
            });
        })
        .catch((err) => {
            res.status(500).json({ error: err });
        });
};

exports.updateOne = (req, res, next) => {
    const id = req.params.id;

    const updateOps = {};
    for (const ops of req.body) {
        updateOps[ops.propName] = ops.value;
    }

    Product.update({ _id: id }, { $set: updateOps })
        .exec()
        .then((result) => {
            res.status(200).json(result);
        })
        .catch((error) => {
            res.status(400).json({
                error: error,
            });
        });
};

exports.deleteOne = (req, res, next) => {
    const id = req.params.id;
    Product.remove({ _id: id })
        .exec()
        .then((result) => {
            res.status(200).json({ result });
        })
        .catch((error) => {
            res.status(404).json({
                error: error,
            });
        });
};
