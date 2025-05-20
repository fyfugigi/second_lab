import React, { useState } from 'react';
import Cell from './components/Cell';
import './App.css';

interface GameState {
  board: ('X' | 'O' | null)[];
  currentPlayer: 'X' | 'O';
  winner: 'X' | 'O' | null;
}

const App: React.FC = () => {

  const [gameState, setGameState] = useState<GameState>({
    board: Array(9).fill(null),
    currentPlayer: 'X',
    winner: null,
  });

  const handleClick = (index: number) => {
    if (gameState.winner || gameState.board[index]) {
      return;
    }
    const newBoard = [...gameState.board];
    newBoard[index] = gameState.currentPlayer;

    const newWinner = calculateWinner(newBoard);

    setGameState({
      board: newBoard,
      currentPlayer: gameState.currentPlayer === 'X' ? 'O' : 'X',
      winner: newWinner,
    });
  };
  const calculateWinner = (board: ('X' | 'O' | null)[]): 'X' | 'O' | null => {
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
      if (board[a] && board[a] === board[b] && board[a] === board[c]) {
        return board[a];
      }
    }
    return null;
  };

  const handleReset = () => {

    setGameState({
      board: Array(9).fill(null),
      currentPlayer: 'X',
      winner: null,
    });
  };

  const renderCell = (index: number) => {
    return (
      <Cell
        value={gameState.board[index]}
        onClick={() => handleClick(index)}
        key={index}
      />
    );
  };
  let status;
  if (gameState.winner) {
    status = `Переможець: ${gameState.winner}`;
  }
  else if (gameState.board.every((cell) => cell !== null)) {
    status = 'Нічия!';
  }
  else {
    status = `Черга ходу - ${gameState.currentPlayer}`;
  }
  return (
    <div className="game">
      <h1>Гра - "Хрестики-нулики"</h1>
      <div className="game-board">
        {gameState.board.map((_, index) => renderCell(index))}
      </div>
      <div className="game-info">
        <div>{status}</div>
        <button onClick={handleReset}>Розпочати знову</button>
      </div>
    </div>
  );
};

export default App;