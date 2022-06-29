require('dotenv').config();

const { JWT_SECRET_KEY, NODE_ENV } = process.env;
const jwt = require('jsonwebtoken');

function generateToken(payload) {
  return jwt.sign({ _id: payload }, NODE_ENV === 'production' ? JWT_SECRET_KEY : '12345678', { expiresIn: '7d' });
}

module.exports = {
  generateToken,
};
