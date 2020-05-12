const express = require('express');

const router = express.Router();
const bcrypt = require('bcrypt');

const userModel = require('./user.model');
const UserController = require('./user.controller');
const Auth = require('../../utils/auth');
const FileHandler = require('../../utils/file-upload');

router.get('/', (req, res) => {
    userModel
        .find()
        .then((users) => res.status(200).json(users))
        .catch((err) => res.status(400).json('Error: ' + err));
});

router.post('/login', UserController.login);

/**
 * check admin middleware checks if the req made by an admin user before creating manager or admin user.
 * middleware not affects for creating normal users.
 */
router.post(
    '/register',
    Auth.checkBeforeAddUser,
    FileHandler.single('imageLink'),
    UserController.register
);

module.exports = router;
