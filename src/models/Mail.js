const { object, required } = require('joi');
const mongoose = require('mongoose');

const mailSchema = new mongoose.Schema({
    name: {
        type: String,  
        required: false,
    },
    email: {
        type: String,
        required: true,
    },
    subject: {
        type: String,
        required: false,
    },
    message: {
        type: String,
        required: true,
        trim: true,
    },
    mailObjectId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
    },
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
    },
    createdAt: {
        type: Date,
        default: Date.now,
    },
});

const Mail = mongoose.model('Mail', mailSchema);

module.exports = Mail;
