const jwt = require('jsonwebtoken');
const User = require('../models/User.js');

const authenticateUser = async (req, res, next) => {

    const token = req.cookies.token;
    if (!token) return res.redirect('/login');

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        // DB’den oku:
        const user = await User.findById(decoded.id);
        if (!user) return res.redirect('/login');
        req.user = user;
        next();
    } catch {
        return res.redirect('/login');
    }

}

const authenticateInUser = (req, res, next) => {
    const token = req.cookies.token;
    if (token) return res.redirect('/');
    next();
};

const authenticateApprovedStatus = (req, res, next) => {
    const token = req.cookies.token;
    if (!token) return res.redirect('/login');

    let payload;
    try {
        payload = jwt.verify(token, process.env.JWT_SECRET);
    } catch (err) {
        return res.redirect('/login');
    }

    console.error('token:', payload);
    console.error('approvedStatus:', payload.approvedStatus);

    if (!payload.approvedStatus) {
        return res.redirect('/dashboard');
    }

    next();
};

module.exports = { authenticateUser, authenticateInUser, authenticateApprovedStatus }
