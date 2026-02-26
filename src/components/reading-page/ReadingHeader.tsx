import { useTranslation } from "react-i18next";

export const ReadingHeader = () => {
    const { t } = useTranslation();
    
    return (
        <div className="w-full max-w-4xl mx-auto text-center mb-8">
            <div className="bg-gradient-to-r from-fuchsia-500 to-purple-600 rounded-2xl p-8 text-white shadow-2xl">
                <div className="flex items-center justify-center gap-4 mb-4">
                    <div className="text-6xl">📚</div>
                    <div className="text-6xl">🔤</div>
                    <div className="text-6xl">📖</div>
                </div>
                <h1 className="text-4xl font-bold mb-2">{t("learn.reading.title")}</h1>
                <p className="text-xl opacity-90">{t("learn.reading.subtitle")}</p>
            </div>
        </div>
    );
};
