const express = require('express');
const router = express.Router();
const { authenticateUser, authenticateApprovedStatus } = require('../middlewares/authenticate.js');
const { noCache } = require('../middlewares/noCache.js');
const { confirmVerification, sendVerificationEmail } = require('../controllers/verify.controller.js');

router.post(
    '/resend-verification',
    noCache,
    authenticateUser,
    async (req, res) => {
        try {
            await sendVerificationEmail(req.user);
            return res.render('verify', {
                email: req.user.email,
                message: 'Doğrulama e-postası gönderildi.'
            });
        } catch (err) {
            console.error(err);
            return res.status(500).send('Mail gönderilemedi.');
        }
    }
);


router.get('/verify/confirm', noCache , confirmVerification);

module.exports = router;
