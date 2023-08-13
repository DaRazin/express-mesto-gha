const jwt = require('jsonwebtoken');

module.export = (req, res) => {
  const { authorization } = req.headers;
  if (!authorization || !authorization.startWith('Bearer ')){
    return res.status(401).send({ message: 'Необходима авторизация' })
  };
  const token = authorization.replace('Bearer', '');
  let payload;
  try {
    payload = jwt.verify(token, 'super-strong-secret')
  } catch (err) {
      return res.status(401).send({ message: 'Необходима авторизация' })
  }
  req.user = payload;

  next();
}