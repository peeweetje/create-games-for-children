import { useTranslation } from "react-i18next";
import type { Operation } from "../../helpers/mathHelper";
import { SessionCompletedModal } from "../SessionCompletedModal";

interface LearnSessionCompletedModalProps {
    isOpen: boolean;
    onClose: () => void;
    onTryAgain: () => void;
    score: number;
    total: number;
    accuracy: number;
    streak: number;
    stars: number;
    operation: Operation;
    questionsPerSession: number;
}

export const LearnSessionCompletedModal = ({
    isOpen,
    onClose,
    onTryAgain,
    score,
    total,
    accuracy,
    streak,
    stars,
    operation,
    questionsPerSession,
}: LearnSessionCompletedModalProps) => {
    const { t } = useTranslation();

    return (
        <SessionCompletedModal
            isOpen={isOpen}
            onClose={onClose}
            onTryAgain={onTryAgain}
            score={score}
            total={total}
            accuracy={accuracy}
            streak={streak}
            stars={stars}
            categoryLabel={t(`learn.operations.${operation}`)}
            questionsPerSession={questionsPerSession}
            variant="learn"
        />
    );
};