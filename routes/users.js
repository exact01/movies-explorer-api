const { errors, celebrate, Joi } = require('celebrate');
const router = require('express').Router();

const {
  getUserMe, pathUserMe,
} = require('../controllers/users');

router.get('/me', getUserMe);

router.patch('/me', celebrate({
  body: Joi.object().keys({
    name: Joi.string().min(2).max(30).required(),
    email: Joi.string().email({ tlds: { allow: false } }),
  }),
}), pathUserMe);

router.use(errors());

module.exports.userRouter = router;
