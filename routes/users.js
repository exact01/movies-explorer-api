const { errors, celebrate, Joi } = require('celebrate');
const router = require('express').Router();
const { isAuthorized } = require('../middlewares/auth');

const {
  getUserMe, pathUserMe,
} = require('../controllers/users');

router.get('/users/me', isAuthorized, getUserMe);

router.patch('/users/me', isAuthorized, celebrate({
  body: Joi.object().keys({
    name: Joi.string().min(2).max(30).required(),
    email: Joi.string().email({ tlds: { allow: false } }).required(),
  }),
}), pathUserMe);

router.use(isAuthorized, errors());

module.exports.userRouter = router;
