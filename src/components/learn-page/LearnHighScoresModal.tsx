import { useState, useEffect } from "react";
import { Trophy, Plus, Minus, X, Divide } from "lucide-react";
import { useTranslation } from "react-i18next";
import { CloseButton } from "../../components/buttons/CloseButton";
import type { Operation } from "../../helpers/mathHelper";

interface HighScore {
    score: number;
    total: number;
    accuracy: number;
    bestStreak: number;
    lastPlayed: string;
}

interface HighScoresModalProps {
    isOpen: boolean;
    onClose: () => void;
}

export const LearnHighScoresModal = ({ isOpen, onClose }: HighScoresModalProps) => {
    const { t } = useTranslation();
    const [highScores, setHighScores] = useState<Record<Operation, HighScore>>({
        addition: { score: 0, total: 0, accuracy: 0, bestStreak: 0, lastPlayed: "" },
        subtraction: { score: 0, total: 0, accuracy: 0, bestStreak: 0, lastPlayed: "" },
        multiplication: { score: 0, total: 0, accuracy: 0, bestStreak: 0, lastPlayed: "" },
        division: { score: 0, total: 0, accuracy: 0, bestStreak: 0, lastPlayed: "" },
    });

    useEffect(() => {
        const savedScores = localStorage.getItem("learn-high-scores");

        
        let initialScores = {
            addition: { score: 0, total: 0, accuracy: 0, bestStreak: 0, lastPlayed: "" },
            subtraction: { score: 0, total: 0, accuracy: 0, bestStreak: 0, lastPlayed: "" },
            multiplication: { score: 0, total: 0, accuracy: 0, bestStreak: 0, lastPlayed: "" },
            division: { score: 0, total: 0, accuracy: 0, bestStreak: 0, lastPlayed: "" },
        };

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
    }, []);

    const getOperationIcon = (operation: Operation) => {
        switch (operation) {
            case "addition": return <Plus size={20} />;
            case "subtraction": return <Minus size={20} />;
            case "multiplication": return <X size={20} />;
            case "division": return <Divide size={20} />;
        }
    };

    const formatDate = (dateString: string) => {
        if (!dateString) return "-";
        const date = new Date(dateString);
        return date.toLocaleDateString('nl-NL', { 
            day: '2-digit',
            month: '2-digit',
            year: 'numeric',
            hour: '2-digit',
            minute: '2-digit'
        });
    };

    const clearAllScores = () => {
        const confirmed = confirm(t("learn.highScores.clearConfirmation"));
        if (confirmed) {
            // Clear the localStorage completely
            localStorage.removeItem("learn-high-scores");
            
            // Refresh the scores to update the modal display
            refreshScores();
            
            console.log("Scores cleared and modal refreshed");
        }
    };

    // Function to refresh scores from localStorage
    const refreshScores = () => {
        const savedScores = localStorage.getItem("learn-high-scores");
        let initialScores = {
            addition: { score: 0, total: 0, accuracy: 0, bestStreak: 0, lastPlayed: "" },
            subtraction: { score: 0, total: 0, accuracy: 0, bestStreak: 0, lastPlayed: "" },
            multiplication: { score: 0, total: 0, accuracy: 0, bestStreak: 0, lastPlayed: "" },
            division: { score: 0, total: 0, accuracy: 0, bestStreak: 0, lastPlayed: "" },
        };

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

    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 bg-transparent backdrop-blur-sm flex items-center justify-center p-4 z-50">
            <div className="bg-white rounded-2xl shadow-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
                <div className="p-6 border-b border-violet-200">
                    <div className="flex items-center justify-between">
                        <div className="flex items-center gap-3">
                            <Trophy size={28} className="text-yellow-500" />
                            <div>
                                <h2 className="text-2xl font-bold text-violet-900">
                                    {t("learn.highScores.title")}
                                </h2>
                                <p className="text-sm text-gray-600">
                                    {t("learn.highScores.subtitle")}
                                </p>
                            </div>
                        </div>
                        <CloseButton
                            onClick={onClose}
                            className="p-2 text-violet-500 hover:text-violet-700 hover:bg-violet-100 rounded-full transition-colors"
                            size={24}
                            strokeWidth={2}
                        />
                    </div>
                </div>

                <div className="p-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
                        {Object.entries(highScores).map(([operation, score]) => (
                            <div key={operation} className="border border-violet-200 rounded-xl p-4 hover:shadow-md transition-shadow">
                                <div className="flex items-center justify-between mb-3">
                                    <div className="flex items-center gap-3">
                                        <div className="w-10 h-10 bg-gray-100 rounded-full flex items-center justify-center">
                                            {getOperationIcon(operation as Operation)}
                                        </div>
                                        <div>
                                            <h3 className="font-semibold text-gray-900 capitalize">
                                                {t(`learn.operations.${operation}`)}
                                            </h3>
                                            <p className="text-sm text-gray-500">
                                                {t("learn.highScores.lastPlayed")}: {formatDate(score.lastPlayed)}
                                            </p>
                                        </div>
                                    </div>
                                </div>
                                
                                <div className="grid grid-cols-2 gap-3 text-center">
                                    <div className="bg-green-50 rounded-lg p-3">
                                        <div className="text-2xl font-bold text-green-600">{score.score}</div>
                                        <div className="text-xs text-green-600 font-medium">
                                            {t("learn.highScores.bestScore")}
                                        </div>
                                    </div>
                                    <div className="bg-blue-50 rounded-lg p-3">
                                        <div className="text-2xl font-bold text-blue-600">{score.accuracy}%</div>
                                        <div className="text-xs text-blue-600 font-medium">
                                            {t("learn.highScores.bestAccuracy")}
                                        </div>
                                    </div>
                                    <div className="bg-orange-50 rounded-lg p-3">
                                        <div className="text-2xl font-bold text-orange-600">{score.bestStreak}</div>
                                        <div className="text-xs text-orange-600 font-medium">
                                            {t("learn.highScores.bestStreak")}
                                        </div>
                                    </div>
                                    <div className="bg-purple-50 rounded-lg p-3">
                                        <div className="text-2xl font-bold text-purple-600">{score.total}</div>
                                        <div className="text-xs text-purple-600 font-medium">
                                            {t("learn.highScores.totalQuestions")}
                                        </div>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>

                    <div className="flex justify-between items-center pt-4 border-t border-gray-200">
                        <button
                            onClick={clearAllScores}
                            className="px-4 py-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors text-sm font-medium"
                        >
                            {t("learn.highScores.clearAll")}
                        </button>
                        <button
                            onClick={onClose}
                            className="px-6 py-2 bg-violet-600 text-white rounded-lg hover:bg-violet-700 transition-colors font-medium"
                        >
                            {t("learn.highScores.close")}
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};