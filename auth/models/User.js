const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    passwordHash: { type: String }, // optional for Google login users
    googleId: { type: String }      // optional, only for Google login
}, { timestamps: true });

module.exports = mongoose.model('User', UserSchema);