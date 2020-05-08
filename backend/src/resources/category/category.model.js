const mongoose = require('mongoose');

const categorySchema = mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    catName: { type: String, trim: true, unique: true, required: true },
});

module.exports = mongoose.model('Category', categorySchema);
