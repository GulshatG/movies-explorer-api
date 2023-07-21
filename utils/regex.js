const regexUrl = /https?:\/\/(www\.)?[a-zA-Z\d\-._~:/?#@!$&'()*+,;=]+/m;
const matchRU = /^[а-яёА-ЯЁ\d$@!%*?&#^-_. +]+$/;
const matchEN = /^[a-zA-Z\d$@!%*?&#^-_. +]+$/;
module.exports = {
  matchEN,
  matchRU,
  regexUrl,
};
