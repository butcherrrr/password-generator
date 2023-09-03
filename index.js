#!/usr/bin/env node
const validate = require('./src/validate');
const generatePassword = require('./src/password-generator');
const copyToClipboard = require('./src/copy-clipboard');

const main = () => {
  const requestedLength = validate(process.argv);

  const password = generatePassword(requestedLength);

  console.log(password);
  copyToClipboard(password);
};

main();