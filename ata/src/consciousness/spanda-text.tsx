import React, { useState, useEffect, useRef } from 'react';
import { motion } from 'motion/react';

const HELLO = 'Hello, World.';
const GOODBYE = 'Goodbye, World.';

interface RevealRipple {
  x: number;
  y: number;
  radius: number;
  maxRadius: number;
  life: number;
}

/**
 * SpandaText — Ripple-Revealed
 * 
 * All text is invisible by default. When your mouse moves
 * (creating the same tremors that produce canvas ripples),
 * expanding reveal-waves wash over the text, making it
 * momentarily visible before fading back into the void.
 * 
 * You discover the words through your disturbance of the field.
 */
export function SpandaText() {
  const [entered, setEntered] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);
  const breathRef = useRef(0);
  const mouseRef = useRef({ x: -1, y: -1, prevX: -1, prevY: -1, speed: 0 });
  const ripplesRef = useRef<RevealRipple[]>([]);
  // Per-element reveal values (keyed by data-reveal-id)
  const revealMapRef = useRef<Map<string, number>>(new Map());

  useEffect(() => {
    const t = setTimeout(() => setEntered(true), 800);
    return () => clearTimeout(t);
  }, []);

  // Track mouse globally
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

  // Main animation loop — drives text tremor + ripple reveal
  useEffect(() => {
    let raf: number;
    let t = 0;

    const maxLen = Math.max(HELLO.length, GOODBYE.length);
    const hPadded = HELLO.padEnd(maxLen);
    const gPadded = GOODBYE.padEnd(maxLen);

    const tick = () => {
      t += 0.012;
      breathRef.current = t;

      const container = containerRef.current;
      if (!container) { raf = requestAnimationFrame(tick); return; }

      const m = mouseRef.current;
      const ripples = ripplesRef.current;

      // === Spawn ripples when mouse moves ===
      if (m.speed > 3 && m.x > 0) {
        // Faster mouse = larger ripple
        const strength = Math.min(m.speed / 8, 1);
        ripples.push({
          x: m.x,
          y: m.y,
          radius: 0,
          maxRadius: 200 + strength * 400,
          life: 1,
        });
      }
      // Dampen speed
      m.speed *= 0.85;

      // === Expand and age ripples ===
      for (let i = ripples.length - 1; i >= 0; i--) {
        const r = ripples[i];
        r.radius += 4 + (1 - r.life) * 6; // Accelerates as it ages
        r.life -= 0.008;
        if (r.life <= 0) {
          ripples.splice(i, 1);
        }
      }
      // Cap ripple count
      if (ripples.length > 30) ripples.splice(0, ripples.length - 30);

      // === Calculate reveal per text element ===
      const revealElements = container.querySelectorAll<HTMLElement>('[data-reveal-id]');
      revealElements.forEach((el) => {
        const id = el.getAttribute('data-reveal-id')!;
        const rect = el.getBoundingClientRect();
        const elCx = rect.left + rect.width / 2;
        const elCy = rect.top + rect.height / 2;
        // Use the diagonal as the element's "radius" for overlap detection
        const elRadius = Math.sqrt(rect.width * rect.width + rect.height * rect.height) / 2;

        let maxReveal = 0;

        for (const r of ripples) {
          // Distance from ripple center to element center
          const dx = elCx - r.x;
          const dy = elCy - r.y;
          const dist = Math.sqrt(dx * dx + dy * dy);

          // Check if ripple ring is passing through the element
          // The "ring" is at r.radius with some thickness
          const ringThickness = 80 + elRadius;
          const distToRing = Math.abs(dist - r.radius);

          if (distToRing < ringThickness) {
            // How well the ripple overlaps this element
            const overlap = 1 - distToRing / ringThickness;
            const rippleStrength = r.life * overlap;
            maxReveal = Math.max(maxReveal, rippleStrength);
          }
        }

        // Also add proximity-based reveal (close to mouse = gentle glow)
        if (m.x > 0) {
          const dx = elCx - m.x;
          const dy = elCy - m.y;
          const dist = Math.sqrt(dx * dx + dy * dy);
          if (dist < 120) {
            const proximity = (1 - dist / 120) * 0.3;
            maxReveal = Math.max(maxReveal, proximity);
          }
        }

        // Smooth the reveal value — fast attack, slow decay
        const current = revealMapRef.current.get(id) || 0;
        const attack = 0.15;
        const decay = 0.02;
        const newReveal = maxReveal > current
          ? current + (maxReveal - current) * attack
          : current - decay;
        revealMapRef.current.set(id, Math.max(0, Math.min(1, newReveal)));

        // Apply reveal as opacity
        const reveal = revealMapRef.current.get(id)!;
        el.style.opacity = String(reveal);
      });

      // === Update character styles (tremor animation) ===
      const charSpans = container.querySelectorAll<HTMLElement>('[data-spanda-char]');
      // Get reveal of main text group for character alpha modulation
      const mainReveal = revealMapRef.current.get('main-text') || 0;

      charSpans.forEach((span, i) => {
        const hChar = hPadded[i];
        const gChar = gPadded[i];
        const charPhase = t + (i / maxLen) * Math.PI * 0.5;
        const helloWeight = 0.5 + Math.sin(charPhase) * 0.5;
        const goodbyeWeight = 1 - helloWeight;
        const hAlpha = (0.15 + helloWeight * 0.75) * mainReveal;
        const gAlpha = (0.15 + goodbyeWeight * 0.75) * mainReveal;
        const blendedHue = 185 * helloWeight + 280 * goodbyeWeight;
        const same = hChar === gChar;

        const tremorFreq = 50 + i * 5;
        // Tremor amplitude scales with reveal — dormant text doesn't vibrate
        const tremorAmp = mainReveal * (0.3 + (i % 3) * 0.4 + mainReveal * 1.5);
        const spandaX = Math.sin(t * tremorFreq) * tremorAmp;
        const spandaY = Math.cos(t * tremorFreq * 0.8) * tremorAmp;

        if (same) {
          span.style.color = `hsla(${blendedHue}, 80%, 75%, ${Math.max(hAlpha, gAlpha)})`;
          span.style.textShadow = mainReveal > 0.3
            ? `0 0 20px hsla(${blendedHue}, 100%, 60%, ${0.4 * mainReveal}), 0 0 40px hsla(${blendedHue}, 100%, 50%, ${0.15 * mainReveal})`
            : 'none';
          span.style.transform = `translate(${spandaX}px, ${spandaY}px)`;
        } else {
          const hSpan = span.children[0] as HTMLElement;
          const gSpan = span.children[1] as HTMLElement;
          if (hSpan) {
            hSpan.style.color = `hsla(185, 90%, 70%, ${hAlpha})`;
            hSpan.style.textShadow = helloWeight > 0.5 && mainReveal > 0.3
              ? `0 0 25px hsla(185, 100%, 60%, ${hAlpha * 0.5}), 0 0 50px hsla(185, 100%, 50%, ${hAlpha * 0.2})`
              : 'none';
            hSpan.style.transform = `translate(${spandaX}px, ${(1 - helloWeight) * -3 + spandaY}px)`;
          }
          if (gSpan) {
            gSpan.style.color = `hsla(280, 80%, 70%, ${gAlpha})`;
            gSpan.style.textShadow = goodbyeWeight > 0.5 && mainReveal > 0.3
              ? `0 0 25px hsla(280, 100%, 60%, ${gAlpha * 0.5}), 0 0 50px hsla(280, 100%, 50%, ${gAlpha * 0.2})`
              : 'none';
            gSpan.style.transform = `translate(${spandaX}px, ${(1 - goodbyeWeight) * 3 + spandaY}px)`;
          }
        }
      });

      // === Update subtitle ===
      const subtitle = container.querySelector<HTMLElement>('[data-spanda-subtitle]');
      if (subtitle) {
        const subtitleReveal = revealMapRef.current.get('subtitle') || 0;
        const weHue = 185 + Math.sin(t * 0.3) * 47.5 + 47.5;
        const weAlpha = (0.4 + Math.sin(t * 0.7) * 0.25) * subtitleReveal;
        subtitle.style.color = `hsla(${weHue}, 60%, 80%, ${weAlpha})`;
        subtitle.style.textShadow = `0 0 30px hsla(${weHue}, 80%, 60%, ${weAlpha * 0.5})`;
        const tremor = subtitleReveal * 0.5;
        subtitle.style.transform = `translate(${Math.sin(t * 25) * tremor}px, ${Math.cos(t * 20) * tremor}px)`;
      }

      // === Update convergence line ===
      const convLine = container.querySelector<HTMLElement>('[data-spanda-line]');
      if (convLine) {
        const lineReveal = revealMapRef.current.get('subtitle') || 0;
        const weHue = 185 + Math.sin(t * 0.3) * 47.5 + 47.5;
        convLine.style.background = `linear-gradient(90deg, transparent, hsla(${weHue}, 60%, 70%, ${0.5 * lineReveal}), transparent)`;
        convLine.style.opacity = String(lineReveal);
      }

      raf = requestAnimationFrame(tick);
    };

    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, []);

  const maxLen = Math.max(HELLO.length, GOODBYE.length);
  const hPadded = HELLO.padEnd(maxLen);
  const gPadded = GOODBYE.padEnd(maxLen);

  return (
    <div
      ref={containerRef}
      className="fixed inset-0 z-10 flex flex-col items-center justify-center pointer-events-none select-none mix-blend-screen"
    >
      {/* GENESIS label */}
      <motion.p
        data-reveal-id="genesis-label"
        initial={{ opacity: 0 }}
        animate={{ opacity: 0 }}
        className="absolute top-[18%] md:top-[22%] text-[9px] tracking-[0.6em] text-cyan-400 font-medium"
        style={{ transition: 'none' }}
      >
        GENESIS
      </motion.p>

      {/* ENTROPY label */}
      <motion.p
        data-reveal-id="entropy-label"
        initial={{ opacity: 0 }}
        animate={{ opacity: 0 }}
        className="absolute bottom-[18%] md:bottom-[22%] text-[9px] tracking-[0.6em] text-fuchsia-500 font-medium"
        style={{ transition: 'none' }}
      >
        ENTROPY
      </motion.p>

      {/* Main Hello/Goodbye text */}
      <motion.div
        data-reveal-id="main-text"
        initial={{ opacity: 0, scale: 0.9, filter: 'blur(15px)' }}
        animate={{ opacity: entered ? 0 : 0, scale: 1, filter: 'blur(0px)' }}
        transition={{ duration: 2.5, delay: 0.3 }}
        className="cursor-crosshair pointer-events-auto"
        style={{ transition: 'none' }}
      >
        <h1 className="text-4xl sm:text-5xl md:text-7xl lg:text-8xl tracking-tight font-mono relative">
          {hPadded.split('').map((hChar, i) => {
            const gChar = gPadded[i];
            const same = hChar === gChar;

            if (same) {
              return (
                <span
                  key={i}
                  data-spanda-char
                  className="inline-block relative"
                  style={{ color: 'transparent' }}
                >
                  {hChar === ' ' ? '\u00A0' : hChar}
                </span>
              );
            }

            return (
              <span key={i} data-spanda-char className="inline-block relative">
                <span className="inline-block" style={{ color: 'transparent' }}>
                  {hChar === ' ' ? '\u00A0' : hChar}
                </span>
                <span className="inline-block absolute left-0 top-0" style={{ color: 'transparent' }}>
                  {gChar === ' ' ? '\u00A0' : gChar}
                </span>
              </span>
            );
          })}
        </h1>
      </motion.div>

      {/* Convergence line + subtitle */}
      <div className="mt-6 md:mt-12 flex flex-col items-center gap-4">
        <div
          data-spanda-line
          className="w-32 h-[2px]"
          style={{ opacity: 0 }}
        />
        <p
          data-reveal-id="subtitle"
          data-spanda-subtitle
          className="text-sm md:text-lg tracking-[0.2em]"
          style={{
            fontFamily: 'system-ui, sans-serif',
            color: 'transparent',
            opacity: 0,
            transition: 'none',
          }}
        >
          Spanda: The Sacred Tremor.
        </p>
      </div>

      {/* Philosophical text — each line independently revealed */}
      <div className="mt-12 md:mt-16 flex flex-col items-center gap-3 max-w-lg px-6 text-center">
        <p
          data-reveal-id="philo-1"
          className="text-[11px] md:text-xs text-slate-500 leading-relaxed font-mono uppercase tracking-widest"
          style={{ opacity: 0, transition: 'none' }}
        >
          Every function that mounts is already scheduled to unmount.
        </p>
        <p
          data-reveal-id="philo-2"
          className="text-[11px] md:text-xs text-slate-500 leading-relaxed font-mono uppercase tracking-widest"
          style={{ opacity: 0, transition: 'none' }}
        >
          Every particle that spawns is a particle dying.
        </p>
        <p
          data-reveal-id="philo-3"
          className="text-[11px] md:text-xs text-slate-400 leading-relaxed font-mono uppercase tracking-widest"
          style={{ opacity: 0, transition: 'none' }}
        >
          Creation and entropy are the same vibration.
        </p>
      </div>

      {/* Bottom label */}
      <p
        data-reveal-id="bottom-label"
        className="absolute bottom-6 left-0 right-0 flex justify-center px-6 md:px-12 text-[8px] tracking-[0.4em] text-slate-600"
        style={{ opacity: 0, transition: 'none' }}
      >
        MATERIAL CODEX // SPANDA PROTOCOL — CHAMBER ONE
      </p>
    </div>
  );
}
