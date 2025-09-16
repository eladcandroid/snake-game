import React from 'react';

interface ScoreBoardProps {
  score: number;
  highScore: number;
  playerName: string;
  highScorePlayer: string;
}

const ScoreBoard: React.FC<ScoreBoardProps> = ({
  score,
  highScore,
  playerName,
  highScorePlayer,
}) => {
  return (
    <div className="bg-white rounded-lg shadow-lg p-6 mb-4">
      <div className="grid grid-cols-2 gap-6">
        <div className="text-center">
          <h3 className="text-lg font-semibold text-gray-700 mb-2">Current Game</h3>
          <div className="space-y-1">
            <p className="text-sm text-gray-600">Player: {playerName || 'Anonymous'}</p>
            <p className="text-2xl font-bold text-blue-600">{score}</p>
            <p className="text-xs text-gray-500">Score</p>
          </div>
        </div>
        <div className="text-center">
          <h3 className="text-lg font-semibold text-gray-700 mb-2">High Score</h3>
          <div className="space-y-1">
            <p className="text-sm text-gray-600">Player: {highScorePlayer}</p>
            <p className="text-2xl font-bold text-yellow-600">{highScore}</p>
            <p className="text-xs text-gray-500">Best Score</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ScoreBoard;