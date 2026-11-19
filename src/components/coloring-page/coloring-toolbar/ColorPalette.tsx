import { useTranslation } from 'react-i18next';

const COLOR_OPTIONS = [
    '#000000', '#FF0000', '#4ECDC4', '#45B7D1', '#96CEB4',
    '#FFFF00', '#DDA0DD', '#FF69B4', '#F7DC6F', '#BB8FCE',
    '#48aaeb', '#F1C27D', '#82E0AA', '#F1948A', '#85C1E9',
    '#FF8C00', '#8B4513', '#32CD32', '#0000FF', '#00CED1'
];

interface ColorPaletteProps {
    color: string;
    onColorChange: (color: string) => void;
}

export const ColorPalette = ({ color, onColorChange }: ColorPaletteProps) => {
    const { t } = useTranslation();

    return (
        <div>
            <label className="block text-sm font-medium text-text-600 mb-2">
                {t('coloring.colors')}
            </label>
            <div className="grid grid-cols-5 gap-1.5">
                {COLOR_OPTIONS.map((colorOption) => (
                    <button
                        key={colorOption}
                        onClick={() => onColorChange(colorOption)}
                        className={`w-8 h-8 mx-auto rounded-full border-2 transition-all ${
                            color === colorOption ? 'border-text-400 scale-110 shadow-md' : 'border-surface-200 hover:scale-105'
                        }`}
                        style={{ backgroundColor: colorOption }}
                        title={colorOption}
                    />
                ))}
            </div>
        </div>
    );
};