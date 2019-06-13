// import your npm module here 
const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const passport = require('passport');
const moment = require('moment');

const User = require('../api/models/user');
const config = require('../config.json');

/**
 * Author: https://github.com/Simple-MAX
 * Praktil MVC - users.js
 * @description :: Server-side logic for managing users.
 */
module.exports = {

    // load all user
    users: async (req, res, next) => {
        return await User.find()
    },

    interns: async () => {
        return await User.find({ isUser: true })
    },

    companies: async () => {
        return await User.find({ isCompany: true })
    },

    companyCount: async (req, res, next) => {
        return await User.find({ isCompany: true }).count()
    },

    internCount: async (req, res, next) => {
        return await User.find({ isUser: true }).count()
    },

    userCount: async (req, res, next) => {
        return await User.find().count()
    },

    userDailyCount: async (req, res, next) => {
        const start = moment().startOf('day');
        const end = moment().endOf('day');
        return await User.find({createdAt: {$gte: start, $lt: end}}).count()
    },


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
                                    .then(() => {
                                        res.redirect('/dashboard');
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
                                    .then(() => {
                                        req.flash('success_message', 'User created');
                                        res.redirect('/dashboard');
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
        passport.authenticate('local', {
            successRedirect: '/dashboard',
            failureRedirect: '/'
        })(req, res, next);
    },

    updateProfile: async (req, res, next) => {
        const updates = {};
        for (const [key, value] of Object.entries(req.body)) {
            updates[key] = value;
        }
        if (req.files) {
            if (req.files.image) {
                updates['image'] = req.files.image[0].path
            }
            if (req.files.cv) {
                updates['cv'] = req.files.cv[0].path
            }
            if (req.files.letter) {
                updates['letter'] = req.files.cv[0].path
            }
        }
        await User.update({
            _id: req.user.id
        }, {
            $set: updates
        }).exec().then(() => {
            res.redirect('/dashboard/settings')
        }).catch(error => console.log(error));


    },

    update: async (req, res, next) => {
        const {
            email,
            password
        } = req.body;
        const user = await User.findOne({
            _id: req.user.id
        });

        await bcrypt.hash(password, 10, (error, hash) => {
            if (error) {
                console.log(error);
            } else {
                user.email = email;
                user.password = hash
                user.save().then(() => {
                    res.redirect('/dashboard/settings')
                }).catch(error => console.log(error));
            }
        });
    },

    notifications: async (req, res, next) => {
        const user = await User.findOne({
            _id: req.user.id
        });
        if (req.body.notifications === 'on') {
            user.notifications = true;
            await user.save().then(() => {
                res.redirect('/dashboard/settings')
            }).catch(error => console.log(error));
        }

        if (req.body.notifications === 'off') {
            user.notifications = false;
            await user.save().then(() => {
                res.redirect('/dashboard/settings')
            }).catch(error => console.log(error));
        }
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
    },

    show: async (req, res, next) => {
        const  user = await User.find({_id: id})
    }
};