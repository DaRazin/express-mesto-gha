const Card = require('../models/card');
const { ERROR_CODE_INCORRECT_DATA, ERROR_CODE_NOTFOUND, ERROR_CODE_DEFAULT, SUCCES_CODE } = require('../utils/error_codes');

module.exports.getCards = (req, res) => {
  Card.find({})
    .then((cards) => {
      if (!cards) {
        return res.status(ERROR_CODE_NOTFOUND).send({ message: 'Карточки не найдены' });
      }
      return res.send({ data: cards });
    })
    .catch(() => res.status(ERROR_CODE_DEFAULT).send({ message: 'Ошибка по умолчанию' }));
};

module.exports.createCard = (req, res) => {
  const userId = req.user._id;
  const { name, link } = req.body;
  Card.create({ name, link, owner: userId })
    .then((card) => res.status(SUCCES_CODE).send({ data: card }))
    .catch((err) => {
      if (err.name === 'ValidationError') {
        return res.status(ERROR_CODE_INCORRECT_DATA).send({ message: 'Переданы некорректные данные при создании карточки' });
      }
      return res.status(ERROR_CODE_DEFAULT).send({ message: 'Ошибка по-умолчанию' });
    });
};

module.exports.deleteCard = (req, res) => {
  const { cardId } = req.params;
  Card.findByIdAndDelete(cardId)
    .then((card) => {
      if (!card) {
        return res.status(ERROR_CODE_NOTFOUND).send({ message: 'Карточка с указанным _id не найдена' });
      }
      return res.send({ message: 'Карточка удалена' });
    })
    .catch((err) => {
      if (err.name === 'CastError') {
        return res.status(ERROR_CODE_INCORRECT_DATA).send({ message: 'Переданы некорректные данные при удалении карточки' });
      }
      return res.status(ERROR_CODE_DEFAULT).send({ message: 'Ошибка по-умолчанию' });
    });
};

module.exports.likeCard = (req, res) => {
  const { cardId } = req.params;
  Card.findByIdAndUpdate(cardId, { $addToSet: { likes: req.user._id } }, { new: true })
    .then((card) => {
      if (!card) {
        return res.status(ERROR_CODE_NOTFOUND).send({ message: 'Карточка с указанным _id не найдена' });
      }
      return res.send({ data: card });
    })
    .catch((err) => {
      if (err.name === 'CastError') {
        return res.status(ERROR_CODE_INCORRECT_DATA).send({ message: 'Передан несуществующий _id карточкПереданы некорректные данные для постановки/снятии лайка' });
      }
      return res.status(ERROR_CODE_DEFAULT).send({ message: 'Ошибка по-умолчанию' });
    });
};

module.exports.dislikeCard = (req, res) => {
  const { cardId } = req.params;
  Card.findByIdAndUpdate(cardId, { $pull: { likes: req.user._id } }, { new: true })
    .then((card) => {
      if (!card) {
        return res.status(ERROR_CODE_NOTFOUND).send({ message: 'Карточка с указанным _id не найдена' });
      }
      return res.send({ data: card });
    })
    .catch((err) => {
      if (err.name === 'CastError') {
        return res.status(ERROR_CODE_INCORRECT_DATA).send({ message: 'Передан несуществующий _id карточкПереданы некорректные данные для постановки/снятии лайка' });
      }
      return res.status(ERROR_CODE_DEFAULT).send({ message: 'Произошла ошибка' });
    });
};
