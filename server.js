require('dotenv').config()

const express = require('express')
const mongoose = require('mongoose')
const app = express()
const userRoutes = require('./routes/users')
const documentRoutes = require('./routes/documents')
const authMiddleware = require('./middleware/authMiddleware')
const bodyParser = require('body-parser');
const morgan = require('morgan');

// Morgan for monitoring
app.use(morgan('dev'));

// Body parser
app.use(express.json())
app.use(express.urlencoded({ extended: true }))

// Use static files
app.use(express.static('public'))

// Routes
app.use('/users', userRoutes)
app.use('/documents', documentRoutes)

// Protected route, authMiddleware will check for a valid JWT
app.get('/protected', authMiddleware, (req, res) => {
  // If the user is authenticated, the middleware will attach the user data to the request object
  // We can then use it to return a personalized response
  res.send(`Welcome ${req.user._id}!`)
})

// Login and register routes
app.get('/login', (req, res) => {
  res.sendFile(__dirname + '/public/login-static/login.html')
})

app.get('/register', (req, res) => {
  res.sendFile(__dirname + '/public/register/register.html')
})

// Home route
app.get('/', (req, res) => {
  console.log('Server is running')
  res.send("<h1>Academia TETI</h1><p>Server is running</p>")
})

// Connect to MongoDB
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
