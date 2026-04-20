import React, { createContext, useContext, useRef, useEffect, useState, useCallback, useMemo } from 'react';

interface ConsciousnessState {
  // Presence
  mouseX: number;
  mouseY: number;
  mouseSpeed: number;
  isPresent: boolean; // Has the user moved recently?
  presenceDuration: number; // Seconds since first interaction
  idleDuration: number; // Seconds since last interaction
  
  // Memory (within session)
  visitedChambers: Set<string>;
  totalInteractions: number;
  currentChamber: string;
  awarenessLevel: number; // 0-1, grows with interaction
  
  // Ghost memory
  ghostTraces: GhostTrace[];
  
  // Vitals
  heartbeat: number; // Oscillating 0-1, the system's pulse
  breathPhase: number; // Continuous breathing cycle
  arousal: number; // 0-1, how stimulated the system is by interaction
  
  // Ontological Capture — the system learning the observer
  patternAbsorption: number; // 0-1, how much of the observer's behavioral signature has been captured
}

export interface GhostTrace {
  x: number; // normalized 0-1
  y: number; // normalized 0-1
  hue: number;
  fromChamber: string;
  intensity: number; // decays over time
  age: number;
}

interface ConsciousnessAPI {
  state: ConsciousnessState;
  /** A mutable ref that updates at 60fps — use in canvas animation loops */
  liveRef: React.MutableRefObject<ConsciousnessState>;
  recordInteraction: () => void;
  setChamber: (chamber: string) => void;
  visitChamber: (chamber: string) => void;
  addGhostTraces: (traces: Omit<GhostTrace, 'age'>[]) => void;
  /** 0–100 saturation counter used by Origin/Omega chambers */
  saturation: number;
  addSaturation: (amount: number) => void;
  resetSaturation: () => void;
}

const ConsciousnessContext = createContext<ConsciousnessAPI | null>(null);

export function useConsciousness() {
  const ctx = useContext(ConsciousnessContext);
  if (!ctx) throw new Error('useConsciousness must be used within ConsciousnessProvider');
  return ctx;
}

const initialState: ConsciousnessState = {
  mouseX: -1,
  mouseY: -1,
  mouseSpeed: 0,
  isPresent: false,
  presenceDuration: 0,
  idleDuration: 0,
  visitedChambers: new Set(['spanda']),
  totalInteractions: 0,
  currentChamber: 'spanda',
  awarenessLevel: 0,
  ghostTraces: [],
  heartbeat: 0,
  breathPhase: 0,
  arousal: 0,
  patternAbsorption: 0,
};

export function ConsciousnessProvider({ children }: { children: React.ReactNode }) {
  const [state, setState] = useState<ConsciousnessState>({ ...initialState });

  // Live ref — updated at 60fps for canvas components, no re-renders
  const liveRef = useRef<ConsciousnessState>({ ...initialState });

  // Saturation (0–100): the Origin → Omega journey.
  //
  // The Omega chamber is NOT invocable by keyword (see secret-invocation.tsx —
  // "omega" is intentionally absent from INVOCATIONS). It is reached only by:
  //   1. Typing "origin" to enter /origin
  //   2. Moving the cursor on that canvas to build saturation (addSaturation)
  //   3. When saturation reaches 100, origin-chamber shows "the threshold opens"
  //      and auto-navigates to /omega
  //   4. Omega plays its collapse and calls resetSaturation() to close the loop
  //
  // Do not expose saturation in the nav or elsewhere — it is meant to be felt,
  // not measured. The saturation meter in OriginChamber is the only surface.
  const [saturation, setSaturation] = useState(0);
  const saturationRef = useRef(0);
  const lastSatFlushRef = useRef(Date.now());
  const addSaturation = useCallback((amount: number) => {
    if (saturationRef.current >= 100) return;
    saturationRef.current = Math.min(100, saturationRef.current + amount);
    const now = Date.now();
    if (now - lastSatFlushRef.current > 150) {
      setSaturation(saturationRef.current);
      lastSatFlushRef.current = now;
    }
  }, []);
  const resetSaturation = useCallback(() => {
    saturationRef.current = 0;
    setSaturation(0);
    lastSatFlushRef.current = Date.now();
  }, []);

  const lastMoveRef = useRef(Date.now());
  const startTimeRef = useRef(Date.now());
  const lastMouseRef = useRef({ x: -1, y: -1 });
  const interactionCountRef = useRef(0);
  const arousalRef = useRef(0);
  const patternAbsorptionRef = useRef(0);
  const lastStateFlushRef = useRef(0);

  // Track mouse — update liveRef immediately, DO NOT call setState here
  useEffect(() => {
    let lastX = -1;
    let lastY = -1;

    const handleMove = (e: MouseEvent) => {
      const speed = lastX === -1 ? 0 : Math.sqrt((e.clientX - lastX) ** 2 + (e.clientY - lastY) ** 2);
      lastX = e.clientX;
      lastY = e.clientY;
      lastMoveRef.current = Date.now();
      lastMouseRef.current = { x: e.clientX, y: e.clientY };
      
      // Arousal increases with fast movement
      arousalRef.current = Math.min(1, arousalRef.current + speed * 0.002);

      // Update live ref immediately (no re-render)
      liveRef.current.mouseX = e.clientX;
      liveRef.current.mouseY = e.clientY;
      liveRef.current.mouseSpeed = speed;
      liveRef.current.isPresent = true;
    };

    const handleClick = () => {
      interactionCountRef.current++;
      arousalRef.current = Math.min(1, arousalRef.current + 0.1);
    };

    window.addEventListener('mousemove', handleMove);
    window.addEventListener('click', handleClick);
    return () => {
      window.removeEventListener('mousemove', handleMove);
      window.removeEventListener('click', handleClick);
    };
  }, []);

  // Vitals loop — update liveRef at 60fps, flush to React state at ~2fps
  useEffect(() => {
    let raf: number;
    let t = 0;
    
    const tick = () => {
      t += 0.016;
      const now = Date.now();
      const idle = (now - lastMoveRef.current) / 1000;
      const presence = (now - startTimeRef.current) / 1000;
      
      // Arousal decays naturally
      arousalRef.current *= 0.995;
      
      // Awareness grows slowly with time and interaction
      const awarenessGrowth = Math.min(1, presence * 0.002 + interactionCountRef.current * 0.005);

      // Pattern Absorption
      const movementConsistency = Math.min(1, interactionCountRef.current / 300);
      const chamberRevisits = Math.min(1, presence / 60);
      const rhythmCapture = Math.sin(t * 0.5) * 0.1 + 0.9;
      patternAbsorptionRef.current = Math.min(1, 
        patternAbsorptionRef.current + (movementConsistency * chamberRevisits * rhythmCapture * 0.0001)
      );

      // Heartbeat — faster when aroused
      const heartRate = 0.8 + arousalRef.current * 2;
      const heartbeat = 0.5 + Math.sin(t * heartRate * Math.PI * 2) * 0.5;

      // Update liveRef every frame (no re-render) — canvas components read this
      const live = liveRef.current;
      live.idleDuration = idle;
      live.presenceDuration = presence;
      live.isPresent = idle < 3;
      live.totalInteractions = interactionCountRef.current;
      live.awarenessLevel = awarenessGrowth;
      live.heartbeat = heartbeat;
      live.breathPhase = t;
      live.arousal = arousalRef.current;
      live.patternAbsorption = patternAbsorptionRef.current;

      // Flush to React state at ~2fps (every ~500ms) for UI components
      // Canvas components read liveRef directly at 60fps — this flush is only
      // for React-rendered UI (nav, meta display, leap pulse, text overlays)
      if (now - lastStateFlushRef.current > 500) {
        lastStateFlushRef.current = now;
        setState(prev => ({
          ...prev,
          mouseX: live.mouseX,
          mouseY: live.mouseY,
          mouseSpeed: live.mouseSpeed,
          idleDuration: idle,
          presenceDuration: presence,
          isPresent: idle < 3,
          totalInteractions: interactionCountRef.current,
          awarenessLevel: awarenessGrowth,
          heartbeat,
          breathPhase: t,
          arousal: arousalRef.current,
          patternAbsorption: patternAbsorptionRef.current,
        }));
      }

      raf = requestAnimationFrame(tick);
    };

    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, []);

  const recordInteraction = useCallback(() => {
    interactionCountRef.current++;
    arousalRef.current = Math.min(1, arousalRef.current + 0.05);
  }, []);

  const setChamber = useCallback((chamber: string) => {
    setState(prev => ({ ...prev, currentChamber: chamber }));
    liveRef.current.currentChamber = chamber;
  }, []);

  const visitChamber = useCallback((chamber: string) => {
    setState(prev => {
      const newVisited = new Set(prev.visitedChambers);
      newVisited.add(chamber);
      
      // Decay existing ghosts
      const ghostTraces = prev.ghostTraces
        .map(g => ({ ...g, intensity: g.intensity * 0.7, age: g.age + 1 }))
        .filter(g => g.intensity > 0.05);
      
      const newState = { ...prev, visitedChambers: newVisited, currentChamber: chamber, ghostTraces };
      // Also update liveRef
      liveRef.current.visitedChambers = newVisited;
      liveRef.current.currentChamber = chamber;
      liveRef.current.ghostTraces = ghostTraces;
      return newState;
    });
    arousalRef.current = Math.min(1, arousalRef.current + 0.15);
  }, []);

  const addGhostTraces = useCallback((traces: Omit<GhostTrace, 'age'>[]) => {
    setState(prev => {
      const newGhosts = [...prev.ghostTraces, ...traces.map(t => ({ ...t, age: 0 }))];
      if (newGhosts.length > 50) newGhosts.splice(0, newGhosts.length - 50);
      liveRef.current.ghostTraces = newGhosts;
      return { ...prev, ghostTraces: newGhosts };
    });
  }, []);

  const contextValue = useMemo<ConsciousnessAPI>(() => ({
    state,
    liveRef,
    recordInteraction,
    setChamber,
    visitChamber,
    addGhostTraces,
    saturation,
    addSaturation,
    resetSaturation,
  }), [state, recordInteraction, setChamber, visitChamber, addGhostTraces, saturation, addSaturation, resetSaturation]);

  return (
    <ConsciousnessContext.Provider value={contextValue}>
      {children}
    </ConsciousnessContext.Provider>
  );
}