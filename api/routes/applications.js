/**
 * author: https://github.com/Simple-MAX
 * Praktil API - appliactions.js
 */

// import your npm module here 
const express = require('express');
const router = express.Router();

// import your controller && middleware
const Authenticate = require('../middleware/authenticate');
const controller = require('../controllers/applications');

/**
 * @description
 * HTTPS-Method : GET
 * Path : 'protocol://example.domain/resources'
 */

router.get('/', Authenticate, controller.list); // Router.Method(path, middleware, controller.function)

/**
 * @description
 * HTTPS-Method : POST
 * Path : 'protocol://example.domain/resources'
 */

router.post('/', Authenticate, controller.create); // Router.Method(path, middleware, controller.function)

/**
 * @description
 * HTTPS-Method : GET
 * Path : 'protocol://example.domain/resources/id'
 */

router.get('/:applicationId', Authenticate, controller.show); // Router.Method(path, middleware, controller.function)

/**
 * @description
 * HTTPS-Method : DELETE
 * Path : 'protocol://example.domain/resources/id'
 */

router.delete('/:applicationId', Authenticate, controller.delete); // Router.Method(path, middleware, controller.function)

module.exports = router;