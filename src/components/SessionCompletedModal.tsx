import { Trophy } from "lucide-react";
import { useTranslation } from "react-i18next";
import { StatCard } from "./StatCard";

interface SessionCompletedModalProps {
    isOpen: boolean;
    onClose: () => void;
    onTryAgain: () => void;
    onViewHighScores?: () => void;
    score: number;
    total: number;
    accuracy: number;
    streak: number;
    stars: number;
    categoryLabel: string;
    questionsPerSession: number;
    showCloseButton?: boolean;
    showKeepPracticing?: boolean;
    showTotalStat?: boolean;
    variant?: "learn" | "reading";
}

export const SessionCompletedModal = ({
    isOpen,
    onClose,
    onTryAgain,
    onViewHighScores,
    score,
    total,
    accuracy,
    streak,
    stars,
    categoryLabel,
    questionsPerSession,
    showCloseButton = false,
    showKeepPracticing = false,
    showTotalStat = true,
    variant = "learn",
}: SessionCompletedModalProps) => {
    const { t } = useTranslation();

    if (!isOpen) return null;

    const backdropClass =
        variant === "reading"
            ? "fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4"
            : "fixed inset-0 bg-transparent backdrop-blur-sm flex items-center justify-center p-4 z-50";

    return (
        <div className={backdropClass}>
            <div className="bg-white rounded-2xl shadow-2xl max-w-2xl w-full">
                <div className="p-6 border-b border-surface-200">
                    <div className="text-center">
                        {variant === "learn" ? (
                            <Trophy size={48} className="text-star mx-auto mb-2" />
                        ) : (
                            <div className="text-6xl mb-4">🎉</div>
                        )}
                        <h2 className="text-2xl font-bold text-primary-900 mb-2">
                            {t("learn.sessionCompleted.title")}
                        </h2>
                        <p className="text-text-600">
                            {t("learn.sessionCompleted.subtitle", {
                                count: questionsPerSession,
                                operation: categoryLabel,
                            })}
                        </p>
                    </div>
                </div>

                <div className="p-6">
                    <div
                        className={`grid gap-4 mb-6 ${
                            showTotalStat
                                ? "grid-cols-2 md:grid-cols-3"
                                : "grid-cols-2 md:grid-cols-4"
                        }`}
                    >
                        <StatCard
                            value={score}
                            label={t("learn.sessionCompleted.correct")}
                            valueClassName="text-success"
                            containerClassName="bg-gradient-to-br from-green-50 to-emerald-50 border-green-200"
                        />
                        {showTotalStat && (
                            <StatCard
                                value={total}
                                label={t("learn.sessionCompleted.total")}
                                valueClassName="text-info-600"
                                containerClassName="bg-gradient-to-br from-blue-50 to-cyan-50 border-blue-200"
                            />
                        )}
                        <StatCard
                            value={`${accuracy}%`}
                            label={t("learn.sessionCompleted.accuracy")}
                            valueClassName="text-purple-600"
                            containerClassName="bg-gradient-to-br from-purple-50 to-fuchsia-50 border-purple-200"
                        />
                        <StatCard
                            value={streak}
                            label={t("learn.sessionCompleted.bestStreak")}
                            valueClassName="text-streak"
                            containerClassName="bg-gradient-to-br from-orange-50 to-amber-50 border-orange-200"
                        />
                        <StatCard
                            value={stars}
                            label={t("learn.sessionCompleted.starsEarned")}
                            valueClassName="text-star-600"
                            containerClassName="bg-gradient-to-br from-yellow-50 to-amber-50 border-yellow-200"
                        />
                    </div>

                    {showKeepPracticing && (
                        <div className="bg-gradient-to-r from-primary-100 to-accent-100 rounded-lg p-4 border border-primary-200">
                            <div className="flex items-center justify-center gap-2 text-primary-800 font-semibold">
                                <span>⭐</span>
                                <span>{t("learn.sessionCompleted.keepPracticing")}</span>
                            </div>
                        </div>
                    )}
                </div>

                <div className="p-6 border-t border-surface-200 bg-surface-50">
                    <div className="flex flex-col sm:flex-row gap-3 justify-center">
                        <button
                            onClick={onTryAgain}
                            className="px-6 py-3 bg-primary text-white rounded-lg hover:bg-primary-600 transition-colors font-semibold"
                        >
                            {t("learn.sessionCompleted.tryAgain")}
                        </button>
                        {onViewHighScores && (
                            <button
                                onClick={onViewHighScores}
                                className="px-6 py-3 bg-gradient-to-r from-accent-500 to-primary text-white rounded-lg hover:from-accent-600 hover:to-primary-600 transition-colors font-semibold"
                            >
                                {t("learn.sessionCompleted.viewHighScores")}
                            </button>
                        )}
                        {showCloseButton && (
                            <button
                                onClick={onClose}
                                className="px-6 py-3 border border-surface-300 text-text-700 rounded-lg hover:bg-surface-100 transition-colors font-semibold"
                            >
                                {t("learn.sessionCompleted.close")}
                            </button>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
};