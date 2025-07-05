const express = require('express');
const router = express.Router();

const productController = require('../controllers/product.controller.js');

router.route('/api').get(productController.getProducts);

module.exports = router;
