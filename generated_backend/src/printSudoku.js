const Cell = require('./cell');
const printCellNums = function(m) {
  m.forEach(a => {
    a.forEach(n => {
      if (n instanceof Cell) {
        process.stdout.write(`${n.num} `);
      } else {
        process.stdout.write(`${n} `);
      }
    });
    process.stdout.write(`\n`);
  });
  process.stdout.write(`\n`);
}

const printBlocks = function(m) {
  m.forEach((a, i) => {
    a.forEach((n, i) => {
      process.stdout.write(`${n.num} `);
      i % 3 === 2 ? process.stdout.write(`\n`) : null;
    });
    i % 3 === 2 ? process.stdout.write(`-----\n`) : process.stdout.write(`\n`);
  });
  process.stdout.write(`\n`);
}
module.exports = {
  printCellNums,
  printBlocks
}