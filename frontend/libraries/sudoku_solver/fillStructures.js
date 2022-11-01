const Cell = require('./cell');
const { switchBetweenBlocksAndRows } = require('./helpers');

const rows = function (board) {
  let rows = [];
  board.forEach((a, y) => {
    let row = [];
    a.forEach((n, x) => {
      const c = new Cell(x, y, n, n);
      if (n > 0) {
        c.valids.add(n);
      }
      row.push(c);
    });
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
  const blocks = switchBetweenBlocksAndRows(rows);
  return blocks;
}

module.exports = {
  rows,
  colls,
  blocks
}