const mongoose = require('mongoose');

const attandanceSchema = new mongoose.Schema({
    role: String,
    userId: String,
    loginTime: String,
    loginDay: String,
    loginDate: String,
    logoutTime: String,
    logoutDay: String,
    logoutDate: String,
    totalTime: String,
    updatedAt: Date,
    createdAt: Date
});

const Attandance = mongoose.model('attandance', attandanceSchema);

module.exports = Attandance;
