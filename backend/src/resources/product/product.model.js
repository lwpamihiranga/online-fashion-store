const mongoose = require('mongoose');

const productSchema = mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    name: { type: String, required: true, trim: true },
    price: { type: Number, required: true },
    description: { type: String, required: true },
    categoryId: { type: String, required: true },
    categoryName: { type: String },
    hasDiscount: { type: Boolean, default: false },
    discount: { type: Number, default: 0 },
    imageLink: { type: String, default: 'uploads/products/default.jpg' },
});

module.exports = mongoose.model('Product', productSchema);
