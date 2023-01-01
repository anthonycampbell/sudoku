const switchBetweenBlocksAndRows = function (board, isNotProcessing = false) {
  const switched = [[], [], [], [], [], [], [], [], []];
  for (let i = 0; i < board.length; i++) {
    const chunk = board[i];
    for (let j = 0; j < chunk.length; j++) {
      const c = Math.floor(i / 3) * 3 + Math.floor(j / 3); // Transform
      const ii = (i % 3) * 3 + j % 3;
      switched[c][ii] = chunk[j];
      if (chunk[j] === null) {
        isNotProcessing ? switched[c][ii] = null : switched[c][ii] = 0;
      }
    }
  }
  return switched;
}

const transpose = function (rows) {
  return Object.keys(rows[0]).map(c => rows.map(r => r[c]));
}

const solutionClone = function (board) {
  const solution = [];
  board.forEach(chunk => {
    const solutionChunk = [];
    chunk.cells.forEach(cell => solutionChunk.push(cell.num));
    solution.push(solutionChunk);
  });
  return solution;
}

function difference(setA, setB) {
  const _difference = new Set(setA);
  for (const elem of setB) {
    _difference.delete(elem);
  }
  return _difference;
}

const union = function (setA, setB) {
  const _union = new Set(setA);
  for (const elem of setB) {
    _union.add(elem);
  }
  return _union;
}

const intersection = function (setA, setB) {
  const _intersection = new Set();
  for (const elem of setA) {
    if (setB.has(elem)) {
      _intersection.add(elem);
    }
  }
  return _intersection;
}

module.exports = {
  switchBetweenBlocksAndRows,
  solutionClone,
  difference,
  union,
  intersection,
  transpose
}