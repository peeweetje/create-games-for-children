import { ReadingLevel } from "../../helpers/readingHelper";
import { useReadingProgress } from "../../helpers/readingHelper";
import { useTranslation } from "react-i18next";

interface ReadingHighScoresModalProps {
    isOpen: boolean;
    onClose: () => void;
}

export const ReadingHighScoresModal = ({ isOpen, onClose }: ReadingHighScoresModalProps) => {
    const { t } = useTranslation();
    const { highScores } = useReadingProgress();

    if (!isOpen) return null;

    const levelLabels: Record<ReadingLevel, string> = {
        letters: t("learn.reading.levels.letters"),
        words: t("learn.reading.levels.words"), 
        sentences: t("learn.reading.levels.sentences"),
        stories: t("learn.reading.levels.stories")
    };

    const clearAllScores = () => {
        if (confirm(t("learn.highScores.clearConfirmation") || "Are you sure you want to clear all high scores? This action cannot be undone.")) {
            const emptyScores = {
                letters: { score: 0, total: 0, accuracy: 0, bestStreak: 0, lastPlayed: "" },
                words: { score: 0, total: 0, accuracy: 0, bestStreak: 0, lastPlayed: "" },
                sentences: { score: 0, total: 0, accuracy: 0, bestStreak: 0, lastPlayed: "" },
                stories: { score: 0, total: 0, accuracy: 0, bestStreak: 0, lastPlayed: "" },
            };
            
            useReadingProgress.setState({ highScores: emptyScores });
            localStorage.removeItem("reading-high-scores");
        }
    };

    const formatDate = (dateString: string) => {
        if (!dateString) return t("learn.highScores.never") || "Never";
        return new Date(dateString).toLocaleDateString();
    };

    return (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
            <div className="bg-white rounded-2xl shadow-2xl max-w-4xl w-full max-h-[90vh] overflow-y-auto">
                <div className="p-6 border-b border-gray-200">
                    <div className="flex items-center justify-between">
                        <div className="flex items-center gap-3">
                            <div className="w-10 h-10 bg-gradient-to-r from-fuchsia-500 to-purple-600 rounded-full flex items-center justify-center">
                                <span className="text-white text-lg">🏆</span>
                            </div>
                            <div>
                                <h2 className="text-2xl font-bold text-gray-800">{t("learn.highScores.title")}</h2>
                                <p className="text-gray-600">{t("learn.highScores.subtitle")}</p>
                            </div>
                        </div>
                        <button
                            onClick={onClose}
                            className="text-gray-400 hover:text-gray-600 transition-colors"
                        >
                            <span className="text-2xl">✕</span>
                        </button>
                    </div>
                </div>

                <div className="p-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        {Object.entries(highScores).map(([level, scores]) => (
                            <div key={level} className="bg-gradient-to-br from-fuchsia-50 to-purple-50 rounded-xl p-6 border border-fuchsia-200">
                                <div className="flex items-center justify-between mb-4">
                                    <h3 className="text-lg font-semibold text-gray-800">{levelLabels[level as ReadingLevel]}</h3>
                                    <div className="flex gap-2">
                                        <span className="px-2 py-1 bg-fuchsia-200 text-fuchsia-800 rounded-full text-sm font-medium">
                                            {scores.bestStreak} 🔥
                                        </span>
                                    </div>
                                </div>
                                
                                <div className="grid grid-cols-2 gap-4 text-center">
                                    <div className="bg-white rounded-lg p-4 shadow-sm">
                                        <div className="text-2xl font-bold text-fuchsia-600">{scores.score}</div>
                                        <div className="text-sm text-gray-600">{t("learn.highScores.bestScore")}</div>
                                    </div>
                                    <div className="bg-white rounded-lg p-4 shadow-sm">
                                        <div className="text-2xl font-bold text-purple-600">{scores.accuracy}%</div>
                                        <div className="text-sm text-gray-600">{t("learn.highScores.bestAccuracy")}</div>
                                    </div>
                                    <div className="bg-white rounded-lg p-4 shadow-sm">
                                        <div className="text-2xl font-bold text-pink-600">{scores.total}</div>
                                        <div className="text-sm text-gray-600">{t("learn.highScores.totalQuestions")}</div>
                                    </div>
                                    <div className="bg-white rounded-lg p-4 shadow-sm">
                                        <div className="text-2xl font-bold text-indigo-600">{formatDate(scores.lastPlayed)}</div>
                                        <div className="text-sm text-gray-600">{t("learn.highScores.lastPlayed")}</div>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>

                <div className="p-6 border-t border-gray-200 bg-gray-50">
                    <div className="flex justify-between items-center">
                        <div className="text-sm text-gray-600">
                            {t("learn.highScores.keepReading")}
                        </div>
                        <div className="flex gap-3">
                            <button
                                onClick={clearAllScores}
                                className="px-4 py-2 text-red-600 border border-red-600 rounded-lg hover:bg-red-600 hover:text-white transition-colors"
                            >
                                {t("learn.highScores.clearAll")}
                            </button>
                            <button
                                onClick={onClose}
                                className="px-6 py-2 bg-fuchsia-500 text-white rounded-lg hover:bg-fuchsia-600 transition-colors"
                            >
                                {t("learn.highScores.close")}
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};
