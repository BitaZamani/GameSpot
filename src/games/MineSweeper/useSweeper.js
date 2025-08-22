import { useCallback, useEffect, useMemo, useState } from "react";
import { createBoard } from "../../utils/helpers/board";
import {
  findBombs,
  getLevelSettings,
} from "../../utils/minesweeper/mineSweeper";

export function useSweeper(initiLevel = "easy") {
  const [gameOver, setGameOver] = useState("ongoing");
  const [row, setRow] = useState(9);
  const [col, setCol] = useState(9);
  const [mines, setMines] = useState(10);
  const [remainedMines, setRemainedMines] = useState(10);

  const [revealedCells, setRevealedCells] = useState([]);
  const [flaggedCells, setFlaggedCells] = useState([]);

  const board = useMemo(
    () => createBoard(row, col, -1, mines),
    [row, col, mines]
  );
  const createSweeperBoard = useCallback((rowCount, colCount) => {
    setFlaggedCells(
      new Array(rowCount).fill(null).map(() => new Array(colCount).fill(false))
    );
    setRevealedCells(
      new Array(rowCount).fill(null).map(() => new Array(colCount).fill(false))
    );
    setGameOver("ongoing");
  }, []);
  useEffect(() => {
    const { row, col, mines } = getLevelSettings(initiLevel);
    setRow(row);
    setCol(col);
    setMines(mines);
    setRemainedMines(mines);

    createSweeperBoard(row, col);
  }, [initiLevel, createSweeperBoard]);

  const findZeros = (i, j) => {
    let newRevealed = findBombs(i, j, row, col, revealedCells, board);
    setRevealedCells(newRevealed);
  };

  const click = (number, i, j) => {
    if (flaggedCells[i][j] === true) return;
    if (number === -1) {
      setRevealedCells((prev) => {
        let newRevealed = prev.map((row) => [...row]);
        board.map((row, i) => {
          row.map((cell, j) => {
            console.log(cell);
            if (cell === -1 && flaggedCells[i][j] === false) {
              newRevealed[i][j] = true;
            }
          });
        });
        return newRevealed;
      });
      setGameOver("lose");
      return;
    } else if (number > 0) {
      setRevealedCells((prev) => {
        let newRevealed = prev.map((r) => [...r]);
        newRevealed[i][j] = true;
        return newRevealed;
      });
    } else {
      findZeros(i, j);
    }
  };
  const flagClick = (i, j) => {
    if (revealedCells[i][j] === true) return;
    setFlaggedCells((prev) => {
      let newFlag = prev.map((row) => [...row]);
      newFlag[i][j] = !prev[i][j];
      setRemainedMines((prev) => {
        if (newFlag[i][j] === true) return prev - 1;
        return prev + 1;
      });

      return newFlag;
    });
  };
  useEffect(() => {
    let foundnumbers = 0;
    revealedCells.map((row, i) => {
      row.map((cell, j) => {
        if (cell === true && board[i][j] !== -1) foundnumbers++;
      });
    });
    if (foundnumbers === row * col - mines) setGameOver("win");
  }, [revealedCells, col, row, mines, board]);
  return {
    board,
    revealedCells,
    flagClick,
    flaggedCells,
    gameOver,
    click,
    remainedMines,
    col,
    row,
  };
}
