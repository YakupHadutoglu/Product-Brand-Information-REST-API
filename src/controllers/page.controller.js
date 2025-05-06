const User = require('../models/User');

const getHomPage = async (req , res) => {
    res.render('index' , {
        page_name: 'home',
        name: req.user.name,
    });
}

const getLoginPage = (req , res) => {
    res.render('login' , {
        page_name: 'login'
    });
}

const getRegisterPage = (req , res) => {
    res.render('register' , {
        page_name: 'register'
    });
}

const getDashboardPage = (req , res) => {
    const user = req.user;
    res.render('dashboard' , {
        page_name: 'dashboard',
        user: user,
    });
}

const getContactPage = (req , res) => {
    res.render('contact' , {
        page_name: 'contact',
        name: req.name || '',
        email: req.email || ''
    });
}

const getAdminPanelPage = async (req , res) => {
    const allUser = await User.find();
    res.render('admin' , {
        page_name: 'admin',
        allUser
    });
}

const getVerifyPage = (req, res) => {
    res.render('verify', { email: req.session.user.email });
};

module.exports = { getHomPage , getLoginPage , getRegisterPage , getDashboardPage , getContactPage , getAdminPanelPage , getVerifyPage };
