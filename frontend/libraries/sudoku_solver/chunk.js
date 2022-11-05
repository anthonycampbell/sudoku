const { difference } = require('./helpers');

class Chunk {
  #cells = [];
  #discoveries = new Set([]);
  constructor(arr, index) {
    this.#cells = arr.map(cell => {
      if (this.#discoveries.has(cell.num)) {
        console.log('oops this sudoku is invalid');
      }
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

  has(item) {
    return this.#discoveries.has(item);
  }

  get discoveries() {
    return this.#discoveries;
  }

  get cells() {
    return this.#cells;
  }

  setCell(cell, num) {
    cell.num = num;
  }

  trimOtherCellsValids(cell) {
    this.#cells.forEach(c => {
      if (!c.fixed && c.valids.has(cell.num)) {
        c.valids.delete(cell.num);
        c.removedValids.push(cell.num);
      }
    });
  }

  findTwoCellsWithSameTwoValids(cell) {
    let set = new Set(cell.valids);
    this.#cells.forEach((c, i) => {
      if (c.x !== cell.x && c.y !== cell.y && set.size === 2 && c.valids.size === 2) {
        if ([...set].every(v => c.valids.has(v))) {
          this.#cells.forEach(oc => {
            if (!oc.fixed && oc.x !== c.x && oc.y !== c.y && oc.x !== cell.x && oc.y !== cell.y) {
              set.forEach(v => {
                if (oc.valids.has(v)) {
                  oc.valids.delete(v);
                  oc.removedValids.push(v);
                }
              });
            }
          });
        }
      }
    });
  }

  findSingleValidInSingleCell(cell) {
    let set = new Set(cell.valids);
    this.#cells.forEach((c, i) => {
      if (c.x !== cell.x && c.y !== cell.y) {
        set = difference(set, c.valids);
      }
    });
    if (set.size === 1) {
      cell.valids = set;
    }
  }

  print() {
    this.#cells.forEach(c => console.log(c));
  }
}

module.exports = Chunk;