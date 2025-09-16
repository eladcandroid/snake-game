import React from 'react';

interface GameStatusProps {
  gameStatus: 'waiting' | 'playing' | 'paused' | 'gameOver';
  score: number;
  onRestart: () => void;
  onStart: () => void;
  onResume: () => void;
}

const GameStatus: React.FC<GameStatusProps> = ({
  gameStatus,
  score,
  onRestart,
  onStart,
  onResume,
}) => {
  const renderStatusContent = () => {
    switch (gameStatus) {
      case 'waiting':
        return (
          <div className="text-center">
            <h2 className="text-2xl font-bold text-gray-800 mb-4">
              Ready to Play?
            </h2>
            <p className="text-gray-600 mb-6">
              Use arrow keys or WASD to control your snake and eat the oranges!
            </p>
            <button
              onClick={onStart}
              className="bg-green-600 text-white py-3 px-6 rounded-lg hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2 transition-colors font-semibold"
            >
              Start Game
            </button>
          </div>
        );

      case 'paused':
        return (
          <div className="text-center">
            <h2 className="text-2xl font-bold text-gray-800 mb-4">
              Game Paused
            </h2>
            <p className="text-gray-600 mb-6">
              Current Score: {score}
            </p>
            <div className="space-x-4">
              <button
                onClick={onResume}
                className="bg-blue-600 text-white py-3 px-6 rounded-lg hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-colors font-semibold"
              >
                Resume
              </button>
              <button
                onClick={onRestart}
                className="bg-gray-600 text-white py-3 px-6 rounded-lg hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-offset-2 transition-colors font-semibold"
              >
                Restart
              </button>
            </div>
          </div>
        );

      case 'gameOver':
        return (
          <div className="text-center">
            <h2 className="text-2xl font-bold text-red-600 mb-4">
              Game Over!
            </h2>
            <p className="text-gray-600 mb-2">
              Final Score: <span className="font-bold text-lg">{score}</span>
            </p>
            <p className="text-gray-500 mb-6">
              Better luck next time!
            </p>
            <button
              onClick={onRestart}
              className="bg-green-600 text-white py-3 px-6 rounded-lg hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2 transition-colors font-semibold"
            >
              Play Again
            </button>
          </div>
        );

      case 'playing':
        return (
          <div className="text-center">
            <p className="text-gray-600">
              Press <kbd className="px-2 py-1 text-xs font-semibold text-gray-800 bg-gray-100 border border-gray-200 rounded-lg">Space</kbd> to pause
            </p>
          </div>
        );

      default:
        return null;
    }
  };

  return (
    <div className="bg-white rounded-lg shadow-lg p-6 mb-4">
      {renderStatusContent()}
    </div>
  );
};

export default GameStatus;