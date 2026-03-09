import { useTranslation } from "react-i18next";

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
            <div className="bg-white rounded-2xl shadow-lg p-6 border-2 border-violet-100">
                {title && (
                    <div className="flex items-center justify-between mb-4">
                        <h3 className="text-xl font-bold text-violet-600">{title}</h3>
                        {levelLabel && (
                            <div className="flex items-center gap-2">
                                <span className="px-3 py-1 bg-violet-100 text-violet-800 rounded-full text-sm font-medium">
                                    {levelLabel}
                                </span>
                            </div>
                        )}
                    </div>
                )}
                
                <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                    <div className="bg-gradient-to-br from-green-50 to-emerald-50 rounded-lg p-4 border border-green-200">
                        <div className="text-2xl font-bold text-green-600">{score}</div>
                        <div className="text-sm text-gray-600">{t("learn.reading.scoreboard.correct")}</div>
                    </div>
                    
                    <div className="bg-gradient-to-br from-blue-50 to-cyan-50 rounded-lg p-4 border border-blue-200">
                        <div className="text-2xl font-bold text-blue-600">{total}</div>
                        <div className="text-sm text-gray-600">{t("learn.reading.scoreboard.total")}</div>
                    </div>
                    
                    <div className="bg-gradient-to-br from-purple-50 to-fuchsia-50 rounded-lg p-4 border border-purple-200">
                        <div className="text-2xl font-bold text-purple-600">{accuracy}%</div>
                        <div className="text-sm text-gray-600">{t("learn.reading.scoreboard.accuracy")}</div>
                    </div>
                    
                    <div className="bg-gradient-to-br from-orange-50 to-amber-50 rounded-lg p-4 border border-orange-200">
                        <div className="text-2xl font-bold text-orange-600">{streak}</div>
                        <div className="text-sm text-gray-600">{t("learn.reading.scoreboard.streak")}</div>
                    </div>
                </div>
                
                {streak > 0 && streak % 3 === 0 && (
                    <div className="mt-4 p-3 bg-yellow-100 border border-yellow-200 rounded-lg">
                        <div className="flex items-center gap-2 text-yellow-800 font-semibold">
                            <span>⭐</span>
                            <span>{t("learn.reading.scoreboard.starEarned", { streak })}</span>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
};
