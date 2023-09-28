const express = require('express')
const {
    getDocuments,
    getDocument,
    createDocument,
    updateDocument,
    deleteDocument,
    // deleteDocuments
} = require('../controllers/documentController')

const router = express.Router()

// GET all documents
router.get('/', getDocuments)

// GET a single document
router.get('/:id', getDocument)

// POST a new document
router.post('/', createDocument)

// UPDATE a document
router.patch('/:id', updateDocument)

// DELETE a document
router.delete('/:id', deleteDocument)


module.exports = router