const isEmail = require('validator/lib/isEmail');
const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  name: {
    type: String, minlength: 2, maxlength: 30,
  },
  email: {
    type: String,
    validate: {
      validator: (email) => isEmail(email),
      message: 'is not a valid email',
    },
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
    select: false,
  },
}, { versionKey: false });

module.exports = mongoose.model('user', userSchema);
