const mongoose = require('mongoose');
const cartSchema = mongoose.Schema({
    productId: String,
    userId: String,
});

module.exports = mongoose.model('Cart', cartSchema);
