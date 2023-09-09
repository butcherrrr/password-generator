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
  EXIT_CODE: 'Copy to clipboard failed. Exit code:',
};

const PLATFORM_TYPES = {
  WINDOWS: 'win32',
  LINUX: 'linux',
  MAC_OS: 'darwin',
};

module.exports = {
  VALIDATION,
  CHARACTER_TYPES,
  MULTI_CASE_TYPE,
  CLIPBOARD_MESSAGES,
  PLATFORM_TYPES,
};
