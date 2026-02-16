import { useState, useMemo } from 'react';
import { useTranslation } from 'react-i18next';
import { ChessPuzzle } from '@react-chess-tools/react-chess-puzzle';
import { ChessGame } from '@react-chess-tools/react-chess-game';

import Confetti from 'react-confetti';
import { SAMPLE_PUZZLES, getPuzzlesByDifficulty, type Difficulty } from '../components/ChessPuzzles';
import { PuzzleSettingsModal } from '../components/PuzzleSettingsModal';
import { PuzzleButtons } from '../components/PuzzleButtons';
import { PuzzleHeader } from '../components/PuzzleHeader';

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
            <div className="flex flex-col items-center justify-center w-full max-w-4xl mx-auto p-2 pb-24 md:pb-4 md:p-4">
                {showConfetti && <Confetti recycle={false} numberOfPieces={200} />}

                <PuzzleSettingsModal
                    isOpen={showSettings}
                    onClose={() => setShowSettings(false)}
                    selectedDifficulty={selectedDifficulty}
                    onDifficultyChange={handleDifficultyChange}
                />

                <div className="max-w-4xl w-full flex flex-col items-center gap-2">
                    <PuzzleHeader
                        currentPuzzleIndex={currentPuzzleIndex}
                        filteredPuzzlesLength={filteredPuzzles.length}
                        currentPuzzleDifficulty={currentPuzzle.difficulty}
                        currentPuzzleDescriptionKey={currentPuzzle.descriptionKey}
                        showSettings={showSettings}
                        onSettingsToggle={() => setShowSettings(true)}
                        isAllPuzzles={selectedDifficulty === 'all'}
                    />

                    

                    <div className="border-4 md:border-8 border-white rounded-xl md:rounded-2xl shadow-xl md:shadow-2xl relative">
                        <div className="p-4 bg-orange-100 rounded-xl shadow-inner border-4 border-orange-300 w-full max-w-xl ">
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
                    </div>

                    <PuzzleButtons
                        showConfetti={showConfetti}
                        onReset={handleReset}
                        onNextPuzzle={handleNextPuzzle}
                    />
                    {/* Hint Text Display */}
                    <div className="mt-4 text-center ">
                        <p className="text-sm text-gray-500 italic">Hint: {t(currentPuzzle.hintKey)}</p>
                    </div>
                </div>
            </div>
    );
};
