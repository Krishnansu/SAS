// middleware/auth.js
const jwt = require('jsonwebtoken');

module.exports = (req, res, next) => {
    try {
        const token = req.headers.authorization.split(" ")[1]; // Extract token
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        req.userData = decoded; // Attach user data to request
        next();
    } catch (err) {
        return res.status(401).json({ message: 'Auth failed' });
    }
};
