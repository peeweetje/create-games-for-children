import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { ChessPuzzle } from '@react-chess-tools/react-chess-puzzle';
import { ChessGame } from '@react-chess-tools/react-chess-game';

import Confetti from 'react-confetti';
import { Trophy, ArrowRight, RefreshCw } from 'lucide-react';
import { SAMPLE_PUZZLES } from '../components/ChessPuzzles';


export const PuzzlesPage = () => {
    const { t } = useTranslation();
    const [currentPuzzleIndex, setCurrentPuzzleIndex] = useState(0);
    const [showConfetti, setShowConfetti] = useState(false);
    const [key, setKey] = useState(0); // Used to reset the puzzle component

    const currentPuzzle = SAMPLE_PUZZLES[currentPuzzleIndex];

    const handleNextPuzzle = () => {
        const nextIndex = (currentPuzzleIndex + 1) % SAMPLE_PUZZLES.length;
        setCurrentPuzzleIndex(nextIndex);
        setShowConfetti(false);
        setKey(prev => prev + 1);
    };

    const handleReset = () => {
        setKey(prev => prev + 1);
        setShowConfetti(false);
    };

    return (
        <div className="flex flex-col items-center justify-center p-8 bg-orange-50 min-h-full">
            {showConfetti && <Confetti recycle={false} numberOfPieces={200} />}

            <div className="max-w-4xl w-full flex flex-col items-center gap-8">
                <div className="text-center space-y-2">
                    <h1 className="text-4xl font-bold text-orange-600 flex items-center justify-center gap-3">
                        <Trophy className="w-10 h-10" />
                        Chess Puzzles
                    </h1>
                    <p className="text-xl text-gray-700 font-medium">
                        Puzzle {currentPuzzleIndex + 1} of {SAMPLE_PUZZLES.length}
                    </p>
                    <p className="text-gray-600">{t(currentPuzzle.descriptionKey)}</p>
                </div>

                <div className="bg-white p-6 rounded-2xl shadow-xl w-full max-w-md">
                    <div className="aspect-square w-full">
                        <ChessPuzzle.Root
                            key={key}
                            puzzle={currentPuzzle}
                            onSolve={() => setShowConfetti(true)}
                        >
                            <ChessGame.Sounds />
                            <ChessPuzzle.Board />
                            {/* Hidden hints component if needed, or custom UI below */}
                        </ChessPuzzle.Root>
                    </div>

                    <div className="mt-6 flex gap-4 justify-center">
                        <button
                            onClick={handleReset}
                            className="flex items-center gap-2 px-6 py-3 bg-gray-200 hover:bg-gray-300 text-gray-800 rounded-xl font-bold transition-colors cursor-pointer"
                        >
                            <RefreshCw className="w-5 h-5" />
                            Reset
                        </button>

                        {showConfetti && (
                            <button
                                onClick={handleNextPuzzle}
                                className="flex items-center gap-2 px-6 py-3 bg-green-500 hover:bg-green-600 text-white rounded-xl font-bold shadow-lg transform hover:scale-105 transition-all cursor-pointer animate-bounce"
                            >
                                Next Puzzle
                                <ArrowRight className="w-5 h-5" />
                            </button>
                        )}
                    </div>
                    {/* Hint Text Display */}
                    <div className="mt-4 text-center ">
                        <p className="text-sm text-gray-500 italic">Hint: {t(currentPuzzle.hintKey)}</p>
                    </div>
                </div>
            </div>
        </div>
    );
};
