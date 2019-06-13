/**
 * author: https://github.com/Simple-MAX
 * Praktil API - api.js
 */

// import your npm module here 
const express = require('express');
const morgan = require('morgan');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');

// import your files here
const config = require('./config.json')

// just an express instens for easy use
const api = express();

// import your new routes here
const jobsRoutes = require('./api/routes/jobs');
const applicationsRoutes = require('./api/routes/applications');
const usersRoutes = require('./api/routes/users');
const adminRoutes = require('./api/routes/admins');
const companyRoutes = require('./api/routes/companies');
const profileRoutes = require('./api/routes/profiles'); 

mongoose.connect(`mongodb://${config.dbUsername}:${config.dbPass}@ds141815.mlab.com:41815/heroku_v142fhx1`, {
    useNewUrlParser: true,
    useCreateIndex: true
});

mongoose.connection.once('open', () => {
    console.log('Connection has been made ...');
}).on('error', (error) => {
    console.log('Connection error: ', error);
});

/**
 * setup all of your middleware
 */
api.use(morgan('dev'));
api.use(bodyParser.urlencoded({
    extended: true
}));
api.use(bodyParser.json());

// make the uploads folder static
api.use('/uploads/jobs/', express.static('uploads/jobs/'));
api.use('/uploads/profiles/', express.static('uploads/profiles/'));

// cors
api.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept, Authorization');
    if (req.method === 'OPTIONS') {
        res.header('Access-Control-Allow-Methods', 'PUT, POST, PATCH, DELETE, GET');
        return res.status(200).json({});
    }
    next();
});

// add the newly created route to the main url
api.use('/jobs', jobsRoutes);
api.use('/applications', applicationsRoutes);
api.use('/api/V1/users', usersRoutes);
api.use('/auth/admins', adminRoutes);
api.use('/auth/companies', companyRoutes);
api.use('/profiles', profileRoutes);

// that everything is fine
api.use((req, res, next) => {
    res.status(200).json({
        message: 'It works!'
    });
});

// send an error fon not found path
api.use((req, res, next) => {
    const error = new Error('Not found');
    error.status = 404;
    next(error);
});

// send an error object if we had an server failure
api.use((error, req, res, next) => {
    res.status(error.status || 500);
    res.json({
        error: {
            message: error.message
        }
    });
});

module.exports = api;