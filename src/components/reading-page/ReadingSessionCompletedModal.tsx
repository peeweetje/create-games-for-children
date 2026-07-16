import { useTranslation } from "react-i18next";
import { SessionCompletedModal } from "../SessionCompletedModal";
import type { ReadingLevel } from "../../helpers/readingHelper";

interface ReadingSessionCompletedModalProps {
    isOpen: boolean;
    onClose: () => void;
    onTryAgain: () => void;
    onViewHighScores: () => void;
    score: number;
    total: number;
    accuracy: number;
    streak: number;
    stars: number;
    level: ReadingLevel;
    questionsPerSession: number;
}

export const ReadingSessionCompletedModal = ({
    isOpen,
    onClose,
    onTryAgain,
    onViewHighScores,
    score,
    total,
    accuracy,
    streak,
    stars,
    level,
    questionsPerSession,
}: ReadingSessionCompletedModalProps) => {
    const { t } = useTranslation();

    return (
        <SessionCompletedModal
            isOpen={isOpen}
            onClose={onClose}
            onTryAgain={onTryAgain}
            onViewHighScores={onViewHighScores}
            score={score}
            total={total}
            accuracy={accuracy}
            streak={streak}
            stars={stars}
            categoryLabel={t(`learn.reading.levels.${level}`)}
            questionsPerSession={questionsPerSession}
            showCloseButton={true}
            showKeepPracticing={true}
            showTotalStat={false}
            variant="reading"
        />
    );
};