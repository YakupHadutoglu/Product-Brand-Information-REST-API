const express = require('express');
const router = express.Router();
const { authenticateUser , authenticateApprovedStatus } = require('../middlewares/authenticate.js');
const { noCache } = require('../middlewares/noCache.js');
const { confirmVerification, sendVerificationEmail } = require('../controllers/verify.controller.js');

router.post('/resend-verification', noCache , authenticateUser, authenticateApprovedStatus , async (req, res) => {
    const user = req.user;

    if (!user) return res.status(401).send('User is not logged in');

    try {
        await sendVerificationEmail(user);
        res.render('verify', { email: user.email });
    } catch (error) {
        console.error("Mail gönderilemedi:", error);
        res.status(500).send("Mail gönderilemedi.");
    }
});

router.get('/verify/confirm', noCache , authenticateUser , authenticateApprovedStatus , confirmVerification);

module.exports = router;
