/* eslint-disable no-unused-vars */
const cors = require('cors');
const express = require('express');
const helmet = require('helmet');
const { errors, celebrate, Joi } = require('celebrate');
const mongoose = require('mongoose');
const { requestLogger, errorLogger } = require('./middlewares/logger');
const { userRouter } = require('./routes/users');
const { movieRouter } = require('./routes/movie');
const { processingErrors } = require('./middlewares/errors');
const { createUser, login } = require('./controllers/users');
const { isAuthorized } = require('./middlewares/auth');
const NotFoundError = require('./errors/NotFoundError');
require('dotenv').config();

const { PORT = 3001, NODE_ENV } = process.env;
const origin = NODE_ENV === 'production' ? ['http://diploma37.nomoreparties.sbs', 'https://diploma37.nomoreparties.sbs'] : 'http://localhost:3000';

const app = express();
app.use(helmet());
app.use(cors({ origin: [origin] }));
app.use(express.json());

mongoose.connect('mongodb://localhost:27017/mestodb', {
  useNewUrlParser: true,
});

app.use(requestLogger);

app.post('/signin', celebrate({
  body: Joi.object().keys({
    email: Joi.string().required().email({ tlds: { allow: false } }),
    password: Joi.string().required(),
  }),
}), login);
app.post('/signup', celebrate({
  body: Joi.object().keys({
    email: Joi.string().required().email({ tlds: { allow: false } }),
    password: Joi.string().required(),
    name: Joi.string().required().min(2).max(30),
  }),
}), createUser);

app.use('/users', isAuthorized, userRouter);
app.use('/movies', isAuthorized, movieRouter);

app.use(isAuthorized, (_req, _res, next) => next(new NotFoundError('Страница не найдена')));

app.use(errorLogger);

app.use(errors());

app.use(processingErrors);

app.listen(PORT);
