const Sudoku = require('./sudoku');
const { solutionClone } = require('./helpers')

class Solver extends Sudoku {

  solve() {
    this.findFixtures();
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

}

module.exports = Solver