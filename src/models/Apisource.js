const mongoose = require('mongoose');

const ApiSourceSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, 'API name required'],
        trim: true,
        maxlength: [100, 'API name max 100 characters allowed']
    },
    method: {
        type: String,
        required: true,
        enum: ['GET', 'POST', 'PUT', 'DELETE', 'PATCH'],
        uppercase: true
    },
    baseURL: {
        type: String,
        required: true,
        validate: {
            validator: function(v) {
                return /https?:\/\/(www\.)?[-a-zA-Z0-9@:%._\+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()@:%_\+.~#?&//=]*)/.test(v);
            },
            message: 'Enter a valid URL'
        }
    },
    path: {
        type: String,
        required: true,
        validate: {
            validator: function(v) {
                return v.startsWith('/');
            },
            message: 'Path / should start with a slash (/)'
        }
    },
    headers: {
        type: Object,
        required: true,
        validate: {
            validator: function(v) {
                try {
                    JSON.parse(JSON.stringify(v));
                    return true;
                } catch (e) {
                    return false;
                }
            },
            message: 'Must be a valid JSON object'
        }
    },
    paramMap: {
        type: Object,
        required: true,
        validate: {
            validator: function(v) {
                try {
                    JSON.parse(JSON.stringify(v));
                    return true;
                } catch (e) {
                    return false;
                }
            },
            message: 'Must be a valid JSON object'
        }
    },
    enabled: {
        type: Boolean,
        default: true
    },
    sourceType: {
        type: String,
        enum: ['amazon', 'tiktok', 'aliexpress', 'other'],
        default: 'other'
    },
    responseMapping: {  // Can be kept as a required setting to process the response
        type: Object,
        default: {},
        validate: {
            validator: function(v) {
                try {
                    JSON.parse(JSON.stringify(v));
                    return true;
                } catch (e) {
                    return false;
                }
            },
            message: 'Must be a valid JSON object'
        }
    }
}, {
    timestamps: true,
    toJSON: { virtuals: true },
    toObject: { virtuals: true }
});

// İndex to optimize the model
ApiSourceSchema.index({ name: 1 });
ApiSourceSchema.index({ enabled: 1 });
ApiSourceSchema.index({ sourceType: 1 });

const ApiSource = mongoose.model('ApiSource', ApiSourceSchema);

module.exports = ApiSource;
