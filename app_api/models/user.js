const mongoose = require('mongoose');
const crypto = require('crypto');
const jwt = require('jsonwebtoken');

const userSchema = new mongoose.Schema({
    email: {
        type: String,
        unique: true,
        required: true
    },
    name: {
        type: String,
        required: true
    },
    hash: String,
    salt: String
});

// method to set the password on the current record
userSchema.methods.setPassword = function(password) {
    this.salt = crypto.randomBytes(16).toString('hex');
    this.hash = crypto.pbkdf2Sync(password, this.salt, 
        1000, 64, 'sha512').toString('hex');
};

// method to compare entered password against stored hash
userSchema.methods.validPassword = function(password) {
    var hash = crypto.pbkdf2Sync(password, this.salt, 
        1000, 64, 'sha512').toString('hex');
    return this.hash === hash;
};

// method to generate a JSON web token for the current record
userSchema.methods.generateJWT = function() {
    return jwt.sign(
        { // payload for JSON web token
            _id: this._id,
            email: this.email,
            name: this.name
        },
        process.env.JWT_SECRET, // secret stored in .env file
        { expiresIn: '1h' }     // token expires in an hour from creation
    );
};

mongoose.model('users', userSchema);
const User = mongoose.model('users', userSchema);
module.exports = User;
