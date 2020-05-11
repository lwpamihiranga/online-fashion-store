const mongoose = require('mongoose');

const Category = require('./category.model');

exports.createOne = (req, res, next) => {
    Category.find({ catName: req.body.catName })
        .exec()
        .then((category) => {
            if (category.length >= 1) {
                return res.status(409).json({
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
                        res.status(201).json({
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
