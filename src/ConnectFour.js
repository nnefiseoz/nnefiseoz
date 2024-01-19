import React, { useState, useEffect } from "react";
import "./App.css"; // Import the CSS file

const ROWS = 6;
const COLUMNS = 7;

const initialBoard = Array.from({ length: ROWS }, () =>
  Array(COLUMNS).fill(null)
);

const ConnectFour = () => {
  const [board, setBoard] = useState(initialBoard);
  const [currentPlayer, setCurrentPlayer] = useState("red");
  const [winner, setWinner] = useState(null);

  const dropDisc = (column) => {
    if (winner || board[0][column]) return;

    const newBoard = [...board];
    for (let row = ROWS - 1; row >= 0; row--) {
      if (!newBoard[row][column]) {
        newBoard[row][column] = currentPlayer;
        break;
      }
    }

    setBoard(newBoard);
    checkWinner(newBoard);
    setCurrentPlayer(currentPlayer === "red" ? "yellow" : "red");
  };

  const checkWinner = (board) => {
    // Check for a winner horizontally
    for (let row = 0; row < ROWS; row++) {
      for (let col = 0; col < COLUMNS - 3; col++) {
        if (
          board[row][col] &&
          board[row][col] === board[row][col + 1] &&
          board[row][col] === board[row][col + 2] &&
          board[row][col] === board[row][col + 3]
        ) {
          setWinner(board[row][col]);
          return;
        }
      }
    }

    // Check for a winner vertically
    for (let col = 0; col < COLUMNS; col++) {
      for (let row = 0; row < ROWS - 3; row++) {
        if (
          board[row][col] &&
          board[row][col] === board[row + 1][col] &&
          board[row][col] === board[row + 2][col] &&
          board[row][col] === board[row + 3][col]
        ) {
          setWinner(board[row][col]);
          return;
        }
      }
    }

    // Check for a winner diagonally (from top-left to bottom-right)
    for (let row = 0; row < ROWS - 3; row++) {
      for (let col = 0; col < COLUMNS - 3; col++) {
        if (
          board[row][col] &&
          board[row][col] === board[row + 1][col + 1] &&
          board[row][col] === board[row + 2][col + 2] &&
          board[row][col] === board[row + 3][col + 3]
        ) {
          setWinner(board[row][col]);
          return;
        }
      }
    }

    // Check for a winner diagonally (from top-right to bottom-left)
    for (let row = 0; row < ROWS - 3; row++) {
      for (let col = 3; col < COLUMNS; col++) {
        if (
          board[row][col] &&
          board[row][col] === board[row + 1][col - 1] &&
          board[row][col] === board[row + 2][col - 2] &&
          board[row][col] === board[row + 3][col - 3]
        ) {
          setWinner(board[row][col]);
          return;
        }
      }
    }
  };

  useEffect(() => {
    // Additional logic can be added here for other winning conditions (vertical, diagonal)
    // ...
  }, [board]);

  return (
    <div>
      <h2>Connect Four</h2>
      {winner ? (
        <div>
          <p>{winner} wins!</p>
        </div>
      ) : (
        <div>
          {board.map((row, rowIndex) => (
            <div key={rowIndex} className="row">
              {row.map((cell, colIndex) => (
                <div
                  key={colIndex}
                  className="cell"
                  onClick={() => dropDisc(colIndex)}
                  style={{ backgroundColor: cell }}
                ></div>
              ))}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default ConnectFour;
