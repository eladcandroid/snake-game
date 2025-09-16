import { useEffect, useRef, useCallback } from 'react';
import type { GameState, Direction } from '../types/game';
import {
  moveSnake,
  checkCollision,
  checkAppleCollision,
  growSnake,
  generateRandomApple,
  saveHighScore,
  getOppositeDirection,
  GAME_SETTINGS,
} from '../utils/gameUtils';

interface UseGameLoopProps {
  gameState: GameState;
  updateGameState: (updates: Partial<GameState>) => void;
  gameOver: () => void;
  onEatApple?: () => void;
  onGameOver?: () => void;
}

export const useGameLoop = ({
  gameState,
  updateGameState,
  gameOver,
  onEatApple,
  onGameOver,
}: UseGameLoopProps) => {
  const gameLoopRef = useRef<NodeJS.Timeout>();

  const tick = useCallback(() => {
    if (gameState.gameStatus !== 'playing') return;

    const newSnake = moveSnake(gameState.snake, gameState.direction);

    if (checkCollision(newSnake)) {
      saveHighScore(gameState.score, gameState.playerName);
      gameOver();
      onGameOver?.();
      return;
    }

    if (checkAppleCollision(newSnake, gameState.apple)) {
      const grownSnake = growSnake(newSnake);
      const newApple = generateRandomApple(grownSnake);
      const newScore = gameState.score + 10;
      const newSpeed = Math.max(
        gameState.speed - GAME_SETTINGS.speedIncrease,
        50
      );

      updateGameState({
        snake: grownSnake,
        apple: newApple,
        score: newScore,
        speed: newSpeed,
        highScore: Math.max(gameState.highScore, newScore),
      });

      onEatApple?.();
    } else {
      updateGameState({ snake: newSnake });
    }
  }, [gameState, updateGameState, gameOver, onEatApple, onGameOver]);

  useEffect(() => {
    if (gameState.gameStatus === 'playing') {
      gameLoopRef.current = setInterval(tick, gameState.speed);
    } else {
      if (gameLoopRef.current) {
        clearInterval(gameLoopRef.current);
      }
    }

    return () => {
      if (gameLoopRef.current) {
        clearInterval(gameLoopRef.current);
      }
    };
  }, [tick, gameState.speed, gameState.gameStatus]);

  const changeDirection = useCallback((newDirection: Direction) => {
    if (gameState.gameStatus !== 'playing') return;
    
    // Prevent reversing into itself
    if (newDirection === getOppositeDirection(gameState.direction)) return;
    
    updateGameState({ direction: newDirection });
  }, [gameState.direction, gameState.gameStatus, updateGameState]);

  return {
    changeDirection,
  };
};