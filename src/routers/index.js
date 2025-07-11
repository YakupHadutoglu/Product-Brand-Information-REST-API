const express = require('express');
const router = express.Router();

const page = require('./page.routes.js');
const auth = require('./auth.routes.js');
const contact = require('./contact.routes.js');
const verify = require('./verify.routes.js');
const user = require('./user.routes.js');
const products = require('./products.routes.js');
const apiSource = require('./apiSource.routes.js');
const contribution = require('./contribution.routes.js');

router.use(page);
router.use(auth);
router.use(contact);
router.use(verify);
router.use(user);
router.use(products);
router.use(apiSource);
router.use(contribution);

module.exports = router;
