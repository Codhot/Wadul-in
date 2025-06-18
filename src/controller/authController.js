// src/controller/authController.js
const db = require('../db')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')

exports.register = async (req, res) => {
    const { email, password, role } = req.body
    if (!email || !password) return res.status(400).json({ message:'email and password required'})
    const hashed = await bcrypt.hash(password, 10)

    await db.query(' INSERT INTO users (email,password_hash,role) VALUES (?,?,?)',
        [email, hashed, role || 'officer'])

    res.json({ message:'User registered successfully'})
}

exports.login = async (req, res) => {
    const { email, password } = req.body
    const [rows] = await db.query('SELECT * FROM users WHERE email = ?', [email])

    if (rows.length == 0) return res.status(400).json({ message:'User not found'})
    const user = rows[0]

    const match = await bcrypt.compare(password, user.password_hash)

    if (!match) return res.status(400).json({ message:'Invalid password'})
    const token = jwt.sign({ id:user.id, role:user.role }, process.env.JWT_SECRET,{ expiresIn:'1h'})
    res.json({ token })
}

