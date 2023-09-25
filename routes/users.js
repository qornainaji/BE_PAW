const express = require('express')
const router = express.Router()
const Users = require('../models/usersModel')

router.get('/', async (req, res) => {
    try {
        const users = await Users.find()
        res.status(200).json(users)
    } catch (error) {
        res.status(400).json({error: error.message})
    }
})

router.get('/new', (req, res) => {
    res.send('new user')
})

router.post('/', async (req, res) => {
    const {user_nama, user_password, user_email, user_NIM, user_isAdmin} = req.body

    try {
        const users = await Users.create({user_nama, user_password, user_email, user_NIM, user_isAdmin})
        res.status(200).json(users)
    } catch (error) {
        res.status(400).json({error: error.message})
    }
})

router.patch('/:id', async (req, res) => {
    const {user_nama, user_password, user_email, user_NIM, user_isAdmin} = req.body
    const userId = req.params.id;
    try {
        const users = await Users.findOneAndUpdate(
            {_id: userId},
            {
                user_nama, user_password, user_email, user_NIM, user_isAdmin
            },
            {new: true} // return the updated data
        );
        if (!update){
            return res.status(404).json({error: 'User not found'});
        }
        res.status(200).json(users) 
    } catch (error) {
        res.status(400).json({error: error.message})
    }
})

// Router with ID Parameter
router.route('/:id')
    .get((req, res) => {
        // res.send(`get user ${req.params.id}`)
        res.send(`get user ${req.user.name}`)
    })
    .put((req, res) => {
        res.send(`update user ${req.params.id}`)
    })
    .delete((req, res) => {
        res.send(`delete user ${req.params.id}`)
    })

// Middleware for ID Parameter
router.param('id', (req, res, next, id) => {
    console.log(`User ${id} is found`)
    req.user = dummyUsers.find(user => user.id === Number(id))
    next()  // next() is required to continue the process
})


module.exports = router