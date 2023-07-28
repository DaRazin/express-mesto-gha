const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, "Обязательное поле"],
    minlength: [2, "Минимальная длина поля - 2"],
    maxlength: [30, "Максимальная длина поля - 30"],
  },
  about: {
    type: String,
    required: [true, "Обязательное поле"],
    minlength: [2, "Минимальная длина поля - 2"],
    maxlength: [30, "Максимальная длина поля - 30"],
  },
  avatar: {
    type: String,
    required: true
  }
});

module.exports = mongoose.model('user', userSchema);