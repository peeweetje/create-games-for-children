import { useTranslation } from "react-i18next";
import { motion, AnimatePresence } from "framer-motion";
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
        <div className="bg-white rounded-3xl shadow-xl p-8 mb-6 w-full max-w-sm text-center border-4 border-violet-300 relative h-[180px] overflow-hidden">
            <AnimatePresence mode="wait">
                {!feedback ? (
                    <motion.div
                        key="question"
                        initial={{ opacity: 0, scale: 0.8 }}
                        animate={{ opacity: 1, scale: 1 }}
                        exit={{ opacity: 0, scale: 0.8 }}
                        transition={{ duration: 0.3 }}
                        className="absolute inset-0 flex flex-col items-center justify-center p-8"
                    >
                        <p className="text-gray-400 text-sm mb-2 font-semibold uppercase tracking-wide">
                            {t("learn.question.prompt")}
                        </p>
                        <div className="text-6xl font-extrabold text-gray-800">
                            {question.num1}{" "}
                            <span className="text-violet-500">
                                {operationSymbols[question.operation]}
                            </span>{" "}
                            {question.num2} = ?
                        </div>
                    </motion.div>
                ) : (
                    <motion.div
                        key="feedback"
                        initial={{ opacity: 0, scale: 1.2 }}
                        animate={{ opacity: 1, scale: 1 }}
                        exit={{ opacity: 0, scale: 0.8 }}
                        transition={{ duration: 0.3 }}
                        className="absolute inset-0 flex flex-col items-center justify-center p-8"
                    >
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
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
};