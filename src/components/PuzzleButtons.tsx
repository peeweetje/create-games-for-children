import { RefreshCw, ArrowRight } from 'lucide-react';

interface PuzzleButtonsProps {
    showConfetti: boolean;
    onReset: () => void;
    onNextPuzzle: () => void;
}

export const PuzzleButtons = ({ 
    showConfetti, 
    onReset, 
    onNextPuzzle 
}: PuzzleButtonsProps) => {
    return (
        <div className="mt-6 flex gap-4 justify-center">
            <button
                onClick={onReset}
                className="flex items-center gap-2 px-4 py-2 bg-gray-200 hover:bg-gray-300 text-gray-800 rounded-lg font-semibold transition-colors cursor-pointer text-sm"
            >
                <RefreshCw className="w-4 h-4" />
                Reset
            </button>

            {showConfetti && (
                <button
                    onClick={onNextPuzzle}
                    className="flex items-center gap-2 px-4 py-2 bg-green-500 hover:bg-green-600 text-white rounded-lg font-semibold shadow-md transform hover:scale-105 transition-all cursor-pointer animate-bounce text-sm"
                >
                    Next Puzzle
                    <ArrowRight className="w-4 h-4" />
                </button>
            )}
        </div>
    );
};