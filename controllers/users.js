const User = require('../models/user');

module.exports.getUsers = (req, res) => {
  User.find({})
    .then((users) => {
      if (!users){
        return res.status(404).send({ message: 'Пользователи не найдены' })
      };
      res.send({ data: users })
    })
    .catch(() => {
      res.status(500).send({ massage: 'Ошибка по-умолчанию' });
    })
};

module.exports.getUser = (req, res) => {
  const { userId } = req.params;
  User.findById(userId)
    .then((users) => {
      if (!users){
        return res.status(404).send({ message: 'Пользователь по указанному _id не найден' })
      };
      res.send({ data: users })
    })
    .catch(() => {
      res.status(500).send({ massage: 'Ошибка по-умолчанию' });
    })
};

module.exports.createUser = (req, res) => {
  const { name, about, avatar } = req.body;
  User.create({name, about, avatar})
    .then(user => res.send({ data: user }))
    .catch((err) => {
      if (err.name = 'SomeErrorName'){
        return res.status(400).send({ massage: 'Переданы некорректные данные при создании пользователя' })
      };
      res.status(500).send({ massage: 'Ошибка по-умолчанию' });
    })
};

module.exports.updateUserData = (req, res) => {
  const userId = req.user._id;
  const { name, about } = req.body;
  User.findByIdAndUpdate(userId, {name, about})
  .then((users) => {
    if (!users){
      return res.status(404).send({ message: 'Пользователь по указанному _id не найден' })
    };
    res.send({ data: users })
  })
    .catch(() => {
      res.status(500).send({ massage: 'Произошла ошибка' });
    })
};

module.exports.updateUserAvatar = (req, res) => {
  const userId = req.user._id;
  const { avatar } = req.body;
  User.findByIdAndUpdate(userId, { avatar })
    .then((users) => {
      if (!users){
        return res.status(404).send({ message: 'Пользователь по указанному _id не найден' })
      };
      res.send({ data: users })
    })
    .catch(() => {
      res.status(500).send({ massage: 'Произошла ошибка' });
    })
}