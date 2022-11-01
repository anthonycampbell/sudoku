class Cell {

  constructor(x, y, n, f) {
    this.val = n;
    this.possibilities = new Set([]);
    this.x = x;
    this.y = y;
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

}

module.exports = Cell;