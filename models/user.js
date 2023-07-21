const mongoose = require('mongoose');
const validator = require('validator');
const { emailFormat } = require('../utils/validationMessage');

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    minLength: 2,
    maxLength: 30,
    default: 'John Galt',
  },
  email: {
    type: String,
    required: true,
    unique: true,
    validate: {
      validator: (v) => validator.isEmail(v),
      message: emailFormat,
    },
  },
  password: {
    type: String,
    required: true,
    select: false,
  },
}, { versionKey: false });
module.exports = mongoose.model('user', userSchema);
