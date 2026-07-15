import { useTranslation } from "react-i18next";
import { StatCard } from "./StatCard";

interface ScoreboardProps {
    score: number;
    total: number;
    accuracy: number;
    streak: number;
    title?: string;
    levelLabel?: string;
}

export const Scoreboard = ({
    score,
    total,
    accuracy,
    streak,
    title,
    levelLabel
}: ScoreboardProps) => {
    const { t } = useTranslation();

    return (
        <div className="w-full max-w-2xl mx-auto p-2">
            <div className="bg-white rounded-2xl shadow-lg p-6 border-2 border-primary-100">
                {title && (
                    <div className="flex items-center justify-between mb-4">
                        <h3 className="text-xl font-bold text-primary-600">{title}</h3>
                        {levelLabel && (
                            <div className="flex items-center gap-2">
                                <span className="px-3 py-1 bg-primary-100 text-primary-800 rounded-full text-sm font-medium">
                                    {levelLabel}
                                </span>
                            </div>
                        )}
                    </div>
                )}
                
                <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                    <StatCard
                        value={score}
                        label={t("learn.reading.scoreboard.correct")}
                        valueClassName="text-green-600"
                        containerClassName="bg-gradient-to-br from-green-50 to-emerald-50 border-green-200"
                    />
                    <StatCard
                        value={total}
                        label={t("learn.reading.scoreboard.total")}
                        valueClassName="text-info-600"
                        containerClassName="bg-gradient-to-br from-blue-50 to-cyan-50 border-blue-200"
                    />
                    <StatCard
                        value={`${accuracy}%`}
                        label={t("learn.reading.scoreboard.accuracy")}
                        valueClassName="text-purple-600"
                        containerClassName="bg-gradient-to-br from-purple-50 to-fuchsia-50 border-purple-200"
                    />
                    <StatCard
                        value={streak}
                        label={t("learn.reading.scoreboard.streak")}
                        valueClassName="text-orange-600"
                        containerClassName="bg-gradient-to-br from-orange-50 to-amber-50 border-orange-200"
                    />
                </div>
                
                {streak > 0 && streak % 3 === 0 && (
                    <div className="mt-4 p-3 bg-star/10 border border-star/30 rounded-lg">
                        <div className="flex items-center gap-2 text-star-600 font-semibold">
                            <span>⭐</span>
                            <span>{t("learn.reading.scoreboard.starEarned", { streak })}</span>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
};