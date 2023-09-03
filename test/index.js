const chai = require('chai');
const sinon = require('sinon');
const chaiSinon = require('chai-sinon');

chai.use(chaiSinon);
const { expect } = chai;

const validate = require('./../src/validate');
const { VALIDATION: { ERROR_MESSAGES } } = require('./../src/constants');

const generatePassword = require('./../src/password-generator');

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
    const result = generatePassword(12);
    expect(result.length).equals(12);
  });
});