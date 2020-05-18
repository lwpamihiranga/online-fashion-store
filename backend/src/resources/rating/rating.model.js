const mongoose = require('mongoose');

const ratingSchema = mongoose.Schema({
    imageLink: String,
    username : String,
    userId: String,
    productId: String,
    comment: String,
    rate: Number,
});

module.exports = mongoose.model('Rating', ratingSchema);
