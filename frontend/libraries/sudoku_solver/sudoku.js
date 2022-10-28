const { solutionClone } =  require('./helpers')
const fill = require('./fillStructures');
class Sudoku {
	constructor(board) {
		this._board = board;
		this._rows = fill.rows(this._board);
		this._cols = fill.colls(this._rows);
		this._blocks = fill.blocks(this._rows);
	}
	solve(results = []) {
		const startTime = Date.now();
		return this._solve(0, 0, results, startTime);
	}

	_solve(i, j, results, startTime) {
		if (Date.now() - startTime > 10000) {
			console.log('taking too long');
			return 'oops';
		}
		if (this._reject(this._rows, this._cols, this._blocks)) return;
		if (this._accept(this._rows, this._cols, this._blocks)) {
			results.push(solutionClone(this._blocks));
			return;
		}
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
		let s = valids.shift();
		let result;
		this._rows[i][j].num = s;
		while (s) {
			if (j < 8) {
				result = this._solve(i, j + 1, results, startTime);
			} else {
				result = this._solve(i + 1, 0, results, startTime);
			}
			if (result === 'oops') {
				return 'oops';
			}
			s = valids.shift();
			if (!this._rows[i][j].fixed && s) this._rows[i][j].num = s;
		}
		if (!this._rows[i][j].fixed) this._rows[i][j].num = 0;
	}
	_accept(rows, cols, blocks) {
		if (this._isFinished(rows) && this._isValid(rows, cols, blocks)) {
			return true;
		}
		return false;
	}
	_reject(rows, cols, blocks) {
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
}
module.exports = Sudoku;