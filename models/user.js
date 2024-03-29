const mongoose = require('mongoose');

const { Schema } = mongoose;

const userSchema = new Schema({
  name: {
    type: String,
    required: true,
    minlength: 2,
    maxlength: 30,
  },
  about: {
    type: String,
    required: true,
    minlength: 2,
    maxlength: 30,
  },
  avatar: {
    type: String,
    required: true,
    validate: {
      validator: (v) => /^(http(s)?):\/\/(www.)?[a-zA-Z0-9-._~:/?#@!$&'()*+,;=]($#)?/.test(v),
      message: 'Enter a valid url address',
    },
  },
});

module.exports = mongoose.model('user', userSchema);
