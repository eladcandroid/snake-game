import { useState, useCallback } from 'react';
import type { GameState, Direction } from '../types/game';
import {
  getInitialSnake,
  generateRandomOrange,
  GAME_SETTINGS,
  getHighScore,
} from '../utils/gameUtils';

export const useGameState = () => {
  const initialSnake = getInitialSnake();
  const { score: highScore, playerName: highScorePlayer } = getHighScore();

  const [gameState, setGameState] = useState<GameState>({
    snake: initialSnake,
    orange: generateRandomOrange(initialSnake),
    direction: 'RIGHT',
    score: 0,
    highScore,
    gameStatus: 'waiting',
    playerName: '',
    speed: GAME_SETTINGS.initialSpeed,
  });

  const updateGameState = useCallback((updates: Partial<GameState>) => {
    setGameState(prev => ({ ...prev, ...updates }));
  }, []);

  const resetGame = useCallback(() => {
    const newSnake = getInitialSnake();
    setGameState(prev => ({
      ...prev,
      snake: newSnake,
      orange: generateRandomOrange(newSnake),
      direction: 'RIGHT',
      score: 0,
      gameStatus: 'waiting',
      speed: GAME_SETTINGS.initialSpeed,
    }));
  }, []);

  const setDirection = useCallback((direction: Direction) => {
    setGameState(prev => ({ ...prev, direction }));
  }, []);

  const setPlayerName = useCallback((name: string) => {
    setGameState(prev => ({ ...prev, playerName: name }));
  }, []);

  const startGame = useCallback(() => {
    setGameState(prev => ({ ...prev, gameStatus: 'playing' }));
  }, []);

  const pauseGame = useCallback(() => {
    setGameState(prev => ({ ...prev, gameStatus: 'paused' }));
  }, []);

  const gameOver = useCallback(() => {
    setGameState(prev => ({ ...prev, gameStatus: 'gameOver' }));
  }, []);

  return {
    gameState,
    updateGameState,
    resetGame,
    setDirection,
    setPlayerName,
    startGame,
    pauseGame,
    gameOver,
    highScorePlayer,
  };
};