import { useTranslation } from "react-i18next";

interface ReadingSkipButtonProps {
    onClick: () => void;
}

export const ReadingSkipButton = ({ onClick }: ReadingSkipButtonProps) => {
    const { t } = useTranslation();
    
    return (
        <div className="w-full max-w-2xl mx-auto">
            <button
                onClick={onClick}
                className="w-full bg-gradient-to-r from-gray-400 to-gray-600 text-white py-3 px-6 rounded-xl hover:from-gray-500 hover:to-gray-700 transition-all duration-300 transform hover:scale-105 shadow-lg font-semibold"
            >
                ⏭️ {t("learn.skip")}
            </button>
        </div>
    );
};
