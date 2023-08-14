const User = require('../models/user');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const IncorrectDataError = require('../errors/incorrect-data-err');
const NotFoundError = require('../errors/not-found-err');
const ConflictEmailError = require('../errors/conflict-email-err')

module.exports.getUsers = (req, res, next) => {
  User.find({})
    .then((users) => {
      if (!users) {
        next(new NotFoundError('Пользователи не найдены'));
      }
      return res.send({ data: users });
    })
    .catch((next));
};

module.exports.getUser = (req, res, next) => {
  const { userId } = req.params;
  User.findById(userId)
    .then((users) => {
      if (!users) {
        next(new NotFoundError('Пользователь по указанному _id не найден'));
      }
      return res.send({ data: users });
    })
    .catch((err) => {
      if (err.name === 'CastError') {
        next(new IncorrectDataError('Указан неверный id'));
      } else {
        next(err);
      }
    });
};

module.exports.createUser = (req, res, next) => {
  const { name, about, avatar, email, password } = req.body;
  console.log('test');
  bcrypt.hash(password, 10)
  .then ((hash) => User.create({ name, about, avatar, email, password: hash })
    .then((user) => res.status(201).send({
      name: user.name,
      about: user.about,
      avatar: user.avatar,
      email: user.email
     }))
    .catch((err) => {
      if (err.name === 'ValidationError') {
        next(new IncorrectDataError('Переданы некорректные данные при создании пользователя'));
      }
      if (err.code === 11000) {
        next(new ConflictEmailError('Переданы некорректные данные при создании пользователя'));
      } else {
        next(err);
      }
    }));
};

module.exports.updateUserData = (req, res, next) => {
  const userId = req.user._id;
  const { name, about } = req.body;
  User.findByIdAndUpdate(userId, { name, about }, { runValidators: true, new: true })
    .then((users) => {
      if (!users) {
        next(new IncorrectDataError('Пользователь по указанному _id не найден'));
      }
      return res.send({ data: users });
    })
    .catch((err) => {
      if (err.name === 'ValidationError') {
        next(new IncorrectDataError('Переданы некорректные данные при обновлении информации пользователя'));
      } else {
        next(err);
      }
    });
};

module.exports.updateUserAvatar = (req, res, next) => {
  const userId = req.user._id;
  const { avatar } = req.body;
  User.findByIdAndUpdate(userId, { avatar }, { new: true })
    .then((users) => {
      if (!users) {
        next(new IncorrectDataError('Пользователь по указанному _id не найден'));
      }
      return res.send({ data: users });
    })
    .catch((err) => {
      if (err.name === 'ValidationError') {
        next(new IncorrectDataError('Переданы некорректные данные при создании пользователя'));
      } else {
        next(err);
      }
    });
};

module.exports.login = (req, res, next) => {
  const { email, password } = req.body;
  User.findUserByCredentials(email, password)
    .then((user) => {
      const token = jwt.sign({ _id: user._id }, 'super-strong-secret', { expiresIn: '7d' });
      res.send({ token });
    })
    .catch(next)
};

module.exports.getMyProfile = (req, res, next) => {
  const userId = req.user._id;
  User.findById(userId)
    .then((user) => res.status(200).send({ data: user }))
    .catch((err) => {
      if (err.name === 'CastError') {
        next(new IncorrectDataError('Указан неверный id'));
      } else {
        next(err);
      }
    });
}

