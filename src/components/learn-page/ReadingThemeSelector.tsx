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
        <div className="w-full max-w-4xl mx-auto">
            <div className="text-center mb-6">
                <h2 className="text-2xl font-bold text-gray-800 mb-2">{t("learn.reading.themeSelector.selectTheme")}</h2>
                <p className="text-gray-600">{t("learn.reading.themeSelector.chooseTheme")}</p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {themes.map((theme) => (
                    <button
                        key={theme.value}
                        onClick={() => onSelect(theme.value)}
                        className={`p-6 rounded-xl border-2 transition-all duration-200 text-left ${
                            selectedTheme === theme.value
                                ? "border-fuchsia-500 bg-fuchsia-50 shadow-lg scale-105"
                                : "border-gray-200 bg-white hover:border-fuchsia-300 hover:shadow-md"
                        }`}
                    >
                        <div className="flex items-center justify-between mb-3">
                            {selectedTheme === theme.value && (
                                <div className="w-3 h-3 bg-fuchsia-500 rounded-full"></div>
                            )}
                        </div>
                        <div>
                            <h3 className="font-semibold text-gray-800 mb-1">{theme.label}</h3>
                            <p className="text-sm text-gray-600">{theme.description}</p>
                        </div>
                    </button>
                ))}
            </div>
        </div>
    );
};