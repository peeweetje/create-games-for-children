import { ReadingQuestion } from "../../helpers/readingHelper";
import { useTranslation } from "react-i18next";

interface ReadingQuestionCardProps {
    question: ReadingQuestion;
    feedback: "correct" | "wrong" | null;
    feedbackEmoji: string;
}

export const ReadingQuestionCard = ({ question, feedback, feedbackEmoji }: ReadingQuestionCardProps) => {
    const { t } = useTranslation();
    
    const getQuestionContent = () => {
        // Get current language from localStorage
        const currentLang = localStorage.getItem('i18nextLng') || 'en';
        const isDutch = currentLang.startsWith('nl');
        
        switch (question.type) {
            case "letter":
                return (
                    <div className="text-center">
                        <div className="text-6xl font-bold text-fuchsia-600 mb-2">
                            {isDutch ? question.answer : question.answer}
                        </div>
                        <p className="text-lg text-gray-600">{t("learn.reading.levels.letters")}</p>
                    </div>
                );
            case "word":
                return (
                    <div className="text-center">
                        <div className="text-4xl font-bold text-fuchsia-600 mb-2">
                            {isDutch ? question.answer : question.answer}
                        </div>
                        <p className="text-lg text-gray-600">{t("learn.reading.levels.words")}</p>
                    </div>
                );
            case "sentence":
                return (
                    <div className="text-center">
                        <div className="text-xl font-semibold text-fuchsia-600 mb-2">
                            {isDutch && question.translation ? question.translation : question.answer}
                        </div>
                        <p className="text-lg text-gray-600">{t("learn.reading.levels.sentences")}</p>
                    </div>
                );
            case "story":
                return (
                    <div className="text-center">
                        <div className="text-2xl font-bold text-fuchsia-600 mb-2">
                            {isDutch && question.translation ? question.translation : question.answer}
                        </div>
                        <p className="text-lg text-gray-600">{t("learn.reading.levels.stories")}</p>
                    </div>
                );
        }
    };


    return (
        <div className="w-full max-w-2xl mx-auto">
            <div className="bg-white rounded-2xl shadow-lg p-8 border-2 border-fuchsia-100">
                <div className="text-center mb-6">
                    <h2 className="text-2xl font-bold text-gray-800 mb-2">{t("learn.reading.questionCard.readingQuestion")}</h2>
                    <p className="text-gray-600">{t("learn.reading.questionCard.answerBelow")}</p>
                </div>
                
                <div className="bg-gradient-to-br from-fuchsia-50 to-purple-50 rounded-xl p-8 border-2 border-fuchsia-200">
                    {question.image && (
                        <div className="flex justify-center mb-4">
                            <img 
                                src={`/assets/images/${question.image}`} 
                                alt={question.answer}
                                className="w-32 h-32 object-cover rounded-lg shadow-md"
                                onError={(e) => {
                                    // Fallback for missing images
                                    e.currentTarget.style.display = 'none';
                                }}
                            />
                        </div>
                    )}
                    
                    {getQuestionContent()}
                    
                    {question.audio && (
                        <div className="mt-4 flex justify-center">
                            <button 
                                className="bg-fuchsia-500 text-white px-4 py-2 rounded-lg hover:bg-fuchsia-600 transition-colors"
                                onClick={() => {
                                    // Create a simple text-to-speech audio using the Web Speech API
                                    if ('speechSynthesis' in window) {
                                        // Get current language from localStorage
                                        const currentLang = localStorage.getItem('i18nextLng') || 'en';
                                        const isDutch = currentLang.startsWith('nl');
                                        
                                        // Use Dutch translation if available and in Dutch mode, otherwise use English
                                        const textToSpeak = isDutch && question.translation ? question.translation : question.answer;
                                        
                                        const utterance = new SpeechSynthesisUtterance(textToSpeak);
                                        
                                        // Set appropriate language
                                        const langCode = isDutch ? 'nl-NL' : 'en-US';
                                        
                                        utterance.lang = langCode;
                                        utterance.rate = 0.9;
                                        utterance.pitch = 1;
                                        speechSynthesis.speak(utterance);
                                    } else {
                                        alert("Text-to-speech is not supported in this browser.");
                                    }
                                }}
                            >
                                🔊 {t("learn.reading.questionCard.listen")}
                            </button>
                        </div>
                    )}
                </div>

                {feedback && (
                    <div className={`mt-6 text-center p-4 rounded-lg ${
                        feedback === "correct" 
                            ? "bg-green-100 border-green-200 text-green-800" 
                            : "bg-red-100 border-red-200 text-red-800"
                    }`}>
                        <div className="text-2xl mb-2">{feedbackEmoji}</div>
                        <p className="font-semibold">
                            {feedback === "correct" ? t("learn.reading.questionCard.correct") : t("learn.reading.questionCard.wrong", { answer: question.answer })}
                        </p>
                    </div>
                )}
            </div>
        </div>
    );
};