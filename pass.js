const args = process.argv.slice(2);

const MAX_PASSWORD_LENGTH = args[0] || 21;
const MIN_PASSWORD_LENGTH = 6;
const MIN_PASSWORD_LENGTH_ERROR = 'Password must be minimum six characters';

const CHARACTER_TYPES = {
  LETTER: 'abcdefghijklmnopqrstuvwxyz',
  NUMBER: '1234567890',
  SYMBOL: '!"#€%&£$',
};
const MULTI_CASE_TYPE = 'LETTER';

const gen = () => {
  if (MAX_PASSWORD_LENGTH < MIN_PASSWORD_LENGTH) {
    return MIN_PASSWORD_LENGTH_ERROR;
  }

  const randomize = (characterType, capitalize) => {
    const character = characterType[Math.floor(Math.random() * characterType.length)];
    return capitalize ? character.toUpperCase() : character;
  };

  let password = '';
  while (password.length < MAX_PASSWORD_LENGTH) {
    for (const [key, value] of Object.entries(CHARACTER_TYPES)) {
      password += randomize(value, key === MULTI_CASE_TYPE && Math.random() < 0.5);
    }
  }

  return password;
};

const result = gen();

console.log(result);

