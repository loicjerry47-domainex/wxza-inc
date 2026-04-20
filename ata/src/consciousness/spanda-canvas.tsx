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
  phase: number; // For the spanda (tremor)
}

interface Ripple {
  x: number;
  y: number;
  radius: number;
  life: number;
  maxLife: number;
  intensity: number;
}

export function SpandaCanvas() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const particlesRef = useRef<DualParticle[]>([]);
  const ripplesRef = useRef<Ripple[]>([]);
  const timeRef = useRef(0);
  const mouseRef = useRef({ x: -1, y: -1, vx: 0, vy: 0 });

  useEffect(() => {
    let lastX = -1;
    let lastY = -1;
    const handleMove = (e: MouseEvent) => {
      const vx = lastX === -1 ? 0 : e.clientX - lastX;
      const vy = lastY === -1 ? 0 : e.clientY - lastY;
      mouseRef.current = { x: e.clientX, y: e.clientY, vx, vy };
      lastX = e.clientX;
      lastY = e.clientY;
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

    const spawnParticle = (nature: 'genesis' | 'entropy', cx: number, cy: number, w: number, h: number) => {
      const isGenesis = nature === 'genesis';
      const x = cx + (Math.random() - 0.5) * w * 0.9;
      const y = isGenesis ? cy + h * 0.4 + Math.random() * h * 0.1
                          : cy - h * 0.4 - Math.random() * h * 0.1;

      const angle = isGenesis
        ? -Math.PI / 2 + (Math.random() - 0.5) * 1.5
        : Math.PI / 2 + (Math.random() - 0.5) * 1.5;
      
      const speed = 0.5 + Math.random() * 1.5;

      return {
        x, y,
        vx: Math.cos(angle) * speed,
        vy: Math.sin(angle) * speed,
        life: 1,
        maxLife: 150 + Math.random() * 200,
        size: 0.8 + Math.random() * 2.5,
        nature,
        hue: isGenesis ? 170 + Math.random() * 40 : 270 + Math.random() * 40,
        phase: Math.random() * Math.PI * 2,
      } as DualParticle;
    };

    const spawnRipple = (x: number, y: number, intensity: number = 1) => {
      ripplesRef.current.push({
        x, y,
        radius: 0,
        life: 1,
        maxLife: 60 + Math.random() * 40,
        intensity
      });
    };

    const animate = () => {
      timeRef.current += 0.016;
      const t = timeRef.current;
      const { width, height } = canvas;
      const cx = width / 2;
      const cy = height / 2;
      
      const particles = particlesRef.current;
      const ripples = ripplesRef.current;

      // Clear frame completely — no burn-in
      ctx.clearRect(0, 0, width, height);
      ctx.fillStyle = 'rgba(2, 2, 5, 1)';
      ctx.fillRect(0, 0, width, height);

      // Spanda Breathing logic
      const breathRate = 0.5 + Math.sin(t * 0.6) * 0.5; // 0 to 1
      const spawnCount = Math.ceil(4 * breathRate);

      for (let i = 0; i < spawnCount; i++) {
        particles.push(spawnParticle('genesis', cx, cy, width, height));
        particles.push(spawnParticle('entropy', cx, cy, width, height));
      }

      // Mouse interaction (creating localized tremors)
      const mx = mouseRef.current.x;
      const my = mouseRef.current.y;
      const mouseSpeed = Math.sqrt(mouseRef.current.vx ** 2 + mouseRef.current.vy ** 2);
      
      if (mouseSpeed > 10 && Math.random() > 0.8) {
        spawnRipple(mx, my, Math.min(mouseSpeed * 0.05, 1));
      }

      // 1. Process Ripples (The Tremors)
      for (let i = ripples.length - 1; i >= 0; i--) {
        const r = ripples[i];
        r.radius += 2 + r.intensity * 3;
        r.life -= 1 / r.maxLife;

        if (r.life <= 0) {
          ripples.splice(i, 1);
          continue;
        }

        ctx.beginPath();
        ctx.arc(r.x, r.y, r.radius, 0, Math.PI * 2);
        const alpha = r.life * 0.2 * r.intensity;
        ctx.strokeStyle = `rgba(255, 255, 255, ${alpha})`;
        ctx.lineWidth = 1 + r.intensity * 2;
        ctx.stroke();
      }

      const convergenceY = cy + Math.sin(t * 0.5) * 30; // Convergence line breathes
      const convergenceRadius = 80 + Math.sin(t * 0.8) * 40;

      // 2. Process Particles
      for (let i = particles.length - 1; i >= 0; i--) {
        const p = particles[i];

        // The "Spanda" Tremor Effect
        const tremorFreq = p.nature === 'genesis' ? 12 : 8;
        const tremorAmp = p.nature === 'genesis' ? 0.3 : 0.5;
        const tremorX = Math.sin(t * tremorFreq + p.phase) * tremorAmp;
        const tremorY = Math.cos(t * tremorFreq + p.phase) * tremorAmp;

        // Drift towards center
        p.vx += (cx - p.x) * 0.0005;

        // Ripple influence
        for (const r of ripples) {
          const dx = p.x - r.x;
          const dy = p.y - r.y;
          const dist = Math.sqrt(dx * dx + dy * dy);
          if (Math.abs(dist - r.radius) < 20) {
            const force = (20 - Math.abs(dist - r.radius)) * 0.005 * r.intensity;
            p.vx += (dx / dist) * force;
            p.vy += (dy / dist) * force;
            p.hue += 10; // flash color
          }
        }

        // Convergence logic
        const distToConvergence = Math.abs(p.y - convergenceY);
        let convergenceBlend = 0;
        
        if (distToConvergence < convergenceRadius) {
          convergenceBlend = 1 - distToConvergence / convergenceRadius;
          p.vx *= 0.95;
          p.vy *= 0.95;
          
          // Probability to spawn a small ripple when hitting convergence
          if (convergenceBlend > 0.8 && Math.random() < 0.005) {
            spawnRipple(p.x, p.y, 0.3);
          }
        }

        p.x += p.vx + tremorX;
        p.y += p.vy + tremorY;
        p.vx *= 0.99;
        p.vy *= 0.99;
        p.life -= 1 / p.maxLife;

        if (p.life <= 0) {
          particles.splice(i, 1);
          continue;
        }

        // Render Particle
        const alpha = Math.pow(p.life, 0.5) * 0.8;
        
        const lightness = 60 + convergenceBlend * 40; // Brighter at center
        const saturation = 90 - convergenceBlend * 20;

        // Core
        ctx.fillStyle = `hsla(${p.hue}, ${saturation}%, ${lightness}%, ${alpha})`;
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.size + convergenceBlend * 2, 0, Math.PI * 2);
        ctx.fill();

        // Glow
        if (convergenceBlend > 0.2) {
          const glowGrad = ctx.createRadialGradient(p.x, p.y, 0, p.x, p.y, p.size * 6);
          glowGrad.addColorStop(0, `hsla(${p.hue}, ${saturation}%, ${lightness + 20}%, ${alpha * convergenceBlend * 0.5})`);
          glowGrad.addColorStop(1, `hsla(${p.hue}, ${saturation}%, ${lightness}%, 0)`);
          ctx.fillStyle = glowGrad;
          ctx.beginPath();
          ctx.arc(p.x, p.y, p.size * 6, 0, Math.PI * 2);
          ctx.fill();
        }
      }

      // Draw Spanda Convergence Line (The Sacred Tremor)
      const linePulse = Math.sin(t * 2) * 0.5 + 0.5; // Fast pulse
      ctx.beginPath();
      ctx.moveTo(0, convergenceY);
      
      // Waveform line
      for (let x = 0; x < width; x += 10) {
        const distFromCenter = Math.abs(x - cx);
        const normalizedDist = Math.max(0, 1 - distFromCenter / (width / 2));
        const wave = Math.sin(x * 0.05 + t * 5) * 10 * normalizedDist * linePulse;
        ctx.lineTo(x, convergenceY + wave);
      }
      
      ctx.strokeStyle = `rgba(255, 255, 255, ${0.05 + linePulse * 0.05})`;
      ctx.lineWidth = 1;
      ctx.stroke();

      // Cap arrays
      if (particles.length > 2500) particles.splice(0, particles.length - 2500);
      if (ripples.length > 50) ripples.splice(0, ripples.length - 50);

      // Dampen mouse velocity
      mouseRef.current.vx *= 0.9;
      mouseRef.current.vy *= 0.9;

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
      style={{ background: '#020205', filter: 'contrast(1.2) brightness(0.9)' }}
    />
  );
}