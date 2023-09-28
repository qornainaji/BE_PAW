require('dotenv').config()

const express = require('express')
const mongoose = require('mongoose')
const app = express()
const userRoutes = require('./routes/users')
const documentRoutes = require('./routes/documents')
const authMiddleware = require('./middleware/authMiddleware')
const bodyParser = require('body-parser');
const morgan = require('morgan');

app.use(morgan('dev'));
app.use(express.json())
app.use(express.urlencoded({ extended: true }))

app.use(express.static('public'))

app.use('/users', userRoutes)
app.use('/documents', documentRoutes)

app.get('/protected', authMiddleware, (req, res) => {
  // If the user is authenticated, the middleware will attach the user data to the request object
  // We can then use it to return a personalized response
  res.send(`Welcome ${req.user._id}!`)
})

app.get('/login', (req, res) => {
  res.sendFile(__dirname + '/public/login-static/login.html')
})

app.get('/register', (req, res) => {
  res.sendFile(__dirname + '/public/register/register.html')
})

app.get('/', (req, res) => {
  console.log('Server is running')
  res.send("<h1>Academia TETI</h1>")
})

mongoose.connect(process.env.MONGO_URI)
  .then(() => {
    app.listen(4000, () => {
      console.log('halo 4000')
    })
  })
  .catch((error) => {
    console.log(error)
  })

// PORT=4000
// MONGO_URI=mongodb+srv://ahmadfauzan190603:pojanPAW@academiateti.snpla5s.mongodb.net/?retryWrites=true&w=majority
