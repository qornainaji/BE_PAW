require('dotenv').config();

const mongoose = require('mongoose');
const Schema = mongoose.Schema;
// express session
const session = require('express-session');

const passport= require('passport');
const User = require('../models/userModel');
const { rapidmigrationassessment } = require('googleapis/build/src/apis/rapidmigrationassessment');

const GithubStrategy = require('passport-github2').Strategy;

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

const githubSignUp = passport.authenticate('github', { scope: [ 'user:email' ] })

const githubLogin = passport.authenticate('github', { failureRedirect: '/login' })

const getGithubUserData = async (req, res) => {
    const user = {
        githubId: req.sesion.passport.user.id,
        user_name: req.sesion.passport.user.username,
        user_email: req.sesion.passport.user.emails[0].value,
    }
    res.json(user)
}

const githubCallback = (req, res) => {
    res.redirect('/')
}

// Export the module
module.exports = {
    githubSignUp,
    githubLogin,
    githubCallback
};