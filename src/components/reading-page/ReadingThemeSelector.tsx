import { Theme } from "../../helpers/readingHelper";
import { useTranslation } from "react-i18next";

interface ReadingThemeSelectorProps {
    selectedTheme: Theme;
    onSelect: (theme: Theme) => void;
}

export const ReadingThemeSelector = ({ selectedTheme, onSelect }: ReadingThemeSelectorProps) => {
    const { t } = useTranslation();
    
    const themes: { value: Theme; label: string; emoji: string; description: string }[] = [
        { value: "animals", label: t("learn.reading.themes.animals"), emoji: "🐾", description: t("learn.reading.themeDescriptions.animals") },
        { value: "colors", label: t("learn.reading.themes.colors"), emoji: "🌈", description: t("learn.reading.themeDescriptions.colors") },
        { value: "numbers", label: t("learn.reading.themes.numbers"), emoji: "🔢", description: t("learn.reading.themeDescriptions.numbers") },
        { value: "family", label: t("learn.reading.themes.family"), emoji: "👨‍👩‍👧‍👦", description: t("learn.reading.themeDescriptions.family") },
        { value: "food", label: t("learn.reading.themes.food"), emoji: "🍎", description: t("learn.reading.themeDescriptions.food") },
        { value: "transportation", label: t("learn.reading.themes.transportation"), emoji: "🚗", description: t("learn.reading.themeDescriptions.transportation") },
    ];

    return (
        <div className="w-full">
            <div className="text-center mb-6">
                <h2 className="text-2xl font-bold text-gray-800 mb-2">{t("learn.reading.themeSelector.selectTheme")}</h2>
                <p className="text-gray-600">{t("learn.reading.themeSelector.chooseTheme")}</p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-6">
                {themes.map((theme) => (
                    <button
                        key={theme.value}
                        onClick={() => onSelect(theme.value)}
                        className={`p-8 rounded-2xl border-2 transition-all duration-300 text-left ${
                            selectedTheme === theme.value
                                ? "border-fuchsia-500 bg-gradient-to-br from-fuchsia-50 to-purple-50 shadow-xl scale-105"
                                : "border-gray-200 bg-white hover:border-fuchsia-300 hover:shadow-lg hover:scale-105"
                        }`}
                    >
                        <div className="flex items-center justify-between mb-4">
                            {selectedTheme === theme.value && (
                                <div className="w-4 h-4 bg-fuchsia-500 rounded-full shadow-sm"></div>
                            )}
                        </div>
                        <div>
                            <h3 className="text-xl font-bold text-gray-800 mb-2">{theme.label}</h3>
                            <p className="text-gray-600 leading-relaxed">{theme.description}</p>
                        </div>
                    </button>
                ))}
            </div>
        </div>
    );
};
