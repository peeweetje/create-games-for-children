import { Lightbulb } from "lucide-react";
import { useTranslation } from "react-i18next";

export const LearnTip = () => {
    const { t } = useTranslation();

    return (
        <div className="mt-8 bg-yellow-100 border-2 border-yellow-300 rounded-2xl px-6 py-4 max-w-sm w-full">
            <div className="flex items-start gap-2">
                <Lightbulb size={20} className="text-yellow-500 shrink-0 mt-0.5" />
                <p className="text-yellow-700 font-semibold text-sm">
                    {t("learn.tip")}
                </p>
            </div>
        </div>
    );
};
