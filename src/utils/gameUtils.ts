import type { Position, Direction, GameSettings } from '../types/game';

export const GAME_SETTINGS: GameSettings = {
  boardWidth: 20,
  boardHeight: 20,
  cellSize: 20,
  initialSpeed: 150,
  speedIncrease: 5,
};

export const getInitialSnake = (): Position[] => [
  { x: 10, y: 10 },
  { x: 9, y: 10 },
  { x: 8, y: 10 },
];

export const generateRandomOrange = (snake: Position[]): Position => {
  let orange: Position;
  do {
    orange = {
      x: Math.floor(Math.random() * GAME_SETTINGS.boardWidth),
      y: Math.floor(Math.random() * GAME_SETTINGS.boardHeight),
    };
  } while (snake.some(segment => segment.x === orange.x && segment.y === orange.y));
  return orange;
};

export const moveSnake = (snake: Position[], direction: Direction): Position[] => {
  const head = { ...snake[0] };
  
  switch (direction) {
    case 'UP':
      head.y -= 1;
      break;
    case 'DOWN':
      head.y += 1;
      break;
    case 'LEFT':
      head.x -= 1;
      break;
    case 'RIGHT':
      head.x += 1;
      break;
  }
  
  return [head, ...snake.slice(0, -1)];
};

export const checkCollision = (snake: Position[]): boolean => {
  const head = snake[0];
  
  // Wall collision
  if (
    head.x < 0 ||
    head.x >= GAME_SETTINGS.boardWidth ||
    head.y < 0 ||
    head.y >= GAME_SETTINGS.boardHeight
  ) {
    return true;
  }
  
  // Self collision
  return snake.slice(1).some(segment => segment.x === head.x && segment.y === head.y);
};

export const checkOrangeCollision = (snake: Position[], orange: Position): boolean => {
  const head = snake[0];
  return head.x === orange.x && head.y === orange.y;
};

export const growSnake = (snake: Position[]): Position[] => {
  const tail = snake[snake.length - 1];
  return [...snake, tail];
};

export const getOppositeDirection = (direction: Direction): Direction => {
  switch (direction) {
    case 'UP': return 'DOWN';
    case 'DOWN': return 'UP';
    case 'LEFT': return 'RIGHT';
    case 'RIGHT': return 'LEFT';
  }
};

export const saveHighScore = (score: number, playerName: string): void => {
  const highScore = getHighScore();
  if (score > highScore.score) {
    localStorage.setItem('snakeHighScore', JSON.stringify({ score, playerName }));
  }
};

export const getHighScore = (): { score: number; playerName: string } => {
  const saved = localStorage.getItem('snakeHighScore');
  return saved ? JSON.parse(saved) : { score: 0, playerName: 'Anonymous' };
};