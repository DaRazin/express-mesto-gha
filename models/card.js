const mongoose = require('mongoose');
const user = require('./user');

const cardSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'Обязательное поле'],
    minlength: [2, 'Минимальная длина поля - 2'],
    maxlength: [30, 'Максимальная длина поля - 30'],
  },
  link: {
    type: String,
    required: [true, 'Обязательное поле'],
  },
  owner: {
    type: mongoose.Schema.Types.ObjectId,
    ref: user,
    required: [true, 'Обязательное поле'],
  },
  likes: [{
    type: mongoose.Schema.Types.ObjectId,
    default: [],
    ref: user,
  }],
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model('card', cardSchema);
