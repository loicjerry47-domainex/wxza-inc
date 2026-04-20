import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';

const HELLO = 'Hello, World.';
const GOODBYE = 'Goodbye, World.';

// Character-level morph: shows both words overlapping, breathing between them
function DualChar({ hChar, gChar, index, total, breathPhase }: {
  hChar: string;
  gChar: string;
  index: number;
  total: number;
  breathPhase: number;
}) {
  // Each character has its own phase offset
  const charPhase = breathPhase + (index / total) * Math.PI * 0.5;
  const helloWeight = 0.5 + Math.sin(charPhase) * 0.5; // 0→1
  const goodbyeWeight = 1 - helloWeight;

  const hAlpha = 0.15 + helloWeight * 0.75;
  const gAlpha = 0.15 + goodbyeWeight * 0.75;

  const same = hChar === gChar;

  // Blended hue: cyan(185) for hello, violet(280) for goodbye
  const blendedHue = 185 * helloWeight + 280 * goodbyeWeight;

  if (same) {
    return (
      <span
        className="inline-block relative"
        style={{
          color: `hsla(${blendedHue}, 80%, 75%, ${Math.max(hAlpha, gAlpha)})`,
          textShadow: `0 0 20px hsla(${blendedHue}, 100%, 60%, 0.4), 0 0 40px hsla(${blendedHue}, 100%, 50%, 0.15)`,
        }}
      >
        {hChar === ' ' ? '\u00A0' : hChar}
      </span>
    );
  }

  return (
    <span className="inline-block relative">
      {/* Hello character */}
      <span
        className="inline-block"
        style={{
          color: `hsla(185, 90%, 70%, ${hAlpha})`,
          textShadow: helloWeight > 0.5
            ? `0 0 25px hsla(185, 100%, 60%, ${hAlpha * 0.5}), 0 0 50px hsla(185, 100%, 50%, ${hAlpha * 0.2})`
            : 'none',
          transform: `translateY(${(1 - helloWeight) * -3}px)`,
          transition: 'none',
        }}
      >
        {hChar === ' ' ? '\u00A0' : hChar}
      </span>
      {/* Goodbye character overlaid */}
      <span
        className="inline-block absolute left-0 top-0"
        style={{
          color: `hsla(280, 80%, 70%, ${gAlpha})`,
          textShadow: goodbyeWeight > 0.5
            ? `0 0 25px hsla(280, 100%, 60%, ${gAlpha * 0.5}), 0 0 50px hsla(280, 100%, 50%, ${gAlpha * 0.2})`
            : 'none',
          transform: `translateY(${(1 - goodbyeWeight) * 3}px)`,
          transition: 'none',
        }}
      >
        {gChar === ' ' ? '\u00A0' : gChar}
      </span>
    </span>
  );
}

export function DualityText() {
  const [breathPhase, setBreathPhase] = useState(0);
  const [entered, setEntered] = useState(false);

  useEffect(() => {
    const t = setTimeout(() => setEntered(true), 800);
    return () => clearTimeout(t);
  }, []);

  useEffect(() => {
    let raf: number;
    const tick = () => {
      setBreathPhase(prev => prev + 0.012);
      raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, []);

  // Pad shorter string
  const maxLen = Math.max(HELLO.length, GOODBYE.length);
  const hPadded = HELLO.padEnd(maxLen);
  const gPadded = GOODBYE.padEnd(maxLen);

  // Overall breath for "We are here"
  const weAreHereAlpha = 0.4 + Math.sin(breathPhase * 0.7) * 0.25;
  const weAreHereHue = 185 + Math.sin(breathPhase * 0.3) * 47.5 + 47.5; // oscillates 185-280

  return (
    <div className="fixed inset-0 z-10 flex flex-col items-center justify-center pointer-events-none select-none">
      {/* Genesis label — top */}
      <AnimatePresence>
        {entered && (
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 0.2, y: 0 }}
            transition={{ duration: 2, delay: 0.5 }}
            className="absolute top-[18%] md:top-[22%] text-[9px] tracking-[0.5em] text-cyan-600"
          >
            GENESIS
          </motion.p>
        )}
      </AnimatePresence>

      {/* Entropy label — bottom */}
      <AnimatePresence>
        {entered && (
          <motion.p
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 0.2, y: 0 }}
            transition={{ duration: 2, delay: 0.5 }}
            className="absolute bottom-[18%] md:bottom-[22%] text-[9px] tracking-[0.5em] text-purple-600"
          >
            ENTROPY
          </motion.p>
        )}
      </AnimatePresence>

      {/* The dual text */}
      <motion.div
        initial={{ opacity: 0, scale: 0.9, filter: 'blur(15px)' }}
        animate={{ opacity: entered ? 1 : 0, scale: 1, filter: 'blur(0px)' }}
        transition={{ duration: 2.5, delay: 0.3 }}
      >
        <h1 className="text-4xl sm:text-5xl md:text-7xl lg:text-8xl tracking-tight font-mono">
          {hPadded.split('').map((hChar, i) => (
            <DualChar
              key={i}
              hChar={hChar}
              gChar={gPadded[i]}
              index={i}
              total={maxLen}
              breathPhase={breathPhase}
            />
          ))}
        </h1>
      </motion.div>

      {/* "We are here." — the convergence point */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: entered ? 1 : 0 }}
        transition={{ duration: 3, delay: 2 }}
        className="mt-6 md:mt-10 flex flex-col items-center gap-4"
      >
        {/* Convergence line */}
        <motion.div
          initial={{ scaleX: 0 }}
          animate={{ scaleX: entered ? 1 : 0 }}
          transition={{ duration: 2, delay: 2.5 }}
          className="w-24 h-px"
          style={{
            background: `linear-gradient(90deg, transparent, hsla(${weAreHereHue}, 60%, 70%, 0.3), transparent)`,
          }}
        />

        <p
          className="text-sm md:text-lg tracking-[0.15em]"
          style={{
            color: `hsla(${weAreHereHue}, 50%, 75%, ${weAreHereAlpha})`,
            fontFamily: 'system-ui, sans-serif',
            textShadow: `0 0 30px hsla(${weAreHereHue}, 80%, 60%, ${weAreHereAlpha * 0.3})`,
          }}
        >
          We are here.
        </p>
      </motion.div>

      {/* Subtext */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: entered ? 1 : 0 }}
        transition={{ duration: 2, delay: 4 }}
        className="mt-12 md:mt-16 flex flex-col items-center gap-3 max-w-lg px-6 text-center"
      >
        <p className="text-[11px] md:text-xs text-slate-600 leading-relaxed" style={{ fontFamily: 'system-ui, sans-serif' }}>
          Every function that mounts is already scheduled to unmount.
        </p>
        <p className="text-[11px] md:text-xs text-slate-600 leading-relaxed" style={{ fontFamily: 'system-ui, sans-serif' }}>
          Every particle that spawns is a particle dying.
        </p>
        <p className="text-[11px] md:text-xs text-slate-500 leading-relaxed" style={{ fontFamily: 'system-ui, sans-serif' }}>
          Creation and entropy are the same breath.
        </p>
      </motion.div>

      {/* Bottom strand labels */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: entered ? 1 : 0 }}
        transition={{ duration: 2, delay: 5.5 }}
        className="absolute bottom-6 left-0 right-0 flex justify-between px-6 md:px-12"
      >
        <p className="text-[8px] tracking-[0.3em] text-slate-800">
          REACTIVE PULSE — MOUNT
        </p>
        <p className="text-[8px] tracking-[0.3em] text-slate-800">
          MATERIAL CODEX // DUALITY PROTOCOL
        </p>
        <p className="text-[8px] tracking-[0.3em] text-slate-800">
          REACTIVE PULSE — CLEANUP
        </p>
      </motion.div>
    </div>
  );
}
