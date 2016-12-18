const should = require('should');

const Calculator = require('../');

describe('Calculator', () => {

  describe('constructor', () => {
    it('should exist', () => {
      should(Calculator).exist;
    });

    it('should instantiate without any errors', () => {
      const createInstance = () => {
        new Calculator('5432.00, 1 person, drugs')
      }

      createInstance.should.not.throw;
    });
  });

  describe('flat markup', () => {
    it('should add a flat markup for all jobs (5%)', () => {
      const input = '5432.00, 1 person, drugs';
      let instance = new Calculator(input);
      instance.finally();
      instance.flatMarkup.should.equal(271.60);
    });
  });

  describe('person cost', () => {
    it('should add a 1.2% markup for each person', () => {
      const input = '5432.00, 1 person, drugs';
      let instance = new Calculator(input);
      instance.finally();
      instance.personMarkup.should.equal(3.26);
    });
  });

  describe('calculate', () => {
    it('should add a 7.5% markup for pharmaceuticals', () => {
      const input = '5432.00, 1 person, drugs';
      let instance = new Calculator(input)
      instance.finally().should.equal(6199.81);
    });

    it('should add a 13% markup for food', () => {
      const input = '1299.99, 3 person, food';
      let instance = new Calculator(input);
      instance.finally().should.equal(1591.58);
    });

    it('shouldn\'t add any markup for everything else', () => {
      const input = '12456.95, 4 people, books';
      let instance = new Calculator(input);
      instance.finally().should.equal(13707.63);
    });
  });

});
