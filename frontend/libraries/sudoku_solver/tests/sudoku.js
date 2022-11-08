const Sudoku = require('../sudoku');
const { switchBetweenBlocksAndRows } = require('../helpers');
const inputBlocks =
  [
    [null, null, null, null, null, 1, 5, 4, null],
    [null, null, null, null, null, 7, null, null, null],
    [3, null, null, null, null, 6, null, null, 8],
    [null, null, null, null, 6, null, null, null, 8],
    [7, null, 8, null, null, 9, null, null, null],
    [null, 2, null, null, 5, null, null, 4, null],
    [null, null, null, 1, 5, null, 2, null, null],
    [null, null, null, 3, null, null, null, 1, null],
    [null, 8, null, null, null, null, null, null, 7]
  ];
const inputRows = switchBetweenBlocksAndRows(inputBlocks);
const sudoku = new Sudoku(inputRows);
const discoveries = sudoku.cellsWithOnlyOneValid();
const d = discoveries[0]
console.log(discoveries.length === 1, d.x === 7, d.y === 1);
sudoku.setCells(discoveries);
const setD = sudoku._board[d.y][d.x];
console.log(setD.num === 9, setD.fixed === true);
sudoku.trimAffectedChunksValids(discoveries);
console.log(
  sudoku._sortedRows[setD.y].has(9),
  sudoku._sortedCols[setD.x].has(9),
  sudoku._sortedBlocks[setD.block].has(9));
//3 5 8 8
console.log(sudoku.findOnlyValidsInChunks(sudoku._sortedRows));