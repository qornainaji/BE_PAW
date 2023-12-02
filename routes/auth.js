const express = require('express')
const {
    githubLogin,
    githubSignUp,
    githubCallback
} = require('../controllers/authController')
const passport = require('passport')
const router = express.Router()

router.get('/signup/github', githubSignUp)
router.get('/login/github', githubLogin)
router.get('/callback/github', passport.authenticate('github', { failureRedirect: '/login' }), githubCallback)

module.exports = router
