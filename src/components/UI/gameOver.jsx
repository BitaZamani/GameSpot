import React from "react";
import Button from "./button";

const GameOver = ({
  gameOver,
  handleclick,
  className,
  varinat = "",
  page = "",
}) => {
  const gameOver_variant = {
    light: "bg-white/20",
    dark: "bg-black/20",
  };
  return (
    <>
      {gameOver === "ongoing" ? (
        ""
      ) : (
        <div
          className={`z-10 absolute inset-0 min-h-full flex justify-center items-center flex-col  ${className} ${gameOver_variant[varinat]}`}
        >
          {gameOver === "lose" && (
            <>
              <span className="sm:text-5xl text-4xl opacity-100 font-semibold text-center ">
                Game Over!
              </span>

              <Button
                handleclick={handleclick}
                text={"Try Again"}
                variant={varinat}
              />
            </>
          )}
          {gameOver === "win" && (
            <>
              <span className="sm:text-5xl text-4xl opacity-100 font-semibold my-4">
                You Won!
              </span>

              <Button
                handleclick={handleclick}
                text={"Play Again"}
                variant={page}
              />
            </>
          )}
        </div>
      )}
    </>
  );
};

export default GameOver;
