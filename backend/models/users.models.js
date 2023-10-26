const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    // email of the user and sholuld be unique
    email: {
        type: String,
        unique: true
    },
    password: String,
    name: String
}, {
    // timestampps enable
    timestamps: true
});

const UserModel = mongoose.model('User', userSchema);

module.exports = UserModel;