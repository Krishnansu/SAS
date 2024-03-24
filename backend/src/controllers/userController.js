const User = require('../models/user'); 

exports.getCurrentUserDetails = async (req, res) => {
    try {
        console.log(req.userData);
        const user = await User.findOne({ user_id: req.userData.userId }); // Get user ID from decoded token

        if (!user) {
            return res.status(404).json({ message: 'User not found' }); 
        }

        // Customize what data you want to send back
        const userData = {
            id: user.user_id,
            name: user.user_name,
            email: user.user_email,
            role: user.user_role
        }; 
        
        res.json(userData);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};
