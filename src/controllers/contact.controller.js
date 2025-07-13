const { sendEmail } = require("../utils/sendEmailer");

const contactController = async (req , res) => {
    const {name , email , message} = req.body;

    try {
        await sendEmail({
            name: name,
            email: email,
            subject: "Contact Form Submission",
            message: message
        });
        console.log('Email sent successfully');
        req.flash('success', 'Email sent successfully');
        res.status(201).redirect('/contact');
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: error });
    }
}

module.exports = { contactController };


