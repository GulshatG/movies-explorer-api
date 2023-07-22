const jwt = require('jsonwebtoken');
const Unauthorized = require('../exceptions/unauthorized');
const { unauthorized } = require('../utils/validationMessage');

const {
  NODE_ENV,
  JWT_SECRET,
} = process.env;

module.exports.auth = (req, res, next) => {
  const { token } = req.cookies;
  if (!token) {
    return next(new Unauthorized(unauthorized));
  }
  let payload;
  try {
    payload = jwt.verify(token, NODE_ENV === 'production' ? JWT_SECRET : 'dev-secret');
  } catch (err) {
    return next(new Unauthorized(unauthorized));
  }
  req.user = payload;
  return next();
};
