const User = require('../models/User.js');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const dotenv = require('dotenv');
dotenv.config();

const createUser = async (req, res) => {

    try {
        console.log('NODE_ENV:', process.env.NODE_ENV);

        const { name, email, password } = req.body;

        if (!isEmail(email)) return res.status(400).json({ message: 'Email is not valid' });

        if (password.length < 6 || password.length > 20) return res.status(400).json({ message: 'Password must be between 6 and 20 characters' });

        if (name.length < 3 || name.length > 20) return res.status(400).json({ message: 'Name must be between 3 and 20 characters' });

        const hashedPassword = await bcrypt.hash(password, 10);

        const user = await User.create({
            name: name,
            email: email,
            password: hashedPassword
        });

        const token = jwt.sign({ id: user._id, idAdmin: user.idAdmin , name: user.name , email: user.email , approvedStatus: user.approvedStatus}, process.env.JWT_SECRET, { expiresIn: "7d" });
        console.log('>>> Generated token:', token);


        console.log('JWT_SECRET:', process.env.JWT_SECRET);
        console.log('Created user:', user);
        console.log('Generated token:', token);

        res.cookie('token', token, {
            httpOnly: true,
            secure: process.env.NODE_ENV === 'production' ? true : false,
            sameSite: 'strict',
            maxAge: 7 * 24 * 60 * 60 * 1000
        });

        console.log('kişi başarıyla oluşturuldu');

        return res.redirect('/dashboard');

    } catch (error) {
        console.error(error);
        res.status(500).json({ message: error });
    }
}

const loginUser = async (req, res) => {
    try {
        const { email, password } = req.body;

        const user = await User.findOne({ email: email });

        if (!user) return res.status(400).json({ message: 'User not found' });

        const isMatch = await bcrypt.compare(password, user.password);

        if (!isMatch) return res.status(400).json({ message: 'Password is incorrect' });

        const token = jwt.sign({ id: user._id, idAdmin: user.idAdmin , name: user.name , email: user.email , approvedStatus: user.approvedStatus }, process.env.JWT_SECRET, { expiresIn: "7d" });

        console.log('>>> Generated token:', token);
        console.log('JWT_SECRET:', process.env.JWT_SECRET);
        console.log('Login user:', user);
        console.log('Generated token:', token);

        res.cookie('token', token, {
            httpOnly: true,
            secure: process.env.NODE_ENV === 'production' ? true : false,
            sameSite: 'strict',
            maxAge: 7 * 24 * 60 * 60 * 1000
        });

        req.session.user = user;
        res.redirect('/dashboard');

        console.log('kişi başarıyla giriş yaptı');

    } catch (error) {
        console.error(error);
        res.status(500).json({ message: error })
    }
}

const logOutUser = async (req, res) => {
    try {
        res.clearCookie('token', {
            httpOnly: true,
            secure: process.env.NODE_ENV === 'production',
            sameSite: 'strict',
        });
        res.redirect('/login');

            console.log(req.cookies)
            console.log("kişi başaraıyla çıkış yaptı");

    } catch (error) {
        console.error(error);
        res.status(500).json({ message: error });
    }
}

function isEmail(email) {
    var emailFormat = /^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$/;
    if (email !== '' && email.match(emailFormat)) { return true; }

    return false;
}

module.exports = { createUser, loginUser, logOutUser };
