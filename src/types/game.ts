export interface Position {
  x: number;
  y: number;
}

export type Direction = 'UP' | 'DOWN' | 'LEFT' | 'RIGHT';

export interface GameState {
  snake: Position[];
  apple: Position;
  direction: Direction;
  score: number;
  highScore: number;
  gameStatus: 'waiting' | 'playing' | 'paused' | 'gameOver';
  playerName: string;
  speed: number;
}

export interface GameSettings {
  boardWidth: number;
  boardHeight: number;
  cellSize: number;
  initialSpeed: number;
  speedIncrease: number;
}