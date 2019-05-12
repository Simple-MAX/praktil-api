// import your npm module here 
const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const passport = require('passport');
const {
    body,
    validationResult,
    check
} = require('express-validator/check');

const User = require('../api/models/user');
const config = require('../config.json');

/**
 * Author: https://github.com/Simple-MAX
 * Praktil MVC - users.js
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
        const {
            email,
            password,
            name,
            orgnumber
        } = req.body;
        let errors = [];

        if (!orgnumber) {
            User.findOne({
                    email: email
                })
                .then(user => {
                    if (user) {
                        console.log(error);
                        res.render('landing');
                    } else {
                        bcrypt.hash(req.body.password, 10, (error, hash) => {
                            if (error) {
                                console.log(error);
                            } else {
                                const user = new User({
                                    _id: new mongoose.Types.ObjectId(),
                                    name: req.body.name,
                                    email: req.body.email,
                                    password: hash
                                });
                                user
                                    .save()
                                    .then(result => {
                                            res.redirect('/intern');
                                    })
                                    .catch(error => {
                                        console.log(error);
                                        res.render('landing');
                                    });
                            }
                        });
                    }
                }).catch(error => {
                    console.log(error);
                    res.render('landing');
                });
        } else {
            User.findOne({
                    email: email
                })
                .then(user => {
                    if (user) {
                        console.log(error);
                        res.render('landing');
                    } else {
                        bcrypt.hash(req.body.company_password, 10, (error, hash) => {
                            if (error) {
                                console.log(error);
                            } else {
                                const user = new User({
                                    _id: new mongoose.Types.ObjectId(),
                                    org_number: req.body.orgnumber,
                                    name: req.body.company_name,
                                    email: req.body.company_email,
                                    password: hash,
                                    isUser: false,
                                    isCompany: true,
                                });
                                user
                                    .save()
                                    .then(result => {
                                        req.flash('success_message', 'User created')
                                        res.redirect('/company');
                                    })
                                    .catch(error => {
                                        console.log(error);
                                        res.render('landing');
                                    });
                            }
                        });
                    }
                }).catch(error => {
                    console.log(error);
                    res.render('landing');
                });
        }
    },

    /**
     * @description
     * HTTPS-Method : POST
     * Path : 'protocol://example.domain/resources'
     * description : sign in a user and return a token
     *  {
            successRedirect: '/intern',
            failureRedirect: '/'
     */
    signin: (req, res, next) => {
        passport.authenticate('local', { successRedirect: '/dashboard', failureRedirect: '/' })(req, res, next);
        /*passport.authenticate('local', (error, user, info) => {
            if (error) {
                return next(error);
            }
            if (!user) {
                res.redirect('/');
            }

            // if login was successful
            if (user.isUser === true) {
                console.log(user.isUser);
                res.redirect('/intern');
            }

            if (user.isCompany === true) {
                res.redirect('/company')
            }
        })(req, res, next);*/
    },

    /**
     * @description
     * HTTPS-Method : GET
     * Path : 'protocol://example.domain/resources/id'
     * description : signout
     */
    signout: (req, res, next) => {
        req.logout();
        res.redirect('/');
    }
};