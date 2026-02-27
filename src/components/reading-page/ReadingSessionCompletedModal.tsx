import { ReadingLevel } from "../../helpers/readingHelper";
import { useReadingProgress } from "../../helpers/readingHelper";
import { useTranslation } from "react-i18next";

interface ReadingSessionCompletedModalProps {
    isOpen: boolean;
    onClose: () => void;
    onTryAgain: () => void;
    onViewHighScores: () => void;
    score: number;
    total: number;
    accuracy: number;
    streak: number;
    stars: number;
    level: ReadingLevel;
    questionsPerSession: number;
}

export const ReadingSessionCompletedModal = ({ 
    isOpen, 
    onClose, 
    onTryAgain,
    onViewHighScores,
    score,
    total,
    accuracy,
    streak,
    stars,
    level,
    questionsPerSession
}: ReadingSessionCompletedModalProps) => {
    const { t } = useTranslation();
    const { saveHighScore } = useReadingProgress();
    
    if (!isOpen) return null;

    const levelLabels: Record<ReadingLevel, string> = {
        letters: t("learn.reading.levels.letters"),
        words: t("learn.reading.levels.words"), 
        sentences: t("learn.reading.levels.sentences"),
        stories: t("learn.reading.levels.stories")
    };

    const handleViewHighScores = () => {
        saveHighScore(level, score, total, streak);
        onClose();
        onViewHighScores();
    };

    return (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
            <div className="bg-white rounded-2xl shadow-2xl max-w-2xl w-full">
                <div className="p-6 border-b border-gray-200">
                    <div className="text-center">
                        <div className="text-6xl mb-4">🎉</div>
                        <h2 className="text-2xl font-bold text-gray-800 mb-2">{t("learn.sessionCompleted.title")}</h2>
                        <p className="text-gray-600">{t("learn.sessionCompleted.subtitle", { count: questionsPerSession, operation: levelLabels[level] })}</p>
                    </div>
                </div>

                <div className="p-6">
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
                        <div className="bg-gradient-to-br from-green-50 to-emerald-50 rounded-lg p-4 text-center border border-green-200">
                            <div className="text-2xl font-bold text-green-600">{score}</div>
                            <div className="text-sm text-gray-600">{t("learn.sessionCompleted.correct")}</div>
                        </div>
                        <div className="bg-gradient-to-br from-blue-50 to-cyan-50 rounded-lg p-4 text-center border border-blue-200">
                            <div className="text-2xl font-bold text-blue-600">{accuracy}%</div>
                            <div className="text-sm text-gray-600">{t("learn.sessionCompleted.accuracy")}</div>
                        </div>
                        <div className="bg-gradient-to-br from-orange-50 to-amber-50 rounded-lg p-4 text-center border border-orange-200">
                            <div className="text-2xl font-bold text-orange-600">{streak}</div>
                            <div className="text-sm text-gray-600">{t("learn.sessionCompleted.bestStreak")}</div>
                        </div>
                        <div className="bg-gradient-to-br from-yellow-50 to-amber-50 rounded-lg p-4 text-center border border-yellow-200">
                            <div className="text-2xl font-bold text-yellow-600">{stars}</div>
                            <div className="text-sm text-gray-600">{t("learn.sessionCompleted.starsEarned")}</div>
                        </div>
                    </div>

                    <div className="bg-gradient-to-r from-fuchsia-100 to-purple-100 rounded-lg p-4 border border-fuchsia-200">
                            <div className="flex items-center justify-center gap-2 text-fuchsia-800 font-semibold">
                                <span>⭐</span>
                                <span>{t("learn.sessionCompleted.keepPracticing")}</span>
                            </div>
                    </div>
                </div>

                <div className="p-6 border-t border-gray-200 bg-gray-50">
                    <div className="flex flex-col sm:flex-row gap-3 justify-center">
                        <button
                            onClick={onTryAgain}
                            className="px-6 py-3 bg-fuchsia-500 text-white rounded-lg hover:bg-fuchsia-600 transition-colors font-semibold"
                        >
                            {t("learn.sessionCompleted.tryAgain")}
                        </button>
                        <button
                            onClick={handleViewHighScores}
                            className="px-6 py-3 bg-gradient-to-r from-purple-500 to-fuchsia-500 text-white rounded-lg hover:from-purple-600 hover:to-fuchsia-600 transition-colors font-semibold"
                        >
                            {t("learn.sessionCompleted.viewHighScores")}
                        </button>
                        <button
                            onClick={onClose}
                            className="px-6 py-3 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-100 transition-colors font-semibold"
                        >
                            {t("learn.sessionCompleted.close")}
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};
