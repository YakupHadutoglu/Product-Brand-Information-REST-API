const nodemailer = require('nodemailer');
const User = require('../models/User');
const jwt = require('jsonwebtoken');

const transporter = nodemailer.createTransport({
    host: process.env.EMAIL_HOST,        // smtp.ethereal.email
    port: process.env.EMAIL_PORT,        // 587
    secure: false,
    auth: {
        user: process.env.EMAIL_USER,    // zoe.lockman78@ethereal.email
        pass: process.env.EMAIL_PASS     // YhHMCCz8b2mW4YDKaF
    }
});

const sendVerificationEmail = async (user) => {
    const mailOptions = {
        from: `"Doğrulama Botu" <${process.env.EMAIL_USER}>`,
        to: user.email,
        subject: 'E-posta Doğrulama',
        html: `
            <p>Merhaba ${user.username || ''},</p>
            <p>E-posta adresinizi doğrulamak için aşağıdaki bağlantıya tıklayın:</p>
            <a href="http://localhost:5002/verify/confirm?email=${encodeURIComponent(user.email)}">E-postayı Doğrula</a>
        `
    };
    const info = await transporter.sendMail(mailOptions);
    console.log("Verification mail sent:", nodemailer.getTestMessageUrl(info)); // Linki verir
};

const confirmVerification = async (req, res) => {
    try {
        const email = req.query.email;
        const user = await User.findOne({ email });
        if (!user) return res.send('Kullanıcı bulunamadı');

        if (!user.approvedStatus) {
            user.approvedStatus = true;
            await user.save();
            console.log('>> Doğrulandı:', user);         // <- DB’de doğru kaydedilip kaydedilmediğini konsolda görün
        }

        // Yeni JWT oluşturup cookie’ye koyun
        const token = generateJWT(user);
        res.cookie('token', token, {
            httpOnly: true,
            maxAge: 1000 * 60 * 60 // 1 saat
        });
        console.log('>> Yeni JWT oluşturuldu:', token); // <- Konsolda yeni token’ı görün


        return setTimeout(() => {
            res.redirect('/dashboard');
        }, 100);

    } catch (err) {
        console.error(err);
        return res.status(500).send('Bir hata oluştu.');
    }
};


const generateJWT = (user) => {
    const token = jwt.sign(
        { id: user._id, idAdmin: user.idAdmin, name: user.name, email: user.email, approvedStatus: user.approvedStatus }, /* id: user._id, idAdmin: user.idAdmin , name: user.name , email: user.email */
        process.env.JWT_SECRET,
        { expiresIn: '1h' }
    );
    return token;
};

module.exports = { confirmVerification, sendVerificationEmail };
