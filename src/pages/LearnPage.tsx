import { useState, useEffect, useCallback } from "react";
import {
    type Operation,
    type Question,
    generateQuestion,
    generateChoices,
    FEEDBACK_EMOJIS_CORRECT,
    FEEDBACK_EMOJIS_WRONG,
} from "../helpers/mathHelper";
import { LearnHeader } from "../components/learn-page/LearnHeader";
import { LearnStars } from "../components/learn-page/LearnStars";
import { LearnOperationSelector } from "../components/learn-page/LearnOperationSelector";
import { LearnScoreboard } from "../components/learn-page/LearnScoreboard";
import { LearnQuestionCard } from "../components/learn-page/LearnQuestionCard";
import { LearnAnswerChoices } from "../components/learn-page/LearnAnswerChoices";
import { LearnSkipButton } from "../components/learn-page/LearnSkipButton";
import { LearnTip } from "../components/learn-page/LearnTip";

export const LearnPage = () => {
    const [selectedOp, setSelectedOp] = useState<Operation>("addition");
    const [question, setQuestion] = useState<Question>(() => generateQuestion("addition"));
    const [choices, setChoices] = useState<number[]>([]);
    const [selected, setSelected] = useState<number | null>(null);
    const [score, setScore] = useState(0);
    const [total, setTotal] = useState(0);
    const [feedback, setFeedback] = useState<"correct" | "wrong" | null>(null);
    const [feedbackEmoji, setFeedbackEmoji] = useState("");
    const [streak, setStreak] = useState(0);
    const [stars, setStars] = useState(0);

    const newQuestion = useCallback((op: Operation) => {
        const q = generateQuestion(op);
        setQuestion(q);
        setChoices(generateChoices(q.answer));
        setSelected(null);
        setFeedback(null);
    }, []);

    useEffect(() => {
        newQuestion(selectedOp);
    }, [selectedOp, newQuestion]);

    const handleOperationChange = (op: Operation) => {
        setSelectedOp(op);
        setScore(0);
        setTotal(0);
        setStreak(0);
        setStars(0);
    };

    const handleAnswer = (choice: number) => {
        if (selected !== null) return;
        setSelected(choice);
        setTotal((t) => t + 1);

        if (choice === question.answer) {
            setFeedback("correct");
            setScore((s) => s + 1);
            const newStreak = streak + 1;
            setStreak(newStreak);
            if (newStreak % 3 === 0) setStars((s) => s + 1);
            setFeedbackEmoji(
                FEEDBACK_EMOJIS_CORRECT[Math.floor(Math.random() * FEEDBACK_EMOJIS_CORRECT.length)]
            );
        } else {
            setFeedback("wrong");
            setStreak(0);
            setFeedbackEmoji(
                FEEDBACK_EMOJIS_WRONG[Math.floor(Math.random() * FEEDBACK_EMOJIS_WRONG.length)]
            );
        }

        setTimeout(() => {
            newQuestion(selectedOp);
        }, 1500);
    };

    const accuracy = total > 0 ? Math.round((score / total) * 100) : 0;

    return (
        <div className="flex flex-col items-center min-h-full bg-gradient-to-b from-yellow-50 to-orange-50 p-4 pb-20 md:pb-4">
            <LearnHeader />
            <LearnStars count={stars} />
            <LearnOperationSelector
                selectedOperation={selectedOp}
                onSelect={handleOperationChange}
            />
            <LearnScoreboard
                score={score}
                total={total}
                accuracy={accuracy}
                streak={streak}
            />
            <LearnQuestionCard
                question={question}
                feedback={feedback}
                feedbackEmoji={feedbackEmoji}
            />

            <LearnAnswerChoices
                choices={choices}
                selected={selected}
                correctAnswer={question.answer}
                onSelect={handleAnswer}
                disabled={selected !== null}
            />
            <LearnSkipButton onClick={() => newQuestion(selectedOp)} />
            <LearnTip />
        </div>
    );
};
