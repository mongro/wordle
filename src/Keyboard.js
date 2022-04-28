import React from "react";
import { ABSENT, CORRECT, PRESENT } from "./Wordle";

const TOPROW = ["Q", "W", "E", "R", "T", "Z", "U", "I", "O", "P"];
const MIDDLEROW = ["A", "S", "D", "F", "G", "H", "J", "K", "L"];
const BOTTOMROW = ["Y", "X", "C", "V", "B", "N", "M"];

const createBgClasses = (evaluation) => {
  switch (evaluation) {
    case ABSENT:
      return "bg-slate-400 ";
    case CORRECT:
      return "bg-green-400 ";
    case PRESENT:
      return "bg-yellow-600 ";
    default:
      return "bg-white dark:bg-black ";
  }
};

const Key = ({ disabled = false, onClick, classes = "", children }) => {
  const handleClick = () => {
    if (disabled) return;

    if (onClick) onClick();
  };
  return (
    <button
      className={
        "flex justify-center items-center shrink border-2 border-black dark:border-white rounded flex-1 mr-1 font-semibold " +
        classes
      }
      onClick={handleClick}
    >
      {children}
    </button>
  );
};

const Keyboard = ({ letters, onClick }) => {
  return (
    <div className="mt-2 w-full">
      <div className="flex justify-center mb-1">
        {TOPROW.map((letter) => (
          <Key
            classes={createBgClasses(letters.get(letter))}
            onClick={() => onClick(letter)}
          >
            {letter}
          </Key>
        ))}
      </div>
      <div className="flex justify-center mb-1">
        {MIDDLEROW.map((letter) => (
          <Key
            classes={createBgClasses(letters.get(letter))}
            onClick={() => onClick(letter)}
          >
            {letter}
          </Key>
        ))}
      </div>
      <div className="flex justify-center mb-1 ">
        <Key classes="grow-[1.5]" onClick={() => onClick("Enter")}>
          Enter
        </Key>
        {BOTTOMROW.map((letter) => (
          <Key
            classes={createBgClasses(letters.get(letter))}
            onClick={() => onClick(letter)}
          >
            {letter}
          </Key>
        ))}
        <Key classes="grow-[1.5]" onClick={() => onClick("Backspace")}>
          <svg height="24" viewBox="0 0 24 24" width="24">
            <path
              fill="currentColor"
              d="M22 3H7c-.69 0-1.23.35-1.59.88L0 12l5.41 8.11c.36.53.9.89 1.59.89h15c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zm0 16H7.07L2.4 12l4.66-7H22v14zm-11.59-2L14 13.41 17.59 17 19 15.59 15.41 12 19 8.41 17.59 7 14 10.59 10.41 7 9 8.41 12.59 12 9 15.59z"
            ></path>
          </svg>
        </Key>
      </div>
    </div>
  );
};

export default Keyboard;
