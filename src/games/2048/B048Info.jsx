import React from "react";

import Button from "../../components/UI/button";
import { NavLink } from "react-router-dom";

const B048Info = ({ topTile, topScore, currentScore, restart2048 }) => {
  return (
    <div className="flex justify-between w-[363px] sm:w-[490px] mx-auto flex-col bg-orange-100 px-5 pt-2 text-orange-950">
      <div className="flex">
        <span className="font-semibold text-5xl sm:text-7xl">2048</span>
        <div className="flex justify-around items-center w-full ml-5">
          <div className="score-board bg-orange-200">
            <span className="block ">Best Tile</span>
            {topTile}
          </div>
          <div className="score-board bg-orange-200">
            <span className="block">Best Score</span>
            {topScore}
          </div>
        </div>
      </div>
      <div className="flex justify-between items-center px-1 mt-6 w-full">
        <Button
          variant="2048"
          text={
            <NavLink to="/" className="">
              Home
            </NavLink>
          }
        />
        <span className="underline-offset-4 underline">{currentScore}</span>
        <Button text={"New Game"} handleclick={restart2048} variant="2048" />
      </div>
    </div>
  );
};

export default B048Info;
