import { ReadingLevel } from "../../helpers/readingHelper";
import { Scoreboard } from "../../components/Scoreboard";
import { useTranslation } from "react-i18next";

interface ReadingScoreboardProps {
    score: number;
    total: number;
    accuracy: number;
    streak: number;
    selectedLevel: ReadingLevel;
}

export const ReadingScoreboard = ({ 
    score, 
    total, 
    accuracy, 
    streak, 
    selectedLevel 
}: ReadingScoreboardProps) => {
    const { t } = useTranslation();
    
    const levelLabels: Record<ReadingLevel, string> = {
        letters: t("learn.reading.levels.letters"),
        words: t("learn.reading.levels.words"), 
        sentences: t("learn.reading.levels.sentences"),
        stories: t("learn.reading.levels.stories")
    };

    return (
        <Scoreboard
            score={score}
            total={total}
            accuracy={accuracy}
            streak={streak}
            title={t("learn.reading.scoreboard.readingProgress")}
            levelLabel={levelLabels[selectedLevel]}
        />
    );
};
