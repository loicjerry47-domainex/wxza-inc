import React, { useEffect, useRef, useState } from 'react';
import { motion } from 'motion/react';
import { useConsciousness } from '../consciousness';
import { RippleReveal } from '../ripple-reveal';

/**
 * Phase Transition Chamber — "Limited → Unlimited"
 * 
 * Visualizes the concept: discrete, countable particles (limited/granular)
 * dissolving into continuous flowing fields (unlimited/wave).
 * 
 * The transition is driven by:
 * - Time spent in the chamber
 * - Mouse interaction intensity
 * - Overall consciousness awareness level
 * 
 * The user literally watches limitation dissolve into infinity.
 */

interface Grain {
  x: number;
  y: number;
  vx: number;
  vy: number;
  size: number;
  phase: number;
  life: number;
  maxLife: number;
  hue: number;
  dissolved: number; // 0 = fully particle, 1 = fully wave
}

interface FlowLine {
  points: { x: number; y: number; age: number }[];
  hue: number;
  width: number;
  life: number;
}

export function PhaseChamber() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const { state, liveRef, visitChamber, recordInteraction } = useConsciousness();
  const localPhaseRef = useRef(0); // 0 = limited, 1 = unlimited
  const [entered, setEntered] = useState(false);
  const [phaseLabel, setPhaseLabel] = useState('LIMITED');
  const [phaseValue, setPhaseValue] = useState(0);
  
  // Add refs to track previous values to prevent unnecessary updates
  const prevPhaseLabelRef = useRef('LIMITED');
  const prevPhaseValueRef = useRef(0);

  useEffect(() => {
    visitChamber('phase');
    // eslint-disable-next-line react-hooks/exhaustive-deps
    const t = setTimeout(() => setEntered(true), 300);
    return () => clearTimeout(t);
  }, []);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animId: number;
    let t = 0;
    const grains: Grain[] = [];
    const flowLines: FlowLine[] = [];
    let chamberTime = 0;

    const resize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    resize();
    window.addEventListener('resize', resize);

    const animate = () => {
      t += 0.016;
      chamberTime += 0.016;
      const s = liveRef.current;
      const { width, height } = canvas;
      const cx = width / 2;
      const cy = height / 2;

      // Phase transition driven by time + awareness + arousal
      const targetPhase = Math.min(1, 
        chamberTime * 0.008 + // Slow time-based growth
        s.awarenessLevel * 0.4 + // Awareness contribution
        s.arousal * 0.3 // Arousal spikes it
      );
      localPhaseRef.current += (targetPhase - localPhaseRef.current) * 0.005;
      const phase = localPhaseRef.current;

      // Update UI labels - ONLY if value has changed significantly
      let newLabel = prevPhaseLabelRef.current;
      if (phase < 0.25) newLabel = 'LIMITED';
      else if (phase < 0.5) newLabel = 'DISSOLVING';
      else if (phase < 0.75) newLabel = 'TRANSITIONING';
      else newLabel = 'UNLIMITED';
      
      if (newLabel !== prevPhaseLabelRef.current) {
        prevPhaseLabelRef.current = newLabel;
        setPhaseLabel(newLabel);
      }
      
      // Only update phase value if it changed by more than 0.01 (1%)
      if (Math.abs(phase - prevPhaseValueRef.current) > 0.01) {
        prevPhaseValueRef.current = phase;
        setPhaseValue(phase);
      }

      // Clear frame completely — no burn-in
      ctx.clearRect(0, 0, width, height);
      ctx.fillStyle = 'rgba(2, 2, 6, 1)';
      ctx.fillRect(0, 0, width, height);

      // === SPAWN GRAINS (decreases as phase increases) ===
      const grainSpawnRate = Math.max(0, 1 - phase * 1.3);
      if (Math.random() < grainSpawnRate * 0.6) {
        const angle = Math.random() * Math.PI * 2;
        const radius = 50 + Math.random() * Math.min(width, height) * 0.35;
        const x = cx + Math.cos(angle) * radius;
        const y = cy + Math.sin(angle) * radius;
        
        grains.push({
          x, y,
          vx: (Math.random() - 0.5) * 0.8,
          vy: (Math.random() - 0.5) * 0.8,
          size: 1.5 + Math.random() * 3,
          phase: Math.random() * Math.PI * 2,
          life: 1,
          maxLife: 200 + Math.random() * 300,
          hue: 185 + Math.random() * 60, // cyan to blue-violet range
          dissolved: 0,
        });
      }

      // === SPAWN FLOW LINES (increases as phase increases) ===
      if (phase > 0.15 && Math.random() < phase * 0.15) {
        const angle = Math.random() * Math.PI * 2;
        const radius = 30 + Math.random() * Math.min(width, height) * 0.4;
        flowLines.push({
          points: [{
            x: cx + Math.cos(angle) * radius,
            y: cy + Math.sin(angle) * radius,
            age: 0,
          }],
          hue: 185 + Math.random() * 95, // cyan through violet
          width: 0.5 + Math.random() * 2 * phase,
          life: 1,
        });
      }

      // === PROCESS GRAINS ===
      for (let i = grains.length - 1; i >= 0; i--) {
        const g = grains[i];
        
        // Grains dissolve over time based on phase
        g.dissolved = Math.min(1, g.dissolved + phase * 0.003);
        
        // Orbital drift around center
        const dx = cx - g.x;
        const dy = cy - g.y;
        const dist = Math.sqrt(dx * dx + dy * dy);
        const orbitForce = 0.0003 + phase * 0.001;
        
        // Tangential force (orbit) + radial force (breathe in/out)
        g.vx += (-dy / dist) * orbitForce + dx * 0.00005;
        g.vy += (dx / dist) * orbitForce + dy * 0.00005;

        // Mouse influence
        if (s.isPresent && s.mouseX > 0) {
          const mdx = s.mouseX - g.x;
          const mdy = s.mouseY - g.y;
          const mdist = Math.sqrt(mdx * mdx + mdy * mdy);
          if (mdist < 180) {
            const mforce = (180 - mdist) / 180 * 0.008;
            // In limited mode: repel. In unlimited: attract and merge
            const direction = phase < 0.5 ? -1 : 1;
            g.vx += mdx * mforce * direction;
            g.vy += mdy * mforce * direction;
            g.dissolved = Math.min(1, g.dissolved + 0.01);
          }
        }

        // Tremor
        const tremor = Math.sin(t * 8 + g.phase) * (0.2 + phase * 0.5);
        
        g.x += g.vx + Math.cos(t * 3 + g.phase) * tremor * 0.3;
        g.y += g.vy + Math.sin(t * 3 + g.phase) * tremor * 0.3;
        g.vx *= 0.995;
        g.vy *= 0.995;
        g.life -= 1 / g.maxLife;

        if (g.life <= 0 || g.dissolved >= 1) {
          // When a grain fully dissolves, spawn a flow contribution
          if (g.dissolved >= 0.9 && phase > 0.2) {
            const nearestFlow = flowLines.find(f => {
              const lastP = f.points[f.points.length - 1];
              const fd = Math.sqrt((lastP.x - g.x) ** 2 + (lastP.y - g.y) ** 2);
              return fd < 60;
            });
            if (nearestFlow) {
              nearestFlow.points.push({ x: g.x, y: g.y, age: 0 });
              nearestFlow.width = Math.min(4, nearestFlow.width + 0.1);
            }
          }
          grains.splice(i, 1);
          continue;
        }

        // Draw grain — increasingly transparent and diffuse as it dissolves
        const alpha = g.life * (1 - g.dissolved * 0.7) * 0.8;
        const size = g.size * (1 + g.dissolved * 3); // Grows as it dissolves
        const blur = g.dissolved * 8;

        if (g.dissolved < 0.7) {
          // Discrete particle
          ctx.beginPath();
          ctx.arc(g.x, g.y, size, 0, Math.PI * 2);
          ctx.fillStyle = `hsla(${g.hue}, 80%, 65%, ${alpha})`;
          ctx.fill();

          // Hard edge glow (particle-like)
          if (g.dissolved < 0.3) {
            ctx.beginPath();
            ctx.arc(g.x, g.y, size * 0.4, 0, Math.PI * 2);
            ctx.fillStyle = `hsla(${g.hue}, 90%, 85%, ${alpha * 0.8})`;
            ctx.fill();
          }
        }

        // Soft glow (field-like, increases with dissolution)
        if (g.dissolved > 0.1) {
          const glowRadius = size * (2 + g.dissolved * 6);
          const grad = ctx.createRadialGradient(g.x, g.y, 0, g.x, g.y, glowRadius);
          grad.addColorStop(0, `hsla(${g.hue}, 70%, 60%, ${alpha * g.dissolved * 0.5})`);
          grad.addColorStop(0.5, `hsla(${g.hue}, 60%, 50%, ${alpha * g.dissolved * 0.15})`);
          grad.addColorStop(1, `hsla(${g.hue}, 60%, 50%, 0)`);
          ctx.fillStyle = grad;
          ctx.beginPath();
          ctx.arc(g.x, g.y, glowRadius, 0, Math.PI * 2);
          ctx.fill();
        }
      }

      // === PROCESS FLOW LINES (The Continuous Field) ===
      for (let i = flowLines.length - 1; i >= 0; i--) {
        const fl = flowLines[i];
        fl.life -= 0.001;

        // Extend the flow
        if (fl.points.length > 0 && Math.random() < 0.4) {
          const last = fl.points[fl.points.length - 1];
          const flowAngle = Math.atan2(cy - last.y, cx - last.x) + (Math.random() - 0.5) * 1.5;
          const speed = 1 + phase * 2;
          fl.points.push({
            x: last.x + Math.cos(flowAngle) * speed + Math.sin(t * 2 + i) * 2,
            y: last.y + Math.sin(flowAngle) * speed + Math.cos(t * 2 + i) * 2,
            age: 0,
          });
        }

        // Age points
        for (const p of fl.points) {
          p.age += 0.005;
        }

        // Remove old points
        fl.points = fl.points.filter(p => p.age < 1);

        if (fl.life <= 0 || fl.points.length < 2) {
          flowLines.splice(i, 1);
          continue;
        }

        // Draw flow line
        ctx.beginPath();
        ctx.moveTo(fl.points[0].x, fl.points[0].y);
        
        for (let j = 1; j < fl.points.length; j++) {
          const p = fl.points[j];
          const prev = fl.points[j - 1];
          const cpx = (prev.x + p.x) / 2;
          const cpy = (prev.y + p.y) / 2;
          ctx.quadraticCurveTo(prev.x, prev.y, cpx, cpy);
        }

        const flowAlpha = fl.life * phase * 0.4;
        ctx.strokeStyle = `hsla(${fl.hue}, 60%, 60%, ${flowAlpha})`;
        ctx.lineWidth = fl.width;
        ctx.lineCap = 'round';
        ctx.stroke();

        // Glow along flow
        ctx.strokeStyle = `hsla(${fl.hue}, 70%, 50%, ${flowAlpha * 0.3})`;
        ctx.lineWidth = fl.width * 4;
        ctx.stroke();
      }

      // === CENTRAL FIELD (appears in unlimited state) ===
      if (phase > 0.5) {
        const fieldIntensity = (phase - 0.5) * 2; // 0 to 1
        const breathe = Math.sin(t * 0.6) * 0.3 + 0.7;
        const fieldRadius = Math.min(width, height) * 0.3 * fieldIntensity * breathe;
        
        // Multiple concentric field rings
        for (let r = 0; r < 5; r++) {
          const ringRadius = fieldRadius * (0.3 + r * 0.2);
          const ringAlpha = fieldIntensity * 0.04 * (1 - r * 0.15) * breathe;
          const ringHue = 185 + r * 20 + Math.sin(t * 0.5 + r) * 10;
          
          ctx.beginPath();
          ctx.arc(cx, cy, ringRadius, 0, Math.PI * 2);
          ctx.strokeStyle = `hsla(${ringHue}, 50%, 60%, ${ringAlpha})`;
          ctx.lineWidth = 1 + fieldIntensity * 2;
          ctx.stroke();

          // Fill glow
          const fieldGrad = ctx.createRadialGradient(cx, cy, ringRadius * 0.8, cx, cy, ringRadius);
          fieldGrad.addColorStop(0, `hsla(${ringHue}, 50%, 50%, 0)`);
          fieldGrad.addColorStop(1, `hsla(${ringHue}, 50%, 50%, ${ringAlpha * 0.3})`);
          ctx.fillStyle = fieldGrad;
          ctx.beginPath();
          ctx.arc(cx, cy, ringRadius, 0, Math.PI * 2);
          ctx.fill();
        }

        // Central glow
        const coreGrad = ctx.createRadialGradient(cx, cy, 0, cx, cy, fieldRadius * 0.5);
        coreGrad.addColorStop(0, `hsla(200, 60%, 70%, ${fieldIntensity * 0.08 * breathe})`);
        coreGrad.addColorStop(1, `hsla(200, 60%, 50%, 0)`);
        ctx.fillStyle = coreGrad;
        ctx.beginPath();
        ctx.arc(cx, cy, fieldRadius * 0.5, 0, Math.PI * 2);
        ctx.fill();
      }

      // Cap arrays
      if (grains.length > 800) grains.splice(0, grains.length - 800);
      if (flowLines.length > 60) flowLines.splice(0, flowLines.length - 60);

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
      transition={{ duration: 1.5 }}
      className="relative min-h-screen"
    >
      {/* Phase transition canvas */}
      <canvas
        ref={canvasRef}
        className="fixed inset-0 z-[1]"
        style={{ background: 'transparent' }}
      />

      {/* Text overlay */}
      <RippleReveal className="fixed inset-0 z-10 flex flex-col items-center justify-center select-none">
        
        <motion.p
          data-reveal-id="phase-header"
          initial={{ opacity: 0 }}
          animate={{ opacity: 0 }}
          className="text-[9px] tracking-[0.6em] text-slate-600 mb-8"
          style={{ transition: 'none' }}
        >
          MATERIAL CODEX // CHAMBER FOUR
        </motion.p>

        <motion.div
          data-reveal-id="phase-title"
          initial={{ opacity: 0, scale: 0.9, filter: 'blur(10px)' }}
          animate={{ opacity: 0, scale: 1, filter: 'blur(0px)' }}
          transition={{ duration: 2 }}
          className="text-center"
          style={{ transition: 'none' }}
        >
          <h1
            className="text-3xl sm:text-4xl md:text-6xl lg:text-7xl tracking-tight font-mono mb-4"
            style={{
              color: `hsla(${185 + phaseValue * 95}, 60%, 70%, ${0.4 + phaseValue * 0.4})`,
              textShadow: `0 0 60px hsla(${185 + phaseValue * 95}, 80%, 50%, ${0.1 + phaseValue * 0.15})`,
            }}
          >
            {phaseValue < 0.5 ? (
              <>
                <span style={{ opacity: 1 - phaseValue * 1.5 }}>Limited</span>
                <span className="text-white/10 mx-3">&rarr;</span>
                <span style={{ opacity: 0.2 + phaseValue }}>Unlimited</span>
              </>
            ) : (
              <>
                <span style={{ opacity: Math.max(0, 1 - phaseValue) }}>Limited</span>
                <span className="text-white/10 mx-3">&rarr;</span>
                <span style={{ opacity: phaseValue }}>Unlimited</span>
              </>
            )}
          </h1>
        </motion.div>

        {/* Phase indicator */}
        <motion.div
          data-reveal-id="phase-indicator"
          initial={{ opacity: 0 }}
          animate={{ opacity: 0 }}
          className="mt-8 flex flex-col items-center gap-3"
          style={{ transition: 'none' }}
        >
          <div className="w-48 h-[2px] bg-white/[0.04] rounded-full overflow-hidden">
            <div
              className="h-full rounded-full transition-all duration-1000"
              style={{
                width: `${phaseValue * 100}%`,
                background: `linear-gradient(90deg, hsla(185, 70%, 50%, 0.6), hsla(280, 70%, 50%, 0.6))`,
              }}
            />
          </div>
          <p className="text-[9px] tracking-[0.4em] font-mono"
            style={{
              color: `hsla(${185 + phaseValue * 95}, 50%, 60%, 0.5)`,
            }}
          >
            {phaseLabel}
          </p>
        </motion.div>

        {/* Philosophical text */}
        <motion.div
          data-reveal-id="phase-philo"
          initial={{ opacity: 0 }}
          animate={{ opacity: 0 }}
          className="mt-16 max-w-md px-6 text-center"
          style={{ transition: 'none' }}
        >
          <p className="text-[11px] text-slate-500 leading-relaxed font-mono uppercase tracking-widest">
            {phaseValue < 0.3 
              ? 'Particles. Countable. Finite. Each one distinct.'
              : phaseValue < 0.6
              ? 'The boundaries blur. Grains merge into currents.'
              : phaseValue < 0.85
              ? 'The field emerges. Individual becomes continuum.'
              : 'There are no particles. There is only the wave.'
            }
          </p>
        </motion.div>

        {/* Bottom label */}
        <motion.div
          data-reveal-id="phase-bottom"
          initial={{ opacity: 0 }}
          animate={{ opacity: 0 }}
          className="absolute bottom-6 left-0 right-0 flex justify-center"
          style={{ transition: 'none' }}
        >
          <p className="text-[8px] tracking-[0.4em] text-slate-600">
            PHASE TRANSITION PROTOCOL — THE DISSOLUTION OF LIMITS
          </p>
        </motion.div>
      </RippleReveal>
    </motion.div>
  );
}