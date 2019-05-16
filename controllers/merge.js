const Job = require('../api/models/job');
const User = require('../api/models/user');
const mongoose = require('mongoose');

const {
    dateToString
} = require('../helpers/date');
const DataLoader = require('dataloader');

const jobLoader = new DataLoader(jobIds => {
    return jobs(jobIds);
});

const userLoader = new DataLoader(userIds => {
    return User.find({
        _id: {
            $in: userIds
        }
    });
});

const jobs = async jobIds => {
    try {
        const jobs = await Event.find({
            _id: {
                $in: jobIds
            }
        });
        jobs.sort((a, b) => {
            return (
                jobIds.indexOf(a._id.toString()) - jobIds.indexOf(b._id.toString)
            );
        });

        return jobs.map(job => {
            return transformJob(job);
        });
    } catch (error) {
        throw error;
    }
}

const singleJob = async jobId => {
    try {
        const job = await jobLoader.load(jobId.toString());
        return job;
    } catch (error) {
        throw error;
    }
}

// populate 'creator'
const user = async userId => {
    try {
        const user = await userLoader.load(userId.toString());
        return {
            ...user._doc,
            _id: user.id,
            createdAnnouncements: jobLoader.load.bind(this, user._doc.createdAnnouncements)
        };
    } catch (error) {
        throw error;
    }
}

const transformJob = job => {
    return {
        ...job._doc,
        _id: job.id,
        creator: user.bind(this, job.creator)
    };
}

const transformApplication = application => {
    return {
        ...application._doc,
        _id: application.id,
        createdAt: dateToString(application._doc.createdAt),
        updatedAt: dateToString(application._doc.updatedAt),
        user: user.bind(this, application._doc.user),
        job: singleJob.bind(this, application._doc.job)
    };
}

exports.transformJob = transformJob;
exports.transformApplication = transformApplication;