class Cell {

  constructor(n, f) {
    this.val = n;
    if (f) {
      this.fixed = true;
    } else {
      this.fixed = false;
    }
  }

  get num() {
    return this.val;
  }

  set num(n) {
    this.val = n;
  }

  inc() {
    this.num += 1;
  }
}

module.exports = Cell;