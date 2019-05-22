const Application = require('../api/models/application');
const {
    transformApplication,
    transformJob
} = require('./merge');
const Job = require('../api/models/job');
const User = require('../api/models/user');

const mongoose = require('mongoose');

module.exports = {
    applications: async (id, req, res, next) => {
        try {
            const applications = await Application.find({ user: id});
            return applications;
        } catch (error) {
            console.log(error);
        }
    },

    sendApplication: async (req, res, next) => {
        const fetchedJob = await Job.findOne({
            _id: req.body.id
        });
        const fetchedUser = await User.findOne({
            _id: req.user.id
        });

        const application = new Application({
            _id: new mongoose.Types.ObjectId(),
            name: fetchedJob.name,
            description: fetchedJob.description,
            user: fetchedUser,
            job: fetchedJob,
        });

        try {
            await application.save();
            fetchedUser.appliedJobs.push(application);
            fetchedJob.requestedForThisJob.push(fetchedUser);
            await fetchedUser.save();
            await fetchedJob.save();
            res.redirect('/dashboard')
        } catch (error) {
            console.log(error);
        }
    },

    cancelApplication: async (req, res, next) => {
        const id = req.params.ID;
        try {
            const application = await Application.findById(id).populate("job");
            const job = transformJob(application.job);
            await application.deleteOne({
                _id: id
            });
            return job;
        } catch (error) {
            console.log(error);
        }
    },

    application: async (id) => {
        await Application.findOne({_id: id}).then((data)=>{
            return data
        }).catch(error => { console.log(error) });
    }
}