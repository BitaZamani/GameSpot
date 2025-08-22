import { useCallback, useEffect, useState } from "react";
import { modifyBoard } from "../../utils/2048/2048";
import { getData, setData } from "../../utils/helpers/manageLocalStorage";

import { createBoard } from "../../utils/helpers/board";

export function use2048() {
  const [topTile, setTopTile] = useState(() => getData("2048TopTile") || 0);
  const [topScore, setTopScore] = useState(() => getData("2048TopScore") || 0);
  const [currentScore, setCurrentScore] = useState(
    getData("2048CurrentScore") || 0
  );
  const [gameOver, setGameOver] = useState(
    () => getData("2048State") || "ongoing"
  );

  const [clients, setClients] = useState({ x: 0, y: 0 });

  //making game board
  const create2048Board = () => createBoard(4, 4, 2, 2);

  const [board, setBoard] = useState(() => {
    const saved = getData("2048Board");
    return saved ? saved : create2048Board();
  });

  //modifing the board after moves
  const move = useCallback(
    (key) => {
      const { array, score, newTopTile, gameOver } = modifyBoard(
        key,
        board,
        4,
        topTile
      );
      setBoard(array);
      setCurrentScore((prev) => {
        const curr = prev + score;
        if (curr > topScore) setTopScore(curr);
        setData("2048CurrentScore", curr);
        return curr;
      });
      setTopTile(newTopTile);
      setGameOver(gameOver);
      setData("2048Board", array);
    },
    [board, topScore, topTile]
  );

  //detecting keyboard key value and calling move
  useEffect(() => {
    const handleKey = (e) => {
      const keys = ["ArrowUp", "ArrowDown", "ArrowLeft", "ArrowRight"];

      if (keys.includes(e.key) && gameOver === "ongoing") {
        move(e.key);
      }
    };
    document.addEventListener("keydown", handleKey);
    return () => document.removeEventListener("keydown", handleKey);
  }, [gameOver, move]);

  //detecting finger touch start
  const startTouch = (event) => {
    event.preventDefault();
    const touch = event.touches[0];
    setClients({ x: touch.clientX, y: touch.clientY });
  };

  //detecting finger touch end
  const endTouch = (event) => {
    event.preventDefault();
    const touch = event.changedTouches[0];
    let dx = touch.clientX - clients.x;
    let dy = touch.clientY - clients.y;
    if (Math.abs(dx) > Math.abs(dy)) {
      if (dx > 0 && Math.abs(dy) < 150) move("ArrowRight");
      else if (dx < 0 && Math.abs(dy) < 150) move("ArrowLeft");
    } else {
      if (dy > 0 && Math.abs(dx) < 150) move("ArrowDown");
      else if (dy < 0 && Math.abs(dx) < 150) move("ArrowUp");
    }
  };

  //reset the game and boards

  const reset2048 = () => {
    const newArray = create2048Board();
    setBoard(newArray);
    setData("2048Board", newArray);

    setCurrentScore(0);
    setData("2048CurrentScore", 0);

    setTopScore(0);
    setData("2048TopScore", 0);

    setTopTile(2);
    setData("2048TopTile", 2);

    setGameOver("ongoing");
    setData("2048State", "ongoing");
  };

  //restart the game
  const restart2048 = () => {
    const newArray = create2048Board();
    setBoard(newArray);
    setData("2048Board", newArray);

    setCurrentScore(0);
    setData("2048CurrentScore", 0);
    setGameOver("ongoing");
    setData("2048State", "ongoing");
  };

  //saving top score
  useEffect(() => {
    setData("2048TopScore", topScore);
  }, [topScore]);

  //saving top tile
  useEffect(() => {
    setData("2048TopTile", topTile);
  }, [topTile]);

  //saving game state
  useEffect(() => {
    setData("2048State", gameOver);
  }, [gameOver]);

  return {
    board,
    topTile,
    topScore,
    currentScore,
    gameOver,
    move,
    reset2048,
    startTouch,
    endTouch,
    restart2048,
  };
}
