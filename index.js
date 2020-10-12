const readline = require('readline');
const logic = require('./logic');

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

let countLine = 0;
let cycles = 0;
const results = [];

console.log('Entry');
try {
  rl.on('line', (line) => {
    countLine++;
    if (countLine === 1) {
      cycles = Number(line.split(' ')[0]);
      if (isNaN(cycles)) throw new Error('First entry must be a number');
      if (cycles < countLine) rl.close();
    } else if (countLine < cycles + 1) {
      results.push(logic(line));
    } else {
      results.push(logic(line));
      console.log('\nOutput');
      for (const result of results) {
        console.log(result.pop().parseDirection());
      }
      rl.close();
    }
  }); 
} catch (error) {
  console.error(error.message, error.stack);
}
