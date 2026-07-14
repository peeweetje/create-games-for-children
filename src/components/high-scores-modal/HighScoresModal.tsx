import { useTranslation } from "react-i18next";
import { HighScoresModalHeader } from "./HighScoresModalHeader";
import { HighScoreCard } from "./HighScoreCard";
import { HighScoresModalFooter } from "./HighScoresModalFooter";
import type { HighScoresModalProps, HighScore } from "./types";

export const HighScoresModal = <T extends string>({
    isOpen,
    onClose,
    highScores,
    categoryLabels,
    onClearScores,
    renderIcon,
    useBackdropBlur = false,
}: HighScoresModalProps<T>) => {
    const { t } = useTranslation();

    if (!isOpen) return null;

    const backdropClass = useBackdropBlur
        ? "fixed inset-0 bg-transparent backdrop-blur-sm flex items-center justify-center p-4 z-50"
        : "fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4";

    return (
        <div className={backdropClass}>
            <div className="bg-white rounded-2xl shadow-2xl max-w-4xl w-full max-h-[90vh] overflow-y-auto">
                <HighScoresModalHeader
                    onClose={onClose}
                    useBackdropBlur={useBackdropBlur}
                />

                <div className="p-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        {Object.entries(highScores).map(([category, scores]) => {
                            const categoryTyped = category as T;
                            const scoresTyped = scores as HighScore;
                            return (
                                <HighScoreCard
                                    key={category}
                                    category={categoryTyped}
                                    scores={scoresTyped}
                                    categoryLabel={categoryLabels[categoryTyped]}
                                    useBackdropBlur={useBackdropBlur}
                                    renderIcon={renderIcon}
                                />
                            );
                        })}
                    </div>
                </div>

                <HighScoresModalFooter
                    onClose={onClose}
                    onClearScores={onClearScores}
                    useBackdropBlur={useBackdropBlur}
                />
            </div>
        </div>
    );
};