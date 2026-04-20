import { useEffect, useRef } from 'react';
import { CANVAS } from '../../utils/animationConfig';

export function BreathingTileBackground() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const offscreenCanvasRef = useRef<HTMLCanvasElement | null>(null);
  const timeRef = useRef(0);
  const frameCountRef = useRef(0);
  
  // Configuration from centralized animation config
  const TILE_SIZE = CANVAS.tile.baseSize; 
  const TILE_GAP = CANVAS.tile.gap;
  const RADIUS_TILES = CANVAS.tile.radiusInfluence;
  const MAX_DISTANCE = CANVAS.interaction.maxDistance;
  
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d', { alpha: false }); 
    if (!ctx) return;

    let rafId: number;
    let mouseX = -1000;
    let mouseY = -1000;
    let prevMouseX = -1000;
    let prevMouseY = -1000;
    
    // Create offscreen canvas for the static grid
    if (!offscreenCanvasRef.current) {
      offscreenCanvasRef.current = document.createElement('canvas');
    }
    const offscreenCtx = offscreenCanvasRef.current.getContext('2d', { alpha: false });

    // Helper to get breathing wave effect
    const getBreathingWave = (x: number, y: number, time: number): number => {
      const waveX = Math.sin(x * CANVAS.breathing.frequency + time * CANVAS.breathing.waveSpeed) * CANVAS.breathing.amplitude;
      const waveY = Math.cos(y * CANVAS.breathing.frequency + time * CANVAS.breathing.waveSpeed * 0.8) * CANVAS.breathing.amplitude;
      return (waveX + waveY) * 0.5;
    };

    // Helper to get dynamic color based on position and time
    const getDynamicColor = (x: number, y: number, time: number, baseOpacity: number): string => {
      const wave = getBreathingWave(x, y, time);
      const hueShift = Math.sin(time * CANVAS.color.pulseSpeed + x * 0.01) * 20;
      const hue = 200 + hueShift; // Cyan to blue range
      const saturation = 70 + wave * 30;
      const lightness = 50 + wave * 10;
      return `hsla(${hue}, ${saturation}%, ${lightness}%, ${baseOpacity + wave * 0.1})`;
    };

    // Helper to draw a single tile with breathing effect
    const drawTile = (
      targetCtx: CanvasRenderingContext2D, 
      x: number, 
      y: number, 
      width: number, 
      height: number, 
      opacity: number,
      borderOpacity: number,
      time: number = 0,
      breathing: boolean = false
    ) => {
      const radius = CANVAS.tile.radius; 

      // Apply breathing scale
      let finalWidth = width;
      let finalHeight = height;
      let finalX = x;
      let finalY = y;
      
      if (breathing) {
        const breathScale = 1 + getBreathingWave(x, y, time) * 0.5;
        finalWidth = width * breathScale;
        finalHeight = height * breathScale;
        finalX = x - (finalWidth - width) / 2;
        finalY = y - (finalHeight - height) / 2;
      }

      targetCtx.beginPath();
      if (typeof targetCtx.roundRect === 'function') {
         targetCtx.roundRect(finalX, finalY, finalWidth, finalHeight, radius);
      } else {
        // Fallback for older browsers
        targetCtx.moveTo(finalX + radius, finalY);
        targetCtx.lineTo(finalX + finalWidth - radius, finalY);
        targetCtx.quadraticCurveTo(finalX + finalWidth, finalY, finalX + finalWidth, finalY + radius);
        targetCtx.lineTo(finalX + finalWidth, finalY + finalHeight - radius);
        targetCtx.quadraticCurveTo(finalX + finalWidth, finalY + finalHeight, finalX + finalWidth - radius, finalY + finalHeight);
        targetCtx.lineTo(finalX + radius, finalY + finalHeight);
        targetCtx.quadraticCurveTo(finalX, finalY + finalHeight, finalX, finalY + finalHeight - radius);
        targetCtx.lineTo(finalX, finalY + radius);
        targetCtx.quadraticCurveTo(finalX, finalY, finalX + radius, finalY);
      }
      
      const cx = finalX + finalWidth * 0.4;
      const cy = finalY + finalHeight * 0.4;
      const grad = targetCtx.createRadialGradient(cx, cy, 0, cx, cy, finalWidth * 0.8);
      
      if (breathing) {
        // Dynamic color for breathing tiles
        const color1 = getDynamicColor(x, y, time, opacity * 0.6);
        const color2 = getDynamicColor(x, y, time + 100, opacity * 0.3);
        grad.addColorStop(0, color1); 
        grad.addColorStop(0.4, color2); 
        grad.addColorStop(1, 'rgba(0, 0, 0, 0)'); 
      } else {
        grad.addColorStop(0, `rgba(14, 165, 233, ${opacity * 0.5})`); 
        grad.addColorStop(0.4, `rgba(56, 189, 248, ${opacity * 0.2})`); 
        grad.addColorStop(1, 'rgba(0, 0, 0, 0)'); 
      }

      targetCtx.fillStyle = grad;
      targetCtx.fill();

      // Border with breathing glow
      const glowIntensity = breathing ? borderOpacity * (1.5 + getBreathingWave(x, y, time) * 0.5) : borderOpacity;
      targetCtx.strokeStyle = `rgba(125, 211, 252, ${glowIntensity})`;
      targetCtx.lineWidth = breathing ? 1.5 : 1;
      targetCtx.stroke();
    };

    const handleResize = () => {
      if (!canvas || !offscreenCanvasRef.current || !offscreenCtx) return;

      const width = window.innerWidth;
      const height = window.innerHeight;

      // Prevent 0x0 canvas errors
      if (width === 0 || height === 0) return;

      canvas.width = width;
      canvas.height = height;

      offscreenCanvasRef.current.width = width;
      offscreenCanvasRef.current.height = height;

      // 1. Draw Background
      offscreenCtx.fillStyle = '#000000';
      offscreenCtx.fillRect(0, 0, width, height);

      // 2. Draw Static Grid
      const cols = Math.ceil(width / TILE_SIZE) + 1;
      const rows = Math.ceil(height / TILE_SIZE) + 1;

      for (let r = 0; r < rows; r++) {
        for (let c = 0; c < cols; c++) {
          const x = c * TILE_SIZE;
          const y = r * TILE_SIZE;
          const w = TILE_SIZE - TILE_GAP;
          const h = TILE_SIZE - TILE_GAP;
          
          drawTile(offscreenCtx, x, y, w, h, CANVAS.color.baseOpacity, 0.05);
        }
      }
      
      ctx.drawImage(offscreenCanvasRef.current, 0, 0);
    };

    const restoreRect = (x: number, y: number) => {
      if (!offscreenCanvasRef.current) return;
      const width = canvas.width;
      const height = canvas.height;
      
      const dirtyRadius = (RADIUS_TILES + 1) * TILE_SIZE;
      const dirtyX = Math.max(0, x - dirtyRadius);
      const dirtyY = Math.max(0, y - dirtyRadius);
      const dirtyW = Math.min(width - dirtyX, dirtyRadius * 2);
      const dirtyH = Math.min(height - dirtyY, dirtyRadius * 2);

      ctx.drawImage(
        offscreenCanvasRef.current, 
        dirtyX, dirtyY, dirtyW, dirtyH, 
        dirtyX, dirtyY, dirtyW, dirtyH  
      );
      
      return { dirtyX, dirtyY, dirtyW, dirtyH };
    };

    const render = () => {
      if (!canvas || !offscreenCanvasRef.current || !offscreenCtx) return;
      
      // Increment time for animations
      timeRef.current += 16; // ~60fps
      frameCountRef.current++;
      
      // Optimization: If mouse hasn't moved, only update breathing every few frames
      const shouldUpdateBreathing = frameCountRef.current % 3 === 0;
      
      if (mouseX === prevMouseX && mouseY === prevMouseY && !shouldUpdateBreathing) {
        rafId = requestAnimationFrame(render);
        return;
      }

      // 1. Clean up PREVIOUS dirty area to erase old active tiles
      if (prevMouseX > -500) {
         restoreRect(prevMouseX, prevMouseY);
      }

      // 2. Clean up CURRENT dirty area (in case it doesn't overlap with previous)
      // and prepare for drawing new active tiles.
      const currentRect = restoreRect(mouseX, mouseY);
      
      prevMouseX = mouseX;
      prevMouseY = mouseY;

      if (!currentRect) {
         rafId = requestAnimationFrame(render);
         return;
      }

      // If mouse is off-screen, just stop here (we already cleaned up)
      if (mouseX < -100 || mouseY < -100) {
        rafId = requestAnimationFrame(render);
        return;
      }

      // 3. Draw Active Tiles with breathing animation
      const { dirtyX, dirtyW, dirtyY, dirtyH } = currentRect;
      
      const startCol = Math.floor(dirtyX / TILE_SIZE);
      const endCol = Math.ceil((dirtyX + dirtyW) / TILE_SIZE);
      const startRow = Math.floor(dirtyY / TILE_SIZE);
      const endRow = Math.ceil((dirtyY + dirtyH) / TILE_SIZE);

      for (let r = startRow; r < endRow; r++) {
        for (let c = startCol; c < endCol; c++) {
          const tileX = c * TILE_SIZE;
          const tileY = r * TILE_SIZE;
          const centerX = tileX + TILE_SIZE / 2;
          const centerY = tileY + TILE_SIZE / 2;

          const dx = mouseX - centerX;
          const dy = mouseY - centerY;
          const dist = Math.sqrt(dx * dx + dy * dy);

          if (dist < MAX_DISTANCE) {
            // "Erase" static tile underneath
            ctx.fillStyle = '#000000'; 
            ctx.fillRect(tileX - 1, tileY - 1, TILE_SIZE + 2, TILE_SIZE + 2); 

            const intensity = 1 - Math.min(1, dist / MAX_DISTANCE);
            const lift = intensity * CANVAS.interaction.liftIntensity; 
            
            let shiftX = 0;
            let shiftY = 0;
            if (dist > 0) {
              shiftX = -(dx / dist) * intensity * CANVAS.interaction.shiftIntensity; 
              shiftY = -(dy / dist) * intensity * CANVAS.interaction.shiftIntensity;
            }

            const w = TILE_SIZE - TILE_GAP;
            const h = TILE_SIZE - TILE_GAP;
            
            const currentW = w + lift;
            const currentH = h + lift;
            const currentX = tileX + shiftX - (lift / 2);
            const currentY = tileY + shiftY - (lift / 2);

            drawTile(
              ctx, 
              currentX, 
              currentY, 
              currentW, 
              currentH, 
              0.3 + (intensity * 0.3), 
              0.1 + (intensity * 0.3),
              timeRef.current,
              true // Enable breathing
            );
          }
        }
      }

      rafId = requestAnimationFrame(render);
    };

    const onMouseMove = (e: MouseEvent) => {
      mouseX = e.clientX;
      mouseY = e.clientY;
    };

    window.addEventListener('resize', handleResize);
    window.addEventListener('mousemove', onMouseMove, { passive: true });
    
    handleResize();
    render();

    return () => {
      window.removeEventListener('resize', handleResize);
      window.removeEventListener('mousemove', onMouseMove);
      cancelAnimationFrame(rafId);
    };
  }, []);

  return (
    <div className="fixed inset-0 z-0 bg-black pointer-events-none">
      <canvas 
        ref={canvasRef}
        className="w-full h-full block"
      />
      <div 
        className="absolute inset-0" 
        style={{
          background: 'radial-gradient(ellipse at center, transparent 0%, transparent 40%, rgba(0, 0, 0, 0.4) 70%, rgba(0, 0, 0, 0.8) 100%)'
        }}
      />
      <div className="absolute inset-0 bg-gradient-to-b from-black/30 via-transparent to-black/30" />
    </div>
  );
}