const Movie = require('../models/Movie');
const NotFoundError = require('../errors/NotFoundError');
const ValidationError = require('../errors/ValidationError');
const Forbidden = require('../errors/Forbidden');

function createMovie(req, res, next) {
  const owner = req.user._id;

  const {
    country,
    director,
    duration,
    year,
    description,
    image,
    trailer,
    nameRU,
    nameEN,
    thumbnail,
    trailerLink,
    movieId,
  } = req.body;

  Movie.create({
    country,
    director,
    duration,
    year,
    description,
    image,
    trailer,
    nameRU,
    nameEN,
    thumbnail,
    trailerLink,
    movieId,
    owner,
  })
    .then((movie) => {
      res.send(movie);
    })
    .catch((err) => {
      if (err.name === 'ValidationError') {
        const fields = Object.keys(err.errors).join(', ');
        next(new ValidationError(`поле(я) '${fields}' введены некорректно`));
        return;
      }
      next(err);
    });
}

function getMovie(_req, res, next) {
  Movie.find()
    .then((cards) => {
      res.send(cards.reverse());
    })
    .catch(next);
}

function deletMovie(req, res, next) {
  const { movieId } = req.params;

  const userId = req.user._id;

  Movie.findById(movieId)
    .orFail(() => new NotFoundError('Фильм с указанным id не существует'))
    .then((movieList) => {
      if (movieList.owner.equals(userId)) {
        Movie.findByIdAndRemove(movieId)
          .then(() => res.send({ message: 'Фильм удалена успешно' }))
          .catch(next);
        return;
      }
      throw new Forbidden('Доступ запрещен!');
    })
    .catch(next);
}

module.exports = {
  createMovie,
  getMovie,
  deletMovie,
};
