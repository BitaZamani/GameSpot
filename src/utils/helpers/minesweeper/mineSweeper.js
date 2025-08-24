export const getLevelSettings = (lvl) => {
  if (lvl === "medium") return { row: 16, col: 16, mines: 40 };
  if (lvl === "hard") return { row: 30, col: 16, mines: 99 };
  return { row: 9, col: 9, mines: 10 };
};

// finding bombs
export const findBombs = (i, j, row, col, revealedCells, board) => {
  let visited = new Array(row).fill(null).map(() => new Array(col).fill(false));
  let newShow = revealedCells.map((r) => [...r]);
  const offsets = [-1, 0, 1];
  let queue = [[i, j]];
  while (queue.length > 0) {
    const [x, y] = queue.shift();
    if (visited[x][y]) continue;
    visited[x][y] = true;
    newShow[x][y] = true;

    if (board[x][y] === 0) {
      for (let rowOffset of offsets) {
        for (let colOffset of offsets) {
          if (rowOffset === 0 && colOffset === 0) continue;
          let newRow = x + rowOffset;
          let newCol = y + colOffset;
          if (
            newRow >= 0 &&
            newRow < row &&
            newCol >= 0 &&
            newCol < col &&
            !visited[newRow][newCol]
          ) {
            if (board[newRow][newCol] !== -1) queue.push([newRow, newCol]);
          }
        }
      }
    }
  }

  return newShow;
};

export const setRowGrid = (row) => {
  const rowGrid = `${100 / row}%`;
  return rowGrid.repeat(row);
};
export const setColGrid = (col) => {
  const colGrid = `${100 / col}%`;
  return colGrid.repeat(col);
};

export const calTextColor = (number) => {
  const s = 100;
  let h = 350 - number * 50;

  let l = 50;

  return `hsl(${h}, ${s}%, ${l}%)`;
};
