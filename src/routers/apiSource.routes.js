const express = require('express');
const router = express.Router();

const { newApiIntegration } = require('../controllers/newApıIntegratıon.controller.js');

router.route('/admin/apis/add').post(newApiIntegration);

module.exports = router;
