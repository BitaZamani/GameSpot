import React from "react";
const button_variants = {
  minesweeper:
    "bg-gray-800 text-gray-300 hover:bg-gray-700 transition-all duration-150",
  2048: "bg-orange-300 hover:bg-orange-400 hover:text-orange-100 transition-all duration-150",
};

const Button = ({
  text,
  icon,
  handleclick,
  className,
  variant = "default",
}) => {
  return (
    <button
      className={`opacity-100 min-w-[60px] px-3 py-1 rounded-md sm:text-base text-black cursor-pointer ${className} ${button_variants[variant]} `}
      onClick={handleclick}
    >
      {icon && <span>{icon}</span>}
      {text}
    </button>
  );
};

export default Button;
