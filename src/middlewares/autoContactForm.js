const jwt = require("jsonwebtoken");
const User = require('../models/user.js');

const autoContactForm = async (req, res, next) => {

    try {
        const token = req.cookies.token || null;
        const payload = token ? jwt.verify(token , process.env.JWT_SECRET) : null;
        const email = payload?.email || null;

        const user = await User.findOne({ email });
        if (!token || !user) return next();

        req.name = user.name;
        req.email = user.email;

        // sadece body varsa logla
        if (req.body) {
            console.log('req.body.name:', req.body.name);
            console.log('req.body.email:', req.body.email);
            console.log('req.body.message:', req.body.message);
            console.log('req.body.subject:', req.body.subject);
        }

        next();
    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: error });
    }
}

module.exports = { autoContactForm };
