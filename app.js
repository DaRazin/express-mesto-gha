const express = require('express');
const { PORT = 3000, DB_URL = 'mongodb://127.0.0.1:27017/mestodb'} = process.env;
const mongoose = require('mongoose');
const { ERROR_CODE_NOTFOUND } = require('./utils/error_codes');
const routesUsers = require('./routes/users');
const routesCards = require('./routes/cards');
const bodyParser = require('body-parser');


mongoose.connect(DB_URL);
const app = express();

app.use(bodyParser.json())
app.use((req, res, next) => {
  req.user = {
    _id: '64c19b0accfdf134383c143e'
  };

  next();
});
app.use(routesUsers);
app.use(routesCards);
app.patch('*', (req, res) => {
  res.status(ERROR_CODE_NOTFOUND).send({ message: 'Страница не найдена' });
})
app.listen(PORT, () => {
  console.log(`Application is running on port ${PORT}`);
})
