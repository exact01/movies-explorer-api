const isUrl = require('validator/lib/isURL');
const mongoose = require('mongoose');

const movieSchema = new mongoose.Schema({
  country: {
    type: String, required: true,
  },
  director: { type: String, required: true },
  duration: { type: Number, required: true },
  year: { type: String, require: true },
  description: { type: String, required: true },
  image: {
    type: String,
    validate: { validator: (link) => isUrl(link), message: 'is not a valid link' },
    required: true,
  },
  trailerLink: {
    type: String,
    validate: { validator: (link) => isUrl(link), message: 'is not a valid link' },
    required: true,
  },
  thumbnail: {
    type: String,
    validate: { validator: (link) => isUrl(link), message: 'is not a valid link' },
    required: true,
  },
  owner: { type: mongoose.Schema.Types.ObjectId, ref: 'user', required: true },
  movieId: { type: Number, require: true },
  nameRU: { type: String, required: true },
  nameEN: { type: String, required: true },
}, { versionKey: false });

module.exports = mongoose.model('Movie', movieSchema);
