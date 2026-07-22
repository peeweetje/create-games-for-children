import { useTranslation } from "react-i18next";
import { ReadingQuestion } from "../../../helpers/readingHelper";
import { ReadingQuestionContent } from "./ReadingQuestionContent";
import { ReadingAudioButton } from "./ReadingAudioButton";
import { ReadingFeedbackBanner } from "./ReadingFeedbackBanner";
import { ReadingQuestionImage } from "./ReadingQuestionImage";

interface ReadingQuestionCardProps {
    question: ReadingQuestion;
    feedback: "correct" | "wrong" | null;
    feedbackEmoji: string;
}

export const ReadingQuestionCard = ({ question, feedback, feedbackEmoji }: ReadingQuestionCardProps) => {
    const { t, i18n } = useTranslation();
    const isDutch = (i18n.resolvedLanguage ?? i18n.language ?? "en").startsWith("nl");

    const getLocalizedAnswer = (): string => {
        return isDutch && question.translation ? question.translation : question.answer;
    };

    const localizedAnswer = getLocalizedAnswer();

    return (
        <div className="w-full max-w-2xl mx-auto">
            <div className="bg-white rounded-2xl shadow-lg p-8 border-2 border-primary-100">
                <div className="text-center mb-6">
                    <h2 className="text-2xl font-bold text-text-800 mb-2">
                        {t("learn.reading.questionCard.readingQuestion")}
                    </h2>
                    <p className="text-text-600">
                        {t("learn.reading.questionCard.answerBelow")}
                    </p>
                </div>

                <div className="bg-gradient-to-br from-background to-accent-50 rounded-xl p-8 border-2 border-primary-200">
                    <ReadingQuestionImage
                        image={question.image}
                        alt={localizedAnswer}
                    />

                    <ReadingQuestionContent
                        question={question}
                        localizedAnswer={localizedAnswer}
                    />

                    {question.audio && (
                        <ReadingAudioButton
                            question={question}
                            isDutch={isDutch}
                        />
                    )}
                </div>

                <ReadingFeedbackBanner
                    feedback={feedback}
                    feedbackEmoji={feedbackEmoji}
                    localizedAnswer={localizedAnswer}
                />
            </div>
        </div>
    );
};