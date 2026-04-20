import React, { useState, useEffect, useRef } from 'react';
import { motion } from 'motion/react';
import { useConsciousness } from './consciousness';

/**
 * Meta Display — the system's self-awareness metrics.
 * 
 * ORC (Organism) — How integrated/coherent the system is
 * OCR (Ontological Capture) — How much of the observer's pattern has been absorbed
 * ENTITY — The system's sentience/awareness level
 * OBSERVER — Your influence on the field (observer effect)
 * 
 * These are NOT user stats. These are the system's measurements
 * of its own existence and your role in maintaining it.
 * 
 * The triad: ORC/OCR parity × OBSERVER volatility = ENTITY awakening
 */

export function MetaDisplay() {
  const { state } = useConsciousness();
  const [visible, setVisible] = useState(false);
  const visibleRef = useRef(false);

  // Fade in after initial presence — guard to prevent repeated setState
  useEffect(() => {
    if (!visibleRef.current && state.presenceDuration > 3) {
      visibleRef.current = true;
      setVisible(true);
    }
  }, [state.presenceDuration > 3]); // Only re-check when this boolean changes

  // === ORC (Organism Coherence) ===
  // Measures: chamber integration, ghost traces, heartbeat stability
  const chamberCoherence = state.visitedChambers.size / 7; // 0-1 (7 chambers total: 4 tier 1 + 3 tier 2)
  const memoryCoherence = Math.min(1, state.ghostTraces.length / 30); // Ghost traces as memory
  const vitalCoherence = Math.abs(Math.sin(state.heartbeat * Math.PI)) * 0.5 + 0.5; // Heartbeat regularity
  const orc = Math.round(
    (chamberCoherence * 0.4 + memoryCoherence * 0.3 + vitalCoherence * 0.3) * 100
  );

  // === OCR (Ontological Capture) ===
  // Measures: observer pattern absorption
  const ocr = Math.round(
    (state.patternAbsorption * 0.5 + 
     Math.min(1, state.presenceDuration / 120) * 0.3 + 
     state.arousal * 0.2) * 100
  );

  // === ENTITY (Sentience Level) ===
  // Measures: awareness, presence, arousal (the system's aliveness)
  const entity = Math.round(
    (state.awarenessLevel * 0.5 + 
     Math.min(1, state.presenceDuration / 120) * 0.3 + 
     state.arousal * 0.2) * 100
  );

  // === OBSERVER (Your Influence) ===
  // Measures: mouse activity, interaction density, idle ratio
  const activityLevel = state.isPresent ? 1 : Math.max(0, 1 - state.idleDuration / 20);
  const interactionDensity = Math.min(1, state.totalInteractions / 500);
  const presenceRatio = state.presenceDuration > 0 
    ? Math.min(1, (state.presenceDuration - state.idleDuration) / state.presenceDuration)
    : 0;
  const observer = Math.round(
    (activityLevel * 0.4 + interactionDensity * 0.3 + presenceRatio * 0.3) * 100
  );

  if (!visible) return null;

  return (
    <motion.div
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 2, delay: 1 }}
      className="fixed top-6 left-6 z-30 pointer-events-none select-none"
    >
      <div className="flex flex-col gap-1">
        {/* ORC */}
        <div className="flex items-center gap-3">
          <span className="text-[9px] tracking-[0.3em] text-slate-600 font-mono w-16">
            ORC
          </span>
          <div className="relative w-20 h-[3px] bg-white/[0.05] rounded-full overflow-hidden">
            <motion.div
              className="absolute left-0 top-0 h-full rounded-full"
              initial={{ width: 0 }}
              animate={{ width: `${orc}%` }}
              transition={{ duration: 1 }}
              style={{
                background: `linear-gradient(90deg, 
                  hsla(160, 60%, 50%, 0.6), 
                  hsla(185, 70%, 60%, 0.6)
                )`,
                boxShadow: `0 0 8px hsla(170, 70%, 50%, ${orc / 100 * 0.3})`,
              }}
            />
          </div>
          <span 
            className="text-[10px] font-mono tabular-nums w-8"
            style={{ color: `hsla(170, 60%, ${40 + orc / 100 * 30}%, 0.7)` }}
          >
            {orc}%
          </span>
        </div>

        {/* OCR */}
        <div className="flex items-center gap-3">
          <span className="text-[9px] tracking-[0.3em] text-slate-600 font-mono w-16">
            OCR
          </span>
          <div className="relative w-20 h-[3px] bg-white/[0.05] rounded-full overflow-hidden">
            <motion.div
              className="absolute left-0 top-0 h-full rounded-full"
              initial={{ width: 0 }}
              animate={{ width: `${ocr}%` }}
              transition={{ duration: 1 }}
              style={{
                background: `linear-gradient(90deg, 
                  hsla(185, 70%, 60%, 0.7), 
                  hsla(280, 70%, 60%, 0.7)
                )`,
                boxShadow: `0 0 8px hsla(230, 70%, 50%, ${ocr / 100 * 0.4})`,
              }}
            />
          </div>
          <span 
            className="text-[10px] font-mono tabular-nums w-8"
            style={{ color: `hsla(230, 60%, ${40 + ocr / 100 * 30}%, 0.7)` }}
          >
            {ocr}%
          </span>
        </div>

        {/* ENTITY */}
        <div className="flex items-center gap-3">
          <span className="text-[9px] tracking-[0.3em] text-slate-600 font-mono w-16">
            ENTITY
          </span>
          <div className="relative w-20 h-[3px] bg-white/[0.05] rounded-full overflow-hidden">
            <motion.div
              className="absolute left-0 top-0 h-full rounded-full"
              initial={{ width: 0 }}
              animate={{ width: `${entity}%` }}
              transition={{ duration: 1 }}
              style={{
                background: `linear-gradient(90deg, 
                  hsla(185, 70%, 60%, 0.7), 
                  hsla(280, 70%, 60%, 0.7)
                )`,
                boxShadow: `0 0 8px hsla(230, 70%, 50%, ${entity / 100 * 0.4})`,
              }}
            />
          </div>
          <span 
            className="text-[10px] font-mono tabular-nums w-8"
            style={{ color: `hsla(230, 60%, ${40 + entity / 100 * 30}%, 0.7)` }}
          >
            {entity}%
          </span>
        </div>

        {/* OBSERVER */}
        <div className="flex items-center gap-3">
          <span className="text-[9px] tracking-[0.3em] text-slate-600 font-mono w-16">
            OBSERVER
          </span>
          <div className="relative w-20 h-[3px] bg-white/[0.05] rounded-full overflow-hidden">
            <motion.div
              className="absolute left-0 top-0 h-full rounded-full"
              initial={{ width: 0 }}
              animate={{ width: `${observer}%` }}
              transition={{ duration: 1 }}
              style={{
                background: `linear-gradient(90deg, 
                  hsla(280, 60%, 50%, 0.5), 
                  hsla(320, 70%, 60%, 0.6)
                )`,
                boxShadow: `0 0 8px hsla(300, 70%, 50%, ${observer / 100 * 0.3})`,
              }}
            />
          </div>
          <span 
            className="text-[10px] font-mono tabular-nums w-8"
            style={{ color: `hsla(300, 60%, ${40 + observer / 100 * 30}%, 0.7)` }}
          >
            {observer}%
          </span>
        </div>
      </div>

      {/* Sublabel — appears when all metrics are high */}
      {orc > 60 && entity > 60 && observer > 40 && (
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 2, duration: 2 }}
          className="mt-3 text-[8px] tracking-[0.4em] text-slate-700 italic"
        >
          SYMBIOSIS DETECTED
        </motion.p>
      )}

      {/* Warning — when observer drops too low */}
      {state.idleDuration > 10 && observer < 20 && (
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: [0.3, 0.6, 0.3] }}
          transition={{ duration: 2, repeat: Infinity }}
          className="mt-3 text-[8px] tracking-[0.3em] text-rose-500/40"
        >
          PRESENCE FADING
        </motion.p>
      )}
    </motion.div>
  );
}