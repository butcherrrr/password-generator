const { LOG_STYLE, LOG_TYPES } = require('../constants');

let outputStream;

const init = (outputInjection = process.stdout) => {
  outputStream = outputInjection;
};

const format = (text, options = {}) => {
  const formatted = {
    [LOG_TYPES.ERROR_HEADER]: `${LOG_STYLE.RED}${LOG_STYLE.CROSS} ${text}${LOG_STYLE.RESET}`,
    [LOG_TYPES.ERROR_DATA]: text,
    [LOG_TYPES.INFO]: text,
    [LOG_TYPES.RESULT_HEADER]: `${text}${LOG_STYLE.LINE_BREAK}`,
    [LOG_TYPES.RESULT_DATA]: `${LOG_STYLE.BOLD}${text}${LOG_STYLE.RESET}${LOG_STYLE.LINE_BREAK}`,
    [LOG_TYPES.SUCCESS]: `${LOG_STYLE.GREEN}${LOG_STYLE.CHECKMARK} ${text}${LOG_STYLE.RESET}`,
  }[options.type];

  return `${formatted}${LOG_STYLE.LINE_BREAK}`;
};

const error = (message, data) => {
  const formattedMessage = format(message, { type: LOG_TYPES.ERROR_HEADER });
  outputStream.write(formattedMessage);
  if (data) {
    const formattedData = format(data, { type: LOG_TYPES.ERROR_DATA });
    outputStream.write(formattedData);
  }
};

const info = (message, data) => {
  const formattedMessage = format(message, { type: LOG_TYPES.INFO });
  outputStream.write(formattedMessage);
  if (data) {
    const formattedData = format(data, { type: LOG_TYPES.INFO });
    outputStream.write(formattedData);
  }
};

const result = (message, data) => {
  const formattedMessage = format(message, { type: LOG_TYPES.RESULT_HEADER });
  outputStream.write(formattedMessage);
  if (data) {
    const formattedData = format(data, { type: LOG_TYPES.RESULT_DATA });
    outputStream.write(formattedData);
  }
};

const success = (message, data) => {
  const formattedMessage = format(message, { type: LOG_TYPES.SUCCESS });
  outputStream.write(formattedMessage);
  if (data) {
    const formattedData = format(data, { type: LOG_TYPES.SUCCESS });
    outputStream.write(formattedData);
  }
};

module.exports = {
  init,
  error,
  info,
  result,
  success,
};
