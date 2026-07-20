import { useRef, useCallback, useEffect, forwardRef, useImperativeHandle } from 'react';
import { useTranslation } from 'react-i18next';
import { drawOutline, floodFill } from '../../helpers/coloringHelpers';
import type { ColoringImageItem, ToolType } from '../../helpers/coloringHelpers';

export interface ColoringCanvasHandle {
    clear: () => void;
    download: () => void;
}

interface ColoringCanvasProps {
    currentImage: ColoringImageItem;
    color: string;
    lineWidth: number;
    tool: ToolType;
}

export const ColoringCanvas = forwardRef<ColoringCanvasHandle, ColoringCanvasProps>(({
    currentImage,
    color,
    lineWidth,
    tool,
}, ref) => {
    const { t } = useTranslation();
    const canvasRef = useRef<HTMLCanvasElement>(null);
    const isDrawingRef = useRef(false);

    useImperativeHandle(ref, () => ({
        clear: () => {
            const canvas = canvasRef.current;
            if (!canvas) return;
            const ctx = canvas.getContext('2d', { willReadFrequently: true });
            if (!ctx) return;
            ctx.clearRect(0, 0, canvas.width, canvas.height);
            drawOutline(ctx, currentImage);
        },
        download: () => {
            const canvas = canvasRef.current;
            if (!canvas) return;
            const link = document.createElement('a');
            link.download = 'my-coloring.png';
            link.href = canvas.toDataURL();
            link.click();
        },
    }), [currentImage]);

    const initCanvas = useCallback(() => {
        const canvas = canvasRef.current;
        if (!canvas) return;
        const ctx = canvas.getContext('2d', { willReadFrequently: true });
        if (!ctx) return;

        canvas.width = 600;
        canvas.height = 600;

        drawOutline(ctx, currentImage);
    }, [currentImage]);

    useEffect(() => {
        initCanvas();
    }, [initCanvas]);

    const getCoordinates = (e: React.MouseEvent<HTMLCanvasElement> | React.TouchEvent<HTMLCanvasElement>) => {
        const canvas = canvasRef.current;
        if (!canvas) return { x: 0, y: 0 };
        const rect = canvas.getBoundingClientRect();
        const scaleX = canvas.width / rect.width;
        const scaleY = canvas.height / rect.height;

        let clientX: number, clientY: number;
        if ('touches' in e) {
            clientX = e.touches[0].clientX;
            clientY = e.touches[0].clientY;
        } else {
            clientX = e.clientX;
            clientY = e.clientY;
        }

        return {
            x: (clientX - rect.left) * scaleX,
            y: (clientY - rect.top) * scaleY
        };
    };

    const startDrawing = useCallback((e: React.MouseEvent<HTMLCanvasElement> | React.TouchEvent<HTMLCanvasElement>) => {
        if ('touches' in e) e.preventDefault();
        const canvas = canvasRef.current;
        if (!canvas) return;
        const ctx = canvas.getContext('2d', { willReadFrequently: true });
        if (!ctx) return;

        const { x, y } = getCoordinates(e);

        if (tool === 'fill') {
            floodFill(ctx, x, y, color);
            return;
        }

        isDrawingRef.current = true;
        ctx.beginPath();
        ctx.moveTo(x, y);
    }, [tool, color]);

    const draw = useCallback((e: React.MouseEvent<HTMLCanvasElement> | React.TouchEvent<HTMLCanvasElement>) => {
        if (!isDrawingRef.current || tool === 'fill') return;
        if ('touches' in e) e.preventDefault();

        const canvas = canvasRef.current;
        if (!canvas) return;
        const ctx = canvas.getContext('2d', { willReadFrequently: true });
        if (!ctx) return;

        const { x, y } = getCoordinates(e);

        ctx.lineWidth = lineWidth;
        ctx.lineCap = 'round';
        ctx.lineJoin = 'round';

        if (tool === 'eraser') {
            ctx.strokeStyle = '#FFFFFF';
            ctx.globalCompositeOperation = 'source-over';
        } else {
            ctx.strokeStyle = color;
            ctx.globalCompositeOperation = 'source-over';
        }

        ctx.lineTo(x, y);
        ctx.stroke();
    }, [color, lineWidth, tool]);

    const stopDrawing = useCallback(() => {
        isDrawingRef.current = false;
    }, []);

    return (
        <div className="lg:col-span-3 bg-white rounded-xl p-3 sm:p-6 shadow-lg">
            <div className="flex justify-between items-center mb-4">
                <h2 className="text-lg font-semibold text-gray-700">
                    {t('coloring.canvas', { defaultValue: 'Canvas' })}
                </h2>
                <div className="text-sm text-gray-500 flex items-center gap-2">
                    <span>
                        {tool === 'fill' ? t('coloring.fillMode') :
                         tool === 'pen' ? t('coloring.currentColor') :
                         t('coloring.eraserMode', { defaultValue: 'Eraser active' })}
                    </span>
                    {tool !== 'eraser' && (
                        <span style={{ backgroundColor: color }} className="inline-block w-4 h-4 rounded-full border border-gray-300 pointer-events-none" />
                    )}
                </div>
            </div>

            <div className="flex justify-center w-full overflow-hidden bg-gray-50 rounded-lg relative touch-none mx-auto">
                <canvas
                    ref={canvasRef}
                    onMouseDown={startDrawing}
                    onMouseMove={draw}
                    onMouseUp={stopDrawing}
                    onMouseLeave={stopDrawing}
                    onTouchStart={startDrawing}
                    onTouchMove={draw}
                    onTouchEnd={stopDrawing}
                    onTouchCancel={stopDrawing}
                    className={`border-2 border-gray-300 bg-white shadow-sm mx-auto ${tool === 'fill' ? 'cursor-pointer' : 'cursor-crosshair'}`}
                    style={{
                        touchAction: 'none',
                        width: '100%',
                        aspectRatio: '1/1',
                        maxWidth: '600px',
                        objectFit: 'contain'
                    }}
                />
            </div>

            <div className="mt-4 text-center text-sm text-gray-500">
                {tool === 'fill'
                    ? t('coloring.instructionsFill')
                    : t('coloring.instructions')}
            </div>
        </div>
    );
});