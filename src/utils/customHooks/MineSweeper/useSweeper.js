import { useCallback, useEffect, useState } from "react";
import { createBoard } from "../../helpers/board";
import { useTimer } from "../useTimer";
import {
  findBombs,
  getLevelSettings,
} from "../../helpers/minesweeper/mineSweeper";

export function useSweeper(initiLevel = "easy") {
  const [gameOver, setGameOver] = useState("ongoing");
  const [row, setRow] = useState(9);
  const [col, setCol] = useState(9);
  const [mines, setMines] = useState(10);
  const [remainedMines, setRemainedMines] = useState(10);

  const [revealedCells, setRevealedCells] = useState([]);
  const [flaggedCells, setFlaggedCells] = useState([]);

  const { seconds, setSeconds } = useTimer(gameOver !== "ongoing");

  const [board, setBoard] = useState([]);
  const createSweeperBoard = useCallback(
    (rowCount, colCount, minesCount) => {
      setSeconds(0);
      setFlaggedCells(
        new Array(rowCount)
          .fill(null)
          .map(() => new Array(colCount).fill(false))
      );
      setRevealedCells(
        new Array(rowCount)
          .fill(null)
          .map(() => new Array(colCount).fill(false))
      );
      setBoard(createBoard(rowCount, colCount, -1, minesCount));
      setGameOver("ongoing");
    },
    [setSeconds]
  );

  //initial board
  useEffect(() => {
    const { row, col, mines } = getLevelSettings(initiLevel);
    setRow(row);
    setCol(col);
    setMines(mines);
    setRemainedMines(mines);

    // build a new board whenever level changes
    createSweeperBoard(row, col, mines);
  }, [initiLevel, createSweeperBoard]);

  //finding numbers
  const findZeros = (i, j) => {
    let newRevealed = findBombs(i, j, row, col, revealedCells, board);
    setRevealedCells(newRevealed);
  };

  //revealing cells
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

  //flagging cells
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

  //check win
  useEffect(() => {
    let foundnumbers = 0;
    revealedCells.map((row, i) => {
      row.map((cell, j) => {
        if (cell === true && board[i][j] !== -1) foundnumbers++;
      });
    });
    if (foundnumbers === row * col - mines) setGameOver("win");
  }, [revealedCells, col, row, mines, board]);

  //restart
  const restart = () => {
    createSweeperBoard(row, col, mines);
    setRemainedMines(mines);
    setSeconds(0);
  };

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
    restart,
    seconds,
  };
}
