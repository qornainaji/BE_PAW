const express = require('express')
const {
    getUsers,
    getAllUsers,
    getUser,
    createUser,
    updateUser,
    deleteUser,
    register,
    logout,
    login
} = require('../controllers/userController')

const router = express.Router()

router.post('/register', register);
router.post('/login', login);

// Logout route
router.get('/logout', logout);

// GET all users
router.get('/', getUsers, getAllUsers)

// GET a single user
router.get('/:id', getUser)

// POST a new user
router.post('/', createUser)

// UPDATE a user
router.patch('/:id', updateUser)

// DELETE a user
router.delete('/:id', deleteUser)



module.exports = router