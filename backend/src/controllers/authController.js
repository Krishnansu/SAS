const User = require('../models/user');
const jwt = require('jsonwebtoken');

exports.signup = async (req, res) => {
    try {
        const existingUser = await User.findOne({ user_email: req.body.user_email });
        if (existingUser) {
            return res.status(400).json({ message: 'User with this email already exists' });
        }

        const newUser = new User(req.body);
        const savedUser = await newUser.save();

        res.status(201).json(savedUser); // Consider returning a success message instead
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};


exports.login = async (req, res) => {
    try {
        const { user_email, user_password } = req.body;

        const user = await User.findOne({ user_email });
        if (!user) {
            return res.status(401).json({ message: 'Authentication failed. User not found.' });
        }

        const isMatch = await user.comparePassword(user_password);
        if (!isMatch) {
            return res.status(401).json({ message: 'Authentication failed. Wrong password.' });
        }

        // Create a JWT token
        const payload = { userId: user.user_id, userRole: user.user_role }; 
        const token = jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: '1h' });

        res.json({ token }); 
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};
