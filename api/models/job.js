const mongoose = require('mongoose');

const jobSchema = mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    profile_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Profile',
        required: true
    },
    name: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: false
    },
    location: {
        type: String,
        required: false
    },
    contact_info: {
        type: String,
        required: false
    },
    category: {
        type: String,
        required: false
    },
    date: {
        type: Date,
        default: Date.now
    },
    publish: {
        type: Boolean,
        default: false
    },
    availability: {
        type: Number,
        required: false
    },
    will_start_at: {
        type: Date,
        default: Date.now,
        required: false
    },
    will_end_at: {
        type: Date,
        default: Date.now,
        required: false
    },
    jobImage: {
        type: String,
        required: false
    }
});

module.exports = mongoose.model('Job', jobSchema);