require('dotenv').config();

const mongoose = require('mongoose');
const Schema = mongoose.Schema;
// express session
const session = require('express-session');

const passport= require('passport');
const User = require('../models/userModel');
const { rapidmigrationassessment } = require('googleapis/build/src/apis/rapidmigrationassessment');
const jwt = require('jsonwebtoken');
const GithubStrategy = require('passport-github2').Strategy;
const cookieCutter = require('cookie-cutter');

passport.serializeUser((user, done) => {
    done(null, user._id)
}
)

passport.deserializeUser(async (id, done) => {
    try {
        const user = await User.findById(id)
        done(null, user)
    } catch (error) {
        done(error)
    }
}
)

passport.use(
    new GithubStrategy(
        {
        clientID: process.env.GITHUB_ID,
        clientSecret: process.env.GITHUB_SECRET,
        callbackURL: 'http://localhost:4000/auth/callback/github',
        },
        async (accessToken, refreshToken, profile, cb) => {
            const user = await User.findOne({ github_id: profile.id })
            if (!user) {
                console.log('Profile:')
                console.log(profile)
                const user = await User.create({
                github_id: profile.id,
                user_name: profile.displayName,
                user_email: profile.email || "no email",
                user_username: profile.username,
                user_password: rapidmigrationassessment + profile.id,
                user_NIM: null,
                user_isAdmin: false,
                user_github: profile._json.html_url,
                user_bio: profile._json.bio,
                user_location: profile._json.location,
                user_twitter: profile._json.twitter_username,
                user_avatarURL: profile.photos[0].value,
                user_isVerified: false,
                })
                await user.save()
                console.log('user created')
            }
            else {
                console.log('user already exists')
                console.log(user)
            }
            return cb(null, user)
        }
    )
)

const sessionMiddleware = session({
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: true,
    cookie: { secure: false },
})

const githubSignUp = passport.authenticate('github', { scope: [ 'user:email' ] })

const githubLogin = passport.authenticate('github', { failureRedirect: '/login' })

const githubCallback = async (req, res) => {
    try {
        // get github user data
        const githubUser = req.user
        // console.log("Callback results: " + githubUser)

        // create token which contains user id
        const token = jwt.sign({ _id: githubUser._id }, process.env.JWT_SECRET, { expiresIn: '1h' })
        // console.log(token)
        // print the _id from the token
        const decoded = jwt.verify(token, process.env.JWT_SECRET)
        // console.log(decoded._id)

        // set token in cookie
        // res.status(200).cookie('token', token, { path: '/', httpOnly: true, maxAge: 3600000, domain: 'localhost', secure: true, sameSite: 'none'})
        res.redirect('http://localhost:3000/?token=' + token)
        // res.status(200).json({ message: 'User logged in successfully', token: token, user: githubUser }); // send token to client
    }
    catch (error) {
        console.error(error)
        res.status(500).json({ error: error.message })
    }
}

// Export the module
module.exports = {
    githubSignUp,
    githubLogin,
    githubCallback,
    sessionMiddleware,
};