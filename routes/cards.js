const router = require('express').Router();
const {
  getCards, createCard, deleteCard, likeCard, dislikeCard,
} = require('../controllers/cards');

const { validCreateCard, validCardId } = require('../middlewares/validator');

router.get('/cards', getCards);
router.post('/cards', validCreateCard, createCard);
router.delete('/cards/:cardId', validCardId, deleteCard);
router.put('/cards/:cardId/likes', validCardId, likeCard);
router.delete('/cards/:cardId/likes', validCardId, dislikeCard);

module.exports = router;
