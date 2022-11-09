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
    console.log('index:', this.i);
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
    const allPossibilities = new Set([1, 2, 3, 4, 5, 6, 7, 8, 9]);
    const undiscovered = difference(allPossibilities, this.#discoveries);
    const groups = [[], [], []];
    let inALine;
    let onlyLineWithPossibility;
    let answers = [];
    let theGroup;
    this.#cells.forEach((c, i) => groups[Math.floor(i / 3)].push(c));
    undiscovered.forEach(p => {
      inALine = [{ l: false, i: 0 }, { l: false, i: 1 }, { l: false, i: 2 }];
      groups.forEach((g, i) => inALine[i].l = g.some(c => c.valids.has(p)));
      onlyLineWithPossibility = inALine.filter(p => p.l);
      if (onlyLineWithPossibility.length === 1) {
        theGroup = { cell: groups[onlyLineWithPossibility[0].i][0], p };
        answers.push(theGroup);
      }
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