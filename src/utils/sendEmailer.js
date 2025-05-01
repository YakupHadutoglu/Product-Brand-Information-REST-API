const nodemailer = require('nodemailer');

const sendEmail = async ({ name, email, subject, message }) => {
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
        return info;
    } catch (error) {
        console.error("Email sending failed:", error);
        throw error;
    }
};

module.exports = { sendEmail };
