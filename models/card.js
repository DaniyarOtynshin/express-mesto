const mongoose = require('mongoose');

const { Schema, ObjectId } = mongoose;

const cardSchema = new Schema({
  name: {
    type: String,
    required: true,
    minlength: 2,
    maxlength: 30,
  },
  link: {
    type: String,
    validate: {
      validator: (v) => /^(http(s)?):\/\/(www.)?[a-zA-Z0-9-._~:/?#@!$&'()*+,;=]($#)?/.test(v),
    },
  },
  owner: {
    type: ObjectId,
    required: true,
  },
  likes: {
    type: [ObjectId],
    default: [],
  },
  createdAt: {
    type: Date,
    default: Date.now(),
  },
});

module.exports = mongoose.model('card', cardSchema);
