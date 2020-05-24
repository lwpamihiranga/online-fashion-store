const mongoose = require('mongoose');

const wishListSchema = mongoose.Schema({
    productId: String,
    userId: String,
});

module.exports = mongoose.model('WishList', wishListSchema);
