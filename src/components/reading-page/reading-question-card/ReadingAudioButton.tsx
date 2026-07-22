import { useTranslation } from "react-i18next";
import { ReadingQuestion } from "../../../helpers/readingHelper";

interface ReadingAudioButtonProps {
    question: ReadingQuestion;
    isDutch: boolean;
}

export const ReadingAudioButton = ({ question, isDutch }: ReadingAudioButtonProps) => {
    const { t } = useTranslation();

    const getTextToSpeak = (): string => {
        if (question.type === "story") {
            const storyLines = isDutch && question.storyTranslation?.length
                ? question.storyTranslation
                : question.storyContent ?? [];
            return storyLines.join(' ');
        }
        return isDutch && question.translation ? question.translation : question.answer;
    };

    const speakText = () => {
        if ('speechSynthesis' in window) {
            const textToSpeak = getTextToSpeak();
            const utterance = new SpeechSynthesisUtterance(textToSpeak);
            utterance.lang = isDutch ? 'nl-NL' : 'en-US';
            utterance.rate = 0.9;
            utterance.pitch = 1;
            speechSynthesis.speak(utterance);
        } else {
            alert("Text-to-speech is not supported in this browser.");
        }
    };

    return (
        <div className="mt-4 flex justify-center">
            <button
                className="bg-primary text-white px-4 py-2 rounded-lg hover:bg-primary-600 transition-colors"
                onClick={speakText}
            >
                🔊 {t("learn.reading.questionCard.listen")}
            </button>
        </div>
    );
};