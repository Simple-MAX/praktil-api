const mongoose = require('mongoose');

const userSchema = mongoose.Schema({
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
   info_email: {
        type: String,
        unique: true,
        match: /[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/
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
        default: true
    },
    email: {
        type: String,
        required: true,
        unique: true,
        match: /[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/
    },
    password: {
        type: String,
        required: true
    },
    confirmed: {
        type: Boolean,
        default: false
    },
    createdAnnouncements: [
        {
            type : mongoose.Schema.Types.ObjectId,
            ref : 'Job'
        }
    ]
},  { timestamps: true });

module.exports = mongoose.model('User', userSchema);