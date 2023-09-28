require('dotenv').config();
const jwt = require('jsonwebtoken');

module.exports = function(req, res, next) {
    // Get token from available cookies
    const cookies = req.headers.cookie;
    console.log(cookies)
    if (!req.headers.cookie) return res.status(401).send('Access denied');
    
    const normalCookies = cookies.split(' ')[0];
    const token = cookies.split('=')[1];


    if (!token) return res.status(401).send('Access denied');

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        req.user = decoded;
        console.log(req.user)
        next();
    } catch (error) {
        res.status(400).send('Invalid token');
    }


    // jwt.verify(token, process.env.JWT_SECRET, (err, user) => {
    //     if (err) return res.status(403).send('Invalid token');
    //     req.user = user;
    //     next();
    // });
};
