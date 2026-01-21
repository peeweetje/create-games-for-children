import { useState, useCallback } from 'react';
import { Chess } from 'chess.js';
import moveSoundUrl from '../assets/sounds/move-self.mp3';
import captureSoundUrl from '../assets/sounds/capture.mp3';

export function useChessGame() {
    const [game, setGame] = useState(new Chess());
    const [moveSound] = useState(new Audio(moveSoundUrl));
    const [captureSound] = useState(new Audio(captureSoundUrl));

    // moveSquares tracks the visual highlighting
    const [moveSquares, setMoveSquares] = useState<Record<string, React.CSSProperties>>({});
    // selectedSquare tracks the source square for click-to-move logic
    const [selectedSquare, setSelectedSquare] = useState<string | null>(null);

    // Safe mutation wrapper with ROBUST validation
    const makeMove = useCallback((move: { from: string; to: string; promotion?: string } | string) => {
        try {
            let moveCommand: any = move;

            // Strict Validation Strategy:
            // 1. If it's an object {from, to}, check against legal moves list from the engine.
            if (typeof move === 'object' && 'from' in move && 'to' in move) {
                const possibleMoves = game.moves({ verbose: true });
                const foundMove = possibleMoves.find(m => m.from === move.from && m.to === move.to);

                if (!foundMove) {
                    console.warn('Illegal move attempted:', move);
                    console.warn('Current FEN:', game.fen());
                    console.warn('Valid moves from this square:', possibleMoves.filter(m => m.from === move.from));
                    return null;
                }

                // 2. Construct the exact command chess.js expects based on the FOUND legal move
                // This ensures we include promotion flags ONLY when necessary.
                moveCommand = { from: move.from, to: move.to };

                // 3. Handle promotion
                if (foundMove.flags.includes('p') || foundMove.flags.includes('n') || foundMove.flags.includes('b') || foundMove.flags.includes('q') || foundMove.flags.includes('r')) {
                    moveCommand.promotion = move.promotion || 'q';
                }
            }

            // Execute the validated move
            const result = game.move(moveCommand);

            if (result) {
                // Create new instance to trigger re-render
                const newGame = new Chess(game.fen());
                setGame(newGame);

                if (result.captured) {
                    captureSound.play().catch(e => console.log('Audio error', e));
                } else {
                    moveSound.play().catch(e => console.log('Audio error', e));
                }

                // Clear state after move
                setMoveSquares({});
                setSelectedSquare(null);

                return result;
            }
        } catch (e) {
            console.error('MakeMove error:', e);
            return null;
        }
        return null;
    }, [game, moveSound, captureSound]);


    const onSquareClick = useCallback((square: string) => {
        // 1. Check if we are clicking a destination for the selected piece
        if (selectedSquare) {
            const moves = game.moves({ square: selectedSquare as any, verbose: true });
            const validMove = moves.find((m) => m.to === square);

            if (validMove) {
                // Execute the move
                makeMove({
                    from: selectedSquare,
                    to: square,
                    promotion: 'q' // Default to queen, makeMove will validate if it's actually needed
                });
                return;
            }

            // If clicking the same square, usually deselect
            if (square === selectedSquare) {
                setMoveSquares({});
                setSelectedSquare(null);
                return;
            }
        }

        // 2. Select a piece (if it's our turn and our piece)
        const piece = game.get(square as any);
        const isOwnPiece = piece && piece.color === game.turn();

        if (isOwnPiece) {
            const moves = game.moves({ square: square as any, verbose: true });

            const newMoveSquares: Record<string, React.CSSProperties> = {};

            // Highlight the source square
            newMoveSquares[square] = { backgroundColor: 'rgba(255, 255, 0, 0.4)' };

            // Highlight target squares
            moves.forEach((move) => {
                newMoveSquares[move.to] = {
                    background:
                        game.get(move.to as any) && (game.get(move.to as any)?.color !== game.get(square as any)?.color)
                            ? 'radial-gradient(circle, rgba(0,0,0,.1) 85%, transparent 85%)'
                            : 'radial-gradient(circle, rgba(0,0,0,.1) 25%, transparent 25%)',
                    borderRadius: '50%',
                };
            });

            setMoveSquares(newMoveSquares);
            setSelectedSquare(square);
            return;
        }

        // 3. Clicked empty or enemy square (not a valid move), deselect
        setMoveSquares({});
        setSelectedSquare(null);

    }, [game, selectedSquare, makeMove]);


    const makeComputerMove = useCallback(() => {
        const possibleMoves = game.moves({ verbose: true });
        if (game.isGameOver() || game.isDraw() || possibleMoves.length === 0) return;

        let chosenMove = null;
        const capturingMoves = possibleMoves.filter(move => move.flags.includes('c') || move.flags.includes('e'));

        if (capturingMoves.length > 0) {
            const randomIndex = Math.floor(Math.random() * capturingMoves.length);
            chosenMove = capturingMoves[randomIndex];
        } else {
            const randomIndex = Math.floor(Math.random() * possibleMoves.length);
            chosenMove = possibleMoves[randomIndex];
        }

        setTimeout(() => {
            makeMove({
                from: chosenMove.from,
                to: chosenMove.to,
                promotion: 'q'
            });
        }, 1000 + Math.random() * 1000);

    }, [game, makeMove]);

    const resetGame = useCallback(() => {
        setGame(new Chess());
        setMoveSquares({});
        setSelectedSquare(null);
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
        resetGame,
        moveSquares,
        onSquareClick
    };
}
