import React, { useState, useEffect } from 'react';
import Board from './Board';
import './Game.css';

const Game = () => {
  const initialScore = JSON.parse(localStorage.getItem('ticTacToeScore')) || { blue: 0, red: 0 };
  const [squares, setSquares] = useState(Array(9).fill(null));
  const [xIsNext, setXIsNext] = useState(true);
  const [score, setScore] = useState(initialScore);

  useEffect(() => {
    const storedScore = JSON.parse(localStorage.getItem('ticTacToeScore'));
    if (storedScore) {
      setScore(storedScore);
    }
  }, []);

  useEffect(() => {
    localStorage.setItem('ticTacToeScore', JSON.stringify(score));
  }, [score]);

  const handleClick = (i) => {
    const squaresCopy = squares.slice();
    if (calculateWinner(squaresCopy) || squaresCopy[i]) {
      return;
    }
    squaresCopy[i] = xIsNext ? 'blue' : 'red';
    setSquares(squaresCopy);
    setXIsNext(!xIsNext);
  };

  const calculateWinner = (squares) => {
    const lines = [
      [0, 1, 2],
      [3, 4, 5],
      [6, 7, 8],
      [0, 3, 6],
      [1, 4, 7],
      [2, 5, 8],
      [0, 4, 8],
      [2, 4, 6],
    ];
    for (let i = 0; i < lines.length; i++) {
      const [a, b, c] = lines[i];
      if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
        return squares[a];
      }
    }
    return null;
  };

  const winner = calculateWinner(squares);
  let status;
  if (winner) {
    status = `Winner: ${winner}`;
    setTimeout(() => {
      setSquares(Array(9).fill(null));
      setScore((prevScore) => ({
        ...prevScore,
        [winner]: prevScore[winner] + 1,
      }));
    }, 1000);
  } else {
    status = `Next player: ${xIsNext ? 'blue' : 'red'}`;
  }

  return (
    <div className="game">
      <div className="score-board">
        <div className="score blue-score">Blue: {score.blue}</div>
        <div className="score red-score">Red: {score.red}</div>
      </div>
      <div className="game-board">
        <Board squares={squares} onClick={handleClick} />
      </div>
      <div className="game-info">
        <div className="status">{status}</div>
      </div>
    </div>
  );
};

export default Game;
