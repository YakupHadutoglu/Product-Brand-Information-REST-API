const express = require('express');
const router = express.Router();

const { getHomPage , getLoginPage , getRegisterPage , getDashboardPage , getContactPage} = require('../controllers/page.controller.js');
const { authenticateUser , authenticateInUser} = require('../middlewares/authenticate.js');
const { noCache} = require('../middlewares/noCache.js');

router.route('/').get(noCache , authenticateUser , getHomPage)
router.route('/login').get(noCache , authenticateInUser , getLoginPage);
router.route('/register').get(noCache , authenticateInUser , getRegisterPage);
router.route('/dashboard').get(noCache , authenticateUser , getDashboardPage);
router.route('/contact').get(noCache , getContactPage);

module.exports = router;
