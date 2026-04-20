
import React, { useEffect, useRef } from 'react';

export const InfinityParticle: React.FC<{ className?: string }> = ({ className }) => {
    const canvasRef = useRef<HTMLCanvasElement>(null);

    useEffect(() => {
        const canvas = canvasRef.current;
        if (!canvas) return;
        const ctx = canvas.getContext('2d');
        if (!ctx) return;

        let t = 0;
        const speed = 0.08;
        const width = canvas.width;
        const height = canvas.height;
        const cx = width / 2;
        const cy = height / 2;
        const scaleX = (width / 2) - 4; // Padding
        const scaleY = (height / 2) - 4;

        const animate = () => {
            // Create fading trails on transparent background
            ctx.globalCompositeOperation = 'destination-out';
            ctx.fillStyle = 'rgba(0, 0, 0, 0.15)';
            ctx.fillRect(0, 0, width, height);
            
            ctx.globalCompositeOperation = 'source-over';

            t += speed;

            // Lemniscate of Gerono (Figure 8)
            // x = cos(t)
            // y = sin(t) * cos(t) = sin(2t) / 2
            const x = cx + scaleX * Math.cos(t);
            const y = cy + scaleY * Math.sin(t) * Math.cos(t);

            // Draw Particle
            ctx.beginPath();
            ctx.arc(x, y, 1.5, 0, Math.PI * 2);
            ctx.fillStyle = '#60a5fa'; // blue-400
            ctx.fill();
            
            // Glow
            ctx.shadowBlur = 4;
            ctx.shadowColor = '#3b82f6'; // blue-500
            ctx.fill();
            ctx.shadowBlur = 0;

            requestAnimationFrame(animate);
        };
        
        const animationId = requestAnimationFrame(animate);
        return () => cancelAnimationFrame(animationId);
    }, []);

    return <canvas ref={canvasRef} width={40} height={16} className={className} />;
};
