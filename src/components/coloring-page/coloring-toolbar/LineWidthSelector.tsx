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
            <label className="block text-sm font-medium text-text-600 mb-2">
                {t('coloring.lineWidth')}
            </label>
            <div className="grid grid-cols-4 gap-1">
                {LINE_WIDTHS.map((width) => (
                    <button
                        key={width}
                        onClick={() => onLineWidthChange(width)}
                        className={`px-1 py-1 rounded-full text-xs font-medium transition-all ${
                            lineWidth === width
                                ? 'bg-primary-500 text-text-inverse'
                                : 'bg-surface-200 text-text-700 hover:bg-surface-300'
                        }`}
                    >
                        {width}px
                    </button>
                ))}
            </div>
        </div>
    );
};