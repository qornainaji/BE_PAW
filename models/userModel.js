const mongoose = require('mongoose')
const bcrypt = require('bcrypt');

const usersSchema = new mongoose.Schema({
    user_username: {
        type: String,
        required: true
    },
    user_name: {
        type: String,
        required: true
    },
    user_password: {
        type: String,
        required: true
    },
    github_id: {
        type: String,
        required: false
    },
    google_id: {
        type: String,
        required: false
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
    },
    user_isVerified: {
        type: Boolean,
        required: true
    },
    user_avatarURL: {
        type: String,
        required: false
    },
    user_avatarImage: {
        type: String,
        required: false
    },
    user_bio: {
        type: String,
        required: false
    },
    user_location: {
        type: String,
        required: false
    },
    user_website: {
        type: String,
        required: false
    },
    user_linkedin: {
        type: String,
        required: false
    },
    user_github: {
        type: String,
        required: false
    },
    user_twitter: {
        type: String,
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

usersSchema.methods.generateAuthToken = function () {
    const token = jwt.sign({ _id: this._id, user_isAdmin: this.user_isAdmin }, process.env.JWT_SECRET);
    return token;
};

usersSchema.methods.matchPassword = async function (enteredPassword) {
    return await bcrypt.compare(enteredPassword, this.user_password);
}

const User = mongoose.model('User', usersSchema)

module.exports = User;