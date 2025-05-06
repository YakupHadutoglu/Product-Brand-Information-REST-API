const express = require('express');
const router = express.Router();

const page = require('./page.routes.js');
const auth = require('./auth.routes.js');
const contact = require('./contact.routes.js');
const verify = require('./verify.routes.js');

router.use(page);
router.use(auth);
router.use(contact);
router.use(verify);

module.exports = router;
