import { Scoreboard } from "../../components/Scoreboard";

interface LearnScoreboardProps {
    score: number;
    total: number;
    accuracy: number;
    streak: number;
    selectedOperation: string;
}

export const LearnScoreboard = ({
    score,
    total,
    accuracy,
    streak,
}: LearnScoreboardProps) => {
    return (
        <Scoreboard
            score={score}
            total={total}
            accuracy={accuracy}
            streak={streak}
        />
    );
};
