const { switchBetweenBlocksAndRows, transpose } = require('./helpers');
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
		this._sortedCells = this.sortCells(this._board);
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
		while (this.foundAndSetSingleValid()) {
			this.findTwoCellsWithSameTwoValids();
			this.findOnlyValidInChunk();
		}
	}

	foundAndSetSingleValid() {
		let found = false;
		this._sortedCells.forEach(c => {
			if (c.valids.size === 1 && !c.fixed) {
				found = true;
				c.num = c.valids.values().next().value;
				c.fixed = true;
				this._sortedRows[c.y].trimOtherCellsValids(c);
				this._sortedCols[c.x].trimOtherCellsValids(c);
				this._sortedBlocks[c.block].trimOtherCellsValids(c);
			}
		});
		return found;
	}

	findTwoCellsWithSameTwoValids() {
		this._sortedCells.forEach(c => {
			this._sortedRows[c.y].findTwoCellsWithSameTwoValids(c);
			this._sortedCols[c.x].findTwoCellsWithSameTwoValids(c);
			this._sortedBlocks[c.block].findTwoCellsWithSameTwoValids(c);
		});
	}

	findOnlyValidInChunk() {
		this._sortedCells.forEach(c => {
			this._sortedRows[c.y].findSingleValidInSingleCell(c);
			this._sortedCols[c.x].findSingleValidInSingleCell(c);
			this._sortedBlocks[c.block].findSingleValidInSingleCell(c);
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