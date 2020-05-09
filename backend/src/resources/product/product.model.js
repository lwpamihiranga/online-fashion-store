const mongoose = require('mongoose');

const productSchema = mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    categoryId: { type: String, required: true },
    description: { type: String, required: true },
    hasDiscount: { type: Boolean, default: false },
    discount: { type: Number },
    name: { type: String, required: true, trim: true },
    price: { type: Number, required: true },
    category: { type: String },
    imageLink: { type: String, default: 'uploads/products/default.jpg' },
});

module.exports = mongoose.model('Product', productSchema);
