const express = require('express')
const router = express.Router()
const Document = require('../models/documentModel')

router.get('/', (req, res) => {
    res.send('all dokumen')
})

router.get('/new', (req, res) => {
    res.send('new dokumen')
})

router.post('/', async (req, res) => {
    const {doc_title, doc_year, doc_major, doc_description, doc_link, doc_view, doc_date_upload, doc_download} = req.body

    try {
        const document = await Document.create({doc_title, doc_year, doc_major, doc_description, doc_link, doc_view, doc_date_upload, doc_download})
        res.status(200).json(document)
    } catch (error) {
        res.status(400).json({error: error.message})
    }
})

// Router with ID Parameter
router.route('/:id')
    .get((req, res) => {
        // res.send(`get dokumen ${req.params.id}`)
        res.send(`get dokumen ${req.dokumen.name}`)
    })
    .put((req, res) => {
        res.send(`update dokumen ${req.params.id}`)
    })
    .delete((req, res) => {
        res.send(`delete dokumen ${req.params.id}`)
    })

// Middleware for ID Parameter
router.param('id', (req, res, next, id) => {
    console.log(`dokumen ${id} is found`)
    req.dokumen = dummydokumens.find(dokumen => dokumen.id === Number(id))
    next()  // next() is required to continue the process
})


module.exports = router