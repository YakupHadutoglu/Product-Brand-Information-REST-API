const userController = require('../controllers/auth.controller.js');
const express = require('express');
const router = express.Router();
const {createUser , loginUser , logOutUser } = userController;
const { verifyToken } = require('../middlewares/verify.js');

router.route('/register').post(createUser);
router.route('/login').post(loginUser);
router.route('/logout').get(logOutUser);


module.exports = router;


