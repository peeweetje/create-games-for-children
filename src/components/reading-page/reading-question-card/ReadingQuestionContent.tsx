import { ReadingQuestion } from "../../../helpers/readingHelper";
import { useTranslation } from "react-i18next";

interface ReadingQuestionContentProps {
    question: ReadingQuestion;
    localizedAnswer: string;
}

const LetterContent = ({ localizedAnswer }: { localizedAnswer: string }) => {
    const { t } = useTranslation();
    return (
        <div className="text-center">
            <div className="text-6xl font-bold text-primary-600 mb-2">
                {localizedAnswer}
            </div>
            <p className="text-lg text-text-600">{t("learn.reading.levels.letters")}</p>
        </div>
    );
};

const WordContent = ({ localizedAnswer }: { localizedAnswer: string }) => {
    const { t } = useTranslation();
    return (
        <div className="text-center">
            <div className="text-4xl font-bold text-primary-600 mb-2">
                {localizedAnswer}
            </div>
            <p className="text-lg text-text-600">{t("learn.reading.levels.words")}</p>
        </div>
    );
};

const SentenceContent = ({ localizedAnswer }: { localizedAnswer: string }) => {
    const { t } = useTranslation();
    return (
        <div className="text-center">
            <div className="text-xl font-semibold text-primary-600 mb-2">
                {localizedAnswer}
            </div>
            <p className="text-lg text-text-600">{t("learn.reading.levels.sentences")}</p>
        </div>
    );
};

const StoryContent = ({ question, localizedAnswer }: ReadingQuestionContentProps) => {
    const { t } = useTranslation();
    const { i18n } = useTranslation();
    const isDutch = (i18n.resolvedLanguage ?? i18n.language ?? "en").startsWith("nl");
    const lines = isDutch && question.storyTranslation?.length
        ? question.storyTranslation
        : question.storyContent ?? [];

    return (
        <div className="text-center">
            <div className="text-xl font-bold text-primary-600 mb-4">
                {localizedAnswer}
            </div>
            <div className="text-left space-y-2">
                {lines.map((line, i) => (
                    <p key={i} className="text-lg text-text-700 leading-relaxed">
                        {line}
                    </p>
                ))}
            </div>
            <p className="text-sm text-text-400 mt-4">{t("learn.reading.levels.stories")}</p>
        </div>
    );
};

export const ReadingQuestionContent = ({ question, localizedAnswer }: ReadingQuestionContentProps) => {
    switch (question.type) {
        case "letter":
            return <LetterContent localizedAnswer={localizedAnswer} />;
        case "word":
            return <WordContent localizedAnswer={localizedAnswer} />;
        case "sentence":
            return <SentenceContent localizedAnswer={localizedAnswer} />;
        case "story":
            return <StoryContent question={question} localizedAnswer={localizedAnswer} />;
        default:
            return null;
    }
};