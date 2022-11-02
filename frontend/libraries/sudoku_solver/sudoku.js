const { solutionClone } = require('./helpers')
const Cell = require('./cell');
const fill = require('./fillStructures');

class Sudoku {

	constructor(board) {
		this._board = board;
		this._rows = fill.rows(this._board);
		this._cols = fill.cols(this._rows);
		this._blocks = fill.blocks(this._rows);
		this._initValids(this._rows, this._cols, this._blocks);

		this._sortedRows = fill.rows(this._board);
		this._sortedCols = fill.cols(this._sortedRows);
		this._sortedBlocks = fill.blocks(this._sortedRows);
		this._initValids(this._sortedRows, this._sortedCols, this._sortedBlocks);

		this._sortedCells = this.sortCells(this._sortedRows);
	}

	sortCells(rows) {
		const s = [];
		rows.forEach(r => r.forEach(c => s.push(c)));
		s.sort((a, b) => a.valids.size - b.valids.size);
		return s;
	}

	solve() {
		const startTime = Date.now();
		const results = [];
		this._solve(0, results, startTime);
		return results;
	}

	_solve(i, results, startTime) {
		if (this._reject(this._sortedRows, this._sortedCols, this._sortedBlocks, startTime)) {
			return;
		}
		if (this._accept(this._sortedRows, this._sortedCols, this._sortedBlocks)) {
			results.push(solutionClone(this._sortedBlocks));
			return;
		}
		const cell = this._sortedCells[i];
		const valids = cell.valids.values();
		let s = valids.next().value;
		!cell.fixed ? s ? cell.num = s : cell.num = 0 : null;
		while (s) {
			this._solve(i + 1, results, startTime);
			s = valids.next().value;
			!cell.fixed ? s ? cell.num = s : cell.num = 0 : null;
		}
	}

	_trimValids(x, y, b, num) {
		this._removeFromAffectedAreas(this._sortedRows, x, num);
		this._removeFromAffectedAreas(this._sortedCols, y, num);
		this._removeFromAffectedAreas(this._sortedBlocks, b, num);
		this._sortedRows[y][x].valids.add(num);
	}

	_expandValids(x, y, b, num) {
		this._addToAffectedAreas(this._sortedRows, x, num);
		this._addToAffectedAreas(this._sortedCols, y, num);
		this._addToAffectedAreas(this._sortedBlocks, b, num);
	}

	_addToAffectedAreas(a, x, num) {
		for (let i = 0; i < 9; i++) {
			if (!a[x][i].fixed) {
				a[x][i].valids.add(num);
			}
		}
	}

	_removeFromAffectedAreas(a, x, num) {
		for (let i = 0; i < 9; i++) {
			if (!a[x][i].fixed) {
				a[x][i].valids.delete(num);
			}
		}
	}

	_initValids(rows, cols, blocks) {
		rows.forEach(r => r.forEach(c => {
			if (!c.fixed) {
				for (let i = 1; i <= 9; i++) {
					c.num = i;
					if (this._isValid(rows, cols, blocks)) {
						c.valids.add(i);
					}
				}
				c.num = 0;
			}
		}));
	}

	_accept(rows, cols, blocks) {
		return this._isFinished(rows) && this._isValid(rows, cols, blocks);
	}

	_reject(rows, cols, blocks, startTime) {
		return !this._isValid(rows, cols, blocks) || Date.now() - startTime > 10000;
	}

	_isFinished(rows) {
		return rows.every(r => r.every(c => 1 <= c.num && c.num <= 9));
	}

	_isValid(rows, cols, blocks) {
		return this._checkSet(rows) && this._checkSet(cols) && this._checkSet(blocks);
	}

	_checkSet(a) {
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
			a.forEach(n => {
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
		this._blocks.forEach((a, i) => {
			let b = '';
			a.forEach((n, i) => {
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