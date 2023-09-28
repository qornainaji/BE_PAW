const mongoose = require('mongoose')
const bcrypt = require('bcrypt');

const usersSchema = new mongoose.Schema({
    user_name: {
        type: String,
        required: true
    },
    user_password: {
        type: String,
        required: true
    },
    user_email: {
        type: String,
        required: false
    },
    user_NIM: {
        type: String,
        required: false
    },
    user_isAdmin: {
        type: Boolean,
        required: false
    }
}, { timestamps: true })

usersSchema.pre('save', async function(next) {
    if (this.isModified('user_password')) {
        const salt = await bcrypt.genSalt(10);
        this.user_password = await bcrypt.hash(this.user_password, salt);
    }
    next();
});

const User = mongoose.model('User', usersSchema)

module.exports = User