const mongoose = require('mongoose');
const ValidationMessage = require('../utils/validationMessage');
const {
  regexUrl,
} = require('../utils/regex');

const movieSchema = new mongoose.Schema({
  country: {
    type: String,
    required: true,
    minLength: 2,
  },
  director: {
    type: String,
    required: true,
    minLength: 2,
  },
  duration: {
    type: Number,
    required: true,
  },
  year: {
    type: String,
    required: true,
    minLength: 4,
    maxLength: 4,
  },
  description: {
    type: String,
    required: true,
    minLength: 2,
  },
  image: {
    type: String,
    required: true,
    validate: {
      validator: (v) => regexUrl.test(v),
      message: ValidationMessage.urlFormat,
    },
  },
  trailerLink: {
    type: String,
    required: true,
    validate: {
      validator: (v) => regexUrl.test(v),
      message: ValidationMessage.urlFormat,
    },
  },
  thumbnail: {
    type: String,
    required: true,
    validate: {
      validator: (v) => regexUrl.test(v),
      message: ValidationMessage.urlFormat,
    },
  },
  owner: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'user',
    required: true,
  },
  movieId: {
    type: Number,
    required: true,
  },
  nameRU: {
    type: String,
    required: true,
    minLength: 2,
  },
  nameEN: {
    type: String,
    required: true,
    minLength: 2,
  },
}, { versionKey: false });
module.exports = mongoose.model('movie', movieSchema);
