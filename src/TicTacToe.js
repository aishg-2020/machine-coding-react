import { useState } from "react";

export default function TicTacToe({ N }) {
  const [board, setBoard] = useState(
    Array.from({ length: N }, (_, i) =>
      Array.from({ length: N }, (_, i) => null)
    )
  );
  const [currentPlayer, setCurrentPlayer] = useState("X");
  const [gameState, setGameState] = useState("in-progress");
  const reset = () => {
    setBoard(
      Array.from({ length: N }, (_, i) =>
        Array.from({ length: N }, (_, i) => null)
      )
    );
    setCurrentPlayer("X");
    setGameState("in-progress");
  };
  const toggleCurrentPlayer = () => {
    setCurrentPlayer((prev) => (prev === "X" ? "O" : "X"));
  };
  const makeMove = (row, col, currentPlayerTemp) => {
    if (board[row][col]) return; // prevent overwriting

    const updatedBoard = board.map((r, i) =>
      r.map((cell, j) => (i === row && j === col ? currentPlayerTemp : cell))
    );

    if (checkWinner(updatedBoard, row, col, currentPlayerTemp)) {
      setGameState("completed");
    } else {
      toggleCurrentPlayer();
    }

    setBoard(updatedBoard);
  };

  const checkWinner = (board, row, col, currentPlayer) => {
    // check row
    console.log("currentPlayer", currentPlayer, row, col, board);
    console.log(
      "board row check",
      board[row].every((item) => item === currentPlayer)
    );
    if (board[row].every((cell) => cell === currentPlayer)) return true;

    //check col
    if (board.every((r) => r[col] === currentPlayer)) return true;

    //check main diag
    let diag = true;
    for (let i = 0; i < N; i++) {
      diag = diag && board[i][i] === currentPlayer;
    }
    if (diag && row === col) {
      return true;
    }

    //check anti diag
    let antiDiag = true;
    for (let i = 0; i < N; i++) {
      antiDiag = antiDiag && board[i][N - i - 1] === currentPlayer;
    }
    if (antiDiag && row + col === N - 1) {
      return true;
    }

    return false;
  };

  return (
    <div>
      <div>{gameState === "completed" ? `${currentPlayer} Wins` : ""}</div>
      <div
        style={{
          display: "grid",
          gridAutoRows: `repeat(${N},1fr)`,
          gridTemplateColumns: `repeat(${N}, 100px)`,
        }}
      >
        {board.map((row, i) =>
          row.map((col, j) => (
            <div
              key={`${i}-${j}`}
              style={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                border: "1px solid black",
                width: 100,
                height: 100,
                cursor:
                  col === null && gameState !== "completed"
                    ? "pointer"
                    : "default",
                fontSize: 24,
              }}
              onClick={() => {
                if (gameState !== "completed") makeMove(i, j, currentPlayer);
              }}
            >
              {col}
            </div>
          ))
        )}
      </div>
      <button onClick={reset}>Reset</button>
    </div>
  );
}
