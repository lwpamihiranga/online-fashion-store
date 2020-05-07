const mongoose = require('mongoose');

const userSchema = mongoose.Schema({
    name: String,
    email: String,
    password: String,
    type: String,
    imageLink: String,
});

module.exports = mongoose.model('User', userSchema);
