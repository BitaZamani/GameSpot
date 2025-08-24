import React from "react";
import { useLongPress } from "../../utils/customHooks/useLongPress";
import { calTextColor } from "../../utils/helpers/minesweeper/mineSweeper";
const level_styles = {
  easy: "size-7",
  medium: "size-[22px] sm:size-7",
  hard: "size-[22px] sm:size-7",
};
const Cell = React.memo(
  ({ number, revealedCells, click, i, j, flaggedCells, flagClick, level }) => {
    const handlers = useLongPress(
      () => click(number, i, j),
      () => flagClick(i, j)
    );
    const bomb = (
      <svg viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
        <g id="SVGRepo_bgCarrier" strokeWidth="0"></g>
        <g
          id="SVGRepo_tracerCarrier"
          strokeLinecap="round"
          strokeLinejoin="round"
        ></g>
        <g id="SVGRepo_iconCarrier">
          {" "}
          <path
            d="M15.9569 1.45706L14.539 2.87495L13.1248 1.45706L14.5427 0.0428467L15.9569 1.45706Z"
            fill="#000000"
          ></path>{" "}
          <path
            fillRule="evenodd"
            clipRule="evenodd"
            d="M11.707 5.707L13.123 4.29101L14.5354 5.70706L15.9532 4.28917L14.539 2.87495L13.123 4.28733L11.7106 2.87495L10.2928 4.29279L9 3L7.74293 4.25707C7.19135 4.08989 6.60617 4 6 4C2.68629 4 0 6.68629 0 10C0 13.3137 2.68629 16 6 16C9.31371 16 12 13.3137 12 10C12 9.39383 11.9101 8.80865 11.7429 8.25707L13 7L11.707 5.707ZM6 8C4.89543 8 4 8.89543 4 10H2C2 7.79086 3.79086 6 6 6V8Z"
            fill="#000000"
          ></path>{" "}
          <path
            d="M11.7107 0.0428467L13.1248 1.45706L11.707 2.87495L10.2928 1.45706L11.7107 0.0428467Z"
            fill="#000000"
          ></path>{" "}
        </g>
      </svg>
    );
    const flag = (
      <svg
        height="12px"
        width="12px"
        version="1.1"
        id="Layer_1"
        xmlns="http://www.w3.org/2000/svg"
        xmlns:xlink="http://www.w3.org/1999/xlink"
        viewBox="0 0 491.52 491.52"
        xml:space="preserve"
        fill="#000000"
      >
        <g id="SVGRepo_bgCarrier" strokeWidth="0"></g>
        <g
          id="SVGRepo_tracerCarrier"
          strokeLinecap="round"
          strokeLinejoin="round"
        ></g>
        <g id="SVGRepo_iconCarrier">
          {" "}
          <path
            fill="#9a97a1"
            d="M170.812,0h-0.899c-7.296,0-13.211,5.915-13.211,13.213V491.52h27.32V13.213 C184.022,5.915,178.108,0,170.812,0z"
          ></path>{" "}
          <path
            fill="#745ecc"
            d="M228.952,425.11H111.771c-6.995,0-12.667,5.672-12.667,12.669v53.741h142.519v-53.741 C241.622,430.783,235.95,425.11,228.952,425.11z"
          ></path>{" "}
          <path
            fill="#d12a2a"
            d="M392.416,162.682c-83.4-38.322-125.064,38.316-208.394-0.001c-0.002-58.06-0.002-87.097,0-145.159 c83.33,38.314,124.994-38.33,208.394,0.002C392.416,75.584,392.416,104.621,392.416,162.682z"
          ></path>{" "}
        </g>
      </svg>
    );
    return (
      <div
        className={`flex text-xl font-bold text-black m-0 p-0 no-select ${level_styles[level]}`}
        {...handlers}
        onContextMenu={(e) => {
          e.preventDefault();
          flagClick(i, j);
        }}
        style={{
          color: calTextColor(number),
        }}
      >
        {!flaggedCells ? (
          revealedCells ? (
            <span
              className={`border-2 border-[#232b33] text-center bg-[#464e56] box-border ${level_styles[level]}`}
            >
              {number === -1 ? bomb : number === 0 ? "" : number}
            </span>
          ) : (
            <span
              className={`border-4 border-r-[#1e262e] border-b-[#1e262e] border-t-[#6a727b] border-l-[#6a727b] bg-[#4c545c] box-border ${level_styles[level]}`}
            ></span>
          )
        ) : (
          <span
            className={`border-4 border-r-[#1e262e] border-b-[#1e262e] border-t-[#6a727b] border-l-[#6a727b] bg-[#4c545c] box-border flex justify-center items-center ${level_styles[level]}`}
          >
            {flag}
          </span>
        )}
      </div>
    );
  }
);

export default Cell;
