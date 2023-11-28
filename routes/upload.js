const express = require('express')
const multer = require('multer');
const upload = multer();

const {
    getFilePDF
} = require('../controllers/uploadController')

const router = express.Router()

// POST a new file to Google Drive
router.post('/', upload.any(), getFilePDF)

module.exports = router