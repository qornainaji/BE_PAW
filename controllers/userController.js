require('dotenv').config()

const User = require('../models/userModel')
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const paginatedResults = require('../middleware/paginationMiddleware,js');

const userProperties = [
    '_id',
    'user_name',
    'user_username',
    'user_password',
    'user_avatarURL',
    'user_avatarImage',
    'github_id',
    'google_id',
    'user_email',
    'user_NIM',
    'user_isAdmin',
    'user_isVerified',
    'user_bio',
    'user_location',
    'user_website',
    'user_linkedin',
    'user_github',
    'user_twitter',
];

const extractPropertiesFromBody = (body, properties) => {
    return properties.reduce((obj, property) => {
        if (body.hasOwnProperty(property) && body[property] !== undefined) {
            obj[property] = body[property];
        }
        return obj;
    }, {});
}

const isUserPropertyUnique = async (property, value) => {
    try{
        const existingUser = await User.findOne({ [property]: value });
        return !existingUser;
    }
    catch(error){
        return false;
    }
}

const checkDuplicateProperties = async (userData) => {
    const uniqueChecks = [
        { property: 'user_username', message: 'Username already exists' },
        { property: 'user_email', message: 'Email already exists' },
        { property: 'user_NIM', message: 'NIM already exists' },
        // { property: 'github_id', message: 'GitHub IzD already exists' },
        // { property: 'google_id', message: 'Google ID already exists' },
        { property: 'user_name', message: 'Name already exists' },
    ];

    console.log("User data in Check Duplicate: " + JSON.stringify(userData))

    for (const check of uniqueChecks) {
        if (!await isUserPropertyUnique(check.property, userData[check.property])) {
            const samePropertyUser = await User.findOne({ [check.property]: userData[check.property] });
            console.log("Same property user: " + samePropertyUser._id)
            console.log("User data: " + userData['_id'])
            console.log("Is the same? " + (samePropertyUser._id == userData._id))
            if (samePropertyUser._id == userData._id) {
                continue;
            }

            return { error: check.message + ': ' + userData[check.property] + ' (ID: ' + samePropertyUser._id + ')' };
        }
    }

    return null;
}

// get all user
const getUsers = paginatedResults(User);

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
    const userData = extractPropertiesFromBody(req.body, userProperties);

    // check if user already exists
    const duplicateCheck = await checkDuplicateProperties(userData);
    if (duplicateCheck) {
        return res.status(400).json({ error: duplicateCheck.error });
    }

    // add to database
    try {
        const user = await User.create(userData)
        res.status(200).json(user)
    } catch (error) {
        res.status(400).json({error: error.message})
    }
}

// update user
// const updateUser = async (req, res) => {
//     const userData = extractPropertiesFromBody(req.body, userProperties);
//     console.log("User data: " + JSON.stringify(userData))
//     const userId = req.params.id;
//     try {
//         // check if user already exists
//         const duplicateCheck = await checkDuplicateProperties(userData);
//         if (duplicateCheck) {
//             return res.status(400).json({ error: duplicateCheck.error });
//         }

//         const user = await User.findOneAndUpdate(
//             { _id: userId },
//             userData,
//             { new: true } // return the updated data
//         );
//         if (!user) {
//             return res.status(404).json({ error: 'User not found' });
//         }
//         res.status(200).json(user);
//     } catch (error) {
//         res.status(400).json({ error: error.message });
//     }
// }

const updateUser = async (req, res) => {
    const userId = req.params.id;
    const userData = extractPropertiesFromBody(req.body, userProperties);

    try {
        const updatedUser = await User.findByIdAndUpdate(
            userId,
            userData,
            { new: true }
        );

        if (!updatedUser) {
            return res.status(404).json({ message: 'User not found' });
        }

        res.status(200).json(updatedUser);
    } catch (error) {
        console.error(`Error updating user: ${error}`);
        res.status(500).json({ message: 'Internal server error' });
    }
};



// const updateUser = async (req, res) => {
//     // const userData = extractPropertiesFromBody(req.body, userProperties);
//     const userId = req.params.id;
//     // const {isVerified} = req.body
//     try {
//         const checkUser = await User.findById(userId);
//         let user;
//         if (!checkUser) {
//             return res.status(404).json({ message: 'User not found' });
//         }
//         if(checkUser.user_isVerified === true){
//             user = await User.findByIdAndUpdate(userId, {user_isVerified: false}, {new:true})
//             console.log('change to false')
//         }else{
//             user = await User.findByIdAndUpdate(userId, { user_isVerified: true }, { new: true });
//             console.log('change to true');
//         }
//         res.status(200).json(user)
//       } catch (error) {
//         console.error(`Error updating user: ${error}`);
//         res.status(500).json({message: 'Internal server error'})
//       }
// };


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
    const userData = extractPropertiesFromBody(req.body, userProperties);
    console.log("Received Body: " + JSON.stringify(req.body))
    
    try {
        // Check if the user already exists
        const duplicateCheck = await checkDuplicateProperties(userData);
        if (duplicateCheck) {
            return res.status(400).json({ error: duplicateCheck.error });
        }

        console.log("User data: " + JSON.stringify(userData))

        // Create a new user with hashed password
        const user = new User(userData);
        await user.save();

        // Send a message through the response
        res.status(201).json({ message: 'User created successfully' });

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
        const token = jwt.sign({ _id: user._id, user_isAdmin: user.user_isAdmin }, process.env.JWT_SECRET, { expiresIn: '1h' });
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

// GET request to check if user is admin
const checkAdmin = async (req, res) => {
    try {
        const userId = req.params.id;
        const user = await User.findOne({ _id: userId });
        res.status(200).json({ isAdmin: user.user_isAdmin });
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
    login,
    checkAdmin
}