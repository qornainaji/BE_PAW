const mongoose = require('mongoose')

const usersSchema = new mongoose.Schema({
    user_nama: {
        type: String,
        required: true
    },
    user_password: {
        type: String,
        required: true
    },
    user_email: {
        type: String,
        required: true
    },
    user_NIM: {
        type: String,
        required: true
    },
    user_isAdmin: {
        type: Boolean,
        required: true
    }
}, { timestamps: true })

const User = mongoose.model('User', usersSchema)

module.exports = User