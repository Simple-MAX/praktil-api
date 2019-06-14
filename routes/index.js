const express = require('express');
const multer = require('multer');
const mongoose = require('mongoose');
const moment = require('moment');

const router = express.Router();
const Job = require('../api/models/job');
const User = require('../api/models/user');
const Application = require('../api/models/application');
const jobController = require('../controllers/jobs');
const userController = require('../controllers/users');
const applicationController = require('../controllers/applications');

const {
  transformApplication,
  transformJob
} = require('../controllers/merge');

const {
  dateToString
} = require('../helpers/date');
const {
  ensureAuthenticated
} = require('../config/auth');

var jobID = '';
var jobIDs = {};

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
  if (file.mimetype === 'image/jpeg' || file.mimetype === 'image/png' || file.mimetype === 'application/pdf') {
    cb(null, true);
  } else {
    cb(null, false);
  }
};

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
    isUser: req.user
  });
});

router.get('/dashboard', ensureAuthenticated, async (req, res, next) => {
  const cookie = req.cookies.userID;
  if (cookie === undefined) {
    var userID = req.user.id;
    res.cookie('userID', userID);
    console.log('cookie created successfully');
  } else {
    // yes, cookie was already present 
    console.log('cookie exists', cookie);
  }

  const allUsers = await userController.users();
  const interns = await userController.interns();
  const companies = await userController.companies();
  const usersCount = await userController.userCount();
  const companyCount = await userController.companyCount();
  const internCount = await userController.internCount();
  const userDailyCount = await userController.userDailyCount();
  const jobsCount = await jobController.jobCount();
  const jobDailyCount = await jobController.jobDailyCount();
  const jobs = await jobController.jobs();
  const applicationsCount = await applicationController.applicationsCount();
  const applicationsDailyCount = await applicationController.applicationsDailyCount();
  const applications = await applicationController.applications(cookie);

  console.log({
    users: usersCount,
    dailyUsers: userDailyCount,
    jobs: jobsCount,
    dailyJobs: jobDailyCount,
    applications: applicationsCount,
    dailyApplications: applicationsDailyCount
  });
  /*applications.forEach(application => {
    jobIDs['id'] = application.job
  })*/

  for (let index = 0; index < applications.length; index++) {
    jobIDs['id'] = applications[index];
  }
  console.log(applications);
  /*for (let index = 0; index < jobIDs.length; index++) {
    const element = jobController.myJobs(jobIDs[index]);
    console.log(element);
  }*/

  
  if (req.user.isUser) {
    res.render('internships_dashboard', {
      layout: 'internships',
      name: req.user.name,
      jobs: jobs,
      application: applications
    });
  }

  if (req.user.isCompany) {
    res.render('companies_dashboard', {
      layout: 'companies',
      name: req.user.name,
      jobs: jobs
    });
  }

  if (req.user.isAdmin) {
    res.render('admins_dashboard', {
      layout: 'admins',
      users: allUsers,
      companies: companies,
      interns: interns,
      jobs: jobs,
      count: {
        internCount: internCount,
        companyCount: companyCount,
        users: usersCount,
        dailyUsers: userDailyCount,
        jobs: jobsCount,
        dailyJobs: jobDailyCount,
        applications: applicationsCount,
        dailyApplications: applicationsDailyCount
      },
    })
  }

});

router.get('/intern/settings', ensureAuthenticated, (req, res, next) => {
  res.render('internships_settings', {
    name: 'req.user.name'
  });
});

router.get('/dashboard/settings', ensureAuthenticated, async (req, res, next) => {
  const jobs = await jobController.jobs();
  const started_school = new Date(req.user.started_school);
  const ended_school = new Date(req.user.ended_school);
  const started = moment(started_school).format('YYYY-MM-DD');
  const ended = moment(ended_school).format('YYYY-MM-DD');
  if (req.user.isUser) {
    res.render('internships_settings', {
      layout: 'internships',
      name: req.user.name,
      user: req.user,
      jobs: jobs,
      started: started,
      ended: ended,
    });
  }

  if (req.user.isCompany) {
    res.render('companies_settings', {
      layout: 'companies',
      name: req.user.name,
      user: req.user,
      jobs: jobs
    });
  }
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
    isUser: req.user,
    jobs: jobs
  })
});

router.get('/announcement/:announcementID', ensureAuthenticated,async (req, res, next) => {
  jobID = req.params.announcementID;
  const job = await Job.findById(req.params.announcementID);
  const company = await User.findById(job.creator);
  res.render('job', {
    isUser: req.user,
    job: job,
    company: company
  })
});

router.get('/companies', async (req, res, next) => {
  res.render('companies', {
    isUser: req.user
  })
});

router.get('/checkauth', ensureAuthenticated, function (req, res) {

  res.status(200).json({
    status: 'Login successful!'
  });
});

router.post('/dashboard/announcements/create', ensureAuthenticated,upload.single('jobImage'), jobController.createJob);

const fields = [
  {
    name: 'image'
  },
  {
    name: 'cv'
  },
  {
    name: 'letter'
  }
];

router.post('/update/profile', ensureAuthenticated,upload.fields(fields), userController.updateProfile);
router.post('/update/account', ensureAuthenticated,userController.update);
router.post('/notifications', ensureAuthenticated,userController.notifications);

router.post('/send/application', ensureAuthenticated,applicationController.sendApplication);
//router.post('/cancel/application:ID', applicationController.cancelApplication);


router.all('/session-flash', ( req, res ) => {
  req.session.sessionFlash = {
    type: 'info',
    message: 'This is a flash message using custom middleware and express-session.'
  }
  res.redirect(301, '/');
});

module.exports = router;