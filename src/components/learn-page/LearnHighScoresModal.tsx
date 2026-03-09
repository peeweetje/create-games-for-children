import { useState, useEffect } from "react";
import { Plus, Minus, X, Divide } from "lucide-react";
import { useTranslation } from "react-i18next";
import { HighScoresModal } from "../HighScoresModal";
import type { Operation } from "../../helpers/mathHelper";

interface HighScore {
    score: number;
    total: number;
    accuracy: number;
    bestStreak: number;
    lastPlayed: string;
}

interface LearnHighScoresModalProps {
    isOpen: boolean;
    onClose: () => void;
}

export const LearnHighScoresModal = ({ isOpen, onClose }: LearnHighScoresModalProps) => {
    const { t } = useTranslation();
    const [highScores, setHighScores] = useState<Record<Operation, HighScore>>({
        addition: { score: 0, total: 0, accuracy: 0, bestStreak: 0, lastPlayed: "" },
        subtraction: { score: 0, total: 0, accuracy: 0, bestStreak: 0, lastPlayed: "" },
        multiplication: { score: 0, total: 0, accuracy: 0, bestStreak: 0, lastPlayed: "" },
        division: { score: 0, total: 0, accuracy: 0, bestStreak: 0, lastPlayed: "" },
    });

    const initialScores: Record<Operation, HighScore> = {
        addition: { score: 0, total: 0, accuracy: 0, bestStreak: 0, lastPlayed: "" },
        subtraction: { score: 0, total: 0, accuracy: 0, bestStreak: 0, lastPlayed: "" },
        multiplication: { score: 0, total: 0, accuracy: 0, bestStreak: 0, lastPlayed: "" },
        division: { score: 0, total: 0, accuracy: 0, bestStreak: 0, lastPlayed: "" },
    };

    useEffect(() => {
        refreshScores();
    }, []);

    const refreshScores = () => {
        const savedScores = localStorage.getItem("learn-high-scores");

        if (savedScores) {
            try {
                const parsed = JSON.parse(savedScores);
                console.log("Parsed high scores:", parsed);
                // Merge saved scores with initial scores to ensure all operations are present
                setHighScores({
                    ...initialScores,
                    ...parsed
                });
            } catch (error) {
                console.error("Error parsing high scores:", error);
                setHighScores(initialScores);
            }
        } else {
            console.log("No high scores found in localStorage");
            setHighScores(initialScores);
        }
    };

    const getOperationIcon = (operation: Operation) => {
        switch (operation) {
            case "addition": return <Plus size={20} />;
            case "subtraction": return <Minus size={20} />;
            case "multiplication": return <X size={20} />;
            case "division": return <Divide size={20} />;
        }
    };

    const categoryLabels: Record<Operation, string> = {
        addition: t(`learn.operations.addition`),
        subtraction: t(`learn.operations.subtraction`),
        multiplication: t(`learn.operations.multiplication`),
        division: t(`learn.operations.division`),
    };

    const clearAllScores = () => {
        localStorage.removeItem("learn-high-scores");
        refreshScores();
        console.log("Scores cleared and modal refreshed");
    };

    return (
        <HighScoresModal
            isOpen={isOpen}
            onClose={onClose}
            highScores={highScores}
            categoryLabels={categoryLabels}
            onClearScores={clearAllScores}
            renderIcon={getOperationIcon}
            useBackdropBlur={true}
        />
    );
};