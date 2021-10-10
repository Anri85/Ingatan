const Joi = require('joi');

// creating post validator
const postValidatorSchema = Joi.object().keys({
    title: Joi.string().required(),
    message: Joi.string().required(),
    tags: Joi.required(),
    selectedFile: Joi.allow()
});

// creating user register validator
const userRegisterValidatorSchema = Joi.object().keys({
    username: Joi.string().required(),
    email: Joi.string().required(),
    password: Joi.string().required()
});

// creating user login validator
const userLoginValidatorSchema = Joi.object().keys({
    email: Joi.string().required(),
    password: Joi.string().required()
});

module.exports = { postValidatorSchema, userLoginValidatorSchema, userRegisterValidatorSchema };