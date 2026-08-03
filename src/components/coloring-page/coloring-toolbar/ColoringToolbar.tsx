import type { ColoringImageItem, ToolType } from '../../../helpers/coloringHelpers';
import { ImageSelector } from './ImageSelector';
import { ColorPalette } from './ColorPalette';
import { ToolSelector } from './ToolSelector';
import { LineWidthSelector } from './LineWidthSelector';
import { Actions } from './Actions';

interface ColoringToolbarProps {
    currentImage: ColoringImageItem;
    color: string;
    lineWidth: number;
    tool: ToolType;
    onImageChange: (image: ColoringImageItem) => void;
    onColorChange: (color: string) => void;
    onLineWidthChange: (width: number) => void;
    onToolChange: (tool: ToolType) => void;
    onClear: () => void;
    onDownload: () => void;
}

export const ColoringToolbar = ({
    currentImage,
    color,
    lineWidth,
    tool,
    onImageChange,
    onColorChange,
    onLineWidthChange,
    onToolChange,
    onClear,
    onDownload,
}: ColoringToolbarProps) => {
    return (
        <div className="lg:col-span-1 bg-white rounded-xl p-4 shadow-lg flex flex-col gap-4 border-2 border-primary-200">
            <ImageSelector currentImage={currentImage} onImageChange={onImageChange} />
            <ColorPalette color={color} onColorChange={onColorChange} />
            <ToolSelector tool={tool} onToolChange={onToolChange} />
            <LineWidthSelector lineWidth={lineWidth} onLineWidthChange={onLineWidthChange} show={tool !== 'fill'} />
            <Actions onClear={onClear} onDownload={onDownload} />
        </div>
    );
};