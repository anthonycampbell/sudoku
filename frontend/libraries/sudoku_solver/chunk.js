const Cell = require('./cell');

class Chunk {
  #cells = [];
  #discoveries = new Set([]);
  constructor(arr, index) {
    this.#cells = arr.map(cell => {
      cell.num > 0 ? this.#discoveries.add(cell.num) : null;
      return cell;
    });
    this.i = index;
  }

  setBlockIndeces() {
    this.#cells.forEach((cell, i) => {
      cell.block = this.i;
      cell.blockIndex = i;
    })
  }

  get discoveries() {
    return this.#discoveries;
  }

  get cells() {
    return this.#cells;
  }

  has(item) {
    return this.#discoveries.has(item);
  }

  setCell(cell, num) {
    cell.num = num;
  }

  trimOtherCellsValids(a, c, p, num) {
    a.forEach((cell, i) => {
      if (!a[c][i].fixed && i !== p && a[c][i].valids.has(num)) {
        a[c][i].valids.delete(num);
        a[c][i].removedValids.push(num);
      }
    });
  }

  initializeCellValids() {
    r.forEach(c => {
      if (!c.fixed) {
        for (let i = 1; i <= 9; i++) {
          c.num = i;
          if (this._isValid(rows, cols, blocks)) {
            c.valids.add(i);
          }
        }
        c.num = 0;
      }
    })
  }

  findTwoCellsWithSameTwoValids() {
    let set = new Set(a[c][p].valids);
    a.forEach((cell, i) => {
      if (i !== p && set.size === 2 && a[c][i].valids.size === 2) {
        if ([...set].every(v => a[c][i].valids.has(v))) {
          a.forEach((cell, j) => {
            if (!a[c][j].fixed && j !== p && j !== i) {
              set.forEach(v => {
                if (a[c][j].valids.has(v)) {
                  a[c][j].valids.delete(v);
                  a[c][j].removedValids.push(v);
                }
              });
            }
          });
        }
      }
    });
  }

  findSingleValidInSingleCell() {
    let set = new Set(a[c][p].valids);
    a.forEach((cell, i) => {
      if (i !== p) {
        set = difference(set, a[c][i].valids);
      }
    });
    if (set.size === 1) {
      a[c][p].valids = set;
    }
  }

}

module.exports = Chunk;