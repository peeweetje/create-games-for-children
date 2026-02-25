import { Trophy } from "lucide-react";
import { useTranslation } from "react-i18next";

interface LearnViewHighScoresButtonProps {
    onClick: () => void;
}

export const LearnViewHighScoresButton = ({ onClick }: LearnViewHighScoresButtonProps) => {
    const { t } = useTranslation();

    return (
        <button
            onClick={onClick}
            className="mt-4 flex items-center gap-2 px-4 py-2 bg-yellow-500 text-white rounded-full hover:bg-yellow-600 transition-colors shadow-md"
        >
            <Trophy size={20} />
            <span className="font-medium">{t("learn.highScores.view")}</span>
        </button>
    );
};