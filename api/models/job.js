const mongoose = require('mongoose');

const jobSchema = mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    creator: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
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
        required: false
    },
    will_end_at: {
        type: Date,
        required: false
    },
    deadline: {
        type: Date,
        required: false
    },
    territories: {
        type: String,
        required: false
    },
    jobImage: {
        type: String,
        required: false
    }
}, { timestamps: true });

module.exports = mongoose.model('Job', jobSchema);