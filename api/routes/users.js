/**
 * author: https://github.com/Simple-MAX
 * Praktil API - jobs.js
 */

// import your npm module here 
const express = require('express');
const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const User = require('../models/user');
const config = require('../../config.json');

const router = express.Router();

router.post('/signup', (req, res, next) => {
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
});

router.post('/login', (req, res, next) => {
    User.find({
            email: req.body.email
        })
        .exec()
        .then(user =>{
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
        .catch();
});

router.delete('/:userId', (req, res, next) => {
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
});

module.exports = router;