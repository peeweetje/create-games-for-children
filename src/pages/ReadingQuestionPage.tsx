import { useState, useEffect, useCallback, useRef } from "react";
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
import { useTranslation } from "react-i18next";

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
    const { t } = useTranslation();
    const [question, setQuestion] = useState(() => generateReadingQuestion(selectedLevel, selectedTheme));
    const [selected, setSelected] = useState<string | null>(null);
    const [score, setScore] = useState(0);
    const [total, setTotal] = useState(0);
    const [feedback, setFeedback] = useState<"correct" | "wrong" | null>(null);
    const [feedbackEmoji, setFeedbackEmoji] = useState("");
    const [streak, setStreak] = useState(0);
    const [stars, setStars] = useState(0);
    const [showHighScores, setShowHighScores] = useState(false);
    const [sessionCompleted, setSessionCompleted] = useState(false);
    const QUESTIONS_PER_SESSION = 25;

    // ref to guard against multiple trigger of handleAnswer
    const answeredRef = useRef(false);
    
    // Refs to track what we've already saved to localStorage (for delta calculation)
    const lastSavedScoreRef = useRef(0);
    const lastSavedTotalRef = useRef(0);

    // Use Zustand store for reading progress
    const {
        incrementSessionQuestions,
        resetSession,
        saveHighScore
    } = useReadingProgress();

    const newQuestion = useCallback(() => {
        answeredRef.current = false; // allow next answer
        const q = generateReadingQuestion(selectedLevel, selectedTheme);
        setQuestion(q);
        setSelected(null);
        setFeedback(null);
    }, [selectedLevel, selectedTheme]);

    useEffect(() => {
        // Reset all local state when level or theme changes
        setScore(0);
        setTotal(0);
        setStreak(0);
        setStars(0);
        setSelected(null);
        setFeedback(null);
        setFeedbackEmoji("");
        setSessionCompleted(false);
        answeredRef.current = false;
        lastSavedScoreRef.current = 0;
        lastSavedTotalRef.current = 0;
        resetSession();
        newQuestion();
    }, [selectedLevel, selectedTheme]);

const handleAnswer = (choice: string) => {
        if (answeredRef.current) return;          // already processing
        answeredRef.current = true;

        setSelected(choice);

        const isCorrect = choice === question.answer;

        // Calculate updated values upfront
        const updatedTotal = total + 1;
        const updatedScore = isCorrect ? score + 1 : score;
        const updatedStreak = isCorrect ? streak + 1 : 0;

        // Update local state
        setTotal(updatedTotal);
        setSelected(choice);
        incrementSessionQuestions();

        if (isCorrect) {
            // correct answer path
            setScore(updatedScore);
            setStreak(updatedStreak);

            if (updatedStreak % 3 === 0) {
                setStars((prev) => prev + 1);
            }

            setFeedback("correct");
            setFeedbackEmoji("🎉");
        } else {
            // wrong answer path
            setFeedback("wrong");
            setFeedbackEmoji("😢");
            setStreak(0);
        }

        // Calculate deltas to add to localStorage
        const scoreDelta = updatedScore - lastSavedScoreRef.current;
        const totalDelta = updatedTotal - lastSavedTotalRef.current;
        
        // Save progress with deltas to avoid double-counting
        saveHighScore(selectedLevel, scoreDelta, totalDelta, updatedStreak);
        
        // Update tracking refs
        lastSavedScoreRef.current = updatedScore;
        lastSavedTotalRef.current = updatedTotal;

        const isSessionCompleted = updatedTotal >= QUESTIONS_PER_SESSION;
        
        if (isSessionCompleted) {
            setSessionCompleted(true);
        } else {
            setTimeout(() => {
                newQuestion();
            }, 1500);
        }
    };

    const sessionAccuracy = total > 0 ? Math.round((score / total) * 100) : 0;

    return (
        <div className="flex flex-col items-center min-h-full bg-gradient-to-b from-violet-50 to-purple-100 p-6 pb-24">
            {/* Header and Navigation */}
            <div className="w-full max-w-4xl mb-6">
                <div className="flex flex-col items-center mb-4">
                    <button
                        onClick={() => {
                            setScore(0);
                            setTotal(0);
                            setStreak(0);
                            setStars(0);
                            lastSavedScoreRef.current = 0;
                            lastSavedTotalRef.current = 0;
                            resetSession();
                            onBackToSettings();
                        }}
                        className="px-4 py-2 bg-gradient-to-r from-purple-500 to-violet-500 text-white rounded-lg hover:from-purple-600 hover:to-violet-600 transition-all duration-200 font-semibold shadow-lg mb-4"
                    >
                        {t("reading.backToSettings")}
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
                    setScore(0);
                    setTotal(0);
                    setStreak(0);
                    setStars(0);
                    lastSavedScoreRef.current = 0;
                    lastSavedTotalRef.current = 0;
                    resetSession();
                }}
                onTryAgain={() => {
                    setSessionCompleted(false);
                    setScore(0);
                    setTotal(0);
                    setStreak(0);
                    setStars(0);
                    lastSavedScoreRef.current = 0;
                    lastSavedTotalRef.current = 0;
                    resetSession();
                    newQuestion();
                }}
                onViewHighScores={() => {
                    // Use a callback to ensure the state update happens after render
                    setTimeout(() => setShowHighScores(true), 0);
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