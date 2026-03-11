import { useState, useRef, useCallback, useEffect } from 'react';
import { Paintbrush, Eraser, Download, RefreshCw } from 'lucide-react';
import { useTranslation } from 'react-i18next';

const COLOR_OPTIONS = [
    '#FF6B6B', '#4ECDC4', '#45B7D1', '#96CEB4', '#FFEAA7',
    '#DDA0DD', '#98D8C8', '#F7DC6F', '#BB8FCE', '#85C1E9',
    '#F8C471', '#82E0AA', '#F1948A', '#85C1E9', '#D7BDE2'
];

const LINE_WIDTHS = [2, 4, 8, 12];

export function ColoringPage() {
    const { t } = useTranslation();
    const canvasRef = useRef<HTMLCanvasElement>(null);
    const [isDrawing, setIsDrawing] = useState(false);
    const [color, setColor] = useState('#FF6B6B');
    const [lineWidth, setLineWidth] = useState(4);
    const [tool, setTool] = useState<'pen' | 'eraser'>('pen');

    const startDrawing = useCallback((e: React.MouseEvent<HTMLCanvasElement>) => {
        setIsDrawing(true);
        const canvas = canvasRef.current;
        if (!canvas) return;
        
        const ctx = canvas.getContext('2d');
        if (!ctx) return;
        
        const rect = canvas.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;
        
        ctx.beginPath();
        ctx.moveTo(x, y);
    }, []);

    const draw = useCallback((e: React.MouseEvent<HTMLCanvasElement>) => {
        if (!isDrawing) return;
        
        const canvas = canvasRef.current;
        if (!canvas) return;
        
        const ctx = canvas.getContext('2d');
        if (!ctx) return;
        
        const rect = canvas.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;
        
        ctx.lineWidth = lineWidth;
        ctx.lineCap = 'round';
        ctx.lineJoin = 'round';
        
        if (tool === 'eraser') {
            ctx.strokeStyle = '#FFFFFF';
            ctx.globalCompositeOperation = 'destination-out';
        } else {
            ctx.strokeStyle = color;
            ctx.globalCompositeOperation = 'source-over';
        }
        
        ctx.lineTo(x, y);
        ctx.stroke();
    }, [isDrawing, color, lineWidth, tool]);

    const stopDrawing = useCallback(() => {
        setIsDrawing(false);
    }, []);

    const clearCanvas = useCallback(() => {
        const canvas = canvasRef.current;
        if (!canvas) return;
        
        const ctx = canvas.getContext('2d');
        if (!ctx) return;
        
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        drawOutline(ctx);
    }, []);

    const downloadImage = useCallback(() => {
        const canvas = canvasRef.current;
        if (!canvas) return;
        
        const link = document.createElement('a');
        link.download = 'my-coloring.png';
        link.href = canvas.toDataURL();
        link.click();
    }, []);

    const drawOutline = useCallback((ctx: CanvasRenderingContext2D) => {
        // Draw a simple coloring page outline
        ctx.lineWidth = 3;
        ctx.strokeStyle = '#000000';
        ctx.globalCompositeOperation = 'source-over';
        
        // Draw a simple flower (centered in 600x600 canvas)
        ctx.beginPath();
        ctx.arc(300, 300, 80, 0, Math.PI * 2);
        ctx.stroke();
        
        // Petals
        ctx.beginPath();
        ctx.arc(300, 200, 50, 0, Math.PI * 2);
        ctx.stroke();
        
        ctx.beginPath();
        ctx.arc(380, 300, 50, 0, Math.PI * 2);
        ctx.stroke();
        
        ctx.beginPath();
        ctx.arc(300, 400, 50, 0, Math.PI * 2);
        ctx.stroke();
        
        ctx.beginPath();
        ctx.arc(220, 300, 50, 0, Math.PI * 2);
        ctx.stroke();
        
        // Stem
        ctx.beginPath();
        ctx.moveTo(300, 360);
        ctx.lineTo(300, 500);
        ctx.stroke();
        
        // Leaves
        ctx.beginPath();
        ctx.ellipse(250, 420, 40, 20, Math.PI / 4, 0, Math.PI * 2);
        ctx.stroke();
        
        ctx.beginPath();
        ctx.ellipse(350, 420, 40, 20, -Math.PI / 4, 0, Math.PI * 2);
        ctx.stroke();
    }, []);

    const initCanvas = useCallback(() => {
        const canvas = canvasRef.current;
        if (!canvas) return;
        
        const ctx = canvas.getContext('2d');
        if (!ctx) return;
        
        // Set canvas size to 600px for good coloring experience
        canvas.width = 600;
        canvas.height = 600;
        
        // Draw the outline
        drawOutline(ctx);
    }, [drawOutline]);

    useEffect(() => {
        initCanvas();
    }, [initCanvas]);

    return (
        <div className="min-h-screen bg-gradient-to-br from-pink-100 via-purple-50 to-indigo-100 py-8">
            <div className="max-w-4xl mx-auto px-4">
                <div className="text-center mb-8">
                    <h1 className="text-4xl font-bold text-gray-800 mb-2">
                        🎨 {t('coloring.title')}
                    </h1>
                    <p className="text-gray-600">{t('coloring.subtitle')}</p>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
                    {/* Tools Panel */}
                    <div className="lg:col-span-1 bg-white rounded-xl p-6 shadow-lg">
                        <h2 className="text-lg font-semibold mb-4 text-gray-700">
                            {t('coloring.tools')}
                        </h2>
                        
                        {/* Color Palette */}
                        <div className="mb-6">
                            <label className="block text-sm font-medium text-gray-600 mb-2">
                                {t('coloring.colors')}
                            </label>
                            <div className="grid grid-cols-5 gap-2">
                                {COLOR_OPTIONS.map((colorOption) => (
                                    <button
                                        key={colorOption}
                                        onClick={() => setColor(colorOption)}
                                        className={`w-10 h-10 rounded-full border-2 transition-all ${
                                            color === colorOption ? 'border-gray-400 scale-110' : 'border-gray-200 hover:scale-105'
                                        }`}
                                        style={{ backgroundColor: colorOption }}
                                        title={colorOption}
                                    />
                                ))}
                            </div>
                        </div>

                        {/* Line Width */}
                        <div className="mb-6">
                            <label className="block text-sm font-medium text-gray-600 mb-2">
                                {t('coloring.lineWidth')}
                            </label>
                            <div className="flex gap-2">
                                {LINE_WIDTHS.map((width) => (
                                    <button
                                        key={width}
                                        onClick={() => setLineWidth(width)}
                                        className={`px-3 py-1 rounded-full text-sm font-medium transition-all ${
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

                        {/* Tools */}
                        <div className="mb-6">
                            <label className="block text-sm font-medium text-gray-600 mb-2">
                                {t('coloring.tools')}
                            </label>
                            <div className="flex gap-2">
                                <button
                                    onClick={() => setTool('pen')}
                                    className={`flex items-center gap-2 px-4 py-2 rounded-lg font-medium transition-all ${
                                        tool === 'pen'
                                            ? 'bg-blue-500 text-white'
                                            : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
                                    }`}
                                >
                                    <Paintbrush size={18} />
                                    {t('coloring.pen')}
                                </button>
                                <button
                                    onClick={() => setTool('eraser')}
                                    className={`flex items-center gap-2 px-4 py-2 rounded-lg font-medium transition-all ${
                                        tool === 'eraser'
                                            ? 'bg-red-500 text-white'
                                            : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
                                    }`}
                                >
                                    <Eraser size={18} />
                                    {t('coloring.eraser')}
                                </button>
                            </div>
                        </div>

                        {/* Actions */}
                        <div className="flex flex-col gap-3">
                            <button
                                onClick={clearCanvas}
                                className="flex items-center gap-2 px-4 py-2 bg-gray-500 text-white rounded-lg hover:bg-gray-600 transition-colors"
                            >
                                <RefreshCw size={18} />
                                {t('coloring.clear')}
                            </button>
                            <button
                                onClick={downloadImage}
                                className="flex items-center gap-2 px-4 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600 transition-colors"
                            >
                                <Download size={18} />
                                {t('coloring.download')}
                            </button>
                        </div>
                    </div>

                    {/* Canvas Area */}
                    <div className="lg:col-span-3 bg-white rounded-xl p-6 shadow-lg">
                        <div className="flex justify-between items-center mb-4">
                            <h2 className="text-lg font-semibold text-gray-700">
                                {t('coloring.canvas')}
                            </h2>
                            <div className="text-sm text-gray-500">
                                {tool === 'pen' ? t('coloring.currentColor') : t('coloring.eraserMode')}
                                {tool === 'pen' && (
                                    <span style={{ color }} className="ml-2 font-mono">
                                        {color}
                                    </span>
                                )}
                            </div>
                        </div>
                        
                        <div className="flex justify-center">
                        <canvas
                            ref={canvasRef}
                            onMouseDown={startDrawing}
                            onMouseMove={draw}
                            onMouseUp={stopDrawing}
                            onMouseLeave={stopDrawing}
                            className="border-2 border-gray-300 rounded-lg cursor-crosshair bg-white"
                            style={{ touchAction: 'none', width: '600px', height: '600px' }}
                        />
                        </div>
                        
                        <div className="mt-4 text-center text-sm text-gray-500">
                            {t('coloring.instructions')}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}