const express = require('express')
const {
    githubLogin,
    githubSignUp,
    githubCallback,
    sessionMiddleware
} = require('../controllers/authController')
const passport = require('passport')
const router = express.Router()

router.get('/signup/github', githubSignUp)
router.get('/login/github', githubLogin)
router.get('/callback/github', passport.authenticate('github', { failureRedirect: '/login' }), githubCallback)
router.get('/logout', (req, res) => {
    req.logout()
    res.redirect('/')
})

module.exports = router
