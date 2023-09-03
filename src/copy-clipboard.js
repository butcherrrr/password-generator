const { exec } = require('child_process');
const { CLIPBOARD_MESSAGES, PLATFORM_TYPES } = require('./constants');

module.exports = password => {
  const copyCommand = {
    [PLATFORM_TYPES.WINDOWS]: 'clip',
    [PLATFORM_TYPES.LINUX]: 'pbcopy',
    [PLATFORM_TYPES.MAC_OS]: 'pbcopy',
  }[process.platform];

  const escapedPassword = password.replace(/(\$|")/g, '\\$&');

  const cp = exec(`echo "${escapedPassword}" | ${copyCommand}`);

  cp.stderr.on('data', data => {
    console.error(CLIPBOARD_MESSAGES.COMMAND_ERROR, data);
  });

  cp.on('exit', code => {
    if (code === 0) {
      console.log(CLIPBOARD_MESSAGES.SUCCESS);
    } else {
      console.error(CLIPBOARD_MESSAGES.EXIT_CODE, code);
    }
  });
}
