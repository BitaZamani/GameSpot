import { createRand } from "./createRand";

export const createBoard = (row, col, value, count) => {
  let newArray = [];
  for (let i = 0; i < row; i++) newArray.push(new Array(col).fill(0));
  let mines = 0;
  if (count > 2) {
    while (mines < count) {
      const rowNum = createRand(row);
      const colNum = createRand(col);
      if (newArray[rowNum][colNum] === 0) {
        newArray[rowNum][colNum] = -1;
        mines++;
      }
    }
    const offsets = [-1, 0, 1];
    for (let i = 0; i < row; i++) {
      for (let j = 0; j < col; j++) {
        let countedMines = 0;
        if (newArray[i][j] === -1) continue;
        for (let rowOffset of offsets) {
          for (let colOffset of offsets) {
            if (colOffset === 0 && rowOffset === 0) continue;
            let newRow = rowOffset + i;
            let newCol = colOffset + j;
            if (newRow >= 0 && newRow < row && newCol >= 0 && newCol < col) {
              if (newArray[newRow][newCol] === -1) countedMines++;
            }
          }
        }
        newArray[i][j] = countedMines;
      }
    }
  } else if (count === 2) {
    let randTile_i1 = createRand(row);
    let randTile_i2;
    let randTile_j1 = createRand(col);
    let randTile_j2;
    do {
      randTile_i2 = createRand(row);
      randTile_j2 = createRand(col);
    } while (randTile_j2 === randTile_j1 && randTile_i1 === randTile_i2);
    newArray[randTile_i1][randTile_j1] = value;
    newArray[randTile_i2][randTile_j2] = value;
  }
  return newArray;
};
