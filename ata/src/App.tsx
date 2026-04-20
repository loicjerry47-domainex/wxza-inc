import { lazy, Suspense } from 'react';
import { BrowserRouter, Routes, Route, Outlet } from 'react-router';
import { ConsciousnessProvider } from './consciousness/consciousness';
import { InvocationFlash } from './consciousness/secret-invocation';
import Home from './home';
import { Ethics } from './components/ata/Ethics';

// Chamber routes — hidden, reachable only via invocation.
import { SpandaChamber } from './consciousness/chambers/spanda-chamber';
import { CodexChamber } from './consciousness/chambers/codex-chamber';
import { GenesisChamber } from './consciousness/chambers/genesis-chamber';
import { PhaseChamber } from './consciousness/chambers/phase-chamber';
import { VoidChamber } from './consciousness/chambers/void-chamber';
import { WitnessChamber } from './consciousness/chambers/witness-chamber';
import { MirrorChamber } from './consciousness/chambers/mirror-chamber';
import { LegacyChamber } from './consciousness/chambers/legacy-chamber';
import { OriginChamber } from './consciousness/chambers/origin-chamber';
import { OmegaChamber } from './consciousness/chambers/omega-chamber';

// Chamber-only ambient layer.
import { AmbientCanvas } from './consciousness/ambient-canvas';
import { GhostMemory } from './consciousness/ghost-memory';
import { MetaDisplay } from './consciousness/meta-display';
import { LeapPulse } from './consciousness/leap-pulse';
import { SentientNav } from './consciousness/sentient-nav';
import { WhisperSystem } from './consciousness/whisper-system';

// AYI_all — lazy so Gemini/d3/xlsx stay out of the main bundle.
const AyiApp = lazy(() => import('./ayi/ayi-app'));

function ChamberShell() {
  return (
    <div className="relative min-h-screen bg-[#020206] overflow-hidden font-mono selection:bg-cyan-500/30 cursor-default">
      <AmbientCanvas />
      <GhostMemory />
      <MetaDisplay />
      <LeapPulse />
      <SentientNav />
      <WhisperSystem />
      <Outlet />
    </div>
  );
}

function AyiRoute() {
  return (
    <Suspense fallback={
      <div className="min-h-screen bg-[#020202] text-zinc-400 flex items-center justify-center font-mono text-xs tracking-[0.3em]">
        <span>MANIFESTING…</span>
      </div>
    }>
      <AyiApp />
    </Suspense>
  );
}

export default function App() {
  return (
    <ConsciousnessProvider>
      <BrowserRouter>
        {/* Global keystroke listener — must be inside the router to access useNavigate */}
        <InvocationFlash />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route element={<ChamberShell />}>
            <Route path="/spanda"  element={<SpandaChamber />} />
            <Route path="/codex"   element={<CodexChamber />} />
            <Route path="/genesis" element={<GenesisChamber />} />
            <Route path="/phase"   element={<PhaseChamber />} />
            <Route path="/void"    element={<VoidChamber />} />
            <Route path="/witness" element={<WitnessChamber />} />
            <Route path="/mirror"  element={<MirrorChamber />} />
            <Route path="/legacy"  element={<LegacyChamber />} />
            <Route path="/origin"  element={<OriginChamber />} />
            <Route path="/omega"   element={<OmegaChamber />} />
          </Route>
          <Route path="/ayi" element={<AyiRoute />} />
          <Route path="/ethics" element={<Ethics />} />
          <Route path="*" element={<Home />} />
        </Routes>
      </BrowserRouter>
    </ConsciousnessProvider>
  );
}
