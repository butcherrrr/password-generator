const { LOG_STYLE } = require('../constants');

const output = (text, outputStream, options = {}) => {
  const {
    color = LOG_STYLE.NONE, bold = false, lineBreaks = false, checkmark = false,
  } = options;

  const boldText = bold ? LOG_STYLE.BOLD : LOG_STYLE.NONE;
  const breakLine = lineBreaks ? LOG_STYLE.LINE_BREAK : LOG_STYLE.NONE;
  const check = checkmark ? LOG_STYLE.CHECKMARK : LOG_STYLE.NONE;

  outputStream.write(`${breakLine}${color}${check}${boldText}${text}${LOG_STYLE.RESET}${breakLine}\n`);
};

const error = (message, data = undefined, outputStream = process.stdout) => {
  output(message, outputStream, { color: LOG_STYLE.RED });
  if (data) {
    output(data, outputStream, { color: LOG_STYLE.RED });
  }
};

const info = (message, data = undefined, outputStream = process.stdout) => {
  output(message, outputStream);
  if (data) {
    output(data, outputStream);
  }
};

const result = (message, data = undefined, outputStream = process.stdout) => {
  output(message, outputStream);
  if (data) {
    output(data, outputStream, { bold: true, lineBreaks: true });
  }
};

const success = (message, data, outputStream = process.stdout) => {
  output(message, outputStream, { color: LOG_STYLE.GREEN, checkmark: true });
  if (data) {
    output(message, outputStream, { color: LOG_STYLE.GREEN });
  }
};

module.exports = {
  error,
  info,
  result,
  success,
  output,
};
