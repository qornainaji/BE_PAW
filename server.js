const express = require('express')

const app = express()

app.get('/', (req, res) => {
    res.json({mssg: "Halo GAMADA 2023"})
})

app.listen(4000, () => {
  console.log('halo 4000')
})