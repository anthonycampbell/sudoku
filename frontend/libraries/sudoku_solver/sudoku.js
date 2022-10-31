const { solutionClone } = require('./helpers')
const Cell = require('./cell');
const fill = require('./fillStructures');

class Sudoku {

	constructor(board) {
		this._board = board;
		this._rows = fill.rows(this._board);
		this._cols = fill.colls(this._rows);
		this._blocks = fill.blocks(this._rows);
	}

	solve() {
		const startTime = Date.now();
		const results = [];
		this._solve(0, 0, results, startTime);
		return results;
	}

	_solve(i, j, results, startTime) {
		if (this._reject(this._rows, this._cols, this._blocks, startTime)) {
			return;
		}
		if (this._accept(this._rows, this._cols, this._blocks)) {
			results.push(solutionClone(this._blocks));
			return;
		}
		const valids = this._start(i, j);
		let s = valids.shift();
		let result;
		this._rows[i][j].num = s;
		while (s) {
			const { nextI, nextJ } = this._nextCell(i, j);
			result = this._solve(nextI, nextJ, results, startTime);
			s = valids.shift();
			if (!this._rows[i][j].fixed && s) {
				this._rows[i][j].num = s;
			}
		}
		if (!this._rows[i][j].fixed) {
			this._rows[i][j].num = 0;
		}
	}

	_nextCell(i, j) {
		if (j < 8) {
			return { nextI: i, nextJ: j + 1 };
		}
		return { nextI: i + 1, nextJ: 0 };
	}
	
	_start(i, j) {
		let valids = [];
		if (!this._rows[i][j].fixed) {
			for (let ii = 1; ii <= 9; ii++) {
				this._rows[i][j].num = ii;
				if (this._isValid(this._rows, this._cols, this._blocks)) {
					valids.push(ii);
				}
			}
		} else {
			valids.push(this._rows[i][j].num);
		}
		return valids;
	}

	_accept(rows, cols, blocks) {
		if (this._isFinished(rows) && this._isValid(rows, cols, blocks)) {
			return true;
		}
		return false;
	}

	_reject(rows, cols, blocks, startTime) {
		if (Date.now() - startTime > 10000) {
			return true;
		}
		if (!this._isValid(rows, cols, blocks)) {
			console.log('dead');
			return true;
		}
		return false;
	}

	_isFinished(rows) {
		for (let i = 0; i < rows.length; i++) {
			for (let j = 0; j < rows[i].length; j++) {
				if (rows[i][j].num < 1 || rows[i][j].num > 9) {
					return false;
				}
			}
		}
		return true;
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

	printRows() {
		this._rows.forEach(a => {
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