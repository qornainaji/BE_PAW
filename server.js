require('dotenv').config()

const express = require('express')
const mongoose = require('mongoose')
const app = express()

//app.use(logger)

app.use(express.json())

app.get('/', (req, res) => {
  console.log('Server is running')
  res.json({msg: "Academia TETI"})
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
