const mongoose = require('mongoose')



const UserSchema = mongoose.Schema({
    fullname: {
        type: String,
        required: true
    },
    cin: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    phoneNumber: {
        type: String,
        required: true
    },
    role: {
        type: String,
        default: 'User'
    }
});

module.exports = mongoose.model('User', UserSchema);