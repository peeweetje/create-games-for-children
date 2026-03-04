import { useState, useEffect, useCallback, useRef } from "react";
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
    const scoreRef = useRef(0);
    const totalRef = useRef(0);
    const [feedback, setFeedback] = useState<"correct" | "wrong" | null>(null);
    const [feedbackEmoji, setFeedbackEmoji] = useState("");
    const [streak, setStreak] = useState(0);
    const [stars, setStars] = useState(0);
    const [showHighScores, setShowHighScores] = useState(false);
    const [sessionCompleted, setSessionCompleted] = useState(false);
    const [sessionQuestions, setSessionQuestions] = useState(0);

    // values to display in completed modal (avoid stale state)
    // no need for separate final values; use live state directly

    // guard to prevent double-answer processing
    const answeredRef = useRef(false);

    const QUESTIONS_PER_SESSION = 25;

    // refs to remember what we've already saved for this session
    const lastSavedScoreRef = useRef(0);
    const lastSavedTotalRef = useRef(0);

    // now accepts deltas instead of full totals
    const saveHighScore = (operation: Operation, scoreDelta: number, totalDelta: number, currentStreak: number) => {
        if (totalDelta === 0) return;

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

        const existing = highScores[operation] || { score: 0, total: 0, accuracy: 0, bestStreak: 0 };
        const newTotal = existing.total + totalDelta;
        const newScore = existing.score + scoreDelta;
        const newAccuracy = newTotal > 0 ? Math.round((newScore / newTotal) * 100) : 0;
        const currentBestStreak = Math.max(existing.bestStreak || 0, currentStreak);

        highScores[operation] = {
            score: newScore,
            total: newTotal,
            accuracy: Math.max(existing.accuracy || 0, newAccuracy),
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
        answeredRef.current = false;
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
        // Save deltas of current progress
        const scoreDelta = score - lastSavedScoreRef.current;
        const totalDelta = total - lastSavedTotalRef.current;
        saveHighScore(selectedOp, scoreDelta, totalDelta, streak);
        
        setSelectedOp(op);
        setScore(0);
        setTotal(0);
        scoreRef.current = 0;
        totalRef.current = 0;
        setStreak(0);
        setStars(0);
        lastSavedScoreRef.current = 0;
        lastSavedTotalRef.current = 0;
        setSessionQuestions(0);
        answeredRef.current = false;
    };

    const handleAnswer = (choice: number) => {
        if (answeredRef.current) return;
        answeredRef.current = true;
        if (selected !== null) return;
        setSelected(choice);

        // update ref counters first
        totalRef.current += 1;
        if (choice === question.answer) scoreRef.current += 1;

        const updatedTotal = totalRef.current;
        const updatedScore = scoreRef.current;
        const updatedStreak = choice === question.answer ? streak + 1 : 0;

        setTotal(updatedTotal);
        setSessionQuestions((q) => q + 1);

        if (choice === question.answer) {
            setFeedback("correct");
            setScore(updatedScore);
            setStreak(updatedStreak);
            if (updatedStreak % 3 === 0) setStars((s) => s + 1);
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

        // calculate deltas and persist
        const scoreDelta = updatedScore - lastSavedScoreRef.current;
        const totalDelta = updatedTotal - lastSavedTotalRef.current;
        saveHighScore(selectedOp, scoreDelta, totalDelta, updatedStreak);
        lastSavedScoreRef.current = updatedScore;
        lastSavedTotalRef.current = updatedTotal;

        // Check if session is completed
        if (sessionQuestions + 1 >= QUESTIONS_PER_SESSION) {
            console.log("SESSION END - scoreRef:", scoreRef.current, "totalRef:", totalRef.current);
            setSessionCompleted(true);
        } else {
            setTimeout(() => {
                newQuestion(selectedOp);
            }, 1500);
        }
    };

    const sessionAccuracy = total > 0 ? Math.round((score / total) * 100) : 0;


    return (
        <div className="flex flex-col items-center min-h-full bg-gradient-to-b from-violet-50 to-purple-100 p-4 pb-20 md:pb-4">
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
                    scoreRef.current = 0;
                    totalRef.current = 0;
                    setStreak(0);
                    setStars(0);
                    setShowHighScores(true);
                    lastSavedScoreRef.current = 0;
                    lastSavedTotalRef.current = 0;
                    answeredRef.current = false;
                }}
                onTryAgain={() => {
                    setSessionCompleted(false);
                    setSessionQuestions(0);
                    setScore(0);
                    setTotal(0);
                    scoreRef.current = 0;
                    totalRef.current = 0;
                    setStreak(0);
                    setStars(0);
                    lastSavedScoreRef.current = 0;
                    lastSavedTotalRef.current = 0;
                    answeredRef.current = false;
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
