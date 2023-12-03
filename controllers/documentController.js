const mongoose = require('mongoose')
const Document = require('../models/documentModel')
const paginatedResults = require('../middleware/paginationMiddleware,js');

const { PassThrough } = require("stream");
const { google } = require('googleapis');
const path = require('path');

// upload file to google drive
const KEYFILEPATH = path.join(__dirname, '../cred.json');
const SCOPES = ['https://www.googleapis.com/auth/drive'];
const auth = new google.auth.GoogleAuth({
    keyFile: KEYFILEPATH,
    scopes: SCOPES
});

const uploadFile = async (fileObject) => {
    const bufferStream = new PassThrough();
    bufferStream.end(fileObject.buffer);
    const { data } = await google.drive({ version: 'v3', auth }).files.create({
    media : {
        mimeType: fileObject.mimetype,
        body: bufferStream
    },
    requestBody: {
        name: fileObject.originalname,
        parents: ["1_ZJ-U0U6duqAT5CQBmiZFP0mrasTCNBz"],
    },
    fields: "id,name,webViewLink"
    });
    console.log(`Uploaded File ${data.name} ${data.id} ${data.webViewLink}`);
    return data.webViewLink;
};   

// get all documents
const getDocuments = paginatedResults(Document)

const getAllDocuments = async (req, res) => {
    res.json(res.paginatedResults)
}

// get a single document
const getDocument = async (req, res) => {
    try {
        const documentId = req.params.id
        const document = await Document.findById(documentId)
        res.status(200).json(document)
    } catch (error) {
        res.status(400).json({error: error.message})
    }
}

// create a new document
const createDocument = async (req, res) => {
    try {
        const {files, body} = req;
        if (!files || !files[0]) {
            throw new Error('No file found in request');
        }

        const webViewLink = await uploadFile(files[0]);
        console.log(webViewLink);
        
        const {doc_title, doc_year, doc_major, doc_description, doc_view, doc_date_upload, doc_download} = body;
        const document = await Document.create({
            doc_title,
            doc_year,
            doc_major,
            doc_description,
            doc_link: webViewLink, // Use the webViewLink obtained from Google Drive
            doc_view,
            doc_date_upload,
            doc_download
        });
        res.status(200).json({ message: 'Document and file uploaded successfully', document });
    }
    catch (error) {
        res.status(500).json({ error: error.message });
    }
        
}

// update a document
const updateDocument = async (req, res) => {
    const {doc_title, doc_year, doc_major, doc_description, doc_link, doc_view, doc_date_upload, doc_download} = req.body
    const documentId = req.params.id;

    try {
        // Use Mongoose to find the document by ID and update it
        const updatedDocument = await Document.findByIdAndUpdate(documentId, {doc_title, doc_year, doc_major, doc_description, doc_link, doc_view, doc_date_upload, doc_download}, { new: true });

        if (!updatedDocument) {
            return res.status(404).json({ error: 'Document not found' });
        }

        res.status(200).json(updatedDocument);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
}

// delete a document
const deleteDocument = async (req, res) => {
    const documentId = req.params.id;
    
    try {
        // Use Mongoose to find the document by ID and remove it
        const deletedDocument = await Document.findByIdAndRemove(documentId);

        if (!deletedDocument) {
            return res.status(404).json({ error: 'Document not found' });
        }

        res.status(200).json({ message: 'Document deleted successfully' });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}

// search documents
const searchDocument = async (req, res) => {
    const {doc_title, doc_year, doc_major, doc_description, doc_link, doc_view, doc_date_upload, doc_download} = req.body

    try {
        const document = await Document.find({doc_title, doc_year, doc_major, doc_description, doc_link, doc_view, doc_date_upload, doc_download})
        res.status(200).json(document)
    } catch (error) {
        res.status(400).json({error: error.message})
    }
}


module.exports = {
    getAllDocuments,
    getDocuments,
    getDocument,
    createDocument,
    updateDocument,
    deleteDocument,
    searchDocument
}