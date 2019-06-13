const Job = require('../api/models/job');
const User = require('../api/models/user');
const mongoose = require('mongoose');
const moment = require('moment');

const {
    transformJob
} = require('./merge');
const {
    dateToString
} = require('../helpers/date');

module.exports = {


    jobCount: async (req, res, next) => {
        const jobs = await Job.find().count()
        console.log(jobs)
        return jobs
    },

    jobDailyCount: async (req, res, next) => {
        const start = moment().startOf('day');
        const end = moment().endOf('day');
        const jobs = await Job.find({ createdAt: { $gte: start, $lt: end }}).count()
        console.log(jobs)
        return jobs
    },

    jobs: async (req, res, next) => {
        try {
            const jobs = await Job.find();
            return jobs.map(job => {
                return transformJob(job);
            })
        } catch (error) {
            throw error;
        }
    },

    myJobs: async (id, req, res, next) => {
        try {
            const jobs = await Job.find({ _id: id});
            return jobs;
        } catch (error) {
            console.log(error);
        }
    },

    createJob: async (req, res, next) => {
        if (!req.login) {
            res.redirect('/');
        }

        const job = new Job({
            _id: new mongoose.Types.ObjectId(),
            creator: req.user.id,
            name: req.body.name,
            looking_for: req.body.looking_for,
            requirement: req.body.requirement,
            application: req.body.application,
            description: req.body.description,
            location: req.body.location,
            contact_info: req.body.contact_info,
            category: req.body.category,
            publish: req.body.publish,
            territories: req.body.territories,
            deadline: req.body.deadline,
            will_start_at: req.body.will_start_at,
            will_end_at: req.body.will_end_at,
            availability: req.body.availability,
            jobImage: req.file.path
        });

        let createdJob;

        try {
            const result = await job.save();

            createdJob = transformJob(result);

            const creator = await User.findOne({_id: req.user.id});

            if (!creator) {
                res.redirect('/dashboard');
            }

            creator.createdAnnouncements.push(job);
            await creator.save();

            res.redirect('/dashboard')
        } catch (error) {
            console.log(error);
        }
    }
}