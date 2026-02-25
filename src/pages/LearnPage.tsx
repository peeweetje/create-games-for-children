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
import { LearnHighScoresModal } from "../components/learn-page/LearnHighScoresModal";
import { LearnSessionCompletedModal } from "../components/learn-page/LearnSessionCompletedModal";
import { LearnViewHighScoresButton } from "../components/learn-page/LearnViewHighScoresButton";

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
    const [showHighScores, setShowHighScores] = useState(false);
    const [sessionCompleted, setSessionCompleted] = useState(false);
    const [sessionQuestions, setSessionQuestions] = useState(0);
    const QUESTIONS_PER_SESSION = 25;

    const saveHighScore = (operation: Operation, currentScore: number, currentTotal: number, currentStreak: number) => {
        // Only save if there's actual progress (non-zero total)
        if (currentTotal === 0) return;

        const savedScores = localStorage.getItem("learn-high-scores");
        let highScores: Record<Operation, any> = {
            addition: { score: 0, total: 0, accuracy: 0, bestStreak: 0, lastPlayed: "" },
            subtraction: { score: 0, total: 0, accuracy: 0, bestStreak: 0, lastPlayed: "" },
            multiplication: { score: 0, total: 0, accuracy: 0, bestStreak: 0, lastPlayed: "" },
            division: { score: 0, total: 0, accuracy: 0, bestStreak: 0, lastPlayed: "" },
        };

        if (savedScores) {
            try {
                highScores = JSON.parse(savedScores);
            } catch (error) {
                console.error("Error parsing high scores:", error);
            }
        }

        // Calculate accuracy for this session only
        const sessionAccuracy = currentTotal > 0 ? Math.round((currentScore / currentTotal) * 100) : 0;
        const currentBestStreak = Math.max(highScores[operation]?.bestStreak || 0, currentStreak);
        
        // Update high scores - only update if this session's performance is better
        const existingScore = highScores[operation]?.score || 0;
        const existingTotal = highScores[operation]?.total || 0;
        const existingAccuracy = highScores[operation]?.accuracy || 0;
        
        highScores[operation] = {
            score: Math.max(existingScore, currentScore),
            total: existingTotal + currentTotal,
            accuracy: Math.max(existingAccuracy, sessionAccuracy),
            bestStreak: currentBestStreak,
            lastPlayed: new Date().toISOString()
        };

        try {
            localStorage.setItem("learn-high-scores", JSON.stringify(highScores));
        } catch (error) {
            console.error("Error saving high scores:", error);
        }
    };

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
        // Save current operation's high score before switching
        saveHighScore(selectedOp, score, total, streak);
        
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
        setSessionQuestions((q) => q + 1);

        if (choice === question.answer) {
            setFeedback("correct");
            setScore((s) => s + 1);
            const newStreak = streak + 1;
            setStreak(newStreak);
            if (newStreak % 3 === 0) setStars((s) => s + 1);
            setFeedbackEmoji(
                FEEDBACK_EMOJIS_CORRECT[Math.floor(Math.random() * FEEDBACK_EMOJIS_CORRECT.length)]
            );
            
            // Save progress after each correct answer to ensure it's stored
            saveHighScore(selectedOp, score + 1, total, newStreak);
        } else {
            setFeedback("wrong");
            setStreak(0);
            setFeedbackEmoji(
                FEEDBACK_EMOJIS_WRONG[Math.floor(Math.random() * FEEDBACK_EMOJIS_WRONG.length)]
            );
        }

        // Check if session is completed
        if (sessionQuestions + 1 >= QUESTIONS_PER_SESSION) {
            setSessionCompleted(true);
            saveHighScore(selectedOp, score, total, streak);
        } else {
            setTimeout(() => {
                newQuestion(selectedOp);
            }, 1500);
        }
    };

    const sessionAccuracy = total > 0 ? Math.round((score / total) * 100) : 0;

    return (
        <div className="flex flex-col items-center min-h-full bg-gradient-to-b from-fuchsia-50 to-violet-100 p-4 pb-20 md:pb-4">
            <LearnHeader />
            <LearnStars count={stars} />
            <LearnOperationSelector
                selectedOperation={selectedOp}
                onSelect={handleOperationChange}
            />
            <LearnScoreboard
                score={score}
                total={total}
                accuracy={sessionAccuracy}
                streak={streak}
                selectedOperation={selectedOp}
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
            
            <LearnViewHighScoresButton onClick={() => setShowHighScores(true)} />
            
            <LearnHighScoresModal
                isOpen={showHighScores}
                onClose={() => setShowHighScores(false)}
            />
            
            <LearnSessionCompletedModal
                isOpen={sessionCompleted}
                onClose={() => {
                    setSessionCompleted(false);
                    setSessionQuestions(0);
                    setScore(0);
                    setTotal(0);
                    setStreak(0);
                    setStars(0);
                    setShowHighScores(true);
                }}
                onTryAgain={() => {
                    setSessionCompleted(false);
                    setSessionQuestions(0);
                    setScore(0);
                    setTotal(0);
                    setStreak(0);
                    setStars(0);
                    newQuestion(selectedOp);
                }}
                score={score}
                total={total}
                accuracy={sessionAccuracy}
                streak={streak}
                stars={stars}
                operation={selectedOp}
                questionsPerSession={QUESTIONS_PER_SESSION}
            />
        </div>
    );
};
