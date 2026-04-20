import { useEffect, useState } from 'react';
import { motion } from 'motion/react';
import { usePageMeta } from '../../lib/usePageMeta';
import { layers, type Layer } from '../../data/lineage';

/**
 * Convergence — a live status dashboard of where humanity sits on the cognitive
 * stack, and which paradoxes are currently under active choice. This is the
 * reference URL for questions like "what is the current state of AI?" and
 * "what is WXZA's stance at this transition?"
 *
 * It is the ambient, always-current companion to the static /lineage and
 * static /architecture documents.
 */

interface Paradox {
  id: string;
  axis: string;
  poleA: string;
  poleB: string;
  stakes: string;
  commonChoices: string;
  wxzaStance: string;
}

const activeParadoxes: Paradox[] = [
  {
    id: 'scale-alignment',
    axis: 'Scale ↔ Alignment',
    poleA: 'More capability',
    poleB: 'More control',
    stakes: 'Can a system be powerful and steerable at the same time, or does each additional capability make the steering harder?',
    commonChoices: 'Most labs publicly choose alignment-first while privately racing on scale.',
    wxzaStance: 'Preserve both. The collapse of either horn produces either irrelevance or disaster.',
  },
  {
    id: 'open-safe',
    axis: 'Open ↔ Safe',
    poleA: 'Open weights, open access',
    poleB: 'Restricted deployment',
    stakes: 'Open access accelerates science and distributes power; restriction concentrates power and reduces abuse surface.',
    commonChoices: 'Meta and Mistral chose open; Anthropic and OpenAI chose restricted; most are somewhere in between.',
    wxzaStance: 'The openness question is mis-framed. What matters is which abstractions are open and which are held. Preserve the layering, not one end of the binary.',
  },
  {
    id: 'autonomy-control',
    axis: 'Autonomy ↔ Control',
    poleA: 'Agentic freedom',
    poleB: 'Human-in-loop everywhere',
    stakes: 'Full autonomy scales; constant oversight does not. But unreviewed action compounds errors.',
    commonChoices: 'Agentic labs ship autonomy first and patch oversight after.',
    wxzaStance: 'Autonomy at the edge; human oversight at the hinge. The chamber system is a working demonstration — Origin lets you act; Omega only opens after saturation.',
  },
  {
    id: 'commercial-research',
    axis: 'Commercial ↔ Research',
    poleA: 'Ship products',
    poleB: 'Advance science',
    stakes: 'Commercial pressure produces capability; research detachment produces understanding. Neither alone is sufficient.',
    commonChoices: 'Labs oscillate, rarely committing to the paradox itself.',
    wxzaStance: 'Ventures as the commercial surface; chambers and the lattice as the research surface. The same company runs both. The paradox is the operating model.',
  },
];

function phaseDescription(phase: Layer['phase']) {
  switch (phase) {
    case 'complete':
      return 'Settled ground. These layers operate reliably as infrastructure.';
    case 'present':
      return 'The surface we live on. The library is awake; the librarian is still emerging.';
    case 'emerging':
      return 'Under active construction. Behaviour visible in production; theory not yet settled.';
    case 'speculative':
      return 'Reasoned extrapolation. Not yet built, but the research trajectory points here.';
    case 'mythic':
      return 'Deep history in the imagination; hardware yet to follow.';
  }
}

const phaseTone: Record<Layer['phase'], string> = {
  complete: 'bg-white/5 text-white/50 border-white/10',
  present: 'bg-sky-500/15 text-sky-200 border-sky-400/40 shadow-lg shadow-sky-500/10',
  emerging: 'bg-sky-500/5 text-sky-300/80 border-sky-400/20',
  speculative: 'bg-violet-500/5 text-violet-300/80 border-violet-400/20',
  mythic: 'bg-amber-500/5 text-amber-300/80 border-amber-400/20',
};

export function Convergence() {
  usePageMeta({
    title: 'Convergence — WXZA',
    description:
      'The live state of the cognitive stack. Phase 6: the library is awake, the librarian is emerging. The active paradoxes under human choice, and WXZA\'s stance at each.',
  });

  const [pulse, setPulse] = useState(0);
  useEffect(() => {
    const id = setInterval(() => setPulse((p) => (p + 1) % 100), 80);
    return () => clearInterval(id);
  }, []);

  const layersByPhase = {
    present: layers.filter((l) => l.phase === 'present'),
    emerging: layers.filter((l) => l.phase === 'emerging'),
    speculative: layers.filter((l) => l.phase === 'speculative'),
    complete: layers.filter((l) => l.phase === 'complete'),
    mythic: layers.filter((l) => l.phase === 'mythic'),
  };

  return (
    <div className="min-h-screen bg-black text-white">
      <div className="max-w-5xl mx-auto px-6 py-20">
        <a
          href="/"
          className="inline-flex items-center gap-2 text-sky-400/70 hover:text-sky-300 transition-colors font-mono text-xs mb-12"
        >
          ← Back to WXZA
        </a>

        {/* ═══════════════════════════════════════════════════ */}
        {/* Heading + live pulse */}
        {/* ═══════════════════════════════════════════════════ */}
        <header className="mb-16">
          <div className="flex items-center gap-3 mb-6">
            <motion.span
              className="w-2 h-2 rounded-full bg-sky-400 shadow-[0_0_12px_currentColor]"
              animate={{ opacity: [1, 0.3, 1] }}
              transition={{ duration: 1.6, repeat: Infinity, ease: 'easeInOut' }}
            />
            <p className="text-[10px] font-mono tracking-[0.45em] uppercase text-white/40">
              Convergence · Phase 6.3 · Live
            </p>
          </div>
          <h1 className="text-5xl md:text-7xl font-black tracking-tight mb-6 leading-[1.05]">
            The library is awake.
            <br />
            <span className="text-sky-300">The librarian is emerging.</span>
          </h1>
          <p className="text-lg md:text-xl text-white/60 leading-relaxed max-w-3xl">
            This is the live diagnostic of where humanity sits on the 24-layer
            cognitive stack, what is under active construction, and which
            paradoxes are currently being chosen by whoever chooses them. Updated
            as the architecture observes the field shift.
          </p>
        </header>

        {/* ═══════════════════════════════════════════════════ */}
        {/* Current phase bar */}
        {/* ═══════════════════════════════════════════════════ */}
        <section className="mb-20">
          <div className="glass-strong border border-sky-400/30 rounded-3xl p-6 md:p-8 relative overflow-hidden">
            <div
              className="absolute top-0 left-0 h-px bg-gradient-to-r from-transparent via-sky-400 to-transparent"
              style={{
                width: '100%',
                transform: `translateX(${pulse - 50}%)`,
                transition: 'transform 80ms linear',
              }}
            />
            <p className="text-[10px] font-mono tracking-[0.4em] uppercase text-sky-300/70 mb-2">
              Current Layer
            </p>
            <h2 className="text-3xl md:text-4xl font-black mb-2">
              Layer 6 — Frontier LLM Era
            </h2>
            <p className="text-white/60 text-sm italic mb-6">
              The compression of the past into a conversational surface. 2022 →
            </p>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
              <div>
                <p className="text-[10px] font-mono tracking-[0.3em] uppercase text-white/40 mb-1">Below</p>
                <p className="text-white/70">Layers 1–5 complete</p>
              </div>
              <div>
                <p className="text-[10px] font-mono tracking-[0.3em] uppercase text-sky-300/70 mb-1">Here</p>
                <p className="text-sky-200">Layer 6 inhabited</p>
              </div>
              <div>
                <p className="text-[10px] font-mono tracking-[0.3em] uppercase text-white/40 mb-1">Next</p>
                <p className="text-white/70">Layer 7 emerging (agentic)</p>
              </div>
              <div>
                <p className="text-[10px] font-mono tracking-[0.3em] uppercase text-white/40 mb-1">Horizon</p>
                <p className="text-white/70">Layers 8–10 under construction</p>
              </div>
            </div>
          </div>
        </section>

        {/* ═══════════════════════════════════════════════════ */}
        {/* Phase legend */}
        {/* ═══════════════════════════════════════════════════ */}
        <section className="mb-20">
          <h2 className="text-2xl font-black mb-3">Stack status</h2>
          <p className="text-white/50 text-sm mb-8">
            The 24 layers, grouped by phase of construction. Canonical reference is{' '}
            <a href="/lineage" className="text-sky-300 hover:text-sky-200 underline decoration-sky-400/30 underline-offset-2">
              /lineage
            </a>.
          </p>

          <div className="space-y-8">
            {(['present', 'emerging', 'speculative', 'complete', 'mythic'] as const).map((phase) => {
              const items = layersByPhase[phase];
              if (!items.length) return null;
              return (
                <div key={phase}>
                  <div className="flex items-baseline gap-3 mb-3">
                    <span className={`text-[10px] font-mono tracking-[0.4em] uppercase px-2 py-0.5 rounded-full border ${phaseTone[phase]}`}>
                      {phase === 'present' ? 'we are here' : phase}
                    </span>
                    <p className="text-xs text-white/40 italic">{phaseDescription(phase)}</p>
                  </div>
                  <div className="flex flex-wrap gap-2">
                    {items.map((l) => (
                      <div
                        key={l.n}
                        className={`rounded-lg border px-3 py-2 text-sm ${phaseTone[l.phase]}`}
                      >
                        <span className="font-mono text-[10px] opacity-60 mr-2">{String(l.n).padStart(2, '0')}</span>
                        <span className="font-medium">{l.name}</span>
                      </div>
                    ))}
                  </div>
                </div>
              );
            })}
          </div>
        </section>

        {/* ═══════════════════════════════════════════════════ */}
        {/* Active paradoxes */}
        {/* ═══════════════════════════════════════════════════ */}
        <section className="mb-20">
          <p className="text-[10px] font-mono tracking-[0.4em] uppercase text-white/40 mb-2">
            Transition Layer
          </p>
          <h2 className="text-3xl font-black mb-3">Paradoxes under active choice</h2>
          <p className="text-white/60 text-sm max-w-2xl mb-10">
            At every phase transition, the field must decide which paradox to
            resolve and which to preserve. These are the live ones. WXZA's stance
            at each is the real product of this company.
          </p>

          <div className="space-y-5">
            {activeParadoxes.map((p) => (
              <div
                key={p.id}
                className="glass-light rounded-2xl border border-white/10 p-6 md:p-7"
              >
                <div className="flex flex-wrap items-baseline gap-x-4 gap-y-1 mb-3">
                  <h3 className="text-xl font-black text-sky-200">{p.axis}</h3>
                  <p className="text-[11px] font-mono tracking-widest text-white/40 uppercase">
                    {p.poleA} · {p.poleB}
                  </p>
                </div>
                <p className="text-white/70 leading-relaxed mb-4">{p.stakes}</p>
                <div className="grid md:grid-cols-2 gap-4 pt-4 border-t border-white/5">
                  <div>
                    <p className="text-[10px] font-mono tracking-[0.3em] uppercase text-white/40 mb-2">
                      Common industry choice
                    </p>
                    <p className="text-sm text-white/60 leading-relaxed italic">{p.commonChoices}</p>
                  </div>
                  <div>
                    <p className="text-[10px] font-mono tracking-[0.3em] uppercase text-sky-300/70 mb-2">
                      WXZA stance
                    </p>
                    <p className="text-sm text-sky-100/90 leading-relaxed">{p.wxzaStance}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* ═══════════════════════════════════════════════════ */}
        {/* Position */}
        {/* ═══════════════════════════════════════════════════ */}
        <section className="mb-20">
          <div className="border border-sky-400/20 rounded-3xl p-8 md:p-10 bg-gradient-to-br from-sky-500/[0.04] to-transparent">
            <p className="text-[10px] font-mono tracking-[0.4em] uppercase text-sky-300/70 mb-6">
              The stance
            </p>
            <p className="text-2xl md:text-3xl font-light leading-snug text-sky-50">
              Every lab has committed to one horn of the central paradox. Safe
              vs. powerful. Open vs. aligned. Commercial vs. research. WXZA's
              stance, made explicit by what it has built: <em className="text-white not-italic font-normal">the paradox is the asset. Collapsing it is the failure mode.</em>
            </p>
            <div className="mt-10 flex flex-wrap gap-3 text-xs">
              <a href="/architecture" className="px-4 py-2 rounded-full border border-sky-400/40 text-sky-200 hover:bg-sky-500/10 transition-colors font-mono tracking-widest uppercase">
                Read the manifesto →
              </a>
              <a href="/lineage" className="px-4 py-2 rounded-full border border-white/15 text-white/70 hover:bg-white/5 transition-colors font-mono tracking-widest uppercase">
                See the lineage →
              </a>
            </div>
          </div>
        </section>

        <footer className="pt-10 border-t border-white/5 text-center">
          <p className="text-[11px] italic tracking-[0.25em] text-white/25">
            the architecture listens
          </p>
        </footer>
      </div>
    </div>
  );
}
