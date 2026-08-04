import { useTranslation } from 'react-i18next';
import { RefreshCw } from 'lucide-react';

interface ClearButtonProps {
    onClear: () => void;
}

export const ClearButton = ({ onClear }: ClearButtonProps) => {
    const { t } = useTranslation();

    return (
        <button
            onClick={onClear}
            className="flex items-center justify-center gap-1.5 px-2 py-1 bg-surface-500 text-text-inverse rounded-md text-sm hover:bg-surface-600 transition-colors"
        >
            <RefreshCw size={14} />
            {t('coloring.clear')}
        </button>
    );
};