const mongoose = require('mongoose');
const WishListModel = require('./wishList.model');
const ProductModel = require('../product/product.model');

exports.getAll = (req, res, next) => {
    WishListModel.find()
        .then((list) => res.status(200).json(list))
        .catch((err) => res.status(400).json('Error: ' + err));
};

exports.createOne = (req, res, next) => {
    const userId = req.query.userId;
    const productId = req.query.productId;

    if (userId != null && productId != null) {
        WishListModel.find({ userId: userId, productId: productId })
            .then((list) => {
                if (list.length === 0) {
                    //save only if an item is not available with the specified attributes of  product id and user id.
                    //doing this to eleminate duplicates

                    const wish = new WishListModel();
                    wish.productId = productId;
                    wish.userId = userId;
                    wish.save()
                        .then((wishList) => res.status(200).json(wishList))
                        .catch((err) => res.status(400).json('Error: ' + err));
                } else {
                    const itemList = [];
                    res.status(200).json(itemList);
                }
            })
            .catch((err) => res.status(400).json('Error ' + err));
    } else {
        res.status(400).json('Parameters are null');
    }
};

exports.find = (req, res, next) => {
    const userId = req.query.userId;
    var productList = [];

    WishListModel.find({ userId: userId })
        .then((list) => {
            list.map((item) => {
                ProductModel.find({ _id: item.productId }).then((itm) => {
                    itm.map((it) => {
                        productList.push(it);
                    });

                    //its time to send the response since the loop is completed
                    if (list.length === productList.length) {
                        res.status(200).json(productList);
                    }
                });
            });

            //its time to send the response since it has no products associated with the userId
            if (list.length === 0) {
                res.status(200).json(productList);
            }
        })
        .catch((err) => res.status(400).json('Error ' + err));
};

exports.deleteOne = (req, res, next) => {
    const userId = req.query.userId;
    const productId = req.query.productId;

    WishListModel.deleteOne({ userId: userId, productId: productId })
        .then(() => res.json('Item was Deleted!').sendStatus(200))
        .catch((err) => res.status(400).json('Error: ' + err));
};
