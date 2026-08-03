import { useTranslation } from 'react-i18next';
import { Download, RefreshCw } from 'lucide-react';

interface ActionsProps {
    onClear: () => void;
    onDownload: () => void;
}

export const Actions = ({ onClear, onDownload }: ActionsProps) => {
    const { t } = useTranslation();

    return (
        <div className="flex flex-col gap-2 mt-auto pt-3 border-t border-gray-100">
            <button
                onClick={onClear}
                className="flex items-center justify-center gap-1.5 px-2 py-1 bg-gray-500 text-white rounded-md text-sm hover:bg-gray-600 transition-colors"
            >
                <RefreshCw size={14} />
                {t('coloring.clear', { defaultValue: 'Clear' })}
            </button>
            <button
                onClick={onDownload}
                className="flex items-center justify-center gap-1.5 px-2 py-1 bg-green-500 text-white rounded-md text-sm hover:bg-green-600 transition-colors"
            >
                <Download size={14} />
                {t('coloring.download', { defaultValue: 'Download' })}
            </button>
        </div>
    );
};