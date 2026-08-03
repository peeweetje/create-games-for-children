import { useTranslation } from 'react-i18next';

const LINE_WIDTHS = [2, 4, 8, 12];

interface LineWidthSelectorProps {
    lineWidth: number;
    onLineWidthChange: (width: number) => void;
    show: boolean;
}

export const LineWidthSelector = ({ lineWidth, onLineWidthChange, show }: LineWidthSelectorProps) => {
    const { t } = useTranslation();

    if (!show) return null;

    return (
        <div>
            <label className="block text-sm font-medium text-gray-600 mb-2">
                {t('coloring.lineWidth', { defaultValue: 'Line Width' })}
            </label>
            <div className="grid grid-cols-4 gap-1">
                {LINE_WIDTHS.map((width) => (
                    <button
                        key={width}
                        onClick={() => onLineWidthChange(width)}
                        className={`px-1 py-1 rounded-full text-xs font-medium transition-all ${
                            lineWidth === width
                                ? 'bg-purple-500 text-white'
                                : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
                        }`}
                    >
                        {width}px
                    </button>
                ))}
            </div>
        </div>
    );
};