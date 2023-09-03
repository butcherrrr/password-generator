const { VALIDATION: { LENGTHS, ERROR_MESSAGES } } = require('./constants');

module.exports = args => {
  const [, , requestedLength = LENGTHS.DEFAULT] = args;

  if (isNaN(requestedLength)) {
    console.log(ERROR_MESSAGES.NOT_A_NUMBER);
    process.exit();
  }

  if (requestedLength < LENGTHS.MIN) {
    console.log(ERROR_MESSAGES.MIN);
    process.exit();
  }

  if (requestedLength > LENGTHS.MAX) {
    console.log(ERROR_MESSAGES.MAX);
    process.exit();
  }

  return requestedLength;
};
