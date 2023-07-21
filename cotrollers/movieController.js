const Movie = require('../models/movie');
const handleOkStatus = require('../utils/handleOkStatus');
const NotEnoughRights = require('../exceptions/notEnoughRights');
const { notEnoughRight } = require('../utils/validationMessage');

module.exports.getMovies = (req, res, next) => {
  Movie.find({
    owner: req.user._id,
  })
    .populate('owner')
    .then((data) => handleOkStatus(data, res))
    .catch(next);
};

module.exports.createMovie = (req, res, next) => {
  const owner = req.user._id;
  Movie.create({
    ...req.body,
    owner,
  })
    .then((data) => handleOkStatus(data, res, 201))
    .catch(next);
};
module.exports.deleteMovie = (req, res, next) => {
  Movie.findById(req.params._id)
    .orFail()
    .then(() => {
      Movie.findOneAndRemove({
        _id: req.params._id,
        owner: req.user._id,
      })
        .orFail(new NotEnoughRights(notEnoughRight))
        .then((u) => handleOkStatus(u, res))
        .catch(next);
    })
    .catch(next);
};
