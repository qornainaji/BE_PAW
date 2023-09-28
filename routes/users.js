const express = require('express')
const {
    getUsers,
    getUser,
    createUser,
    updateUser,
    deleteUser,
    register,
    login
} = require('../controllers/userController')

const router = express.Router()

// GET all users
router.get('/', getUsers)

// GET a single user
router.get('/:id', getUser)

// POST a new user
router.post('/', createUser)

// UPDATE a user
router.patch('/:id', updateUser)

// DELETE a user
router.delete('/:id', deleteUser)

router.post('/register', register);
router.post('/login', login);

module.exports = router