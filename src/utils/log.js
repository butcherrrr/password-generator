const { LOG_STYLE } = require('../constants');

let outputStream;

const init = (outputInjection = process.stdout) => {
  outputStream = outputInjection;
};

const format = (text, options = {}) => {
  let formatted;

  switch (options.type) {
    case 'error':
      formatted = `${LOG_STYLE.RED}${text}${LOG_STYLE.RESET}\n`;
      break;
    case 'info':
      formatted = `${text}\n`;
      break;
    case 'result-header':
      formatted = `${text}${LOG_STYLE.LINE_BREAK}\n`;
      break;
    case 'result-data':
      formatted = `${LOG_STYLE.BOLD}${text}${LOG_STYLE.RESET}${LOG_STYLE.LINE_BREAK}\n`;
      break;
    case 'success':
      formatted = `${LOG_STYLE.GREEN}${LOG_STYLE.CHECKMARK} ${text}${LOG_STYLE.RESET}\n`;
      break;
    default:
      formatted = `${text}\n`;
      break;
  }

  return formatted;
};

const error = (message, data = undefined) => {
  const formattedMessage = format(message, { type: 'error' });
  outputStream.write(formattedMessage);
  if (data) {
    const formattedData = format(data, { type: 'error' });
    outputStream.write(formattedData);
  }
};

const info = (message, data = undefined) => {
  const formattedMessage = format(message, { type: 'info' });
  outputStream.write(formattedMessage);
  if (data) {
    const formattedData = format(data, { type: 'info' });
    outputStream.write(formattedData);
  }
};

const result = (message, data = undefined) => {
  const formattedMessage = format(message, { type: 'result-header' });
  outputStream.write(formattedMessage);
  if (data) {
    const formattedData = format(data, { type: 'result-data' });
    outputStream.write(formattedData);
  }
};

const success = (message, data) => {
  const formattedMessage = format(message, { type: 'success' });
  outputStream.write(formattedMessage);
  if (data) {
    const formattedData = format(data, { type: 'success' });
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
