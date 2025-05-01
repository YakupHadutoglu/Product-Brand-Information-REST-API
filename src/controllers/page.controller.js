const User = require('../models/user');

const getHomPage = async (req , res) => {
    const allUser = await User.find();
    res.render('index' , {
        page_name: 'home',
        name: req.user.name,
        allUser
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
    res.render('dashboard' , {
        page_name: 'dashboard'
    });
}

const getContactPage = (req , res) => {
    res.render('contact' , {
        page_name: 'contact',
        name: req.name || '',
        email: req.email || ''
    });
}

module.exports = { getHomPage , getLoginPage , getRegisterPage , getDashboardPage , getContactPage };
