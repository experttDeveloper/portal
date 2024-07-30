const mongoose = require('mongoose');

const leaveSchema = new mongoose.Schema({
    userId: String,
    type: String,
    reason: String,
    startDate: String,
    endDate: String,
    status: String,
    updatedAt: { type: Date, default: Date.now },
    createdAt: { type: Date, default: Date.now }
});

const Leave = mongoose.model('leave', leaveSchema);

module.exports = Leave;
