// Experiments 2 and 3: register and login routes
const express = require('express');
const jwt = require('jsonwebtoken');
const User = require('../models/User');
const auth = require('../middleware/auth');

const router = express.Router();

// Create a JWT that expires in 1 day
function createToken(user) {
    return jwt.sign({ userId: user._id }, process.env.JWT_SECRET, { expiresIn: '1d' });
}


// POST /api/auth/register
router.post('/register', async (req, res) => {
    try {
        const { username, email, password } = req.body;

        const existingUser = await User.findOne({ $or: [{ email }, { username }] });
        if (existingUser) {
            return res.status(400).json({ success: false, message: 'User already exists' });
        }

        const user = new User({ username, email, password });
        await user.save(); // password is hashed by the pre('save') hook

        res.status(201).json({
            success: true,
            message: 'User registered successfully',
            token: createToken(user),
            user: { id: user._id, username: user.username, email: user.email }
        });
    } catch (error) {
        // Mongoose validation errors (required, minlength, match ...)
        if (error.name === 'ValidationError') {
            const messages = Object.values(error.errors).map(e => e.message);
            return res.status(400).json({ success: false, message: messages.join(', ') });
        }

        res.status(500).json({ success: false, message: 'Server error', error: error.message });
    }
});


// POST /api/auth/login
router.post('/login', async (req, res) => {
    try {
        const { email, password } = req.body;

        if (!email || !password) {
            return res.status(400).json({ success: false, message: 'Please provide email and password' });
        }

        const user = await User.findOne({ email });
        if (!user || !(await user.comparePassword(password))) {
            return res.status(401).json({ success: false, message: 'Invalid credentials' });
        }

        res.json({
            success: true,
            message: 'Login successful',
            token: createToken(user),
            user: { id: user._id, username: user.username, email: user.email }
        });
    } catch (error) {
        res.status(500).json({ success: false, message: 'Server error', error: error.message });
    }
});


// GET /api/auth/me - profile of the logged-in user (protected)
router.get('/me', auth, (req, res) => {
    res.json({ success: true, user: req.user });
});

module.exports = router;
