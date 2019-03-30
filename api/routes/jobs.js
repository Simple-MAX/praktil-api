/**
 * author: https://github.com/Simple-MAX
 * Praktil API - jobs.js
 */

// import your npm module here 
const express = require('express');
const mongoose = require('mongoose');
const multer = require('multer');

const router = express.Router();

const storage = multer.diskStorage({
    destination: function(req, file, cb) {
        cb(null, './uploads/jobs');
    },
    filename: function(req, file, cb) {
        cb(null, new Date().toISOString() + file.originalname);
    }
});

const fileFilter = (req, file, cb) => {
    if (file.mimetype === 'image/jpeg' || file.mimetype === 'image/png') {
        cb(null, true);
    } else {
        cb(null, false);
    }
}

const upload = multer({
    storage: storage,
    limits: {
        fileSize: 1024 * 1024 * 6
    },
    fileFilter: fileFilter
});

const Job = require('../models/job');


/**
 * @description
 * HTTPS-Method : GET
 * Path : 'protocol://example.domain/resources'
 */

router.get('/', (req, res, next) => {
    Job.find()
        .select("name date location category jobImage _id")
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
});

/**
 * @description
 * HTTPS-Method : POST
 * Path : 'protocol://example.domain/resources'
 */

router.post('/', upload.single('jobImage'),(req, res, next) => {
    const job = new Job({
        _id: new mongoose.Types.ObjectId(),
        name: req.body.name,
        description: req.description,
        location: req.location,
        contact_info: req.contact_info,
        category: req.category,
        date: req.date,
        publish: req.publish,
        will_start_at: req.will_start_at,
        will_end_at: req.will_end_at,
        availability: req.body.availability,
        jobImage: req.file.path
    });
    job.save()
        .then(result => {
            console.log(result);
            res.status(201).json({
                createdJob: job
            });
        })
        .catch(err => console.log(err));
});

/**
 * @description
 * HTTPS-Method : GET
 * Path : 'protocol://example.domain/resources/id'
 */

router.get('/:jobId', (req, res, next) => {
    const id = req.params.jobId;
    Job.findById(id)
        .exec()
        .then(doc => {
            console.log(doc);
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
            console.log(err);
            res.status(500).json({
                error: err
            });
        });
});

/**
 * @description
 * HTTPS-Method : PATCH
 * Path : 'protocol://example.domain/resources/id'
 */

router.patch('/:jobId', (req, res, next) => {
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
});

/**
 * @description
 * HTTPS-Method : DELETE
 * Path : 'protocol://example.domain/resources/id'
 */

router.delete('/:jobId', (req, res, next) => {
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
});

module.exports = router;