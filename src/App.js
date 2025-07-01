import React, { useState } from "react";
import "./App.css";

const initialBoard = Array(9).fill(null).map(() => Array(9).fill(""));
const hints = [
  "Prime", "Even", "Odd", "<5", ">5", "Multiple of 3", "!= 5", "Square Number", "<= 7"
];

const validateHint = (hint, value) => {
  value = parseInt(value);
  if (!value || value < 1 || value > 9) return false;
  switch (hint) {
    case "Prime": return [2, 3, 5, 7].includes(value);
    case "Even": return value % 2 === 0;
    case "Odd": return value % 2 !== 0;
    case "<5": return value < 5;
    case ">5": return value > 5;
    case "Multiple of 3": return value % 3 === 0;
    case "!= 5": return value !== 5;
    case "Square Number": return [1, 4, 9].includes(value);
    case "<= 7": return value <= 7;
    default: return true;
  }
};

function App() {
  const [board, setBoard] = useState(initialBoard);
  const [selectedCell, setSelectedCell] = useState(null);

  const handleCellClick = (r, c) => {
    setSelectedCell([r, c]);
  };

  const handleNumberClick = (n) => {
    if (!selectedCell) return;
    const [r, c] = selectedCell;
    const newBoard = board.map(row => [...row]);
    newBoard[r][c] = n;
    setBoard(newBoard);
  };

  return (
    <div className="container">
      <h1>Pattern Sudoku</h1>
      <div className="grid">
        {board.map((row, r) =>
          row.map((val, c) => (
            <div
              key={`${r}-${c}`}
              className={`cell ${selectedCell?.[0] === r && selectedCell?.[1] === c ? 'selected' : ''}`}
              onClick={() => handleCellClick(r, c)}
            >
              {val}
            </div>
          ))
        )}
      </div>
      <div className="number-pad">
        {[1,2,3,4,5,6,7,8,9].map(n => (
          <button key={n} onClick={() => handleNumberClick(n)}>{n}</button>
        ))}
      </div>
      <div className="hints">
        {hints.map((hint, i) => <div key={i} className="hint">{hint}</div>)}
      </div>
    </div>
  );
}

export default App;