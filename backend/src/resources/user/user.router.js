const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const userModel = require('./user.model');
const UserController = require('./user.controller');

router.get('/', (req, res) => {
    userModel
        .find()
        .then((users) => res.status(200).json(users))
        .catch((err) => res.status(400).json('Error: ' + err));
});

/**
 * TODO: this route should be deleted
 * REASON: in a rest api login should not be a GET request. it should be a POST requests
 */
router.get('/login', (req, res) => {
    const password = req.query.password;
    const email = req.query.email;
    const type = req.query.type;

    userModel
        .find({ password: password, email: email, type: type })
        .then((users) => res.status(200).json(users))
        .catch((err) => res.status(400).json('Error: ' + err));
});

router.post('/login', UserController.login);
router.post('/register', UserController.register);

module.exports = router;
