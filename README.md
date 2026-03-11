# Games for Children 🦁

A kid-friendly games application built with React, Vite, and Chess.js.

## Features
- 🦁 Friendly mascot "Leo" offering tips.
- 🎨 Colorful and engaging UI.
- 🔊 Sound effects for moves and captures.
- 🤖 Simple computer opponent.
- 📱 Responsive design for various devices.
- 🧮 Interactive math learning with addition, subtraction, multiplication, and division
- 🌟 Progressive difficulty system with star-based progression
- 🏆 High scores tracking and session completion rewards
- 🎯 Multiple answer choices with skip functionality
- 💡 Educational tips and hints for learning operations

## Games

### Memory Game
A colorful memory matching game featuring:
- **Multiple Themes**: Animals, Fruits, and Vehicles themes with vibrant card designs
- **Visual Feedback**: Animated card flips
- **Accessibility**: Keyboard navigation support and screen reader compatibility

### Chess
Classic chess game with a friendly AI opponent, designed for children to learn and enjoy the game.

### Math Learning
Interactive math learning game featuring:
- Addition, subtraction, multiplication, and division operations
- Progressive difficulty with star-based advancement
- Multiple choice answers with skip functionality
- High scores tracking and session completion rewards
- Educational tips and hints

### Reading Comprehension
Interactive reading comprehension game featuring:
- Multiple reading levels with age-appropriate content
- Reading comprehension questions with multiple choice answers
- Progressive difficulty with star-based advancement
- High scores tracking and session completion rewards
- Educational tips and hints

## Tech Stack
- **Framework**: React 19 + Vite
- **Language**: TypeScript
- **Chess Logic**: chess.js
- **Board UI**: react-chessboard (v5)
- **Styling**: Tailwind CSS
- **Animations**: Framer Motion
- **Translations**: Dutch and English
- **Math Operations**: Custom math helper utilities
- **Memory Game**: Custom memory matching logic with theme management
- **State Management**: Zustand for global state management

## Changelog

### 10-03-2026
- **New Feature**: Added comprehensive memory matching game with multiple themes
- **Memory Game Features**: 
  - Three vibrant themes (Animals, Fruits, Vehicles) with custom card designs
  - Progressive scoring system with level progression
  - Animated card flips for visual feedback
  - Keyboard navigation support and accessibility features
- **UI Components**: Created complete memory game interface with theme selector, game stats, and game over modal
- **State Management**: Implemented Zustand store for memory game state management

### 25-02-2026
- **New Feature**: Added comprehensive math learning page with interactive educational games
- **Math Operations**: Implemented addition, subtraction, multiplication, and division learning modules
- **Progressive System**: Added star-based difficulty progression and high scores tracking
- **UI Components**: Created complete learn page interface with operation selectors, answer choices, and session management
- **Educational Features**: Added tips, hints, and session completion rewards for enhanced learning experience

### 17-01-2026
- **Major Update**: Migrated entire codebase from JavaScript to **TypeScript**.
- **Dependency Update**: Upgraded `react-chessboard` to v5.8.6 for better performance and type safety.
- **Framework Update**: Upgraded to **React 19** to support the latest libraries.
- **Refactor**: Updated `ChessBoard` component to use the new v5 API options structure.



## Getting Started

1. Install dependencies:
   ```bash
   pnpm install
   ```

2. Run development server:
   ```bash
   pnpm dev
   ```

3. Build for production:
   ```bash
   pnpm build
   ```
