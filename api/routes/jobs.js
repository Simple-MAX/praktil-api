/**
 * author: https://github.com/Simple-MAX
 * Praktil API - jobs.js
 */

// import your npm module here 
const express = require('express');
const router = express.Router();

router.get('/', (req, res, next) => {
    res.status(200).json({
        message: 'Handling GET requests to /jobs'
    });
});

router.post('/', (req, res, next) => {
    res.status(201).json({
        message: 'Handling POST requests to /jobs'
    });
});

router.get('/:jobId', (req, res, next) => {
    const id = req.params.jobId;
    if (id === 'hello') {
        res.status(200).json({
            message: 'hello!'
        });
    }
});

router.patch('/:jobId', (req, res, next) => {
        res.status(200).json({message: 'update jobs!'});
});

router.delete('/:jobId', (req, res, next) => {
    res.status(200).json({message: 'deleted jobs!'});
});

module.exports = router;