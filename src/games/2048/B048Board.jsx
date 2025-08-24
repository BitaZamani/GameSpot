import React, { useMemo } from "react";
import Tile from "./tile";
import GameOver from "../../components/UI/gameOver";

import { use2048 } from "../../utils/customHooks/2048/use2048";
import B048Info from "./B048Info";
const B048Board = () => {
  const {
    board,
    gameOver,
    endTouch,
    startTouch,
    restart2048,
    currentScore,
    topScore,
    topTile,
  } = use2048();

  const tileContainer = useMemo(() => {
    return board.map((row, i) =>
      row.map((cell, j) => <Tile number={cell} key={`${i}-${j}`} />)
    );
  }, [board]);
  return (
    <div className="flex flex-col pt-10 sm:pt-4 min-h-screen ">
      <B048Info
        currentScore={currentScore}
        restart2048={restart2048}
        topScore={topScore}
        topTile={topTile}
      />
      <div
        className="relative mx-auto px-5 pt-2 pb-5 rounded-sm bg-orange-100 flex justify-center flex-col items-center"
        onTouchStart={startTouch}
        onTouchEnd={endTouch}
      >
        <GameOver
          gameOver={gameOver}
          handleclick={restart2048}
          varinat="light"
          page="2048"
        />

        <section className="b048-table touch-none">{tileContainer}</section>
      </div>
    </div>
  );
};

export default B048Board;
