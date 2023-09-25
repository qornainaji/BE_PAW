require('dotenv').config()

const express = require('express')
const mongoose = require('mongoose')
const app = express()
const userRoutes = require('./routes/users')
<<<<<<< HEAD
const documentRoutes = require('./routes/document')
=======
const documentsRoutes = require('./routes/documents')
>>>>>>> 7c4cce853f0888c045de0c9ff212d2ab71a511ba

app.use(express.json())

app.use(express.static('public'))

app.use('/users', userRoutes)
app.use('/documents', documentsRoutes)

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
