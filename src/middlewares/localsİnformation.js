const jwt = require('jsonwebtoken');

const localsİnformation = (req , res , next) => {

    const token = req.cookies.token;

    try {
        if(token) {
            const payload = jwt.verify(token , process.env.JWT_SECRET);

            res.locals.token = token;
            res.locals.user = payload.name;
            res.locals.idAdmin = payload.idAdmin;
            res.locals.id = payload.id;
            res.locals.email = payload.email;

        } else {
            res.locals.token = null;
            res.locals.user = null;
            res.locals.name = null;
            res.locals.idAdmin = null;
            res.locals.id = null;
            res.locals.email =  null;

        }
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: error });
    }
    next();
}

module.exports = { localsİnformation };
