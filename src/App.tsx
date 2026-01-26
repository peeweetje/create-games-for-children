import { useState, useRef, useEffect } from 'react'
import { useTranslation } from 'react-i18next';
import { useChessGame } from './hooks/useChessGame'
import { ChessBoard } from './components/ChessBoard'
import { GameInfo } from './components/GameInfo'
import { Mascot } from './components/Mascot'
import { RulesModal } from './components/RulesModal'
import Confetti from 'react-confetti'


function App() {
    const { game, makeMove, makeComputerMove, turn, isGameOver, isCheckmate, isDraw, isCheck, resetGame, moveSquares, onSquareClick } = useChessGame();
    const [boardWidth, setBoardWidth] = useState(400);
    const [showRules, setShowRules] = useState(false);
    const containerRef = useRef<HTMLDivElement>(null);
    const [windowSize, setWindowSize] = useState({ width: window.innerWidth, height: window.innerHeight });
    const { t, i18n } = useTranslation();

    const changeLanguage = (lng: string) => {
        i18n.changeLanguage(lng);
    };

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
                setBoardWidth(Math.min(width - 40, 500)); // Max 500px, padding handled
            }
        }

        window.addEventListener('resize', handleResize);
        handleResize(); // Initial call
        return () => window.removeEventListener('resize', handleResize);
    }, []);

    function onDrop(sourceSquare: string, targetSquare: string) {
        const move = makeMove({
            from: sourceSquare,
            to: targetSquare,
            promotion: "q", // always promote to queen for simplicity for kids
        });
        return move !== null;
    }

    return (
        <div className="flex flex-col items-center justify-center min-h-screen p-4 bg-orange-50 font-sans">
            <div className="absolute top-4 right-4 flex gap-2">
                <button onClick={() => changeLanguage('en')} className={`text-2xl hover:scale-110 transition-transform ${i18n.language === 'en' ? 'opacity-100' : 'opacity-50'}`}>🇬🇧</button>
                <button onClick={() => changeLanguage('nl')} className={`text-2xl hover:scale-110 transition-transform ${i18n.language === 'nl' ? 'opacity-100' : 'opacity-50'}`}>🇳🇱</button>
            </div>
            <header className="mb-6 text-center">
                <h1 className="text-5xl font-extrabold text-orange-500 mb-2 drop-shadow-sm tracking-wide">
                    🦁 {t('app.title')} 🦄
                </h1>
                <p className="text-xl text-orange-400 font-medium">{t('app.subtitle')}</p>
            </header>

            <main ref={containerRef} className="w-full max-w-2xl flex flex-col items-center gap-6">
                <GameInfo
                    turn={turn}
                    isGameOver={isGameOver}
                    isCheckmate={isCheckmate}
                    isDraw={isDraw}
                />

                <div className="border-8 border-white rounded-2xl shadow-2xl relative">
                    <ChessBoard
                        game={game}
                        onPieceDrop={onDrop}
                        boardWidth={boardWidth}
                        moveSquares={moveSquares}
                        onSquareClick={onSquareClick}
                    />
                </div>

                <div className="flex gap-4 mt-4">
                    <button
                        onClick={resetGame}
                        className="px-8 py-3 bg-green-500 hover:bg-green-600 text-white font-bold rounded-full shadow-lg transform transition active:scale-95 text-lg"
                    >
                        {t('app.newGame')} 🔄
                    </button>
                    <button
                        onClick={() => setShowRules(true)}
                        className="px-6 py-3 bg-blue-400 hover:bg-blue-500 text-white font-bold rounded-full shadow-lg transform transition active:scale-95 text-lg"
                    >
                        {t('app.help')} ❓
                    </button>
                </div>

                <Mascot isCheckmate={isCheckmate} isCheck={isCheck} turn={turn} />
                <RulesModal isOpen={showRules} onClose={() => setShowRules(false)} />
                {isCheckmate && <Confetti width={windowSize.width} height={windowSize.height} recycle={false} numberOfPieces={500} />}
            </main>
        </div>
    )
}

export default App
