import { useTranslation } from "react-i18next";

interface ReadingViewHighScoresButtonProps {
    onClick: () => void;
}

export const ReadingViewHighScoresButton = ({ onClick }: ReadingViewHighScoresButtonProps) => {
    const { t } = useTranslation();
    
    return (
        <div className="w-full max-w-2xl mx-auto">
                <button
                    onClick={onClick}
                    className="w-full bg-gradient-to-r from-purple-500 to-violet-600 text-white py-3 px-6 rounded-xl hover:from-purple-600 hover:to-violet-700 transition-all duration-300 transform hover:scale-105 shadow-lg font-semibold"
                >
                    🏆 {t("learn.highScores.view")}
                </button>
        </div>
    );
};
