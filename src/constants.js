const LENGTHS = {
  MIN: 6,
  MAX: 24,
  DEFAULT: 12,
};

const ERROR_MESSAGES = {
  NOT_A_NUMBER: 'Usage: np <password-length> # Arg must be a number, leave blank for default of 12',
  MIN: 'Usage: np <password-length> # Arg must be more than six characters',
  MAX: 'Usage: np <password-length> # Arg must be less than 24 characters',
};

const VALIDATION = {
  LENGTHS,
  ERROR_MESSAGES,
};

const CHARACTER_TYPES = {
  LETTER: 'abcdefghijklmnopqrstuvwxyz',
  NUMBER: '1234567890',
  SYMBOL: '!"#€%&£$',
};

const MULTI_CASE_TYPE = 'LETTER';

const CLIPBOARD_MESSAGES = {
  COMMAND_ERROR: 'Clipboard command error:',
  SUCCESS: 'Copied to clipboard!',
  EXIT_CODE: 'Copy to clipboard failed.',
  INSTALL: 'You may need to install:',
};

const PLATFORM_TYPES = {
  WINDOWS: 'win32',
  LINUX: 'linux',
  MAC_OS: 'darwin',
};

const LOG_STYLE = {
  RED: '\x1b[31m',
  BOLD: '\x1b[1m',
  GREEN: '\x1b[32m',
  RESET: '\x1b[0m',
  LINE_BREAK: '\n',
  CHECKMARK: '\u2714',
  CROSS: '\u2718',
  NONE: '',
};

const LOG_TYPES = {
  ERROR_HEADER: 'error-header',
  ERROR_DATA: 'error-data',
  INFO: 'info',
  RESULT_HEADER: 'result-header',
  RESULT_DATA: 'result-data',
  SUCCESS: 'success',
};

const PASSWORD_MESSAGE = 'New password:';

module.exports = {
  VALIDATION,
  CHARACTER_TYPES,
  MULTI_CASE_TYPE,
  CLIPBOARD_MESSAGES,
  PLATFORM_TYPES,
  LOG_STYLE,
  PASSWORD_MESSAGE,
  LOG_TYPES,
};
