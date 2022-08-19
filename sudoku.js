const { printCellNums, printBlocks } = require('./printSudoku');
const fill = require('./fillStructures');
class Sudoku {
	constructor(board) {
		this._board = board;
		this._rows = fill.rows(this._board);
		this._cols = fill.colls(this._rows);
		this._blocks = fill.blocks(this._cols);
	}
	solve(i, j) {
		if (this._reject(this._rows, this._cols, this._blocks)) return;
		if (this._accept(this._rows, this._cols, this._blocks)) return;
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
			if (j < 8){
				result = this.solve(i, j+1);
			} else {
				result = this.solve(i+1, 0);
			}
			s = valids.shift();
			if (!this._rows[i][j].fixed && s) this._rows[i][j].num = s;
		}
		if (!this._rows[i][j].fixed) this._rows[i][j].num = 0;
	}
	_accept(rows, cols, blocks) {
		if( this._isFinished(rows) && this._isValid(rows, cols, blocks)){
			console.log('======ACCEPTED======');
			printCellNums(this._rows);
			return true;
		}
		return false;
	}
	_reject(rows, cols, blocks){
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