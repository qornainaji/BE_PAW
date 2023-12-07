require('dotenv').config()

const express = require('express')
const mongoose = require('mongoose')
const app = express()
const userRoutes = require('./routes/users')
const documentRoutes = require('./routes/documents')
const authRoutes = require('./routes/auth')
const uploadRoutes = require('./routes/upload')
const authMiddleware = require('./middleware/authMiddleware')
const authController = require('./controllers/authController')
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
var csrf = require('csurf');
const morgan = require('morgan');
const helmet = require('helmet');
const cors = require('cors');
const passport = require('passport')

// const httpProxy = require('http-proxy');
// const proxy = httpProxy.createProxyServer({});

// Morgan for monitoring
app.use(morgan('dev'));

// Helmet for security
app.use(helmet());
app.use((req, res, next) => {
  res.setHeader(
    'Content-Security-Policy',
    "default-src 'self' https://github.com; " +
    "img-src 'self' https://github.com https://avatars.githubusercontent.com; " +
    "script-src 'self'; " +
    "style-src 'self' 'unsafe-inline'; " +
    "font-src 'self' data:;"
  );
  next();
});

// CSRF protection (deactivated)
// app.use(cookieParser());
// app.use(csrf({ cookie: true }));
// app.use((req, res, next) => {
//   res.cookie('XSRF-TOKEN', req.csrfToken());
//   next();
// }

// Body parser
app.use(express.json())
app.use(express.urlencoded({ extended: true }))

// Use static files
app.use(express.static('public'))

// Use express-session middleware
app.use(authController.sessionMiddleware);

// Initialize Passport
app.use(passport.initialize());
app.use(passport.session());

// Use CORS
app.use(cors({
  origin: '*', 
  methods: ['GET', 'POST', 'PATCH', 'DELETE', 'PUT'], 
  credentials: true
}));

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
app.use('/auth', authRoutes)
app.use('/users', userRoutes)
app.use('/documents', documentRoutes)


// app.use('/upload', uploadRoutes)


// Protected route, authMiddleware will check for a valid JWT
app.get('/protected', authMiddleware, (req, res) => {  
  res.sendFile(__dirname + '/public/protected/protected.html')
})

app.get('/profile', (req, res) => {
  res.sendFile(__dirname + '/public/profile/profile.html')
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