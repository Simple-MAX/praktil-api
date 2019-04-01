/**
 * author: https://github.com/Simple-MAX
 * Praktil API - profiles.js
 */

// import your npm module here 
const express = require('express');
const multer = require('multer');
const router = express.Router();

// file path
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, './uploads/profiles');
    },
    filename: function (req, file, cb) {
        cb(null, new Date().toISOString() + file.originalname);
    }
});

// file validation
const fileFilter = (req, file, cb) => {
    if (file.mimetype === 'image/jpeg' || file.mimetype === 'image/png' || file.mimetype === 'application/pdf') {
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

const mulFiles = multer({
    storage: storage,
    limits: {
        fileSize: 1024 * 1024 * 6
    },
    fileFilter: fileFilter
}).fields({
    name: 'image',
    name: 'cv',
    name: 'letter'
});

// import your controller && middleware
const Authenticate = require('../middleware/authenticate');
const controller = require('../controllers/profiles');

/**
 * @description
 * HTTPS-Method : GET
 * Path : 'protocol://example.domain/resources'
 */

router.get('/admins', Authenticate, controller.listOfAdmin); // Router.Method(path, middleware, controller.function)

/**
 * @description
 * HTTPS-Method : GET
 * Path : 'protocol://example.domain/resources'
 */

router.get('/companies', Authenticate, controller.listOfCompany); // Router.Method(path, middleware, controller.function)

/**
 * @description
 * HTTPS-Method : GET
 * Path : 'protocol://example.domain/resources'
 */

router.get('/users', Authenticate, controller.listOfUser); // Router.Method(path, middleware, controller.function)

/**
 * @description
 * HTTPS-Method : POST
 * Path : 'protocol://example.domain/resources'
 */

router.post('/admin', Authenticate, upload.single('image'), controller.createAAdminProfile); // Router.Method(path, middleware, controller.function)

/**
 * @description
 * HTTPS-Method : POST
 * Path : 'protocol://example.domain/resources'
 */

router.post('/company', Authenticate, upload.single('image'), controller.createACompanyProfile); // Router.Method(path, middleware, controller.function)

/**
 * @description
 * HTTPS-Method : POST
 * Path : 'protocol://example.domain/resources'
 */

router.post('/user', Authenticate, upload.fields([{
    name: 'image',
    maxCount: 1
}, {
    name: 'cv',
    maxCount: 1
}, {
    name: 'letter',
    maxCount: 1
}]), controller.createAUserProfile); // Router.Method(path, middleware, controller.function)

/**
 * @description
 * HTTPS-Method : GET
 * Path : 'protocol://example.domain/resources/id'
 */

router.get('/', Authenticate, controller.show); // Router.Method(path, middleware, controller.function)

/**
 * @description
 * HTTPS-Method : DELETE
 * Path : 'protocol://example.domain/resources/id'
 */

router.delete('/:profileId', Authenticate, controller.delete); // Router.Method(path, middleware, controller.function)

module.exports = router;