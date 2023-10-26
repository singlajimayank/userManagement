const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    // email of the user and sholuld be unique
    email: String,
    password: String,
    name: String
}, {
    // timestampps enable
    timestamps: true
    // createdBy, updatedBy -> userId -> reference user id foreign keys
});

const UserModel = mongoose.model('User', userSchema);

module.exports = UserModel;