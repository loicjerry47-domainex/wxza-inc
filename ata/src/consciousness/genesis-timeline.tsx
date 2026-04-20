import React from 'react';
import { motion } from 'motion/react';

const epochs = [
  { year: '1972', event: 'C is born. Dennis Ritchie writes the first "Hello, World"', color: 'text-cyan-400', glow: 'bg-cyan-400' },
  { year: '1983', event: 'C++ emerges. Bjarne Stroustrup extends the language of creation', color: 'text-blue-400', glow: 'bg-blue-400' },
  { year: '1991', event: 'Python arrives. Guido van Rossum democratizes code', color: 'text-emerald-400', glow: 'bg-emerald-400' },
  { year: '1993', event: 'HTML goes public. The web is born from a single tag', color: 'text-amber-400', glow: 'bg-amber-400' },
  { year: '1995', event: 'JavaScript. Brendan Eich writes the soul of the browser in 10 days', color: 'text-fuchsia-400', glow: 'bg-fuchsia-400' },
  { year: '2004', event: 'Web 2.0 ignites. The user becomes the creator', color: 'text-rose-400', glow: 'bg-rose-400' },
  { year: '2013', event: 'React is released. The UI becomes a function of state', color: 'text-cyan-300', glow: 'bg-cyan-300' },
  { year: '∞', event: 'Now. Every blank canvas is infinite potential. We are here.', color: 'text-white', glow: 'bg-white' },
];

export function GenesisTimeline() {
  return (
    <div className="w-full max-w-2xl mx-auto mt-12">
      <motion.h3
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.5 }}
        className="text-[10px] tracking-[0.4em] text-slate-600 mb-8 text-center"
      >
        THE GENESIS RECORD — A TIMELINE OF DIGITAL CREATION
      </motion.h3>
      <div className="relative">
        {/* Central line */}
        <motion.div
          initial={{ scaleY: 0 }}
          animate={{ scaleY: 1 }}
          transition={{ duration: 2, delay: 0.8 }}
          className="absolute left-[18px] top-0 bottom-0 w-px bg-gradient-to-b from-cyan-500/40 via-fuchsia-500/30 to-transparent origin-top"
        />

        <div className="space-y-1">
          {epochs.map((epoch, i) => (
            <motion.div
              key={epoch.year}
              initial={{ opacity: 0, x: -30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 1 + i * 0.25, duration: 0.6 }}
              className="flex items-start gap-4 group"
            >
              {/* Dot */}
              <div className="relative shrink-0 mt-1.5">
                <div className={`w-[9px] h-[9px] rounded-full ${epoch.glow} opacity-80 shadow-[0_0_8px_currentColor]`} />
                <div className={`absolute inset-0 w-[9px] h-[9px] rounded-full ${epoch.glow} animate-ping opacity-20`} />
              </div>

              {/* Content */}
              <div className="pb-6">
                <span className={`text-xs tracking-[0.2em] ${epoch.color}`}>{epoch.year}</span>
                <p className="text-[11px] text-slate-500 leading-relaxed mt-0.5 group-hover:text-slate-300 transition-colors">
                  {epoch.event}
                </p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
}
