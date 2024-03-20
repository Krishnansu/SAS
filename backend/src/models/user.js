const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const { getNextSequence } = require('../utils');

let currentUserId = 3; // Initialize starting value

function generateUniqueUserId() {
    return currentUserId++;
}

const userRoleEnum = ['manager', 'salesman'];

const userSchema = new mongoose.Schema({
    user_id: { type: Number, required: true, unique: true, default: () => generateUniqueUserId() },
    user_name: { type: String, required: true },
    user_role: { type: String, required: true, enum: userRoleEnum },
    user_email: { type: String, required: true, unique: true },
    user_password: { type: String, required: true }
});

userSchema.pre('save', async function (next) {
    if (!this.isModified('user_password')) return next(); 

    const salt = await bcrypt.genSalt(10);  
    this.user_password = await bcrypt.hash(this.user_password, salt);
    next();
});

// Add a method for comparing passwords
userSchema.methods.comparePassword = async function(candidatePassword) {
    return await bcrypt.compare(candidatePassword, this.user_password);
};


const User = mongoose.model('User', userSchema);
module.exports = User;
