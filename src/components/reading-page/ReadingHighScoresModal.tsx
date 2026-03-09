import { ReadingLevel } from "../../helpers/readingHelper";
import { useReadingProgress } from "../../helpers/readingHelper";
import { useTranslation } from "react-i18next";
import { HighScoresModal } from "../HighScoresModal";

interface ReadingHighScoresModalProps {
    isOpen: boolean;
    onClose: () => void;
}

export const ReadingHighScoresModal = ({ isOpen, onClose }: ReadingHighScoresModalProps) => {
    const { t } = useTranslation();
    const { highScores } = useReadingProgress();

    const levelLabels: Record<ReadingLevel, string> = {
        letters: t("learn.reading.levels.letters"),
        words: t("learn.reading.levels.words"), 
        sentences: t("learn.reading.levels.sentences"),
        stories: t("learn.reading.levels.stories")
    };

    const clearAllScores = () => {
        const emptyScores = {
            letters: { score: 0, total: 0, accuracy: 0, bestStreak: 0, lastPlayed: "" },
            words: { score: 0, total: 0, accuracy: 0, bestStreak: 0, lastPlayed: "" },
            sentences: { score: 0, total: 0, accuracy: 0, bestStreak: 0, lastPlayed: "" },
            stories: { score: 0, total: 0, accuracy: 0, bestStreak: 0, lastPlayed: "" },
        };
        
        useReadingProgress.setState({ highScores: emptyScores });
        localStorage.removeItem("reading-high-scores");
    };

    return (
        <HighScoresModal
            isOpen={isOpen}
            onClose={onClose}
            highScores={highScores}
            categoryLabels={levelLabels}
            onClearScores={clearAllScores}
            useBackdropBlur={true}
        />
    );
};
