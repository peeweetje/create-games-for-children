import { useState } from "react";
import { ReadingLevel, Theme } from "../helpers/readingHelper";
import { ReadingHeader } from "../components/reading-page/ReadingHeader";
import { ReadingLevelSelector } from "../components/reading-page/ReadingLevelSelector";
import { ReadingThemeSelector } from "../components/reading-page/ReadingThemeSelector";
import { ReadingHighScoresModal } from "../components/reading-page/ReadingHighScoresModal";
import { ReadingViewHighScoresButton } from "../components/reading-page/ReadingViewHighScoresButton";
import { ReadingQuestionPage } from "./ReadingQuestionPage";
import { useTranslation } from "react-i18next";

export const ReadingPage = () => {
    const [selectedLevel, setSelectedLevel] = useState<ReadingLevel>("letters");
    const [selectedTheme, setSelectedTheme] = useState<Theme>("animals");
    const [showHighScores, setShowHighScores] = useState(false);
    const [showQuestionPage, setShowQuestionPage] = useState(false);
    const { t } = useTranslation();

    const handleStartReading = () => {
        setShowQuestionPage(true);
    };

    const handleBackToSettings = () => {
        setShowQuestionPage(false);
    };

    if (showQuestionPage) {
        return (
            <ReadingQuestionPage
                selectedLevel={selectedLevel}
                selectedTheme={selectedTheme}
                onBackToSettings={handleBackToSettings}
            />
        );
    }

    return (
        <div className="flex flex-col items-center min-h-full bg-gradient-to-b from-fuchsia-50 to-purple-100 p-6 pb-24">
            <ReadingHeader />
            
            <div className="w-full max-w-4xl space-y-8">
                {/* Settings Section */}
                <div className="bg-white rounded-2xl shadow-xl p-8 border border-fuchsia-200">
                    <h2 className="text-2xl font-bold text-gray-800 mb-6 text-center">
                        📚 {t("learn.reading.settings.title")}
                    </h2>
                    
                    <div className="grid md:grid-cols-1 gap-8">
                        <div className="bg-gradient-to-br from-fuchsia-50 to-purple-50 rounded-2xl p-12 border border-fuchsia-200 shadow-xl">
                            <ReadingLevelSelector
                                selectedLevel={selectedLevel}
                                onSelect={setSelectedLevel}
                            />
                        </div>
                        
                        <div className="bg-gradient-to-br from-purple-50 to-fuchsia-50 rounded-2xl p-12 border border-purple-200 shadow-xl">
                            <ReadingThemeSelector
                                selectedTheme={selectedTheme}
                                onSelect={setSelectedTheme}
                            />
                        </div>
                    </div>

                    {/* Start Button */}
                    <div className="mt-8 flex justify-center">
                        <button
                            onClick={handleStartReading}
                            className="px-8 py-4 bg-gradient-to-r from-purple-500 to-fuchsia-500 text-white text-lg font-bold rounded-xl hover:from-purple-600 hover:to-fuchsia-600 transition-all duration-300 transform hover:scale-105 shadow-2xl"
                        >
                            🚀 {t("learn.reading.startButton")}
                        </button>
                    </div>
                </div>

                {/* High Scores Section */}
                <div className="bg-white rounded-2xl shadow-xl p-6 border border-purple-200">
                    <div className="flex justify-center">
                        <ReadingViewHighScoresButton onClick={() => setShowHighScores(true)} />
                    </div>
                </div>
            </div>
            
            <ReadingHighScoresModal
                isOpen={showHighScores}
                onClose={() => setShowHighScores(false)}
            />
        </div>
    );
};
