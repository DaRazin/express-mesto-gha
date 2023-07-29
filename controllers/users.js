const User = require('../models/user');
const { ERROR_CODE_INCORRECT_DATA, ERROR_CODE_NOTFOUND, ERROR_CODE_DEFAULT } = require('../utils/error_codes');


module.exports.getUsers = (req, res) => {
  User.find({})
    .then((users) => {
      if (!users){
        return res.status(ERROR_CODE_NOTFOUND).send({ message: 'Пользователи не найдены' });
      };
      res.send({ data: users })
    })
    .catch(() => {
      res.status(ERROR_CODE_DEFAULT).send({ massage: 'Ошибка по-умолчанию' });
    })
};

module.exports.getUser = (req, res) => {
  const { userId } = req.params;
  User.findById(userId)
    .then((users) => {
      if (!users){
        return res.status(ERROR_CODE_NOTFOUND).send({ message: 'Пользователь по указанному _id не найден' });
      };
      res.send({ data: users })
    })
    .catch((err) => {
      if (err.name === "CastError") {
        return res.status(ERROR_CODE_INCORRECT_DATA).send({ message: "Указан неверный id. ",})
      };
      res.status(ERROR_CODE_DEFAULT).send({ massage: 'Ошибка по-умолчанию' });
    })
};

module.exports.createUser = (req, res) => {
  const { name, about, avatar } = req.body;
  User.create({name, about, avatar})
    .then(user => res.send({ data: user }))
    .catch((err) => {
      if (err.name === 'ValidationError'){
        return res.status(ERROR_CODE_INCORRECT_DATA).send( {message: 'Переданы некорректные данные при создании пользователя'} );
      };
      res.status(ERROR_CODE_DEFAULT).send({ massage: 'Ошибка по-умолчанию' });
    })
};

module.exports.updateUserData = (req, res) => {
  const userId = req.user._id;
  const { name, about } = req.body;
  User.findByIdAndUpdate(userId, {name, about})
  .then((users) => {
    if (!users){
      return res.status(ERROR_CODE_NOTFOUND).send({ message: 'Пользователь по указанному _id не найден' })
    };
    res.send({ data: users })
  })
    .catch(() => {
      if (err.name === 'ValidationError'){
        return res.status(ERROR_CODE_INCORRECT_DATA).send( {massage: 'Переданы некорректные данные при создании пользователя'} );
      };
      res.status(ERROR_CODE_DEFAULT).send({ massage: 'Произошла ошибка' });
    })
};

module.exports.updateUserAvatar = (req, res) => {
  const userId = req.user._id;
  const { avatar } = req.body;
  User.findByIdAndUpdate(userId, { avatar })
    .then((users) => {
      if (!users){
        return res.status(ERROR_CODE_INCORRECT_DATA).send({ message: 'Пользователь по указанному _id не найден' })
      };
      res.send({ data: users })
    })
    .catch(() => {
      if (err.name === 'ValidationError'){
        return res.status(ERROR_CODE_INCORRECT_DATA).send( {massage: 'Переданы некорректные данные при создании пользователя'} );
      };
      res.status(ERROR_CODE_DEFAULT).send({ massage: 'Произошла ошибка' });
    })
}