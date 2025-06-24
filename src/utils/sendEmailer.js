const nodemailer = require('nodemailer');
const { contactController } = require('../controllers/contact.controller');
const Mail = require('../models/Mail.js');
const { localsİnformation } = require('../middlewares/localsInformation.js');
const sendEmailLogic = async ({ name, email, subject, message }) => {
    try {
        const outputMessage = `
      <h1>MAIL Details</h1>
      <ul>
        <li>Name: ${name}</li>
        <li>Email: ${email}</li>
      </ul>
      <h1>Messages</h1>
      <p>${message}</p>
    `;

        const transporter = nodemailer.createTransport({
            host: process.env.EMAIL_HOST,
            port: process.env.EMAIL_PORT,
            secure: false,
            auth: {
                user: process.env.EMAIL_USER,
                pass: process.env.EMAIL_PASS,
            },
        });

        const info = await transporter.sendMail({
            from: '"Smart Edu Contact Form" <zoe.lockman78@ethereal.email>',
            to: email,
            subject: subject,
            text: message,
            html: outputMessage,
        });

        console.log("Message sent: %s", info.messageId);

        await Mail.create({
            name: name,
            email: email,
            subject: subject,
            message: message,
            });

        return info;
    } catch (error) {
        console.error("Email sending failed:", error);
        throw error;
    }
};

const sendEmail = async (req, res) => {
    try {
        const { name, email, subject, message } = req.body;
        const info = await sendEmailLogic({ name, email, subject, message });
        console.log({ success: true, messageId: info.messageId });
        res.status(200).redirect('/contact');
    } catch (error) {
        console.error("Email sending failed:", error);
        res.status(500).json({ error: "Mail gönderme başarısız." });
    }
};

module.exports = { sendEmail };
