const mongoose = require('mongoose');

const ApiContributeSchema = new mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true,
    },
    userInfo: {
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
        enum: ['amazon', 'tiktok', 'aliexpress', 'realTimeProductSearch' , 'other'],
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
    },
    apiKey: {
        type: String,
        requied: false,
        trim: true,
    }
}, {
    timestamps: true,
    toJSON: { virtuals: true },
    toObject: { virtuals: true }
});

// İndex to optimize the model
ApiContributeSchema.index({ name: 1 });
ApiContributeSchema.index({ enabled: 1 });
ApiContributeSchema.index({ sourceType: 1 });

const ApiContribute = mongoose.model('ApiContribute', ApiContributeSchema);

module.exports = ApiContribute;
