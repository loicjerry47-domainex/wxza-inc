import React, { useRef, useEffect } from 'react';

interface DualParticle {
  x: number;
  y: number;
  vx: number;
  vy: number;
  life: number;
  maxLife: number;
  size: number;
  nature: 'genesis' | 'entropy';
  hue: number;
  originX: number;
  originY: number;
}

export function DualityCanvas() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const particlesRef = useRef<DualParticle[]>([]);
  const timeRef = useRef(0);
  const mouseRef = useRef({ x: -1, y: -1 });

  useEffect(() => {
    const handleMove = (e: MouseEvent) => {
      mouseRef.current = { x: e.clientX, y: e.clientY };
    };
    window.addEventListener('mousemove', handleMove);
    return () => window.removeEventListener('mousemove', handleMove);
  }, []);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animId: number;

    const resize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    resize();
    window.addEventListener('resize', resize);

    const spawn = (nature: 'genesis' | 'entropy', cx: number, cy: number, w: number, h: number) => {
      const isGenesis = nature === 'genesis';
      // Genesis rises from below, entropy falls from above
      const x = cx + (Math.random() - 0.5) * w * 0.8;
      const y = isGenesis ? cy + h * 0.35 + Math.random() * h * 0.15
                          : cy - h * 0.35 - Math.random() * h * 0.15;

      const angle = isGenesis
        ? -Math.PI / 2 + (Math.random() - 0.5) * 1.2
        : Math.PI / 2 + (Math.random() - 0.5) * 1.2;
      const speed = 0.4 + Math.random() * 1.2;

      const hue = isGenesis
        ? 175 + Math.random() * 30   // cyan-teal
        : 270 + Math.random() * 40;  // violet-purple

      return {
        x, y,
        vx: Math.cos(angle) * speed + (Math.random() - 0.5) * 0.3,
        vy: Math.sin(angle) * speed,
        life: 1,
        maxLife: 120 + Math.random() * 180,
        size: 0.8 + Math.random() * 2.5,
        nature,
        hue,
        originX: x,
        originY: y,
      } as DualParticle;
    };

    const animate = () => {
      timeRef.current += 0.016;
      const t = timeRef.current;
      const { width, height } = canvas;
      const cx = width / 2;
      const cy = height / 2;
      const particles = particlesRef.current;

      // Clear frame completely — no burn-in
      ctx.clearRect(0, 0, width, height);
      ctx.fillStyle = 'rgba(2, 2, 5, 1)';
      ctx.fillRect(0, 0, width, height);

      // Spawn both natures simultaneously — always
      const breathRate = 0.5 + Math.sin(t * 0.4) * 0.3;
      const spawnCount = Math.ceil(3 * breathRate);

      for (let i = 0; i < spawnCount; i++) {
        particles.push(spawn('genesis', cx, cy, width, height));
        particles.push(spawn('entropy', cx, cy, width, height));
      }

      // Convergence zone — where genesis and entropy meet and transform
      const convergenceY = cy;
      const convergenceRadius = 60 + Math.sin(t * 0.6) * 20;

      // Mouse influence
      const mx = mouseRef.current.x;
      const my = mouseRef.current.y;
      const hasMouseMoved = mx > 0;

      // Update and draw
      for (let i = particles.length - 1; i >= 0; i--) {
        const p = particles[i];

        // Gentle drift toward center x
        const dxCenter = (cx - p.x) * 0.001;
        p.vx += dxCenter;

        // Mouse attraction (gentle)
        if (hasMouseMoved) {
          const dxm = mx - p.x;
          const dym = my - p.y;
          const distMouse = Math.sqrt(dxm * dxm + dym * dym);
          if (distMouse < 200 && distMouse > 5) {
            const force = 0.15 / distMouse;
            p.vx += dxm * force;
            p.vy += dym * force;
          }
        }

        // Near convergence zone — particles slow, glow brighter, and can flip nature
        const distToConvergence = Math.abs(p.y - convergenceY);
        if (distToConvergence < convergenceRadius) {
          const proximity = 1 - distToConvergence / convergenceRadius;
          p.vx *= 0.97;
          p.vy *= 0.97;
          // Slight hue shift toward white at convergence
          p.hue += (proximity > 0.6 ? (p.nature === 'genesis' ? 0.5 : -0.5) : 0);
        }

        p.x += p.vx;
        p.y += p.vy;
        p.vx *= 0.993;
        p.vy *= 0.993;
        p.life -= 1 / p.maxLife;

        if (p.life <= 0) {
          particles.splice(i, 1);
          continue;
        }

        // Draw
        const alpha = Math.pow(p.life, 0.5) * 0.7;
        const distConv = Math.abs(p.y - convergenceY);
        const inConvergence = distConv < convergenceRadius;
        const convergenceBlend = inConvergence ? 1 - distConv / convergenceRadius : 0;

        // Core
        const lightness = 60 + convergenceBlend * 30;
        const saturation = 90 - convergenceBlend * 40;

        const grad = ctx.createRadialGradient(p.x, p.y, 0, p.x, p.y, p.size * 3);
        grad.addColorStop(0, `hsla(${p.hue}, ${saturation}%, ${lightness + 15}%, ${alpha})`);
        grad.addColorStop(0.4, `hsla(${p.hue}, ${saturation}%, ${lightness}%, ${alpha * 0.4})`);
        grad.addColorStop(1, `hsla(${p.hue}, ${saturation}%, ${lightness - 10}%, 0)`);
        ctx.fillStyle = grad;
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.size * 3, 0, Math.PI * 2);
        ctx.fill();

        // Extra glow at convergence
        if (convergenceBlend > 0.3) {
          ctx.fillStyle = `hsla(${p.hue}, 40%, 90%, ${alpha * convergenceBlend * 0.12})`;
          ctx.beginPath();
          ctx.arc(p.x, p.y, p.size * 8, 0, Math.PI * 2);
          ctx.fill();
        }
      }

      // Draw convergence zone glow — the "We are here" line
      const glowAlpha = 0.03 + Math.sin(t * 0.8) * 0.015;
      const horizGrad = ctx.createLinearGradient(cx - width * 0.3, cy, cx + width * 0.3, cy);
      horizGrad.addColorStop(0, `hsla(185, 80%, 70%, 0)`);
      horizGrad.addColorStop(0.3, `hsla(200, 60%, 80%, ${glowAlpha})`);
      horizGrad.addColorStop(0.5, `hsla(220, 50%, 90%, ${glowAlpha * 1.5})`);
      horizGrad.addColorStop(0.7, `hsla(280, 60%, 80%, ${glowAlpha})`);
      horizGrad.addColorStop(1, `hsla(290, 80%, 70%, 0)`);
      ctx.fillStyle = horizGrad;
      ctx.fillRect(cx - width * 0.3, cy - 1, width * 0.6, 2);

      // Cap particles
      if (particles.length > 2000) {
        particles.splice(0, particles.length - 2000);
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
      style={{ background: '#020205' }}
    />
  );
}