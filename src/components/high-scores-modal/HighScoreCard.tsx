import { ReactNode } from "react";
import { useTranslation } from "react-i18next";
import { StatCard } from "../StatCard";
import type { HighScore } from "./types";

interface HighScoreCardProps<T extends string> {
    category: T;
    scores: HighScore;
    categoryLabel: string;
    useBackdropBlur: boolean;
    renderIcon?: (category: T) => ReactNode;
}

export const HighScoreCard = <T extends string>({
    category,
    scores,
    categoryLabel,
    useBackdropBlur,
    renderIcon,
}: HighScoreCardProps<T>) => {
    const { t } = useTranslation();

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

    const cardClassName = useBackdropBlur
        ? "rounded-xl p-3 border bg-white border-primary-200"
        : "rounded-xl p-3 border bg-gradient-to-br from-background to-accent-50 border-primary-200";

    return (
        <div className={cardClassName}>
            <div className="flex items-center justify-between mb-3">
                {useBackdropBlur ? (
                    <div className="flex items-center gap-2">
                        {renderIcon && (
                            <div className="w-8 h-8 bg-surface-100 rounded-full flex items-center justify-center">
                                {renderIcon(category)}
                            </div>
                        )}
                        <div>
                            <h3 className="text-base font-semibold text-text-800">
                                {categoryLabel}
                            </h3>
                            <p className="text-xs text-text-500">
                                {t("learn.highScores.lastPlayed")}: {formatDate(scores.lastPlayed)}
                            </p>
                        </div>
                    </div>
                ) : (
                    <>
                        <h3 className="text-base font-semibold text-text-800">
                            {categoryLabel}
                        </h3>
                        <div className="flex gap-2">
                            <span className="px-2 py-1 bg-primary-200 text-primary-800 rounded-full text-xs font-medium">
                                {scores.bestStreak} 🔥
                            </span>
                        </div>
                    </>
                )}
            </div>

            <div className="grid grid-cols-2 gap-2 text-center">
                {useBackdropBlur ? (
                    <>
                        <StatCard
                            value={scores.score}
                            label={t("learn.highScores.bestScore")}
                            valueClassName="text-green-600"
                            containerClassName="bg-green-50 border-0"
                            variant="simple"
                        />
                        <StatCard
                            value={`${scores.accuracy}%`}
                            label={t("learn.highScores.bestAccuracy")}
                            valueClassName="text-blue-600"
                            containerClassName="bg-blue-50 border-0"
                            variant="simple"
                        />
                        <StatCard
                            value={scores.bestStreak}
                            label={t("learn.highScores.bestStreak")}
                            valueClassName="text-orange-600"
                            containerClassName="bg-orange-50 border-0"
                            variant="simple"
                        />
                        <StatCard
                            value={scores.total}
                            label={t("learn.highScores.totalQuestions")}
                            valueClassName="text-purple-600"
                            containerClassName="bg-purple-50 border-0"
                            variant="simple"
                        />
                    </>
                ) : (
                    <>
                        <StatCard
                            value={scores.score}
                            label={t("learn.highScores.bestScore")}
                            valueClassName="text-primary-600"
                            containerClassName="bg-white rounded-lg p-3 md:p-4 shadow-sm"
                            variant="simple"
                        />
                        <StatCard
                            value={`${scores.accuracy}%`}
                            label={t("learn.highScores.bestAccuracy")}
                            valueClassName="text-purple-600"
                            containerClassName="bg-white rounded-lg p-3 md:p-4 shadow-sm"
                            variant="simple"
                        />
                        <StatCard
                            value={scores.total}
                            label={t("learn.highScores.totalQuestions")}
                            valueClassName="text-accent-600"
                            containerClassName="bg-white rounded-lg p-3 md:p-4 shadow-sm"
                            variant="simple"
                        />
                        <StatCard
                            value={formatDate(scores.lastPlayed)}
                            label={t("learn.highScores.lastPlayed")}
                            valueClassName="text-primary-600"
                            containerClassName="bg-white rounded-lg p-3 md:p-4 shadow-sm"
                            variant="simple"
                        />
                    </>
                )}
            </div>
        </div>
    );
};