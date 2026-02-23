import { SkipForward } from "lucide-react";
import { useTranslation } from "react-i18next";

interface LearnSkipButtonProps {
    onClick: () => void;
}

export const LearnSkipButton = ({ onClick }: LearnSkipButtonProps) => {
    const { t } = useTranslation();

    return (
        <button
            onClick={onClick}
            className="mt-6 flex items-center gap-1 text-gray-400 hover:text-orange-500 text-sm underline transition-colors"
        >
            <SkipForward size={16} />
            {t("learn.skip")}
        </button>
    );
};
