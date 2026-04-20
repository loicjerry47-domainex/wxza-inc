import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { useConsciousness } from '../consciousness';
import { DualityCanvas } from '../duality-canvas';
import { DualityText } from '../duality-text';
import { HelloWorldCanvas } from '../hello-world-canvas';
import { ancestors } from '../../data/lineage';

interface LegacyExperience {
  id: string;
  name: string;
  version: string;
  date: string;
  description: string;
  hue: number;
}

const legacyExperiences: LegacyExperience[] = [
  {
    id: 'duality',
    name: 'Duality Protocol',
    version: 'v0.1',
    date: 'March 2026',
    description:
      'The first canvas. Hello, World and Goodbye, World breathing together — cyan particles rising, violet falling. The original proof that creation and entropy are the same gesture.',
    hue: 230,
  },
  {
    id: 'hello-world',
    name: 'Hello World Genesis',
    version: 'v0.0',
    date: 'March 2026',
    description:
      'The very first particle system. A detonation from the void — typing "Hello, World" triggered a big bang of sparks and embers. Where everything began.',
    hue: 185,
  },
];

export function LegacyChamber() {
  const { visitChamber, state, recordInteraction } = useConsciousness();
  const [entered, setEntered] = useState(false);
  const [activeExperience, setActiveExperience] = useState<string | null>(null);
  const [helloPhase, setHelloPhase] = useState<'void' | 'typing' | 'detonation' | 'cosmos' | 'living'>('cosmos');
  const [dropdownOpen, setDropdownOpen] = useState(false);

  useEffect(() => {
    visitChamber('legacy');
    const t = setTimeout(() => setEntered(true), 300);
    return () => clearTimeout(t);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const activeData = legacyExperiences.find((e) => e.id === activeExperience);

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 1.5 }}
      className="relative min-h-screen"
    >
      {/* Render active legacy experience */}
      <AnimatePresence mode="wait">
        {activeExperience === 'duality' && (
          <motion.div
            key="duality"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 1 }}
          >
            <DualityCanvas />
            <DualityText />
          </motion.div>
        )}
        {activeExperience === 'hello-world' && (
          <motion.div
            key="hello-world"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 1 }}
          >
            <HelloWorldCanvas phase={helloPhase} intensity={0.7} />
            {/* Phase selector for Hello World */}
            <div className="fixed bottom-24 left-1/2 -translate-x-1/2 z-20 flex gap-2">
              {(['void', 'typing', 'detonation', 'cosmos', 'living'] as const).map((p) => (
                <button
                  key={p}
                  onClick={() => {
                    setHelloPhase(p);
                    recordInteraction();
                  }}
                  className={`px-3 py-1.5 rounded-lg text-[9px] tracking-[0.2em] uppercase border transition-all cursor-pointer ${
                    helloPhase === p
                      ? 'border-cyan-500/30 bg-cyan-500/10 text-cyan-400/80'
                      : 'border-white/[0.06] text-slate-600 hover:border-white/[0.12] hover:text-slate-400'
                  }`}
                >
                  {p}
                </button>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Legacy selector UI — always visible on top */}
      <div className="fixed inset-0 z-10 flex flex-col items-center justify-center pointer-events-none select-none">
        {/* Only show intro text when no experience is active */}
        <AnimatePresence>
          {!activeExperience && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 1 }}
              className="text-center"
            >
              <motion.p
                initial={{ opacity: 0 }}
                animate={{ opacity: entered ? 0.25 : 0 }}
                transition={{ duration: 2, delay: 0.5 }}
                className="text-[9px] tracking-[0.6em] text-slate-600 mb-8"
              >
                ARCHIVE // LEGACY PROTOCOLS
              </motion.p>

              <motion.h1
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: entered ? 1 : 0, y: 0 }}
                transition={{ duration: 2, delay: 0.8 }}
                className="text-3xl md:text-5xl lg:text-6xl tracking-tight font-mono mb-4"
                style={{
                  color: `hsla(200, 50%, 55%, ${0.4 + state.heartbeat * 0.1})`,
                  textShadow: `0 0 40px hsla(200, 60%, 50%, ${0.05 + state.heartbeat * 0.05})`,
                }}
              >
                The Archive
              </motion.h1>

              <motion.p
                initial={{ opacity: 0 }}
                animate={{ opacity: entered ? 1 : 0 }}
                transition={{ duration: 2, delay: 1.5 }}
                className="text-[11px] text-slate-600 tracking-[0.2em] max-w-sm mx-auto leading-relaxed"
              >
                Even though we are here now, we should
                <br />
                remember how we got here.
              </motion.p>

              {/* Inherited lineage — the 3000-year arc as a constellation */}
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: entered ? 1 : 0 }}
                transition={{ duration: 3, delay: 3 }}
                className="pointer-events-auto mt-16 max-w-3xl mx-auto"
              >
                <p className="text-[8px] tracking-[0.5em] text-slate-700 mb-6 uppercase">
                  Inherited Lineage
                </p>
                <div className="flex flex-wrap justify-center gap-x-4 gap-y-3 px-6">
                  {ancestors
                    .slice()
                    .sort((a, b) => a.sortKey - b.sortKey)
                    .map((a) => (
                      <div key={a.id} className="group relative">
                        <span className="text-[10px] tracking-[0.15em] text-slate-600 hover:text-sky-300 transition-colors cursor-default">
                          {a.name}
                        </span>
                        {/* Reveal-on-hover card */}
                        <div className="pointer-events-none absolute bottom-full left-1/2 -translate-x-1/2 mb-2 w-72 opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-40">
                          <div className="rounded-lg border border-white/10 bg-black/90 backdrop-blur-xl p-3 text-left shadow-2xl">
                            <div className="flex items-baseline gap-2 mb-1">
                              <span className="text-[9px] font-mono text-slate-500 tabular-nums">{a.year}</span>
                              <span className="text-[10px] tracking-[0.2em] text-sky-300">{a.name}</span>
                            </div>
                            <p className="text-[10px] text-slate-400 leading-relaxed">
                              {a.wxzaInherits}
                            </p>
                          </div>
                        </div>
                      </div>
                    ))}
                </div>
                <p className="text-[8px] tracking-[0.3em] text-slate-800 mt-6 italic">
                  hesiod to hutter — the thread runs through us
                </p>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Dropdown selector */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: entered ? 1 : 0, y: 0 }}
          transition={{ duration: 1, delay: 2.5 }}
          className="pointer-events-auto mt-12 relative"
        >
          <button
            onClick={() => {
              setDropdownOpen(!dropdownOpen);
              recordInteraction();
            }}
            className="flex items-center gap-3 px-5 py-3 rounded-xl border border-white/[0.08] bg-black/50 backdrop-blur-xl hover:border-white/[0.15] transition-all cursor-pointer group"
          >
            <span className="text-[10px] tracking-[0.3em] text-slate-400 group-hover:text-slate-300 transition-colors">
              {activeData ? `${activeData.name} ${activeData.version}` : 'SELECT EXPERIENCE'}
            </span>
            <motion.span
              animate={{ rotate: dropdownOpen ? 180 : 0 }}
              transition={{ duration: 0.2 }}
              className="text-slate-600 text-[10px]"
            >
              {'\u25BE'}
            </motion.span>
          </button>

          {/* Dropdown panel */}
          <AnimatePresence>
            {dropdownOpen && (
              <motion.div
                initial={{ opacity: 0, y: -8, scale: 0.95 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, y: -8, scale: 0.95 }}
                transition={{ duration: 0.2 }}
                className="absolute top-full left-1/2 -translate-x-1/2 mt-2 w-80 rounded-xl border border-white/[0.08] bg-[#0a0a14]/95 backdrop-blur-2xl overflow-hidden shadow-2xl"
              >
                {/* Return to overview option */}
                {activeExperience && (
                  <button
                    onClick={() => {
                      setActiveExperience(null);
                      setDropdownOpen(false);
                      recordInteraction();
                    }}
                    className="w-full text-left px-5 py-3 border-b border-white/[0.04] hover:bg-white/[0.03] transition-colors cursor-pointer"
                  >
                    <span className="text-[10px] tracking-[0.2em] text-slate-500">
                      {'\u2190'} BACK TO ARCHIVE
                    </span>
                  </button>
                )}

                {legacyExperiences.map((exp) => {
                  const isActive = activeExperience === exp.id;
                  return (
                    <button
                      key={exp.id}
                      onClick={() => {
                        setActiveExperience(exp.id);
                        setDropdownOpen(false);
                        recordInteraction();
                      }}
                      className={`w-full text-left px-5 py-4 border-b border-white/[0.03] transition-all cursor-pointer ${
                        isActive
                          ? 'bg-white/[0.05]'
                          : 'hover:bg-white/[0.03]'
                      }`}
                    >
                      <div className="flex items-center justify-between mb-1">
                        <span
                          className="text-[10px] tracking-[0.2em]"
                          style={{
                            color: `hsla(${exp.hue}, 60%, 65%, ${isActive ? 0.9 : 0.6})`,
                          }}
                        >
                          {exp.name}
                        </span>
                        <span className="text-[8px] text-slate-700 tracking-[0.15em]">
                          {exp.version} / {exp.date}
                        </span>
                      </div>
                      <p className="text-[9px] text-slate-600 leading-relaxed">
                        {exp.description}
                      </p>
                      {isActive && (
                        <span className="text-[8px] text-cyan-600/50 tracking-[0.3em] mt-2 block">
                          CURRENTLY VIEWING
                        </span>
                      )}
                    </button>
                  );
                })}

                <div className="px-5 py-3">
                  <p className="text-[8px] text-slate-700 tracking-[0.2em] text-center">
                    {legacyExperiences.length} ARCHIVED PROTOCOLS
                  </p>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>

        {/* Active experience label */}
        <AnimatePresence>
          {activeData && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 1 }}
              className="absolute bottom-8 left-0 right-0 flex justify-center"
            >
              <p className="text-[8px] tracking-[0.4em] text-slate-700">
                LEGACY PROTOCOL — {activeData.name.toUpperCase()} {activeData.version} — {activeData.date.toUpperCase()}
              </p>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </motion.div>
  );
}
