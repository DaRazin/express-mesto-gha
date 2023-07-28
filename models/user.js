const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    minlenght: 2,
    maxlenght: 30,
    require: true
  },
  about: {
    type: String,
    minlenght: 2,
    maxlenght: 30,
    require: true
  },
  avatar: {
    type: String,
    require: true
  }
});

module.exports = mongoose.model('user', userSchema);