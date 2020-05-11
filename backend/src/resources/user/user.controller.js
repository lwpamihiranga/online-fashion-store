const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const User = require('./user.model');

const MailService = require('../../utils/mail-sender');

exports.register = (req, res, next) => {
    User.find({ email: req.body.email })
        .exec()
        .then((user) => {
            if (user.length >= 1) {
                return res.status(409).json({
                    message: 'email already exists',
                });
            } else {
                // bcrypt package has used to HASH the password before saving the user
                bcrypt.hash(req.body.password, 10, (err, hash) => {
                    if (err) {
                        return res.status(500).json({
                            error: err,
                        });
                    } else {
                        const user = new User({
                            _id: new mongoose.Types.ObjectId(),
                            name: req.body.name,
                            email: req.body.email,
                            password: hash,
                            type: req.body.type,
                            imageLink: req.file.path,
                        });

                        user.save()
                            .then((result) => {
                                res.status(201).json(result);

                                // this will send and email to the created manager's email
                                if (user.type === 'manager') {
                                    MailService.sendManagerMail(
                                        req.adminEmail,
                                        user.email,
                                        user.name
                                    );
                                }
                            })
                            .catch((err) => {
                                res.status(500).json({ error: err });
                            });
                    }
                });
            }
        });
};

/**
 * @summary athenticate user and return jwt token with email, userId, type signed
 */
exports.login = (req, res, next) => {
    User.find({ email: req.body.email })
        .exec()
        .then((user) => {
            if (user.length < 1) {
                return res.status(401).json({
                    message: 'authentication failed',
                });
            }

            bcrypt.compare(
                req.body.password,
                user[0].password,
                (err, result) => {
                    if (err) {
                        return res.status(401).json({
                            message: 'authentication failed',
                        });
                    }

                    if (result) {
                        const token = jwt.sign(
                            {
                                userId: user[0]._id,
                                email: user[0].email,
                                type: user[0].type,
                            },
                            'secret', // this should be changed and set up as env variable for more protection
                            {
                                expiresIn: '1h',
                            }
                        );

                        return res.status(200).json({
                            message: 'authentication successfull',
                            token: token,
                        });
                    }

                    res.status(401).json({
                        message: 'authentication failed',
                    });
                }
            );
        })
        .catch((err) => {
            res.status(500).json({ error: err });
        });
};
