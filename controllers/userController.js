require('dotenv').config()

const mongoose = require('mongoose')
const User = require('../models/userModel')
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const paginatedResults = require('../middleware/paginationMiddleware,js');
const Joi = require('joi');

// get all user
const getUsers = paginatedResults(User)

const getAllUsers = async (req, res) => {
    res.json(res.paginatedResults)
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
    const {user_name, user_username, user_password, user_email, user_NIM, user_isAdmin} = req.body

    // add to database
    try {
        const user = await User.create({user_name, user_username, user_password, user_email, user_NIM, user_isAdmin})
        res.status(200).json(user)
    } catch (error) {
        res.status(400).json({error: error.message})
    }
}

// update user
const updateUser = async (req, res) => {
    const { user_name, user_username, user_password, user_email, user_NIM, user_isAdmin } = req.body;
    const userId = req.params.id;
    try {
        const user = await User.findOneAndUpdate(
            { _id: userId },
            {
                user_name, user_username, user_password, user_email, user_NIM, user_isAdmin
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
    const { user_name, user_username, user_password, user_email, user_NIM, user_isAdmin } = req.body;
    
    try {
        // Check if the user already exists
        const userExists = await User.findOne({ user_name });
        if (userExists) {
            console.log("User exists")
            return res.status(400).json({ message: 'Username already exists' });
        }

        // Create a new user with hashed password
        const user = new User({ user_name, user_username, user_password: user_password, user_email, user_NIM, user_isAdmin });
        await user.save();

        // Send a message through the response
        res.status(201).json({ message: 'User created successfully' });

        // redirect to login
        // res.redirect('/login');
        // res.status(201).json({ message: 'User created successfully' });
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
}

// login user
const login = async (req, res) => {
    const { user_username, user_password } = req.body;

    try {
        const user = await User.findOne({ user_username });

        if (!user) {
            return res.status(400).json({ message: 'No username found!' });
        }

        // Compare the provided password with the hashed password from the database
        const passwordMatch = await bcrypt.compare(user_password, user.user_password);
        console.log("Password Match: " + passwordMatch)

        if (!passwordMatch) {
            return res.status(401).json({ message: 'Invalid password.' + user_password + " " + user.user_password });
        }

        // Password is correct, generate and send a JWT token
        const token = jwt.sign({ _id: user._id }, process.env.JWT_SECRET, { expiresIn: '1h' });
        res.cookie('token', token, { httpOnly: true, maxAge: 3600000, domain: 'localhost', secure: true });
        console.log("Token: " + token)

        res.status(200).json({ message: 'Login successful', token: token, user: user });
    } catch (error) {
        console.error('Login error:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
}

// GET request for logout
const logout = async (req, res) => {
    try {
        res.clearCookie('token', { domain: 'localhost' }).redirect('/login');
    } catch (error) {
        res.status(500).json({ error: 'Internal Server Error' });
    }
}

module.exports = {
    getUsers,
    getAllUsers,
    getUser,
    createUser,
    updateUser,
    deleteUser,
    register,
    logout,
    login
}