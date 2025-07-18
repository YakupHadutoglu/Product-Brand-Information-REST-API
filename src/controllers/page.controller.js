const User = require('../models/User');
const jwt = require('jsonwebtoken');

const { contributionGet } = require('../services/contributionAGet.service.js');

const getHomPage = async (req , res) => {
    const user = req.user;
    res.render('index' , {
        page_name: 'home',
        user: user,
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

const getDashboardPage = async (req , res) => {
    const token = req.cookies.token;
    const payload = jwt.verify(token, process.env.JWT_SECRET);

    // const { brand, idea, api, mail } = await contributionGet();

    res.render('dashboard' , {
        page_name: 'dashboard',
        payload: payload,
        user: req.user,
        // brand,
        // idea,
        // api,
        // mail
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

const getbrandProductPage = (req , res) => {
    res.render('brandProduct' , {
        page_name: 'brandProduct'
    });
}

const getContributionPage = (req , res) => {
    res.render('contribution' , {
        page_name: 'contribution'
    });
}

module.exports = { getHomPage , getLoginPage , getRegisterPage , getDashboardPage , getContactPage , getAdminPanelPage , getVerifyPage , getbrandProductPage , getContributionPage };
