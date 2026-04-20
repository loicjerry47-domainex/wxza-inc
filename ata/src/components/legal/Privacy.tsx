import { usePageMeta } from '../../lib/usePageMeta';

export function Privacy() {
  usePageMeta({
    title: 'Privacy — WXZA',
    description: 'How WXZA Inc. handles information on wxza.net and its subdomains.',
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
          <h1 className="text-4xl font-black mb-3">Privacy</h1>
          <p className="text-xs font-mono text-white/40 tracking-widest uppercase">
            Effective 2026-04-20 — Applies to wxza.net and all subdomains
          </p>
        </header>

        <div className="space-y-8 text-white/80 leading-relaxed">
          <section className="space-y-3">
            <h2 className="text-sky-400 text-xs font-mono uppercase tracking-widest">Scope</h2>
            <p>
              This site is a venture portfolio, a creative experience, and an interface to the AYI_all entity.
              We keep data handling minimal on purpose. No accounts, no cookies for tracking, no advertising pixels.
            </p>
          </section>

          <section className="space-y-3">
            <h2 className="text-sky-400 text-xs font-mono uppercase tracking-widest">What we collect</h2>
            <ul className="list-disc pl-5 space-y-2">
              <li>
                <strong className="text-white">Contact submissions.</strong> When you send a message via the contact form,
                we receive your name, email, company (optional), topic, and message. We use these to reply to you and for
                nothing else. We do not sell, share, or analyse them for marketing.
              </li>
              <li>
                <strong className="text-white">AYI_all conversations.</strong> Messages you send to AYI are proxied through
                Google's Gemini API server-side. Content is subject to Google's own retention for abuse monitoring
                (see <a className="text-sky-300 hover:text-sky-200" href="https://ai.google.dev/terms" target="_blank" rel="noreferrer">Gemini API terms</a>).
                We do not persist your conversations on our servers; chat history lives only in your browser's localStorage.
              </li>
              <li>
                <strong className="text-white">Aggregate analytics.</strong> Cloudflare Web Analytics records anonymous
                page views via a privacy-friendly, cookieless beacon. No user identifiers, no cross-site tracking.
              </li>
              <li>
                <strong className="text-white">Server logs.</strong> Cloudflare retains edge logs (IP, user-agent, path)
                for operational security. These are not used for profiling and rotate out per Cloudflare's policies.
              </li>
            </ul>
          </section>

          <section className="space-y-3">
            <h2 className="text-sky-400 text-xs font-mono uppercase tracking-widest">What we don't collect</h2>
            <p>
              No behavioural tracking, no advertising SDKs, no fingerprinting. No cookies are set by WXZA itself —
              the only storage on your device is the AYI chat history you generate, which you can clear at any time
              by clearing site data in your browser settings.
            </p>
          </section>

          <section className="space-y-3">
            <h2 className="text-sky-400 text-xs font-mono uppercase tracking-widest">Your choices</h2>
            <ul className="list-disc pl-5 space-y-2">
              <li>Request deletion of any contact submission by emailing <a className="text-sky-300 hover:text-sky-200" href="mailto:wxzata@proton.me">wxzata@proton.me</a>.</li>
              <li>Clear AYI chat history via your browser's site data settings.</li>
              <li>The moth invocation opens lattice.wxza.net in a new tab — that property has its own terms.</li>
            </ul>
          </section>

          <section className="space-y-3">
            <h2 className="text-sky-400 text-xs font-mono uppercase tracking-widest">Contact</h2>
            <p>
              Questions about privacy? <a className="text-sky-300 hover:text-sky-200" href="mailto:wxzata@proton.me">wxzata@proton.me</a>.
              This document will evolve with the architecture. Material changes will be reflected in the effective date above.
            </p>
          </section>
        </div>
      </div>
    </div>
  );
}
