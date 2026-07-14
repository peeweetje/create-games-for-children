import { useTranslation } from "react-i18next";

interface HighScoresModalFooterProps {
    onClose: () => void;
    onClearScores: () => void;
    useBackdropBlur: boolean;
}

export const HighScoresModalFooter = ({
    onClose,
    onClearScores,
    useBackdropBlur,
}: HighScoresModalFooterProps) => {
    const { t } = useTranslation();

    const handleClearScores = () => {
        const confirmed = confirm(t("learn.highScores.clearConfirmation"));
        if (confirmed) {
            onClearScores();
        }
    };

    return (
        <div className={`p-6 border-t ${useBackdropBlur ? 'border-surface-200' : 'border-surface-200 bg-surface-50'}`}>
            <div className="flex justify-between items-center">
                <div className="text-sm text-text-600">
                    {useBackdropBlur ? t("learn.highScores.keepPracticing") : t("learn.highScores.keepReading")}
                </div>
                <div className="flex gap-3">
                    <button
                        onClick={handleClearScores}
                        className="px-4 py-2 text-red-600 border border-red-600 rounded-lg hover:bg-red-600 hover:text-white transition-colors"
                    >
                        {t("learn.highScores.clearAll")}
                    </button>
                    <button
                        onClick={onClose}
                        className={`px-6 py-2 text-white rounded-lg transition-colors ${
                            useBackdropBlur
                                ? 'bg-primary-600 hover:bg-primary-700'
                                : 'bg-primary hover:bg-primary-600'
                        }`}
                    >
                        {t("learn.highScores.close")}
                    </button>
                </div>
            </div>
        </div>
    );
};