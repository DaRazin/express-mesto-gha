const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const { errors } = require('celebrate');
const routesUsers = require('./routes/users');
const routesCards = require('./routes/cards');
const auth = require('./middlewares/auth');
const {
  createUser, login,
} = require('./controllers/users');
const { validCreateUser, validlogin } = require('./middlewares/validator');

const { PORT = 3000, DB_URL = 'mongodb://127.0.0.1:27017/mestodb' } = process.env;
const { ERROR_CODE_NOTFOUND } = require('./utils/error_codes');

mongoose.connect(DB_URL);
const app = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.post('/signin', validlogin, login);
app.post('/signup', validCreateUser, createUser);
app.use(auth, routesUsers);
app.use(auth, routesCards);
app.patch('*', (req, res) => {
  res.status(ERROR_CODE_NOTFOUND).send({ message: 'Страница не найдена' });
});
app.use(errors());
app.use((err, req, res, next) => {
  const { message } = err;
  console.log(message);
  res.status(err.statusCode).send({
    message: err.statusCode === 500 ? 'На сервере произошла ошибка' : message,
  });
  next();
});
app.listen(PORT, () => {
  console.log(`Application is running on port ${PORT}`);
});
