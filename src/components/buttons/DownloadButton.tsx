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
            className="flex items-center justify-center gap-1.5 px-2 py-1 bg-success text-text-inverse rounded-md text-sm hover:bg-success-600 transition-colors"
        >
            <Download size={14} />
            {t('coloring.download')}
        </button>
    );
};