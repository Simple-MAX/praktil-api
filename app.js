/**
 * author: https://github.com/Simple-MAX
 * Praktil API - app.js
 */

// import your npm module here 
const express = require('express');
const morgan = require('morgan');

// just an express instens for easy use
const app = express();

// import your new routes here
const jobsRoutes = require('./api/routes/jobs');
const applicationsRoutes = require('./api/routes/applications');

// use morgan as logger
app.use(morgan('dev'));

// add the newly created route to the main url
app.use('/jobs', jobsRoutes);
app.use('/applications', applicationsRoutes);

// that everything is fine
app.use((req, res, next) => {
    res.status(200).json({
        message: 'It works!'
    });
});

// send an error fon not found path
app.use((req, res, next) => {
    const error = new Error('Not found');
    error.status = 404;
    next(error);
});

// send an error object if we had an server failure
app.use((error, req, res, next) => {
    res.status(error.status || 500);
    res.json({
        error: {
            message: error.message
        }
    });
});

module.exports = app;