/**
 * author: https://github.com/Simple-MAX
 * Praktil API - appliactions.js
 */

// import your npm module here 
const express = require('express');
const mongoose = require('mongoose');
const router = express.Router();

const Application = require('../models/application');
const Job = require('../models/job');
const Authenticate = require('../middleware/authenticate');

router.get('/', Authenticate,(req, res, next) => {
    Application
        .find()
        .populate('job','_id name location date availability category')
        .exec()
        .then(result => {
            if (result.length >= 0) {
                const response = {
                    count: result.length,
                    appliactions: result.map(doc => {
                        return {
                            _id: doc._id,
                            date: doc.date,
                            job: doc.job,
                            request: {
                                description: 'Get a single application',
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

router.post('/', Authenticate,(req, res, next) => {
    Job.findById(req.body.job)
        .then(job => {
            if (!job) {
                return res.status(404).json({
                    message: 'Job not found'
                });
            }
            const application = new Application({
                _id: mongoose.Types.ObjectId(),
                job: req.body.job
            });
            return application.save()

        }).then(result => {
            res.status(201).json({
                message: 'application was created',
                application: result
            });
        })
        .catch(error => {
            res.status(500).json({
                error: error
            });
        });
});

router.get('/:applicationId', Authenticate,(req, res, next) => {
    Application.findById(req.params.applicationId)
    .populate('job')
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
});

router.delete('/:applicationId', Authenticate,(req, res, next) => {
    Application.remove({ _id: req.params.applicationId})
    .exec()
    .then(result => {
        res.status(200).json({
            message: 'Application deleted',
            request: {
                description: 'Get a list of all available appliaction',
                type: 'GET',
                url: req.protocol + '://' + req.get('host') + '/appliactions'
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