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

const solutionClone = function (board) {
  const solution = [];
  for (const chunk of board) {
    const solutionChunk = [];
    for (const cell of chunk) {
      solutionChunk.push(cell.num);
    }
    solution.push(solutionChunk);
  }
  return solution;
}

module.exports = {
  switchBetweenBlocksAndRows,
  solutionClone
}