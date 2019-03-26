const express = require('express');
const app = express();

const jobsRoutes = require('./api/routes/jobs');
const applicationsRoutes = require('./api/routes/applications');

app.use('/jobs', jobsRoutes);
app.use('/applications', applicationsRoutes);

app.use((req, res, next) => {
    res.status(200).json({
        message: 'It works!'
    });
});

module.exports = app;