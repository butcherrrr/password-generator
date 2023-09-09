const { VALIDATION: { LENGTHS, ERROR_MESSAGES } } = require('./constants');
const log = require('./utils/log');

module.exports = args => {
  const [, , requestedLength = LENGTHS.DEFAULT] = args;

  if (Number.isNaN(Number(requestedLength))) {
    log.error(ERROR_MESSAGES.NOT_A_NUMBER);
    return false;
  }

  if (requestedLength < LENGTHS.MIN) {
    log.error(ERROR_MESSAGES.MIN);
    return false;
  }

  if (requestedLength > LENGTHS.MAX) {
    log.error(ERROR_MESSAGES.MAX);
    return false;
  }

  return requestedLength;
};
