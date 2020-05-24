const mongoose = require('mongoose');
const cartSchema = mongoose.Schema({
    productId: String,
    userId: String,
    isBought: Boolean,
});

module.exports = mongoose.model('Cart', cartSchema);
