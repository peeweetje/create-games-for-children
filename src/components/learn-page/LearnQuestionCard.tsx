import { useTranslation } from "react-i18next";
import { type Question, operationSymbols } from "../../helpers/mathHelper";

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
        <div className="bg-white rounded-3xl shadow-xl p-8 mb-6 w-full max-w-sm text-center border-4 border-yellow-300 relative h-[180px] overflow-hidden">
            {/* Question content - always rendered, visibility toggled */}
            <div className={`w-full h-full absolute inset-0 flex flex-col items-center justify-center p-8 transition-opacity duration-200 ${feedback ? 'opacity-0 pointer-events-none' : 'opacity-100'}`}>
                <p className="text-gray-400 text-sm mb-2 font-semibold uppercase tracking-wide">
                    {t("learn.question.prompt")}
                </p>
                <div className="text-6xl font-extrabold text-gray-800">
                    {question.num1}{" "}
                    <span className="text-orange-500">
                        {operationSymbols[question.operation]}
                    </span>{" "}
                    {question.num2} = ?
                </div>
            </div>
            
            {/* Feedback content - always rendered, visibility toggled, same size as question */}
            <div className={`w-full h-full absolute inset-0 flex flex-col items-center justify-center p-8 transition-opacity duration-200 ${feedback ? 'opacity-100' : 'opacity-0 pointer-events-none'}`}>
                <p className="text-gray-400 text-sm mb-2 font-semibold uppercase tracking-wide">
                    {feedback === "correct" ? "🎉" : "🤔"}
                </p>
                <div
                    className={`text-4xl font-bold ${
                        feedback === "correct" ? "text-green-500" : "text-red-400"
                    }`}
                >
                    {feedbackEmoji}{" "}
                    {feedback === "correct"
                        ? t("learn.feedback.correct")
                        : t("learn.feedback.wrong", { answer: question.answer })}
                </div>
            </div>
        </div>
    );
};