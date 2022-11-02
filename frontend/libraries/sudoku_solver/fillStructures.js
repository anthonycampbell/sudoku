const Cell = require('./cell');
const { switchBetweenBlocksAndRows } = require('./helpers');

const rows = function (board) {
  return board.map((a, y) => a.map((n, x) => {
    const c = new Cell(x, y, null, null, n, n);
    n > 0 ? c.valids.add(n) : null;
    return c;
  }));
}

const cols = function (rows) {
  return Object.keys(rows[0]).map(c => rows.map(r => r[c]));
}

const blocks = function (rows) {
  const blocks = switchBetweenBlocksAndRows(rows);
  blocks.forEach((arr, b) => arr.forEach((c, i) => {
    c.block = b;
    c.blockIndex = i;
  }));
  return blocks;
}

module.exports = {
  rows,
  cols,
  blocks
}