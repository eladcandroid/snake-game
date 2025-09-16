import React from 'react';
import type { Position } from '../types/game';
import { GAME_SETTINGS } from '../utils/gameUtils';

interface GameBoardProps {
  snake: Position[];
  orange: Position;
}

const GameBoard: React.FC<GameBoardProps> = ({ snake, orange }) => {
  const { boardWidth, boardHeight, cellSize } = GAME_SETTINGS;

  const renderCell = (x: number, y: number) => {
    const isSnakeHead = snake[0]?.x === x && snake[0]?.y === y;
    const isSnakeBody = snake.slice(1).some(segment => segment.x === x && segment.y === y);
    const isOrange = orange.x === x && orange.y === y;

    let cellClass = 'border border-gray-300';
    let content = '';

    if (isSnakeHead) {
      cellClass += ' bg-green-600';
      content = '🐍';
    } else if (isSnakeBody) {
      cellClass += ' bg-green-400';
    } else if (isOrange) {
      cellClass += ' bg-orange-100';
      content = '🍊';
    } else {
      cellClass += ' bg-gray-100';
    }

    return (
      <div
        key={`${x}-${y}`}
        className={`${cellClass} flex items-center justify-center text-lg`}
        style={{
          width: `${cellSize}px`,
          height: `${cellSize}px`,
        }}
      >
        {content}
      </div>
    );
  };

  const renderBoard = () => {
    const cells = [];
    for (let y = 0; y < boardHeight; y++) {
      for (let x = 0; x < boardWidth; x++) {
        cells.push(renderCell(x, y));
      }
    }
    return cells;
  };

  return (
    <div
      className="inline-grid gap-0 border-2 border-gray-800 bg-white"
      style={{
        gridTemplateColumns: `repeat(${boardWidth}, ${cellSize}px)`,
        gridTemplateRows: `repeat(${boardHeight}, ${cellSize}px)`,
      }}
    >
      {renderBoard()}
    </div>
  );
};

export default GameBoard;