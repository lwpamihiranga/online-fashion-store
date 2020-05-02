const express = require('express');
const router = express.Router();
const mongoose =  require('mongoose');
const WishListModel = require('../models/wishlist.model');


router.get('/', (req, res) => {
    WishListModel.find()
        .then(list => res.status(200).json(list))
        .catch(err => res.status(400).json('Error: ' + err));
});
router.post('/create',(req,res) => {

    const userId = req.query.userId;
    const productId = req.query.productId;

    WishListModel.find({userId : userId,productId : productId})
        .then(list => {

            if(list.length === 0)
            {
                //save only if an item is not available with the specified attributes of  product id and user id.
                //doing this to eleminate duplicates

                const wish = new WishListModel();
                wish.productId = productId;
                wish.userId = userId;
                wish.save()
                    .then(wishList => res.status(200).json(wishList))
                    .catch(err => res.status(400).json('Error: ' + err));
            }
            else
            {
                const itemList = [];
                res.status(200).json(itemList);
            }

        })
        .catch(err => res.status(400).json('Error ' + err));
});

module.exports = router;