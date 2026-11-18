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
            className="flex min-h-12 items-center justify-center gap-2 rounded-lg bg-error px-4 py-3 text-base font-semibold text-text-inverse transition-colors hover:bg-red-600 lg:min-h-10 lg:gap-1.5 lg:px-3 lg:py-2 lg:text-sm"
        >
            <RefreshCw size={18} className="lg:h-4 lg:w-4" />
            {t('coloring.clear')}
        </button>
    );
};