const express = require('express');
const router = express.Router();

router.get('/', (req, res, next) => {
    res.status(200).json({
        message: 'application were fetched'
    });
});

router.post('/', (req, res, next) => {
    res.status(201).json({
        message: 'application was created'
    });
});

router.get('/:applicationId', (req, res, next) => {
    const id = req.params.applicationId;
    if (id === 'hello') {
        res.status(200).json({
            message: 'application info!'
        });
    }
});

router.delete('/:applicationId', (req, res, next) => {
    res.status(200).json({message: 'deleted application!'});
});

module.exports = router;