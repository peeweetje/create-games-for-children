import { Calculator } from "lucide-react";
import { useTranslation } from "react-i18next";

export const LearnHeader = () => {
    const { t } = useTranslation();

    return (
        <div className="text-center mb-6">
            <div className="flex items-center justify-center gap-2 mb-1">
                <Calculator size={36} className="text-violet-500" />
                <h1 className="text-4xl font-bold text-violet-600">{t("learn.title")}</h1>
            </div>
            <p className="text-gray-600 text-lg">{t("learn.subtitle")}</p>
        </div>
    );
};
