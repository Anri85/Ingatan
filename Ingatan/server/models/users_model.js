const mongoose = require('mongoose');

const usersSchema = mongoose.Schema({
    username: {
        type: String,
        required: [true, 'Please insert username']
    },
    email: {
        type: String,
        required: [true, 'Please insert email']
    },
    password: {
        type: String,
        required: [true, 'Please insert password']
    },
    createdAt: {
        type: Date,
        default: new Date()
    }
});

module.exports = mongoose.model('userscollections', usersSchema);