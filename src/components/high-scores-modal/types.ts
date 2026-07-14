import { ReactNode } from "react";

export interface HighScore {
    score: number;
    total: number;
    accuracy: number;
    bestStreak: number;
    lastPlayed: string;
}

export interface HighScoresModalProps<T extends string> {
    isOpen: boolean;
    onClose: () => void;
    highScores: Record<T, HighScore>;
    categoryLabels: Record<T, string>;
    onClearScores: () => void;
    renderIcon?: (category: T) => ReactNode;
    useBackdropBlur?: boolean;
}