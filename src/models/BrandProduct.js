require('joi');
const mongoose = require('mongoose');

const BrandProductSchema = mongoose.Schema({
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
    brandName: {
        type: String,
        required: true,
        trim: true,
    },
    productName: {
        type: String,
        required: true,
        trim: true,
    },
    description: {
        type: String,
        trim: true,
    },
    createAt: {
        type: Date,
        default: Date.now,
    }
});

const BrandProduct = mongoose.model('BrandProduct', BrandProductSchema);

module.exports = BrandProduct;
