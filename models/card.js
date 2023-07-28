const mongoose = require('mongoose');
const user = require('./user');

const cardSchema = new mongoose.Schema({
  name: {
    type: String,
    minlenght: 2,
    maxlenght: 30,
    required: true
  },
  link: {
    type: String,
    required: true
  },
  owner: {
    type: mongoose.Schema.Types.ObjectId,
    ref: user,
    required: true
  },
  likes: [{
    type: mongoose.Schema.Types.ObjectId,
    default: [],
    ref: user
  }],
  createdAt: {
    type: Date,
    default: Date.now
  }
});

module.exports = mongoose.model('card', cardSchema);