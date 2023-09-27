const mongoose = require('mongoose')
const Document = require('../models/documentModel')

// get all documents
const getDocuments = async (req, res) => {
    try {
        const document = await Document.find({}).sort({createdAt: -1})
        res.status(200).json(document)
    } catch (error) {
        res.status(400).json({error: error.message})
    }
}

// get a single document
const getDocument = (req, res) => {
    res.send('get single document')
}

// create a new document
const createDocument = async (req, res) => {
    const {doc_title, doc_year, doc_major, doc_description, doc_link, doc_view, doc_date_upload, doc_download} = req.body

    try {
        const document = await Document.create({doc_title, doc_year, doc_major, doc_description, doc_link, doc_view, doc_date_upload, doc_download})
        res.status(200).json(document)
    } catch (error) {
        res.status(400).json({error: error.message})
    }
}

// update a document
const updateDocument = async (req, res) => {
    res.send('update document')
}

// delete a document
const deleteDocument = async (req, res) => {
    res.send('delete document')
}

module.exports = {
    getDocuments,
    getDocument,
    createDocument,
    updateDocument,
    deleteDocument
}