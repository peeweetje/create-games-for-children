import { useState, useEffect, useCallback } from "react";
import { useTranslation } from "react-i18next";
import {
    Trophy,
    Hash,
    Target,
    Flame,
    Star,
    Lightbulb,
    SkipForward,
} from "lucide-react";
import {
    type Operation,
    type Question,
    operationSymbols,
    operationColors,
    operationActiveBorder,
    operationIcons,
    generateQuestion,
    generateChoices,
    FEEDBACK_EMOJIS_CORRECT,
    FEEDBACK_EMOJIS_WRONG,
} from "../helpers/mathHelper";
import { LearnHeader } from "../components/LearnHeader";

export const LearnPage = () => {
    const { t } = useTranslation();
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

            {/* Stars */}
            {stars > 0 && (
                <div className="mb-4 flex gap-1">
                    {Array.from({ length: stars }).map((_, i) => (
                        <Star
                            key={i}
                            size={28}
                            className="text-yellow-400 fill-yellow-400 animate-bounce"
                            style={{ animationDelay: `${i * 80}ms` }}
                        />
                    ))}
                </div>
            )}

            {/* Operation Selector */}
            <div className="flex flex-wrap gap-3 justify-center mb-6">
                {(Object.keys(operationSymbols) as Operation[]).map((op) => (
                    <button
                        key={op}
                        onClick={() => handleOperationChange(op)}
                        className={`${operationColors[op]} text-white font-bold py-2 px-4 rounded-2xl text-lg shadow-md transition-all duration-200 border-4 flex items-center gap-2 ${
                            selectedOp === op
                                ? `${operationActiveBorder[op]} scale-110 shadow-lg`
                                : "border-transparent"
                        }`}
                    >
                        {operationIcons[op]}
                        {t(`learn.operations.${op}`)}
                    </button>
                ))}
            </div>

            {/* Score Board */}
            <div className="flex gap-4 mb-6 bg-white rounded-2xl shadow-md px-5 py-3">
                <div className="text-center">
                    <div className="flex items-center justify-center gap-1 mb-1">
                        <Trophy size={14} className="text-green-500" />
                        <p className="text-xs text-gray-500 font-semibold uppercase">{t("learn.scoreboard.score")}</p>
                    </div>
                    <p className="text-3xl font-bold text-green-500">{score}</p>
                </div>
                <div className="w-px bg-gray-200" />
                <div className="text-center">
                    <div className="flex items-center justify-center gap-1 mb-1">
                        <Hash size={14} className="text-gray-500" />
                        <p className="text-xs text-gray-500 font-semibold uppercase">{t("learn.scoreboard.total")}</p>
                    </div>
                    <p className="text-3xl font-bold text-gray-700">{total}</p>
                </div>
                <div className="w-px bg-gray-200" />
                <div className="text-center">
                    <div className="flex items-center justify-center gap-1 mb-1">
                        <Target size={14} className="text-blue-500" />
                        <p className="text-xs text-gray-500 font-semibold uppercase">{t("learn.scoreboard.accuracy")}</p>
                    </div>
                    <p className="text-3xl font-bold text-blue-500">{accuracy}%</p>
                </div>
                <div className="w-px bg-gray-200" />
                <div className="text-center">
                    <div className="flex items-center justify-center gap-1 mb-1">
                        <Flame size={14} className="text-orange-500" />
                        <p className="text-xs text-gray-500 font-semibold uppercase">{t("learn.scoreboard.streak")}</p>
                    </div>
                    <p className="text-3xl font-bold text-orange-500">{streak}</p>
                </div>
            </div>

            {/* Question Card */}
            <div className="bg-white rounded-3xl shadow-xl p-8 mb-6 w-full max-w-sm text-center border-4 border-yellow-300">
                {feedback ? (
                    <div
                        className={`text-5xl font-bold animate-bounce ${
                            feedback === "correct" ? "text-green-500" : "text-red-400"
                        }`}
                    >
                        {feedbackEmoji}{" "}
                        {feedback === "correct"
                            ? t("learn.feedback.correct")
                            : t("learn.feedback.wrong", { answer: question.answer })}
                    </div>
                ) : (
                    <>
                        <p className="text-gray-400 text-sm mb-2 font-semibold uppercase tracking-wide">
                            {t("learn.question.prompt")}
                        </p>
                        <div className="text-6xl font-extrabold text-gray-800 mb-2">
                            {question.num1}{" "}
                            <span className="text-orange-500">
                                {operationSymbols[question.operation]}
                            </span>{" "}
                            {question.num2} = ?
                        </div>
                    </>
                )}
            </div>

            {/* Answer Choices */}
            <div className="grid grid-cols-2 gap-4 w-full max-w-sm">
                {choices.map((choice) => {
                    let btnClass =
                        "py-5 text-3xl font-bold rounded-2xl shadow-md transition-all duration-200 border-4 ";
                    if (selected === null) {
                        btnClass += "bg-white border-gray-200 hover:border-orange-400 hover:scale-105 hover:shadow-lg text-gray-800 cursor-pointer";
                    } else if (choice === question.answer) {
                        btnClass += "bg-green-100 border-green-500 text-green-700 scale-105";
                    } else if (choice === selected) {
                        btnClass += "bg-red-100 border-red-400 text-red-600";
                    } else {
                        btnClass += "bg-gray-50 border-gray-200 text-gray-400 opacity-60";
                    }

                    return (
                        <button
                            key={choice}
                            onClick={() => handleAnswer(choice)}
                            className={btnClass}
                            disabled={selected !== null}
                        >
                            {choice}
                        </button>
                    );
                })}
            </div>

            {/* Skip Button */}
            <button
                onClick={() => newQuestion(selectedOp)}
                className="mt-6 flex items-center gap-1 text-gray-400 hover:text-orange-500 text-sm underline transition-colors"
            >
                <SkipForward size={16} />
                {t("learn.skip")}
            </button>

            {/* Fun tip */}
            <div className="mt-8 bg-yellow-100 border-2 border-yellow-300 rounded-2xl px-6 py-4 max-w-sm w-full">
                <div className="flex items-start gap-2">
                    <Lightbulb size={20} className="text-yellow-500 shrink-0 mt-0.5" />
                    <p className="text-yellow-700 font-semibold text-sm">
                        {t("learn.tip")}
                    </p>
                </div>
            </div>
        </div>
    );
};
