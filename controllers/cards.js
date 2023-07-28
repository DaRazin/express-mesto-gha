const Card = require('../models/card');

module.exports.getCards = (req, res) => {
  Card.find({})
    .then((cards) => {
      if (!cards){
        return res.status(404).send( {massage: 'Карточки не найдены'} )
      };
      res.send({ data: cards })
    })
    .catch(() => {
      res.status(500).send({ massage: 'Ошибка по-умолчанию' });
    })
};

module.exports.createCard = (req, res) => {
  const userId = req.user._id;
  const {name, link} = req.body;
  Card.create({name, link, owner: userId})
    .then(card => res.send({ data: card }))
    .catch((err) => {
      if (err.name = 'SomeErrorName'){
        return res.status(400).send( {massage: 'Переданы некорректные данные в метод создания карточки'} )
      };
      res.status(500).send({ massage: 'Ошибка по-умолчанию' });
     })
};

module.exports.deleteCard = (req, res) => {
  const {cardId} = req.params;
  Card.findByIdAndDelete(cardId)
    .then((card) => {
      if (!card){
        return res.status(404).send( {massage: 'Карточка с указанным _id не найдена'} )
      };
      res.send({ message: 'Карточка удалена' })
    })
    .catch(() => {
      res.status(500).send({ massage: 'Ошибка по-умолчанию' });
    })
};

module.exports.likeCard = (req, res) => {
  const {cardId} = req.params;
  Card.findByIdAndUpdate(cardId, { $addToSet: { likes: req.user._id } }, { new: true })
  .then((card) => {
    if (!card){
      return res.status(404).send( {massage: 'Карточка с указанным _id не найдена'} )
    };
    res.send({ data: card })
  })
  .catch(() => {
    res.status(500).send({ massage: 'Ошибка по-умолчанию' });
  })
};

module.exports.dislikeCard = (req, res) => {
  const {cardId} = req.params;
  Card.findByIdAndUpdate(cardId, { $pull: { likes: req.user._id } }, { new: true })
  .then((card) => {
    if (!card){
      return res.status(404).send( {massage: 'Карточка с указанным _id не найдена'} )
    };
    res.send({ data: card })
  })
  .catch(() => {
    res.status(500).send({ massage: 'Произошла ошибка' });
  })
}