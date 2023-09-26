const mongoose = require('mongoose')
const User = require('../models/userModel')

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
    res.send('single user')
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
    const {user_nama, user_password, user_email, user_NIM, user_isAdmin} = req.body
    const userId = req.params.id;
    try {
        const user = await User.findOneAndUpdate(
            {_id: userId},
            {
                user_nama, user_password, user_email, user_NIM, user_isAdmin
            },
            {new: true} // return the updated data
        );
        if (!update){
            return res.status(404).json({error: 'User not found'});
        }
        res.status(200).json(user) 
    } catch (error) {
        res.status(400).json({error: error.message})
    }
}

// delete user
const deleteUser = async (req, res) => {
    res.send('delete user')
}

module.exports = {
    getUsers,
    getUser,
    createUser,
    updateUser,
    deleteUser
}