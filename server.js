const express = require('express')

const app = express()

app.use(logger)

app.use(express.static('public'))

app.get('/', (req, res) => {
  console.log('Server is running')
  res.json({msg: "Academia TETI"})
})

const userRoutes = require('./routes/users')

app.use('/users', userRoutes)

function logger(req, res, next) {
  console.log(req.originalUrl)
  next()
}

app.listen(3000, () => {
  console.log('halo 3000')
})