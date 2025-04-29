const express = require('express');
const dotenv = require('dotenv');
require('dotenv').config();
const path = require('path');
console.log('JWT_SECRET:', process.env.JWT_SECRET);
const mongoose = require('mongoose');
const ejs = require('ejs')
const cookieParser = require('cookie-parser');

const app = express();

const connectDB = require('./config/db.js');
const router = require('./routers/index.js');
const { localsİnformation } = require('./middlewares/localsİnformation.js');

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static('public'));
app.use(cookieParser());
app.use(localsİnformation);

app.set("view engine" , "ejs");
app.set('views' , path.join(__dirname , 'views'));

// Connect to MongoDB
connectDB();

// Routes
app.use('/' , router)

module.exports = app;
