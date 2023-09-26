require('dotenv').config()

const express = require('express')
const mongoose = require('mongoose')
const app = express()
const userRoutes = require('./routes/users')
const documentRoutes = require('./routes/documents')

app.use(express.json())
app.use(express.urlencoded({ extended: true }))

app.use(express.static('public'))

app.use('/users', userRoutes)
app.use('/document', documentRoutes)

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
