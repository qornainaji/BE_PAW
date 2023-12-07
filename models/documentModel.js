const mongoose = require('mongoose')

const documentSchema = new mongoose.Schema({
    doc_title: {
        type: String,
        required: true
    },
    doc_year: {
        type: Number,
        required: true
    },
    doc_major: {
        type: String,
        required: true
    },
    doc_description: {
        type: String,
        required: true
    },
    doc_link: {
        type: String,
        required: true
    },
    doc_id: {
        type: String,
        required: true
    },
    doc_view: {
        type: Number,
        required: true
    },
    doc_date_upload: {
        type: Date,
        required: true
    },
    doc_download: {
        type: Number,
        required: true
    },
}, { timestamps: true })

const Document = mongoose.model('Document', documentSchema)

module.exports = Document