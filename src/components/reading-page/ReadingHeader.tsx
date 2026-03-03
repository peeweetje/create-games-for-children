
import { useTranslation } from "react-i18next";

export const ReadingHeader = () => {
    const { t } = useTranslation();
    
    return (
        <div className="text-center space-y-2">
            <div className="flex items-center justify-center gap-3">
                <h1 className="text-2xl md:text-3xl font-extrabold text-violet-600 flex items-center gap-3 drop-shadow-sm tracking-wide">
                    <div className="text-4xl">🔤</div>
                    <div className="text-4xl">📖</div>
                    {t("learn.reading.title")}
                </h1>
            </div>
            <p className="p-2 text-xl text-gray-600">
                {t("learn.reading.subtitle")}
            </p>
        </div>
    );
};
