/**
 * author: https://github.com/Simple-MAX
 * Praktil API - admins.js
 */

// import your npm module here 
const express = require('express');
const router = express.Router();

// import your controller && middleware
const controller = require('../controllers/admins');

/**
 * @description
 * HTTPS-Method : POST
 * Path : 'protocol://example.domain/resources'
 */

router.post('/signup', controller.signup); // Router.Method(path, middleware, controller.function)

/**
 * @description
 * HTTPS-Method : POST
 * Path : 'protocol://example.domain/resources'
 * description : sign in a user and return a token
 */

router.post('/signin', controller.signin); // Router.Method(path, middleware, controller.function)

/**
 * @description
 * HTTPS-Method : GET
 * Path : 'protocol://example.domain/resources/id'
 * description : delete an account
 */

router.delete('/:userId', controller.delete); // Router.Method(path, middleware, controller.function)

module.exports = router;