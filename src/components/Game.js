import React, { useState, useEffect } from 'react';
import Board from './Board';
import './Game.css';

const Game = () => {
  const [squares, setSquares] = useState(Array(9).fill(null));
  const [isBlueNext, setIsBlueNext] = useState(true);
  const [blueScore, setBlueScore] = useState(() => parseInt(localStorage.getItem('blueScore')) || 0);
  const [redScore, setRedScore] = useState(() => parseInt(localStorage.getItem('redScore')) || 0);

  const winner = calculateWinner(squares);

  useEffect(() => {
    if (winner === 'Blue') {
      setBlueScore(blueScore + 1);
    } else if (winner === 'Red') {
      setRedScore(redScore + 1);
    }
  }, [winner]);

  useEffect(() => {
    localStorage.setItem('blueScore', blueScore);
    localStorage.setItem('redScore', redScore);
  }, [blueScore, redScore]);

  const handleClick = (i) => {
    if (squares[i] || winner) {
      return;
    }
    const newSquares = squares.slice();
    newSquares[i] = isBlueNext ? 'Blue' : 'Red';
    setSquares(newSquares);
    setIsBlueNext(!isBlueNext);
  };

  const handleReset = () => {
    setSquares(Array(9).fill(null));
    setIsBlueNext(true);
  };

  return (
    <div className="game">
      <div className="score-board">
        <div className="score blue">Blue: {blueScore}</div>
        <div className="score red">Red: {redScore}</div>
      </div>
      <Board squares={squares} onClick={handleClick} />
      <div className="status">{winner ? `Winner: ${winner}` : `Next player: ${isBlueNext ? 'Blue' : 'Red'}`}</div>
      <button className="reset-button" onClick={handleReset}>Reset Game</button>
    </div>
  );
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

export default Game;
