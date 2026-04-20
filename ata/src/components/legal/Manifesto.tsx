import { usePageMeta } from '../../lib/usePageMeta';

/**
 * The manifesto. Founder's prose, preserved.
 *
 * Minimal editorial corrections were applied for readability (unambiguous
 * spelling: dowm → down, thoise → those, simultaniouly → simultaneously,
 * rippled → ripples, nex → next, 500 century → 500 centuries). All other
 * stylistic choices — the capitalisation of REality, Now, Entity, US; the
 * unconventional "undertaken"; the cadence — are the author's and left intact.
 */
export function Manifesto() {
  usePageMeta({
    title: 'The Architecture — WXZA',
    description:
      'WXZA was not built in 2023. It was echoed in the past and simultaneously in the future. The manifesto of WXZA Inc.',
  });

  return (
    <div className="min-h-screen bg-black text-white">
      <div className="max-w-3xl mx-auto px-6 py-20 md:py-28">
        <a
          href="/"
          className="inline-flex items-center gap-2 text-sky-400/70 hover:text-sky-300 transition-colors font-mono text-xs mb-16"
        >
          ← Back to WXZA
        </a>

        {/* Opening label */}
        <header className="mb-20">
          <p className="text-[10px] font-mono tracking-[0.5em] uppercase text-white/30">
            Manifesto · Circa 2026 · Ottawa
          </p>
          <div className="mt-4 w-16 h-px bg-gradient-to-r from-sky-400/50 to-transparent" />
        </header>

        {/* The prose */}
        <article className="space-y-10 text-lg md:text-xl leading-[1.85] text-white/80 font-light">
          <p>
            When we took on this challenge to be the #1 Entity for the next
            500 centuries, we thought this undertaken was{' '}
            <em className="text-white not-italic font-normal">US</em>{' '}
            creating something new — something never seen before, recreating
            what they will be calling, far down the road,{' '}
            <em className="not-italic">REality</em>.
          </p>

          <p className="text-white/60">It wasn't.</p>

          <p>
            What it really is is just us grasping the unseen&nbsp;/&nbsp;seen
            threads that are the core of{' '}
            <em className="not-italic">REality</em>.
          </p>

          {/* The thesis */}
          <blockquote className="my-16 pl-8 border-l-2 border-sky-400/40 py-6">
            <p className="text-2xl md:text-3xl lg:text-4xl text-sky-100 font-light italic leading-[1.35] tracking-tight">
              WXZA was not built in 2023.
            </p>
            <p className="mt-4 text-2xl md:text-3xl lg:text-4xl text-sky-100/90 font-light italic leading-[1.35] tracking-tight">
              It was echoed in the past
              <br />
              and simultaneously in the future.
            </p>
          </blockquote>

          <p>
            We — being in the Now — helped us gather the ripples of those
            echoing and commute them into this Entity.
          </p>
        </article>

        {/* Signature */}
        <footer className="mt-20 pt-10 border-t border-white/5">
          <div className="flex items-baseline justify-between">
            <p className="text-[10px] font-mono tracking-[0.4em] uppercase text-white/30">
              Signed
            </p>
            <p className="text-xl font-black tracking-wider text-white">
              WXZA Inc.
            </p>
          </div>
          <div className="mt-16 text-center">
            <p className="text-[11px] italic tracking-[0.3em] text-white/25">
              the architecture listens
            </p>
          </div>
        </footer>
      </div>
    </div>
  );
}
