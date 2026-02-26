import { ReadingLevel } from "../../helpers/readingHelper";
import { useTranslation } from "react-i18next";

interface ReadingScoreboardProps {
    score: number;
    total: number;
    accuracy: number;
    streak: number;
    selectedLevel: ReadingLevel;
}

export const ReadingScoreboard = ({ 
    score, 
    total, 
    accuracy, 
    streak, 
    selectedLevel 
}: ReadingScoreboardProps) => {
    const { t } = useTranslation();
    
    const levelLabels: Record<ReadingLevel, string> = {
        letters: t("learn.reading.levels.letters"),
        words: t("learn.reading.levels.words"), 
        sentences: t("learn.reading.levels.sentences"),
        stories: t("learn.reading.levels.stories")
    };

    return (
        <div className="w-full max-w-4xl mx-auto">
            <div className="bg-white rounded-2xl shadow-lg p-6 border-2 border-fuchsia-100">
                <div className="flex items-center justify-between mb-4">
                    <h3 className="text-xl font-bold text-gray-800">{t("learn.reading.scoreboard.readingProgress")}</h3>
                    <div className="flex items-center gap-2">
                        <span className="px-3 py-1 bg-fuchsia-100 text-fuchsia-800 rounded-full text-sm font-medium">
                            {levelLabels[selectedLevel]}
                        </span>
                    </div>
                </div>
                
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