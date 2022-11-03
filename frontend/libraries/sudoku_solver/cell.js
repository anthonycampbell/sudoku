class Cell {

  constructor(x, y, b, bi, n, f) {
    this.val = n;
    this.possibilities = new Set([]);
    this.removedPossibilities = [];
    this.x = x;
    this.y = y;
    this.b = b;
    this.bi = bi;
    f ? this.fixed = true : this.fixed = false;
  }

  get num() {
    return this.val;
  }

  set num(n) {
    this.val = n;
  }

  get valids() {
    return this.possibilities;
  }

  set valids(s) {
    this.possibilities = s;
  }

  get block() {
    return this.b;
  }

  set block(b) {
    this.b = b;
  }

  get blockIndex() {
    return this.bi;
  }

  set blockIndex(i) {
    this.bi = i;
  }

  get removedValids() {
    return this.removedPossibilities;
  }

}

module.exports = Cell;