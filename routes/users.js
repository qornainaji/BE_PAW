const express = require('express')
const router = express.Router()

router.get('/', (req, res) => {
    res.send('all users')
})

router.get('/new', (req, res) => {
    res.send('new user')
})

router.post('/', (req, res) => {
    res.send('create user')
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

const dummyUsers = [
    { id: 1, name: 'John' },
    { id: 2, name: 'Doe' },
    { id: 3, name: 'Smith' }
]

// Middleware for ID Parameter
router.param('id', (req, res, next, id) => {
    console.log(`User ${id} is found`)
    req.user = dummyUsers.find(user => user.id === Number(id))
    next()  // next() is required to continue the process
})


module.exports = router