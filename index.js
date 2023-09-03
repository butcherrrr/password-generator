#!/usr/bin/env node
const validate = require('./src/validate');
const generatePassword = require('./src/password-generator');
const copyToClipboard = require('./src/copy-clipboard');

const main = () => {
  const validLength = validate(process.argv);

  if (!validLength) {
    process.exit();
  }

  const password = generatePassword(validLength);

  console.log(password);

  const { platform } = process;
  copyToClipboard(password, platform);
};

main();
