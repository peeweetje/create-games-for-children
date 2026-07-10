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
                    className="w-full bg-gradient-to-r from-accent-500 to-primary-600 text-white py-3 px-6 rounded-xl hover:from-accent-600 hover:to-primary-700 transition-all duration-300 transform hover:scale-105 shadow-lg font-semibold"
                >
                    🏆 {t("learn.highScores.view")}
                </button>
        </div>
    );
};
