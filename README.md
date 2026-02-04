# Chess for Children 🦁

A kid-friendly chess application built with React, Vite, and Chess.js.

## Features
- 🦁 Friendly mascot "Leo" offering tips.
- 🎨 Colorful and engaging UI.
- 🔊 Sound effects for moves and captures.
- 🤖 Simple computer opponent.
- 📱 Responsive design for various devices.

## Tech Stack
- **Framework**: React 19 + Vite
- **Language**: TypeScript
- **Chess Logic**: chess.js
- **Board UI**: react-chessboard (v5)
- **Styling**: Tailwind CSS
- **Animations**: Framer Motion
- **Translations**: Dutch and english

## Changelog

### 2026-01-17
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