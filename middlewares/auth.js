require('dotenv').config();

const { JWT_SECRET_KEY, NODE_ENV } = process.env;
const jwt = require('jsonwebtoken');
const AuthError = require('../errors/AuthError');

function isAuthorized(req, _res, next) {
  const auth = req.headers.authorization;

  if (!auth) {
    next(new AuthError('Требуется авторизация'));
    return;
  }

  const token = auth.replace('Bearer ', '');

  let payload;
  try {
    payload = jwt.verify(token, NODE_ENV === 'production' ? JWT_SECRET_KEY : '12345678');
    req.user = payload;
    next();
  } catch (e) {
    next(new AuthError('Требуется авторизация'));
  }
}

module.exports = {
  isAuthorized,
};
