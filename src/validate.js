const { VALIDATION: { LENGTHS, ERROR_MESSAGES } } = require('./constants');

module.exports = args => {
  const [, , requestedLength = LENGTHS.DEFAULT] = args;

  if (Number.isNaN(Number(requestedLength))) {
    console.error(ERROR_MESSAGES.NOT_A_NUMBER);
    return false;
  }

  if (requestedLength < LENGTHS.MIN) {
    console.error(ERROR_MESSAGES.MIN);
    return false;
  }

  if (requestedLength > LENGTHS.MAX) {
    console.error(ERROR_MESSAGES.MAX);
    return false;
  }

  return requestedLength;
};
