const mongoose = require('mongoose');
const Joi = require('joi');
const config = require('config');
const jwt = require('jsonwebtoken');
const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        unique:true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true,
        minlength: 8,
        maxlength: 100
    },
    title: [{task: {type:String}, isprior: {type:Boolean, default:false}}]
});

userSchema.methods.generateAuthToken = function () {
    const token = jwt.sign({ _id: this._id }, config.get('jwtPrivateKey'));
    return token;
}

const User = mongoose.model('User', userSchema);

function validateUser(user) {
    const Schema = {
        name: Joi.string().max(50).required(),
        email: Joi.string().required().email(),
        password: Joi.string().min(8).max(100).required(),
    }
    return Joi.validate(user, Schema)
}

module.exports.User = User;
module.exports.validate = validateUser;
