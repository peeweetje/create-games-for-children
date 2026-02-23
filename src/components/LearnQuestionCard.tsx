import { useTranslation } from "react-i18next";
import { type Question, operationSymbols } from "../helpers/mathHelper";

interface LearnQuestionCardProps {
    question: Question;
    feedback: "correct" | "wrong" | null;
    feedbackEmoji: string;
}

export const LearnQuestionCard = ({
    question,
    feedback,
    feedbackEmoji,
}: LearnQuestionCardProps) => {
    const { t } = useTranslation();

    return (
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
    );
};
