
import { useTranslation } from "react-i18next";

export const ReadingHeader = () => {
    const { t } = useTranslation();
    
    return (
        <div className="text-center space-y-2">
            <h1 className="text-2xl md:text-3xl font-extrabold text-primary-600 flex items-center justify-center gap-3 drop-shadow-sm tracking-wide">
                <span className="text-4xl" aria-hidden="true">🔤</span>
                <span className="text-4xl" aria-hidden="true">📖</span>
                {t("learn.reading.title")}
            </h1>
            <p className="p-2 text-xl text-text-600">
                {t("learn.reading.subtitle")}
            </p>
        </div>
    );
};
