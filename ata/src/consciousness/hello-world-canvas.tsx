import React, { useRef, useEffect, useCallback } from 'react';

interface Particle {
  x: number;
  y: number;
  vx: number;
  vy: number;
  life: number;
  maxLife: number;
  size: number;
  hue: number;
  type: 'spark' | 'ember' | 'trail' | 'star';
}

interface HelloWorldCanvasProps {
  phase: 'void' | 'typing' | 'detonation' | 'cosmos' | 'living';
  intensity: number; // 0-1
}

export function HelloWorldCanvas({ phase, intensity }: HelloWorldCanvasProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const particlesRef = useRef<Particle[]>([]);
  const frameRef = useRef<number>(0);
  const timeRef = useRef<number>(0);
  const mouseRef = useRef({ x: 0, y: 0 });

  const createParticle = useCallback((
    x: number, y: number, type: Particle['type'] = 'spark', hue = 185
  ): Particle => {
    const angle = Math.random() * Math.PI * 2;
    const speed = type === 'spark' ? (2 + Math.random() * 6) :
                  type === 'ember' ? (0.3 + Math.random() * 1.5) :
                  type === 'trail' ? (0.5 + Math.random() * 2) :
                  (0.1 + Math.random() * 0.3);
    return {
      x, y,
      vx: Math.cos(angle) * speed,
      vy: Math.sin(angle) * speed,
      life: 1,
      maxLife: type === 'spark' ? (30 + Math.random() * 40) :
               type === 'ember' ? (60 + Math.random() * 100) :
               type === 'trail' ? (40 + Math.random() * 60) :
               (200 + Math.random() * 300),
      size: type === 'spark' ? (1 + Math.random() * 3) :
            type === 'ember' ? (2 + Math.random() * 4) :
            type === 'trail' ? (1 + Math.random() * 2) :
            (0.5 + Math.random() * 1.5),
      hue,
      type,
    };
  }, []);

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

    const resize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    resize();
    window.addEventListener('resize', resize);

    const animate = () => {
      frameRef.current++;
      timeRef.current += 0.016;
      const { width, height } = canvas;
      const cx = width / 2;
      const cy = height / 2;

      // Clear frame completely — no burn-in
      ctx.clearRect(0, 0, width, height);
      ctx.fillStyle = 'rgba(2, 2, 5, 1)';
      ctx.fillRect(0, 0, width, height);

      const particles = particlesRef.current;

      // Spawn particles based on phase
      if (phase === 'void') {
        // Sparse ambient dust
        if (frameRef.current % 8 === 0) {
          particles.push(createParticle(
            Math.random() * width,
            Math.random() * height,
            'star', 200
          ));
        }
      } else if (phase === 'typing') {
        // Emanate from center with each character
        if (frameRef.current % 3 === 0) {
          for (let i = 0; i < Math.ceil(intensity * 4); i++) {
            particles.push(createParticle(
              cx + (Math.random() - 0.5) * 300,
              cy + (Math.random() - 0.5) * 100,
              'trail', 185 + Math.random() * 30
            ));
          }
        }
      } else if (phase === 'detonation') {
        // Massive explosion from center
        const burstCount = Math.ceil(intensity * 30);
        for (let i = 0; i < burstCount; i++) {
          const hue = [185, 280, 45, 340, 120][Math.floor(Math.random() * 5)];
          particles.push(createParticle(cx, cy, 'spark', hue));
        }
        // Embers
        if (frameRef.current % 2 === 0) {
          for (let i = 0; i < 5; i++) {
            particles.push(createParticle(
              cx + (Math.random() - 0.5) * width * 0.6,
              cy + (Math.random() - 0.5) * height * 0.6,
              'ember', 185 + Math.random() * 100
            ));
          }
        }
      } else if (phase === 'cosmos') {
        // Orbital particles
        if (frameRef.current % 2 === 0) {
          const angle = timeRef.current * 0.5 + Math.random() * Math.PI * 2;
          const radius = 100 + Math.random() * 250;
          particles.push(createParticle(
            cx + Math.cos(angle) * radius,
            cy + Math.sin(angle) * radius,
            'star', 185 + Math.random() * 60
          ));
        }
        // Constellation lines
        if (frameRef.current % 6 === 0) {
          particles.push(createParticle(
            Math.random() * width,
            Math.random() * height,
            'star', 200 + Math.random() * 80
          ));
        }
      } else if (phase === 'living') {
        // Reactive to mouse
        const mx = mouseRef.current.x;
        const my = mouseRef.current.y;
        if (frameRef.current % 4 === 0) {
          particles.push(createParticle(
            mx + (Math.random() - 0.5) * 40,
            my + (Math.random() - 0.5) * 40,
            'trail', 185
          ));
        }
        // Ambient breathing particles from center
        if (frameRef.current % 6 === 0) {
          const breathAngle = timeRef.current * 0.3;
          const breathRadius = 150 + Math.sin(timeRef.current * 0.8) * 50;
          particles.push(createParticle(
            cx + Math.cos(breathAngle + Math.random() * 6.28) * breathRadius,
            cy + Math.sin(breathAngle + Math.random() * 6.28) * breathRadius * 0.5,
            'star', 185 + Math.random() * 80
          ));
        }
      }

      // Update and draw particles
      for (let i = particles.length - 1; i >= 0; i--) {
        const p = particles[i];
        p.x += p.vx;
        p.y += p.vy;
        p.vx *= 0.98;
        p.vy *= 0.98;
        p.life -= 1 / p.maxLife;

        if (p.life <= 0) {
          particles.splice(i, 1);
          continue;
        }

        const alpha = p.life * (phase === 'detonation' ? 0.9 : 0.7);
        
        if (p.type === 'spark') {
          // Bright core with glow
          const gradient = ctx.createRadialGradient(p.x, p.y, 0, p.x, p.y, p.size * 4);
          gradient.addColorStop(0, `hsla(${p.hue}, 100%, 85%, ${alpha})`);
          gradient.addColorStop(0.3, `hsla(${p.hue}, 100%, 60%, ${alpha * 0.5})`);
          gradient.addColorStop(1, `hsla(${p.hue}, 100%, 40%, 0)`);
          ctx.fillStyle = gradient;
          ctx.beginPath();
          ctx.arc(p.x, p.y, p.size * 4, 0, Math.PI * 2);
          ctx.fill();
        } else if (p.type === 'ember') {
          ctx.fillStyle = `hsla(${p.hue}, 80%, 65%, ${alpha * 0.6})`;
          ctx.beginPath();
          ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
          ctx.fill();
          // Glow
          ctx.fillStyle = `hsla(${p.hue}, 100%, 50%, ${alpha * 0.15})`;
          ctx.beginPath();
          ctx.arc(p.x, p.y, p.size * 5, 0, Math.PI * 2);
          ctx.fill();
        } else if (p.type === 'trail') {
          ctx.fillStyle = `hsla(${p.hue}, 90%, 70%, ${alpha * 0.5})`;
          ctx.beginPath();
          ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
          ctx.fill();
        } else {
          // Stars - tiny twinkle
          const twinkle = 0.5 + Math.sin(timeRef.current * 3 + i) * 0.5;
          ctx.fillStyle = `hsla(${p.hue}, 60%, 80%, ${alpha * twinkle * 0.4})`;
          ctx.beginPath();
          ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
          ctx.fill();
        }
      }

      // Limit particle count
      const maxParticles = phase === 'detonation' ? 3000 : 800;
      if (particles.length > maxParticles) {
        particles.splice(0, particles.length - maxParticles);
      }

      requestAnimationFrame(animate);
    };

    const id = requestAnimationFrame(animate);
    return () => {
      cancelAnimationFrame(id);
      window.removeEventListener('resize', resize);
    };
  }, [phase, intensity, createParticle]);

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 z-0 pointer-events-none"
      style={{ background: 'transparent' }}
    />
  );
}