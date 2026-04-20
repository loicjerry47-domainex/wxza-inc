import React, { useRef, useEffect } from 'react';
import { useConsciousness } from './consciousness';

/**
 * Ghost Memory — renders traces from previously visited chambers.
 * 
 * When you leave a chamber, particles from that space linger as
 * faint afterimages in the next chamber you enter. They slowly
 * fade, like memories dissolving.
 */

const chamberHues: Record<string, number> = {
  spanda: 185,
  codex: 160,
  genesis: 45,
  phase: 230,
};

export function GhostMemory() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const { state, liveRef, addGhostTraces } = useConsciousness();
  const lastChamberRef = useRef(state.currentChamber);
  const traceTimerRef = useRef(0);

  // When chamber changes, leave ghost traces behind
  useEffect(() => {
    if (state.currentChamber !== lastChamberRef.current) {
      const prevChamber = lastChamberRef.current;
      const hue = chamberHues[prevChamber] || 200;
      
      // Generate ghost traces from the previous chamber
      const traces: Array<{ x: number; y: number; hue: number; fromChamber: string; intensity: number }> = [];
      for (let i = 0; i < 12; i++) {
        traces.push({
          x: 0.2 + Math.random() * 0.6,
          y: 0.2 + Math.random() * 0.6,
          hue: hue + (Math.random() - 0.5) * 30,
          fromChamber: prevChamber,
          intensity: 0.3 + Math.random() * 0.4,
        });
      }
      
      // Add traces near where the mouse was
      if (state.mouseX > 0) {
        const nx = state.mouseX / window.innerWidth;
        const ny = state.mouseY / window.innerHeight;
        for (let i = 0; i < 8; i++) {
          traces.push({
            x: nx + (Math.random() - 0.5) * 0.15,
            y: ny + (Math.random() - 0.5) * 0.15,
            hue: hue + (Math.random() - 0.5) * 20,
            fromChamber: prevChamber,
            intensity: 0.4 + Math.random() * 0.4,
          });
        }
      }
      
      addGhostTraces(traces);
      lastChamberRef.current = state.currentChamber;
    }
  }, [state.currentChamber, state.mouseX, state.mouseY, addGhostTraces]);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animId: number;
    let t = 0;

    const resize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    resize();
    window.addEventListener('resize', resize);

    const animate = () => {
      t += 0.016;
      const s = liveRef.current;
      const { width, height } = canvas;

      // Clear
      ctx.clearRect(0, 0, width, height);

      const ghosts = s.ghostTraces;
      if (ghosts.length === 0) {
        animId = requestAnimationFrame(animate);
        return;
      }

      for (const ghost of ghosts) {
        const x = ghost.x * width;
        const y = ghost.y * height;
        const alpha = ghost.intensity * 0.3;
        
        if (alpha < 0.01) continue;

        // Drift animation
        const driftX = Math.sin(t * 0.5 + ghost.x * 10) * 5;
        const driftY = Math.cos(t * 0.3 + ghost.y * 10) * 5;
        const px = x + driftX;
        const py = y + driftY;

        // Ghost particle — soft, ethereal
        const size = 3 + ghost.intensity * 8;
        const grad = ctx.createRadialGradient(px, py, 0, px, py, size * 4);
        grad.addColorStop(0, `hsla(${ghost.hue}, 40%, 70%, ${alpha * 0.6})`);
        grad.addColorStop(0.3, `hsla(${ghost.hue}, 30%, 60%, ${alpha * 0.2})`);
        grad.addColorStop(1, `hsla(${ghost.hue}, 30%, 50%, 0)`);
        
        ctx.fillStyle = grad;
        ctx.beginPath();
        ctx.arc(px, py, size * 4, 0, Math.PI * 2);
        ctx.fill();

        // Tiny core
        ctx.fillStyle = `hsla(${ghost.hue}, 50%, 80%, ${alpha * 0.4})`;
        ctx.beginPath();
        ctx.arc(px, py, size * 0.5, 0, Math.PI * 2);
        ctx.fill();
      }

      // Decay ghosts over time
      traceTimerRef.current += 0.016;
      if (traceTimerRef.current > 0.5) {
        traceTimerRef.current = 0;
        // Ghosts decay in the consciousness state
        for (const ghost of ghosts) {
          ghost.intensity *= 0.97;
        }
      }

      animId = requestAnimationFrame(animate);
    };

    animId = requestAnimationFrame(animate);
    return () => {
      cancelAnimationFrame(animId);
      window.removeEventListener('resize', resize);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 z-[2] pointer-events-none"
      style={{ background: 'transparent', mixBlendMode: 'screen' }}
    />
  );
}