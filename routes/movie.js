const { errors, celebrate, Joi } = require('celebrate');
const JoiDate = require('joi').extend(require('@joi/date'));
const router = require('express').Router();
const { validateUrl } = require('../utils/customValidator');

const {
  createMovie, getMovie, deletMovie, likeCard, dislikeCard,
} = require('../controllers/movie');

router.post('/', celebrate({
  body: Joi.object().keys({
    country: Joi.string().required(),
    director: Joi.string().required().min(2),
    duration: Joi.number().required(),
    year: Joi.string().required().length(4),
    description: Joi.string().required(),
    image: Joi.string().required().custom(validateUrl, 'custom validate url'),
    trailerLink: Joi.string().required().custom(validateUrl, 'custom validate url'),
    thumbnail: Joi.string().required().custom(validateUrl, 'custom validate url'),
    owner: Joi.string().required().length(24),
    movieId: Joi.number().required(),
    nameRU: Joi.string().required(),
    nameEN: Joi.string().required(),
  }),
}), createMovie);

router.get('/', getMovie);

router.delete('/:movieId', celebrate({
  params: Joi.object().keys({
    movieId: Joi.string().required().length(24),
  }),
}), deletMovie);

// router.put('/:cardId/likes', celebrate({
//   params: Joi.object().keys({
//     cardId: Joi.string().required().length(24),
//   }),
// }), likeCard);

// router.delete('/:cardId/likes', celebrate({
//   params: Joi.object().keys({
//     cardId: Joi.string().required().length(24),
//   }),
// }), dislikeCard);

router.use(errors());

module.exports.movieRouter = router;
