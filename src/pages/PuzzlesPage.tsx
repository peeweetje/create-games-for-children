import { useState, useMemo } from 'react';
import { useTranslation } from 'react-i18next';
import { ChessPuzzle } from '@react-chess-tools/react-chess-puzzle';
import { ChessGame } from '@react-chess-tools/react-chess-game';

import Confetti from 'react-confetti';
import { Trophy, ArrowRight, RefreshCw, Settings } from 'lucide-react';
import { SAMPLE_PUZZLES, getPuzzlesByDifficulty, type Difficulty } from '../components/ChessPuzzles';
import { PuzzleSettingsModal } from '../components/PuzzleSettingsModal';

const getDifficultyColor = (difficulty: Difficulty): string => {
    switch (difficulty) {
        case 'easy':
            return 'bg-green-100 text-green-700 border-green-300';
        case 'medium':
            return 'bg-yellow-100 text-yellow-700 border-yellow-300';
        case 'hard':
            return 'bg-red-100 text-red-700 border-red-300';
        default:
            return 'bg-gray-100 text-gray-700 border-gray-300';
    }
};

export const PuzzlesPage = () => {
    const { t } = useTranslation();
    const [selectedDifficulty, setSelectedDifficulty] = useState<Difficulty | 'all'>('all');
    const [showSettings, setShowSettings] = useState(false);
    const [currentPuzzleIndex, setCurrentPuzzleIndex] = useState(0);
    const [showConfetti, setShowConfetti] = useState(false);
    const [key, setKey] = useState(0);

    const filteredPuzzles = useMemo(() => { 
        if (selectedDifficulty === 'all') {
            return SAMPLE_PUZZLES;
        }
        return getPuzzlesByDifficulty(selectedDifficulty);
    }, [selectedDifficulty]);

    const currentPuzzle = filteredPuzzles[currentPuzzleIndex];

    const handleNextPuzzle = () => {
        const nextIndex = (currentPuzzleIndex + 1) % filteredPuzzles.length;
        setCurrentPuzzleIndex(nextIndex);
        setShowConfetti(false);
        setKey(prev => prev + 1);
    };

    const handleReset = () => {
        setKey(prev => prev + 1);
        setShowConfetti(false);
    };

    const handleDifficultyChange = (difficulty: Difficulty | 'all') => {
        setSelectedDifficulty(difficulty);
        setCurrentPuzzleIndex(0);
        setShowConfetti(false);
        setKey(prev => prev + 1);
        setShowSettings(false);
    };

    return (
            <div className="flex flex-col items-center justify-center p-8 bg-orange-50 min-h-full">
                {showConfetti && <Confetti recycle={false} numberOfPieces={200} />}

                <PuzzleSettingsModal
                    isOpen={showSettings}
                    onClose={() => setShowSettings(false)}
                    selectedDifficulty={selectedDifficulty}
                    onDifficultyChange={handleDifficultyChange}
                />

                <div className="max-w-4xl w-full flex flex-col items-center gap-8">
                <div className="text-center space-y-2">
                    <div className="flex items-center justify-center gap-3">
                        <h1 className="text-4xl font-bold text-orange-600 flex items-center gap-3">
                            <Trophy className="w-10 h-10" />
                           {t("puzzles.title")}
                        </h1>
                        <button
                            onClick={() => setShowSettings(true)}
                            className="p-2 bg-orange-200 hover:bg-orange-300 rounded-full transition-colors"
                            title={t("puzzles.settings.title")}
                        >
                            <Settings className="w-6 h-6 text-orange-700" />
                        </button>
                    </div>
                    <p className="text-xl text-gray-700 font-medium">
                        {t("puzzles.puzzles")} {currentPuzzleIndex + 1} {t("puzzles.off")} {filteredPuzzles.length}
                    </p>
                    <span className={`inline-block px-3 py-1 rounded-full text-sm font-semibold border ${getDifficultyColor(currentPuzzle.difficulty)}`}>
                        {t(`puzzles.difficulty.${currentPuzzle.difficulty}`)}
                    </span>
                    <p className="text-gray-600">{t(currentPuzzle.descriptionKey)}</p>
                </div>

                    <div className="bg-orange-100 p-4 rounded-xl shadow-inner w-full max-w-xl">
                    <div className="aspect-square w-full bg-white border-4 md:border-8 border-white rounded-xl md:rounded-2xl shadow-xl md:shadow-2xl">
                        <ChessPuzzle.Root
                            key={key}
                            puzzle={currentPuzzle}
                            onSolve={() => setShowConfetti(true)}
                        >
                            <ChessGame.Sounds />
                            <ChessPuzzle.Board
                                options={{
                                    darkSquareStyle: { backgroundColor: "#FFB067" },
                                    lightSquareStyle: { backgroundColor: "#FFF4E0" }
                                }}
                            />
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
