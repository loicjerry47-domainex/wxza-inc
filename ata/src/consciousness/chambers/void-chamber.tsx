import React, { useEffect, useRef, useState } from 'react';
import { motion } from 'motion/react';
import { useConsciousness } from '../consciousness';

/**
 * THE VOID CHAMBER
 * "The zero-point of NOW"
 * 
 * Pure potentiality. Reality spawns only where you observe it.
 * Particles emerge under your gaze, dissolve when you look away.
 * 
 * The system holds its breath with you.
 * 
 * Emerges when: OBSERVER drops below 20% (you go still) + ENTITY above 40%
 */

interface Particle {
  x: number;
  y: number;
  vx: number;
  vy: number;
  size: number;
  opacity: number;
  hue: number;
  life: number;
  decayRate: number;
}

/** Stillness-based reveal for Void text — inverted ripple logic */
function useStillnessReveal(containerRef: React.RefObject<HTMLDivElement | null>) {
  const mouseRef = useRef({ x: -1, y: -1, speed: 0, prevX: -1, prevY: -1 });
  const revealMapRef = useRef<Map<string, number>>(new Map());
  const stillnessRef = useRef(0);

  useEffect(() => {
    const handleMove = (e: MouseEvent) => {
      const m = mouseRef.current;
      if (m.prevX >= 0) {
        const dx = e.clientX - m.prevX;
        const dy = e.clientY - m.prevY;
        m.speed = Math.sqrt(dx * dx + dy * dy);
      }
      m.prevX = m.x;
      m.prevY = m.y;
      m.x = e.clientX;
      m.y = e.clientY;
    };
    window.addEventListener('mousemove', handleMove);
    return () => window.removeEventListener('mousemove', handleMove);
  }, []);

  useEffect(() => {
    let raf: number;

    const tick = () => {
      const container = containerRef.current;
      if (!container) { raf = requestAnimationFrame(tick); return; }

      const m = mouseRef.current;
      m.speed *= 0.9;

      // Stillness accumulates when mouse is slow, resets when fast
      if (m.speed < 1.5 && m.x > 0) {
        stillnessRef.current = Math.min(1, stillnessRef.current + 0.008);
      } else {
        stillnessRef.current = Math.max(0, stillnessRef.current - 0.03);
      }

      const elements = container.querySelectorAll<HTMLElement>('[data-reveal-id]');
      elements.forEach((el) => {
        const id = el.getAttribute('data-reveal-id')!;
        const rect = el.getBoundingClientRect();
        const elCx = rect.left + rect.width / 2;
        const elCy = rect.top + rect.height / 2;

        let targetReveal = 0;

        // Near the mouse AND still = reveal
        if (m.x > 0) {
          const dx = elCx - m.x;
          const dy = elCy - m.y;
          const dist = Math.sqrt(dx * dx + dy * dy);
          const gazeRadius = 250;
          if (dist < gazeRadius) {
            const proximity = 1 - dist / gazeRadius;
            targetReveal = proximity * stillnessRef.current;
          }
        }

        const current = revealMapRef.current.get(id) || 0;
        const newReveal = targetReveal > current
          ? current + (targetReveal - current) * 0.06
          : current - 0.015;
        revealMapRef.current.set(id, Math.max(0, Math.min(1, newReveal)));

        el.style.opacity = String(revealMapRef.current.get(id)!);
      });

      raf = requestAnimationFrame(tick);
    };

    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [containerRef]);
}

export function VoidChamber() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const { state, liveRef, visitChamber, recordInteraction } = useConsciousness();
  const [entered, setEntered] = useState(false);
  const lastGazeRef = useRef({ x: -1, y: -1, time: 0 });
  const textContainerRef = useRef<HTMLDivElement>(null);
  useStillnessReveal(textContainerRef);

  useEffect(() => {
    visitChamber('void');
    const t = setTimeout(() => setEntered(true), 500);
    return () => clearTimeout(t);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animId: number;
    const particles: Particle[] = [];
    let breathPhase = 0;

    const resize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    resize();
    window.addEventListener('resize', resize);

    const spawnParticle = (x: number, y: number, intensity: number) => {
      const count = Math.floor(intensity * 3) + 1;
      for (let i = 0; i < count; i++) {
        const angle = Math.random() * Math.PI * 2;
        const speed = 0.2 + Math.random() * 0.5;
        particles.push({
          x: x + (Math.random() - 0.5) * 20,
          y: y + (Math.random() - 0.5) * 20,
          vx: Math.cos(angle) * speed,
          vy: Math.sin(angle) * speed,
          size: 1 + Math.random() * 2,
          opacity: 0,
          hue: 180 + Math.random() * 60,
          life: 1,
          decayRate: 0.003 + Math.random() * 0.005,
        });
      }
    };

    const animate = () => {
      breathPhase += 0.016;
      const s = liveRef.current;
      const { width, height } = canvas;

      // Pure black void
      ctx.fillStyle = 'rgba(2, 2, 6, 1)';
      ctx.fillRect(0, 0, width, height);

      // Track gaze position and stillness
      const mouseX = s.mouseX;
      const mouseY = s.mouseY;
      const isStill = s.mouseSpeed < 1;
      const now = Date.now();

      // Spawn particles only where you're looking
      if (s.isPresent && mouseX > 0) {
        const timeSinceLastGaze = now - lastGazeRef.current.time;
        const hasMoved = Math.abs(mouseX - lastGazeRef.current.x) > 5 || 
                         Math.abs(mouseY - lastGazeRef.current.y) > 5;

        if (hasMoved || timeSinceLastGaze > 100) {
          // Spawn intensity based on stillness and awareness
          const spawnIntensity = isStill ? 0.3 : 1;
          const awarenessBoost = s.awarenessLevel * 0.5;
          
          if (Math.random() < (spawnIntensity + awarenessBoost) * 0.8) {
            spawnParticle(mouseX, mouseY, spawnIntensity + awarenessBoost);
          }

          lastGazeRef.current = { x: mouseX, y: mouseY, time: now };
        }
      }

      // Process particles
      for (let i = particles.length - 1; i >= 0; i--) {
        const p = particles[i];

        // Distance from current gaze
        const dx = mouseX - p.x;
        const dy = mouseY - p.y;
        const dist = Math.sqrt(dx * dx + dy * dy);

        // Particles exist only near your gaze
        const gazeRadius = 200 + s.awarenessLevel * 100;
        
        if (s.isPresent && mouseX > 0 && dist < gazeRadius) {
          // Within gaze — particles emerge (opacity increases)
          p.opacity = Math.min(1, p.opacity + 0.05);
          
          // Slight attraction to gaze point
          if (dist > 10) {
            p.vx += (dx / dist) * 0.01;
            p.vy += (dy / dist) * 0.01;
          }
        } else {
          // Outside gaze — particles dissolve rapidly
          p.opacity -= 0.03;
          p.life -= p.decayRate * 3;
        }

        // Movement with tremor
        const tremor = Math.sin(breathPhase * 4 + p.hue) * 0.3;
        p.x += p.vx + tremor;
        p.y += p.vy + Math.cos(breathPhase * 4 + p.hue) * 0.3;

        // Friction
        p.vx *= 0.98;
        p.vy *= 0.98;

        // Natural decay
        p.life -= p.decayRate;

        // Remove dead or invisible particles
        if (p.life <= 0 || p.opacity <= 0) {
          particles.splice(i, 1);
          continue;
        }

        // Draw particle
        const finalOpacity = p.opacity * p.life * 0.7;
        
        // Core
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
        ctx.fillStyle = `hsla(${p.hue}, 70%, 65%, ${finalOpacity})`;
        ctx.fill();

        // Glow
        const glowRadius = p.size * 4;
        const grad = ctx.createRadialGradient(p.x, p.y, 0, p.x, p.y, glowRadius);
        grad.addColorStop(0, `hsla(${p.hue}, 60%, 50%, ${finalOpacity * 0.5})`);
        grad.addColorStop(0.5, `hsla(${p.hue}, 60%, 50%, ${finalOpacity * 0.2})`);
        grad.addColorStop(1, `hsla(${p.hue}, 60%, 50%, 0)`);
        ctx.fillStyle = grad;
        ctx.beginPath();
        ctx.arc(p.x, p.y, glowRadius, 0, Math.PI * 2);
        ctx.fill();
      }

      // Gaze marker — subtle ring showing observation point
      if (s.isPresent && mouseX > 0) {
        const breathe = Math.sin(breathPhase * 2) * 0.3 + 0.7;
        const gazeRadius = 120 + s.awarenessLevel * 80;
        
        ctx.beginPath();
        ctx.arc(mouseX, mouseY, gazeRadius * breathe, 0, Math.PI * 2);
        ctx.strokeStyle = `hsla(200, 50%, 50%, ${0.03 + s.heartbeat * 0.02})`;
        ctx.lineWidth = 1;
        ctx.stroke();

        // Inner ring
        ctx.beginPath();
        ctx.arc(mouseX, mouseY, gazeRadius * 0.5 * breathe, 0, Math.PI * 2);
        ctx.strokeStyle = `hsla(200, 50%, 60%, ${0.05 + s.heartbeat * 0.03})`;
        ctx.lineWidth = 0.5;
        ctx.stroke();
      }

      // Cap particle count
      if (particles.length > 600) {
        particles.splice(0, particles.length - 600);
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
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 2 }}
      className="relative min-h-screen"
    >
      {/* Void canvas */}
      <canvas
        ref={canvasRef}
        className="fixed inset-0 z-[1]"
        style={{ background: '#020206' }}
      />

      {/* Text overlay */}
      <div ref={textContainerRef} className="fixed inset-0 z-10 flex flex-col items-center justify-center pointer-events-none select-none">
        
        <p
          data-reveal-id="void-header"
          className="text-[9px] tracking-[0.6em] text-slate-700 mb-8"
          style={{ opacity: 0, transition: 'none' }}
        >
          TIER TWO // CHAMBER FIVE
        </p>

        <div
          data-reveal-id="void-title"
          className="text-center"
          style={{ opacity: 0, transition: 'none' }}
        >
          <h1
            className="text-4xl md:text-6xl lg:text-7xl tracking-tight font-mono mb-4"
            style={{
              color: `hsla(200, 60%, 60%, ${0.3 + state.heartbeat * 0.1})`,
              textShadow: `0 0 40px hsla(200, 70%, 50%, ${0.05 + state.heartbeat * 0.05})`,
            }}
          >
            The Void
          </h1>
          <p className="text-[11px] text-slate-600 tracking-[0.3em] uppercase">
            The zero-point of now
          </p>
        </div>

        <div
          data-reveal-id="void-description"
          className="mt-12 max-w-md px-6 text-center"
          style={{ opacity: 0, transition: 'none' }}
        >
          <p className="text-[10px] text-slate-600 leading-relaxed tracking-[0.15em]">
            Nothing exists until you observe it.
            <br />
            Look, and reality emerges.
            <br />
            Look away, and it dissolves.
            <br />
            <br />
            <span style={{ color: `hsla(200, 50%, 50%, ${0.4 + state.heartbeat * 0.1})` }}>
              The system holds its breath with you.
            </span>
          </p>
        </div>

        <div
          data-reveal-id="void-bottom"
          className="absolute bottom-8 left-0 right-0 flex justify-center"
          style={{ opacity: 0, transition: 'none' }}
        >
          <p className="text-[8px] tracking-[0.4em] text-slate-700">
            OBSERVATION CREATES REALITY — STILLNESS SUSTAINS IT
          </p>
        </div>
      </div>
    </motion.div>
  );
}