import { Difficulty } from './ChessPuzzles';
import { PUZZLE_COUNTS } from './ChessPuzzles';
import { useTranslation } from 'react-i18next';
import {  X } from 'lucide-react';

interface PuzzleSettingsModalProps {
    isOpen: boolean;
    onClose: () => void;
    selectedDifficulty: Difficulty | 'all';
    onDifficultyChange: (difficulty: Difficulty | 'all') => void;
}

const getDifficultyButtonColor = (difficulty: Difficulty | 'all', isSelected: boolean): string => {
    const baseClasses = "w-full py-3 px-4 rounded-xl font-semibold transition-all border-2 ";
    if (!isSelected) {
        return baseClasses + "bg-white text-text-600 border-primary-200 hover:border-primary-300";
    }
    switch (difficulty) {
        case 'easy':
            return baseClasses + "bg-green-500 text-white border-green-500 shadow-lg";
        case 'medium':
            return baseClasses + "bg-yellow-500 text-white border-yellow-500 shadow-lg";
        case 'hard':
            return baseClasses + "bg-red-500 text-white border-red-500 shadow-lg";
        case 'all':
            return baseClasses + "bg-primary text-white border-primary shadow-lg";
        default:
            return baseClasses + "bg-surface-500 text-white border-surface-500";
    }
};

export const PuzzleSettingsModal = ({ 
    isOpen, 
    onClose, 
    selectedDifficulty, 
    onDifficultyChange 
}: PuzzleSettingsModalProps) => {
    const { t } = useTranslation();

    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
            <div className="bg-white rounded-2xl shadow-2xl max-w-md w-full p-6">
                <div className="flex items-center justify-between mb-6">
                    <h2 className="text-2xl font-bold text-primary-600">
                        {t("puzzles.settings.title")}
                    </h2>
                    <button
                        onClick={onClose}
                        className="p-2 hover:bg-surface-100 rounded-full transition-colors"
                        title={t("puzzles.settings.title")}
                    >
                        <X className="w-6 h-6 text-primary" />
                    </button>
                </div>
                
                <div className="space-y-3">
                    <p className="text-text-600 font-medium mb-4">{t("puzzles.settings.selectDifficulty")}</p>
                    
                    <button
                        onClick={() => onDifficultyChange('all')}
                        className={getDifficultyButtonColor('all', selectedDifficulty === 'all')}
                    >
                        {t("puzzles.settings.allPuzzles")} ({PUZZLE_COUNTS.total})
                    </button>
                    
                    <button
                        onClick={() => onDifficultyChange('easy')}
                        className={getDifficultyButtonColor('easy', selectedDifficulty === 'easy')}
                    >
                        {t("puzzles.difficulty.easy")} ({PUZZLE_COUNTS.easy})
                    </button>
                    
                    <button
                        onClick={() => onDifficultyChange('medium')}
                        className={getDifficultyButtonColor('medium', selectedDifficulty === 'medium')}
                    >
                        {t("puzzles.difficulty.medium")} ({PUZZLE_COUNTS.medium})
                    </button>
                    
                    <button
                        onClick={() => onDifficultyChange('hard')}
                        className={getDifficultyButtonColor('hard', selectedDifficulty === 'hard')}
                    >
                        {t("puzzles.difficulty.hard")} ({PUZZLE_COUNTS.hard})
                    </button>
                </div>
            </div>
        </div>
    );
};