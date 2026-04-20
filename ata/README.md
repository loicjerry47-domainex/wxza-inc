# WXZA

The unified surface. One React/Vite app + Cloudflare Pages Functions backend:

- **Venture portfolio** — 10 showcases (ATABLE NEURAL 2077, NIMBUS BIOME, LENSSTORM, OTO, HFLO, Gcraft, HEARb ASSIST, PRO'S (flagship), INECT, Mparker) with live-ticking domain metrics.
- **Spanda chambers** (hidden) — 10 consciousness chambers reachable only by speaking their name into the architecture.
- **AYI_all** (entity) — server-proxied Gemini interface with persistent chat history.
- **Lattice portal** — `moth` invocation opens `lattice.wxza.net` in a new tab.
- **Ethics / Privacy / Terms** at `/ethics`, `/privacy`, `/terms`.
- **Contact form** — modal with Resend-backed delivery via `/api/contact`.

## Running locally

```bash
npm install
npm run dev          # http://localhost:3000
npm run build        # produces ./dist
npm run preview      # preview the production build
npm run typecheck    # tsc --noEmit
```

Local dev runs the Vite client only — Pages Functions (AYI proxy, contact form) only execute when deployed to Cloudflare or when using `wrangler pages dev` locally. To test functions locally:

```bash
npm install -g wrangler
wrangler pages dev dist -- npm run dev
```

## Environment variables

No client-side keys. All secrets live in Cloudflare Pages env vars.

### Required on Cloudflare Pages (Settings → Environment variables → Production)

| Variable | Purpose |
|---|---|
| `GEMINI_API_KEY` | Server-side key for the AYI proxy (`/api/ayi/*`). Restrict to Generative Language API in Google Cloud Console + referrer-lock to `*.wxza.net/*`. |

### Optional (recommended)

| Variable | Purpose |
|---|---|
| `AYI_RATE_LIMIT_PER_MIN` | Per-IP rate limit for the AYI proxy. Default `20`. |
| `RESEND_API_KEY` | Resend key for the contact form (`/api/contact`). If unset, submissions are accepted and logged but no email is sent. |
| `CONTACT_TO` | Email address to deliver contact-form messages to (e.g. `wxzata@proton.me`). |
| `CONTACT_FROM` | Verified Resend sender (e.g. `WXZA <no-reply@wxza.net>`). |

### Optional KV bindings

| Binding | Purpose |
|---|---|
| `CONTACT_KV` | If set, every contact submission is archived in KV as `contact:<iso-timestamp>:<uuid>`. Graceful: if not bound, submissions are still accepted. |

## Deploying to Cloudflare Pages

1. Push the repo to GitHub.
2. Cloudflare Pages → **Create project → Connect to Git** → pick the repo.
3. Build settings:
   - Framework preset: **Vite**
   - Build command: `npm run build`
   - Build output directory: `dist`
   - Root directory: `ata` (if your repo has this project nested; blank otherwise)
4. Set the env vars above.
5. Add a Cloudflare Web Analytics token (dashboard → Analytics & Logs → Web Analytics) and replace `REPLACE_WITH_CF_ANALYTICS_TOKEN` in `index.html`.
6. SPA routing: `public/_redirects` is already included with the `/*  /index.html  200` rule so chamber / AYI routes don't 404 on refresh.
7. `functions/` is auto-discovered by Pages — the AYI proxy and contact endpoint go live automatically.

## The Invocation System

No input field. The architecture listens to every keystroke. Speak a word by typing it — glyphs rush to center, the field opens.

| Type              | Effect                                               |
|-------------------|------------------------------------------------------|
| `spanda`          | Spanda chamber — the primordial tremor               |
| `codex`           | Codex chamber — material catalog                     |
| `genesis`         | Genesis chamber — creation timeline                  |
| `phase`           | Phase chamber — boundary dissolution                 |
| `void`            | Void chamber — the nothing                           |
| `witness`         | Witness chamber — you are seen                       |
| `mirror`          | Mirror chamber — the reflection                      |
| `legacy`          | Legacy chamber — the past runs beside                |
| `origin`          | Origin chamber — build consciousness saturation      |
| `ayi`             | Manifest the AYI_all entity                          |
| `hello world`     | Also manifests AYI_all                               |
| `moth`            | Opens `lattice.wxza.net` in a new tab                |
| *(omega)*         | Not invocable — reached only through saturation      |

Timeout is 2.5s — finish the word before the buffer decays.

## Layout

```
ata/
  functions/                     → Cloudflare Pages Functions (server-side)
    api/
      ayi/[[path]].ts            → transparent Gemini proxy (injects GEMINI_API_KEY)
      contact.ts                 → contact form handler (Resend + optional KV archive)
  public/
    _redirects                   → SPA fallback for router
  src/
    App.tsx                      → router shell (BrowserRouter + ConsciousnessProvider)
    home.tsx                     → '/' surface (ventures portfolio, PRO'S flagship)
    main.tsx                     → entry
    index.css                    → tailwind v4 + global base
    lib/
      usePageMeta.ts             → per-route title/description/OG tag hook
    components/
      prototypes/                → 10 venture showcases
        shared/LiveTicker.tsx    → real-time animated metrics bar
      shared/
        ContactModal.tsx         → contact form dialog
        BreathingTileBackground, ScrollToTop, KeyboardShortcutsPanel
      ui/                        → shadcn primitives
      ata/Ethics.tsx             → /ethics route
      legal/
        Privacy.tsx              → /privacy route
        Terms.tsx                → /terms route
    consciousness/
      consciousness.tsx          → unified Provider + useConsciousness (+ saturation)
      secret-invocation.tsx      → keystroke listener + glyph canvas + whisper
      chambers/                  → 10 chamber components
      (ambient, ghost-memory, meta-display, leap-pulse, sentient-nav, whisper-system)
    ayi/
      ayi-app.tsx                → AYI_all (lazy-loaded, proxied, localStorage-persisted)
      components/                → AYI chat UI
      utils/fileParser.ts
      types.ts
    utils/animationConfig.ts
```

## Architecture notes

- **Server-proxied AYI.** The client configures `@google/genai` with `baseUrl: '/api/ayi'`. The Pages Function at `functions/api/ayi/[[path]].ts` is a transparent proxy that strips client headers, injects `GEMINI_API_KEY`, and forwards to `generativelanguage.googleapis.com`. No key ships in the bundle. Rate-limited per IP.
- **Chat persistence.** AYI messages are saved to `localStorage` (`wxza.ayi.messages.v1`), capped at the last 50 messages. Streams aren't persisted until they settle.
- **Code-split AYI.** `vite.config.ts` emits `@google/genai`, `mammoth`, `xlsx` as an `ayi` chunk — it only downloads when someone speaks `ayi` or `hello world`.
- **Consciousness saturation.** The Omega chamber is intentionally not invocable. It's reached by going to `/origin`, moving the cursor to build saturation, and hitting the 100 threshold — then the surface fades and auto-navigates to `/omega`.
- **Privacy-first analytics.** Cloudflare Web Analytics — cookieless, no identifiers. No third-party trackers.
- **Ventures hierarchy.** PRO'S is promoted as the flagship (full-width card, distinct CTA). ATABLE NEURAL, NIMBUS, and OTO carry $ valuations. The other six are marked `CONCEPT` — this is the "choose your value" philosophy in practice.

## Honest limits

- Chat history lives in each browser's localStorage, not server-side — clearing site data or switching devices resets it.
- The live ticker values are simulated (drift + noise). Real venture telemetry isn't wired yet.
- No authentication — everyone sees the same ventures. Personalization would need a D1 layer.
- The chambers do heavy canvas work and don't yet honour `prefers-reduced-motion`.
- Image assets pull from Unsplash CDN — fine for demo, should move to R2 or Cloudflare Images at real traffic scale.
