const express = require('express');
const router = express.Router();

const { getHomPage , getLoginPage , getRegisterPage , getDashboardPage , getContactPage , getAdminPanelPage , getVerifyPage , getbrandProductPage , getContributionPage } = require('../controllers/page.controller.js');
const { authenticateUser , authenticateInUser , authenticateApprovedStatus } = require('../middlewares/authenticate.js');
const { noCache} = require('../middlewares/noCache.js');
const { autoContactForm } = require('../middlewares/autoContactForm.js');
const { verifyAdmin } = require('../middlewares/verify.js');

router.route('/').get(noCache , getHomPage)
router.route('/login').get(noCache , authenticateInUser , getLoginPage);
router.route('/register').get(noCache , authenticateInUser , getRegisterPage);
router.route('/dashboard').get(noCache , authenticateUser  , getDashboardPage);
router.route('/contact').get(noCache , autoContactForm , getContactPage);
router.route('/admin').get(noCache , authenticateUser , verifyAdmin , getAdminPanelPage);
router.route('/verify').get(noCache, authenticateUser, (req, res) => {
    if (req.user.approvedStatus) return res.redirect('/dashboard');
    res.render('verify', { email: req.user.email });
});
router.route('/brand-Product').get(noCache , authenticateUser , authenticateApprovedStatus , getbrandProductPage);
router.route('/contribution').get(noCache , authenticateUser , authenticateApprovedStatus ,  getContributionPage);

module.exports = router;
