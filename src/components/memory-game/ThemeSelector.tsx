import { useTranslation } from 'react-i18next'

// Available themes with different emojis
 export const THEMES = {
    animals: ['🐶', '🐱', '🐭', '🐹', '🐰', '🦊', '🐻', '🐼', '🐨', '🐯', '🦁', '🐮'],
    fruits: ['🍎', '🍐', '🍊', '🍋', '🍌', '🍉', '🍇', '🍓', '🍒', '🍑', '🍍', '🥝'],
    food: ['🍕', '🍔', '🍟', '🌭', '🍿', '🍩', '🍪', '🍫', '🍭', '🍦', '🍧', '🎂'],
    sports: ['⚽️', '🏀', '🏈', '⚾️', '🎾', '🏐', '🏉', '🎱', '🏓', '🏸', '🏒', '🏑']
}

 export type ThemeType = keyof typeof THEMES

interface ThemeSelectorProps {
    theme: ThemeType
    onThemeChange: (theme: ThemeType) => void
}

export const ThemeSelector = ({ theme, onThemeChange }: ThemeSelectorProps) => {
    const { t } = useTranslation()
    
    return (
        <div className="flex flex-wrap gap-1 sm:gap-1.5 md:gap-2">
            {Object.keys(THEMES).map((themeKey) => (
                <button
                    key={themeKey}
                    onClick={() => onThemeChange(themeKey as ThemeType)}
                    className={`px-1.5 py-1 sm:px-2 sm:py-1 md:px-3 md:py-1.5 rounded-full text-xs sm:text-xs md:text-sm font-medium transition-all min-w-[50px] sm:min-w-[55px] md:min-w-[80px] ${
                        theme === themeKey 
                            ? 'bg-violet-500 text-white shadow-lg' 
                            : 'bg-white text-gray-700 hover:bg-violet-200'
                    }`}
                >
                    <span className="hidden sm:inline mr-1">{THEMES[themeKey as ThemeType][0]}</span>
                    {t(`memory.themes.${themeKey}`)}
                </button>
            ))}
        </div>
    )
}