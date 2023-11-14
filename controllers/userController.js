require('dotenv').config()

const mongoose = require('mongoose')
const User = require('../models/userModel')
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

// get all user
const getUsers = async (req, res) => {
    try {
        const user = await User.find({}).sort({createdAt: -1})
        res.status(200).json(user)
    } catch (error) {
        res.status(400).json({error: error.message})
    }
}

// get single user
const getUser = async (req, res) => {
    try {
        const userId = req.params.id

        const user = await User.findById(userId)
        res.status(200).json(user)

        if (!user) {
            return res.status(404).json({ error: 'User not found' });
          }
    } catch (error) {
        res.status(400).json({error: error.message})
    }
}

// create new user
const createUser = async (req, res) => {
    const {user_name, user_password, user_email, user_NIM, user_isAdmin} = req.body

    // add to database
    try {
        const user = await User.create({user_name, user_password, user_email, user_NIM, user_isAdmin})
        res.status(200).json(user)
    } catch (error) {
        res.status(400).json({error: error.message})
    }
}

// update user
const updateUser = async (req, res) => {
    const { user_name, user_password, user_email, user_NIM, user_isAdmin } = req.body;
    const userId = req.params.id;
    try {
        const user = await User.findOneAndUpdate(
            { _id: userId },
            {
                user_name, user_password, user_email, user_NIM, user_isAdmin
            },
            { new: true } // return the updated data
        );
        if (!user) {
            return res.status(404).json({ error: 'User not found' });
        }
        res.status(200).json(user);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
}

// delete user
const deleteUser = async (req, res) => {
    const userId = req.params.id;

    try{
        const deletedUser = await User.findByIdAndRemove(userId);
        
        if (!deletedUser) {
            return res.status(404).json({ error: 'User not found' });
        }
        res.status(200).json({ message: 'User deleted successfully' });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}

// register user
const register = async (req, res) => {
    const { user_name, user_password, user_email, user_NIM, user_isAdmin } = req.body;
    const user = new User({ user_name, user_password, user_email, user_NIM, user_isAdmin });
    await user.save();

    const token = jwt.sign({ _id: user._id }, process.env.JWT_SECRET, { expiresIn: '1h' });
    res.status(200).json({ token });
}

// login user
const login = async (req, res) => {
    const { user_name, user_password } = req.body;

    // encrypt user_password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(user_password, salt);

    User.findOne({ user_name })
        .then(user => {
            if (!user) console.log('user not found')
            if (!user) return res.status(400).json({ message: 'Invalid username or password' });

            console.log("User Input: " + user_password + "\n" +"Stored Password: " + user.user_password);

            if (user_password != user.user_password) console.log('password not match')
            if (user_password != user.user_password) return res.status(400).json({ message: 'Invalid username or password' });

            const token = jwt.sign({ _id: user._id }, process.env.JWT_SECRET, { expiresIn: '1h' });
            console.log("JWT Secret: " + process.env.JWT_SECRET + "\nJWT Token: " + token);
            // Set cookie
            res.cookie('token', token, { httpOnly: true, maxAge: 3600000, domain: 'localhost' });
            res.status(200).json({ token });
        })
        .catch(err => console.log(err))
}

// Logout user
const logout = (req, res) => {
    res.cookie('token', '', { maxAge: 0 });
    res.status(200).json({ message: 'Logout successful' });
}

module.exports = {
    getUsers,
    getUser,
    createUser,
    updateUser,
    deleteUser,
    register,
    logout,
    login
}