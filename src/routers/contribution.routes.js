const express = require('express');
const router = express.Router();
const { brandProduct , newIdea } = require('../controllers/contribution.controller.js');
const { authenticateUser, authenticateApprovedStatus } = require('../middlewares/authenticate.js');
const { noCache } = require('../middlewares/noCache.js');

// Contribution routes
router.route('/contribution-brand-product').post(authenticateUser, authenticateApprovedStatus, noCache, brandProduct); 4
router.route('/contribution-new-idea').post(authenticateUser, authenticateApprovedStatus, noCache, newIdea);

module.exports = router;
