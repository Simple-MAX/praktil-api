// import your npm module here 
const mongoose = require('mongoose');
const Profile = require('../models/profile');
const User = require('../models/user');
const Admin = require('../models/admin');
const Company = require('../models/company');

/**
 * Author: https://github.com/Simple-MAX
 * Praktil API - Profiles.js
 * @description :: Server-side logic for managing profiles.
 */
module.exports = {

    /**
     * @description
     * HTTPS-Method : GET
     * Path : 'protocol://example.domain/resources'
     * description : return a list of all records
     */
    listOfUser: (req, res, next) => {
        Profile
            .find({
                isUser: true
            })
            .populate('user', '_id email')
            .exec()
            .then(result => {
                if (result.length >= 0) {
                    const response = {
                        count: result.length,
                        profiles: result.map(doc => {
                            return {
                                _id: doc._id,
                                date: doc.date,
                                user: doc.user,
                                request: {
                                    description: 'Get a single profile',
                                    type: 'GET',
                                    url: req.protocol + '://' + req.get('host') + req.originalUrl + '/' + doc._id
                                }
                            }
                        })
                    }
                    res.status(200).json(response);
                } else {
                    res.status(200).json({
                        message: 'database is empty'
                    });
                }
            })
            .catch(err => {
                res.status(500).json({
                    error: err
                });
            });
    },

    /**
     * @description
     * HTTPS-Method : GET
     * Path : 'protocol://example.domain/resources'
     * description : return a list of all records
     */
    listOfAdmin: (req, res, next) => {
        Profile
            .find({
                isAdmin: true
            })
            .populate('admin', '_id email')
            .exec()
            .then(result => {
                if (result.length >= 0) {
                    const response = {
                        count: result.length,
                        profiles: result.map(doc => {
                            return {
                                _id: doc._id,
                                date: doc.date,
                                admin: doc.admin,
                                request: {
                                    description: 'Get a single profile',
                                    type: 'GET',
                                    url: req.protocol + '://' + req.get('host') + req.originalUrl + '/' + doc._id
                                }
                            }
                        })
                    }
                    res.status(200).json(response);
                } else {
                    res.status(200).json({
                        message: 'database is empty'
                    });
                }
            })
            .catch(err => {
                res.status(500).json({
                    error: err
                });
            });
    },

    /**
     * @description
     * HTTPS-Method : GET
     * Path : 'protocol://example.domain/resources'
     * description : return a list of all records
     */
    listOfCompany: (req, res, next) => {
        Profile
            .find({
                isCompany: true
            })
            .populate('company', '_id email')
            .exec()
            .then(result => {
                if (result.length >= 0) {
                    const response = {
                        count: result.length,
                        profile: result.map(doc => {
                            return {
                                _id: doc._id,
                                date: doc.date,
                                company: doc.company,
                                request: {
                                    description: 'Get a single profile',
                                    type: 'GET',
                                    url: req.protocol + '://' + req.get('host') + req.originalUrl + '/' + doc._id
                                }
                            }
                        })
                    }
                    res.status(200).json(response);
                } else {
                    res.status(200).json({
                        message: 'database is empty'
                    });
                }
            })
            .catch(err => {
                res.status(500).json({
                    error: err
                });
            });
    },

    /**
     * @description
     * HTTPS-Method : POST
     * Path : 'protocol://example.domain/resources'
     * description : create a single records
     */
    createAUserProfile: (req, res, next) => {
        User.findById(req.body.user_id)
            .then(user => {
                if (!user) {
                    return res.status(404).json({
                        message: 'user not found'
                    });
                }
                const profile = new Profile({
                    _id: mongoose.Types.ObjectId(),
                    user_id: req.body.user_id,
                    name: req.body.name,
                    education: req.body.education,
                    school: req.body.school,
                    branches: [{
                        branch: req.body.branch
                    }],
                    location: req.body.location,
                    birthday: req.body.birthday,
                    phone: req.body.phone,
                    facebook: req.body.facebook,
                    instagram: req.body.instagram,
                    linkedin: req.body.linkedin,
                    notifications: req.body.notifications,
                    image: req.files.image,
                    cv: req.files.cv,
                    letter: req.files.letter
                });
                return profile.save()

            }).then(result => {
                res.status(201).json({
                    message: 'Profile was created for a user',
                    profile: result
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
     * HTTPS-Method : POST
     * Path : 'protocol://example.domain/resources'
     * description : create a single records
     */
    createAAdminProfile: (req, res, next) => {
        Admin.findById(req.body.admin_id)
            .then(admin => {
                if (!admin) {
                    return res.status(404).json({
                        message: 'admin not found'
                    });
                }
                const profile = new Profile({
                    _id: mongoose.Types.ObjectId(),
                    admin_id: req.body.admin_id,
                    name: req.body.name,
                    image: req.file.path
                });
                return profile.save()

            }).then(result => {
                res.status(201).json({
                    message: 'A admin profile was created',
                    profile: result
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
     * HTTPS-Method : POST
     * Path : 'protocol://example.domain/resources'
     * description : create a single records
     */
    createACompanyProfile: (req, res, next) => {
        Company.findById(req.body.company_id)
            .then(company => {
                if (!company) {
                    return res.status(404).json({
                        message: 'company not found'
                    });
                }
                const profile = new Profile({
                    _id: mongoose.Types.ObjectId(),
                    company_id: req.body.company_id,
                    company_name: req.body.company_name,
                    location: req.body.location,
                    phone: req.body.phone,
                    facebook: req.body.facebook,
                    instagram: req.body.instagram,
                    linkedin: req.body.linkedin,
                    description: req.body.description,
                    website: req.body.website,
                    org_number: req.body.org_number,
                    isCompany: req.body.isCompany,
                    image: req.file.path
                });
                return profile.save()

            }).then(result => {
                res.status(201).json({
                    message: 'a company profile was created',
                    profile: result
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
     * description : return a single records
     */
    show: (req, res, next) => {
        if (req.body.userId) {
            User.findById(req.body.userId)
            .populate('user')
            .exec()
            .then(result => {
                if (result) {
                    res.status(200).json({
                        job: result,
                        request: {
                            description: 'Get a list of all available appliactions',
                            types: 'GET',
                            url: req.protocol + '://' + req.get('host') + '/applications'
                        }
                    });
                } else {
                    res.status(404).json({
                        message: 'not found'
                    })
                }
            })
            .catch(err => {
                console.log(err);
                res.status(500).json({
                    error: err
                });
            });
        } if (req.body.adminId) {
            Admin.findById(req.body.adminId)
            .populate('admin')
            .exec()
            .then(result => {
                if (result) {
                    res.status(200).json({
                        job: result,
                        request: {
                            description: 'Get a list of all available appliactions',
                            types: 'GET',
                            url: req.protocol + '://' + req.get('host') + '/applications'
                        }
                    });
                } else {
                    res.status(404).json({
                        message: 'not found'
                    })
                }
            })
            .catch(err => {
                console.log(err);
                res.status(500).json({
                    error: err
                });
            });
        } if (req.body.companyId) {
            Company.findById(req.body.companyId)
            .populate('company')
            .exec()
            .then(result => {
                if (result) {
                    res.status(200).json({
                        job: result,
                        request: {
                            description: 'Get a list of all available appliactions',
                            types: 'GET',
                            url: req.protocol + '://' + req.get('host') + '/applications'
                        }
                    });
                } else {
                    res.status(404).json({
                        message: 'not found'
                    })
                }
            })
            .catch(err => {
                console.log(err);
                res.status(500).json({
                    error: err
                });
            });
        }
         else {
            res.status(422).json({
                message: 'invalid id'
            });
        }
        
    },

    /**
     * @description
     * HTTPS-Method : DELETE
     * Path : 'protocol://example.domain/resources/id'
     * description : remove a single records
     */
    delete: (req, res, next) => {
        if (req.body.userId) {
            User.remove({
                _id: req.body.userId
            })
            .exec()
            .then(result => {
                res.status(200).json({
                    message: 'user profile was deleted',
                    request: {
                        description: 'Get a list of all available profiles',
                        type: 'GET',
                        url: req.protocol + '://' + req.get('host') + '/profiles'
                    }
                });
            })
            .catch(err => {
                res.status(500).json({
                    error: err
                });
            });
        } if (req.body.adminId) {
            Admin.remove({
                _id: req.body.adminId
            })
            .exec()
            .then(result => {
                res.status(200).json({
                    message: 'user profile was deleted',
                    request: {
                        description: 'Get a list of all available profiles',
                        type: 'GET',
                        url: req.protocol + '://' + req.get('host') + '/profiles'
                    }
                });
            })
            .catch(err => {
                res.status(500).json({
                    error: err
                });
            });
        } if (req.body.companyId) {
            Company.remove({
                _id: req.body.companyId
            })
            .exec()
            .then(result => {
                res.status(200).json({
                    message: 'user profile was deleted',
                    request: {
                        description: 'Get a list of all available profiles',
                        type: 'GET',
                        url: req.protocol + '://' + req.get('host') + '/profiles'
                    }
                });
            })
            .catch(err => {
                res.status(500).json({
                    error: err
                });
            });
        }
         else {
            res.status(422).json({
                message: 'invalid id'
            });
        }
    }
};