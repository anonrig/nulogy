process.argv.shift()
process.argv.shift()

const input = process.argv.join(' ');
const Calculator = require('./index');
const instance = new Calculator(input);
console.info('Input: ' + input);
console.info('Output: ' + instance.finally())
