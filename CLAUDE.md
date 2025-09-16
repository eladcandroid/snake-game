# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Development Commands

```bash
# Start development server (usually runs on http://localhost:5173)
npm run dev

# Build for production
npm run build

# Run linting
npm run lint

# Preview production build
npm run preview
```

## Architecture Overview

This is a React TypeScript Snake game with a custom hook-based architecture that separates concerns cleanly:

### Core Game Architecture

**State Management Flow:**
- `useGameState` - Central game state management (snake, orange, score, game status)
- `useGameLoop` - Game tick logic, collision detection, and snake movement
- `useKeyPress` - Keyboard input handling and game controls
- `useSounds` - Web Audio API sound generation for game effects

**Component Hierarchy:**
- `App.tsx` - Main container, orchestrates all hooks and renders UI
- `GameBoard.tsx` - Grid-based game rendering with CSS Grid
- `ScoreBoard.tsx` - Displays current and high scores
- `GameStatus.tsx` - Game state messages (waiting, paused, game over)
- `PlayerNameModal.tsx` - Initial player name input

### Key Technical Patterns

**Type Safety:**
- All types defined in `src/types/game.ts`
- Use `import type` syntax for type-only imports to avoid runtime issues
- Core types: `Position`, `Direction`, `GameState`, `GameSettings`

**Game Loop Pattern:**
- Uses `setInterval` in `useGameLoop` for consistent game ticks
- Speed increases progressively as score grows
- Collision detection happens before state updates

**Data Persistence:**
- High scores stored in `localStorage` via `gameUtils.ts`
- No external backend required

## Tailwind CSS Setup

Uses modern Tailwind CSS v4 with Vite plugin:
- Configuration: `@tailwindcss/vite` plugin in `vite.config.ts`
- Imports: `@import "tailwindcss"` in `src/index.css`
- No PostCSS config needed with this setup

## Game Configuration

Game settings are centralized in `src/utils/gameUtils.ts`:

```typescript
export const GAME_SETTINGS: GameSettings = {
  boardWidth: 20,        // Grid cells wide
  boardHeight: 20,       // Grid cells tall  
  cellSize: 20,          // Pixels per cell
  initialSpeed: 150,     // Initial tick interval (ms)
  speedIncrease: 5,      // Speed boost per orange eaten
};
```

## Important Development Notes

**Hook Dependencies:**
- `useGameLoop` depends on `useGameState` for state updates
- `useKeyPress` requires game status to determine valid actions
- All hooks are integrated in `App.tsx` with proper dependency injection

**TypeScript Import Pattern:**
Always use `import type` for types from `src/types/game.ts` to prevent module resolution issues:
```typescript
import type { Position, Direction, GameState } from '../types/game';
```

**Sound System:**
- Uses Web Audio API for generated sounds (no external audio files)
- Sounds are optional and gracefully degrade if audio context fails
- All sound logic contained in `useSounds` hook