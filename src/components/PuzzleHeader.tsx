import { Trophy, Settings } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import { type Difficulty, PUZZLE_COUNTS } from './ChessPuzzles';

interface PuzzleHeaderProps {
    currentPuzzleIndex: number;
    filteredPuzzlesLength: number;
    currentPuzzleDifficulty: Difficulty;
    currentPuzzleDescriptionKey: string;
    showSettings: boolean;
    onSettingsToggle: () => void;
    isAllPuzzles: boolean;
}

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

export const PuzzleHeader = ({
    currentPuzzleIndex,
    filteredPuzzlesLength,
    currentPuzzleDifficulty,
    currentPuzzleDescriptionKey,
    onSettingsToggle,
    isAllPuzzles
}: PuzzleHeaderProps) => {
    const { t } = useTranslation();

    return (
        <div className="text-center space-y-2">
            <div className="flex items-center justify-center gap-3">
                <h1 className="text-2xl md:text-3xl font-extrabold text-violet-600 flex items-center gap-3 drop-shadow-sm tracking-wide">
                    <Trophy className="w-8 h-8" />
                    {t("puzzles.title")}
                </h1>
                <button
                    onClick={onSettingsToggle}
                    className="p-2 bg-violet-200 hover:bg-violet-300 rounded-full transition-colors"
                    title={t("puzzles.settings.title")}
                >
                    <Settings className="w-6 h-6 text-violet-700" />
                </button>
            </div>
            <p className="text-xl text-gray-700 font-medium">
                {t("puzzles.puzzles")} {currentPuzzleIndex + 1} {t("puzzles.off")} {isAllPuzzles ? PUZZLE_COUNTS.total : filteredPuzzlesLength}
            </p>
            <span className={`inline-block px-3 py-1 rounded-full text-sm font-semibold border ${getDifficultyColor(currentPuzzleDifficulty)}`}>
                {t(`puzzles.difficulty.${currentPuzzleDifficulty}`)}
            </span>
            <p className="text-gray-600">{t(currentPuzzleDescriptionKey)}</p>
        </div>
    );
};