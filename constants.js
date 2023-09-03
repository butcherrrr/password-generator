const PASSWORD_LENGTHS = {
  MIN: 6,
  MAX: 24,
  DEFAULT: 12,
};

const CHARACTER_TYPES = {
  LETTER: 'abcdefghijklmnopqrstuvwxyz',
  NUMBER: '1234567890',
  SYMBOL: '!"#€%&£$',
};

const MULTI_CASE_TYPE = 'LETTER';

 const PLATFORM_TYPES = {
  WINDOWS: 'win32',
  LINUX: 'linux',
  MAC_OS: 'darwin',
};

module.exports = {
  PASSWORD_LENGTHS,
  CHARACTER_TYPES,
  MULTI_CASE_TYPE,
  PLATFORM_TYPES,
};
