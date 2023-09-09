/* eslint-disable no-restricted-syntax */
const getRandomCharacter = require('./utils/random-character');
const { CHARACTER_TYPES, MULTI_CASE_TYPE } = require('./constants');

module.exports = requestedLength => {
  let password = '';
  while (password.length < requestedLength) {
    for (const [key, value] of Object.entries(CHARACTER_TYPES)) {
      if (password.length >= requestedLength) {
        break;
      }
      password += getRandomCharacter(value, key === MULTI_CASE_TYPE && Math.random() < 0.5);
    }
  }

  return password;
};
