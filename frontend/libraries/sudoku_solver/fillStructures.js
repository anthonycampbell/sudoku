const Cell = require('./cell');
const rows = function (board) {
  let rows = [];
  board.forEach(a => {
    let row = [];
    a.forEach(n => row.push(new Cell(n, n)));
    rows.push(row);
  });
  return rows;
}
const colls = function (rows) {
  let cols = [];
  for (let i = 0; i < rows.length; i++) {
    let col = [];
    for (let j = 0; j < rows.length; j++) {
      let c = rows[j][i]
      col.push(c);
    }
    cols.push(col);
  }
  return cols;
}
const blocks = function (rows) {
  let blocks = [];
  for (let i = 0; i <= 6; i += 3) {
    for (let k = 0; k <= 6; k += 3) {
      let block = [];
      for (let j = 0; j < 3; j++) {
        block.push(rows[i][j + k]);
      }
      for (let j = 0; j < 3; j++) {
        block.push(rows[i + 1][j + k]);
      }
      for (let j = 0; j < 3; j++) {
        block.push(rows[i + 2][j + k]);
      }
      blocks.push(block);
    }
  }
  return blocks;
}

module.exports = {
  rows,
  colls,
  blocks
}