import React from "react";
import Button from "../../components/UI/button";
import { NavLink } from "react-router-dom";

const MineSweeperInfo = ({ setLevel, seconds, mines, restart }) => {
  return (
    <div className="w-full text-gray-200 p-2">
      <div className="flex justify-between items-center mb-5">
        <span className="block text-center align-middle text-xl  font-semibold">
          Mine Sweeper
        </span>
        <Button text={<NavLink to={"/"}>Home</NavLink>} variant="minesweeper" />
      </div>
      <div className="flex justify-between w-full px-2">
        <Button
          text={"Easy"}
          handleclick={() => setLevel("easy")}
          variant="minesweeper"
        />
        <Button
          text={"Medium"}
          handleclick={() => setLevel("medium")}
          variant="minesweeper"
        />
        <Button
          text={"Hard"}
          handleclick={() => setLevel("hard")}
          variant="minesweeper"
        />
      </div>
      <div className="flex w-full justify-between items-center mt-5 mb-2 px-4">
        <span>{seconds}</span>
        <Button text={"New Game"} handleclick={restart} variant="minesweeper" />
        <span>{mines}</span>
      </div>
    </div>
  );
};

export default MineSweeperInfo;
