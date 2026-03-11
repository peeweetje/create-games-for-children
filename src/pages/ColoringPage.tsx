import { useState, useRef, useCallback, useEffect } from 'react';
import { Paintbrush, Eraser, Download, RefreshCw, PaintBucket, Image as ImageIcon } from 'lucide-react';
import { useTranslation } from 'react-i18next';

const COLOR_OPTIONS = [
    '#FF6B6B', '#4ECDC4', '#45B7D1', '#96CEB4', '#FFEAA7',
    '#DDA0DD', '#98D8C8', '#F7DC6F', '#BB8FCE', '#48aaeb',
    '#F8C471', '#82E0AA', '#F1948A', '#85C1E9', '#D7BDE2'
];

const LINE_WIDTHS = [2, 4, 8, 12];

type ColoringImageItem = 'flower' | 'house' | 'car' | 'cat' | 'dog' | 'bird' | 'turtle' | 'bike' | 'blank';
type ToolType = 'pen' | 'fill' | 'eraser';

const hexToRgb = (hex: string) => {
    const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
    return result ? { r: parseInt(result[1], 16), g: parseInt(result[2], 16), b: parseInt(result[3], 16), a: 255 } : null;
};

const floodFill = (ctx: CanvasRenderingContext2D, startX: number, startY: number, fillColorStr: string) => {
    const startXInt = Math.round(startX);
    const startYInt = Math.round(startY);
    
    const canvas = ctx.canvas;
    const width = canvas.width;
    const height = canvas.height;
    
    if (startXInt < 0 || startXInt >= width || startYInt < 0 || startYInt >= height) return;
    
    const imageData = ctx.getImageData(0, 0, width, height);
    const data = imageData.data;
    
    const targetPixelPos = (startYInt * width + startXInt) * 4;
    const startR = data[targetPixelPos];
    const startG = data[targetPixelPos + 1];
    const startB = data[targetPixelPos + 2];
    const startA = data[targetPixelPos + 3];
    
    const fillRgb = hexToRgb(fillColorStr);
    if (!fillRgb) return;
    const { r: fillR, g: fillG, b: fillB, a: fillA } = fillRgb;
    
    if (startR === fillR && startG === fillG && startB === fillB && startA === fillA) {
        return;
    }
    
    const isDarkOutline = (r: number, g: number, b: number, a: number) => {
        return r < 100 && g < 100 && b < 100 && a > 200;
    };
    if (isDarkOutline(startR, startG, startB, startA)) {
        return;
    }
    
    const tolerance = 60; 
    
    const colorMatch = (pos: number) => {
        const r = data[pos];
        const g = data[pos + 1];
        const b = data[pos + 2];
        const a = data[pos + 3];
        
        if (isDarkOutline(r, g, b, a)) {
            return false;
        }

        const dr = r - startR;
        const dg = g - startG;
        const db = b - startB;
        return (dr * dr + dg * dg + db * db) < tolerance * tolerance;
    };
    
    const colorPixel = (pos: number) => {
        data[pos] = fillR;
        data[pos + 1] = fillG;
        data[pos + 2] = fillB;
        data[pos + 3] = fillA;
    };
    
    const stack = [[startXInt, startYInt]];
    let iterations = 0;
    const maxIterations = width * height;
    
    while (stack.length > 0 && iterations < maxIterations) {
        iterations++;
        const [currX, currY] = stack.pop()!;
        
        let currYStart = currY;
        while (currYStart >= 0 && colorMatch(((currYStart * width) + currX) * 4)) {
            currYStart--;
        }
        currYStart++;
        
        let reachLeft = false;
        let reachRight = false;
        
        while (currYStart < height && colorMatch(((currYStart * width) + currX) * 4)) {
            const pos = ((currYStart * width) + currX) * 4;
            colorPixel(pos);
            
            if (currX > 0) {
                if (colorMatch(pos - 4)) {
                    if (!reachLeft) {
                        stack.push([currX - 1, currYStart]);
                        reachLeft = true;
                    }
                } else if (reachLeft) {
                    reachLeft = false;
                }
            }
            
            if (currX < width - 1) {
                if (colorMatch(pos + 4)) {
                    if (!reachRight) {
                        stack.push([currX + 1, currYStart]);
                        reachRight = true;
                    }
                } else if (reachRight) {
                    reachRight = false;
                }
            }
            currYStart++;
        }
    }
    
    ctx.putImageData(imageData, 0, 0);
};

export function ColoringPage() {
    const { t } = useTranslation();
    const canvasRef = useRef<HTMLCanvasElement>(null);
    const [isDrawing, setIsDrawing] = useState(false);
    const [color, setColor] = useState('#FF6B6B');
    const [lineWidth, setLineWidth] = useState(4);
    const [tool, setTool] = useState<ToolType>('fill');
    const [currentImage, setCurrentImage] = useState<ColoringImageItem>('flower');

    const drawOutline = useCallback((ctx: CanvasRenderingContext2D, imageType: ColoringImageItem) => {
        ctx.fillStyle = '#FFFFFF';
        ctx.fillRect(0, 0, ctx.canvas.width, ctx.canvas.height);

        ctx.lineWidth = 4;
        ctx.strokeStyle = '#000000';
        ctx.lineCap = 'round';
        ctx.lineJoin = 'round';
        ctx.globalCompositeOperation = 'source-over';
        
        if (imageType === 'flower') {
            ctx.beginPath(); ctx.arc(300, 300, 80, 0, Math.PI * 2); ctx.stroke();
            ctx.beginPath(); ctx.arc(300, 200, 50, 0, Math.PI * 2); ctx.stroke();
            ctx.beginPath(); ctx.arc(380, 300, 50, 0, Math.PI * 2); ctx.stroke();
            ctx.beginPath(); ctx.arc(300, 400, 50, 0, Math.PI * 2); ctx.stroke();
            ctx.beginPath(); ctx.arc(220, 300, 50, 0, Math.PI * 2); ctx.stroke();
            
            ctx.beginPath(); ctx.moveTo(300, 380); ctx.lineTo(300, 550); ctx.stroke();
            
            ctx.beginPath(); ctx.ellipse(230, 450, 60, 30, Math.PI / 4, 0, Math.PI * 2); ctx.stroke();
            ctx.beginPath(); ctx.ellipse(370, 450, 60, 30, -Math.PI / 4, 0, Math.PI * 2); ctx.stroke();
        } else if (imageType === 'house') {
            ctx.strokeRect(200, 300, 200, 200);
            
            ctx.beginPath(); ctx.moveTo(150, 300); ctx.lineTo(300, 150); ctx.lineTo(450, 300); ctx.closePath(); ctx.stroke();
            
            ctx.fillStyle = '#FFFFFF';
            ctx.fillRect(270, 400, 60, 100);
            ctx.strokeRect(270, 400, 60, 100);
            
            ctx.beginPath(); ctx.arc(320, 450, 5, 0, Math.PI * 2); ctx.stroke();
            
            ctx.fillStyle = '#FFFFFF';
            ctx.fillRect(220, 320, 50, 50);
            ctx.strokeRect(220, 320, 50, 50);
            ctx.fillRect(330, 320, 50, 50);
            ctx.strokeRect(330, 320, 50, 50);
            
            ctx.beginPath(); ctx.moveTo(245, 320); ctx.lineTo(245, 370); ctx.moveTo(220, 345); ctx.lineTo(270, 345);
            ctx.moveTo(355, 320); ctx.lineTo(355, 370); ctx.moveTo(330, 345); ctx.lineTo(380, 345); ctx.stroke();
            
            ctx.beginPath(); ctx.arc(100, 100, 50, 0, Math.PI * 2); ctx.stroke();
            ctx.beginPath(); ctx.moveTo(100, 20); ctx.lineTo(100, 40); ctx.moveTo(100, 160); ctx.lineTo(100, 180);
            ctx.moveTo(20, 100); ctx.lineTo(40, 100); ctx.moveTo(160, 100); ctx.lineTo(180, 100);
            ctx.moveTo(43, 43); ctx.lineTo(57, 57); ctx.moveTo(157, 157); ctx.lineTo(143, 143);
            ctx.moveTo(157, 43); ctx.lineTo(143, 57); ctx.moveTo(43, 157); ctx.lineTo(57, 143); ctx.stroke();
        } else if (imageType === 'car') {
            ctx.beginPath(); ctx.arc(200, 400, 50, 0, Math.PI * 2); ctx.stroke();
            ctx.beginPath(); ctx.arc(400, 400, 50, 0, Math.PI * 2); ctx.stroke();
            
            ctx.beginPath(); ctx.arc(200, 400, 20, 0, Math.PI * 2); ctx.stroke();
            ctx.beginPath(); ctx.arc(400, 400, 20, 0, Math.PI * 2); ctx.stroke();

            ctx.beginPath(); ctx.moveTo(100, 400); ctx.lineTo(150, 400); ctx.moveTo(250, 400); ctx.lineTo(350, 400);
            ctx.moveTo(450, 400); ctx.lineTo(500, 400); ctx.lineTo(500, 300); ctx.lineTo(420, 300); ctx.lineTo(350, 200);
            ctx.lineTo(200, 200); ctx.lineTo(120, 300); ctx.lineTo(100, 320); ctx.closePath(); ctx.stroke();
            
            ctx.beginPath(); ctx.moveTo(210, 210); ctx.lineTo(340, 210); ctx.lineTo(400, 290); ctx.lineTo(290, 290); ctx.closePath(); ctx.stroke();
            ctx.beginPath(); ctx.moveTo(200, 210); ctx.lineTo(140, 300); ctx.lineTo(280, 300); ctx.lineTo(280, 210); ctx.closePath(); ctx.stroke();
            
            ctx.beginPath(); ctx.moveTo(285, 300); ctx.lineTo(285, 400); ctx.stroke();
        } else if (imageType === 'cat') {
            // Head
            ctx.beginPath(); ctx.arc(300, 250, 70, 0, Math.PI * 2); ctx.stroke();
            // Ears
            ctx.beginPath(); ctx.moveTo(250, 200); ctx.lineTo(230, 120); ctx.lineTo(290, 180); ctx.stroke();
            ctx.beginPath(); ctx.moveTo(350, 200); ctx.lineTo(370, 120); ctx.lineTo(310, 180); ctx.stroke();
            // Eyes
            ctx.beginPath(); ctx.arc(275, 240, 10, 0, Math.PI * 2); ctx.stroke();
            ctx.beginPath(); ctx.arc(325, 240, 10, 0, Math.PI * 2); ctx.stroke();
            // Nose and Mouth
            ctx.beginPath(); ctx.moveTo(290, 260); ctx.lineTo(310, 260); ctx.lineTo(300, 270); ctx.closePath(); ctx.stroke();
            ctx.beginPath(); ctx.moveTo(300, 270); ctx.lineTo(290, 280); ctx.moveTo(300, 270); ctx.lineTo(310, 280); ctx.stroke();
            // Whiskers
            ctx.beginPath(); ctx.moveTo(260, 260); ctx.lineTo(210, 250); ctx.moveTo(260, 270); ctx.lineTo(200, 270); ctx.moveTo(260, 280); ctx.lineTo(210, 290); ctx.stroke();
            ctx.beginPath(); ctx.moveTo(340, 260); ctx.lineTo(390, 250); ctx.moveTo(340, 270); ctx.lineTo(400, 270); ctx.moveTo(340, 280); ctx.lineTo(390, 290); ctx.stroke();
            // Body
            ctx.beginPath(); ctx.ellipse(300, 400, 80, 100, 0, 0, Math.PI * 2); ctx.stroke();
            // Tail
            ctx.beginPath(); ctx.moveTo(370, 450); ctx.quadraticCurveTo(450, 400, 420, 320); ctx.stroke();
            // Legs
            ctx.beginPath(); ctx.moveTo(260, 490); ctx.lineTo(260, 520); ctx.lineTo(280, 520); ctx.lineTo(280, 490); ctx.stroke();
            ctx.beginPath(); ctx.moveTo(320, 490); ctx.lineTo(320, 520); ctx.lineTo(340, 520); ctx.lineTo(340, 490); ctx.stroke();
        } else if (imageType === 'dog') {
            // Head
            ctx.beginPath(); ctx.arc(300, 250, 70, 0, Math.PI * 2); ctx.stroke();
            // Ears
            ctx.beginPath(); ctx.ellipse(220, 250, 20, 60, -Math.PI/6, 0, Math.PI * 2); ctx.stroke();
            ctx.beginPath(); ctx.ellipse(380, 250, 20, 60, Math.PI/6, 0, Math.PI * 2); ctx.stroke();
            // Eyes
            ctx.beginPath(); ctx.arc(275, 230, 8, 0, Math.PI * 2); ctx.stroke();
            ctx.beginPath(); ctx.arc(325, 230, 8, 0, Math.PI * 2); ctx.stroke();
            // Snout/Nose
            ctx.beginPath(); ctx.ellipse(300, 270, 40, 30, 0, 0, Math.PI * 2); ctx.fillStyle = '#FFFFFF'; ctx.fill(); ctx.stroke();
            ctx.beginPath(); ctx.arc(300, 260, 12, 0, Math.PI * 2); ctx.stroke();
            // Mouth
            ctx.beginPath(); ctx.moveTo(300, 272); ctx.lineTo(300, 285); ctx.moveTo(300, 285); ctx.quadraticCurveTo(280, 290, 275, 280); ctx.moveTo(300, 285); ctx.quadraticCurveTo(320, 290, 325, 280); ctx.stroke();
            // Body
            ctx.beginPath(); ctx.ellipse(300, 400, 70, 90, 0, 0, Math.PI * 2); ctx.stroke();
            // Legs
            ctx.beginPath(); ctx.moveTo(260, 480); ctx.lineTo(250, 530); ctx.lineTo(280, 530); ctx.lineTo(280, 485); ctx.stroke();
            ctx.beginPath(); ctx.moveTo(340, 480); ctx.lineTo(350, 530); ctx.lineTo(320, 530); ctx.lineTo(320, 485); ctx.stroke();
            // Tail
            ctx.beginPath(); ctx.moveTo(360, 450); ctx.quadraticCurveTo(420, 420, 430, 380); ctx.stroke();
        } else if (imageType === 'bird') {
            // Body
            ctx.beginPath(); ctx.ellipse(300, 320, 90, 60, 0, 0, Math.PI * 2); ctx.stroke();
            // Head
            ctx.beginPath(); ctx.arc(380, 260, 45, 0, Math.PI * 2); ctx.fillStyle = '#FFFFFF'; ctx.fill(); ctx.stroke();
            // Eye
            ctx.beginPath(); ctx.arc(395, 250, 6, 0, Math.PI * 2); ctx.stroke();
            // Beak
            ctx.beginPath(); ctx.moveTo(420, 255); ctx.lineTo(460, 265); ctx.lineTo(420, 275); ctx.closePath(); ctx.stroke();
            // Wing
            ctx.beginPath(); ctx.moveTo(280, 300); ctx.quadraticCurveTo(200, 280, 240, 380); ctx.quadraticCurveTo(300, 350, 280, 300); ctx.stroke();
            // Tail
            ctx.beginPath(); ctx.moveTo(215, 335); ctx.lineTo(130, 380); ctx.lineTo(160, 320); ctx.lineTo(130, 290); ctx.lineTo(215, 305); ctx.stroke();
            // Legs
            ctx.beginPath(); ctx.moveTo(280, 380); ctx.lineTo(280, 440); ctx.lineTo(260, 450); ctx.moveTo(280, 440); ctx.lineTo(290, 450); ctx.moveTo(280, 440); ctx.lineTo(280, 455); ctx.stroke();
            ctx.beginPath(); ctx.moveTo(320, 380); ctx.lineTo(320, 440); ctx.lineTo(300, 450); ctx.moveTo(320, 440); ctx.lineTo(330, 450); ctx.moveTo(320, 440); ctx.lineTo(320, 455); ctx.stroke();
        } else if (imageType === 'turtle') {
            // Shell
            ctx.beginPath(); ctx.arc(300, 350, 100, Math.PI, 0); ctx.closePath(); ctx.stroke();
            // Shell patterns
            ctx.beginPath(); ctx.moveTo(240, 350); ctx.lineTo(250, 310); ctx.lineTo(290, 290); ctx.lineTo(330, 310); ctx.lineTo(340, 350); ctx.stroke();
            ctx.beginPath(); ctx.moveTo(250, 310); ctx.lineTo(220, 280); ctx.stroke();
            ctx.beginPath(); ctx.moveTo(290, 290); ctx.lineTo(300, 250); ctx.stroke();
            ctx.beginPath(); ctx.moveTo(330, 310); ctx.lineTo(370, 290); ctx.stroke();
            // Head
            ctx.beginPath(); ctx.ellipse(430, 330, 40, 25, 0, 0, Math.PI * 2); ctx.stroke();
            // Eye
            ctx.beginPath(); ctx.arc(445, 320, 5, 0, Math.PI * 2); ctx.stroke();
            // Legs
            ctx.beginPath(); ctx.ellipse(230, 360, 30, 15, Math.PI/4, 0, Math.PI * 2); ctx.stroke();
            ctx.beginPath(); ctx.ellipse(370, 360, 30, 15, -Math.PI/4, 0, Math.PI * 2); ctx.stroke();
            // Tail
            ctx.beginPath(); ctx.moveTo(200, 350); ctx.lineTo(160, 340); ctx.lineTo(195, 330); ctx.stroke();
        } else if (imageType === 'bike') {
            // Wheels
            ctx.beginPath(); ctx.arc(200, 400, 60, 0, Math.PI * 2); ctx.stroke();
            ctx.beginPath(); ctx.arc(400, 400, 60, 0, Math.PI * 2); ctx.stroke();
            // Inner wheels
            ctx.beginPath(); ctx.arc(200, 400, 50, 0, Math.PI * 2); ctx.stroke();
            ctx.beginPath(); ctx.arc(400, 400, 50, 0, Math.PI * 2); ctx.stroke();
            // Frame
            ctx.beginPath(); ctx.moveTo(200, 400); ctx.lineTo(280, 400); ctx.lineTo(350, 300); ctx.lineTo(250, 300); ctx.closePath(); ctx.stroke();
            // Front fork
            ctx.beginPath(); ctx.moveTo(400, 400); ctx.lineTo(340, 250); ctx.stroke();
            // Handlebars
            ctx.beginPath(); ctx.moveTo(340, 250); ctx.lineTo(320, 240); ctx.moveTo(340, 250); ctx.lineTo(370, 230); ctx.stroke();
            // Seat tube
            ctx.beginPath(); ctx.moveTo(280, 400); ctx.lineTo(240, 270); ctx.stroke();
            // Seat
            ctx.beginPath(); ctx.moveTo(220, 270); ctx.lineTo(260, 270); ctx.lineTo(270, 260); ctx.lineTo(210, 260); ctx.closePath(); ctx.stroke();
            // Pedals
            ctx.beginPath(); ctx.arc(280, 400, 15, 0, Math.PI * 2); ctx.stroke();
            ctx.beginPath(); ctx.moveTo(280, 400); ctx.lineTo(280, 430); ctx.lineTo(295, 430); ctx.moveTo(280, 400); ctx.lineTo(280, 370); ctx.lineTo(265, 370); ctx.stroke();
        }
    }, []);

    const initCanvas = useCallback(() => {
        const canvas = canvasRef.current;
        if (!canvas) return;
        const ctx = canvas.getContext('2d', { willReadFrequently: true });
        if (!ctx) return;
        
        canvas.width = 600;
        canvas.height = 600;
        
        drawOutline(ctx, currentImage);
    }, [drawOutline, currentImage]);

    useEffect(() => {
        initCanvas();
    }, [initCanvas]);

    // Extracted helper logic to get relative x/y coordinates
    const getCoordinates = (e: React.MouseEvent<HTMLCanvasElement> | React.TouchEvent<HTMLCanvasElement>) => {
        const canvas = canvasRef.current;
        if (!canvas) return { x: 0, y: 0 };
        const rect = canvas.getBoundingClientRect();
        const scaleX = canvas.width / rect.width;
        const scaleY = canvas.height / rect.height;
        
        let clientX, clientY;
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
        if ('touches' in e) e.preventDefault(); // prevent scrolling
        const canvas = canvasRef.current;
        if (!canvas) return;
        const ctx = canvas.getContext('2d', { willReadFrequently: true });
        if (!ctx) return;
        
        const { x, y } = getCoordinates(e);
        
        if (tool === 'fill') {
            floodFill(ctx, x, y, color);
            return;
        }

        setIsDrawing(true);
        ctx.beginPath();
        ctx.moveTo(x, y);
    }, [tool, color]);

    const draw = useCallback((e: React.MouseEvent<HTMLCanvasElement> | React.TouchEvent<HTMLCanvasElement>) => {
        if (!isDrawing || tool === 'fill') return;
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
            // ctx.globalCompositeOperation = 'destination-out';
            ctx.globalCompositeOperation = 'source-over';
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
        const ctx = canvas.getContext('2d', { willReadFrequently: true });
        if (!ctx) return;
        
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        drawOutline(ctx, currentImage);
    }, [drawOutline, currentImage]);

    const downloadImage = useCallback(() => {
        const canvas = canvasRef.current;
        if (!canvas) return;
        const link = document.createElement('a');
        link.download = 'my-coloring.png';
        link.href = canvas.toDataURL();
        link.click();
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
                    {/* Tools Panel */}
                    <div className="lg:col-span-1 bg-white rounded-xl p-4 shadow-lg flex flex-col gap-4">
                        
                        {/* Pages */}
                        <div>
                            <label className="block text-sm font-medium text-gray-600 mb-2">
                                {t('coloring.pages', { defaultValue: 'Pages' })}
                            </label>
                            <div className="grid grid-cols-3 gap-1.5">
                                {(['flower', 'house', 'car', 'cat', 'dog', 'bird', 'turtle', 'bike', 'blank'] as const).map(img => (
                                    <button
                                        key={img}
                                        onClick={() => setCurrentImage(img)}
                                        className={`flex flex-col items-center justify-center p-1.5 rounded-lg border-2 transition-all ${
                                            currentImage === img ? 'border-purple-500 bg-purple-50' : 'border-gray-200 hover:border-purple-300'
                                        }`}
                                    >
                                        <ImageIcon size={20} className="mb-1 text-gray-600" />
                                        <span className="text-xs uppercase font-medium text-gray-600">
                                            {t(`coloring.${img}`, { defaultValue: img })}
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
                                        onClick={() => setColor(colorOption)}
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
                                    onClick={() => setTool('fill')}
                                    className={`flex items-center gap-2 px-3 py-1.5 rounded-lg font-medium transition-all ${
                                        tool === 'fill' ? 'bg-purple-500 text-white' : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                                    }`}
                                >
                                    <PaintBucket size={18} />
                                    {t('coloring.fill', { defaultValue: 'Fill Bucket' })}
                                </button>
                                <button
                                    onClick={() => setTool('pen')}
                                    className={`flex items-center gap-2 px-3 py-1.5 rounded-lg font-medium transition-all ${
                                        tool === 'pen' ? 'bg-blue-500 text-white' : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                                    }`}
                                >
                                    <Paintbrush size={18} />
                                    {t('coloring.pen', { defaultValue: 'Pen' })}
                                </button>
                                <button
                                    onClick={() => setTool('eraser')}
                                    className={`flex items-center gap-2 px-3 py-1.5 rounded-lg font-medium transition-all ${
                                        tool === 'eraser' ? 'bg-red-500 text-white' : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                                    }`}
                                >
                                    <Eraser size={18} />
                                    {t('coloring.eraser', { defaultValue: 'Eraser' })}
                                </button>
                            </div>
                        </div>

                        {/* Line Width (only show if pen or eraser) */}
                        {tool !== 'fill' && (
                            <div>
                                <label className="block text-sm font-medium text-gray-600 mb-2">
                                    {t('coloring.lineWidth', { defaultValue: 'Line Width' })}
                                </label>
                                <div className="grid grid-cols-4 gap-1">
                                    {LINE_WIDTHS.map((width) => (
                                        <button
                                            key={width}
                                            onClick={() => setLineWidth(width)}
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
                                onClick={clearCanvas}
                                className="flex items-center justify-center gap-1.5 px-2 py-1 bg-gray-500 text-white rounded-md text-sm hover:bg-gray-600 transition-colors"
                            >
                                <RefreshCw size={14} />
                                {t('coloring.clear', { defaultValue: 'Clear' })}
                            </button>
                            <button
                                onClick={downloadImage}
                                className="flex items-center justify-center gap-1.5 px-2 py-1 bg-green-500 text-white rounded-md text-sm hover:bg-green-600 transition-colors"
                            >
                                <Download size={14} />
                                {t('coloring.download', { defaultValue: 'Download' })}
                            </button>
                        </div>
                    </div>

                    {/* Canvas Area */}
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
                </div>
            </div>
        </div>
    );
}