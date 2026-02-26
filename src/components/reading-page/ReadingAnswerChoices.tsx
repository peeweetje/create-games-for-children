
import { SENTENCES, STORIES } from "../../helpers/readingHelper";

interface ReadingAnswerChoicesProps {
    choices: string[];
    selected: string | null;
    correctAnswer: string;
    question: any;
    onSelect: (choice: string) => void;
    disabled: boolean;
}

export const ReadingAnswerChoices = ({ 
    choices, 
    selected, 
    correctAnswer, 
    question,
    onSelect, 
    disabled 
}: ReadingAnswerChoicesProps) => {
    
    const getChoiceText = (choice: string) => {
        // Get current language from localStorage
        const currentLang = localStorage.getItem('i18nextLng') || 'en';
        const isDutch = currentLang.startsWith('nl');
        
        // For sentences, we need to find the matching translation
        if (question.type === "sentence" && isDutch) {
            // Find the sentence that matches this choice
            const matchingSentence = Object.values(SENTENCES).flat()
                .find(s => s.sentence === choice);
            
            if (matchingSentence && matchingSentence.translation) {
                return matchingSentence.translation;
            }
        }
        
        // For stories, we need to find the matching translation
        if (question.type === "story" && isDutch) {
            // Find the story that matches this choice
            const matchingStory = Object.values(STORIES).flat()
                .find(s => s.title === choice);
            
            if (matchingStory && matchingStory.titleTranslation) {
                return matchingStory.titleTranslation;
            }
        }
        
        return choice;
    };
    
    
    return (
        <div className="w-full max-w-2xl mx-auto">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {choices.map((choice, index) => {
                    const isSelected = selected === choice;
                    const isCorrect = choice === correctAnswer;
                    const isWrong = selected === choice && !isCorrect;
                    
                    let buttonClass = "p-6 rounded-xl border-2 text-center transition-all duration-300 font-semibold text-lg";
                    
                    if (disabled && isCorrect) {
                        buttonClass += " border-green-500 bg-green-50 text-green-800 shadow-lg scale-105";
                    } else if (disabled && isWrong) {
                        buttonClass += " border-red-500 bg-red-50 text-red-800 shadow-lg";
                    } else if (isSelected && !disabled) {
                        buttonClass += " border-fuchsia-500 bg-fuchsia-50 text-fuchsia-800 shadow-md";
                    } else {
                        buttonClass += " border-gray-200 bg-white text-gray-700 hover:border-fuchsia-300 hover:bg-fuchsia-50";
                    }

                    return (
                        <button
                            key={index}
                            onClick={() => !disabled && onSelect(choice)}
                            disabled={disabled}
                            className={buttonClass}
                        >
                            {getChoiceText(choice)}
                        </button>
                    );
                })}
            </div>
        </div>
    );
};
