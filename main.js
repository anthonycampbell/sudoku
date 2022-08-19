const Sudoku = require('./sudoku');
const printCellNums = require('./printSudoku').printCellNums;
const fs = require('fs');

fs.readFile('./input.txt', 'utf8',  function(e, cells){
  const rows = cells.split('\n');
  const b = [];
  let r = [];
  for (const row of rows){
    for (const cell of row){  
      r.push(Number(cell));
    }
    b.push(r);
    r = [];
  }
  printCellNums(b);
  let sudoku = new Sudoku(b);
  sudoku.solve(0, 0);
});