import React, { useEffect, useState, useRef, useCallback } from "react";

const WORDS = ["REACT", "ROUTE", "SPLIT", "HELLO", "FRAME"];
const ROWS = 6;
const COLUMNS = 5;

const initialKeyboardMap = Object.fromEntries(
  "ABCDEFGHIJKLMNOPQRSTUVWXYZ".split("").map((k) => [k, "default"])
);

const colorMap = {
  correct: "green",
  incorrect: "grey",
  "semi-correct": "yellow",
  default: "lightgrey",
};

const gameStateMap = {
  LOST: "lost",
  IN_PROGRESS: "in-progress",
  WON: "won",
};

function isValidKey(key) {
  return (
    key === "Enter" ||
    key === "Backspace" ||
    (key.length === 1 && /^[A-Z]$/.test(key.toUpperCase()))
  );
}

// ==== Cell Component ====
const Cell = React.memo(({ value, state }) => (
  <div
    style={{
      width: 50,
      height: 50,
      border: "1px solid black",
      background: colorMap[state],
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
      fontSize: 24,
      fontWeight: "bold",
      textTransform: "uppercase",
    }}
  >
    {value}
  </div>
));

// ==== Row Component ====
const Row = React.memo(({ row }) => (
  <div style={{ display: "flex", gap: 2 }}>
    {row.map((cell, idx) => (
      <Cell key={idx} {...cell} />
    ))}
  </div>
));

// ==== Board Component ====
const Board = ({ inputState }) => {
  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 2 }}>
      {inputState.map((row, i) => (
        <Row key={i} row={row} />
      ))}
    </div>
  );
};

// ==== Keyboard Component ====
const Keyboard = ({ keyboardMap, onKeyPress }) => {
  const layout = [
    ["Q", "W", "E", "R", "T", "Y", "U", "I", "O", "P"],
    ["A", "S", "D", "F", "G", "H", "J", "K", "L"],
    ["Enter", "Z", "X", "C", "V", "B", "N", "M", "Backspace"],
  ];

  return (
    <div style={{ marginTop: 8 }}>
      {layout.map((row, i) => (
        <div
          key={`row-${i}`}
          style={{
            display: "flex",
            justifyContent: "center",
            gap: 5,
            marginBottom: 5,
          }}
        >
          {row.map((key) => (
            <button
              key={key}
              style={{
                padding: "10px 12px",
                background: colorMap[keyboardMap[key] || "default"],
                borderRadius: 4,
                cursor: "pointer",
                border: "1px solid #999",
                textTransform: "uppercase",
                fontWeight: "bold",
              }}
              onClick={() => onKeyPress(key)}
              aria-label={`Key ${key}`}
            >
              {key === "Backspace" ? "⌫" : key}
            </button>
          ))}
        </div>
      ))}
    </div>
  );
};

export default function Wordle() {
  const magicWord = useRef(
    WORDS[Math.floor(Math.random() * WORDS.length)].toUpperCase()
  ).current;

  const [inputState, setInputState] = useState(
    Array.from({ length: ROWS }, () =>
      Array.from({ length: COLUMNS }, () => ({ value: "", state: "default" }))
    )
  );

  const [keyboardMap, setKeyboardMap] = useState(initialKeyboardMap);
  const [cursor, setCursor] = useState([0, 0]);
  const [gameState, setGameState] = useState(gameStateMap.IN_PROGRESS);

  const updateKeyboardMap = useCallback((key, state) => {
    setKeyboardMap((prev) => {
      if (prev[key] === "correct") return prev;
      return { ...prev, [key]: state };
    });
  }, []);

  const checkWord = useCallback(() => {
    const [row] = cursor;
    const guess = inputState[row].map((cell) => cell.value).join("");

    const updatedRow = inputState[row].map((cell, i) => {
      const val = cell.value;
      if (magicWord[i] === val) {
        updateKeyboardMap(val, "correct");
        return { ...cell, state: "correct" };
      } else if (magicWord.includes(val)) {
        updateKeyboardMap(val, "semi-correct");
        return { ...cell, state: "semi-correct" };
      } else {
        updateKeyboardMap(val, "incorrect");
        return { ...cell, state: "incorrect" };
      }
    });

    setInputState((prev) => {
      const temp = [...prev];
      temp[row] = updatedRow;
      return temp;
    });

    if (guess === magicWord) {
      setGameState(gameStateMap.WON);
    } else if (row === ROWS - 1) {
      setGameState(gameStateMap.LOST);
    } else {
      setCursor([row + 1, 0]);
    }
  }, [cursor, inputState, updateKeyboardMap, magicWord]);

  const handleKeyPress = useCallback(
    (key) => {
      if (!isValidKey(key) || gameState !== gameStateMap.IN_PROGRESS) return;

      setInputState((prev) => {
        const temp = prev.map((r) => r.map((c) => ({ ...c })));
        const [row, col] = cursor;

        if (key === "Backspace") {
          if (col > 0) {
            temp[row][col - 1].value = "";
            setCursor([row, col - 1]);
          }
        } else if (key === "Enter") {
          if (col === COLUMNS) checkWord();
        } else {
          if (col < COLUMNS) {
            temp[row][col].value = key.toUpperCase();
            setCursor([row, col + 1]);
          }
        }

        return temp;
      });
    },
    [cursor, gameState, checkWord]
  );

  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.altKey || e.metaKey || e.ctrlKey || e.shiftKey) return;
      handleKeyPress(e.key);
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [handleKeyPress]);

  const handleRestart = () => {
    setInputState(
      Array.from({ length: ROWS }, () =>
        Array.from({ length: COLUMNS }, () => ({ value: "", state: "default" }))
      )
    );
    setKeyboardMap(initialKeyboardMap);
    setCursor([0, 0]);
    setGameState(gameStateMap.IN_PROGRESS);
  };

  return (
    <div style={{ textAlign: "center", padding: 20 }}>
      <h1>Wordle Clone</h1>
      <div style={{ marginBottom: 12 }}>
        <strong>Magic Word:</strong> {magicWord}
      </div>

      <Board inputState={inputState} />
      <Keyboard keyboardMap={keyboardMap} onKeyPress={handleKeyPress} />

      <button
        onClick={handleRestart}
        style={{
          marginTop: 20,
          padding: "10px 16px",
          background: "black",
          color: "white",
          border: "none",
          borderRadius: 4,
          cursor: "pointer",
        }}
      >
        Restart
      </button>

      <div style={{ marginTop: 10, fontSize: 18 }}>
        {gameState === gameStateMap.WON && "🎉 You won!"}
        {gameState === gameStateMap.LOST &&
          `💀 You lost! Word was: ${magicWord}`}
      </div>
    </div>
  );
}
