const chai = require('chai');
const sinon = require('sinon');
const chaiSinon = require('chai-sinon');

const validate = require('./../src/validate');
const generatePassword = require('./../src/password-generator');
const getRandomCharacter = require('./../src/utils/random-character');
const copyToClipboard = require('./../src/copy-clipboard');
const child_process = require('child_process');

const { VALIDATION: { ERROR_MESSAGES }, CHARACTER_TYPES } = require('./../src/constants');

chai.use(chaiSinon);
const { expect } = chai;

describe('Validate', () => {
  let consoleLogStub;

  beforeEach(() => {
     consoleLogStub = sinon.stub(console, 'log');
  });

  afterEach(() => {
    consoleLogStub.restore();
  });

  it('should return false if not a number and print out not a number message', () => {
    const args = [ , , 'string'];

    const result = validate(args)

    expect(consoleLogStub).to.have.been.calledWith(ERROR_MESSAGES.NOT_A_NUMBER);
    expect(result).equals(false);
  });

  it('should return false if less than min length and print out min length message', () => {
    const args = [ , , 3];

    const result = validate(args)

    expect(consoleLogStub).to.have.been.calledWith(ERROR_MESSAGES.MIN);
    expect(result).equals(false);
  });

  it('should return false if more than max length and print out max length message', () => {
    const args = [ , , 25];

    const result = validate(args)

    expect(consoleLogStub).to.have.been.calledWith(ERROR_MESSAGES.MAX);
    expect(result).equals(false);
  });

  it('should return valid length and not print any message', () => {
    const args = [ , , 12];

    const result = validate(args)

    expect(consoleLogStub.callCount).equals(0);
    expect(result).equals(12);
  });

  it('should return default length if requested length is undefined and not print any message', () => {
    const args = [ , , undefined];

    const result = validate(args)

    expect(consoleLogStub.callCount).equals(0);
    expect(result).equals(12);
  });
});

describe('Password Generator', () => {
  it('should return a password with the requested length', () => {
    const result = generatePassword(10);
    expect(result.length).equals(10);
  });

  it('should contain a mixture of uppercase letters, lowercase letters, numbers, and symbols', () => {
    const result = generatePassword(12);

    expect(result).to.match(/[a-z]/);
    expect(result).to.match(/[A-Z]/);
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

      expect(isNaN(result)).equals(false);
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
    execStub = sinon.stub(child_process, 'exec');

    stderrOnStub = sinon.stub();
    exitOnStub = sinon.stub();
  });

  afterEach(() => {
    execStub.restore();
  });

  it('should return a correct command for Windows platform', () => {
    const platform = 'win32';
    const password = 'randompassword'

    execStub.returns({
      stderr: { on: stderrOnStub },
      on: exitOnStub,
    });

    copyToClipboard(password, platform);

    expect(execStub).to.have.been.calledWith('printf "randompassword" | clip');
  });

  it('should return a correct command for Linux platform', () => {
    const platform = 'linux';
    const password = 'randompassword'

    execStub.returns({
      stderr: { on: stderrOnStub },
      on: exitOnStub,
    });

    copyToClipboard(password, platform);

    expect(execStub).to.have.been.calledWith('printf "randompassword" | pbcopy');
  });

  it('should return a correct command for macOS platform', () => {
    const platform = 'darwin';
    const password = 'randompassword'

    execStub.returns({
      stderr: { on: stderrOnStub },
      on: exitOnStub,
    });

    copyToClipboard(password, platform);

    expect(execStub).to.have.been.calledWith('printf "randompassword" | pbcopy');
  });

  it('should escape $ when calling copy command', () => {
    const platform = 'darwin';
    const password = '$$$$$$$$$$$$'

    execStub.returns({
      stderr: { on: stderrOnStub },
      on: exitOnStub,
    });

    copyToClipboard(password, platform);

    expect(execStub).to.have.been.calledWith('printf "\\$\\$\\$\\$\\$\\$\\$\\$\\$\\$\\$\\$" | pbcopy');
  });

  it('should escape " when calling copy command', () => {
    const platform = 'darwin';
    const password = '""""""""""""'

    execStub.returns({
      stderr: { on: stderrOnStub },
      on: exitOnStub,
    });

    copyToClipboard(password, platform);

    expect(execStub).to.have.been.calledWith('printf "\\"\\"\\"\\"\\"\\"\\"\\"\\"\\"\\"\\"" | pbcopy');
  });

  it('should escape % when calling copy command', () => {
    const platform = 'darwin';
    const password = '%%%%%%%%%%%%'

    execStub.returns({
      stderr: { on: stderrOnStub },
      on: exitOnStub,
    });

    copyToClipboard(password, platform);

    expect(execStub).to.have.been.calledWith('printf "%%%%%%%%%%%%%%%%%%%%%%%%" | pbcopy');
  });
});
