import { useTranslation } from "react-i18next";
import { ReactNode } from "react";
import { Trophy, X } from "lucide-react";
import { CloseButton } from "./buttons/CloseButton";

interface HighScore {
    score: number;
    total: number;
    accuracy: number;
    bestStreak: number;
    lastPlayed: string;
}

interface HighScoresModalProps<T extends string> {
    isOpen: boolean;
    onClose: () => void;
    highScores: Record<T, HighScore>;
    categoryLabels: Record<T, string>;
    onClearScores: () => void;
    renderIcon?: (category: T) => ReactNode;
    useBackdropBlur?: boolean;
}

export const HighScoresModal = <T extends string>({
    isOpen,
    onClose,
    highScores,
    categoryLabels,
    onClearScores,
    renderIcon,
    useBackdropBlur = false,
}: HighScoresModalProps<T>) => {
    const { t } = useTranslation();

    if (!isOpen) return null;

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

    const handleClearScores = () => {
        const confirmed = confirm(t("learn.highScores.clearConfirmation"));
        if (confirmed) {
            onClearScores();
        }
    };

    const backdropClass = useBackdropBlur
        ? "fixed inset-0 bg-transparent backdrop-blur-sm flex items-center justify-center p-4 z-50"
        : "fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4";

    return (
        <div className={backdropClass}>
            <div className="bg-white rounded-2xl shadow-2xl max-w-4xl w-full max-h-[90vh] overflow-y-auto">
                <div className={`p-6 border-b ${useBackdropBlur ? 'border-violet-200' : 'border-gray-200'}`}>
                    <div className="flex items-center justify-between">
                        <div className="flex items-center gap-3">
                            {useBackdropBlur ? (
                                <Trophy size={32} className="text-yellow-500" />
                            ) : (
                                <div className="w-10 h-10 bg-gradient-to-r from-violet-500 to-purple-600 rounded-full flex items-center justify-center">
                                    <Trophy size={20} className="text-white" />
                                </div>
                            )}
                            <div>
                                <h2 className={`text-2xl font-bold ${useBackdropBlur ? 'text-violet-900' : 'text-gray-800'}`}>
                                    {t("learn.highScores.title")}
                                </h2>
                                <p className="text-sm text-gray-600">
                                    {t("learn.highScores.subtitle")}
                                </p>
                            </div>
                        </div>
                        {useBackdropBlur ? (
                            <CloseButton
                                onClick={onClose}
                                className="p-2 text-violet-500 hover:text-violet-700 hover:bg-violet-100 rounded-full transition-colors"
                                size={24}
                                strokeWidth={2}
                            />
                        ) : (
                            <button
                                onClick={onClose}
                                className="text-gray-400 hover:text-gray-600 transition-colors"
                            >
                                <X size={24} />
                            </button>
                        )}
                    </div>
                </div>

                <div className="p-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        {Object.entries(highScores).map(([category, scores]) => {
                            const categoryTyped = category as T;
                            const scoresTyped = scores as HighScore;
                            return (
                            <div
                                key={category}
                                className={`rounded-xl p-4 md:p-6 border ${
                                    useBackdropBlur
                                        ? 'bg-white border-violet-200 hover:shadow-md transition-shadow'
                                        : 'bg-gradient-to-br from-violet-50 to-purple-50 border-violet-200'
                                }`}
                            >
                                <div className="flex items-center justify-between mb-4">
                                    {useBackdropBlur ? (
                                        <div className="flex items-center gap-3">
                                            {renderIcon && (
                                                <div className="w-10 h-10 bg-gray-100 rounded-full flex items-center justify-center">
                                                    {renderIcon(categoryTyped)}
                                                </div>
                                            )}
                                            <div>
                                                <h3 className="text-lg font-semibold text-gray-800">
                                                    {categoryLabels[categoryTyped]}
                                                </h3>
                                                <p className="text-sm text-gray-500">
                                                    {t("learn.highScores.lastPlayed")}: {formatDate(scoresTyped.lastPlayed)}
                                                </p>
                                            </div>
                                        </div>
                                    ) : (
                                        <>
                                            <h3 className="text-lg font-semibold text-gray-800">
                                                {categoryLabels[categoryTyped]}
                                            </h3>
                                            <div className="flex gap-2">
                                                <span className="px-2 py-1 bg-violet-200 text-violet-800 rounded-full text-sm font-medium">
                                                    {scoresTyped.bestStreak} 🔥
                                                </span>
                                            </div>
                                        </>
                                    )}
                                </div>

                                <div className="grid grid-cols-2 gap-3 md:gap-4 text-center">
                                    {useBackdropBlur ? (
                                        <>
                                            <div className="bg-green-50 rounded-lg p-3">
                                                <div className="text-2xl font-bold text-green-600">
                                                    {scoresTyped.score}
                                                </div>
                                                <div className="text-xs text-green-600 font-medium">
                                                    {t("learn.highScores.bestScore")}
                                                </div>
                                            </div>
                                            <div className="bg-blue-50 rounded-lg p-3">
                                                <div className="text-2xl font-bold text-blue-600">
                                                    {scoresTyped.accuracy}%
                                                </div>
                                                <div className="text-xs text-blue-600 font-medium">
                                                    {t("learn.highScores.bestAccuracy")}
                                                </div>
                                            </div>
                                            <div className="bg-orange-50 rounded-lg p-3">
                                                <div className="text-2xl font-bold text-orange-600">
                                                    {scoresTyped.bestStreak}
                                                </div>
                                                <div className="text-xs text-orange-600 font-medium">
                                                    {t("learn.highScores.bestStreak")}
                                                </div>
                                            </div>
                                            <div className="bg-purple-50 rounded-lg p-3">
                                                <div className="text-2xl font-bold text-purple-600">
                                                    {scoresTyped.total}
                                                </div>
                                                <div className="text-xs text-purple-600 font-medium">
                                                    {t("learn.highScores.totalQuestions")}
                                                </div>
                                            </div>
                                        </>
                                    ) : (
                                        <>
                                            <div className="bg-white rounded-lg p-3 md:p-4 shadow-sm">
                                                <div className="text-xl md:text-2xl font-bold text-violet-600">
                                                    {scoresTyped.score}
                                                </div>
                                                <div className="text-xs md:text-sm text-gray-600">
                                                    {t("learn.highScores.bestScore")}
                                                </div>
                                            </div>
                                            <div className="bg-white rounded-lg p-3 md:p-4 shadow-sm">
                                                <div className="text-xl md:text-2xl font-bold text-purple-600">
                                                    {scoresTyped.accuracy}%
                                                </div>
                                                <div className="text-xs md:text-sm text-gray-600">
                                                    {t("learn.highScores.bestAccuracy")}
                                                </div>
                                            </div>
                                            <div className="bg-white rounded-lg p-3 md:p-4 shadow-sm">
                                                <div className="text-xl md:text-2xl font-bold text-pink-600">
                                                    {scoresTyped.total}
                                                </div>
                                                <div className="text-xs md:text-sm text-gray-600">
                                                    {t("learn.highScores.totalQuestions")}
                                                </div>
                                            </div>
                                            <div className="bg-white rounded-lg p-3 md:p-4 shadow-sm">
                                                <div className="text-xl md:text-2xl font-bold text-indigo-600">
                                                    {formatDate(scoresTyped.lastPlayed)}
                                                </div>
                                                <div className="text-xs md:text-sm text-gray-600">
                                                    {t("learn.highScores.lastPlayed")}
                                                </div>
                                            </div>
                                        </>
                                    )}
                                </div>
                            </div>
                            );
                        })}
                    </div>
                </div>

                <div className={`p-6 border-t ${useBackdropBlur ? 'border-gray-200' : 'border-gray-200 bg-gray-50'}`}>
                    <div className="flex justify-between items-center">
                        <div className="text-sm text-gray-600">
                            {useBackdropBlur ? t("learn.highScores.keepPracticing") : t("learn.highScores.keepReading")}
                        </div>
                        <div className="flex gap-3">
                            <button
                                onClick={handleClearScores}
                                className="px-4 py-2 text-red-600 border border-red-600 rounded-lg hover:bg-red-600 hover:text-white transition-colors"
                            >
                                {t("learn.highScores.clearAll")}
                            </button>
                            <button
                                onClick={onClose}
                                className={`px-6 py-2 text-white rounded-lg transition-colors ${
                                    useBackdropBlur
                                        ? 'bg-violet-600 hover:bg-violet-700'
                                        : 'bg-violet-500 hover:bg-violet-600'
                                }`}
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
