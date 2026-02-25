import { Trophy } from "lucide-react";
import { useTranslation } from "react-i18next";
import type { Operation } from "../../helpers/mathHelper";

interface SessionCompletedModalProps {
    isOpen: boolean;
    onClose: () => void;
    onTryAgain: () => void;
    score: number;
    total: number;
    accuracy: number;
    streak: number;
    stars: number;
    operation: Operation;
    questionsPerSession: number;
}

export const LearnSessionCompletedModal = ({
    isOpen,
    onClose,
    onTryAgain,
    score,
    accuracy,
    streak,
    stars,
    operation,
    questionsPerSession,
}: SessionCompletedModalProps) => {
    const { t } = useTranslation();

    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 bg-transparent backdrop-blur-sm flex items-center justify-center p-4 z-50">
            <div className="bg-white rounded-2xl shadow-2xl max-w-md w-full p-6 text-center">
                <div className="mb-4">
                    <Trophy size={48} className="text-yellow-500 mx-auto mb-2" />
                    <h2 className="text-2xl font-bold text-violet-900 mb-2">
                        {t("learn.sessionCompleted.title")}
                    </h2>
                    <p className="text-gray-600 mb-4">
                        {t("learn.sessionCompleted.subtitle", { 
                            count: questionsPerSession, 
                            operation: t(`learn.operations.${operation}`) 
                        })}
                    </p>
                </div>
                
                <div className="grid grid-cols-2 gap-4 mb-6 text-center">
                    <div>
                        <div className="text-2xl font-bold text-green-600">{score}</div>
                        <div className="text-sm text-gray-600">
                            {t("learn.sessionCompleted.correct")}
                        </div>
                    </div>
                    <div>
                        <div className="text-2xl font-bold text-blue-600">{accuracy}%</div>
                        <div className="text-sm text-gray-600">
                            {t("learn.sessionCompleted.accuracy")}
                        </div>
                    </div>
                    <div>
                        <div className="text-2xl font-bold text-orange-600">{streak}</div>
                        <div className="text-sm text-gray-600">
                            {t("learn.sessionCompleted.bestStreak")}
                        </div>
                    </div>
                    <div>
                        <div className="text-2xl font-bold text-purple-600">{stars}</div>
                        <div className="text-sm text-gray-600">
                            {t("learn.sessionCompleted.starsEarned")}
                        </div>
                    </div>
                </div>
                
                <div className="flex gap-3">
                    <button
                        onClick={onTryAgain}
                        className="flex-1 px-4 py-2 bg-violet-600 text-white rounded-lg hover:bg-violet-700 transition-colors font-medium"
                    >
                        {t("learn.sessionCompleted.tryAgain")}
                    </button>
                    <button
                        onClick={onClose}
                        className="flex-1 px-4 py-2 bg-yellow-500 text-white rounded-lg hover:bg-yellow-600 transition-colors font-medium"
                    >
                        {t("learn.sessionCompleted.viewHighScores")}
                    </button>
                </div>
            </div>
        </div>
    );
};