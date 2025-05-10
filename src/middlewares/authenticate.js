const jwt = require('jsonwebtoken');
const User = require('../models/User.js');

const authenticateUser = async (req, res, next) => {
    // const token = req.cookies.token;

    // if (!token) return res.status(401).redirect('/login');

    // try {
    //     const payload = jwt.verify(token, process.env.JWT_SECRET);
    //     req.user = payload;
    //     next();
    // } catch (error) {
    //     console.error(error);
    //     return res.status(500).json({ message: error });
    // }
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
    const payload = jwt.verify(token, process.env.JWT_SECRET);

    if (!payload.approvedStatus) {
        return res.redirect('/dashboard');
    }
    next();
};

module.exports = { authenticateUser, authenticateInUser, authenticateApprovedStatus }
