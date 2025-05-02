const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth20').Strategy;
const User = require('../models/User');
const localsİnformation = require('../middlewares/localsİnformation.js');
const userID  = localsİnformation.userID;
const jwt = require('jsonwebtoken');

passport.use(new GoogleStrategy({
    clientID: process.env.GOOGLE_CLIENT_ID,
    clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    callbackURL: "http://localhost:5002/auth/google/callback"
},

    async (_accessToken, _refreshToken, profile, done) => {
        try {

            let user = await User.findOne({ googleId: profile.id });

            if (!user) {
                user = await User.create({
                    googleId: profile.id,
                    name: profile.displayName,
                    email: profile.emails[0].value,
                });
            }

            const token = jwt.sign(
                {
                    id: user._id,
                    name: user.name,
                    email: user.email,
                    idAdmin: user.idAdmin
                },
                process.env.JWT_SECRET,
                { expiresIn: '7d' }
            );

            user.token = token;

            return done(null, user);

        } catch (err) {
            return done(err, null);
        }
    }
));

passport.serializeUser((userID, done) => {
    console.log("serializeUser içinde:", userID);
    done(null, userID);
  });
  passport.deserializeUser(async (id, done) => {
    try {
        const user = await User.findById(id);
        console.log("deserializeUser içinde:", user);
        done(null, user);
    } catch (err) {
        console.error("Deserialize error:", err);
        done(err, null);
    }
});
