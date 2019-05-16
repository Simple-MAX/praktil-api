const express = require('express');
const multer = require('multer');
const mongoose = require('mongoose');


const router = express.Router();
const Job = require('../api/models/job');
const User = require('../api/models/user');
const jobController = require('../controllers/jobs');
const userController = require('../controllers/users');

const { dateToString } = require('../helpers/date');
const {
  ensureAuthenticated
} = require('../config/auth');

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

/* GET home page. */
router.get('/', function (req, res, next) {
  res.render('landing', {
    user: req.user
  });
});

router.get('/dashboard', ensureAuthenticated, async(req, res, next) => {
  const jobs = await jobController.jobs();
  if (req.user.isUser) {
    res.render('internships_dashboard', {
      name: req.user.name,
      jobs: jobs
    });
  }

  if (req.user.isCompany) {
    res.render('companies_dashboard', {
      layout: 'companies',
      name: req.user.name,
      jobs: jobs
    });
  }

});

router.get('/intern/settings', ensureAuthenticated, (req, res, next) => {
  res.render('internships_settings', {
    name: 'req.user.name'
  });
});

router.get('/dashboard/settings', ensureAuthenticated, async (req, res, next) => {
  const jobs = await jobController.jobs();
  res.render('companies_settings', {
    layout: 'companies',
    name: req.user.name,
    user: req.user,
    jobs: jobs
  });
});

router.get('/dashboard/announcements', ensureAuthenticated, async (req, res, next) => {
  const jobs = await jobController.jobs();
  res.render('companies_announcements', {
    layout: 'companies',
    name: req.user.name,
    jobs: jobs
  });
});

router.get('/announcements', async (req, res, next) => {
  const jobs = await jobController.jobs();
  res.render('announcements', {
    jobs: jobs
  })
});

router.get('/announcement/:announcementID', async (req, res, next) => {
  const job = await Job.findById(req.params.announcementID);
  const company = await User.findById(job.creator);
  res.render('job', {
    job: job,
    company: company
  })
});

router.get('/companies', async (req, res, next) => {
  res.render('companies')
});

router.get('/checkauth', ensureAuthenticated, function (req, res) {

  res.status(200).json({
    status: 'Login successful!'
  });
});

router.post('/dashboard/announcements/create', upload.single('jobImage'), jobController.createJob);

router.post('/update/profile', upload.single('image'),userController.updateProfile);
router.post('/update/account',userController.update);
router.post('/notifications', userController.notifications);

module.exports = router;