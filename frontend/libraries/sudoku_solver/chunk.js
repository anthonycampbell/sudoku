const { difference } = require('./helpers');
const Cell = require('./cell');

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

  get discoveries() {
    return this.#discoveries;
  }

  get cells() {
    return this.#cells;
  }


  has(item) {
    return this.#discoveries.has(item);
  }

  setBlockIndeces() {
    this.#cells.forEach((cell, i) => {
      cell.block = this.i;
      cell.blockIndex = i;
    })
  }

  trimOtherCellsValids(cell) {
    this.#discoveries.add(cell.num);
    this.#cells.forEach(c => {
      if (!c.fixed && c.valids.has(cell.num)) {
        c.valids.delete(cell.num);
        c.removedValids.push(cell.num);
      }
    });
  }

  findCellsWithOnlyValidInChunk() {
    return this.#cells.filter(c => {
      let set = new Set(c.valids);
      const otherCells = this.#cells.filter(o => !o.equals(c));
      otherCells.forEach(o => set = difference(set, o.valids));
      if (set.size === 1 && !c.fixed) {
        c.valids.forEach(v => {
          if (v !== set.values().next().value) {
            c.valids.delete(v);
            c.removedValids.push(v);
          }
        });
      };
      return set.size === 1 && !c.fixed;
    });
  }

  findTwoCellsWithSameTwoValids(cell) {
    let set = new Set(cell.valids);
    this.#cells.forEach(c => {
      if (!c.equals(cell) && set.size === 2 && c.valids.size === 2) {
        if ([...set].every(v => c.valids.has(v))) {
          this.#cells.forEach(oc => {
            if (!oc.fixed && !oc.equals(c) && !oc.equals(cell)) {
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

  printCells() {
    let r = '';
    this.#cells.forEach(n => {
      if (n instanceof Cell) {
        r += `${n.num}`
      } else {
        r += `${n}`
      }
    });
    console.log(r);
  }

  printCellsAsBlocks() {
    let b = '';
    a.cells.forEach((n, i) => {
      if (n instanceof Cell) {
        b += `${n.num}`;
      } else {
        b += `${n}`;
      }
      if (i % 3 === 2) {
        console.log(b);
        b = '';
      }
    });
  }

  print() {
    this.#cells.forEach(c => console.log(c));
  }
}

module.exports = Chunk;