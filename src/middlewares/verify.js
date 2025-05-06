const jwt = require('jsonwebtoken');

const verifyToken = (req, res, next) => {

    const token = req.cookies.token;

    console.log('Token:', token); 

    if (!token) return res.status(401).json({ message: 'Unauthorized' });

    jwt.verify(token, process.env.JWT_SECRET, (err, user) => {
        if (err) {
            console.error('Token verification error:', err);
            return res.status(403).json({ message: 'Forbidden' });
        }
        req.user = user;
        next();
    });
}

const verifyUser = (req, res, next) => {
    verifyToken(req, res, () => {
        if (req.user.id === req.params.id || req.user.idAdmin) {
            next();
        } else {
            res.status(403).json({ message: 'You are not allowed to do thad!' });
        }
    });
}

const verifyAdmin = (req, res, next) => {
    verifyToken(req, res, () => {
        if (req.user.idAdmin) {
            next();
        } else {
            res.status(403).json({ message: 'You are not allowed to do thad!' });
        }
    });
}

module.exports = { verifyToken, verifyUser, verifyAdmin }
