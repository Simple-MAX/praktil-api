const mongoose = require('mongoose');

const jobSchema = mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    name: String,
    availability: Number
});

module.exports = mongoose.model('Job', jobSchema);