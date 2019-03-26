/**
 * author: https://github.com/Simple-MAX
 * Praktil API - jobs.js
 */

// import your npm module here 
const express = require('express');
const mongoose = require('mongoose');
const router = express.Router();

const Job = require('../models/job');

router.get('/', (req, res, next) => {
    Job.find()
    .exec()
    .then(docs => {
        if (docs.length >= 0) {
            res.status(200).json(docs);   
        } else {
            res.status(200).json({ message: 'database is empty' });   
        }
    })
    .catch(err => {
        res.status(500).json({error: err});
    });
});

router.post('/', (req, res, next) => {
    const job = new Job({
        _id: new mongoose.Types.ObjectId(),
        name: req.body.name,
        availability: req.body.availability
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

router.get('/:jobId', (req, res, next) => {
    const id = req.params.jobId;
    Job.findById(id)
    .exec()
    .then(doc => { 
        console.log(doc);
        if (doc) {
            res.status(200).json(doc);
        } else {
            res.status(404).json({ message: 'not found' })
        }
    })
    .catch(err => {
        console.log(err);
        res.status(500).json({ error: err });
    });
});

router.patch('/:jobId', (req, res, next) => {
    const id = req.params.jobId;
    // create a list of incoming update
    const updateOPS = {};

    // loop the list and extract the element for update 
    for (const ops of req.body) {
        updateOPS[ops.propName] = ops.value;
    }

    // update the job object in the datebase
    Job.update({_id: id}, { $set: updateOPS })
    .exec()
    .then(result => {
        res.status(200).json(result);
    })
    .catch(error => {
        res.status(500).json({
            error: error
        });
    });
});

router.delete('/:jobId', (req, res, next) => {
    const id = req.params.jobId;
    Job.remove({_id: id})
    .exec()
    .then(result => {
        res.status(200).json(result);
    })
    .catch(err => {
        res.status(500).json({error: err});
    });
});

module.exports = router;