const mongoose = require('mongoose');
const posts_model = require('../models/posts_model');
const { postValidatorSchema } = require('../utilities/validator');

exports.GetAllPosts = async (request, response, next) => {
    const { page } = request.query;
    try {
        const LIMIT = 6;
        const startIndex = (Number(page) - 1) * LIMIT;
        const total = await posts_model.countDocuments({});
        const data = await posts_model.find().sort({ _id: -1 }).limit(LIMIT).skip(startIndex);
        return response.status(200).json({ response: { status: true, value: data, currentPage: page, totalPage: Math.ceil(total / LIMIT), message: 'Success' } });
    } catch (error) {
        next(error);
    };
};

exports.GetSinglePost = async (request, response, next) => {
    const { id } = request.params;
    if (mongoose.isValidObjectId(id)) {
        try {
            const data = await posts_model.findById(id);
            return response.status(200).json({ response: { status: true, message: 'Success', value: data } });
        } catch (error) {
            next(error);
        };
    };
    return response.status(404).json({ status: false, message: 'Resource Not Found' });
};

exports.GetPostsBySearch = async (request, response, next) => {
    const { searchQuery, tags } = request.query;
    try {
        const searchData = new RegExp(searchQuery, 'i');
        const data = await posts_model.find({
            $or: [
                {
                    title: searchData
                }, {
                    tags: {
                        $in: tags.split(',')
                    }
                }
            ]
        });
        return response.status(200).json({ status: true, value: data, message: 'Success' });
    } catch (error) {
        next(error);
    };
};

exports.CreatePost = async (request, response, next) => {
    const validator = postValidatorSchema.validate(request.body);
    if (validator.error) {
        return response.status(400).json({ response: { status: false, message: validator.error.details[0].message } });
    } else {
        try {
            const post = validator.value;
            const data = new posts_model({ ...post, userId: request.userId, creator: request.username, createdAt: new Date().toISOString() });
            await data.save();
            return response.status(201).json({ response: { status: true, message: 'Success', value: data } });
        } catch (error) {
            next(error);
        };
    }
};

exports.CreateComment = async (request, response, next) => {
    const { id } = request.params;
    const { comment } = request.body;
    if (mongoose.isValidObjectId(id)) {
        try {
            const data = await posts_model.findById(id);
            data.comments.push(comment.trim());

            const updatedComments = await posts_model.findByIdAndUpdate(id, data, { new: true });
            return response.status(201).json({ status: true, value: updatedComments, message: 'Success' });
        } catch (error) {
            next(error);
        };
    };
    return response.status(404).json({ response: { status: false, message: 'Resource Not Found' } });
};

exports.UpdatePost = async (request, response, next) => {
    const { id } = request.params;
    const { title, message, tags, selectedFile } = request.body;
    const validator = postValidatorSchema.validate({ title, message, tags, selectedFile });
    if (validator.error) {
        return response.status(400).json({ response: { status: false, message: validator.error.details[0].message } });
    } else {
        if (mongoose.isValidObjectId(id)) {
            try {
                const data = await posts_model.findByIdAndUpdate(id, validator.value, { new: true });
                return response.status(200).json({ response: { status: true, message: 'Success', value: data } });
            } catch (error) {
                next(error);
            };
        };
        return response.status(404).json({ response: { status: false, message: 'Resource Not Found' } });
    };
};

exports.LikedPost = async (request, response, next) => {
    const { id } = request.params;
    if (mongoose.isValidObjectId(id)) {
        try {
            const post = await posts_model.findById(id);
            const index = post.likes.findIndex((id) => id === String(request.userId));
            if (index === -1) {
                post.likes.push(request.userId);
            } else {
                post.likes = post.likes.filter((id) => id !== String(request.userId));
            };
            const updatedLikeCount = await posts_model.findByIdAndUpdate(id, post, { new: true });
            return response.status(200).json({ response: { status: true, value: updatedLikeCount, message: 'Success' } });
        } catch (error) {
            next(error);
        };
    };
    return response.status(404).json({ response: { status: false, message: 'Resource Not Found' } });
};

exports.DeletePost = async (request, response, next) => {
    const { id } = request.params;
    if (mongoose.isValidObjectId(id)) {
        try {
            await posts_model.findByIdAndRemove(id);
            return response.status(200).json({ response: { status: true, message: 'Success' } });
        } catch (error) {
            next(error);
        };
    };
    return response.status(404).json({ response: { status: false, message: 'Resource Not Found' } });
};

exports.Greeting = (request, response) => {
    return response.send('Welcome To Memories API');
};