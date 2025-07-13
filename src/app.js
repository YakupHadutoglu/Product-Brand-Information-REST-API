const express = require('express');
const dotenv = require('dotenv');
require('dotenv').config();
const path = require('path');
console.log('JWT_SECRET:', process.env.JWT_SECRET);
const mongoose = require('mongoose');
const ejs = require('ejs')
const cookieParser = require('cookie-parser');
const session = require('express-session');
const passport = require('passport');
const flash = require('connect-flash');
const authRoutes = require('./routers/auth.routes.js');

const app = express();

const connectDB = require('./config/db.js');
require('./config/passport');
const router = require('./routers/index.js');
const { localsİnformation } = require('./middlewares/localsInformation.js');
const { flashMessages } = require('./middlewares/flashMessages.js');

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static('public'));
app.use(cookieParser());
app.use(localsİnformation);
app.use(session({ secret: process.env.JWT_SECRET , resave: false , saveUninitialized: false , cookie: { secure: false } }));
app.use(passport.initialize());
app.use(passport.session());
app.use('/auth', authRoutes);
app.use('/uploads', express.static(path.join(__dirname, '..', 'uploads')));
app.use(flash());
app.use(flashMessages);

app.set("view engine" , "ejs");
app.set('views' , path.join(__dirname , 'views'));

// Connect to MongoDB
connectDB();

// Routes
app.use('/', router)
app.use((req, res, next) => {
  res.status(404).render('404', { page_name: '404' });
});


module.exports = app;
