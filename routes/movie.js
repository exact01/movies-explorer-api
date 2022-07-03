const { errors, celebrate, Joi } = require('celebrate');
const router = require('express').Router();
const { validateUrl } = require('../utils/customValidator');
const { isAuthorized } = require('../middlewares/auth');

const {
  createMovie, getMovie, deletMovie,
} = require('../controllers/movie');

router.post('/movies/', isAuthorized, celebrate({
  body: Joi.object().keys({
    country: Joi.string().required(),
    director: Joi.string().required().min(2),
    duration: Joi.number().required(),
    year: Joi.string().required().length(4),
    description: Joi.string().required(),
    image: Joi.string().required().custom(validateUrl, 'custom validate url'),
    trailerLink: Joi.string().required().custom(validateUrl, 'custom validate url'),
    thumbnail: Joi.string().required().custom(validateUrl, 'custom validate url'),
    movieId: Joi.number().required(),
    nameRU: Joi.string().required(),
    nameEN: Joi.string().required(),
  }),
}), createMovie);

router.get('/movies/', isAuthorized, getMovie);

router.delete('/movies/:movieId', isAuthorized, celebrate({
  params: Joi.object().keys({
    movieId: Joi.string().hex().length(24),
  }),
}), deletMovie);

router.use(isAuthorized, errors());

module.exports.movieRouter = router;
