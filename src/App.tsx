import React, { useState } from 'react';
import { useGameState } from './hooks/useGameState';
import { useGameLoop } from './hooks/useGameLoop';
import { useKeyPress } from './hooks/useKeyPress';
import { useSounds } from './hooks/useSounds';
import GameBoard from './components/GameBoard';
import ScoreBoard from './components/ScoreBoard';
import PlayerNameModal from './components/PlayerNameModal';
import GameStatus from './components/GameStatus';

function App() {
  const [showNameModal, setShowNameModal] = useState(true);
  const {
    gameState,
    updateGameState,
    resetGame,
    setPlayerName,
    startGame,
    pauseGame,
    gameOver,
    highScorePlayer,
  } = useGameState();

  const { playEatSound, playGameOverSound } = useSounds();

  const { changeDirection } = useGameLoop({
    gameState,
    updateGameState,
    gameOver,
    onEatApple: playEatSound,
    onGameOver: playGameOverSound,
  });

  const handlePause = () => {
    if (gameState.gameStatus === 'playing') {
      pauseGame();
    } else if (gameState.gameStatus === 'paused') {
      startGame();
    }
  };

  const handleRestart = () => {
    resetGame();
  };

  const handleNameSubmit = (name: string) => {
    setPlayerName(name);
    setShowNameModal(false);
    startGame();
  };

  const handleNameSkip = () => {
    setPlayerName('Anonymous');
    setShowNameModal(false);
    startGame();
  };

  const handleStart = () => {
    if (gameState.gameStatus === 'waiting') {
      startGame();
    }
  };

  useKeyPress({
    onDirectionChange: changeDirection,
    onPause: handlePause,
    onRestart: handleRestart,
    gameStatus: gameState.gameStatus,
  });

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-green-50 flex flex-col items-center justify-center p-4">
      <div className="max-w-2xl w-full">
        <h1 className="text-4xl font-bold text-center text-gray-800 mb-6">
          🐍 Snake Game
        </h1>

        <ScoreBoard
          score={gameState.score}
          highScore={gameState.highScore}
          playerName={gameState.playerName}
          highScorePlayer={highScorePlayer}
        />

        <GameStatus
          gameStatus={gameState.gameStatus}
          score={gameState.score}
          onRestart={handleRestart}
          onStart={handleStart}
          onResume={startGame}
        />

        <div className="flex justify-center">
          <GameBoard snake={gameState.snake} apple={gameState.apple} />
        </div>

        <div className="mt-6 text-center text-sm text-gray-600">
          <p className="mb-2">
            <kbd className="px-2 py-1 text-xs font-semibold text-gray-800 bg-gray-100 border border-gray-200 rounded-lg">↑↓←→</kbd>
            {' or '}
            <kbd className="px-2 py-1 text-xs font-semibold text-gray-800 bg-gray-100 border border-gray-200 rounded-lg">WASD</kbd>
            {' to move'}
          </p>
          <p>
            <kbd className="px-2 py-1 text-xs font-semibold text-gray-800 bg-gray-100 border border-gray-200 rounded-lg">Space</kbd>
            {' to pause • '}
            <kbd className="px-2 py-1 text-xs font-semibold text-gray-800 bg-gray-100 border border-gray-200 rounded-lg">Enter</kbd>
            {' to restart'}
          </p>
        </div>
      </div>

      <PlayerNameModal
        isOpen={showNameModal}
        onSubmit={handleNameSubmit}
        onSkip={handleNameSkip}
      />
    </div>
  );
}

export default App;
