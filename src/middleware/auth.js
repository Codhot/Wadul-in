// src/middleware/auth.js
require('dotenv').config()
const jwt = require('jsonwebtoken')

function authenticateJWT(req, res, next) {
    const authHeader = req.headers.authorization
    if (authHeader && authHeader.startsWith('Bearer ')) {
        const token = authHeader.split(' ')[1]
        jwt.verify(token, process.env.JWT_SECRET, (err, user) => {
            if (err) {
                return res.status(403).json({ message:'Invalid or expire token'})
            }
            req.user = user
            next()
        })
    } else {
        res.status(401).json({ message:'Authorization header missing'})
    }
}

module.exports = authenticateJWT
