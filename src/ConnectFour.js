import React, { useState, useEffect } from "react";
import "./App.css";

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
    switchPlayer();
  };

  const switchPlayer = () => {
    setCurrentPlayer(currentPlayer === "red" ? "yellow" : "red");
  };

  const checkWinner = (board) => {
    // Check for a winner horizontally, vertically, and diagonally
    // (same logic as before)
  };

  const computerMove = () => {
    // Simple AI: Choose a random valid move for the computer
    const validMoves = [];
    for (let col = 0; col < COLUMNS; col++) {
      if (!board[0][col]) {
        validMoves.push(col);
      }
    }

    if (validMoves.length > 0) {
      const randomColumn =
        validMoves[Math.floor(Math.random() * validMoves.length)];
      dropDisc(randomColumn);
    }
  };

  useEffect(() => {
    if (currentPlayer === "yellow") {
      // If it's the computer's turn, make a move after a short delay
      const delay = setTimeout(() => {
        computerMove();
      }, 500); // Adjust the delay as needed
      return () => clearTimeout(delay);
    }
  }, [currentPlayer, board]);

  useEffect(() => {
    checkWinner(board);
  }, [board]);

  const renderMessage = () => {
    if (winner) {
      return <p>{winner} wins!</p>;
    } else {
      return <p>{currentPlayer === "red" ? "Your turn" : "Computer's turn"}</p>;
    }
  };

  return (
    <div className="container">
      <h2>Connect Four</h2>
      {renderMessage()}
      {board.map((row, rowIndex) => (
        <div key={rowIndex} className="row">
          {row.map((cell, colIndex) => (
            <div
              key={colIndex}
              className="cell"
              onClick={() => currentPlayer === "red" && dropDisc(colIndex)}
              style={{ backgroundColor: cell }}
            ></div>
          ))}
        </div>
      ))}
    </div>
  );
};

export default ConnectFour;
