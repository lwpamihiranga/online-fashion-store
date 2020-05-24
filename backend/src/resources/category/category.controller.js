const mongoose = require('mongoose');

const Category = require('./category.model');
const Product = require('../product/product.model');

exports.createOne = (req, res, next) => {
    Category.find({ catName: req.body.catName })
        .exec()
        .then((category) => {
            if (category.length >= 1) {
                return res.status(201).json({
                    message: 'category already exists',
                });
            } else {
                const category = new Category({
                    _id: mongoose.Types.ObjectId(),
                    catName: req.body.catName,
                });

                category
                    .save()
                    .then((result) => {
                        res.status(200).json({
                            message: 'Category added',
                            created: result,
                        });
                    })
                    .catch((err) => {
                        res.status(500).json({ error: err });
                    });
            }
        });
};

exports.getAll = (req, res, next) => {
    Category.find()
        .exec()
        .then((categories) => {
            res.status(200).json(categories);
        })
        .catch((err) => {
            res.status(500).json({
                error: err,
            });
        });
};

exports.deleteOne = (req, res, next) => {

    Category.deleteOne({_id : req.body.id})
        .exec()
        .then(result => {

            res.status(200).json('Deleted!');
            // Product.deleteMany({categoryId : req.body.id})
            //     .then(result => {
            //         res.status(200).json('Deleted!');
            //     })
            //     .catch(error => {
            //         res.status(400).json('Not deleted ' + error);
            //     });

        })
        .catch(error => {
            res.status(400).json('Not deleted ' + error);
        });
};
exports.updateOne = (req,res,next) => {

    Category.updateOne({_id : req.body.id},{catName : req.body.catName})
        .exec()
        .then(result => {
            res.status(200).json('Updated');
        })
        .catch(error => {
           req.status(400).json('Error ' + error);
        });
};
exports.findOne = (req,res,next) => {

    Category.find({_id: req.query.id})
        .then(result => {
            res.status(200).json(result);
        })
        .catch(error => {
            res.status(400).json('Error : ' + error);
        })
};
