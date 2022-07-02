require('dotenv').config();

const {
  PORT = 3001,
  NODE_ENV = 'development',
  MONGOOSE_DB_URL = 'mongodb://localhost:27017/moviesdb',
} = process.env;

const origin = NODE_ENV === 'production'
  ? ['http://diploma37.nomoreparties.sbs', 'https://diploma37.nomoreparties.sbs']
  : 'http://localhost:3000';

module.exports = {
  PORT,
  MONGOOSE_DB_URL,
  origin,
};
