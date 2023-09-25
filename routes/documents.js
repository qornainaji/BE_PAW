const express = require('express')
const router = express.Router()
const Documents = require('../models/documentsModel')

router.get('/', async (req, res) => {
    try {
        const users = await Documents.find()
        res.status(200).json(users)
    } catch (error) {
        res.status(400).json({error: error.message})
    }
})

module.exports = router