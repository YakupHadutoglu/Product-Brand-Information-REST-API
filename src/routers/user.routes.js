const express = require('express');
const router = express.Router();
const upload = require('../middlewares/uploads.js');
const User = require('../models/User.js');
const { authenticateUser } = require('../middlewares/authenticate.js');
const { changePassword } = require('../controllers/user.controller.js');

router.get('/profile', authenticateUser, async (req, res) => {
    try {
        const user = await User.findById(req.user._id);
        if (!user) {
            return res.status(404).send('Kullanıcı bulunamadı.');
        }
        res.render('profile', { user });
    } catch (error) {
        console.error(error);
        res.status(500).send('Sunucu hatası.');
    }
});

router.post('/profile/post', authenticateUser, upload.single('profileImage'), async (req, res) => {
    try {
        const user = await User.findById(req.user._id);
        if (!user) return res.status(404).send('Kullanıcı bulunamadı.');

        if (req.file) {
            user.photo = '/uploads/' + req.file.filename;  // modelde photo alanı olduğu için bu
            await user.save();
        }

        res.redirect('/dashboard');
    } catch (error) {
        console.error(error);
        res.status(500).send('Sunucu hatası.');
    }
});

router.post('/change-password', authenticateUser, changePassword);

module.exports = router;
