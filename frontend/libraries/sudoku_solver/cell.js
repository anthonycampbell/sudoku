class Cell {

  constructor(x, y, b, n, f) {
    this.val = n;
    this.possibilities = new Set([]);
    this.x = x;
    this.y = y;
    this.b = b;
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

  get block() {
    return this.b;
  }

  set block(b) {
    this.b = b;
  }

}

module.exports = Cell;