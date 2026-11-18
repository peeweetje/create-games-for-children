import { ClearButton } from '../../buttons/ClearButton';
import { DownloadButton } from '../../buttons/DownloadButton';

interface ActionsProps {
    onClear: () => void;
    onDownload: () => void;
}

export const Actions = ({ onClear, onDownload }: ActionsProps) => {
    return (
        <div className="flex flex-col gap-4 mt-auto pt-4 border-t border-surface-100 lg:gap-2t-3">
            <ClearButton onClear={onClear} />
            <DownloadButton onDownload={onDownload} />
        </div>
    );
};