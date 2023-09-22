const express = require('express')

const app = express()

app.set('view engine', 'ejs')

app.get('/', (req, res) => {
  console.log('Server is running')
  // res.json({mssg: "Halo GAMADA 2023"})
  res.render('index', { name: "User" })
})

app.listen(3000, () => {
  console.log('halo 3000')
})