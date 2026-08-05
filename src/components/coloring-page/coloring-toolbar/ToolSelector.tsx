import { useTranslation } from 'react-i18next';
import { Paintbrush, PaintBucket, Eraser } from 'lucide-react';
import type { ToolType } from '../../../helpers/coloringHelpers';

interface ToolSelectorProps {
    tool: ToolType;
    onToolChange: (tool: ToolType) => void;
}

export const ToolSelector = ({ tool, onToolChange }: ToolSelectorProps) => {
    const { t } = useTranslation();

    return (
        <div>
            <label className="block text-sm font-medium text-text-600 mb-2">
                {t('coloring.tools')}
            </label>
            <div className="flex flex-col gap-1.5">
                <button
                    onClick={() => onToolChange('fill')}
                    className={`flex items-center gap-2 px-3 py-1.5 rounded-lg font-medium transition-all ${
                        tool === 'fill' ? 'bg-primary-400 text-text-inverse' : 'bg-surface-100 text-text-700 hover:bg-surface-200'
                    }`}
                >
                    <PaintBucket size={18} />
                    {t('coloring.fill')}
                </button>
                <button
                    onClick={() => onToolChange('pen')}
                    className={`flex items-center gap-2 px-3 py-1.5 rounded-lg font-medium transition-all ${
                        tool === 'pen' ? 'bg-info text-text-inverse' : 'bg-surface-100 text-text-700 hover:bg-surface-200'
                    }`}
                >
                    <Paintbrush size={18} />
                    {t('coloring.pen')}
                </button>
                <button
                    onClick={() => onToolChange('eraser')}
                    className={`flex items-center gap-2 px-3 py-1.5 rounded-lg font-medium transition-all ${
                        tool === 'eraser' ? 'bg-error text-text-inverse' : 'bg-surface-100 text-text-700 hover:bg-surface-200'
                    }`}
                >
                    <Eraser size={18} />
                    {t('coloring.eraser')}
                </button>
            </div>
        </div>
    );
};