export type ColoringImageItem = 'blank' | 'snake' | 'dragon' | 'deer' | 'cat';
export type ToolType = 'pen' | 'fill' | 'eraser';

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

const loadedImagesCache = new Map<string, HTMLImageElement>();

const loadImage = (src: string): Promise<HTMLImageElement> => {
    return new Promise((resolve, reject) => {
        const cached = loadedImagesCache.get(src);
        if (cached) {
            resolve(cached);
            return;
        }
        const img = new Image();
        img.onload = () => {
            loadedImagesCache.set(src, img);
            resolve(img);
        };
        img.onerror = (e) => {
            console.error('Failed to load image:', src, e);
            reject(new Error(`Failed to load image: ${src}`));
        };
        img.src = src;
    });
};

const drawImageOnCanvas = async (ctx: CanvasRenderingContext2D, imageName: string) => {
    try {
        const img = await loadImage(`${import.meta.env.BASE_URL}${imageName}`);
        const canvasWidth = ctx.canvas.width;
        const canvasHeight = ctx.canvas.height;
        const imgAspect = img.width / img.height;
        const canvasAspect = canvasWidth / canvasHeight;
        
        let drawWidth: number, drawHeight: number;
        if (imgAspect > canvasAspect) {
            drawWidth = canvasWidth;
            drawHeight = canvasWidth / imgAspect;
        } else {
            drawHeight = canvasHeight;
            drawWidth = canvasHeight * imgAspect;
        }
        
        const offsetX = (canvasWidth - drawWidth) / 2;
        const offsetY = (canvasHeight - drawHeight) / 2;
        
        ctx.fillStyle = '#FFFFFF';
        ctx.fillRect(0, 0, canvasWidth, canvasHeight);
        ctx.drawImage(img, offsetX, offsetY, drawWidth, drawHeight);
    } catch (e) {
        ctx.fillStyle = '#FFFFFF';
        ctx.fillRect(0, 0, ctx.canvas.width, ctx.canvas.height);
        ctx.strokeStyle = '#000000';
        ctx.lineWidth = 4;
        ctx.strokeRect(50, 50, ctx.canvas.width - 100, ctx.canvas.height - 100);
        ctx.font = '24px sans-serif';
        ctx.fillStyle = '#000000';
        ctx.textAlign = 'center';
        ctx.fillText(`Could not load ${imageName}`, ctx.canvas.width / 2, ctx.canvas.height / 2);
    }
};

export const drawOutline = async (ctx: CanvasRenderingContext2D, imageType: ColoringImageItem) => {
    ctx.fillStyle = '#FFFFFF';
    ctx.fillRect(0, 0, ctx.canvas.width, ctx.canvas.height);

    if (imageType === 'snake') {
        await drawImageOnCanvas(ctx, 'snake.jpg');
        return;
    }
    if (imageType === 'dragon') {
        await drawImageOnCanvas(ctx, 'dragon.jpg');
        return;
    }
    if (imageType === 'deer') {
        await drawImageOnCanvas(ctx, 'deer.jpg');
        return;
    }
    if (imageType === 'cat') {
        await drawImageOnCanvas(ctx, 'cat.jpg');
        return;
    }
};

export { hexToRgb, floodFill };