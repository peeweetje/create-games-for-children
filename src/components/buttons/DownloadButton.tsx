import { useTranslation } from 'react-i18next';
import { Download } from 'lucide-react';

interface DownloadButtonProps {
    onDownload: () => void;
}

export const DownloadButton = ({ onDownload }: DownloadButtonProps) => {
    const { t } = useTranslation();

    return (
        <button
            onClick={onDownload}
            className="flex min-h-12 items-center justify-center gap-2 rounded-lg bg-success px-4 py-3 text-base font-semibold text-text-inverse transition-colors hover:bg-success-600 lg:min-h-10 lg:gap-1.5 lg:px-3 lg:py-2 lg:text-sm"
        >
            <Download size={18} className="lg:h-4 lg:w-4" />
            {t('coloring.download')}
        </button>
    );
};