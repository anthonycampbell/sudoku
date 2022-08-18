const Sudoku = require('./sudoku');
const printCellNums = require('./printSudoku').printCellNums;
let args = process.argv.slice(2);
/*const main = function(args) {
  let b = [];
  let r;
  let k = 0
  let entry = args.shift();
  for (let i = 0; i < 9; i++) {
    r = [];
    for (let j = 0; j < 9; j++) {
      if (entry && i === Number(entry[0]) && j === Number(entry[1])){
        r.push(Number(entry[2]));
        entry = args.shift();
      } else {
        r.push(0);
      }
      k++;
    }
    b.push(r);
  }
  printCellNums(b);
  let sudoku = new Sudoku(b);
  sudoku.solve(0, 0);
}*/
const main = function(args) {
  let b = [];
  let r;
  let k = 0
  for (let i = 0; i < 9; i++) {
    r = [];
    for (let j = 0; j < 9; j++) {
      r.push(Number(args[k]));
      k++;
    }
    b.push(r);
  }
  printCellNums(b);
  let sudoku = new Sudoku(b);
  sudoku.solve(0, 0);
}
main(args);