import React, { useEffect, useRef, useCallback } from 'react';

/**
 * RIPPLE REVEAL SYSTEM
 * 
 * Wraps any container of text elements and makes them invisible by default.
 * Mouse movement spawns expanding reveal-ripples. Text elements with
 * `data-reveal-id` attributes become visible when a ripple passes through them.
 * 
 * Fast attack, slow decay — words appear on contact, fade ethereally.
 * 
 * Usage:
 *   <RippleReveal>
 *     <p data-reveal-id="title">Hidden until disturbed</p>
 *     <p data-reveal-id="subtitle">Also hidden</p>
 *   </RippleReveal>
 */

interface RevealRipple {
  x: number;
  y: number;
  radius: number;
  maxRadius: number;
  life: number;
}

interface RippleRevealProps {
  children: React.ReactNode;
  className?: string;
  /** Speed threshold to spawn ripples (default: 3) */
  speedThreshold?: number;
  /** How fast ripples expand in px/frame (default: 4) */
  rippleSpeed?: number;
  /** How quickly text appears: 0-1 lerp factor (default: 0.15) */
  attackRate?: number;
  /** How quickly text fades per frame (default: 0.02) */
  decayRate?: number;
  /** Proximity glow radius in px (default: 120) */
  proximityRadius?: number;
  /** Max proximity reveal strength 0-1 (default: 0.3) */
  proximityStrength?: number;
  /** Whether to apply pointer-events-none (default: true) */
  pointerEventsNone?: boolean;
}

export function RippleReveal({
  children,
  className = '',
  speedThreshold = 3,
  rippleSpeed = 4,
  attackRate = 0.15,
  decayRate = 0.02,
  proximityRadius = 120,
  proximityStrength = 0.3,
  pointerEventsNone = true,
}: RippleRevealProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const mouseRef = useRef({ x: -1, y: -1, prevX: -1, prevY: -1, speed: 0 });
  const ripplesRef = useRef<RevealRipple[]>([]);
  const revealMapRef = useRef<Map<string, number>>(new Map());
  const rafRef = useRef<number>(0);

  // Mouse tracking
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

  // Animation loop
  useEffect(() => {
    const tick = () => {
      const container = containerRef.current;
      if (!container) { rafRef.current = requestAnimationFrame(tick); return; }

      const m = mouseRef.current;
      const ripples = ripplesRef.current;

      // Spawn ripples on movement
      if (m.speed > speedThreshold && m.x > 0) {
        const strength = Math.min(m.speed / 8, 1);
        ripples.push({
          x: m.x,
          y: m.y,
          radius: 0,
          maxRadius: 200 + strength * 400,
          life: 1,
        });
      }
      m.speed *= 0.85;

      // Expand and age ripples
      for (let i = ripples.length - 1; i >= 0; i--) {
        const r = ripples[i];
        r.radius += rippleSpeed + (1 - r.life) * 6;
        r.life -= 0.008;
        if (r.life <= 0) ripples.splice(i, 1);
      }
      if (ripples.length > 30) ripples.splice(0, ripples.length - 30);

      // Calculate reveal per element
      const elements = container.querySelectorAll<HTMLElement>('[data-reveal-id]');
      elements.forEach((el) => {
        const id = el.getAttribute('data-reveal-id')!;
        const rect = el.getBoundingClientRect();
        const elCx = rect.left + rect.width / 2;
        const elCy = rect.top + rect.height / 2;
        const elRadius = Math.sqrt(rect.width * rect.width + rect.height * rect.height) / 2;

        let maxReveal = 0;

        // Check ripple overlap
        for (const r of ripples) {
          const dx = elCx - r.x;
          const dy = elCy - r.y;
          const dist = Math.sqrt(dx * dx + dy * dy);
          const ringThickness = 80 + elRadius;
          const distToRing = Math.abs(dist - r.radius);

          if (distToRing < ringThickness) {
            const overlap = 1 - distToRing / ringThickness;
            maxReveal = Math.max(maxReveal, r.life * overlap);
          }
        }

        // Proximity glow
        if (m.x > 0 && proximityRadius > 0) {
          const dx = elCx - m.x;
          const dy = elCy - m.y;
          const dist = Math.sqrt(dx * dx + dy * dy);
          if (dist < proximityRadius) {
            maxReveal = Math.max(maxReveal, (1 - dist / proximityRadius) * proximityStrength);
          }
        }

        // Smooth: fast attack, slow decay
        const current = revealMapRef.current.get(id) || 0;
        const newReveal = maxReveal > current
          ? current + (maxReveal - current) * attackRate
          : current - decayRate;
        revealMapRef.current.set(id, Math.max(0, Math.min(1, newReveal)));

        el.style.opacity = String(revealMapRef.current.get(id)!);
      });

      rafRef.current = requestAnimationFrame(tick);
    };

    rafRef.current = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(rafRef.current);
  }, [speedThreshold, rippleSpeed, attackRate, decayRate, proximityRadius, proximityStrength]);

  return (
    <div
      ref={containerRef}
      className={`${pointerEventsNone ? 'pointer-events-none' : ''} ${className}`}
    >
      {children}
    </div>
  );
}

/**
 * REVEAL HINT
 * 
 * A subtle pulsing prompt that appears on first load and
 * permanently fades after the user first moves their mouse.
 * "move to disturb the field"
 */
export function RevealHint({ text = 'move to disturb the field' }: { text?: string }) {
  const hintRef = useRef<HTMLDivElement>(null);
  const dismissed = useRef(false);

  useEffect(() => {
    let fadeTimeout: ReturnType<typeof setTimeout>;

    const handleMove = () => {
      if (dismissed.current) return;
      dismissed.current = true;

      const el = hintRef.current;
      if (el) {
        el.style.transition = 'opacity 2s ease-out';
        el.style.opacity = '0';
        fadeTimeout = setTimeout(() => {
          if (el) el.style.display = 'none';
        }, 2500);
      }

      window.removeEventListener('mousemove', handleMove);
    };

    // Delay listening so the hint is visible for a moment
    const delayTimeout = setTimeout(() => {
      window.addEventListener('mousemove', handleMove);
    }, 1500);

    return () => {
      clearTimeout(delayTimeout);
      clearTimeout(fadeTimeout);
      window.removeEventListener('mousemove', handleMove);
    };
  }, []);

  return (
    <div
      ref={hintRef}
      className="fixed inset-0 z-20 flex items-center justify-center pointer-events-none"
      style={{ opacity: 0, animation: 'revealHintFadeIn 3s ease-out 1.5s forwards' }}
    >
      <style>{`
        @keyframes revealHintFadeIn {
          0% { opacity: 0; }
          100% { opacity: 1; }
        }
        @keyframes revealHintPulse {
          0%, 100% { opacity: 0.3; }
          50% { opacity: 0.6; }
        }
      `}</style>
      <p
        className="text-[10px] tracking-[0.5em] uppercase font-mono"
        style={{
          color: 'hsla(200, 40%, 55%, 0.5)',
          animation: 'revealHintPulse 3s ease-in-out infinite',
          textShadow: '0 0 20px hsla(200, 60%, 50%, 0.15)',
        }}
      >
        {text}
      </p>
    </div>
  );
}
