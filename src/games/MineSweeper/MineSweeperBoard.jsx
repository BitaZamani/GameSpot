import React, { useMemo, useState } from "react";
import { useSweeper } from "../../customHooks/MineSweeper/useSweeper";
import Cell from "./cell";
import GameOver from "../../components/UI/gameOver";
import Button from "../../components/UI/button";
import { setColGrid, setRowGrid } from "../../utils/minesweeper/mineSweeper";
import MineSweeperInfo from "./MineSweeperInfo";

const MineSweeperBoard = () => {
  const [level, setLevel] = useState("easy");
  const {
    board,
    revealedCells,
    flaggedCells,
    gameOver,
    click,
    flagClick,
    col,
    row,
    remainedMines,
    restart,
    seconds,
  } = useSweeper(level);
  const cellContainer = useMemo(() => {
    if (revealedCells.length > 0 && flaggedCells.length > 0) {
      return board.map((row, i) =>
        row.map((c, j) => (
          <Cell
            number={c}
            key={`${i}-${j}`}
            revealedCells={revealedCells[i][j]}
            flaggedCells={flaggedCells[i][j]}
            flagClick={flagClick}
            click={click}
            i={i}
            j={j}
          />
        ))
      );
    }
  }, [board, revealedCells, flaggedCells, click, flagClick]);

  return (
    <div className="min-h-screen pt-16">
      <div
        className="bg-[#464e56] mx-auto flex flex-col justify-center items-center py-3 border-4 border-r-[#1e262e] border-b-[#1e262e] border-l-[#788088] border-t-[#788088]"
        style={{ maxWidth: 32 * col }}
      >
        <MineSweeperInfo
          setLevel={setLevel}
          seconds={seconds}
          mines={remainedMines}
          restart={restart}
        />

        <section
          className="border-4 border-t-[#1e262e] border-l-[#1e262e] border-b-[#788088] border-r-[#788088] relative"
          style={{
            display: "grid",
            gridTemplateRows: setRowGrid(row),
            gridTemplateColumns: setColGrid(col),
          }}
        >
          <GameOver
            gameOver={gameOver}
            className={"bg-black/75 text-gray-300"}
            handleclick={restart}
            varinat="dark"
            page="minesweeper"
          />
          {cellContainer}
        </section>
      </div>
    </div>
  );
};

export default MineSweeperBoard;
