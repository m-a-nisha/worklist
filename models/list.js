const mongoose = require('mongoose');
const Joi = require('joi');


const listSchema = new mongoose.Schema({
    task: {
        type: String,
        required: true
    },
    isprior: {
        type: Boolean,
        default:false
    }
});

const List = mongoose.model('List', listSchema);

// function validateTitle(title) {
//     const Schema = {
//         title: Joi.string().required()
//     }
//     return Joi.validate(title,Schema)
// }

module.exports.List = List;
// module.exports.validate = validateTitle;