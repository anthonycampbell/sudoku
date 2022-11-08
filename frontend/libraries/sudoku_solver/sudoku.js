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
		let i = 0;
		let newDiscoveries = 0;
		let found = 0;
		while (i <= 3) {
			found = this._sortedCells.reduce((prev, cell) => cell.fixed ? prev + 1 : prev, 0);
			if (newDiscoveries === 0) {
				i++;
			}
			this.manageCellsWithOnlyOneValid();
			this.manageCellsWithOnlyValidsInChunks(this._sortedRows);
			this.manageCellsWithOnlyValidsInChunks(this._sortedCols);
			this.manageCellsWithOnlyValidsInChunks(this._sortedBlocks);
			this.findTwoCellsWithSameTwoValids();
			newDiscoveries = this._sortedCells.reduce((prev, cell) => cell.fixed ? prev + 1 : prev, 0) - found;
		}
		this.printRows(this._sortedRows);
	}

	setCells(discoveries) {
		discoveries.forEach(c => c.setToLastPossibleValid());
	}

	trimAffectedChunksValids(discoveries) {
		discoveries.forEach(c => {
			this._sortedRows[c.y].trimOtherCellsValids(c);
			this._sortedCols[c.x].trimOtherCellsValids(c);
			this._sortedBlocks[c.block].trimOtherCellsValids(c);
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
			this._sortedRows[c.y].findTwoCellsWithSameTwoValids(c);
			this._sortedCols[c.x].findTwoCellsWithSameTwoValids(c);
			this._sortedBlocks[c.block].findTwoCellsWithSameTwoValids(c);
		});
	}

	_isFinished(rows) {
		return rows.every(r => r.cells.every(c => 1 <= c.num && c.num <= 9));
	}

	_isValid(rows, cols, blocks) {
		return this._checkSection(rows) && this._checkSection(cols) && this._checkSection(blocks);
	}

	_checkSection(a) {
		for (let i = 0; i < a.length; i++) {
			let sorted = a[i].cells.slice().sort((a, b) => a.num - b.num);
			for (let i = 0; i < sorted.length - 1; i++) {
				if (sorted[i].num === sorted[i + 1].num && sorted[i].num !== 0) {
					return false;
				}
			}
		}
		return true;
	}

	printRows(rows) {
		rows.forEach(r => r.printCells());
		console.log('');
	}

	printBlocks() {
		this._sortedBlocks.forEach((a, i) => {
			a.printCellsAsBlocks();
			i % 3 === 2 ? console.log(`-----`) : console.log(``);
		});
		console.log(``);
	}
}

module.exports = Sudoku;