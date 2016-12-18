class PriceCalculator {
  /**
   * @constructor
   * @param  {String} input
   */
  constructor(input) {
    this.initialize_(input);
    this.flatMarkup = 0;
  }

  /**
   * Initializes the calculator.
   * @param  {String} input
   */
  initialize_(input) {
    input = input.split(',').map((item) => item.trim());
    if (input.length != 3)
      throw new Error('Missing inputs.');

    this.fee = parseFloat(input[0], 10);
    this.people = parseInt(input[1].split(' ')[0], 10);
    this.type = input[2];
  }

  /**
   * Returns the response
   * @return {float} Result of the current transaction.
   */
  finally() {
    this.calculateFlat_();
    this.calculatePerson_();
    this.calculateType_();
    return parseFloat((this.flatMarkup + this.personMarkup + this.typeMarkup).toFixed(2), 10);
  }


  /**
   * Calculates the flat markup.
   * @private
   * @return {float}
   */
  calculateFlat_() {
    this.flatMarkup = parseFloat((this.fee * 1.05).toFixed(2), 10);
  }

  /**
   * Calculates the markup per people.
   * @private
   * @return {float}
   */
  calculatePerson_() {
    if (this.flatMarkup == 0)
      throw new Error('Flat markup shouldn\'t be 0.');
    else if (this.people < 0)
      throw new Error('Person count shouldn\'t be lower than 0.');

    this.personMarkup = parseFloat((this.flatMarkup * 0.012 * this.people).toFixed(2), 10);
  }

  /**
   * Calculates the markup based on type.
   * @private
   * @return {float}
   */
  calculateType_() {
    if (this.flatMarkup == 0)
      throw new Error('Flat markup shouldn\'t be 0.');

    switch (this.type) {
      case 'drugs':
      case 'pharmaceutical':
        this.typeMarkup = this.flatMarkup * 0.075;
        break;
      case 'food':
        this.typeMarkup = this.flatMarkup * 0.13;
        break;
      case 'electronics':
        this.typeMarkup = this.flatMarkup * 0.02;
        break;
      default:
        this.typeMarkup = 0;
        break;
    }

    this.typeMarkup = parseFloat((this.typeMarkup).toFixed(2), 10);
  }
}

module.exports = PriceCalculator;