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
  },
  owner: {
    type: [ObjectId],
    default: [],
  },
  likes: {
    type: Array,
  },
  createdAt: {
    type: Date,
    default: Date.now(),
  },
});

module.exports = mongoose.model('card', cardSchema);
