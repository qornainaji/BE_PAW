require('dotenv').config();

const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const passport= require('passport');
const User = require('../models/userModel')

const GithubStrategy = require('passport-github2').Strategy;

passport.use(
    new GithubStrategy(
        {
        clientID: process.env.GITHUB_ID,
        clientSecret: process.env.GITHUB_SECRET,
        callbackURL: 'http://localhost:4000/auth/callback/github',
        },
        async (accessToken, refreshToken, profile, cb) => {
            const user = await User.findOne({ githubId: profile.id })
            if (!user) {
                console.log(profile)
                const user = await User.create({
                githubId: profile.id,
                user_name: profile.displayName,
                user_email: profile.email,
                user_username: profile.username,
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