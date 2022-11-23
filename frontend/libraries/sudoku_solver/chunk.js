const { difference, intersection } = require('./helpers');
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

  setTBlockIndeces() {
    this.#cells.forEach((cell, i) => {
      cell.tBlock = this.i;
      cell.tBlockIndex = i;
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

  findAndManageHiddenValues() {
    const possibleHiddenPairs = [];
    this.#cells.forEach(c1 => {
      this.#cells.forEach(c2 => {
        if (!c1.equals(c2)) {
          possibleHiddenPairs.push({ int: intersection(c1.valids, c2.valids), c1, c2 });
        }
      })
    });
    possibleHiddenPairs.forEach(o => {
      const otherCells = this.#cells.filter(c => !c.equals(o.c1) && !c.equals(o.c2));
      otherCells.forEach(c => o.int = difference(o.int, c.valids));
      if (o.int.size === 2) {
        o.c1.valids = o.int;
        o.c2.valids = o.int;
      }
    });
  }

  findOnlyLineOfValids() {
    const groups = [[], [], []];
    let answers = {};
    this.#cells.forEach((c, i) => groups[Math.floor(i / 3)].push(c));
    groups.forEach((g, i) => {
      g.forEach(c => {
        if (c.valids.size > 1){
          c.valids.forEach(v => {
            let onlyLinewithP = true;
            groups.forEach((g1, j) => {
              if (i !== j) {
                g1.forEach(c1 => {
                  if (c1.valids.has(v)){
                    onlyLinewithP = false;
                  }
                });
              }
            });
            if (onlyLinewithP && !answers[c.block + ',' + v]) {
              answers[c.block + ',' + v] = {cell: c, value: v}
            }
          });
        }
      });
    });
    return answers;
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
    this.#cells.forEach((n, i) => {
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