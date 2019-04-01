const mongoose = require('mongoose');

const profileSchema = mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    // personal info
    name: {
        type: String,
        required: false
    },
    lastname: {
        type: String,
        required: false
    },
    education: {
        type: String,
        required: false
    },
    school: {
        type: String,
        required: false
    },
    branches: [{
        branch: String
    }],
    location: {
        type: String,
        required: false
    },
    birthday: {
        type: Date,
        required: false
    },
    phone: {
        type: Number,
        required: false
    },
    // comany info
    company_name: {
        type: String,
        required: false
    },
    org_number: {
        type: Number,
        required: false
    },
    website: {
        type: String,
        required: false
    },
    description: {
        type: String,
        required: false
    },
    // social media
    facebook: {
        type: String,
        required: false
    },
    instagram: {
        type: String,
        required: false
    },
    linkedin: {
        type: String,
        required: false
    },
    // settings
    notifications: {
        type: Boolean,
        default: false
    },
    // files
    image: {
        type: String,
        required: false
    },
    cv: {
        type: String,
        required: false
    },
    letter: {
        type: String,
        required: false
    },
    // user type
    isAdmin: {
        type: Boolean,
        default: false
    },
    isCompany: {
        type: Boolean,
        default: false
    },
    isUser: {
        type: Boolean,
        default: false
    },
    user_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    },
    admin_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Admin'
    },
    company_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Company'
    },
    date: {
        type: Date,
        default: Date.now
    }
}, {
    timestamps: true
});

module.exports = mongoose.model('Profile', profileSchema);