const mongoose = require('mongoose');

const postsSchema = mongoose.Schema({
    creator: {
        type: String,
        required: [true, 'Please insert post creator']
    },
    userId: {
        type: String,
        required: [true, 'Please insert user id']
    },
    title: {
        type: String,
        required: [true, 'Please insert post title']
    },
    message: {
        type: String,
        required: [true, 'Please insert post message']
    },
    tags: {
        type: [String],
        default: []
    },
    likes: {
        type: [String],
        default: []
    },
    comments: {
        type: [String],
        default: []
    },
    selectedFile: {
        type: String,
    },
    createdAt: {
        type: Date,
        default: new Date()
    }
});

module.exports = mongoose.model('postscollections', postsSchema);