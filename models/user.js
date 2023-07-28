const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    minlenght: 2,
    maxlenght: 30,
    required: true,
  },
  about: {
    type: String,
    minlenght: 2,
    maxlenght: 30,
    required: true
  },
  avatar: {
    type: String,
    required: true
  }
});

module.exports = mongoose.model('user', userSchema);