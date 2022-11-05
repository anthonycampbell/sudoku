const switchBetweenBlocksAndRows = function (board) {
  const switched = [[], [], [], [], [], [], [], [], []];
  for (let i = 0; i < board.length; i++) {
    const chunk = board[i];
    for (let j = 0; j < chunk.length; j++) {
      const c = Math.floor(i / 3) * 3 + Math.floor(j / 3); // Transform
      const ii = (i % 3) * 3 + j % 3;
      switched[c][ii] = chunk[j];
      if (chunk[j] === null) {
        switched[c][ii] = 0;
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
    chunk.forEach(cell => solutionChunk.push(cell.num));
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

module.exports = {
  switchBetweenBlocksAndRows,
  solutionClone,
  difference,
  union,
  transpose
}