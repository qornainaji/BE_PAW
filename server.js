require('dotenv').config()

const express = require('express')
const mongoose = require('mongoose')
const app = express()

app.get('/', (req, res) => {
    res.json({mssg: "Halo GAMADA 2023"})
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