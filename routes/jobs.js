/**
 * author: https://github.com/Simple-MAX
 * Praktil MVC - jobs.js
 */

// import your npm module here 
const express = require('express');
const router = express.Router();

// import your controller && middleware
const controller = require('../controllers/jobs');

/**
 * @description
 * HTTPS-Method : POST
 * Path : 'protocol://example.domain/resources'
 */

router.post('/create', controller.createJob); // Router.Method(path, middleware, controller.function)

/**
 * @description
 * HTTPS-Method : GET
 * Path : 'protocol://example.domain/resources'
 */

router.get('/all', controller.signout); // Router.Method(path, middleware, controller.function)


module.exports = router;