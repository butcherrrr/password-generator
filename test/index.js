/* eslint-disable no-sparse-arrays */
const chai = require('chai');
const sinon = require('sinon');
const chaiSinon = require('chai-sinon');

const childProcess = require('child_process');
const validate = require('../src/validate');
const generatePassword = require('../src/password-generator');
const getRandomCharacter = require('../src/utils/random-character');
const copyToClipboard = require('../src/copy-clipboard');
const log = require('../src/utils/log');

const { VALIDATION: { ERROR_MESSAGES }, CHARACTER_TYPES } = require('../src/constants');

chai.use(chaiSinon);
const { expect } = chai;

describe('Validate', () => {
  let logStub;

  beforeEach(() => {
    logStub = sinon.stub(log, 'error');
  });

  afterEach(() => {
    logStub.restore();
  });

  it('should return false if not a number and print out not a number message', () => {
    const args = [, , 'string'];

    const result = validate(args);

    expect(logStub).to.have.been.calledWith(ERROR_MESSAGES.NOT_A_NUMBER);
    expect(result).equals(false);
  });

  it('should return false if less than min length and print out min length message', () => {
    const args = [, , 3];

    const result = validate(args);

    expect(logStub).to.have.been.calledWith(ERROR_MESSAGES.MIN);
    expect(result).equals(false);
  });

  it('should return false if more than max length and print out max length message', () => {
    const args = [, , 25];

    const result = validate(args);

    expect(logStub).to.have.been.calledWith(ERROR_MESSAGES.MAX);
    expect(result).equals(false);
  });

  it('should return valid length and not print any message', () => {
    const args = [, , 12];

    const result = validate(args);

    expect(logStub.callCount).equals(0);
    expect(result).equals(12);
  });

  it('should return default length if requested length is undefined and not print any message', () => {
    const args = [, , undefined];

    const result = validate(args);

    expect(logStub.callCount).equals(0);
    expect(result).equals(12);
  });
});

describe('Password Generator', () => {
  it('should return a password with the requested length', () => {
    const result = generatePassword(10);
    expect(result.length).equals(10);
  });

  it('should contain a mixture of letters, numbers, and symbols', () => {
    const result = generatePassword(12);

    expect(result).to.match(/[A-Za-z]/);
    expect(result).to.match(/[0-9]/);
    expect(result).to.match(/["!€%&£$#]/);
  });

  describe('randomize', () => {
    it('should return a lower case letter', () => {
      const capitalize = false;

      const result = getRandomCharacter(CHARACTER_TYPES.LETTER, capitalize);

      expect(result).equals(result.toLowerCase());
    });

    it('should return a upper case letter', () => {
      const capitalize = true;

      const result = getRandomCharacter(CHARACTER_TYPES.LETTER, capitalize);

      expect(result).equals(result.toUpperCase());
    });

    it('should return a number', () => {
      const capitalize = false;

      const result = getRandomCharacter(CHARACTER_TYPES.NUMBER, capitalize);

      expect(Number.isNaN(Number(result))).equals(false);
    });

    it('should return a symbol', () => {
      const capitalize = false;

      const result = getRandomCharacter(CHARACTER_TYPES.NUMBER, capitalize);

      expect(result).to.be.oneOf([...CHARACTER_TYPES.NUMBER]);
    });
  });
});

describe('Copy to Clipboard', () => {
  let execStub;
  let stderrOnStub;
  let exitOnStub;

  beforeEach(() => {
    execStub = sinon.stub(childProcess, 'exec');

    stderrOnStub = sinon.stub();
    exitOnStub = sinon.stub();
  });

  afterEach(() => {
    execStub.restore();
  });

  it('should return a correct command for Windows platform', () => {
    const platform = 'win32';
    const password = 'randompassword';

    execStub.returns({
      stderr: { on: stderrOnStub },
      on: exitOnStub,
    });

    copyToClipboard(password, platform);

    expect(execStub).to.have.been.calledWith('printf "randompassword" | clip');
  });

  it('should return a correct command for Linux platform', () => {
    const platform = 'linux';
    const password = 'randompassword';

    execStub.returns({
      stderr: { on: stderrOnStub },
      on: exitOnStub,
    });

    copyToClipboard(password, platform);

    expect(execStub).to.have.been.calledWith('printf "randompassword" | xclip');
  });

  it('should return a correct command for macOS platform', () => {
    const platform = 'darwin';
    const password = 'randompassword';

    execStub.returns({
      stderr: { on: stderrOnStub },
      on: exitOnStub,
    });

    copyToClipboard(password, platform);

    expect(execStub).to.have.been.calledWith('printf "randompassword" | pbcopy');
  });

  it('should escape $ when calling copy command', () => {
    const platform = 'darwin';
    const password = '$$$$$$$$$$$$';

    execStub.returns({
      stderr: { on: stderrOnStub },
      on: exitOnStub,
    });

    copyToClipboard(password, platform);

    expect(execStub).to.have.been.calledWith('printf "\\$\\$\\$\\$\\$\\$\\$\\$\\$\\$\\$\\$" | pbcopy');
  });

  it('should escape " when calling copy command', () => {
    const platform = 'darwin';
    const password = '""""""""""""';

    execStub.returns({
      stderr: { on: stderrOnStub },
      on: exitOnStub,
    });

    copyToClipboard(password, platform);

    expect(execStub).to.have.been.calledWith('printf "\\"\\"\\"\\"\\"\\"\\"\\"\\"\\"\\"\\"" | pbcopy');
  });

  it('should escape % when calling copy command', () => {
    const platform = 'darwin';
    const password = '%%%%%%%%%%%%';

    execStub.returns({
      stderr: { on: stderrOnStub },
      on: exitOnStub,
    });

    copyToClipboard(password, platform);

    expect(execStub).to.have.been.calledWith('printf "%%%%%%%%%%%%%%%%%%%%%%%%" | pbcopy');
  });

  it('should log error on stderr data event', () => {
    const platform = 'darwin';
    const password = 'randompassword';

    execStub.returns({
      stderr: { on: stderrOnStub },
      on: exitOnStub,
    });

    const logErrorStub = sinon.stub(log, 'error');

    copyToClipboard(password, platform);

    stderrOnStub.yield('some error');

    logErrorStub.restore();

    expect(logErrorStub).to.have.been.calledWith('Clipboard command error:', 'some error');
  });

  it('should log error on child process exit event if exit code is not 0', () => {
    const platform = 'darwin';
    const password = 'randompassword';

    execStub.returns({
      stderr: { on: stderrOnStub },
      on: exitOnStub,
    });

    const logErrorStub = sinon.stub(log, 'error');

    copyToClipboard(password, platform);

    exitOnStub.yield(1);

    logErrorStub.restore();

    expect(logErrorStub).to.have.been.calledWith('Copy to clipboard failed.');
  });

  it('should log info on child process exit event if exit code is 127', () => {
    const platform = 'darwin';
    const password = 'randompassword';

    execStub.returns({
      stderr: { on: stderrOnStub },
      on: exitOnStub,
    });

    const logInfoStub = sinon.stub(log, 'info');
    const logErrorStub = sinon.stub(log, 'error');

    copyToClipboard(password, platform);

    exitOnStub.yield(127);

    logInfoStub.restore();
    logErrorStub.restore();

    expect(logInfoStub).to.have.been.calledWith('You may need to install: pbcopy');
  });

  it('should log sucess  on child process exit event if exit code is 0', () => {
    const platform = 'darwin';
    const password = 'randompassword';

    execStub.returns({
      stderr: { on: stderrOnStub },
      on: exitOnStub,
    });

    const logSuccessStub = sinon.stub(log, 'success');

    copyToClipboard(password, platform);

    exitOnStub.yield(0);

    logSuccessStub.restore();

    expect(logSuccessStub).to.have.been.calledWith('Copied to clipboard!');
  });
});

describe('Log', () => {
  let outputStreamStub;

  beforeEach(() => {
    outputStreamStub = {
      write: sinon.stub(),
    };

    log.init(outputStreamStub);
  });

  it('should log with error formatting', () => {
    const message = 'test';
    const data = 'test';

    log.error(message, data);

    expect(outputStreamStub.write).to.have.been.calledWith('\x1B[31m✘ test\x1B[0m\n');
    expect(outputStreamStub.write.secondCall).to.have.been.calledWith('test\n');
  });

  it('should log with info formatting', () => {
    const message = 'test';
    const data = undefined;

    log.info(message, data);

    expect(outputStreamStub.write).to.have.been.calledWith('test\n');
  });

  it('should log with result formatting', () => {
    const message = 'test';
    const data = 'test';

    log.result(message, data);

    expect(outputStreamStub.write).to.have.been.calledWith('test\n\n');
    expect(outputStreamStub.write.secondCall).to.have.been.calledWith('\x1B[1mtest\x1B[0m\n\n');
  });

  it('should log with success formatting', () => {
    const message = 'test';
    const data = undefined;

    log.success(message, data);

    expect(outputStreamStub.write).to.have.been.calledWith('\x1B[32m✔ test\x1B[0m\n');
  });
});
