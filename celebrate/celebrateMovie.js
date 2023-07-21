const {
  celebrate,
  Joi,
} = require('celebrate');
const {
  regexUrl,
  matchRU,
  matchEN,
} = require('../utils/regex');

module.exports.celebrateCreateMovie = celebrate({
  body: Joi.object()
    .keys({
      name: Joi.string()
        .required()
        .min(2)
        .max(30),
      link: Joi.string()
        .required()
        .regex(regexUrl),
      country: Joi.string()
        .required()
        .min(2)
        .max(30),
      director: Joi.string()
        .required()
        .min(2)
        .max(30),
      duration: Joi.number()
        .required(),
      year: Joi.string()
        .required()
        .length(4),
      description: Joi.string()
        .required()
        .min(2),
      image: Joi.string()
        .required()
        .regex(regexUrl),
      trailerLink: Joi.string()
        .required()
        .regex(regexUrl),
      thumbnail: Joi.string()
        .required()
        .regex(regexUrl),
      movieId: Joi.number()
        .required()
        .integer(),
      nameRU: Joi.string()
        .required()
        .min(2)
        .max(30)
        .regex(matchRU),
      nameEN: Joi.string()
        .required()
        .min(2)
        .max(30)
        .regex(matchEN),
    }),
});
module.exports.celebrateMovieById = celebrate({
  params: Joi.object()
    .keys({
      _id: Joi.string()
        .required()
        .length(24)
        .hex(),
    }),
});