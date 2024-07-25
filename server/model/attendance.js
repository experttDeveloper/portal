const mongoose = require('mongoose');

const sessionSchema = new mongoose.Schema({
    punchInDate: { type: String, required: true },
    punchInDay: { type: String, required: true },
    punchInTime: { type: String, required: true },
    punchOutDate: { type: String },
    punchOutDay: { type: String },
    punchOutTime: { type: String },
    totalTime: { type: String }
});

const attendanceSchema = new mongoose.Schema({
    role: { type: String, required: true },
    userId: { type: String, required: true },
    date: { type: String, required: true },
    sessions: [sessionSchema],
    totalHours: { type: String, default: "0:0" },
    updatedAt: { type: Date, default: Date.now },
    createdAt: { type: Date, default: Date.now }
});

const Attendance = mongoose.model('Attendance', attendanceSchema);

module.exports = Attendance;
