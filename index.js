#!/usr/bin/env node
const validate = require('./src/validate');
const generatePassword = require('./src/password-generator');
const copyToClipboard = require('./src/copy-clipboard');
const log = require('./src/utils/log');
const { PASSWORD_MESSAGE } = require('./src/constants');

log.init();

const main = () => {
  const validLength = validate(process.argv);

  if (!validLength) {
    process.exit(1);
  }

  const password = generatePassword(validLength);
  log.result(PASSWORD_MESSAGE, password);

  copyToClipboard(password);
};

main();
