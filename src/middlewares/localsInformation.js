const { required } = require('joi');
const jwt = require('jsonwebtoken');
const User = require('../models/User.js');
const localsİnformation = async (req , res , next) => {

    const token = req.cookies.token;

    try {
        if(token) {

            const payload = jwt.verify(token , process.env.JWT_SECRET);
            const user = await User.findById(payload.id);
            res.locals.token = token;
            res.locals.name = payload.name;
            res.locals.idAdmin = payload.idAdmin;
            res.locals.id = payload.id;
            res.locals.email = payload.email;
            res.locals.approvedStatus = payload.approvedStatus;
            res.locals.createdAt = user.createdAt.toLocaleDateString('tr-TR');
            res.locals.profileImage = user.photo;
            console.log(user.photo);

        } else {
            res.locals.token = null;
            res.locals.user = null;
            res.locals.name = null;
            res.locals.idAdmin = null;
            res.locals.id = null;
            res.locals.email =  null;
            res.locals.approvedStatus = null;
            res.locals.createAt = null;
            res.locals.profileImage = null;

        }
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: error });
    }
    next();
}

module.exports = { localsİnformation };
