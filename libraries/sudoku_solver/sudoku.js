const { switchBetweenBlocksAndRows, transpose } = require('./helpers');
const Cell = require('./cell');
const Chunk = require('./chunk');

class Sudoku {

	constructor(board) {
		this._board = board.map((rows, y) => rows.map((n, x) => new Cell(x, y, null, null, n, n)));
		this._rows = this._board.map((a, i) => new Chunk(a, i));
		const cols = transpose(this._board);
		this._cols = cols.map((a, i) => new Chunk(a, i));
		const blocks = switchBetweenBlocksAndRows(this._board);
		this._blks = blocks.map((a, i) => new Chunk(a, i));
		this._blks.forEach(chunk => chunk.setBlockIndeces());

		const tBlocks = switchBetweenBlocksAndRows(cols);
		this._tBlks = tBlocks.map((a, i) => new Chunk(a, i));
		this._tBlks.forEach(chunk => chunk.setTBlockIndeces());

		this._initValids();
		this._sortedCells = this.sortCells(this._board);
	}

	_initValids() {
		this._board.forEach(r => r.forEach(cell => {
			const row = this._rows[cell.y];
			const col = this._cols[cell.x];
			const block = this._blks[cell.block];
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
		let i = 0;
		let newDiscoveries = 0;
		let found = 0;
		while (i <= 3) {
			found = this._sortedCells.reduce((prev, cell) => cell.fixed ? prev + 1 : prev, 0);
			if (newDiscoveries === 0) {
				i++;
			}
			this.manageCellsWithOnlyOneValid();
			this.manageCellsWithOnlyValidsInChunks(this._rows);
			this.manageCellsWithOnlyValidsInChunks(this._cols);
			this.manageCellsWithOnlyValidsInChunks(this._blks);
			this.findTwoCellsWithSameTwoValids();
			this.manageOnlyLineOfValidsInABlock();
			//nvm bug is actually this method
			//this.manageHiddenValues();
			newDiscoveries = this._sortedCells.reduce((prev, cell) => cell.fixed ? prev + 1 : prev, 0) - found;
		}
	}

	setCells(discoveries) {
		discoveries.forEach(c => c.setToLastPossibleValid());
	}

	trimAffectedChunksValids(discoveries) {
		discoveries.forEach(c => {
			this._rows[c.y].trimOtherCellsValids(c);
			this._cols[c.x].trimOtherCellsValids(c);
			this._blks[c.block].trimOtherCellsValids(c);
			this._tBlks[c.tBlock].trimOtherCellsValids(c);
		});
	}

	manageCellsWithOnlyOneValid() {
		const discoveries = this._sortedCells.filter(c => c.valids.size === 1 && !c.fixed);
		this.setCells(discoveries);
		this.trimAffectedChunksValids(discoveries);
	}

	manageCellsWithOnlyValidsInChunks(chunks) {
		const discoveries = chunks.map(chunk => chunk.findCellsWithOnlyValidInChunk()).flat();
		this.setCells(discoveries);
		this.trimAffectedChunksValids(discoveries);
	}

	findTwoCellsWithSameTwoValids() {
		this._sortedCells.forEach(c => {
			this._rows[c.y].findTwoCellsWithSameTwoValids(c);
			this._cols[c.x].findTwoCellsWithSameTwoValids(c);
			this._blks[c.block].findTwoCellsWithSameTwoValids(c);
		});
	}

	manageOnlyLineOfValidsInABlock() {
		this._blks.forEach(chunk => {
			const arr = chunk.findOnlyLineOfValids();
			for (const k of Object.keys(arr)) {
				this._rows[arr[k].cell.y].cells.forEach(c => {
					if (c.block !== arr[k].cell.block && c.valids.has(arr[k].value)) {
						c.valids.delete(arr[k].value);
						c.removedValids.push(arr[k].value);
					}
				});
			}
		});
		this._tBlks.forEach(chunk => {
			const arr = chunk.findOnlyLineOfValids();
			for (const k of Object.keys(arr)) {
				this._cols[arr[k].cell.x].cells.forEach(c => {
					if (c.block !== arr[k].cell.block && c.valids.has(arr[k].value)) {
						c.valids.delete(arr[k].value);
						c.removedValids.push(arr[k].value);
					}
				});
			}
		});
	}


	// this is broken. Need to fix bug.
	manageHiddenValues() {
		this._rows.forEach(r => r.findAndManageHiddenValues())
		this._cols.forEach(r => r.findAndManageHiddenValues())
		this._blks.forEach(r => r.findAndManageHiddenValues())
	}

	_isFinished(rows) {
		return rows.every(r => r.cells.every(c => 1 <= c.num && c.num <= 9));
	}

	_isValid(rows, cols, blocks) {
		return this._checkChunk(rows) && this._checkChunk(cols) && this._checkChunk(blocks);
	}

	_checkChunk(a) {
		for (const chunk of a) {
			const duplicates = {};
			for (const cell of chunk.cells) {
				if (duplicates[cell.num] && cell.num !== 0) {
					return false;
				} else {
					duplicates[cell.num] = 1;
				}
			}
		}
		return true;
	}

	printRows(rows) {
		rows.forEach(r => r.printCells());
		console.log('');
	}

	printBlocks(blocks) {
		blocks.forEach((a, i) => {
			console.log(a[0]);
			a.printCellsAsBlocks();
			i % 3 === 2 ? console.log(`-----`) : console.log(``);
		});
		console.log(``);
	}
}

module.exports = Sudoku;