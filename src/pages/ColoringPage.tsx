import { useState, useRef, useCallback } from 'react';
import { useTranslation } from 'react-i18next';
import { ColoringToolbar } from '../components/coloring-page/coloring-toolbar/ColoringToolbar';
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
        <div className="min-h-screen bg-gradient-to-br from-primary-100 via-background to-primary-200 pt-2 pb-20 sm:pt-4 md:pb-8 lg:py-8">
            <div className="max-w-4xl mx-auto px-2 lg:px-4">
                <div className="text-center mb-3 sm:mb-6 lg:mb-8">
                    <h1 className="text-3xl sm:text-4xl font-bold text-text-600 mb-2">
                        🎨 {t('coloring.title')}
                    </h1>
                    <p className="text-text-600">{t('coloring.subtitle')}</p>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-4 gap-4 lg:gap-6">
                    <ColoringToolbar
                        className="order-2 lg:order-1"
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
                        className="order-1 lg:order-2"
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