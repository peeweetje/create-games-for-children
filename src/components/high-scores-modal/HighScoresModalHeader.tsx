import { Trophy, X } from "lucide-react";
import { useTranslation } from "react-i18next";
import { CloseButton } from "../buttons/CloseButton";

interface HighScoresModalHeaderProps {
    onClose: () => void;
    useBackdropBlur: boolean;
}

export const HighScoresModalHeader = ({ onClose, useBackdropBlur }: HighScoresModalHeaderProps) => {
    const { t } = useTranslation();

    return (
        <div className={`p-6 border-b ${useBackdropBlur ? 'border-primary-200' : 'border-surface-200'}`}>
            <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                    {useBackdropBlur ? (
                        <Trophy size={32} className="text-yellow-500" />
                    ) : (
                        <div className="w-10 h-10 bg-gradient-to-r from-primary to-accent-600 rounded-full flex items-center justify-center">
                            <Trophy size={20} className="text-white" />
                        </div>
                    )}
                    <div>
                        <h2 className={`text-2xl font-bold ${useBackdropBlur ? 'text-primary-900' : 'text-text-800'}`}>
                            {t("learn.highScores.title")}
                        </h2>
                        <p className="text-sm text-text-600">
                            {t("learn.highScores.subtitle")}
                        </p>
                    </div>
                </div>
                {useBackdropBlur ? (
                    <CloseButton
                        onClick={onClose}
                        className="p-2 text-primary hover:text-primary-700 hover:bg-primary-100 rounded-full transition-colors"
                        size={24}
                        strokeWidth={2}
                    />
                ) : (
                    <button
                        onClick={onClose}
                        className="text-text-400 hover:text-text-600 transition-colors"
                    >
                        <X size={24} />
                    </button>
                )}
            </div>
        </div>
    );
};