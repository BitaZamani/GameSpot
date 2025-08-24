export const gameEnds = (array, len) => {
  for (let i = 0; i < len; i++) {
    for (let j = 0; j < len; j++) {
      if (array[i][j] === 0) return "ongoing";
      if (i < len - 1 && array[i][j] === array[i + 1][j]) return "ongoing";
      if (j < len - 1 && array[i][j] === array[i][j + 1]) return "ongoing";
    }
  }
  return "lose";
};

export const modifyRow = (key, array, len) => {
  let filteredArray = [];
  filteredArray = array.filter((cell) => cell !== 0);
  let rowScore = 0;
  let i;
  if (key === "ArrowRight" || key === "ArrowDown") {
    i = filteredArray.length - 1;

    while (i > 0) {
      if (filteredArray[i] === filteredArray[i - 1]) {
        filteredArray[i] = filteredArray[i] + filteredArray[i - 1];
        filteredArray[i - 1] = 0;
        rowScore += filteredArray[i];
      }
      i--;
    }
    filteredArray = filteredArray.filter((cell) => cell !== 0);
    while (filteredArray.length < len) {
      filteredArray.unshift(0);
    }
  } else if (key === "ArrowLeft" || key === "ArrowUp") {
    i = 0;
    while (i < filteredArray.length - 1) {
      if (filteredArray[i] === filteredArray[i + 1]) {
        filteredArray[i] = filteredArray[i] + filteredArray[i + 1];
        filteredArray[i + 1] = 0;
        rowScore += filteredArray[i];
      }
      i++;
    }
    filteredArray = filteredArray.filter((cell) => cell !== 0);
    while (filteredArray.length < len) {
      filteredArray.push(0);
    }
  }

  return { filteredArray, rowScore };
};

export const modifyBoard = (key, gameArray, len, topTile) => {
  let array = gameArray.map((row) => [...row]);
  let newTopTile = topTile;
  let score = 0;
  if (key === "ArrowRight" || key === "ArrowLeft") {
    for (let i = 0; i < len; i++) {
      const { filteredArray, rowScore } = modifyRow(key, array[i], len);
      score += rowScore;
      array[i] = filteredArray;
    }
  } else {
    for (let i = 0; i < len; i++) {
      let row = [];
      for (let j = 0; j < len; j++) row.push(array[j][i]);
      const { filteredArray, rowScore } = modifyRow(key, row, len);
      score += rowScore;
      for (let inx = 0; inx < len; inx++) array[inx][i] = filteredArray[inx];
    }
  }
  const same = array.every((row, i) =>
    row.every((cell, j) => cell === gameArray[i][j])
  );
  const emptyCells = [];

  for (let i = 0; i < len; i++) {
    for (let j = 0; j < len; j++) {
      if (array[i][j] === 0) emptyCells.push([i, j]);
      if (array[i][j] > topTile) {
        newTopTile = array[i][j];
      }
    }
  }
  if (same) {
    return {
      array: gameArray,
      score: 0,
      newTopTile,
      gameOver: gameEnds(array, len),
    };
  }

  if (emptyCells.length > 0) {
    const randIndex = Math.floor(Math.random() * emptyCells.length);
    const [randI, randJ] = emptyCells[randIndex];
    array[randI][randJ] = Math.random() > 0.9 ? 4 : 2;
  }

  return { array, score, newTopTile, gameOver: gameEnds(array, len) };
};

export const calColor = (number) => {
  let h = 30;
  const s = 100;

  if (number === 0) return "#ccc0b4";

  const numberLog = Math.log2(number);
  if (numberLog > 6 && numberLog < 9) {
    h += 20;
  } else if (numberLog > 10) {
    h -= 10;
  }
  let l = 100 - numberLog * 7;

  return `hsl(${h}, ${s}%, ${l}%)`;
};
