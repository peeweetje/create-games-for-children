import { ReactNode } from "react";
import { useTranslation } from "react-i18next";
import { HighScoreStatItem } from "./HighScoreStatItem";
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
        ? "rounded-xl p-4 md:p-6 border bg-white border-primary-200 hover:shadow-md transition-shadow"
        : "rounded-xl p-4 md:p-6 border bg-gradient-to-br from-background to-accent-50 border-primary-200";

    const backdropStat = (value: string | number, label: string, bg: string, textColor: string) => (
        <div className={`${bg} rounded-lg p-3`}>
            <div className={`text-2xl font-bold ${textColor}`}>
                {value}
            </div>
            <div className={`text-xs font-medium ${textColor}`}>
                {label}
            </div>
        </div>
    );

    const normalStat = (value: string | number, label: string, textColor: string) => (
        <HighScoreStatItem
            value={value}
            label={label}
            valueClassName={`text-xl md:text-2xl font-bold ${textColor}`}
        />
    );

    return (
        <div className={cardClassName}>
            <div className="flex items-center justify-between mb-4">
                {useBackdropBlur ? (
                    <div className="flex items-center gap-3">
                        {renderIcon && (
                            <div className="w-10 h-10 bg-surface-100 rounded-full flex items-center justify-center">
                                {renderIcon(category)}
                            </div>
                        )}
                        <div>
                            <h3 className="text-lg font-semibold text-text-800">
                                {categoryLabel}
                            </h3>
                            <p className="text-sm text-text-500">
                                {t("learn.highScores.lastPlayed")}: {formatDate(scores.lastPlayed)}
                            </p>
                        </div>
                    </div>
                ) : (
                    <>
                        <h3 className="text-lg font-semibold text-text-800">
                            {categoryLabel}
                        </h3>
                        <div className="flex gap-2">
                            <span className="px-2 py-1 bg-primary-200 text-primary-800 rounded-full text-sm font-medium">
                                {scores.bestStreak} 🔥
                            </span>
                        </div>
                    </>
                )}
            </div>

            <div className="grid grid-cols-2 gap-3 md:gap-4 text-center">
                {useBackdropBlur ? (
                    <>
                        {backdropStat(scores.score, t("learn.highScores.bestScore"), "bg-green-50", "text-green-600")}
                        {backdropStat(`${scores.accuracy}%`, t("learn.highScores.bestAccuracy"), "bg-blue-50", "text-blue-600")}
                        {backdropStat(scores.bestStreak, t("learn.highScores.bestStreak"), "bg-orange-50", "text-orange-600")}
                        {backdropStat(scores.total, t("learn.highScores.totalQuestions"), "bg-purple-50", "text-purple-600")}
                    </>
                ) : (
                    <>
                        {normalStat(scores.score, t("learn.highScores.bestScore"), "text-primary-600")}
                        {normalStat(`${scores.accuracy}%`, t("learn.highScores.bestAccuracy"), "text-purple-600")}
                        {normalStat(scores.total, t("learn.highScores.totalQuestions"), "text-accent-600")}
                        {normalStat(formatDate(scores.lastPlayed), t("learn.highScores.lastPlayed"), "text-primary-600")}
                    </>
                )}
            </div>
        </div>
    );
};