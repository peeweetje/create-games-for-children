import { useState, useRef, useEffect } from 'react'
import { BadgeQuestionMark, RefreshCcw } from 'lucide-react';
import { useChessGame } from '../hooks/useChessGame'
import { ChessBoard } from '../components/ChessBoard'
import { GameInfo } from '../components/game-info/GameInfo'
import { Header } from '../components/Header'
import { GameButtons } from '../components/buttons/GameButtons'
import { Mascot } from '../components/Mascot'
import { RulesModal } from '../components/RulesModal'
import Confetti from 'react-confetti'

export const PlayPage = () => {
    const { game, makeMove, makeComputerMove, turn, isGameOver, isCheckmate, isDraw, isCheck, resetGame, moveSquares, onSquareClick } = useChessGame();
    const [boardWidth, setBoardWidth] = useState(400);
    const [showRules, setShowRules] = useState(false);
    const containerRef = useRef<HTMLDivElement>(null);
    const [windowSize, setWindowSize] = useState({ width: window.innerWidth, height: window.innerHeight });
   

    // Computer Move Effect
    useEffect(() => {
        if (turn === 'b' && !isGameOver) {
            makeComputerMove();
        }
    }, [turn, isGameOver, makeComputerMove]);

    useEffect(() => {
        function handleResize() {
            setWindowSize({ width: window.innerWidth, height: window.innerHeight });
        }
        window.addEventListener('resize', handleResize);
        return () => window.removeEventListener('resize', handleResize);
    }, []);

    // Responsive board size
    useEffect(() => {
        function handleResize() {
            if (containerRef.current) {
                const width = containerRef.current.offsetWidth;
                setBoardWidth(Math.min(width - 16, 600)); // Reduced padding for mobile, larger max width
            }
        }

        window.addEventListener('resize', handleResize);
        handleResize(); // Initial call
        return () => window.removeEventListener('resize', handleResize);
    }, []);

    function onDrop(sourceSquare: string, targetSquare: string) {
        const move = makeMove({
            from: sourceSquare,
            to: targetSquare, // targetSquare is already a string like "e4"
            promotion: "q", // always promote to queen for simplicity for kids
        });
        return move !== null;
    }

    return (
        <div className="flex flex-col items-center justify-center w-full max-w-4xl mx-auto p-2 pb-24 md:pb-4 md:p-4">
            <Header />
            <main ref={containerRef} className="w-full max-w-2xl flex flex-col items-center gap-4 md:gap-6">
                <GameInfo
                    turn={turn}
                    isGameOver={isGameOver}
                    isCheckmate={isCheckmate}
                    isDraw={isDraw}
                />

                <div className="border-4 md:border-8 border-white rounded-xl md:rounded-2xl shadow-xl md:shadow-2xl relative">
                    <ChessBoard
                        game={game}
                        onPieceDrop={onDrop}
                        boardWidth={boardWidth}
                        moveSquares={moveSquares}
                        onSquareClick={onSquareClick}
                    />
                </div>

                <GameButtons 
                    buttons={[
                        {
                            labelKey: 'app.newGame',
                            icon: RefreshCcw,
                            onClick: resetGame,
                            color: 'bg-green-500',
                            hoverColor: 'hover:bg-green-600',
                            size: 18,
                        },
                        {
                            labelKey: 'app.help',
                            icon: BadgeQuestionMark,
                            onClick: () => setShowRules(true),
                            color: 'bg-blue-400',
                            hoverColor: 'hover:bg-blue-500',
                            size: 18,
                        },
                    ]}
                />

                <Mascot isCheckmate={isCheckmate} isCheck={isCheck} turn={turn} />
                <RulesModal isOpen={showRules} onClose={() => setShowRules(false)} />
                {isCheckmate && <Confetti width={windowSize.width} height={windowSize.height} recycle={false} numberOfPieces={500} />}
            </main>
        </div>
    )
}
