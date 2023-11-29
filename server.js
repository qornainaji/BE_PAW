require('dotenv').config()

const express = require('express')
const mongoose = require('mongoose')
const app = express()
const userRoutes = require('./routes/users')
const documentRoutes = require('./routes/documents')
const uploadRoutes = require('./routes/upload')
const authMiddleware = require('./middleware/authMiddleware')
const bodyParser = require('body-parser');
const morgan = require('morgan');
const helmet = require('helmet');
const cors = require('cors');
// const httpProxy = require('http-proxy');
// const proxy = httpProxy.createProxyServer({});

// Morgan for monitoring
app.use(morgan('dev'));

// Helmet for security
app.use(helmet());

// Body parser
app.use(express.json())
app.use(express.urlencoded({ extended: true }))

// Use static files
app.use(express.static('public'))

// Use CORS
app.use(cors({origin: "*", methods: ['GET', 'POST', 'PATCH', 'DELETE', 'PUT'], credentials: true}))
// app.use(cors({origin: "http://localhost:3000", methods: ['GET', 'POST', 'PATCH', 'DELETE', 'PUT'], credentials: true}))


// app.use(cors());

// app.all('/documents/*', (req, res) => {
//   proxy.web(req, res, {
//     target: 'https://plain-toad-sweater.cyclic.app',
//     changeOrigin: true,
//     headers: {
//       'Access-Control-Allow-Origin': '*',
//       // Add any other necessary headers here
//     },
//   });
// });

// Routes
app.use('/users', userRoutes)
app.use('/documents', documentRoutes)
// app.use('/upload', uploadRoutes)


// Protected route, authMiddleware will check for a valid JWT
app.get('/protected', authMiddleware, (req, res) => {
  // If the user is authenticated, the middleware will attach the user data to the request object
  // We can then use it to return a personalized response
  
  res.sendFile(__dirname + '/public/protected/protected.html')
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
  res.sendFile(__dirname + '/public/index-page/index-page.html')
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
