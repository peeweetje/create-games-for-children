import { useTranslation } from 'react-i18next';
import { Paintbrush, Eraser, Download, RefreshCw, PaintBucket, ImageIcon } from 'lucide-react';
import type { ColoringImageItem, ToolType } from '../../helpers/coloringHelpers';

const COLOR_OPTIONS = [
    '#FF6B6B', '#4ECDC4', '#45B7D1', '#96CEB4', '#FFEAA7',
    '#DDA0DD', '#98D8C8', '#F7DC6F', '#BB8FCE', '#48aaeb',
    '#F8C471', '#82E0AA', '#F1948A', '#85C1E9', '#D7BDE2'
];

const LINE_WIDTHS = [2, 4, 8, 12];

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

const IMAGES: ColoringImageItem[] = ['flower', 'house', 'car', 'cat', 'dog', 'bird', 'turtle', 'bike', 'blank'];

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
    const { t } = useTranslation();

    return (
        <div className="lg:col-span-1 bg-white rounded-xl p-4 shadow-lg flex flex-col gap-4">
            {/* Images */}
            <div>
                <label className="block text-sm font-medium text-gray-600 mb-2">
                    {t('coloring.imagesLabel', { defaultValue: 'Images' })}
                </label>
                <div className="grid grid-cols-3 gap-1.5">
                    {IMAGES.map(img => (
                        <button
                            key={img}
                            onClick={() => onImageChange(img)}
                            className={`flex flex-col items-center justify-center p-1.5 rounded-lg border-2 transition-all ${
                                currentImage === img ? 'border-purple-500 bg-purple-50' : 'border-gray-200 hover:border-purple-300'
                            }`}
                        >
                            <ImageIcon size={20} className="mb-1 text-gray-600" />
                            <span className="text-xs uppercase font-medium text-gray-600">
                                {t(`coloring.images.${img}`, { defaultValue: img })}
                            </span>
                        </button>
                    ))}
                </div>
            </div>

            {/* Color Palette */}
            <div>
                <label className="block text-sm font-medium text-gray-600 mb-2">
                    {t('coloring.colors', { defaultValue: 'Color Palette' })}
                </label>
                <div className="grid grid-cols-5 gap-1.5">
                    {COLOR_OPTIONS.map((colorOption) => (
                        <button
                            key={colorOption}
                            onClick={() => onColorChange(colorOption)}
                            className={`w-8 h-8 mx-auto rounded-full border-2 transition-all ${
                                color === colorOption ? 'border-gray-400 scale-110 shadow-md' : 'border-gray-200 hover:scale-105'
                            }`}
                            style={{ backgroundColor: colorOption }}
                            title={colorOption}
                        />
                    ))}
                </div>
            </div>

            {/* Tools */}
            <div>
                <label className="block text-sm font-medium text-gray-600 mb-2">
                    {t('coloring.tools', { defaultValue: 'Tools' })}
                </label>
                <div className="flex flex-col gap-1.5">
                    <button
                        onClick={() => onToolChange('fill')}
                        className={`flex items-center gap-2 px-3 py-1.5 rounded-lg font-medium transition-all ${
                            tool === 'fill' ? 'bg-purple-500 text-white' : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                        }`}
                    >
                        <PaintBucket size={18} />
                        {t('coloring.fill', { defaultValue: 'Fill Bucket' })}
                    </button>
                    <button
                        onClick={() => onToolChange('pen')}
                        className={`flex items-center gap-2 px-3 py-1.5 rounded-lg font-medium transition-all ${
                            tool === 'pen' ? 'bg-blue-500 text-white' : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                        }`}
                    >
                        <Paintbrush size={18} />
                        {t('coloring.pen', { defaultValue: 'Pen' })}
                    </button>
                    <button
                        onClick={() => onToolChange('eraser')}
                        className={`flex items-center gap-2 px-3 py-1.5 rounded-lg font-medium transition-all ${
                            tool === 'eraser' ? 'bg-red-500 text-white' : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                        }`}
                    >
                        <Eraser size={18} />
                        {t('coloring.eraser', { defaultValue: 'Eraser' })}
                    </button>
                </div>
            </div>

            {/* Line Width */}
            {tool !== 'fill' && (
                <div>
                    <label className="block text-sm font-medium text-gray-600 mb-2">
                        {t('coloring.lineWidth', { defaultValue: 'Line Width' })}
                    </label>
                    <div className="grid grid-cols-4 gap-1">
                        {LINE_WIDTHS.map((width) => (
                            <button
                                key={width}
                                onClick={() => onLineWidthChange(width)}
                                className={`px-1 py-1 rounded-full text-xs font-medium transition-all ${
                                    lineWidth === width
                                        ? 'bg-purple-500 text-white'
                                        : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
                                }`}
                            >
                                {width}px
                            </button>
                        ))}
                    </div>
                </div>
            )}

            {/* Actions */}
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
        </div>
    );
};