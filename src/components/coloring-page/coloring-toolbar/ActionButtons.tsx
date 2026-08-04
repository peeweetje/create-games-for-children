import { ClearButton } from '../../buttons/ClearButton';
import { DownloadButton } from '../../buttons/DownloadButton';

interface ActionsProps {
    onClear: () => void;
    onDownload: () => void;
}

export const Actions = ({ onClear, onDownload }: ActionsProps) => {
    return (
        <div className="flex flex-col gap-2 mt-auto pt-3 border-t border-surface-100">
            <ClearButton onClear={onClear} />
            <DownloadButton onDownload={onDownload} />
        </div>
    );
};