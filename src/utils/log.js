const { LOG_STYLE } = require('../constants');

const output = (text, options = {}) => {
  const {
    color = LOG_STYLE.NONE, bold = false, lineBreaks = false, checkmark = false,
  } = options;

  const boldText = bold ? LOG_STYLE.BOLD : LOG_STYLE.NONE;
  const breakLine = lineBreaks ? LOG_STYLE.LINE_BREAK : LOG_STYLE.NONE;
  const check = checkmark ? LOG_STYLE.CHECKMARK : LOG_STYLE.NONE;

  process.stdout.write(`${breakLine}${color}${check} ${boldText}${text}${LOG_STYLE.RESET}${breakLine}\n`);
};

const error = (message, data = undefined) => {
  output(message, { color: LOG_STYLE.RED });
  if (data) {
    output(data, { color: LOG_STYLE.RED });
  }
};

const info = (message, data = undefined) => {
  output(message);
  if (data) {
    output(data);
  }
};

const result = (message, data = undefined) => {
  output(message);
  if (data) {
    output(data, { bold: true, lineBreaks: true });
  }
};

const success = (message, data) => {
  output(message, { color: LOG_STYLE.GREEN, checkmark: true });
  if (data) {
    output(message, { color: LOG_STYLE.GREEN });
  }
};

module.exports = {
  error,
  info,
  result,
  success,
  output,
};
