const { celebrate, Joi } = require('celebrate');
const regex = /https?:\/\/(www\.)?[-a-zA-Z0-9@:%._\+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()@:%_\+.~#?&//=]*)/

module.exports.validUserId = celebrate({
  params: Joi.object().keys({
    userId: Joi.string().hex().length(24).required(),
  }),
});

module.exports.validUserUpdate = celebrate({
  body: Joi.object().keys({
    name: Joi.string().min(2).max(30),
    about: Joi.string().min(2).max(30),
  }),
});

module.exports.validUserAvatarUpdate = celebrate({
  body: Joi.object().keys({
    avatar: Joi.string().pattern(regex),
  }),
});

module.exports.validCreateUser = celebrate({
  body: Joi.object().keys({
    name: Joi.string().min(2).max(30),
    about: Joi.string().min(2).max(30),
    avatar: Joi.string().pattern(regex),
    email: Joi.string().email().required(),
    password: Joi.string().min(8).required(),
  }),
});

module.exports.validlogin = celebrate({
  body: Joi.object().keys({
    email: Joi.string().email().required(),
    password: Joi.string().required(),
  }),
});

module.exports.validCreateCard = celebrate({
  body: Joi.object().keys({
    name: Joi.string().min(2).max(30).required(),
    link: Joi.string().pattern(regex).required(),
  }),
});

module.exports.validCardId = celebrate({
  params: Joi.object().keys({
    cardId: Joi.string().hex().length(24).required(),
  }),
});