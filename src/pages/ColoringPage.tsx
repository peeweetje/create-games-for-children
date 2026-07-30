import { useState, useRef, useCallback } from 'react';
import { useTranslation } from 'react-i18next';
import { ColoringToolbar } from '../components/coloring-page/ColoringToolbar';
import { ColoringCanvas } from '../components/coloring-page/ColoringCanvas';
import type { ColoringCanvasHandle } from '../components/coloring-page/ColoringCanvas';
import type { ColoringImageItem, ToolType } from '../helpers/coloringHelpers';

export function ColoringPage() {
    const { t } = useTranslation();
    const canvasRef = useRef<ColoringCanvasHandle>(null);
    const [color, setColor] = useState('#FF6B6B');
    const [lineWidth, setLineWidth] = useState(4);
    const [tool, setTool] = useState<ToolType>('fill');
    const [currentImage, setCurrentImage] = useState<ColoringImageItem>('snake');
    const snapshotsRef = useRef<Map<ColoringImageItem, string>>(new Map());

    const handleImageChange = useCallback((image: ColoringImageItem) => {
        // Save current canvas state before switching
        const currentSnapshot = canvasRef.current?.getSnapshot();
        if (currentSnapshot) {
            snapshotsRef.current.set(currentImage, currentSnapshot);
        }
        setCurrentImage(image);
    }, [currentImage]);

    const handleClear = useCallback(() => {
        canvasRef.current?.clear();
        // Remove saved snapshot since we cleared it
        snapshotsRef.current.delete(currentImage);
    }, [currentImage]);

    const handleDownload = useCallback(() => {
        canvasRef.current?.download();
    }, []);

    return (
        <div className="min-h-screen bg-gradient-to-br from-pink-100 via-purple-50 to-indigo-100 py-4 lg:py-8">
            <div className="max-w-4xl mx-auto px-2 lg:px-4">
                <div className="text-center mb-6 lg:mb-8">
                    <h1 className="text-4xl font-bold text-gray-800 mb-2">
                        🎨 {t('coloring.title', { defaultValue: 'Coloring Book' })}
                    </h1>
                    <p className="text-gray-600">{t('coloring.subtitle', { defaultValue: 'Choose a page and fill it with colors!' })}</p>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
                    <ColoringToolbar
                        currentImage={currentImage}
                        color={color}
                        lineWidth={lineWidth}
                        tool={tool}
                        onImageChange={handleImageChange}
                        onColorChange={setColor}
                        onLineWidthChange={setLineWidth}
                        onToolChange={setTool}
                        onClear={handleClear}
                        onDownload={handleDownload}
                    />

                    <ColoringCanvas
                        ref={canvasRef}
                        currentImage={currentImage}
                        color={color}
                        lineWidth={lineWidth}
                        tool={tool}
                        snapshot={snapshotsRef.current.get(currentImage)}
                    />
                </div>
            </div>
        </div>
    );
}