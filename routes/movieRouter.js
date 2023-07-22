const router = require('express')
  .Router();
const {
  celebrateCreateMovie,
  celebrateMovieById,
} = require('../celebrate/celebrateMovie');
const {
  getMovies,
  createMovie,
  deleteMovie,
} = require('../cotrollers/movieController');

router.get('/', getMovies);
router.post('/', celebrateCreateMovie, createMovie);
router.delete('/:_id', celebrateMovieById, deleteMovie);

module.exports = router;
