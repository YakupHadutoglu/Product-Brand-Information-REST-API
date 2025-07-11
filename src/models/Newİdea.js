const mongoose = require('mongoose');

const NewİdeaSchema = new mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        res: 'User',
        required: true,
    }, userInfo: {
        name: {
            type: String,
            required: true,
            trim: true,
        },
        email: {
            type: String,
            required: true,
            trim: true,
        }
    },
    ideaTitle: {
        type: String,
        required: true,
        trim: true,
        maxlength: [100, 'Idea title max 100 characters allowed'],
    },
    ideaDetails: {
        type: String,
        required: true,
        trim: true,
        maxlength: [500, 'Idea details max 500 characters allowed'],
    },
    createAt: {
        type: Date,
        default: Date.now,
    }
});

const Newİdea = mongoose.model('Newİdea', NewİdeaSchema);

module.exports = Newİdea;
