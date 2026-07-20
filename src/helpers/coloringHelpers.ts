export type ColoringImageItem = 'flower' | 'house' | 'car' | 'cat' | 'dog' | 'bird' | 'turtle' | 'bike' | 'blank';
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

export const drawOutline = (ctx: CanvasRenderingContext2D, imageType: ColoringImageItem) => {
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
        ctx.beginPath(); ctx.arc(300, 250, 70, 0, Math.PI * 2); ctx.stroke();
        ctx.beginPath(); ctx.moveTo(250, 200); ctx.lineTo(230, 120); ctx.lineTo(290, 180); ctx.stroke();
        ctx.beginPath(); ctx.moveTo(350, 200); ctx.lineTo(370, 120); ctx.lineTo(310, 180); ctx.stroke();
        ctx.beginPath(); ctx.arc(275, 240, 10, 0, Math.PI * 2); ctx.stroke();
        ctx.beginPath(); ctx.arc(325, 240, 10, 0, Math.PI * 2); ctx.stroke();
        ctx.beginPath(); ctx.moveTo(290, 260); ctx.lineTo(310, 260); ctx.lineTo(300, 270); ctx.closePath(); ctx.stroke();
        ctx.beginPath(); ctx.moveTo(300, 270); ctx.lineTo(290, 280); ctx.moveTo(300, 270); ctx.lineTo(310, 280); ctx.stroke();
        ctx.beginPath(); ctx.moveTo(260, 260); ctx.lineTo(210, 250); ctx.moveTo(260, 270); ctx.lineTo(200, 270); ctx.moveTo(260, 280); ctx.lineTo(210, 290); ctx.stroke();
        ctx.beginPath(); ctx.moveTo(340, 260); ctx.lineTo(390, 250); ctx.moveTo(340, 270); ctx.lineTo(400, 270); ctx.moveTo(340, 280); ctx.lineTo(390, 290); ctx.stroke();
        ctx.beginPath(); ctx.ellipse(300, 400, 80, 100, 0, 0, Math.PI * 2); ctx.stroke();
        ctx.beginPath(); ctx.moveTo(370, 450); ctx.quadraticCurveTo(450, 400, 420, 320); ctx.stroke();
        ctx.beginPath(); ctx.moveTo(260, 490); ctx.lineTo(260, 520); ctx.lineTo(280, 520); ctx.lineTo(280, 490); ctx.stroke();
        ctx.beginPath(); ctx.moveTo(320, 490); ctx.lineTo(320, 520); ctx.lineTo(340, 520); ctx.lineTo(340, 490); ctx.stroke();
    } else if (imageType === 'dog') {
        ctx.beginPath(); ctx.arc(300, 250, 70, 0, Math.PI * 2); ctx.stroke();
        ctx.beginPath(); ctx.ellipse(220, 250, 20, 60, -Math.PI/6, 0, Math.PI * 2); ctx.stroke();
        ctx.beginPath(); ctx.ellipse(380, 250, 20, 60, Math.PI/6, 0, Math.PI * 2); ctx.stroke();
        ctx.beginPath(); ctx.arc(275, 230, 8, 0, Math.PI * 2); ctx.stroke();
        ctx.beginPath(); ctx.arc(325, 230, 8, 0, Math.PI * 2); ctx.stroke();
        ctx.beginPath(); ctx.ellipse(300, 270, 40, 30, 0, 0, Math.PI * 2); ctx.fillStyle = '#FFFFFF'; ctx.fill(); ctx.stroke();
        ctx.beginPath(); ctx.arc(300, 260, 12, 0, Math.PI * 2); ctx.stroke();
        ctx.beginPath(); ctx.moveTo(300, 272); ctx.lineTo(300, 285); ctx.moveTo(300, 285); ctx.quadraticCurveTo(280, 290, 275, 280); ctx.moveTo(300, 285); ctx.quadraticCurveTo(320, 290, 325, 280); ctx.stroke();
        ctx.beginPath(); ctx.ellipse(300, 400, 70, 90, 0, 0, Math.PI * 2); ctx.stroke();
        ctx.beginPath(); ctx.moveTo(260, 480); ctx.lineTo(250, 530); ctx.lineTo(280, 530); ctx.lineTo(280, 485); ctx.stroke();
        ctx.beginPath(); ctx.moveTo(340, 480); ctx.lineTo(350, 530); ctx.lineTo(320, 530); ctx.lineTo(320, 485); ctx.stroke();
        ctx.beginPath(); ctx.moveTo(360, 450); ctx.quadraticCurveTo(420, 420, 430, 380); ctx.stroke();
    } else if (imageType === 'bird') {
        ctx.beginPath(); ctx.ellipse(300, 320, 90, 60, 0, 0, Math.PI * 2); ctx.stroke();
        ctx.beginPath(); ctx.arc(380, 260, 45, 0, Math.PI * 2); ctx.fillStyle = '#FFFFFF'; ctx.fill(); ctx.stroke();
        ctx.beginPath(); ctx.arc(395, 250, 6, 0, Math.PI * 2); ctx.stroke();
        ctx.beginPath(); ctx.moveTo(420, 255); ctx.lineTo(460, 265); ctx.lineTo(420, 275); ctx.closePath(); ctx.stroke();
        ctx.beginPath(); ctx.moveTo(280, 300); ctx.quadraticCurveTo(200, 280, 240, 380); ctx.quadraticCurveTo(300, 350, 280, 300); ctx.stroke();
        ctx.beginPath(); ctx.moveTo(215, 335); ctx.lineTo(130, 380); ctx.lineTo(160, 320); ctx.lineTo(130, 290); ctx.lineTo(215, 305); ctx.stroke();
        ctx.beginPath(); ctx.moveTo(280, 380); ctx.lineTo(280, 440); ctx.lineTo(260, 450); ctx.moveTo(280, 440); ctx.lineTo(290, 450); ctx.moveTo(280, 440); ctx.lineTo(280, 455); ctx.stroke();
        ctx.beginPath(); ctx.moveTo(320, 380); ctx.lineTo(320, 440); ctx.lineTo(300, 450); ctx.moveTo(320, 440); ctx.lineTo(330, 450); ctx.moveTo(320, 440); ctx.lineTo(320, 455); ctx.stroke();
    } else if (imageType === 'turtle') {
        ctx.beginPath(); ctx.arc(300, 350, 100, Math.PI, 0); ctx.closePath(); ctx.stroke();
        ctx.beginPath(); ctx.moveTo(240, 350); ctx.lineTo(250, 310); ctx.lineTo(290, 290); ctx.lineTo(330, 310); ctx.lineTo(340, 350); ctx.stroke();
        ctx.beginPath(); ctx.moveTo(250, 310); ctx.lineTo(220, 280); ctx.stroke();
        ctx.beginPath(); ctx.moveTo(290, 290); ctx.lineTo(300, 250); ctx.stroke();
        ctx.beginPath(); ctx.moveTo(330, 310); ctx.lineTo(370, 290); ctx.stroke();
        ctx.beginPath(); ctx.ellipse(430, 330, 40, 25, 0, 0, Math.PI * 2); ctx.stroke();
        ctx.beginPath(); ctx.arc(445, 320, 5, 0, Math.PI * 2); ctx.stroke();
        ctx.beginPath(); ctx.ellipse(230, 360, 30, 15, Math.PI/4, 0, Math.PI * 2); ctx.stroke();
        ctx.beginPath(); ctx.ellipse(370, 360, 30, 15, -Math.PI/4, 0, Math.PI * 2); ctx.stroke();
        ctx.beginPath(); ctx.moveTo(200, 350); ctx.lineTo(160, 340); ctx.lineTo(195, 330); ctx.stroke();
    } else if (imageType === 'bike') {
        ctx.beginPath(); ctx.arc(200, 400, 60, 0, Math.PI * 2); ctx.stroke();
        ctx.beginPath(); ctx.arc(400, 400, 60, 0, Math.PI * 2); ctx.stroke();
        ctx.beginPath(); ctx.arc(200, 400, 50, 0, Math.PI * 2); ctx.stroke();
        ctx.beginPath(); ctx.arc(400, 400, 50, 0, Math.PI * 2); ctx.stroke();
        ctx.beginPath(); ctx.moveTo(200, 400); ctx.lineTo(280, 400); ctx.lineTo(350, 300); ctx.lineTo(250, 300); ctx.closePath(); ctx.stroke();
        ctx.beginPath(); ctx.moveTo(400, 400); ctx.lineTo(340, 250); ctx.stroke();
        ctx.beginPath(); ctx.moveTo(340, 250); ctx.lineTo(320, 240); ctx.moveTo(340, 250); ctx.lineTo(370, 230); ctx.stroke();
        ctx.beginPath(); ctx.moveTo(280, 400); ctx.lineTo(240, 270); ctx.stroke();
        ctx.beginPath(); ctx.moveTo(220, 270); ctx.lineTo(260, 270); ctx.lineTo(270, 260); ctx.lineTo(210, 260); ctx.closePath(); ctx.stroke();
        ctx.beginPath(); ctx.arc(280, 400, 15, 0, Math.PI * 2); ctx.stroke();
        ctx.beginPath(); ctx.moveTo(280, 400); ctx.lineTo(280, 430); ctx.lineTo(295, 430); ctx.moveTo(280, 400); ctx.lineTo(280, 370); ctx.lineTo(265, 370); ctx.stroke();
    }
};

export { hexToRgb, floodFill };