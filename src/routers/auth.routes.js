const userController = require('../controllers/auth.controller.js');
const express = require('express');
const router = express.Router();
const passport = require('passport');

const { createUser, loginUser, logOutUser } = userController;
require('../middlewares/verify.js');

router.route('/register').post(createUser);
router.route('/login').post(loginUser);
router.route('/logout').get(logOutUser);

router.get('/google',
    passport.authenticate('google', { scope: ['profile', 'email'] }));



router.get('/google/callback',
    passport.authenticate('google', { failureRedirect: '/' }),
    (req, res) => {
        // Google OAuth başarılı olduktan sonra
        const token = req.user.token;

        // Cookie'ye token'ı kaydediyoruz
        res.cookie('token', token, { httpOnly: true, secure: false }); // secure: true olmalı prod ortamında

        // Kullanıcıyı anasayfaya yönlendirebiliriz
        res.redirect('/');
    }
);

module.exports = router;


