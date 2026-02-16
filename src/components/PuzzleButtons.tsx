import { RefreshCw, ArrowRight } from 'lucide-react';
import { useTranslation } from 'react-i18next';

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
    const { t } = useTranslation();

    return (
        <div className="mt-2 flex gap-4 justify-center">
            <button
                onClick={onReset}
                className="flex items-center gap-2 px-4 py-2 bg-gray-200 hover:bg-gray-300 text-gray-800 rounded-lg font-semibold transition-colors cursor-pointer text-sm"
            >
                 {t("puzzles.buttons.reset")}
                <RefreshCw className="w-4 h-4" />
               
            </button>

            {showConfetti && (
                <button
                    onClick={onNextPuzzle}
                    className="flex items-center gap-2 px-4 py-2 bg-green-500 hover:bg-green-600 text-white rounded-lg font-semibold shadow-md transform hover:scale-105 transition-all cursor-pointer animate-bounce text-sm"
                >
                    {t("puzzles.buttons.nextPuzzle")}
                    <ArrowRight className="w-4 h-4" />
                </button>
            )}
        </div>
    );
};
