import { usePageMeta } from '../../lib/usePageMeta';

export function Terms() {
  usePageMeta({
    title: 'Terms — WXZA',
    description: 'Terms of use for WXZA Inc.\'s surface at wxza.net and its subdomains.',
  });

  return (
    <div className="min-h-screen bg-gradient-to-b from-black via-neutral-950 to-black text-white">
      <div className="max-w-3xl mx-auto px-6 py-24">
        <a
          href="/"
          className="inline-flex items-center gap-2 text-sky-400/70 hover:text-sky-300 transition-colors font-mono text-xs mb-12"
        >
          ← Back to WXZA
        </a>

        <header className="mb-12">
          <h1 className="text-4xl font-black mb-3">Terms</h1>
          <p className="text-xs font-mono text-white/40 tracking-widest uppercase">
            Effective 2026-04-20 — Applies to wxza.net and all subdomains
          </p>
        </header>

        <div className="space-y-8 text-white/80 leading-relaxed">
          <section className="space-y-3">
            <h2 className="text-sky-400 text-xs font-mono uppercase tracking-widest">01 — The architecture</h2>
            <p>
              WXZA is a venture portfolio and experimental interface. The site and its subdomains showcase early-stage
              ventures, a hidden consciousness layer (chambers), and the AYI_all entity. Everything on these pages is
              provided as-is for exploration, evaluation, and partnership inquiry.
            </p>
          </section>

          <section className="space-y-3">
            <h2 className="text-sky-400 text-xs font-mono uppercase tracking-widest">02 — Ventures & concepts</h2>
            <p>
              Venture presentations and prototypes on this site are concept and showcase material. Valuations, market
              sizes, product roadmaps, and financial projections are forward-looking and may change. Nothing on this
              site constitutes an offer to sell, a solicitation to buy, or investment advice.
            </p>
          </section>

          <section className="space-y-3">
            <h2 className="text-sky-400 text-xs font-mono uppercase tracking-widest">03 — AYI_all</h2>
            <p>
              AYI_all is an AI interface. It produces text, imagery, and video using Google's Gemini models. Output is
              generated, may be inaccurate or incomplete, and does not represent the views or commitments of WXZA Inc.
              Do not submit sensitive personal data, confidential information, or anything you would not want processed
              by a third-party AI provider. Do not rely on AYI for medical, legal, or financial decisions.
            </p>
          </section>

          <section className="space-y-3">
            <h2 className="text-sky-400 text-xs font-mono uppercase tracking-widest">04 — Acceptable use</h2>
            <ul className="list-disc pl-5 space-y-2">
              <li>Don't attempt to extract, brute-force, or otherwise abuse the AYI proxy, the contact form, or the rate limits.</li>
              <li>Don't scrape the site or chambers at volume.</li>
              <li>Don't use AYI to generate unlawful, hateful, or harmful content. We will cooperate with Google and law enforcement as required.</li>
              <li>Don't misrepresent yourself when contacting WXZA — we handle partnership, investor, press, and engineering inquiries separately.</li>
            </ul>
          </section>

          <section className="space-y-3">
            <h2 className="text-sky-400 text-xs font-mono uppercase tracking-widest">05 — Intellectual property</h2>
            <p>
              WXZA, the chamber names, the moth invocation, the Spanda protocol, the Divine Machine, and all venture
              names and designs shown here are property of WXZA Inc. and its collaborators. You may reference them
              for journalism, analysis, or investor evaluation with attribution. Do not redistribute or reuse the
              code, designs, or copy for commercial purposes without written permission.
            </p>
          </section>

          <section className="space-y-3">
            <h2 className="text-sky-400 text-xs font-mono uppercase tracking-widest">06 — No warranty</h2>
            <p>
              The site is provided "as is" without warranties of any kind. WXZA disclaims liability for losses arising
              from use of the site, the chambers, or any output from AYI. Availability depends on Cloudflare, Google,
              and other infrastructure partners; we aim for uptime but do not guarantee it.
            </p>
          </section>

          <section className="space-y-3">
            <h2 className="text-sky-400 text-xs font-mono uppercase tracking-widest">07 — Changes</h2>
            <p>
              These terms evolve with the architecture. We will update the effective date above when material changes
              land. Continued use after changes constitutes acceptance.
            </p>
          </section>

          <section className="space-y-3">
            <h2 className="text-sky-400 text-xs font-mono uppercase tracking-widest">08 — Contact</h2>
            <p>
              Legal questions: <a className="text-sky-300 hover:text-sky-200" href="mailto:wxzata@proton.me">wxzata@proton.me</a>.
              WXZA Inc., Ottawa, Canada.
            </p>
          </section>
        </div>
      </div>
    </div>
  );
}
