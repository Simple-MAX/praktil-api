// import your npm module here 
const mongoose = require('mongoose');
const Job = require('../models/job');

/**
 * Author: https://github.com/Simple-MAX
 * Praktil API - jobs.js
 * @description :: Server-side logic for managing jobs.
 */
module.exports = {

    /**
     * @description
     * HTTPS-Method : GET
     * Path : 'protocol://example.domain/resources'
     * description : return a list of all records
     */
    list: (req, res, next) => {
        Job.find()
            .select("name date location category jobImage _id")
            .populate('Profile', 'org_number website image company_name _id')
            .exec()
            .then(docs => {
                if (docs.length >= 0) {
                    const response = {
                        count: docs.length,
                        jobs: docs.map(doc => {
                            return {
                                _id: doc._id,
                                name: doc.name,
                                date: doc.date,
                                location: doc.location,
                                category: doc.category,
                                image: {
                                    description: 'Get the image for the job',
                                    type: 'GET',
                                    url: req.protocol + '://' + req.get('host') + '/' + doc.jobImage
                                },
                                request: {
                                    description: 'Get a single job',
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
    create: (req, res, next) => {
        const job = new Job({
            _id: new mongoose.Types.ObjectId(),
            profile_id: req.body.profile_id,
            name: req.body.name,
            description: req.body.description,
            location: req.body.location,
            contact_info: req.body.contact_info,
            category: req.body.category,
            publish: req.body.publish,
            will_start_at: req.body.will_start_at,
            will_end_at: req.body.will_end_at,
            availability: req.body.availability,
            jobImage: req.file.path
        });
        job.save()
            .then(result => {
                res.status(201).json({
                    createdJob: result
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
        const id = req.params.jobId;
        Job.findById(id)
            .populate('Profile', 'org_number website image company_name _id')
            .exec()
            .then(doc => {
                if (doc) {
                    res.status(200).json({
                        job: doc,
                        request: {
                            description: 'Get a list of all jobs available',
                            types: 'GET',
                            url: req.protocol + '://' + req.get('host') + req.originalUrl
                        }
                    });
                } else {
                    res.status(404).json({
                        message: 'not found'
                    })
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
     * Path : 'protocol://example.domain/resources/id'
     * description : return a single records
     */
    search: (req, res, next) => {
        const query = req.query
        if (query.name) {
            Job.find({
                    name: query.name
                }).populate('Profile', 'org_number website image company_name _id')
                .exec()
                .then(result => {
                    res.status(200).json({
                        count: result.length,
                        query: query.name,
                        result: result
                    });
                })
                .catch(error => {
                    res.status(500).json({
                        error: error
                    });
                });
        } else if (query.location) {
            Job.find({
                    location: query.location
                })
                .exec().populate('Profile', 'org_number website image company_name _id')
                .then(result => {
                    res.status(200).json({
                        count: result.length,
                        query: query.location,
                        result: result
                    });
                })
                .catch(error => {
                    res.status(500).json({
                        error: error
                    });
                });
        } else if (query.category) {
            Job.find({
                    category: query.category
                })
                .exec().populate('Profile', 'org_number website image company_name _id')
                .then(result => {
                    res.status(200).json({
                        count: result.length,
                        query: query.category,
                        result: result
                    });
                })
                .catch(error => {
                    res.status(500).json({
                        error: error
                    });
                });
        } else if (query.availability) {
            Job.find({
                    availability: query.availability
                }).populate('Profile', 'org_number website image company_name _id')
                .exec()
                .then(result => {
                    res.status(200).json({
                        count: result.length,
                        query: query.availability,
                        result: result
                    });
                })
                .catch(error => {
                    res.status(500).json({
                        error: error
                    });
                });
        } else if (query.date) {
            Job.find({
                    availability: query.date
                }).populate('Profile', 'org_number website image company_name _id')
                .exec()
                .then(result => {
                    res.status(200).json({
                        count: result.length,
                        query: query.date,
                        result: result
                    });
                })
                .catch(error => {
                    res.status(500).json({
                        error: error
                    });
                });
        }
    },

    /**
     * @description
     * HTTPS-Method : PATCH
     * Path : 'protocol://example.domain/resources/id'
     * description : update a single records
     */
    update: (req, res, next) => {
        const id = req.params.jobId;
        // create a list of incoming update
        const updateOPS = {};

        // loop the list and extract the element for update 
        for (const ops of req.body) {
            updateOPS[ops.propName] = ops.value;
        }

        // update the job object in the datebase
        Job.update({
                _id: id
            }, {
                $set: updateOPS
            })
            .exec()
            .then(result => {
                res.status(200).json({
                    message: 'Job updated',
                    request: {
                        description: 'Get a single job',
                        type: 'GET',
                        url: req.protocol + '://' + req.get('host') + req.originalUrl + '/' + result._id
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
     * HTTPS-Method : DELETE
     * Path : 'protocol://example.domain/resources/id'
     * description : remove a single records
     */
    delete: (req, res, next) => {
        const id = req.params.jobId;
        Job.remove({
                _id: id
            })
            .exec()
            .then(result => {
                res.status(200).json({
                    message: 'Job deleted',
                    request: {
                        description: 'Get a list of all jobs available',
                        type: 'GET',
                        url: req.protocol + '://' + req.get('host') + '/jobs'
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