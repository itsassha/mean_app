const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const config = require('../config/db');
const { hash } = require('bcryptjs');

const UserScheme = mongoose.Schema({
    name: {
        type: String,
        require: true
    },
    email: {
        type: String,
        require: true
    },
    login: {
        type: String,
        require: true
    },
    password: {
        type: String,
        require: true
    }
});

const User = module.exports = mongoose.model('User, UserSchema');

module.exports.getUserByLogin = function(login, callback) {
    const query = {login: login}
    User.findOne(query, callback);
};

module.exports.getUserById = function(id, callback) {
    User.findById(id, callback);
};

// Function password to cash
module.exports.AddUsers = function(newUser, callback) {
    bcrypt.genSalt(10, (err, salt) => {
        bcrypt.hash(newUser.password, salt, (err, hash) => {
            if(err) throw err;
            newUser.password = hash;
            newUser.save(callback);
        });
    });
};

module.exports.comparePass = function(passFromUser, userDBPass, callback) {
    bcrypt.compare(passFromUser, userDBPass, (err, isMatch) => {
        if(err) throw err;
        callback(null, isMatch);
    });
};