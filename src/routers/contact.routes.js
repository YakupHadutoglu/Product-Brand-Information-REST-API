const express = require('express');
const router = express.Router();

const { contactController } = require('../controllers/contact.controller.js');

router.route('/contact').post(contactController);

module.exports = router;
