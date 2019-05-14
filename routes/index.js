const express = require('express');
const router = express.Router();

const {
  ensureAuthenticated
} = require('../config/auth');

/* GET home page. */
router.get('/', function (req, res, next) {
  res.render('landing', {
    title: 'Express'
  });
});

router.get('/dashboard', ensureAuthenticated,(req, res, next) => {
  if (req.user.isUser) {
    res.render('internships_dashboard', {
      name: req.user.name
    });
  }

  if (req.user.isCompany) {
    res.render('companies_dashboard', {
      layout: 'companies',
      name: req.user.name
    });
  }

});

router.get('/intern/settings', ensureAuthenticated, (req, res, next) => {
  res.render('internships_settings', {
    name: 'req.user.name'
  });
});

router.get('/dashboard/settings', ensureAuthenticated, (req, res, next) => {
  res.render('companies_settings', {
    layout: 'companies',
    name: req.user.name
  });
});

router.get('/dashboard/announcements', ensureAuthenticated, (req, res, next) => {
  res.render('companies_announcements', {
    layout: 'companies',
    name: req.user.name
  });
});

router.get('/announcements', (req, res, next) => {
  res.render('announcements')
});

router.get('/companies', (req, res, next) => {
  res.render('companies')
});

router.get('/checkauth', ensureAuthenticated, function (req, res) {

  res.status(200).json({
    status: 'Login successful!'
  });
});

module.exports = router;