const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const users_model = require('../models/users_model');
const { userLoginValidatorSchema, userRegisterValidatorSchema } = require('../utilities/validator');

exports.Login = async (request, response, next) => {
    const validator = userLoginValidatorSchema.validate(request.body);
    if (validator.error) {
        return response.status(400).json({ response: { status: false, message: validator.error.details[0].message } });
    } else {
        try {
            const data = await users_model.findOne({ 'email': validator.value.email });
            if (!data || data.length == 0) {
                return response.status(404).json({ response: { status: false, message: 'Email Does Not Exist' } });
            };
            const comparedPassword = await bcrypt.compare(validator.value.password, data.password);
            if (!comparedPassword || comparedPassword === false) {
                return response.status(400).json({ response: { status: false, message: 'Password Incorrect' } });
            };
            const token = jwt.sign({ username: data.username, Id: data._id }, process.env.JWT_SECRET);
            return response.status(200).json({ response: { status: true, message: 'Success', value: { username: data.username, Id: data._id }, token } });
        } catch (error) {
            next(error);
        };
    };
    return response.status(500).json({ response: { status: false, message: 'Something Went Wrong' } });
};

exports.Register = async (request, response, next) => {
    const validator = userRegisterValidatorSchema.validate(request.body);
    if (validator.error) {
        return response.status(400).json({ response: { status: false, message: validator.error.details[0].message } });
    } else {
        try {
            const data = await users_model.find({ email: validator.value.email });
            if (data.length > 0) {
                return response.status(400).json({ response: { status: false, message: 'Email Already Registered' } });
            };
            const hashPassword = await bcrypt.hash(validator.value.password, 12);
            const dataRegister = new users_model({
                username: validator.value.username,
                email: validator.value.email,
                password: hashPassword,
                createdAt: new Date().toISOString()
            });
            const register = await dataRegister.save();
            const token = jwt.sign({ username: register.username, Id: register._id }, process.env.JWT_SECRET);
            return response.status(201).json({ response: { status: true, message: 'Success', value: { username: register.username, Id: register._id }, token } });
        } catch (error) {
            next(error);
        };
    };
    return response.status(500).json({ response: { status: false, message: 'Something Went Wrong' } });
};