const express = require('express');
const router = express.Router();

const { getHomPage , getLoginPage , getRegisterPage , getDashboardPage , getContactPage , getAdminPanelPage , getVerifyPage} = require('../controllers/page.controller.js');
const { authenticateUser , authenticateInUser , authenticateApprovedStatus } = require('../middlewares/authenticate.js');
const { noCache} = require('../middlewares/noCache.js');
const { autoContactForm } = require('../middlewares/autoContactForm.js');
const { verifyAdmin } = require('../middlewares/verify.js');

router.route('/').get(noCache , authenticateUser , getHomPage)
router.route('/login').get(noCache , authenticateInUser , getLoginPage);
router.route('/register').get(noCache , authenticateInUser , getRegisterPage);
router.route('/dashboard').get(noCache , authenticateUser  , getDashboardPage);
router.route('/contact').get(noCache , autoContactForm , getContactPage);
router.route('/admin').get(noCache , authenticateUser , verifyAdmin , getAdminPanelPage);
router.route('/verify').get(noCache , authenticateUser , authenticateApprovedStatus , getVerifyPage);

module.exports = router;
