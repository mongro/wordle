import React from "react";
import { ABSENT, CORRECT, PRESENT } from "./Wordle";

function Guesses({
  cells,
  currentCell,
  gameStatus,
  statusFlipped,
  showEndScreen,
  indexShaking,
  enteredWords,
  onClick,
  onAnimationEnd,
  solution,
}) {
  const createCellClasses = (evaluation, index) => {
    let classes =
      "flex justify-center items-center border-2 border-black dark:border-white rounded font-bold h-full w-full ";

    let animationClasses =
      (showEndScreen && Math.floor(index / 5) === enteredWords - 1
        ? gameStatus === "WON"
          ? "animate-dance "
          : "animate-collapse origin-bottom-right "
        : "animate-flip ") + `animation-delay-${index % 5} `;

    switch (evaluation) {
      case ABSENT:
        classes +=
          animationClasses + (statusFlipped[index] ? "bg-slate-400 " : "");
        break;
      case CORRECT:
        classes +=
          animationClasses + (statusFlipped[index] ? "bg-green-400 " : "");
        break;
      case PRESENT:
        classes +=
          animationClasses + (statusFlipped[index] ? "bg-yellow-600 " : "");
        break;
      default:
        classes += "bg-white dark:bg-black ";
        break;
    }

    if (currentCell === index && gameStatus === "RUNNING") {
      classes += "shadow-gray-400 shadow-3xl ";
    }

    if (Math.floor(index / 5) === indexShaking) {
      classes += "animate-shake ";
    }

    return classes;
  };
  return (
    <div className="relative pt-[120%] w-full">
      <div className="grid grid-cols-5  height:gap-4 gap-2  absolute inset-0 grid-rows-6 p-3 ">
        {cells.map((cell, index) => {
          return (
            <div className="relative">
              <div
                className={createCellClasses(cell.evaluation, index)}
                onClick={() => onClick(index)}
                onAnimationEnd={(event) => onAnimationEnd(event, index)}
              >
                {cell.letter}
              </div>
              {gameStatus === "LOST" &&
              showEndScreen &&
              Math.floor(index / 5) === 5 ? (
                <div className="absolute inset-0 z-[-1] flex justify-center items-center border-2 border-black dark:border-white rounded font-bold h-full w-full">
                  {solution[index % 5]}
                </div>
              ) : null}
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default Guesses;
