const express = require('express');
const router = express.Router();

const { getHomPage , getLoginPage , getRegisterPage , getDashboardPage , getContactPage , getAdminPanelPage} = require('../controllers/page.controller.js');
const { authenticateUser , authenticateInUser} = require('../middlewares/authenticate.js');
const { noCache} = require('../middlewares/noCache.js');
const { autoContactForm } = require('../middlewares/autoContactForm.js');
const { verifyToken , verifyUser , verifyAdmin } = require('../middlewares/verify.js');


router.route('/').get(noCache , authenticateUser , getHomPage)
router.route('/login').get(noCache , authenticateInUser , getLoginPage);
router.route('/register').get(noCache , authenticateInUser , getRegisterPage);
router.route('/dashboard').get(noCache , authenticateUser , getDashboardPage);
router.route('/contact').get(noCache , autoContactForm , getContactPage);
router.route('/admin').get(noCache , authenticateUser , verifyAdmin , getAdminPanelPage);

module.exports = router;
