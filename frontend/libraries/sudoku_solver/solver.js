const Sudoku = require('./sudoku');
const { solutionClone } = require('./helpers')

class Solver extends Sudoku {

  solve() {
    this.findFixtures();
    this._sortedCells = this.sortCells(this._sortedRows);
    const startTime = Date.now();
    const results = [];
    this._solve(0, results, startTime);
    return results;
  }

  _solve(i, results, startTime) {
    if (this._reject(this._sortedRows, this._sortedCols, this._sortedBlocks, startTime)) {
      return;
    }
    if (this._accept(this._sortedRows, this._sortedCols, this._sortedBlocks)) {
      results.push(solutionClone(this._sortedBlocks));
      return;
    }
    const cell = this._sortedCells[i];
    const valids = cell.valids.values();
    let s = valids.next().value;
    !cell.fixed ? s ? cell.num = s : cell.num = 0 : null;
    while (s) {
      this._solve(i + 1, results, startTime);
      s = valids.next().value;
      !cell.fixed ? s ? cell.num = s : cell.num = 0 : null;
    }
  }

  _accept(rows, cols, blocks) {
    return this._isFinished(rows) && this._isValid(rows, cols, blocks);
  }

  _reject(rows, cols, blocks, startTime) {
    return !this._isValid(rows, cols, blocks) || Date.now() - startTime > 10000;
  }

  _isFinished(rows) {
    return rows.every(r => r.every(c => 1 <= c.num && c.num <= 9));
  }

  _isValid(rows, cols, blocks) {
    return this._checkSet(rows) && this._checkSet(cols) && this._checkSet(blocks);
  }

  _checkSet(a) {
    for (let i = 0; i < a.length; i++) {
      let sorted = a[i].slice().sort((a, b) => a.num - b.num);
      for (let i = 0; i < sorted.length - 1; i++) {
        if (sorted[i].num === sorted[i + 1].num && sorted[i].num !== 0) {
          return false;
        }
      }
    }
    return true;
  }
}

module.exports = Solver