const { VALIDATION: { LENGTHS, ERROR_MESSAGES } } = require('./constants');

module.exports = args => {
  const [, , requestedLength = LENGTHS.DEFAULT] = args;

  if (isNaN(requestedLength)) {
    console.log(ERROR_MESSAGES.NOT_A_NUMBER);
    return false;
  }

  if (requestedLength < LENGTHS.MIN) {
    console.log(ERROR_MESSAGES.MIN);
    return false;
  }

  if (requestedLength > LENGTHS.MAX) {
    console.log(ERROR_MESSAGES.MAX);
    return false;
  }

  return requestedLength;
};
