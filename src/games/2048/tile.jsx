import React from "react";
import { calColor } from "../../utils/helpers/2048/2048";

const Tile = React.memo(({ number }) => {
  return (
    <div
      className={`size-16 sm:size-24 flex justify-center items-center text-3xl font-bold m-2 rounded-[2px] ${
        number > 31 ? "text-gray-100" : "text-[#776e65]"
      } `}
      style={{ backgroundColor: calColor(number) }}
    >
      <span className="number">{number === 0 ? "" : number}</span>
    </div>
  );
});

export default Tile;
