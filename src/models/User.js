const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        trim: true,
        unique: true
    },
    email: {
        type: String,
        required: true,
        trim: true,
        unique: true
    },
    password: {
        type: String,
        required: false,
        trim: true
    },
    idAdmin: {
        type: Boolean,
        default: false
    },
    createdAt: {
        type: Date,
        default: Date.now
    },
    sendMailer: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Mail',
    },
    googleId: {
        type: String,
        unique: true,
        sparse: true
    },
});

const User = mongoose.model('User', userSchema);

module.exports = User;
