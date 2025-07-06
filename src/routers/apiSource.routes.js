const express = require('express');
const router = express.Router();

const { newApiIntegration } = require('../controllers/newApıIntegratıon.controller.js');
const { authenticateUser , authenticateApprovedStatus } = require('../middlewares/authenticate.js');
const { verifyAdmin } = require('../middlewares/verify.js');
const { noCache } = require('../middlewares/noCache.js');

router.route('/admin/apis/add').post(authenticateUser , authenticateApprovedStatus , verifyAdmin , noCache , newApiIntegration);

module.exports = router;
