const mongoose = require('mongoose');

const userSchema = mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    name: { type: String, trim: true },
    email: {
        type: String,
        required: true,
        unique: true,
        trim: true,
        match: /[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/,
    },
    password: { type: String, required: true },
    type: {
        type: String,
        enum: ['admin', 'manager', 'user'],
        default: 'user',
        trim: true,
    },
    imageLink: { type: String },
});

module.exports = mongoose.model('User', userSchema);
