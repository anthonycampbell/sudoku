const { difference, switchBetweenBlocksAndRows, transpose } = require('./helpers');
const Cell = require('./cell');
const Chunk = require('./chunk');

class Sudoku {

	constructor(board) {
		this._board = board.map((rows, y) => rows.map((n, x) => new Cell(x, y, null, null, n, n)));
		this._sortedRows = this._board.map((a, i) => new Chunk(a, i));
		const cols = transpose(this._board);
		this._sortedCols = cols.map((a, i) => new Chunk(a, i));
		const blocks = switchBetweenBlocksAndRows(this._board);
		this._sortedBlocks = blocks.map((a, i) => new Chunk(a, i));
		this._sortedBlocks.forEach(chunk => chunk.setBlockIndeces());
		this._initValids();
		this._sortedCells = this.sortCells(this._sortedRows);
	}

	_initValids() {
		this._board.forEach(r => r.forEach(cell => {
			const row = this._sortedRows[cell.y];
			const col = this._sortedCols[cell.x];
			const block = this._sortedBlocks[cell.block];
			for (let i = 1; i <= 9; i++) {
				if (!row.has(i) && !col.has(i) && !block.has(i) && !cell.fixed) {
					cell.valids.add(i);
				}
			}
		}));
	}

	sortCells(rows) {
		const s = [];
		rows.forEach(r => r.forEach(c => s.push(c)));
		s.sort((a, b) => a.valids.size - b.valids.size);
		return s;
	}

	findFixtures() {
		let numberOfFixedCells = this._sortedCells.reduce((prev, cur) => cur.fixed ? prev + 1 : prev, 0);
		let newNumberOfFixedCells = 0;
		while (numberOfFixedCells - newNumberOfFixedCells !== 0) {
			numberOfFixedCells = this._sortedCells.reduce((prev, cur) => cur.fixed ? prev + 1 : prev, 0);
			this._sortedCells.forEach(c => {
				if (c.valids.size === 1 && !c.fixed) {
					c.num = c.valids.values().next().value;
					this._trimValids(this._removeFromAffectedAreas, c);
					c.fixed = true;
				}
			});
			this._sortedCells.forEach(c => {
				this._trimValids(this._findTwoCellsWithSameTwoValsInSection, c);
			});
			this._sortedCells.forEach(c => {
				this._trimValids(this._findOnlyOneInSection, c);
			});
			newNumberOfFixedCells = this._sortedCells.reduce((prev, cur) => cur.fixed ? prev + 1 : prev, 0);
		}

	}

	_trimValids(fn, cell) {
		const num = cell.num;
		fn(this._sortedRows, cell.y, cell.x, num);
		fn(this._sortedCols, cell.x, cell.y, num);
		fn(this._sortedBlocks, cell.block, cell.blockIndex, num);
	}

	_findOnlyOneInSection(a, c, p, num) {
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

	_findTwoCellsWithSameTwoValsInSection(a, c, p, num) {
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

	_removeFromAffectedAreas(a, c, p, num) {
		a.forEach((cell, i) => {
			if (!a[c][i].fixed && i !== p && a[c][i].valids.has(num)) {
				a[c][i].valids.delete(num);
				a[c][i].removedValids.push(num);
			}
		});
	}



	_isFinished(rows) {
		return rows.every(r => r.every(c => 1 <= c.num && c.num <= 9));
	}

	_isValid(rows, cols, blocks) {
		return this._checkSection(rows) && this._checkSection(cols) && this._checkSection(blocks);
	}

	_checkSection(a) {
		for (let i = 0; i < a.length; i++) {
			let sorted = a[i].slice().sort((a, b) => a.num - b.num);
			for (let i = 0; i < sorted.length - 1; i++) {
				if (sorted[i].num === sorted[i + 1].num && sorted[i].num !== 0) {
					return false;
				}
			}
		}
		return true;
	}

	printRows(rows) {
		rows.forEach(a => {
			let r = '';
			a.cells.forEach(n => {
				if (n instanceof Cell) {
					r += `${n.num}`
				} else {
					r += `${n}`
				}
			});
			console.log(r);
		});
		console.log('');
	}

	printBlocks() {
		this._sortedBlocks.forEach((a, i) => {
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
			i % 3 === 2 ? console.log(`-----`) : console.log(``);
		});
		console.log(``);
	}
}

module.exports = Sudoku;