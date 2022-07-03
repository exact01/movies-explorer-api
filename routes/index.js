const { celebrate, Joi } = require('celebrate');
const router = require('express').Router();
const { userRouter } = require('./users');
const { movieRouter } = require('./movie');
const { createUser, login } = require('../controllers/users');

router.post('/signin', celebrate({
  body: Joi.object().keys({
    email: Joi.string().required().email({ tlds: { allow: false } }),
    password: Joi.string().required(),
  }),
}), login);
router.post('/signup', celebrate({
  body: Joi.object().keys({
    email: Joi.string().required().email({ tlds: { allow: false } }),
    password: Joi.string().required(),
    name: Joi.string().required().min(2).max(30),
  }),
}), createUser);

router.use(userRouter);
router.use(movieRouter);

module.exports.indexRouters = router;
