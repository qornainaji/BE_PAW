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
    user_email: {
        type: String,
        required: true
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
    const token = jwt.sign({ _id: this._id }, process.env.JWT_SECRET);
    return token;
};

const validate = (user) => {
    const schema = Joi.object({
        user_name: Joi.string().required(),
        user_email: Joi.string().email(),
        user_password: Joi.string().required(),
    });
    return schema.validate(user);
};

const User = mongoose.model('User', usersSchema)

module.exports = User;