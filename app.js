const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
require('dotenv')
  .config();
const helmet = require('helmet');
const { errors } = require('celebrate');
const userRouter = require('./routes/userRouter');
const movieRouter = require('./routes/movieRouter');
const handleExceptions = require('./utils/handleException');
const {
  login,
  createUser,
  signout,
} = require('./cotrollers/userController');
const { auth } = require('./middlewares/auth');
const {
  celebrateCreateUser,
  celebrateLogin,
} = require('./celebrate/celebrateUser');
const PageNotFound = require('./exceptions/pageNotFound');
const { pageNotFound } = require('./utils/validationMessage');

// Слушаем 3000 порт
const { PORT = 3000 } = process.env;

const app = express();

const allowedCors = [
  'https://praktikum.tk',
  'http://praktikum.tk',
  'localhost:3000',
];

mongoose.connect('mongodb://127.0.0.1:27017/mestodb', {});

app.use((req, res, next) => {
  const { origin } = req.headers;
  const { method } = req;

  const DEFAULT_ALLOWED_METHODS = 'GET,HEAD,PUT,PATCH,POST,DELETE';
  const requestHeaders = req.headers['access-control-request-headers'];

  if (method === 'OPTIONS') {
    res.header('Access-Control-Allow-Methods', DEFAULT_ALLOWED_METHODS);
    res.header('Access-Control-Allow-Headers', requestHeaders);
    return res.end();
  }
  if (allowedCors.includes(origin)) {
    res.header('Access-Control-Allow-Origin', origin);
  }
  return next();
});

app.use(helmet());
app.use(bodyParser.json());
app.use(cookieParser());

app.post('/signin', celebrateLogin, login);
app.post('/signup', celebrateCreateUser, createUser);
app.post('/signout', signout);

app.use(auth);
app.use('/users', userRouter);
app.use('/movies', movieRouter);
app.use('*', (req, res, next) => next(new PageNotFound(pageNotFound)));
app.use(errors());
app.use(handleExceptions);

app.listen(PORT);
