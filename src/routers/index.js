const express = require('express');
const router = express.Router();

const page = require('./page.routes.js');
const auth = require('./auth.routes.js');
const contact = require('./contact.routes.js');
const verify = require('./verify.routes.js');
const user = require('./user.routes.js');

router.use(page);
router.use(auth);
router.use(contact);
router.use(verify);
router.use(user);

module.exports = router;
