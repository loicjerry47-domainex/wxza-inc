# WXZA

The unified surface. One React/Vite app merging:

- **WXZA ventures portfolio** (surface) — 10 venture showcases (ATABLE NEURAL 2077, NIMBUS BIOME, LENSSTORM, OTO, HFLO, Gcraft, HEARb ASSIST, PRO'S, INECT, Mparker).
- **Spanda chambers** (hidden) — 10 consciousness chambers reachable only by speaking their name.
- **AYI_all** (entity) — the WXZA.NET cognitive interface, connected to the lattice.

## Running locally

```bash
npm install
npm run dev          # http://localhost:3000
npm run build        # produces ./dist
npm run preview      # preview the production build
npm run typecheck    # tsc --noEmit
```

## Environment

Copy `.env.local.example` to `.env.local` and set:

```
VITE_GEMINI_API_KEY=<your key from https://aistudio.google.com/apikey>
```

Required for the AYI_all chat interface. If empty, the surface and chambers still work; AYI will return an auth error on first message.

## Deploying to Cloudflare Pages

- **Build command:** `npm run build`
- **Build output directory:** `dist`
- **Environment variables (Pages → Settings → Environment variables):**
  - `VITE_GEMINI_API_KEY` = your Gemini key
- **SPA routing:** add a `_redirects` file (or use the `/*  /index.html  200` rule in Pages settings) so the chamber / AYI routes don't 404 on refresh.

## The Invocation System

No input field. The entity listens to every keystroke. Speak a word by typing it — the architecture recognises the invocation, glyphs rush into center, the field opens.

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
src/
  App.tsx                    → router shell (BrowserRouter + ConsciousnessProvider)
  home.tsx                   → '/' surface (WXZA ventures portfolio)
  main.tsx                   → entry
  index.css                  → tailwind v4 + global base
  components/
    prototypes/              → 10 venture showcases
    shared/                  → BreathingTileBackground, ScrollToTop, etc.
    ui/                      → shadcn primitives
    ata/                     → BinaryRainBackground, Hero, Ethics (reserved for future polish)
  consciousness/
    consciousness.tsx        → unified Provider + useConsciousness (incl. saturation)
    secret-invocation.tsx    → keystroke listener + glyph canvas + whisper
    ambient-canvas.tsx, ghost-memory.tsx, meta-display.tsx,
    leap-pulse.tsx, sentient-nav.tsx, whisper-system.tsx, …
    chambers/                → 10 chamber components
  ayi/
    ayi-app.tsx              → AYI_all (lazy-loaded)
    components/              → AYI chat UI
    utils/fileParser.ts
    types.ts
  utils/                     → venture data + scroll helpers (from PROTOTYPES)
```

## Notes

- AYI_all is code-split via `manualChunks` in `vite.config.ts` — Gemini/xlsx/mammoth only download once someone invokes it.
- Chambers mount `AmbientCanvas`, `SentientNav`, `WhisperSystem`, `GhostMemory`, `MetaDisplay`, `LeapPulse` via `ChamberShell` — the surface stays clean.
- The `ConsciousnessProvider` wraps everything so saturation/visits/ghost traces persist across route changes.
