import { useState, useEffect, useCallback } from "react";
import { 
    generateReadingQuestion, 
    ReadingLevel, 
    Theme, 
    useReadingProgress 
} from "../helpers/readingHelper";
import { ReadingStars } from "../components/reading-page/ReadingStars";
import { ReadingScoreboard } from "../components/reading-page/ReadingScoreboard";
import { ReadingQuestionCard } from "../components/reading-page/ReadingQuestionCard";
import { ReadingAnswerChoices } from "../components/reading-page/ReadingAnswerChoices";
import { ReadingSkipButton } from "../components/reading-page/ReadingSkipButton";
import { ReadingTip } from "../components/reading-page/ReadingTip";
import { ReadingHighScoresModal } from "../components/reading-page/ReadingHighScoresModal";
import { ReadingSessionCompletedModal } from "../components/reading-page/ReadingSessionCompletedModal";
import { ReadingViewHighScoresButton } from "../components/reading-page/ReadingViewHighScoresButton";

interface ReadingQuestionPageProps {
    selectedLevel: ReadingLevel;
    selectedTheme: Theme;
    onBackToSettings: () => void;
}

export const ReadingQuestionPage = ({ 
    selectedLevel, 
    selectedTheme, 
    onBackToSettings 
}: ReadingQuestionPageProps) => {
    const [question, setQuestion] = useState(() => generateReadingQuestion(selectedLevel, selectedTheme));
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

    const newQuestion = useCallback(() => {
        const q = generateReadingQuestion(selectedLevel, selectedTheme);
        setQuestion(q);
        setChoices(q.choices);
        setSelected(null);
        setFeedback(null);
    }, [selectedLevel, selectedTheme]);

    useEffect(() => {
        newQuestion();
    }, [newQuestion]);

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
                newQuestion();
            }, 1500);
        }
    };

    const sessionAccuracy = total > 0 ? Math.round((score / total) * 100) : 0;

    return (
        <div className="flex flex-col items-center min-h-full bg-gradient-to-b from-fuchsia-50 to-purple-100 p-6 pb-24">
            {/* Header and Navigation */}
            <div className="w-full max-w-4xl mb-6">
                <div className="flex justify-between items-center mb-4">
                    <button
                        onClick={onBackToSettings}
                        className="px-4 py-2 bg-gradient-to-r from-purple-500 to-fuchsia-500 text-white rounded-lg hover:from-purple-600 hover:to-fuchsia-600 transition-all duration-200 font-semibold shadow-lg"
                    >
                        ← Back to Settings
                    </button>
                    <ReadingStars count={stars} />
                </div>
                
                <ReadingScoreboard
                    score={score}
                    total={total}
                    accuracy={sessionAccuracy}
                    streak={streak}
                    selectedLevel={selectedLevel}
                />
            </div>

            {/* Main Content Area */}
            <div className="w-full max-w-4xl flex flex-col items-center space-y-8">
                {/* Question Card */}
                <div className="w-full">
                    <ReadingQuestionCard
                        question={question}
                        feedback={feedback}
                        feedbackEmoji={feedbackEmoji}
                    />
                </div>

                {/* Answer Choices */}
                <div className="w-full">
                    <ReadingAnswerChoices
                        choices={question.choices}
                        selected={selected}
                        correctAnswer={question.answer}
                        question={question}
                        onSelect={handleAnswer}
                        disabled={!!feedback}
                    />
                </div>

                {/* Actions */}
                <div className="w-full flex flex-col items-center space-y-4">
                    <ReadingSkipButton onClick={newQuestion} />
                    <ReadingTip />
                    <ReadingViewHighScoresButton onClick={() => setShowHighScores(true)} />
                </div>
            </div>
            
            {/* Modals */}
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
                    newQuestion();
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