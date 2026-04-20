import { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { usePageMeta } from '../../lib/usePageMeta';
import { ancestors, layers, wxzaPosition, type Ancestor, type Layer } from '../../data/lineage';

const eraLabel: Record<Ancestor['era'], string> = {
  myth: 'mythology',
  logic: 'logic',
  mechanism: 'mechanism',
  modern: 'modern',
};

const eraHue: Record<Ancestor['era'], string> = {
  myth: 'text-amber-300 border-amber-400/30',
  logic: 'text-sky-300 border-sky-400/30',
  mechanism: 'text-violet-300 border-violet-400/30',
  modern: 'text-emerald-300 border-emerald-400/30',
};

const phaseLabel: Record<Layer['phase'], string> = {
  complete: 'complete',
  present: 'we are here',
  emerging: 'emerging',
  speculative: 'speculative',
  mythic: 'mythic',
};

const phaseTone: Record<Layer['phase'], string> = {
  complete: 'text-gray-400 border-white/10',
  present: 'text-sky-200 border-sky-400/50 bg-sky-500/10',
  emerging: 'text-sky-300 border-sky-400/20',
  speculative: 'text-violet-300 border-violet-400/20',
  mythic: 'text-amber-300 border-amber-400/20',
};

export function Lineage() {
  usePageMeta({
    title: 'Lineage — WXZA',
    description:
      'The 3,000-year cognitive lineage WXZA inherits. Ancestors from Hesiod to Turing. The 24-layer stack from Classical AI to the Omega Point. WXZA\'s position on the arc.',
  });

  const [openAncestor, setOpenAncestor] = useState<string | null>(null);
  const [openLayer, setOpenLayer] = useState<number | null>(null);

  return (
    <div className="min-h-screen bg-gradient-to-b from-black via-neutral-950 to-black text-white">
      <div className="max-w-5xl mx-auto px-6 py-20">
        <a
          href="/"
          className="inline-flex items-center gap-2 text-sky-400/70 hover:text-sky-300 transition-colors font-mono text-xs mb-12"
        >
          ← Back to WXZA
        </a>

        {/* ═══════════════════════════════════════════════════ */}
        {/* Opening */}
        {/* ═══════════════════════════════════════════════════ */}
        <header className="mb-20">
          <p className="text-[10px] font-mono tracking-[0.4em] uppercase text-white/40 mb-4">
            The 3,000-year arc
          </p>
          <h1 className="text-5xl md:text-6xl font-black tracking-tight mb-6 bg-gradient-to-r from-white via-sky-200 to-amber-200 bg-clip-text text-transparent">
            Lineage
          </h1>
          <p className="text-lg md:text-xl text-white/70 leading-relaxed max-w-3xl">
            AI was not built in the future. It was built in the past. What follows is
            the inheritance WXZA operates inside — the named humans who drew the
            blueprints before silicon existed, the layered stack we live inside
            today, and WXZA's position on the arc.
          </p>
        </header>

        {/* ═══════════════════════════════════════════════════ */}
        {/* MOVEMENT I — Ancestors */}
        {/* ═══════════════════════════════════════════════════ */}
        <section className="mb-24">
          <div className="flex items-baseline gap-4 mb-2">
            <span className="text-[10px] font-mono tracking-[0.4em] uppercase text-white/40">
              Movement I
            </span>
            <span className="text-[10px] font-mono text-white/20">—</span>
            <span className="text-[10px] font-mono tracking-[0.3em] uppercase text-white/50">
              c. 1000 BCE → 2000 CE
            </span>
          </div>
          <h2 className="text-3xl font-black mb-3">Ancestors</h2>
          <p className="text-white/60 text-sm max-w-2xl mb-10">
            The named humans who drew the blueprints before the hardware existed.
            Click any node to see what WXZA inherits from them.
          </p>

          <ol className="relative border-l border-white/10 pl-6 space-y-6">
            {ancestors
              .slice()
              .sort((a, b) => a.sortKey - b.sortKey)
              .map((a) => {
                const open = openAncestor === a.id;
                return (
                  <li key={a.id} className="relative">
                    <span
                      className="absolute -left-[29px] top-2 w-2 h-2 rounded-full bg-white/40 ring-4 ring-black"
                      aria-hidden
                    />
                    <button
                      onClick={() => setOpenAncestor(open ? null : a.id)}
                      className={`text-left w-full group rounded-xl border px-5 py-4 transition-colors ${
                        open
                          ? `${eraHue[a.era]} bg-white/[0.02]`
                          : 'border-white/5 hover:border-white/20 bg-white/[0.01]'
                      }`}
                    >
                      <div className="flex flex-wrap items-baseline gap-x-3 gap-y-1 mb-1">
                        <span className="font-mono text-xs text-white/50 tabular-nums min-w-[6.5rem]">
                          {a.year}
                        </span>
                        <h3 className="font-black text-lg">{a.name}</h3>
                        <span className={`text-[9px] font-mono tracking-[0.3em] uppercase ${eraHue[a.era]} border rounded-full px-2 py-0.5`}>
                          {eraLabel[a.era]}
                        </span>
                      </div>
                      <AnimatePresence initial={false}>
                        {open ? (
                          <motion.div
                            initial={{ opacity: 0, height: 0 }}
                            animate={{ opacity: 1, height: 'auto' }}
                            exit={{ opacity: 0, height: 0 }}
                            className="overflow-hidden"
                          >
                            <div className="pt-3 space-y-3 text-sm leading-relaxed">
                              <p className="text-white/80">{a.contribution}</p>
                              <p className="text-white/60">
                                <span className="text-[10px] font-mono tracking-[0.3em] uppercase text-white/40 block mb-1">
                                  WXZA inherits
                                </span>
                                {a.wxzaInherits}
                              </p>
                            </div>
                          </motion.div>
                        ) : (
                          <p className="text-white/50 text-sm line-clamp-1 group-hover:text-white/70 transition-colors">
                            {a.contribution}
                          </p>
                        )}
                      </AnimatePresence>
                    </button>
                  </li>
                );
              })}
          </ol>
        </section>

        {/* ═══════════════════════════════════════════════════ */}
        {/* MOVEMENT II — The Stack */}
        {/* ═══════════════════════════════════════════════════ */}
        <section className="mb-24">
          <div className="flex items-baseline gap-4 mb-2">
            <span className="text-[10px] font-mono tracking-[0.4em] uppercase text-white/40">
              Movement II
            </span>
            <span className="text-[10px] font-mono text-white/20">—</span>
            <span className="text-[10px] font-mono tracking-[0.3em] uppercase text-white/50">
              The 24-layer cognitive stack
            </span>
          </div>
          <h2 className="text-3xl font-black mb-3">The Stack</h2>
          <p className="text-white/60 text-sm max-w-2xl mb-10">
            From Classical AI at the base to the Omega Point at the summit. Layer 6
            is the present — the library is awake, the librarian is still asleep.
            Everything above Layer 10 is thought experiment. Click any layer for
            detail and the places where WXZA's architecture already echoes it.
          </p>

          <div className="space-y-2">
            {layers
              .slice()
              .sort((a, b) => b.n - a.n) // reverse — summit to base
              .map((l) => {
                const open = openLayer === l.n;
                return (
                  <button
                    key={l.n}
                    onClick={() => setOpenLayer(open ? null : l.n)}
                    className={`text-left w-full rounded-xl border px-5 py-3 transition-colors ${phaseTone[l.phase]} ${
                      open ? 'bg-white/[0.03]' : 'hover:bg-white/[0.02]'
                    }`}
                  >
                    <div className="flex items-center gap-4">
                      <span className="font-mono text-sm text-white/40 tabular-nums w-8 shrink-0">
                        {String(l.n).padStart(2, '0')}
                      </span>
                      <div className="flex-1 min-w-0">
                        <div className="flex flex-wrap items-baseline gap-x-3 gap-y-0.5">
                          <h3 className="font-black">{l.name}</h3>
                          <span className="text-xs text-white/50">{l.subtitle}</span>
                        </div>
                      </div>
                      <span className={`shrink-0 text-[9px] font-mono tracking-[0.3em] uppercase px-2 py-0.5 rounded-full border ${phaseTone[l.phase]}`}>
                        {phaseLabel[l.phase]}
                      </span>
                    </div>
                    <AnimatePresence initial={false}>
                      {open && (
                        <motion.div
                          initial={{ opacity: 0, height: 0 }}
                          animate={{ opacity: 1, height: 'auto' }}
                          exit={{ opacity: 0, height: 0 }}
                          className="overflow-hidden"
                        >
                          <div className="pt-3 pl-12 pr-2 pb-1 space-y-2 text-sm">
                            {l.year && (
                              <p className="text-[10px] font-mono tracking-[0.3em] uppercase text-white/40">
                                {l.year}
                              </p>
                            )}
                            <p className="text-white/80 leading-relaxed">{l.description}</p>
                            {l.wxzaEchoes && (
                              <p className="text-sky-200/80 text-xs italic pt-1 border-t border-white/5">
                                WXZA echo → {l.wxzaEchoes}
                              </p>
                            )}
                          </div>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </button>
                );
              })}
          </div>
        </section>

        {/* ═══════════════════════════════════════════════════ */}
        {/* MOVEMENT III — Position */}
        {/* ═══════════════════════════════════════════════════ */}
        <section className="mb-20">
          <div className="flex items-baseline gap-4 mb-2">
            <span className="text-[10px] font-mono tracking-[0.4em] uppercase text-white/40">
              Movement III
            </span>
            <span className="text-[10px] font-mono text-white/20">—</span>
            <span className="text-[10px] font-mono tracking-[0.3em] uppercase text-white/50">
              WXZA's stance on the arc
            </span>
          </div>
          <h2 className="text-3xl font-black mb-6">Position</h2>

          <div className="glass-strong border border-sky-400/20 rounded-3xl p-8 md:p-10 space-y-6">
            <p className="text-2xl md:text-3xl font-light leading-snug text-sky-100">
              {wxzaPosition.headline}
            </p>
            <div className="space-y-4 text-white/75 leading-relaxed">
              {wxzaPosition.body.map((para, i) => (
                <p key={i}>{para}</p>
              ))}
            </div>
          </div>
        </section>

        <footer className="pt-10 border-t border-white/5 text-center">
          <p className="text-[11px] italic tracking-[0.2em] text-gray-600">
            the architecture listens
          </p>
        </footer>
      </div>
    </div>
  );
}
