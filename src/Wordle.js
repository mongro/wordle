import React, { useState, useEffect, useCallback } from "react";
import Alert from "./Alert";
import { allowed, answers } from "./dictionary";
import useLocalStorage from "localStorage";
import Keyboard from "Keyboard";
import Guesses from "Guesses";
import Statistics from "Statistics";
import Modal from "Modal";
import Countdown from "Countdown";

const MAXROUNDS = 6;

const ERROR_MESSAGE_DURATION = 1000;
const END_SCREEN_DURATION = 5000;

export const [UNUSED, ABSENT, PRESENT, CORRECT] = [0, 1, 2, 3];

const CELLS = [...Array(30)].map(() => ({
  letter: "",
  evaluation: UNUSED,
}));

const EVALUATIONS = [
  ["Q", UNUSED],
  ["W", UNUSED],
  ["E", UNUSED],
  ["R", UNUSED],
  ["T", UNUSED],
  ["Z", UNUSED],
  ["U", UNUSED],
  ["I", UNUSED],
  ["O", UNUSED],
  ["P", UNUSED],
  ["A", UNUSED],
  ["S", UNUSED],
  ["D", UNUSED],
  ["F", UNUSED],
  ["G", UNUSED],
  ["H", UNUSED],
  ["J", UNUSED],
  ["K", UNUSED],
  ["L", UNUSED],
  ["Y", UNUSED],
  ["X", UNUSED],
  ["C", UNUSED],
  ["V", UNUSED],
  ["B", UNUSED],
  ["N", UNUSED],
  ["M", UNUSED],
];

function checkIfLetter(key) {
  return /^[a-z]$/i.test(key);
}

const initLetterInfo = () => {
  const storage =
    JSON.parse(window.localStorage.getItem("letterInfo")) ?? EVALUATIONS;
  return new Map(storage);
};

const createGameId = (now) => {
  const refDate = new Date("04/01/2022");
  return Math.ceil((now - refDate.getTime()) / (60 * 60 * 24 * 1000));
};

const Grid = ({ showStatistics, setShowStatistics }) => {
  const [statistics, setStatistics] = useLocalStorage("statistics", {
    gamesPlayed: 0,
    gamesWon: 0,
    guesses: [0, 0, 0, 0, 0, 0],
    currentStreak: 0,
    maxStreak: 0,
  });
  const [gameStatus, setGameStatus] = useLocalStorage("gameStatus", "RUNNING");
  const [enteredWords, setEnteredWords] = useLocalStorage("enteredWords", 0);

  const [currentCell, setCurrentCell] = useState(enteredWords * 5);
  const [gameId, setGameId] = useLocalStorage(
    "lastGameId",
    createGameId(Date.now())
  );
  const [solution, setSolution] = useLocalStorage(
    "solution",
    answers[gameId].toUpperCase()
  );
  const [letters, setLetters] = useState(initLetterInfo());
  const [cells, setCells] = useState(() => {
    const stored = JSON.parse(window.localStorage.getItem("cells")) ?? CELLS;
    return stored;
  });
  const [alertMessages, setAlertMessages] = useState([]);
  const [indexShaking, setIndexShaking] = useState(-1);
  const [statusFlipped, setStatusFlipped] = useState(new Array(30).fill(false));
  const [showEndScreen, setShowEndScreen] = useState(false);

  const resetGame = (id) => {
    setGameStatus("RUNNING");
    setEnteredWords(0);
    setCurrentCell(0);
    let lettersNew = new Map();
    for (let letter of EVALUATIONS) {
      lettersNew.set(letter[0], letter[1]);
    }
    setLetters(new Map(lettersNew));
    setCells(CELLS);
    window.localStorage.setItem("cells", JSON.stringify(CELLS));
    setGameId(id);
    setSolution(answers[id].toUpperCase());
    setStatusFlipped(new Array(30).fill(false));
  };

  useEffect(() => {
    window.localStorage.setItem("letterInfo", JSON.stringify([...letters]));
  }, [letters]);

  useEffect(() => {
    const lastId = Number(window.localStorage.getItem("lastGameId"));
    const currentId = createGameId(Date.now());

    if (lastId && lastId !== currentId) {
      resetGame(currentId);
    }
  }, []);

  const handleBackSpace = useCallback(() => {
    let copyCells = [...cells];
    let newCurrent = currentCell;
    if (cells[currentCell].letter !== "") {
      copyCells[currentCell].letter = "";
    } else if (currentCell % 5 !== 0) {
      copyCells[currentCell - 1].letter = "";
      newCurrent -= 1;
    }

    setCells(copyCells);
    setCurrentCell(newCurrent);
  }, [setCurrentCell, setCells, cells, currentCell]);

  const createEvalulation = useCallback(
    (guess) => {
      let copyCells = [...cells];
      let NotCorrectIndices = [];

      for (let i = 0; i < 5; i++) {
        let letter = guess.charAt(i);
        copyCells[enteredWords * 5 + i].evaluation = ABSENT;

        if (letter === solution[i]) {
          copyCells[enteredWords * 5 + i].evaluation = CORRECT;
        } else {
          NotCorrectIndices.push(i);
        }
      }

      for (let index of NotCorrectIndices) {
        let letter = solution.charAt(index);
        for (let j = 0; j < guess.length; j++) {
          if (letter === guess[j] && NotCorrectIndices.indexOf(j) > -1) {
            copyCells[enteredWords * 5 + j].evaluation = PRESENT;
            break;
          }
        }
      }
      setEnteredWords(enteredWords + 1);
      setCells(copyCells);
      window.localStorage.setItem("cells", JSON.stringify(copyCells));
      if (NotCorrectIndices.length === 0) {
        setGameStatus("WON");
        setStatistics((stats) => ({
          currentStreak: stats.currentStreak + 1,
          gamesWon: stats.gamesWon + 1,
          gamesPlayed: stats.gamesPlayed + 1,
          maxStreak:
            stats.maxStreak === stats.currentStreak
              ? stats.maxStreak + 1
              : stats.maxStreak,
          guesses: stats.guesses.map((guess, index) => {
            return index === enteredWords ? guess + 1 : guess;
          }),
        }));
        return;
      }

      if (enteredWords + 1 === MAXROUNDS) {
        setGameStatus("LOST");
        addMessage("Fail");
        setStatistics((stats) => ({
          ...stats,
          currentStreak: 0,
          gamesPlayed: stats.gamesPlayed + 1,
        }));
      } else {
        setCurrentCell((enteredWords + 1) * 5);
      }
    },
    [
      enteredWords,
      cells,
      setCells,
      solution,
      setEnteredWords,
      setStatistics,
      setGameStatus,
    ]
  );

  const handleEnter = useCallback(() => {
    let rowComplete = true;
    for (let i = 0; i < 5; i++) {
      if (cells[enteredWords * 5 + i].letter === "") {
        rowComplete = false;
        break;
      }
    }
    if (!rowComplete) {
      addMessage("Word too short", ERROR_MESSAGE_DURATION);
      setIndexShaking(enteredWords);
      return;
    }
    const guess = cells.reduce(
      (word, cell, index) =>
        (word +=
          enteredWords * 5 <= index && index < (enteredWords + 1) * 5
            ? cell.letter
            : ""),
      ""
    );

    if (
      !allowed.includes(guess.toLowerCase()) &&
      !answers.includes(guess.toLowerCase())
    ) {
      addMessage("Not a word", ERROR_MESSAGE_DURATION);
      setIndexShaking(enteredWords);
      return;
    }
    createEvalulation(guess);
  }, [cells, enteredWords, setIndexShaking, createEvalulation]);

  const handleLetterInput = useCallback(
    (letter) => {
      let copyCells = [...cells];

      copyCells[currentCell].letter = letter;
      setCells(copyCells);
      setCurrentCell((currentCell) =>
        currentCell % 5 === 4 ? currentCell : currentCell + 1
      );
    },
    [currentCell, cells, setCells, setCurrentCell]
  );

  const handleInput = useCallback(
    (input) => {
      if (gameStatus !== "RUNNING") return;
      if (input === "Backspace") {
        handleBackSpace();
      } else if (input === "Enter") {
        handleEnter();
      } else if (checkIfLetter(input)) {
        handleLetterInput(input.toUpperCase());
      }
    },
    [handleBackSpace, handleEnter, handleLetterInput, gameStatus]
  );

  const handleKeyPress = useCallback(
    (event) => {
      handleInput(event.key);
    },
    [handleInput]
  );

  useEffect(() => {
    document.addEventListener("keydown", handleKeyPress);

    return () => {
      document.removeEventListener("keydown", handleKeyPress);
    };
  }, [handleKeyPress]);

  useEffect(() => {
    window.localStorage.setItem("letterInfo", JSON.stringify([...letters]));
  }, [letters]);

  const addMessage = (message, duration) => {
    setAlertMessages((alertMessages) => [
      ...alertMessages,
      { timestamp: Date.now(), message, duration },
    ]);
  };

  const deleteMessage = (timestamp) => {
    setAlertMessages((messages) =>
      messages.filter((message) => message.timestamp !== timestamp)
    );
  };

  const handleClick = (i) => {
    if (gameStatus !== "RUNNING") return;
    if (i >= enteredWords * 5 && i < (enteredWords + 1) * 5) {
      setCurrentCell(i);
    }
  };

  const onAnimationEnd = (event, index) => {
    if (event.animationName === "shake") {
      setIndexShaking(-1);
    }

    if (event.animationName === "hide") {
      setStatusFlipped(
        statusFlipped.map((status, i) => (index === i ? true : status))
      );
    }

    if (event.animationName === "show" && index % 5 === 4) {
      updateKeyboard();
      if (gameStatus !== "RUNNING") {
        setShowEndScreen(true);
      }
    }

    if (event.animationName === "dance" && index % 5 === 4) {
      addMessage("Well done", END_SCREEN_DURATION);
    }
  };

  const updateKeyboard = () => {
    let copyLetters = new Map(letters);
    for (let i = 0; i < 5; i++) {
      let letter = cells[(enteredWords - 1) * 5 + i].letter;
      let evaluation = cells[(enteredWords - 1) * 5 + i].evaluation;
      if (evaluation > copyLetters.get(letter)) {
        copyLetters.set(letter, evaluation);
      }
    }
    console.log(copyLetters);

    setLetters(copyLetters);
  };

  return (
    <div className="select-none flex justify-center items-center flex-col max-w-lg mx-auto h-[calc(100vh-50px)] height:text-3xl pb-4">
      <div className="fixed top-3 left-1/2 z-10 -translate-x-2/4 flex flex-col-reverse">
        {alertMessages.map((message) => (
          <Alert
            show={true}
            onClose={() => deleteMessage(message.timestamp)}
            showDuration={message.duration}
            key={message.timestamp}
          >
            {message.message}
          </Alert>
        ))}
      </div>
      <div className="flex justify-center items-center grow">
        <Guesses
          cells={cells}
          onClick={handleClick}
          gameStatus={gameStatus}
          onAnimationEnd={onAnimationEnd}
          enteredWords={enteredWords}
          currentCell={currentCell}
          statusFlipped={statusFlipped}
          indexShaking={indexShaking}
          showEndScreen={showEndScreen}
          solution={solution}
        />
      </div>
      {gameStatus === "RUNNING" || !showEndScreen ? (
        <Keyboard letters={letters} onClick={handleInput} />
      ) : (
        <Countdown />
      )}
      <Modal open={showStatistics} onClose={() => setShowStatistics(false)}>
        <Statistics statistics={statistics} />
      </Modal>
    </div>
  );
};

export default Grid;
