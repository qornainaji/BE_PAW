require('dotenv').config()

const express = require('express')
const mongoose = require('mongoose')
const app = express()
const userRoutes = require('./routes/users')
const documentRoutes = require('./routes/documents')
const jwt = require('jsonwebtoken');

app.use(express.json())
app.use(express.urlencoded({ extended: true }))

app.use(express.static('public'))

app.use('/users', userRoutes)
app.use('/documents', documentRoutes)

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

function authenticateJWT(req, res, next) {
  const token = req.header('x-auth-token');
  if (!token) return res.status(401).send('Access denied. No token provided.');

  jwt.verify(token, 'your_secret_key', (err, user) => {
      if (err) return res.sendStatus(403);
      req.user = user;
      next();
  });
}

// PORT=4000
// MONGO_URI=mongodb+srv://ahmadfauzan190603:pojanPAW@academiateti.snpla5s.mongodb.net/?retryWrites=true&w=majority
