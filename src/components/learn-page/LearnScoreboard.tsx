import { Trophy, Hash, Target, Flame } from "lucide-react";
import { useTranslation } from "react-i18next";

interface LearnScoreboardProps {
    score: number;
    total: number;
    accuracy: number;
    streak: number;
}

export const LearnScoreboard = ({
    score,
    total,
    accuracy,
    streak,
}: LearnScoreboardProps) => {
    const { t } = useTranslation();

    return (
        <div className="flex gap-4 mb-6 bg-white rounded-2xl shadow-md px-5 py-3">
            <div className="text-center">
                <div className="flex items-center justify-center gap-1 mb-1">
                    <Trophy size={14} className="text-green-500" />
                    <p className="text-xs text-gray-500 font-semibold uppercase">
                        {t("learn.scoreboard.score")}
                    </p>
                </div>
                <p className="text-3xl font-bold text-green-500">{score}</p>
            </div>
            <div className="w-px bg-gray-200" />
            <div className="text-center">
                <div className="flex items-center justify-center gap-1 mb-1">
                    <Hash size={14} className="text-gray-500" />
                    <p className="text-xs text-gray-500 font-semibold uppercase">
                        {t("learn.scoreboard.total")}
                    </p>
                </div>
                <p className="text-3xl font-bold text-gray-700">{total}</p>
            </div>
            <div className="w-px bg-gray-200" />
            <div className="text-center">
                <div className="flex items-center justify-center gap-1 mb-1">
                    <Target size={14} className="text-blue-500" />
                    <p className="text-xs text-gray-500 font-semibold uppercase">
                        {t("learn.scoreboard.accuracy")}
                    </p>
                </div>
                <p className="text-3xl font-bold text-blue-500">{accuracy}%</p>
            </div>
            <div className="w-px bg-gray-200" />
            <div className="text-center">
                <div className="flex items-center justify-center gap-1 mb-1">
                    <Flame size={14} className="text-orange-500" />
                    <p className="text-xs text-gray-500 font-semibold uppercase">
                        {t("learn.scoreboard.streak")}
                    </p>
                </div>
                <p className="text-3xl font-bold text-orange-500">{streak}</p>
            </div>
        </div>
    );
};
