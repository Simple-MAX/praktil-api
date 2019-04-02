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
                                company_name: doc.company_name,
                                location: doc.location,
                                description: doc.description,
                                website: doc.website,
                                org_number: doc.org_number,
                                image: req.protocol + '://' + req.get('host') + '/' + doc.image,

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
        Profile.findById(req.body.company_id)
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
     * HTTPS-Method : PATCH
     * Path : 'protocol://example.domain/resources/id'
     * description : update a single records
     */
    updateUserProfile: (req, res, next) => {
        const id = req.params.userId;
        // create a list of incoming update
        const updateOPS = {};

        // loop the list and extract the element for update 
        for (const ops of req.body) {
            updateOPS[ops.propName] = ops.value;
        }

        // update the job object in the datebase
        Profile.update({
                _id: id
            }, {
                $set: updateOPS
            })
            .exec()
            .then(result => {
                res.status(200).json({
                    message: 'profile was updated',
                    result: result,
                    request: {
                        description: 'Get a single profile',
                        type: 'GET',
                        url: req.protocol + '://' + req.get('host') + '/user-type'
                    }
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
     * HTTPS-Method : PATCH
     * Path : 'protocol://example.domain/resources/id'
     * description : update a single records
     */
    updateAdminProfile: (req, res, next) => {
        const id = req.params.adminId;
        // create a list of incoming update
        const updateOPS = {};

        // loop the list and extract the element for update 
        for (const ops of req.body) {
            updateOPS[ops.propName] = ops.value;
        }

        // update the job object in the datebase
        Profile.update({
                _id: id
            }, {
                $set: updateOPS
            })
            .exec()
            .then(result => {
                res.status(200).json({
                    message: 'profile was updated',
                    result: result,
                    request: {
                        description: 'Get a single profile',
                        type: 'GET',
                        url: req.protocol + '://' + req.get('host') + '/user-type'
                    }
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
     * HTTPS-Method : PATCH
     * Path : 'protocol://example.domain/resources/id'
     * description : update a single records
     */
    updateCompanyProfile: (req, res, next) => {
        const id = req.params.companyId;
        // create a list of incoming update
        const updateOPS = {};

        // loop the list and extract the element for update 
        for (const ops of req.body) {
            updateOPS[ops.propName] = ops.value;
        }

        // update the job object in the datebase
        Profile.update({
                _id: id
            }, {
                $set: updateOPS
            })
            .exec()
            .then(result => {
                res.status(200).json({
                    message: 'profile was updated',
                    result: result,
                    request: {
                        description: 'Get a single profile',
                        type: 'GET',
                        url: req.protocol + '://' + req.get('host') + '/user-type'
                    }
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
    showUserProfile: (req, res, next) => {
        User.find({
                _id
            })
            .populate('user')
            .exec()
            .then(result => {
                if (result) {
                    const response = {
                        profile: result.map(doc => {
                            return {
                                _id: doc._id,
                                user_id: doc.user_id,
                                name: doc.name,
                                school: doc.school,
                                education: doc.education,
                                location: doc.location,
                                phone: doc.phone,
                                birthday: doc.birthday,
                                notifications: doc.notifications,
                                facebook: doc.facebook,
                                instagram: doc.instagram,
                                linkedin: doc.linkedin,
                                image: req.protocol + '://' + req.get('host') + '/' + doc.image,
                                cv: req.protocol + '://' + req.get('host') + '/' + doc.cv,
                                letter: req.protocol + '://' + req.get('host') + '/' + doc.letter,
                                createdAt: doc.createdAt,
                                updatedAt: doc.updatedAt,
                                branches: doc.branches,
                                request: {
                                    description: 'Get a list of all available profiles',
                                    types: 'GET',
                                    url: req.protocol + '://' + req.get('host') + '/profiles'
                                }
                            }
                        })
                    }
                    res.status(200).json(response);
                } else {
                    res.status(404).json({
                        message: 'not found'
                    })
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
     * HTTPS-Method : GET
     * Path : 'protocol://example.domain/resources/id'
     * description : return a single records
     */
    showAdminProfile: (req, res, next) => {
        Admin.find({
                _id: req.params.adminId
            })
            .populate('admin')
            .exec()
            .then(result => {
                if (result) {
                    const response = {
                        profile: result.map(doc => {
                            return {
                                _id: doc._id,
                                admin_id: doc.admin_id,
                                name: doc.admin_name,
                                image: req.protocol + '://' + req.get('host') + '/' + doc.image,
                                createdAt: doc.createdAt,
                                updatedAt: doc.updatedAt,
                                request: {
                                    description: 'Get a list of all available profiles',
                                    types: 'GET',
                                    url: req.protocol + '://' + req.get('host') + '/profiles'
                                }
                            }
                        })
                    }
                    res.status(200).json(response);
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
    },

    /**
     * @description
     * HTTPS-Method : GET
     * Path : 'protocol://example.domain/resources/id'
     * description : return a single records
     */
    showCompanyProfile: (req, res, next) => {
        Profile.find({
                _id: req.params.companyId
            })
            .populate('company')
            .exec()
            .then(result => {
                if (result) {
                    const response = {
                        profile: result.map(doc => {
                            return {
                                _id: doc._id,
                                company_id: doc.company_id,
                                company_name: doc.company_name,
                                location: doc.location,
                                phone: doc.phone,
                                facebook: doc.facebook,
                                instagram: doc.instagram,
                                linkedin: doc.linkedin,
                                description: doc.description,
                                website: doc.website,
                                org_number: doc.org_number,
                                image: req.protocol + '://' + req.get('host') + '/' + doc.image,
                                createdAt: doc.createdAt,
                                updatedAt: doc.updatedAt,
                                request: {
                                    description: 'Get a list of all available profiles',
                                    types: 'GET',
                                    url: req.protocol + '://' + req.get('host') + '/profiles'
                                }
                            }
                        })
                    }
                    res.status(200).json(response);
                } else {
                    res.status(404).json({
                        message: 'not found'
                    })
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
     * HTTPS-Method : DELETE
     * Path : 'protocol://example.domain/resources/id'
     * description : remove a single records
     */
    deleteUserProfile: (req, res, next) => {
        Profile.remove({
                _id: req.params.userId
            })
            .exec()
            .then(result => {
                res.status(200).json({
                    message: 'a user profile was deleted',
                    request: {
                        description: 'Get a list of all profile appliaction',
                        type: 'GET',
                        url: req.protocol + '://' + req.get('host') + '/profiles/users'
                    }
                });
            })
            .catch(err => {
                res.status(500).json({
                    error: err
                });
            });
    },

    deleteAdminProfile: (req, res, next) => {
        Profile.remove({
                _id: req.params.adminId
            })
            .exec()
            .then(result => {
                res.status(200).json({
                    message: 'a user profile was deleted',
                    request: {
                        description: 'Get a list of all profile appliaction',
                        type: 'GET',
                        url: req.protocol + '://' + req.get('host') + '/profiles/users'
                    }
                });
            })
            .catch(err => {
                res.status(500).json({
                    error: err
                });
            });
    },

    deleteCompanyProfile: (req, res, next) => {
        Profile.remove({
                _id: req.params.companyId
            })
            .exec()
            .then(result => {
                res.status(200).json({
                    message: 'a user profile was deleted',
                    request: {
                        description: 'Get a list of all profile appliaction',
                        type: 'GET',
                        url: req.protocol + '://' + req.get('host') + '/profiles/users'
                    }
                });
            })
            .catch(err => {
                res.status(500).json({
                    error: err
                });
            });
    }
};