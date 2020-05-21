const CartModel = require('./cart.model');
const ProductModel = require('../product/product.model');

exports.getAll = (req, res, next) => {
    CartModel.find()
        .then((list) => res.status(200).json(list))
        .catch((err) => res.status(400).json('Error: ' + err));
};

exports.create = (req, res, next) => {
    const userId = req.query.userId;
    const productId = req.query.productId;

    if (userId != null && productId != null) {
        CartModel.find({ userId: userId, productId: productId })
            .then((list) => {
                if (list.length === 0) {
                    //save only if an item is not available with the specified attributes of  product id and user id.
                    //doing this to eleminate duplicates

                    const cart = new CartModel();
                    cart.productId = productId;
                    cart.userId = userId;
                    cart.save()
                        .then((cartList) => res.status(200).json(cartList))
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

    CartModel.find({ userId: userId })
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

exports.delete = (req, res, next) => {
    const userId = req.query.userId;
    const productId = req.query.productId;

    CartModel.deleteOne({ userId: userId, productId: productId })
        .then(() => res.json('Item was Deleted!').sendStatus(200))
        .catch((err) => res.status(400).json('Error: ' + err));
};
exports.update = (req,res,next) => {

    const id = req.query.id;
    const isBought = req.query.isBought;

    CartModel.updateOne({_id : id},{isBought: isBought})
        .then(res => {

            res.status(200).json('Updated');
        })
        .catch(error => {
            res.status(400).json('Error: ' + err)
        });
};
