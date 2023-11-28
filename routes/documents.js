const express = require('express')
const multer = require('multer');
const stream = require('stream');
const path = require('path');
const { google } = require('googleapis');

// const storage = multer.memoryStorage(); // store files in memory as buffer
// const upload = multer({ storage: storage }); // use memory storage for multer

const {
    getDocuments,
    getDocument,
    createDocument,
    updateDocument,
    deleteDocument,
    getAllDocuments,
    getFilePDF
    // deleteDocuments
} = require('../controllers/documentController')

const router = express.Router()

// GET all documents
router.get('/', getDocuments, getAllDocuments)

// GET a single document
router.get('/:id', getDocument)

// POST a new document
// router.post('/', upload.single('pdf'), createDocument)
router.post('/', createDocument)

// POST a new file to Google Drive
router.post('/upload/', getFilePDF)

// UPDATE a document
router.patch('/:id', updateDocument)

// DELETE a document
router.delete('/:id', deleteDocument)


module.exports = router