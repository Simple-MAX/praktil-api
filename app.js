/**
 * author: https://github.com/Simple-MAX
 * Praktil API - app.js
 */

// import your npm module here 
const express = require('express');
const morgan = require('morgan');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');

// import your files here
const config = require('./config.json')

// just an express instens for easy use
const app = express();

// import your new routes here
const jobsRoutes = require('./api/routes/jobs');
const applicationsRoutes = require('./api/routes/applications');
const usersRoutes = require('./api/routes/users');

mongoose.connect(`mongodb://${config.env.database.mongodb.server}:${config.env.database.mongodb.port}/${config.env.database.mongodb.database}`, {
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
app.use(morgan('dev'));
app.use(bodyParser.urlencoded({
    extended: true
}));
app.use(bodyParser.json());

// make the uploads folder static
app.use('/uploads/jobs/', express.static('uploads/jobs/'));

// cors
app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept, Authorization');
    if (req.method === 'OPTIONS') {
        res.header('Access-Control-Allow-Methods', 'PUT, POST, PATCH, DELETE, GET');
        return res.status(200).json({});
    }
    next();
});

// add the newly created route to the main url
app.use('/jobs', jobsRoutes);
app.use('/applications', applicationsRoutes);
app.use('/users', usersRoutes);

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