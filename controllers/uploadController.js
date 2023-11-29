// // const { appengine } = require('googleapis/build/src/apis/appengine');
// const { PassThrough } = require("stream");
// const { google } = require('googleapis');
// const path = require('path');

// // upload file to google drive
// const KEYFILEPATH = path.join(__dirname, '../cred.json');
// const SCOPES = ['https://www.googleapis.com/auth/drive'];
// const auth = new google.auth.GoogleAuth({
//     keyFile: KEYFILEPATH,
//     scopes: SCOPES
// });

// const uploadFile = async (fileObject) => {
//     const bufferStream = new PassThrough();
//     bufferStream.end(fileObject.buffer);
//     const { data } = await google.drive({ version: 'v3', auth }).files.create({
//     media : {
//         mimeType: fileObject.mimetype,
//         body: bufferStream
//     },
//     requestBody: {
//         name: fileObject.originalname,
//         parents: ["1_ZJ-U0U6duqAT5CQBmiZFP0mrasTCNBz"],
//     },
//     fields: "id,name"
//     });
//     console.log(`Uploaded File ${data.name} ${data.id}`);
// };   


// const getFilePDF = async (req, res) => {
//     try {
//         console.log(req.body);
//         console.log(req.file);
//         const { files } = req;
//         if (!files || !files[0]) {
//             throw new Error('No file found in request');
//         }
//         await uploadFile(files[0]);
//         res.status(200).send('File uploaded successfully');

//     } catch (error) {
//      res.status(500).send(error.message)
//     }
// }



// module.exports = {
//     getFilePDF,
// }