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

router.get('/login', (req, res) => {
    const password = req.query.password;
    const email = req.query.email;
    const type = req.query.type;

    userModel
        .find({ password: password, email: email, type: type })
        .then((users) => res.status(200).json(users))
        .catch((err) => res.status(400).json('Error: ' + err));
});

router.post('/register', (req, res) => {
    const password = req.body.password;
    const email = req.body.email;
    const type = req.body.type;
    const name = req.body.name;
    const imageLink =
        'https://scontent.fcmb1-1.fna.fbcdn.net/v/t1.0-9/p720x720/93794211_215217119927900_2555796898816458752_o.jpg?_nc_cat=104&_nc_sid=85a577&_nc_ohc=xAkyRz7bRTsAX-a6X_w&_nc_ht=scontent.fcmb1-1.fna&_nc_tp=6&oh=48baa480cc116ab35d45fb24c3a153be&oe=5ECBD8C8';

    const user = new userModel();
    user.password = password;
    user.email = email;
    user.type = type;
    user.name = name;
    user.imageLink = imageLink;

    if (
        user.email != null &&
        user.password != null &&
        user.type != null &&
        user.name != null &&
        user.imageLink != null
    ) {
        user.save()
            .then((users) => res.status(200).json(users))
            .catch((err) => res.status(400).json('Error: ' + err));
    } else {
        res.status(400).json('Error: parameters are null');
    }
});

router.post('/signup', UserController.register);

module.exports = router;
