const mongoose = require('mongoose');

const BrandProductSchema = mongoose.Schema({
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

const BrandProduct = mongoose.model('Brand Product' , BrandProductSchema);

module.exports = BrandProduct;
