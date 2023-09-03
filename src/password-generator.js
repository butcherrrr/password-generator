const { CHARACTER_TYPES, MULTI_CASE_TYPE } = require('./constants');

module.exports = requestedLength => {
  const randomize = (characterType, capitalize) => {
    const character = characterType[Math.floor(Math.random() * characterType.length)];
    return capitalize ? character.toUpperCase() : character;
  };

  let password = '';
  while (password.length < requestedLength) {
    for (const [key, value] of Object.entries(CHARACTER_TYPES)) {
      password += randomize(value, key === MULTI_CASE_TYPE && Math.random() < 0.5);
    }
  }

  return password;
};
