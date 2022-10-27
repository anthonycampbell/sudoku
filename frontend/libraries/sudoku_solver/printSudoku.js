const Cell = require('./cell');
const printCellNums = function(m) {
  m.forEach(a => {
    let r = '';
    a.forEach(n => {
      if (n instanceof Cell) {
        r += `${n.num}`
      } else {
        r += `${n}`
      }
    });
    console.log(r);
  });
  console.log('');
}

const printBlocks = function(m) {
  m.forEach((a, i) => {
    let b = '';
    a.forEach((n, i) => {
      if (n instanceof Cell) {
        b += `${n.num}`;
      } else {
        b += `${n}`;
      }
      if (i % 3 === 2){
        console.log(b);
        b = '';
      }
    });
    i % 3 === 2 ? console.log(`-----`) : console.log(``);
  });
  console.log(``);
}
module.exports = {
  printCellNums,
  printBlocks
}