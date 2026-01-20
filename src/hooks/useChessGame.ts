import { useState, useCallback } from 'react';
import { Chess } from 'chess.js';

export function useChessGame() {
    const [game, setGame] = useState(new Chess());
    const [moveSound] = useState(new Audio('https://images.chesscomfiles.com/chess-themes/sounds/_common/move-self.mp3'));
    const [captureSound] = useState(new Audio('https://images.chesscomfiles.com/chess-themes/sounds/_common/capture.mp3'));

    // Safe mutation wrapper
    const makeMove = useCallback((move) => {
        try {
            const result = game.move(move);
            if (result) {
                // Create new instance to trigger re-render
                const newGame = new Chess(game.fen());
                setGame(newGame);

                if (result.captured) {
                    captureSound.play().catch(e => console.log('Audio play failed', e));
                } else {
                    moveSound.play().catch(e => console.log('Audio play failed', e));
                }
                return result;
            }
        } catch (e) {
            return null;
        }
        return null;
    }, [game, moveSound, captureSound]);

    const makeComputerMove = useCallback(() => {
        // Simple AI: 1. Capture if possible, 2. Random
        const possibleMoves = game.moves({ verbose: true });

        // Game over?
        if (game.isGameOver() || game.isDraw() || possibleMoves.length === 0) return;

        let chosenMove = null;

        // Filter for capturing moves
        const capturingMoves = possibleMoves.filter(move => move.flags.includes('c') || move.flags.includes('e'));

        if (capturingMoves.length > 0) {
            // Pick a random capturing move
            const randomIndex = Math.floor(Math.random() * capturingMoves.length);
            chosenMove = capturingMoves[randomIndex];
        } else {
            // Pick a random move
            const randomIndex = Math.floor(Math.random() * possibleMoves.length);
            chosenMove = possibleMoves[randomIndex];
        }

        // Simulate thinking time
        setTimeout(() => {
            makeMove({
                from: chosenMove.from,
                to: chosenMove.to,
                promotion: 'q' // Always promote to queen for simplicity
            });
        }, 1000 + Math.random() * 1000); // 1-2 second delay

    }, [game, makeMove]);

    const resetGame = useCallback(() => {
        setGame(new Chess());
    }, []);

    return {
        game,
        fen: game.fen(),
        isGameOver: game.isGameOver(),
        isCheckmate: game.isCheckmate(),
        isDraw: game.isDraw(),
        isCheck: game.isCheck(),
        turn: game.turn(), // 'w' or 'b'
        makeMove,
        makeComputerMove,
        resetGame
    };
}
