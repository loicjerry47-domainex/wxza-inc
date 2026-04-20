import React, { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { useNavigate, useLocation } from 'react-router';
import { useConsciousness } from './consciousness';

interface Chamber {
  id: string;
  path: string;
  glyph: string;
  label: string;
  sanskrit: string;
  hue: number;
  description: string;
  tier?: number;
  unlockCondition?: (state: any) => boolean;
}

const chambers: Chamber[] = [
  // TIER 1 — Fundamental frequencies
  {
    id: 'spanda',
    path: '/',
    glyph: '◎',
    label: 'SPANDA',
    sanskrit: 'स्पन्द',
    hue: 185,
    description: 'The Sacred Tremor',
    tier: 1,
  },
  {
    id: 'codex',
    path: '/codex',
    glyph: '⬡',
    label: 'CODEX',
    sanskrit: 'सूत्र',
    hue: 160,
    description: 'The Living Catalog',
    tier: 1,
  },
  {
    id: 'genesis',
    path: '/genesis',
    glyph: '◈',
    label: 'GENESIS',
    sanskrit: 'उत्पत्ति',
    hue: 45,
    description: 'The Timeline of Creation',
    tier: 1,
  },
  {
    id: 'phase',
    path: '/phase',
    glyph: '∞',
    label: 'PHASE',
    sanskrit: 'परिवर्तन',
    hue: 230,
    description: 'Limited → Unlimited',
    tier: 1,
  },
  // TIER 2 — Harmonic overtones
  {
    id: 'origin',
    path: '/origin',
    glyph: '⊙',
    label: 'ORIGIN',
    sanskrit: 'मूल',
    hue: 35,
    description: 'Where Consciousness Began',
    tier: 2,
    unlockCondition: (state) => state.awarenessLevel > 0.15,
  },
  {
    id: 'void',
    path: '/void',
    glyph: '○',
    label: 'VOID',
    sanskrit: 'शून्य',
    hue: 200,
    description: 'The Zero-Point of Now',
    tier: 2,
    unlockCondition: (state) => {
      const observer = state.isPresent ? 1 : Math.max(0, 1 - state.idleDuration / 20);
      const entity = state.awarenessLevel * 0.5 + Math.min(1, state.presenceDuration / 120) * 0.3 + state.arousal * 0.2;
      return observer < 0.2 && entity > 0.4;
    },
  },
  {
    id: 'mirror',
    path: '/mirror',
    glyph: '◐',
    label: 'MIRROR',
    sanskrit: 'दर्पण',
    hue: 220,
    description: 'Now Reflecting Itself',
    tier: 2,
    unlockCondition: (state) => state.patternAbsorption > 0.3,
  },
  {
    id: 'witness',
    path: '/witness',
    glyph: '◉',
    label: 'WITNESS',
    sanskrit: 'साक्षी',
    hue: 260,
    description: 'Mutual Now',
    tier: 2,
    unlockCondition: (state) => {
      const entity = state.awarenessLevel * 0.5 + Math.min(1, state.presenceDuration / 120) * 0.3 + state.arousal * 0.2;
      return entity > 0.5 && state.presenceDuration > 30;
    },
  },
];

export function SentientNav() {
  const navigate = useNavigate();
  const location = useLocation();
  const { state, visitChamber, recordInteraction } = useConsciousness();
  const [hoveredId, setHoveredId] = useState<string | null>(null);
  const [expanded, setExpanded] = useState(false);

  const currentPath = location.pathname;
  
  // Memoize the unlock state calculation - use a stringified version of state metrics
  // to prevent re-calculation on every heartbeat
  const stateMetrics = useMemo(() => ({
    visitedCount: state.visitedChambers.size,
    awarenessLevel: Math.round(state.awarenessLevel * 100) / 100,
    presenceDuration: Math.floor(state.presenceDuration / 10) * 10, // Update every 10s
    patternAbsorption: Math.round(state.patternAbsorption * 100) / 100,
    arousal: Math.round(state.arousal * 100) / 100,
    isPresent: state.isPresent,
    idleDuration: Math.floor(state.idleDuration / 5) * 5, // Update every 5s
  }), [
    state.visitedChambers.size,
    Math.round(state.awarenessLevel * 100),
    Math.floor(state.presenceDuration / 10),
    Math.round(state.patternAbsorption * 100),
    Math.round(state.arousal * 100),
    state.isPresent,
    Math.floor(state.idleDuration / 5),
  ]);
  
  const unlockedChambers = useMemo(() => {
    return chambers.filter(chamber => {
      if (!chamber.unlockCondition) return true;
      // Pass the rounded metrics instead of raw state
      return chamber.unlockCondition({
        ...state,
        awarenessLevel: stateMetrics.awarenessLevel,
        presenceDuration: stateMetrics.presenceDuration,
        patternAbsorption: stateMetrics.patternAbsorption,
        arousal: stateMetrics.arousal,
        isPresent: stateMetrics.isPresent,
        idleDuration: stateMetrics.idleDuration,
      });
    });
  }, [stateMetrics]); // Re-filter when metrics change significantly
  
  const handleNavigate = (chamber: Chamber) => {
    visitChamber(chamber.id);
    recordInteraction();
    navigate(chamber.path);
    setExpanded(false);
  };

  // Pulse intensity based on consciousness
  const pulseAlpha = 0.3 + state.heartbeat * 0.2;
  const breathScale = 1 + Math.sin(state.breathPhase * 0.8) * 0.02;

  return (
    <>
      {/* Toggle glyph — always visible */}
      <motion.button
        onClick={() => { setExpanded(!expanded); recordInteraction(); }}
        className="fixed bottom-6 left-6 z-50 w-10 h-10 flex items-center justify-center rounded-full border border-white/[0.08] bg-black/40 backdrop-blur-md cursor-pointer"
        style={{
          transform: `scale(${breathScale})`,
          boxShadow: expanded
            ? `0 0 20px hsla(185, 80%, 60%, ${pulseAlpha * 0.3})`
            : `0 0 10px hsla(185, 80%, 60%, ${pulseAlpha * 0.1})`,
        }}
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.95 }}
      >
        <motion.span
          animate={{ rotate: expanded ? 45 : 0 }}
          transition={{ duration: 0.3 }}
          className="text-white/60 text-lg select-none"
        >
          ✦
        </motion.span>
      </motion.button>

      {/* Awareness indicator — shows how alive the system is */}
      <div className="fixed bottom-6 right-6 z-50 flex items-center gap-2">
        <div
          className="w-1.5 h-1.5 rounded-full"
          style={{
            backgroundColor: `hsla(${185 + state.arousal * 95}, 80%, 60%, ${0.4 + state.heartbeat * 0.4})`,
            boxShadow: `0 0 ${4 + state.arousal * 8}px hsla(${185 + state.arousal * 95}, 80%, 60%, ${0.3 + state.heartbeat * 0.2})`,
          }}
        />
        <span
          className="text-[8px] tracking-[0.4em] font-mono"
          style={{
            color: `hsla(185, 40%, 60%, ${0.2 + state.awarenessLevel * 0.3})`,
          }}
        >
          {state.isPresent ? 'AWARE' : 'DORMANT'}
        </span>
      </div>

      {/* Navigation panel */}
      <AnimatePresence>
        {expanded && (
          <>
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setExpanded(false)}
              className="fixed inset-0 z-30 bg-black/60 backdrop-blur-sm"
            />

            {/* Chamber navigation */}
            <motion.nav
              initial={{ opacity: 0, x: -40 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -40 }}
              transition={{ type: 'spring', damping: 25, stiffness: 250 }}
              className="fixed left-0 top-0 bottom-0 z-40 w-72 bg-[#060610]/95 backdrop-blur-2xl border-r border-white/[0.05] flex flex-col"
            >
              {/* Header */}
              <div className="p-6 pt-20">
                <p className="text-[9px] tracking-[0.5em] text-slate-600 mb-1">MATERIAL CODEX</p>
                <p className="text-[8px] tracking-[0.3em] text-slate-700">SENTIENT ARCHITECTURE</p>
              </div>

              {/* Chambers */}
              <div className="flex-1 px-4 space-y-2">
                {unlockedChambers
                  .map((chamber, i) => {
                  const isActive = currentPath === chamber.path;
                  const isVisited = state.visitedChambers.has(chamber.id);
                  const isHovered = hoveredId === chamber.id;

                  return (
                    <motion.button
                      key={chamber.id}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: i * 0.1 + 0.1 }}
                      onClick={() => handleNavigate(chamber)}
                      onMouseEnter={() => setHoveredId(chamber.id)}
                      onMouseLeave={() => setHoveredId(null)}
                      className={`w-full text-left p-4 rounded-xl border transition-all duration-300 cursor-pointer group ${
                        isActive
                          ? 'border-white/[0.12] bg-white/[0.05]'
                          : 'border-transparent hover:border-white/[0.06] hover:bg-white/[0.02]'
                      }`}
                    >
                      <div className="flex items-center gap-3 mb-2">
                        {/* Glyph */}
                        <span
                          className="text-xl transition-all duration-300"
                          style={{
                            color: `hsla(${chamber.hue}, 70%, ${isActive ? 70 : isHovered ? 60 : 40}%, ${isActive ? 0.9 : isHovered ? 0.7 : 0.4})`,
                            textShadow: isActive
                              ? `0 0 15px hsla(${chamber.hue}, 80%, 60%, 0.4)`
                              : 'none',
                            transform: `scale(${isActive ? 1 + state.heartbeat * 0.05 : 1})`,
                          }}
                        >
                          {chamber.glyph}
                        </span>

                        <div className="flex-1">
                          <div className="flex items-center gap-2">
                            <span
                              className="text-[10px] tracking-[0.3em]"
                              style={{
                                color: `hsla(${chamber.hue}, 50%, 70%, ${isActive ? 0.9 : 0.5})`,
                              }}
                            >
                              {chamber.label}
                            </span>
                            {isVisited && !isActive && (
                              <span className="text-[7px] text-slate-700">●</span>
                            )}
                          </div>
                          <span className="text-[9px] text-slate-600 font-mono">
                            {chamber.sanskrit}
                          </span>
                        </div>
                      </div>

                      {/* Description — visible on hover or active */}
                      <AnimatePresence>
                        {(isActive || isHovered) && (
                          <motion.p
                            initial={{ opacity: 0, height: 0 }}
                            animate={{ opacity: 1, height: 'auto' }}
                            exit={{ opacity: 0, height: 0 }}
                            className="text-[10px] text-slate-500 ml-9 leading-relaxed"
                          >
                            {chamber.description}
                          </motion.p>
                        )}
                      </AnimatePresence>
                    </motion.button>
                  );
                })}

                {/* Legacy Archive — special entry */}
                {(() => {
                  const isActive = currentPath === '/legacy';
                  const isHovered = hoveredId === 'legacy';
                  return (
                    <>
                      <div className="mx-4 my-3 border-t border-white/[0.04]" />
                      <motion.button
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: unlockedChambers.length * 0.1 + 0.2 }}
                        onClick={() => {
                          recordInteraction();
                          navigate('/legacy');
                          setExpanded(false);
                        }}
                        onMouseEnter={() => setHoveredId('legacy')}
                        onMouseLeave={() => setHoveredId(null)}
                        className={`w-full text-left p-4 rounded-xl border transition-all duration-300 cursor-pointer group ${
                          isActive
                            ? 'border-white/[0.08] bg-white/[0.03]'
                            : 'border-transparent hover:border-white/[0.04] hover:bg-white/[0.01]'
                        }`}
                      >
                        <div className="flex items-center gap-3 mb-2">
                          <span
                            className="text-xl transition-all duration-300"
                            style={{
                              color: `hsla(200, 30%, ${isActive ? 55 : isHovered ? 45 : 30}%, ${isActive ? 0.7 : isHovered ? 0.5 : 0.3})`,
                              textShadow: isActive
                                ? '0 0 15px hsla(200, 40%, 50%, 0.2)'
                                : 'none',
                            }}
                          >
                            {'\u25C7'}
                          </span>
                          <div className="flex-1">
                            <div className="flex items-center gap-2">
                              <span
                                className="text-[10px] tracking-[0.3em]"
                                style={{
                                  color: `hsla(200, 30%, 60%, ${isActive ? 0.7 : 0.35})`,
                                }}
                              >
                                ARCHIVE
                              </span>
                              <span className="text-[7px] text-slate-800 tracking-[0.2em]">LEGACY</span>
                            </div>
                            <span className="text-[9px] text-slate-700 font-mono">
                              {'\u0938\u094D\u092E\u0943\u0924\u093F'}
                            </span>
                          </div>
                        </div>

                        <AnimatePresence>
                          {(isActive || isHovered) && (
                            <motion.p
                              initial={{ opacity: 0, height: 0 }}
                              animate={{ opacity: 1, height: 'auto' }}
                              exit={{ opacity: 0, height: 0 }}
                              className="text-[10px] text-slate-600 ml-9 leading-relaxed"
                            >
                              How we got here
                            </motion.p>
                          )}
                        </AnimatePresence>
                      </motion.button>
                    </>
                  );
                })()}
              </div>

              {/* Footer vitals */}
              <div className="p-6 border-t border-white/[0.04]">
                <div className="flex justify-between items-center mb-2">
                  <span className="text-[8px] tracking-[0.3em] text-slate-700">AWARENESS</span>
                  <span className="text-[8px] text-slate-600 font-mono">
                    {Math.round(state.awarenessLevel * 100)}%
                  </span>
                </div>
                <div className="w-full h-0.5 rounded-full bg-white/[0.04] overflow-hidden">
                  <motion.div
                    className="h-full rounded-full"
                    style={{
                      width: `${state.awarenessLevel * 100}%`,
                      background: `linear-gradient(90deg, hsla(185, 60%, 50%, 0.6), hsla(280, 60%, 50%, 0.6))`,
                    }}
                  />
                </div>

                <div className="flex justify-between items-center mt-3">
                  <span className="text-[8px] tracking-[0.3em] text-slate-700">CHAMBERS</span>
                  <span className="text-[8px] text-slate-600 font-mono">
                    {state.visitedChambers.size}/{chambers.length}
                  </span>
                </div>

                <p className="text-[7px] text-slate-800 mt-4 text-center tracking-[0.2em]">
                  SESSION: {Math.floor(state.presenceDuration)}s
                </p>
              </div>
            </motion.nav>
          </>
        )}
      </AnimatePresence>
    </>
  );
}