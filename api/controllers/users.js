// import your npm module here 
const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const User = require('../models/user');
const config = require('../../config.json');

/**
 * Author: https://github.com/Simple-MAX
 * Praktil API - users.js
 * @description :: Server-side logic for managing users.
 */
module.exports = {

    /**
     * @description
     * HTTPS-Method : POST
     * Path : 'protocol://example.domain/resources'
     * description : create an account
     */
    signup: (req, res, next) => {
        User.find({
                email: req.body.email
            })
            .exec()
            .then(user => {
                if (user.length >= 1) {
                    return res.status(409).json({
                        message: 'Email exists'
                    });
                } else {
                    bcrypt.hash(req.body.password, 10, (error, hash) => {
                        if (error) {
                            return res.status(500).json({
                                error: error
                            });
                        } else {
                            const user = new User({
                                _id: new mongoose.Types.ObjectId(),
                                email: req.body.email,
                                password: hash
                            });
                            user
                                .save()
                                .then(result => {
                                    res.status(201).json({
                                        message: 'User created',
                                        result: result
                                    });
                                })
                                .catch(error => {
                                    res.status(500).json({
                                        error: error
                                    });
                                });
                        }
                    });
                }
            })
            .catch(error => {
                res.status(500).json({
                    error: error
                });
            });
    },

    /**
     * @description
     * HTTPS-Method : POST
     * Path : 'protocol://example.domain/resources'
     * description : sign in a user and return a token
     */
    signin: (req, res, next) => {
        User.find({
                email: req.body.email
            })
            .exec()
            .then(user => {
                if (user.length < 1) {
                    return res.status(401).json({
                        message: 'Auth failed'
                    });
                }
                bcrypt.compare(req.body.password, user[0].password, (error, result) => {
                    if (error) {
                        return res.status(401).json({
                            message: 'Auth failed'
                        });
                    }
                    if (result) {
                        const token = jwt.sign({
                            email: user[0].email,
                            userId: user[0]._id
                        }, config.env.JWT_KEY, {
                            expiresIn: "1h"
                        });
                        return res.status(200).json({
                            message: 'Auth successful',
                            token: token
                        });
                    }
                    res.status(401).json({
                        message: 'Auth failed'
                    });
                });
            })
            .catch(error => {
                res.status(500).json({
                    error: error
                });
            });
    },

    /**
     * @description
     * HTTPS-Method : GET
     * Path : 'protocol://example.domain/resources/id'
     * description : delete an account
     */
    delete: (req, res, next) => {
        User.remove({
                _id: req.params.userId
            })
            .exec()
            .then(result => {
                res.status(200).json({
                    message: 'User deleted'
                });
            })
            .catch(error => {
                res.status(500).json({
                    error: error
                });
            });
    }
};