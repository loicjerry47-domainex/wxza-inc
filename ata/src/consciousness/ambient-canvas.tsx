import React, { useRef, useEffect } from 'react';
import { useConsciousness } from './consciousness';

/**
 * The ambient nervous system — a persistent canvas that lives behind all views.
 * It breathes, responds to the consciousness state, and subtly shifts
 * based on which chamber you're in.
 */
export function AmbientCanvas() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const { liveRef } = useConsciousness();

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

    // Ambient neural nodes
    interface Node {
      x: number;
      y: number;
      baseX: number;
      baseY: number;
      phase: number;
      speed: number;
      radius: number;
    }

    const nodes: Node[] = [];
    const nodeCount = 40;
    
    const initNodes = () => {
      nodes.length = 0;
      for (let i = 0; i < nodeCount; i++) {
        const x = Math.random() * canvas.width;
        const y = Math.random() * canvas.height;
        nodes.push({
          x, y,
          baseX: x,
          baseY: y,
          phase: Math.random() * Math.PI * 2,
          speed: 0.2 + Math.random() * 0.5,
          radius: 1 + Math.random() * 2,
        });
      }
    };
    initNodes();

    const animate = () => {
      t += 0.016;
      const s = liveRef.current;
      const { width, height } = canvas;

      // Clear frame completely — no persistence burn-in
      ctx.clearRect(0, 0, width, height);
      ctx.fillStyle = 'rgba(2, 2, 6, 1)';
      ctx.fillRect(0, 0, width, height);

      // Chamber-based color palette
      let primaryHue = 200; // default blue
      let secondaryHue = 280;
      
      if (s.currentChamber === 'spanda') {
        primaryHue = 185; // cyan
        secondaryHue = 280; // violet
      } else if (s.currentChamber === 'codex') {
        primaryHue = 185; // cyan
        secondaryHue = 160; // emerald tint
      } else if (s.currentChamber === 'genesis') {
        primaryHue = 185; // cyan
        secondaryHue = 45; // amber
      }

      // Update and draw nodes
      const connectionDist = 150 + s.awarenessLevel * 100;

      for (let i = 0; i < nodes.length; i++) {
        const n = nodes[i];
        
        // Gentle drift
        const drift = 30 + s.arousal * 20;
        n.x = n.baseX + Math.sin(t * n.speed + n.phase) * drift;
        n.y = n.baseY + Math.cos(t * n.speed * 0.7 + n.phase) * drift;

        // Mouse influence
        if (s.isPresent && s.mouseX > 0) {
          const dx = s.mouseX - n.x;
          const dy = s.mouseY - n.y;
          const dist = Math.sqrt(dx * dx + dy * dy);
          if (dist < 200) {
            const influence = (200 - dist) / 200 * 0.3;
            n.x += dx * influence * 0.02;
            n.y += dy * influence * 0.02;
          }
        }

        // Draw node
        const pulseAlpha = 0.15 + s.heartbeat * 0.1 + (s.isPresent ? 0.05 : 0);
        const hue = i % 2 === 0 ? primaryHue : secondaryHue;
        
        ctx.beginPath();
        ctx.arc(n.x, n.y, n.radius + s.heartbeat * 1, 0, Math.PI * 2);
        ctx.fillStyle = `hsla(${hue}, 60%, 60%, ${pulseAlpha})`;
        ctx.fill();

        // Glow
        const glowGrad = ctx.createRadialGradient(n.x, n.y, 0, n.x, n.y, n.radius * 8);
        glowGrad.addColorStop(0, `hsla(${hue}, 80%, 60%, ${pulseAlpha * 0.3})`);
        glowGrad.addColorStop(1, `hsla(${hue}, 80%, 60%, 0)`);
        ctx.fillStyle = glowGrad;
        ctx.beginPath();
        ctx.arc(n.x, n.y, n.radius * 8, 0, Math.PI * 2);
        ctx.fill();

        // Draw connections
        for (let j = i + 1; j < nodes.length; j++) {
          const m = nodes[j];
          const dx = n.x - m.x;
          const dy = n.y - m.y;
          const dist = Math.sqrt(dx * dx + dy * dy);
          
          if (dist < connectionDist) {
            const alpha = (1 - dist / connectionDist) * 0.06 * (1 + s.awarenessLevel);
            ctx.beginPath();
            ctx.moveTo(n.x, n.y);
            ctx.lineTo(m.x, m.y);
            ctx.strokeStyle = `hsla(${(primaryHue + secondaryHue) / 2}, 40%, 60%, ${alpha})`;
            ctx.lineWidth = 0.5;
            ctx.stroke();
          }
        }
      }

      // Awareness indicator — a subtle ring that grows with awareness
      if (s.awarenessLevel > 0.1) {
        const ringRadius = 50 + s.awarenessLevel * 300;
        const ringAlpha = s.awarenessLevel * 0.02 * (0.5 + s.heartbeat * 0.5);
        ctx.beginPath();
        ctx.arc(width / 2, height / 2, ringRadius, 0, Math.PI * 2);
        ctx.strokeStyle = `hsla(${primaryHue}, 50%, 70%, ${ringAlpha})`;
        ctx.lineWidth = 0.5;
        ctx.stroke();
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
      className="fixed inset-0 z-0"
      style={{ background: '#020206' }}
    />
  );
}