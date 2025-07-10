const express = require('express');
const router = express.Router();

const { getProducts } = require('../controllers/product.controller.js');
const { authenticateUser , authenticateApprovedStatus } = require('../middlewares/authenticate.js');
const { noCache } = require('../middlewares/noCache.js');
const { productBrandTabURL } = require('../middlewares/pBTabUrl.js');

router.route('/brand-Product/api').get(authenticateUser , authenticateApprovedStatus , noCache , productBrandTabURL , getProducts);

module.exports = router;
