const jwt = require('jsonwebtoken');

const authenticateUser = (req , res , next) => {
    const token = req.cookies.token;

    if(!token) return res.status(401).redirect('/login');

    try {
        const payload = jwt.verify(token , process.env.JWT_SECRET);
        req.user = payload;
        next();
    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: error });
    }
}

const authenticateInUser = (req , res , next) => {
    const token = req.cookies.token;

    if(token) return res.status(401).redirect('/');

    try {
        next();
    } catch (error) {
        console.error(error);
        return res.status(401).json({ message: 'Unauthorized' , error});
    }
}

module.exports = { authenticateUser , authenticateInUser }
