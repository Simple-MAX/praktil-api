/**
 * author: https://github.com/Simple-MAX
 * Praktil API - jobs.js
 */

// import your npm module here 
const express = require('express');
const mongoose = require('mongoose');
const multer = require('multer');

const router = express.Router();

// file path
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, './uploads/jobs');
    },
    filename: function (req, file, cb) {
        cb(null, new Date().toISOString() + file.originalname);
    }
});

// file validation
const fileFilter = (req, file, cb) => {
    if (file.mimetype === 'image/jpeg' || file.mimetype === 'image/png') {
        cb(null, true);
    } else {
        cb(null, false);
    }
}

// upload config
const upload = multer({
    storage: storage,
    limits: {
        fileSize: 1024 * 1024 * 6
    },
    fileFilter: fileFilter
});

// import your controller && middleware
const Authenticate = require('../middleware/authenticate');
const controller = require('../controllers/jobs');

/**
 * @description
 * HTTPS-Method : GET
 * Path : 'protocol://example.domain/resources'
 */

router.get('/', controller.list); // Router.Method(path, middleware, controller.function)

/**
 * @description
 * HTTPS-Method : POST
 * Path : 'protocol://example.domain/resources'
 */

router.post('/', Authenticate, upload.single('jobImage'), controller.create); // Router.Method(path, middleware, controller.function)

/**
 * @description
 * HTTPS-Method : GET
 * Path : 'protocol://example.domain/resources/id'
 */

router.get('/:jobId', controller.show); // Router.Method(path, middleware, controller.function)

/**
 * @description
 * HTTPS-Method : PATCH
 * Path : 'protocol://example.domain/resources/id'
 */

router.patch('/:jobId', Authenticate, controller.update); // Router.Method(path, middleware, controller.function)

/**
 * @description
 * HTTPS-Method : DELETE
 * Path : 'protocol://example.domain/resources/id'
 */

router.delete('/:jobId', Authenticate, controller.delete); // Router.Method(path, middleware, controller.function)

module.exports = router;