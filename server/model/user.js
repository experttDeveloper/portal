const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    role: String,
    email: String,
    password: String,
    firstName: String,
    lastName: String,
    gender: String,
    profile: String,
    phoneNumber: String,
    address: String,
    dob: String,
    updatedAt: Date,
    createdAt: Date
});

const User = mongoose.model('users', userSchema);

module.exports = User;
