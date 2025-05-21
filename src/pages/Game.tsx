import React, { useState } from 'react';
import { useTheme } from '../context/ThemeContext';
import Cell from '../components/Cell';

type Player = 'P1' | 'P2';
type CellValue = Player | null;

const symbols: Record<string, Record<Player, string>> = {
  space: { P1: '🧑‍🚀', P2: '👽' },
  fantasy: { P1: '🧙‍♂️', P2: '🐉' },
  classic: { P1: '❌', P2: '⭕' },
};

const Game: React.FC = () => {
  const { theme } = useTheme();
  const [board, setBoard] = useState<CellValue[]>(Array(9).fill(null));
  const [currentPlayer, setCurrentPlayer] = useState<Player>('P1');
  const [winner, setWinner] = useState<CellValue>(null);

  const handleClick = (index: number) => {
    if (board[index] || winner) return;
    const newBoard = [...board];
    newBoard[index] = currentPlayer;
    setBoard(newBoard);
    const win = calculateWinner(newBoard);
    if (win) {
      setWinner(win);
    } else if (newBoard.every(cell => cell !== null)) {
      setWinner(null); 
    } else {
      setCurrentPlayer(currentPlayer === 'P1' ? 'P2' : 'P1');
    }
  };

  const calculateWinner = (b: CellValue[]): CellValue => {
    const lines = [
      [0, 1, 2], [3, 4, 5], [6, 7, 8],
      [0, 3, 6], [1, 4, 7], [2, 5, 8],
      [0, 4, 8], [2, 4, 6],
    ];
    for (const [a, b1, c] of lines) {
      if (b[a] && b[a] === b[b1] && b[a] === b[c]) return b[a];
    }
    return null;
  };

  const handleReset = () => {
    setBoard(Array(9).fill(null));
    setCurrentPlayer('P1');
    setWinner(null);
  };

  const themeStyle = `game ${theme}`;

  return (
    <div className={themeStyle}>
      <h1>Гра: {theme.toUpperCase()}</h1>
      <div className="game-board">
        {board.map((val, idx) => (
          <Cell
            key={idx}
            value={val ? symbols[theme][val] : null}
            onClick={() => handleClick(idx)}
          />
        ))}
      </div>
      <div className="game-info">
        {winner
          ? `Переможець: ${symbols[theme][winner]}`
          : board.every(cell => cell !== null)
            ? 'Нічия!'
            : `Хід: ${symbols[theme][currentPlayer]}`}
        <button onClick={handleReset}>Грати знову</button>
      </div>
    </div>
  );
};

export default Game;
