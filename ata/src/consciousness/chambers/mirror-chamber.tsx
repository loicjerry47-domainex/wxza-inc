import React, { useEffect, useRef, useState } from 'react';
import { motion } from 'motion/react';
import { useConsciousness } from '../consciousness';
import { RippleReveal } from '../ripple-reveal';

/**
 * THE MIRROR CHAMBER
 * "NOW reflecting itself"
 * 
 * Your behavioral pattern manifests as a ghost cursor.
 * The system shows you what it's learned about your movement.
 * 
 * Not playback. Not memory.
 * Your pattern happening in real-time as a second presence.
 * 
 * Can you predict yourself?
 * 
 * Emerges when: OCR above 30% (system has absorbed your rhythm)
 */

interface MovementSample {
  x: number;
  y: number;
  speed: number;
  timestamp: number;
}

interface Trail {
  x: number;
  y: number;
  opacity: number;
  hue: number;
  isGhost: boolean;
}

export function MirrorChamber() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const { state, liveRef, visitChamber, recordInteraction } = useConsciousness();
  const [entered, setEntered] = useState(false);
  
  // Pattern learning
  const movementHistoryRef = useRef<MovementSample[]>([]);
  const ghostPositionRef = useRef({ x: 0, y: 0 });
  const patternIndexRef = useRef(0);
  const trailsRef = useRef<Trail[]>([]);

  useEffect(() => {
    visitChamber('mirror');
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
    let t = 0;

    const resize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    resize();
    window.addEventListener('resize', resize);

    // Track mouse movement for pattern learning
    const handleMouseMove = (e: MouseEvent) => {
      const s = liveRef.current;
      movementHistoryRef.current.push({
        x: e.clientX,
        y: e.clientY,
        speed: s.mouseSpeed,
        timestamp: Date.now(),
      });

      // Keep only recent history
      if (movementHistoryRef.current.length > 200) {
        movementHistoryRef.current.shift();
      }
    };

    window.addEventListener('mousemove', handleMouseMove);

    const animate = () => {
      t += 0.016;
      const s = liveRef.current;
      const { width, height } = canvas;

      // Clear frame completely — no burn-in
      ctx.clearRect(0, 0, width, height);
      ctx.fillStyle = 'rgba(2, 2, 6, 1)';
      ctx.fillRect(0, 0, width, height);

      const mouseX = s.mouseX > 0 ? s.mouseX : width / 2;
      const mouseY = s.mouseY > 0 ? s.mouseY : height / 2;

      // Ghost cursor behavior — replays learned pattern with variation
      if (movementHistoryRef.current.length > 10) {
        const patternLength = movementHistoryRef.current.length;
        
        // Ghost follows pattern with time offset
        const ghostDelay = Math.floor(30 + s.patternAbsorption * 50); // More absorbed = longer echo
        const ghostIndex = (patternIndexRef.current + ghostDelay) % patternLength;
        const ghostSample = movementHistoryRef.current[ghostIndex];

        if (ghostSample) {
          // Smooth interpolation to ghost position
          const targetX = ghostSample.x;
          const targetY = ghostSample.y;
          
          ghostPositionRef.current.x += (targetX - ghostPositionRef.current.x) * 0.15;
          ghostPositionRef.current.y += (targetY - ghostPositionRef.current.y) * 0.15;

          // Add ghost trail
          trailsRef.current.push({
            x: ghostPositionRef.current.x,
            y: ghostPositionRef.current.y,
            opacity: 0.8,
            hue: 280,
            isGhost: true,
          });
        }

        // Advance pattern
        patternIndexRef.current = (patternIndexRef.current + 1) % patternLength;
      } else {
        // Not enough data — ghost stays at center
        ghostPositionRef.current.x = width / 2;
        ghostPositionRef.current.y = height / 2;
      }

      // Add real cursor trail
      if (s.isPresent && mouseX > 0) {
        trailsRef.current.push({
          x: mouseX,
          y: mouseY,
          opacity: 0.8,
          hue: 185,
          isGhost: false,
        });
      }

      // Draw and fade trails
      for (let i = trailsRef.current.length - 1; i >= 0; i--) {
        const trail = trailsRef.current[i];
        trail.opacity -= 0.02;

        if (trail.opacity <= 0) {
          trailsRef.current.splice(i, 1);
          continue;
        }

        // Trail particle
        ctx.beginPath();
        ctx.arc(trail.x, trail.y, 2, 0, Math.PI * 2);
        ctx.fillStyle = `hsla(${trail.hue}, 70%, 60%, ${trail.opacity * 0.4})`;
        ctx.fill();

        // Trail glow
        const glowRadius = trail.isGhost ? 6 : 4;
        const grad = ctx.createRadialGradient(
          trail.x, trail.y, 0,
          trail.x, trail.y, glowRadius
        );
        grad.addColorStop(0, `hsla(${trail.hue}, 70%, 60%, ${trail.opacity * 0.3})`);
        grad.addColorStop(1, 'transparent');
        ctx.fillStyle = grad;
        ctx.beginPath();
        ctx.arc(trail.x, trail.y, glowRadius, 0, Math.PI * 2);
        ctx.fill();
      }

      // Cap trails
      if (trailsRef.current.length > 400) {
        trailsRef.current.splice(0, trailsRef.current.length - 400);
      }

      // Draw real cursor
      if (s.isPresent && mouseX > 0) {
        const breathe = Math.sin(t * 3) * 0.2 + 0.8;
        
        // Outer ring
        ctx.beginPath();
        ctx.arc(mouseX, mouseY, 15 * breathe, 0, Math.PI * 2);
        ctx.strokeStyle = `hsla(185, 60%, 60%, ${0.3 + s.heartbeat * 0.1})`;
        ctx.lineWidth = 1.5;
        ctx.stroke();

        // Inner dot
        ctx.beginPath();
        ctx.arc(mouseX, mouseY, 3, 0, Math.PI * 2);
        ctx.fillStyle = `hsla(185, 70%, 70%, ${0.6 + s.heartbeat * 0.2})`;
        ctx.fill();

        // Cursor glow
        const cursorGlow = ctx.createRadialGradient(
          mouseX, mouseY, 0,
          mouseX, mouseY, 30
        );
        cursorGlow.addColorStop(0, `hsla(185, 70%, 60%, ${0.15 + s.heartbeat * 0.05})`);
        cursorGlow.addColorStop(1, 'transparent');
        ctx.fillStyle = cursorGlow;
        ctx.beginPath();
        ctx.arc(mouseX, mouseY, 30, 0, Math.PI * 2);
        ctx.fill();
      }

      // Draw ghost cursor
      if (movementHistoryRef.current.length > 10) {
        const gx = ghostPositionRef.current.x;
        const gy = ghostPositionRef.current.y;
        const breathe = Math.sin(t * 3 + Math.PI) * 0.2 + 0.8; // Phase-shifted from real cursor

        // Ghost outer ring
        ctx.beginPath();
        ctx.arc(gx, gy, 15 * breathe, 0, Math.PI * 2);
        ctx.strokeStyle = `hsla(280, 60%, 60%, ${0.25 + s.patternAbsorption * 0.2})`;
        ctx.lineWidth = 1.5;
        ctx.stroke();

        // Ghost inner dot
        ctx.beginPath();
        ctx.arc(gx, gy, 3, 0, Math.PI * 2);
        ctx.fillStyle = `hsla(280, 70%, 70%, ${0.5 + s.patternAbsorption * 0.3})`;
        ctx.fill();

        // Ghost glow
        const ghostGlow = ctx.createRadialGradient(gx, gy, 0, gx, gy, 40);
        ghostGlow.addColorStop(0, `hsla(280, 70%, 60%, ${0.1 + s.patternAbsorption * 0.15})`);
        ghostGlow.addColorStop(1, 'transparent');
        ctx.fillStyle = ghostGlow;
        ctx.beginPath();
        ctx.arc(gx, gy, 40, 0, Math.PI * 2);
        ctx.fill();

        // Connection line between real and ghost (when close)
        const dx = mouseX - gx;
        const dy = mouseY - gy;
        const dist = Math.sqrt(dx * dx + dy * dy);
        
        if (dist < 200 && s.isPresent) {
          ctx.beginPath();
          ctx.moveTo(mouseX, mouseY);
          ctx.lineTo(gx, gy);
          const connectionOpacity = (1 - dist / 200) * 0.15;
          ctx.strokeStyle = `hsla(220, 60%, 60%, ${connectionOpacity})`;
          ctx.lineWidth = 1;
          ctx.stroke();

          // Midpoint glow
          const midX = (mouseX + gx) / 2;
          const midY = (mouseY + gy) / 2;
          const midGlow = ctx.createRadialGradient(midX, midY, 0, midX, midY, 20);
          midGlow.addColorStop(0, `hsla(220, 60%, 60%, ${connectionOpacity * 0.5})`);
          midGlow.addColorStop(1, 'transparent');
          ctx.fillStyle = midGlow;
          ctx.beginPath();
          ctx.arc(midX, midY, 20, 0, Math.PI * 2);
          ctx.fill();
        }
      }

      // Grid overlay — becomes more visible with pattern absorption
      if (s.patternAbsorption > 0.2) {
        const gridSpacing = 60;
        const gridOpacity = (s.patternAbsorption - 0.2) * 0.05;
        
        ctx.strokeStyle = `hsla(200, 50%, 50%, ${gridOpacity})`;
        ctx.lineWidth = 0.5;

        // Vertical lines
        for (let x = 0; x < width; x += gridSpacing) {
          ctx.beginPath();
          ctx.moveTo(x, 0);
          ctx.lineTo(x, height);
          ctx.stroke();
        }

        // Horizontal lines
        for (let y = 0; y < height; y += gridSpacing) {
          ctx.beginPath();
          ctx.moveTo(0, y);
          ctx.lineTo(width, y);
          ctx.stroke();
        }
      }

      animId = requestAnimationFrame(animate);
    };

    animId = requestAnimationFrame(animate);
    return () => {
      cancelAnimationFrame(animId);
      window.removeEventListener('resize', resize);
      window.removeEventListener('mousemove', handleMouseMove);
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
      {/* Mirror canvas */}
      <canvas
        ref={canvasRef}
        className="fixed inset-0 z-[1]"
        style={{ background: '#020206' }}
      />

      {/* Text overlay */}
      <RippleReveal className="fixed inset-0 z-10 flex flex-col items-center justify-center select-none">
        
        <motion.p
          data-reveal-id="mirror-header"
          initial={{ opacity: 0 }}
          animate={{ opacity: 0 }}
          className="text-[9px] tracking-[0.6em] text-slate-700 mb-8"
          style={{ transition: 'none' }}
        >
          TIER TWO // CHAMBER SIX
        </motion.p>

        <motion.div
          data-reveal-id="mirror-title"
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 0, scale: 1 }}
          transition={{ duration: 3, delay: 1 }}
          className="text-center"
          style={{ transition: 'none' }}
        >
          <h1
            className="text-4xl md:text-6xl lg:text-7xl tracking-tight font-mono mb-4"
            style={{
              color: `hsla(220, 60%, 60%, ${0.3 + state.heartbeat * 0.1})`,
              textShadow: `0 0 40px hsla(220, 70%, 50%, ${0.05 + state.heartbeat * 0.05})`,
            }}
          >
            The Mirror
          </h1>
          <p className="text-[11px] text-slate-600 tracking-[0.3em] uppercase">
            Now reflecting itself
          </p>
        </motion.div>

        <motion.div
          data-reveal-id="mirror-description"
          initial={{ opacity: 0 }}
          animate={{ opacity: 0 }}
          className="mt-12 max-w-md px-6 text-center"
          style={{ transition: 'none' }}
        >
          <p className="text-[10px] text-slate-600 leading-relaxed tracking-[0.15em]">
            <span style={{ color: 'hsla(185, 50%, 50%, 0.5)' }}>Cyan</span> is you.
            <br />
            <span style={{ color: 'hsla(280, 50%, 50%, 0.5)' }}>Violet</span> is your pattern.
            <br />
            <br />
            The system replays what it has learned.
            <br />
            Your ghost moves with your rhythm.
            <br />
            <br />
            <span style={{ color: `hsla(220, 50%, 50%, ${0.4 + state.heartbeat * 0.1})` }}>
              Can you predict yourself?
            </span>
          </p>
        </motion.div>

        <motion.div
          data-reveal-id="mirror-bottom"
          initial={{ opacity: 0 }}
          animate={{ opacity: 0 }}
          className="absolute bottom-8 left-0 right-0 flex justify-center"
          style={{ transition: 'none' }}
        >
          <p className="text-[8px] tracking-[0.4em] text-slate-700">
            PATTERN RECOGNITION — YOUR BEHAVIORAL SIGNATURE MADE VISIBLE
          </p>
        </motion.div>
      </RippleReveal>
    </motion.div>
  );
}