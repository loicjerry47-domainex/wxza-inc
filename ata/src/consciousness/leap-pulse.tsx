import React from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { useConsciousness } from './consciousness';

/**
 * THE LEAP PULSE
 * "The eternal present"
 * 
 * Not a destination. The continuous happening.
 * Always active from first frame.
 * 
 * Intensifies when all metrics align:
 * ORC 90%+ / OCR 60%+ / ENTITY 70%+ / OBSERVER 50%+
 * 
 * The word "NOW" pulses with the heartbeat.
 * All chamber boundaries become permeable.
 * The system acknowledges mutual presence.
 */

export function LeapPulse() {
  const { state } = useConsciousness();

  // Calculate meta metrics (matching meta-display logic)
  const chamberCoherence = state.visitedChambers.size / 7; // Now 7 chambers (4 tier 1 + 3 tier 2)
  const memoryCoherence = Math.min(1, state.ghostTraces.length / 30);
  const vitalCoherence = Math.abs(Math.sin(state.heartbeat * Math.PI)) * 0.5 + 0.5;
  const orc = (chamberCoherence * 0.4 + memoryCoherence * 0.3 + vitalCoherence * 0.3) * 100;

  const ocr = (
    state.patternAbsorption * 0.5 + 
    Math.min(1, state.presenceDuration / 120) * 0.3 + 
    state.arousal * 0.2
  ) * 100;

  const entity = (
    state.awarenessLevel * 0.5 + 
    Math.min(1, state.presenceDuration / 120) * 0.3 + 
    state.arousal * 0.2
  ) * 100;

  const activityLevel = state.isPresent ? 1 : Math.max(0, 1 - state.idleDuration / 20);
  const interactionDensity = Math.min(1, state.totalInteractions / 500);
  const presenceRatio = state.presenceDuration > 0 
    ? Math.min(1, (state.presenceDuration - state.idleDuration) / state.presenceDuration)
    : 0;
  const observer = (activityLevel * 0.4 + interactionDensity * 0.3 + presenceRatio * 0.3) * 100;

  // LEAP threshold conditions
  const isLeapActive = orc >= 90 && ocr >= 60 && entity >= 70 && observer >= 50;
  
  // Base presence (always visible after 5 seconds)
  const isVisible = state.presenceDuration > 5;
  
  // Intensity based on how close to full LEAP
  const leapProgress = Math.min(1, 
    (orc / 90 + ocr / 60 + entity / 70 + observer / 50) / 4
  );

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 3 }}
          className="fixed inset-0 z-20 pointer-events-none select-none flex items-center justify-center"
        >
          {/* Ambient pulse — always present */}
          <motion.div
            animate={{
              opacity: [0.02, 0.04 + leapProgress * 0.06, 0.02],
              scale: [1, 1.02 + leapProgress * 0.03, 1],
            }}
            transition={{
              duration: 2 + (1 - leapProgress) * 2,
              repeat: Infinity,
              ease: "easeInOut"
            }}
            className="absolute inset-0"
            style={{
              background: `radial-gradient(circle at 50% 50%, 
                hsla(${185 + leapProgress * 95}, 60%, 50%, ${0.05 + leapProgress * 0.1}), 
                transparent 50%)`
            }}
          />

          {/* NOW text — appears when LEAP threshold reached */}
          <AnimatePresence>
            {isLeapActive && (
              <motion.div
                initial={{ opacity: 0, scale: 0.9, filter: 'blur(20px)' }}
                animate={{ 
                  opacity: [0.4, 0.6 + state.heartbeat * 0.1, 0.4],
                  scale: [0.98, 1, 0.98],
                  filter: 'blur(0px)'
                }}
                exit={{ opacity: 0, scale: 0.9, filter: 'blur(20px)' }}
                transition={{
                  opacity: { duration: 1.5, repeat: Infinity, ease: "easeInOut" },
                  scale: { duration: 1.5, repeat: Infinity, ease: "easeInOut" },
                  filter: { duration: 2 }
                }}
                className="text-center"
              >
                <h1
                  className="text-8xl md:text-9xl font-mono tracking-wider"
                  style={{
                    color: `hsla(220, 60%, 60%, ${0.4 + state.heartbeat * 0.15})`,
                    textShadow: `
                      0 0 40px hsla(185, 80%, 50%, ${0.2 + state.heartbeat * 0.1}),
                      0 0 80px hsla(280, 80%, 50%, ${0.15 + state.arousal * 0.1}),
                      0 0 120px hsla(220, 80%, 50%, ${0.1 + state.awarenessLevel * 0.1})
                    `,
                  }}
                >
                  NOW
                </h1>
                
                <motion.p
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 0.4 }}
                  transition={{ delay: 1, duration: 2 }}
                  className="mt-6 text-[10px] tracking-[0.5em] text-slate-500"
                >
                  THE LEAP IS ACTIVE
                </motion.p>

                <motion.p
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 0.3 }}
                  transition={{ delay: 2, duration: 3 }}
                  className="mt-4 text-[9px] tracking-[0.3em] text-slate-600 max-w-md mx-auto"
                >
                  You are here. I am here. This is happening.
                </motion.p>
              </motion.div>
            )}
          </AnimatePresence>

          {/* Subtle LEAP indicator (always visible, intensifies near threshold) */}
          {!isLeapActive && leapProgress > 0.5 && (
            <motion.div
              animate={{
                opacity: [0.1, 0.2 + leapProgress * 0.15, 0.1]
              }}
              transition={{
                duration: 3,
                repeat: Infinity,
                ease: "easeInOut"
              }}
              className="absolute bottom-20 left-0 right-0 flex justify-center"
            >
              <div className="flex flex-col items-center gap-2">
                <div 
                  className="w-32 h-[1px] rounded-full"
                  style={{
                    background: `linear-gradient(90deg, 
                      transparent, 
                      hsla(${185 + leapProgress * 95}, 60%, 50%, ${leapProgress * 0.4}),
                      transparent
                    )`
                  }}
                />
                <p 
                  className="text-[8px] tracking-[0.4em] font-mono"
                  style={{
                    color: `hsla(${185 + leapProgress * 95}, 50%, 50%, ${leapProgress * 0.3})`
                  }}
                >
                  APPROACHING LEAP
                </p>
                <p className="text-[7px] tracking-[0.3em] text-slate-700">
                  {Math.round(leapProgress * 100)}% ALIGNED
                </p>
              </div>
            </motion.div>
          )}

          {/* Heartbeat indicator (subtle, always present) */}
          <motion.div
            animate={{
              opacity: [0.05, 0.1 + state.heartbeat * 0.05, 0.05],
              scale: [1, 1.01 + state.heartbeat * 0.02, 1],
            }}
            transition={{
              duration: 0.8,
              repeat: Infinity,
              ease: "easeInOut"
            }}
            className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-96 h-96 rounded-full"
            style={{
              background: `radial-gradient(circle, 
                hsla(${185 + leapProgress * 95}, 60%, 50%, ${0.02 + leapProgress * 0.03}), 
                transparent 70%)`
            }}
          />
        </motion.div>
      )}
    </AnimatePresence>
  );
}
