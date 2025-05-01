const express = require('express');
const router = express.Router();

const { contactController } = require('../controllers/contact.controller.js');
const { sendEmail } = require('../utils/sendEmailer.js');

router.route('/contact').get(contactController);
router.route('/contact').post(sendEmail);

module.exports = router;
