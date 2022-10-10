const args = process.argv.slice(2);

const MAX_PASS_LENGTH = args[0] || 21;
const MIN_PASS_LENGTH = 6;

const MULTI_CASE_TYPES = ['LETTER'];

const CHARACTER_TYPES = {
  LETTER: 'abcdefghijklmnopqrstuvwxyz',
  NUMBER: '1234567890',
  SYMBOL: '!"#€%&£$',
};

const randomize = (characterType, capitalize = false) => {
  const length = characterType.length;
  return capitalize
    ? characterType[Math.floor(Math.random() * length)].toUpperCase()
    : characterType[Math.floor(Math.random() * length)];
};

const gen = () => {
  let pass = '';
  let capitalize;

  if (MAX_PASS_LENGTH < MIN_PASS_LENGTH) {
    return 'Password must be minimum six characters';
  }

  while (pass.length < MAX_PASS_LENGTH) {
    for (const [key, value] of Object.entries(CHARACTER_TYPES)) {
      if (MULTI_CASE_TYPES.includes(key)) capitalize = Math.random() < 0.5;
      pass += randomize(value, capitalize);
    }
  }

  return pass;
};

const res = gen();
console.log(res);

