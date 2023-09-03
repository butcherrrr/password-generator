#!/usr/bin/env node
const { exec } = require('child_process');
const { PASSWORD_LENGTHS, CHARACTER_TYPES, MULTI_CASE_TYPE, PLATFORM_TYPES } = require('./constants');

let [, , requestedLength = PASSWORD_LENGTHS.DEFAULT] = process.argv;

if (requestedLength && isNaN(requestedLength)) {
  console.log('Usage: np <password-length> # Arg must be a number, leave blank for default of 12');
  process.exit();
}

if (requestedLength && requestedLength < PASSWORD_LENGTHS.MIN) {
  console.log('Usage: np <password-length> # Arg must be more than six characters');
  process.exit();
}

const copyToClipBoard = password => {
  const copyCommand = {
    [PLATFORM_TYPES.WINDOWS]: 'clip',
    [PLATFORM_TYPES.LINUX]: 'pbcopy',
    [PLATFORM_TYPES.MAC_OS]: 'pbcopy',
  }[process.platform];

  const escapedPassword = password.replace(/(\$|")/g, '\\$&');

  const cp = exec(`echo "${escapedPassword}" | ${copyCommand}`);

  cp.on('error', err => {
    console.error('Error copying to clipboard:', err);
  });

  cp.on('exit', code => {
    if (code === 0) {
      console.log('Copied to clipboard!');
    } else {
      console.error('Copy to clipboard failed. Exit code:', code);
    }
  });
}

const gen = () => {
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

const result = gen();

console.log(result);
copyToClipBoard(result);

