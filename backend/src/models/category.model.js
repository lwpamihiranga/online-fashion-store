const mongoose = require('mongoose')

const categorySchema = mongoose.Schema({

    catName : String
});

module.exports = mongoose.model('Category', categorySchema);