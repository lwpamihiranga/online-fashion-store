const mongoose = require('mongoose');
const ratingModel = require('./rating.model');
const userModel = require('../user/user.model');
var MongoDB = require('mongodb');

exports.getAll = (req, res, next) => {
    ratingModel
        .find()
        .then((ratings) => res.status(200).json(ratings))
        .catch((err) => res.status(400).json('Error: ' + err));
};

exports.createRating = (req, res) => {
    const userId = req.query.userId;
    const productId = req.query.productId;
    const comment = req.query.comment;
    const rate = req.query.rate;
    const imageLink = req.query.imageLink;
    const username = req.query.username;

    if (
        userId != null &&
        productId != null &&
        comment != null &&
        rate != null
    ) {
        let rating = new ratingModel();
        rating.userId = userId;
        rating.productId = productId;
        rating.comment = comment;
        rating.rate = rate;
        rating.username = username;
        rating.imageLink = imageLink;

        rating
            .save()
            .then(() => res.json('Rating was added!'))
            .catch((err) => res.status(400).json('Error: ' + err));
    } else {
        res.status(400).json('Error : parameters are missing!');
    }
};

exports.findByProductId = (req, res, next) => {
    const productId = req.query.productId;
    ratingModel
        .find({ productId: productId })
        .then((ratings) => res.status(200).json(ratings))
        .catch((err) => res.status(400).json('Error: ' + err));
};

exports.findByUserAndProductId = (req, res, next) => {
    const productId = req.query.productId;
    const userId = req.query.userId;
    ratingModel
        .find({ productId: productId, userId: userId })
        .then((ratings) => res.status(200).json(ratings))
        .catch((err) => res.status(400).json('Error: ' + err));
};

exports.updateRating = (req, res, next) => {
    const rateId = req.query.rateId;
    const newComment = req.query.comment;
    const newRate = req.query.rate;

    ratingModel
        .update({ _id: rateId }, { comment: newComment, rate: newRate })
        .then(() => res.json('Rating Updated!').status(200))
        .catch((err) => res.status(400).json('Error: ' + err));
};

exports.deleteRating = (req, res, next) => {
    const rateId = req.query.rateId;

    ratingModel
        .deleteOne({ _id: rateId })
        .then(() => res.json('Rating Deleted!').status(200))
        .catch((err) => res.status(400).json('Error: ' + err));
};
