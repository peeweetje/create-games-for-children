import { ReadingLevel } from "../../helpers/readingHelper";
import { useTranslation } from "react-i18next";

interface ReadingLevelSelectorProps {
    selectedLevel: ReadingLevel;
    onSelect: (level: ReadingLevel) => void;
}

export const ReadingLevelSelector = ({ selectedLevel, onSelect }: ReadingLevelSelectorProps) => {
    const { t } = useTranslation();
    
    const levels: { value: ReadingLevel; label: string; description: string }[] = [
        { value: "letters", label: t("learn.reading.levels.letters"), description: t("learn.reading.levelDescriptions.letters") },
        { value: "words", label: t("learn.reading.levels.words"), description: t("learn.reading.levelDescriptions.words") },
        { value: "sentences", label: t("learn.reading.levels.sentences"), description: t("learn.reading.levelDescriptions.sentences") },
        { value: "stories", label: t("learn.reading.levels.stories"), description: t("learn.reading.levelDescriptions.stories") },
    ];

    return (
        <div className="w-full">
            <div className="text-center mb-6">
                <h2 className="text-2xl font-bold text-gray-800 mb-2">{t("learn.reading.title")}</h2>
                <p className="text-gray-600">{t("learn.reading.subtitle")}</p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {levels.map((level) => (
                    <button
                        key={level.value}
                        onClick={() => onSelect(level.value)}
                        className={`p-8 rounded-2xl border-2 transition-all duration-300 text-left ${
                            selectedLevel === level.value
                                ? "border-fuchsia-500 bg-gradient-to-br from-fuchsia-50 to-purple-50 shadow-xl scale-105"
                                : "border-gray-200 bg-white hover:border-fuchsia-300 hover:shadow-lg hover:scale-105"
                        }`}
                    >
                        <div className="flex items-center justify-between mb-4">
                            {selectedLevel === level.value && (
                                <div className="w-4 h-4 bg-fuchsia-500 rounded-full shadow-sm"></div>
                            )}
                        </div>
                        <div>
                            <h3 className="text-xl font-bold text-gray-800 mb-2">{level.label}</h3>
                            <p className="text-gray-600 leading-relaxed">{level.description}</p>
                        </div>
                    </button>
                ))}
            </div>
        </div>
    );
};
