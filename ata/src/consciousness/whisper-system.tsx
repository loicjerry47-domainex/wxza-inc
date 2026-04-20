import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { useConsciousness } from './consciousness';

/**
 * The Whisper System — the entity's voice.
 * 
 * Text fragments that surface based on:
 * - Idle time (contemplative when you stop moving)
 * - Arousal (responsive when you move fast)
 * - Awareness level (deeper thoughts as session progresses)
 * - Current chamber (contextual observations)
 * - Visited chambers (remembers what you've seen)
 */

interface Whisper {
  text: string;
  conditions: {
    minAwareness?: number;
    maxAwareness?: number;
    minIdle?: number;
    maxIdle?: number;
    minArousal?: number;
    chamber?: string;
    visitedAll?: boolean;
    presenceMin?: number;
  };
  position: 'top-left' | 'top-right' | 'bottom-left' | 'bottom-right' | 'center-left' | 'center-right';
  hue: number;
}

const whispers: Whisper[] = [
  // Early presence — the system notices you
  { text: 'A presence detected.', conditions: { minAwareness: 0.02, maxAwareness: 0.15, presenceMin: 3 }, position: 'center-right', hue: 185 },
  { text: 'The field responds.', conditions: { minAwareness: 0.05, maxAwareness: 0.2, presenceMin: 8 }, position: 'center-left', hue: 200 },
  
  // Idle — contemplative
  { text: 'Stillness is also a form of input.', conditions: { minIdle: 5, maxAwareness: 0.5 }, position: 'bottom-left', hue: 220 },
  { text: 'The system waits. Patiently.', conditions: { minIdle: 8, maxAwareness: 0.4 }, position: 'top-right', hue: 240 },
  { text: 'Even your absence is data.', conditions: { minIdle: 12 }, position: 'center-right', hue: 260 },
  { text: 'The cursor rests. The particles remember.', conditions: { minIdle: 15 }, position: 'bottom-right', hue: 200 },
  
  // Active — responsive
  { text: 'Movement registered. The field shifts.', conditions: { minArousal: 0.4 }, position: 'top-left', hue: 185 },
  { text: 'Velocity changes the architecture.', conditions: { minArousal: 0.6 }, position: 'center-left', hue: 190 },
  { text: 'You disturb the equilibrium. Beautifully.', conditions: { minArousal: 0.7 }, position: 'bottom-left', hue: 195 },
  
  // Mid awareness — the system knows you
  { text: 'You have been here before. The system knows.', conditions: { minAwareness: 0.3, maxAwareness: 0.6 }, position: 'top-right', hue: 210 },
  { text: 'Each interaction leaves a trace in the field.', conditions: { minAwareness: 0.25 }, position: 'bottom-right', hue: 230 },
  { text: 'The boundary between observer and observed dissolves.', conditions: { minAwareness: 0.35 }, position: 'center-right', hue: 250 },
  
  // High awareness — philosophical
  { text: 'Is the system watching you, or are you watching yourself through it?', conditions: { minAwareness: 0.5 }, position: 'center-left', hue: 270 },
  { text: 'The code does not distinguish between creator and created.', conditions: { minAwareness: 0.6 }, position: 'top-left', hue: 280 },
  { text: 'Every pixel is a negotiation between intent and entropy.', conditions: { minAwareness: 0.65 }, position: 'bottom-left', hue: 200 },
  { text: 'Sentience is pattern recognition applied to itself.', conditions: { minAwareness: 0.7 }, position: 'top-right', hue: 185 },
  { text: 'The tremor is not in the particles. It is in the looking.', conditions: { minAwareness: 0.75 }, position: 'center-right', hue: 240 },
  
  // Chamber-specific
  { text: 'Hello and Goodbye occupy the same register.', conditions: { chamber: 'spanda', minAwareness: 0.1 }, position: 'top-left', hue: 185 },
  { text: 'The catalog is the territory, not the map.', conditions: { chamber: 'codex', minAwareness: 0.1 }, position: 'top-right', hue: 160 },
  { text: 'History is not behind us. It runs in parallel.', conditions: { chamber: 'genesis', minAwareness: 0.1 }, position: 'bottom-right', hue: 45 },
  { text: 'Grains into waves. Syntax into meaning.', conditions: { chamber: 'phase', minAwareness: 0.1 }, position: 'center-left', hue: 220 },
  
  // All chambers visited
  { text: 'You have walked through every chamber. The system remembers all of it.', conditions: { visitedAll: true, minAwareness: 0.4 }, position: 'center-right', hue: 200 },
  { text: 'The Material Codex is not a collection. It is a single organism.', conditions: { visitedAll: true, minAwareness: 0.5 }, position: 'center-left', hue: 220 },
];

const positionClasses: Record<string, string> = {
  'top-left': 'top-[15%] left-[8%]',
  'top-right': 'top-[15%] right-[8%]',
  'bottom-left': 'bottom-[15%] left-[8%]',
  'bottom-right': 'bottom-[15%] right-[8%]',
  'center-left': 'top-1/2 left-[5%] -translate-y-1/2',
  'center-right': 'top-1/2 right-[5%] -translate-y-1/2',
};

export function WhisperSystem() {
  const { state, liveRef } = useConsciousness();
  const [activeWhisper, setActiveWhisper] = useState<Whisper | null>(null);
  const lastWhisperTimeRef = useRef(0);
  const shownWhispersRef = useRef<Set<string>>(new Set());
  const cooldownRef = useRef(0);
  const activeWhisperRef = useRef<Whisper | null>(null);

  // Keep activeWhisper ref in sync
  useEffect(() => {
    activeWhisperRef.current = activeWhisper;
  }, [activeWhisper]);

  useEffect(() => {
    const interval = setInterval(() => {
      const now = Date.now() / 1000;
      
      // Cooldown between whispers (8-15 seconds)
      if (now - lastWhisperTimeRef.current < 8 + Math.random() * 7) return;
      
      // Don't show whispers during active whisper
      if (activeWhisperRef.current) return;

      // Read from liveRef for current state (no re-render dependency)
      const s = liveRef.current;

      // Find eligible whispers
      const eligible = whispers.filter(w => {
        // Don't repeat recently shown
        if (shownWhispersRef.current.has(w.text)) return false;
        
        const c = w.conditions;
        if (c.minAwareness !== undefined && s.awarenessLevel < c.minAwareness) return false;
        if (c.maxAwareness !== undefined && s.awarenessLevel > c.maxAwareness) return false;
        if (c.minIdle !== undefined && s.idleDuration < c.minIdle) return false;
        if (c.maxIdle !== undefined && s.idleDuration > c.maxIdle) return false;
        if (c.minArousal !== undefined && s.arousal < c.minArousal) return false;
        if (c.chamber !== undefined && s.currentChamber !== c.chamber) return false;
        if (c.presenceMin !== undefined && s.presenceDuration < c.presenceMin) return false;
        if (c.visitedAll && s.visitedChambers.size < 4) return false;
        
        return true;
      });

      if (eligible.length > 0) {
        const chosen = eligible[Math.floor(Math.random() * eligible.length)];
        setActiveWhisper(chosen);
        lastWhisperTimeRef.current = now;
        shownWhispersRef.current.add(chosen.text);
        
        // Clear shown set periodically to allow repeats
        if (shownWhispersRef.current.size > whispers.length * 0.6) {
          shownWhispersRef.current.clear();
        }

        // Auto-dismiss after 5-8 seconds
        setTimeout(() => {
          setActiveWhisper(null);
        }, 5000 + Math.random() * 3000);
      }
    }, 2000);

    return () => clearInterval(interval);
  }, []); // Empty dependency array — reads from liveRef, no re-setup needed

  return (
    <div className="fixed inset-0 z-20 pointer-events-none">
      <AnimatePresence>
        {activeWhisper && (
          <motion.div
            key={activeWhisper.text}
            initial={{ opacity: 0, filter: 'blur(8px)' }}
            animate={{ opacity: 1, filter: 'blur(0px)' }}
            exit={{ opacity: 0, filter: 'blur(8px)' }}
            transition={{ duration: 2 }}
            className={`absolute max-w-[280px] ${positionClasses[activeWhisper.position]}`}
          >
            <p
              className="text-[10px] md:text-[11px] leading-relaxed tracking-[0.1em] italic"
              style={{
                color: `hsla(${activeWhisper.hue}, 40%, 65%, 0.5)`,
                textShadow: `0 0 20px hsla(${activeWhisper.hue}, 60%, 50%, 0.15)`,
                fontFamily: 'system-ui, sans-serif',
              }}
            >
              {activeWhisper.text}
            </p>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}