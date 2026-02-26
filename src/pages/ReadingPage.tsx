import { useState, useEffect, useCallback } from "react";
import { 
    generateReadingQuestion, 
    ReadingLevel, 
    Theme, 
    useReadingProgress 
} from "../helpers/readingHelper";
import { ReadingHeader } from "../components/learn-page/ReadingHeader";
import { ReadingStars } from "../components/learn-page/ReadingStars";
import { ReadingLevelSelector } from "../components/learn-page/ReadingLevelSelector";
import { ReadingThemeSelector } from "../components/learn-page/ReadingThemeSelector";
import { ReadingScoreboard } from "../components/learn-page/ReadingScoreboard";
import { ReadingQuestionCard } from "../components/learn-page/ReadingQuestionCard";
import { ReadingAnswerChoices } from "../components/learn-page/ReadingAnswerChoices";
import { ReadingSkipButton } from "../components/learn-page/ReadingSkipButton";
import { ReadingTip } from "../components/learn-page/ReadingTip";
import { ReadingHighScoresModal } from "../components/learn-page/ReadingHighScoresModal";
import { ReadingSessionCompletedModal } from "../components/learn-page/ReadingSessionCompletedModal";
import { ReadingViewHighScoresButton } from "../components/learn-page/ReadingViewHighScoresButton";

export const ReadingPage = () => {
    const [selectedLevel, setSelectedLevel] = useState<ReadingLevel>("letters");
    const [selectedTheme, setSelectedTheme] = useState<Theme>("animals");
    const [question, setQuestion] = useState(() => generateReadingQuestion("letters", "animals"));
    const [choices, setChoices] = useState<string[]>([]);
    const [selected, setSelected] = useState<string | null>(null);
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

    // Use Zustand store for reading progress
    const {
        incrementScore,
        incrementTotal,
        incrementStreak,
        resetStreak,
        incrementStars,
        incrementSessionQuestions,
        resetSession,
        saveHighScore
    } = useReadingProgress();

    const newQuestion = useCallback((level: ReadingLevel, theme: Theme) => {
        const q = generateReadingQuestion(level, theme);
        setQuestion(q);
        setChoices(q.choices);
        setSelected(null);
        setFeedback(null);
    }, []);

    useEffect(() => {
        newQuestion(selectedLevel, selectedTheme);
    }, [selectedLevel, selectedTheme, newQuestion]);

    const handleLevelChange = (level: ReadingLevel) => {
        // Save current level's high score before switching
        saveHighScore(selectedLevel, score, total, streak);
        
        setSelectedLevel(level);
        setScore(0);
        setTotal(0);
        setStreak(0);
        setStars(0);
        resetSession();
    };

    const handleThemeChange = (theme: Theme) => {
        setSelectedTheme(theme);
        newQuestion(selectedLevel, theme);
    };

    const handleAnswer = (choice: string) => {
        if (selected !== null) return;
        setSelected(choice);
        setTotal((t) => t + 1);
        incrementTotal();
        setSessionQuestions((q) => q + 1);
        incrementSessionQuestions();

        if (choice === question.answer) {
            setFeedback("correct");
            setScore((s) => s + 1);
            incrementScore();
            const newStreak = streak + 1;
            setStreak(newStreak);
            incrementStreak();
            if (newStreak % 3 === 0) {
                setStars((s) => s + 1);
                incrementStars();
            }
            setFeedbackEmoji("🎉");
            
            // Save progress after each correct answer
            saveHighScore(selectedLevel, score + 1, total + 1, newStreak);
        } else {
            setFeedback("wrong");
            setStreak(0);
            resetStreak();
            setFeedbackEmoji("😢");
        }

        // Check if session is completed
        if (sessionQuestions + 1 >= QUESTIONS_PER_SESSION) {
            setSessionCompleted(true);
            saveHighScore(selectedLevel, score, total, streak);
        } else {
            setTimeout(() => {
                newQuestion(selectedLevel, selectedTheme);
            }, 1500);
        }
    };

    const sessionAccuracy = total > 0 ? Math.round((score / total) * 100) : 0;

    return (
        <div className="flex flex-col items-center min-h-full bg-gradient-to-b from-fuchsia-50 to-purple-100 p-4 pb-20 md:pb-4">
            <ReadingHeader />
            <ReadingStars count={stars} />
            <ReadingLevelSelector
                selectedLevel={selectedLevel}
                onSelect={handleLevelChange}
            />
            <ReadingThemeSelector
                selectedTheme={selectedTheme}
                onSelect={handleThemeChange}
            />
            <ReadingScoreboard
                score={score}
                total={total}
                accuracy={sessionAccuracy}
                streak={streak}
                selectedLevel={selectedLevel}
            />
            <ReadingQuestionCard
                question={question}
                feedback={feedback}
                feedbackEmoji={feedbackEmoji}
            />

            <ReadingAnswerChoices
                choices={question.choices}
                selected={selected}
                correctAnswer={question.answer}
                question={question}
                onSelect={handleAnswer}
                disabled={!!feedback}
            />
            <ReadingSkipButton onClick={() => newQuestion(selectedLevel, selectedTheme)} />
            <ReadingTip />
            
            <ReadingViewHighScoresButton onClick={() => setShowHighScores(true)} />
            
            <ReadingHighScoresModal
                isOpen={showHighScores}
                onClose={() => setShowHighScores(false)}
            />
            
            <ReadingSessionCompletedModal
                isOpen={sessionCompleted}
                onClose={() => {
                    setSessionCompleted(false);
                    setSessionQuestions(0);
                    setScore(0);
                    setTotal(0);
                    setStreak(0);
                    setStars(0);
                    resetSession();
                    setShowHighScores(true);
                }}
                onTryAgain={() => {
                    setSessionCompleted(false);
                    setSessionQuestions(0);
                    setScore(0);
                    setTotal(0);
                    setStreak(0);
                    setStars(0);
                    resetSession();
                    newQuestion(selectedLevel, selectedTheme);
                }}
                score={score}
                total={total}
                accuracy={sessionAccuracy}
                streak={streak}
                stars={stars}
                level={selectedLevel}
                questionsPerSession={QUESTIONS_PER_SESSION}
            />
        </div>
    );
};