# 🐍 Snake Game - React TypeScript

A modern implementation of the classic Snake game built with React, TypeScript, and Tailwind CSS.

## Features

- **🎮 Classic Gameplay**: Control the snake with arrow keys or WASD
- **🍊 Visual Oranges**: Beautiful orange graphics instead of simple dots
- **🏆 High Score System**: Track your best scores with local storage persistence
- **👤 Player Names**: Enter your name to personalize the experience
- **🔊 Sound Effects**: Audio feedback for eating oranges and game over
- **⏸️ Pause/Resume**: Pause the game anytime with the spacebar
- **📱 Responsive Design**: Optimized for different screen sizes
- **🎨 Modern UI**: Clean interface with Tailwind CSS styling

## Controls

- **Arrow Keys** or **WASD**: Move the snake
- **Space**: Pause/Resume the game
- **Enter**: Restart the game (when game over)

## Getting Started

1. **Clone and install**:
   ```bash
   npm install
   ```

2. **Start the development server**:
   ```bash
   npm run dev
   ```

3. **Open in browser**:
   Navigate to `http://localhost:5173`

## How to Play

1. Enter your name when prompted (or skip for anonymous play)
2. Use arrow keys or WASD to control your snake
3. Eat the oranges (🍊) to grow and increase your score
4. Avoid hitting the walls or your own tail
5. Try to beat your high score!

## Technical Details

### Built With

- **React 18** - Modern React with hooks
- **TypeScript** - Type-safe development
- **Vite** - Fast build tool and dev server
- **Tailwind CSS** - Utility-first CSS framework
- **Web Audio API** - For sound effects

### Project Structure

```
src/
├── components/          # React components
│   ├── GameBoard.tsx   # Main game grid
│   ├── ScoreBoard.tsx  # Score display
│   ├── GameStatus.tsx  # Game state messages
│   └── PlayerNameModal.tsx # Name input modal
├── hooks/              # Custom React hooks
│   ├── useGameState.ts # Game state management
│   ├── useGameLoop.ts  # Game loop logic
│   ├── useKeyPress.ts  # Keyboard controls
│   └── useSounds.ts    # Audio effects
├── types/              # TypeScript definitions
│   └── game.ts        # Game interfaces
├── utils/              # Utility functions
│   └── gameUtils.ts   # Game logic helpers
└── App.tsx            # Main application component
```

### Game Features

- **State Management**: Custom hooks for clean state management
- **Game Loop**: Smooth animation with `setInterval`
- **Collision Detection**: Wall and self-collision detection
- **Progressive Difficulty**: Game speed increases as you score
- **Local Storage**: High scores persist between sessions
- **Sound Effects**: Generated using Web Audio API

## Development

### Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run preview` - Preview production build
- `npm run lint` - Run ESLint

### Customization

You can modify game settings in `src/utils/gameUtils.ts`:

```typescript
export const GAME_SETTINGS: GameSettings = {
  boardWidth: 20,        // Grid width
  boardHeight: 20,       // Grid height
  cellSize: 20,          // Cell size in pixels
  initialSpeed: 150,     // Initial game speed (ms)
  speedIncrease: 5,      // Speed increase per orange
};
```

## License

MIT License - feel free to use this project for learning or building upon!

## Contributing

Contributions are welcome! Feel free to submit issues or pull requests.

---

Have fun playing! 🎮
