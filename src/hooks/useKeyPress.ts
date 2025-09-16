import { useEffect } from 'react';
import type { Direction } from '../types/game';

interface UseKeyPressProps {
  onDirectionChange: (direction: Direction) => void;
  onPause: () => void;
  onRestart: () => void;
  gameStatus: string;
}

export const useKeyPress = ({
  onDirectionChange,
  onPause,
  onRestart,
  gameStatus,
}: UseKeyPressProps) => {
  useEffect(() => {
    const handleKeyPress = (event: KeyboardEvent) => {
      event.preventDefault();

      switch (event.key) {
        case 'ArrowUp':
        case 'w':
        case 'W':
          onDirectionChange('UP');
          break;
        case 'ArrowDown':
        case 's':
        case 'S':
          onDirectionChange('DOWN');
          break;
        case 'ArrowLeft':
        case 'a':
        case 'A':
          onDirectionChange('LEFT');
          break;
        case 'ArrowRight':
        case 'd':
        case 'D':
          onDirectionChange('RIGHT');
          break;
        case ' ':
        case 'Escape':
          if (gameStatus === 'playing' || gameStatus === 'paused') {
            onPause();
          }
          break;
        case 'Enter':
        case 'r':
        case 'R':
          if (gameStatus === 'gameOver' || gameStatus === 'waiting') {
            onRestart();
          }
          break;
      }
    };

    window.addEventListener('keydown', handleKeyPress);
    return () => window.removeEventListener('keydown', handleKeyPress);
  }, [onDirectionChange, onPause, onRestart, gameStatus]);
};