import { useTranslation } from "react-i18next";

interface ReadingFeedbackBannerProps {
    feedback: "correct" | "wrong" | null;
    feedbackEmoji: string;
    localizedAnswer: string;
}

export const ReadingFeedbackBanner = ({ feedback, feedbackEmoji, localizedAnswer }: ReadingFeedbackBannerProps) => {
    const { t } = useTranslation();

    if (!feedback) return null;

    return (
        <div
            className={`mt-6 text-center p-4 rounded-lg border-2 ${
                feedback === "correct"
                    ? "bg-surface border-success text-success-600"
                    : "bg-surface border-error text-error"
            }`}
        >
            <div className="text-2xl mb-2">{feedbackEmoji}</div>
            <p className="font-semibold">
                {feedback === "correct"
                    ? t("learn.reading.questionCard.correct")
                    : t("learn.reading.questionCard.wrong", { answer: localizedAnswer })}
            </p>
        </div>
    );
};