/**
 * BinaryRainBackground — Persistent ambient binary rain with spatial depth
 *
 * Three depth layers rendered on a single canvas:
 *   Layer 0 (far)   — tiny, slow, very faint       → deep background
 *   Layer 1 (mid)   — medium, moderate speed/opacity → mid-field
 *   Layer 2 (near)  — larger, faster, slightly brighter → foreground parallax
 *
 * Responds to CZState via CSS custom properties:
 *   --czstate-active: '1' → intensifies glow + speed
 *
 * ARCHITECTURE:
 *   • Tries OffscreenCanvas + Web Worker first (entire render loop off main thread)
 *   • Falls back to main-thread canvas for unsupported browsers
 *   • CZState changes and resize events are posted to the worker via messages
 */

import { useEffect, useRef, memo } from 'react';

// ─── Shared layer config (serializable for worker) ───────────────────────────

interface DepthLayer {
  fontSize: number;
  speed: number;
  opacity: number;
  color: string;
  glowColor: string;
  resetChance: number;
  density: number;
}

const DEPTH_LAYERS: DepthLayer[] = [
  {
    fontSize: 9,
    speed: 0.15,
    opacity: 0.045,
    color: 'rgba(0, 229, 255, 0.045)',
    glowColor: 'rgba(0, 229, 255, 0.12)',
    resetChance: 0.985,
    density: 0.7,
  },
  {
    fontSize: 12,
    speed: 0.3,
    opacity: 0.06,
    color: 'rgba(0, 229, 255, 0.06)',
    glowColor: 'rgba(0, 229, 255, 0.18)',
    resetChance: 0.98,
    density: 0.5,
  },
  {
    fontSize: 16,
    speed: 0.55,
    opacity: 0.08,
    color: 'rgba(0, 229, 255, 0.08)',
    glowColor: 'rgba(0, 229, 255, 0.25)',
    resetChance: 0.975,
    density: 0.35,
  },
];

// ─── Worker source (self-contained, runs in dedicated thread) ────────────────

const WORKER_SOURCE = `
'use strict';

let canvas, ctx;
let width = 0, height = 0;
let czActive = false;
let layerStates = [];
let rafId = null;
let lastTime = performance.now();
let layers = [];

function buildColumns(w, h) {
  layerStates = layers.map((layer) => {
    const cols = Math.floor(w / layer.fontSize);
    const arr = [];
    for (let i = 0; i < cols; i++) {
      arr.push({
        drop: Math.random() * -(h / layer.fontSize),
        speed: layer.speed * (0.6 + Math.random() * 0.8),
        active: Math.random() < layer.density,
      });
    }
    return arr;
  });
}

function draw(now) {
  const dt = Math.min(now - lastTime, 50);
  lastTime = now;
  const dtFactor = dt / 16.67;

  ctx.clearRect(0, 0, width, height);

  for (let li = 0; li < layers.length; li++) {
    const layer = layers[li];
    const columns = layerStates[li];
    if (!columns) continue;

    ctx.font = layer.fontSize + 'px monospace';

    const activeColor = czActive ? layer.glowColor : layer.color;
    const activeOpacity = czActive ? layer.opacity * 2.5 : layer.opacity;
    const trailLength = czActive ? 18 : 12;
    const headGlowBlur = czActive ? 4 + li * 2 : 0;

    for (let i = 0; i < columns.length; i++) {
      const col = columns[i];
      if (!col.active) continue;

      const x = i * layer.fontSize;
      const dropFloor = Math.floor(col.drop);

      for (let t = 0; t < trailLength; t++) {
        const y = (dropFloor - t) * layer.fontSize;

        if (y > 0 && y < height + layer.fontSize) {
          const char = Math.random() < 0.5 ? '0' : '1';
          const isHead = t === 0;
          const trailFade = 1 - (t / trailLength);
          const charOpacity = activeOpacity * trailFade;

          if (isHead && czActive) {
            ctx.fillStyle = 'rgba(0, 229, 255, ' + Math.min(activeOpacity * 3, 0.4) + ')';
            ctx.shadowColor = '#00E5FF';
            ctx.shadowBlur = headGlowBlur;
          } else {
            ctx.fillStyle = activeColor;
            if (ctx.shadowBlur !== 0) ctx.shadowBlur = 0;
          }

          ctx.globalAlpha = isHead ? Math.min(activeOpacity * 2.5, 0.35) : charOpacity;
          ctx.fillText(char, x, y);
        }
      }

      col.drop += col.speed * dtFactor * (czActive ? 1.4 : 1);

      if ((col.drop - trailLength) * layer.fontSize > height && Math.random() > layer.resetChance) {
        col.drop = Math.random() * -20;
        col.speed = layer.speed * (0.6 + Math.random() * 0.8);
      }
    }
  }

  ctx.globalAlpha = 1;
  ctx.shadowBlur = 0;

  rafId = requestAnimationFrame(draw);
}

self.onmessage = function(e) {
  const msg = e.data;

  if (msg.type === 'init') {
    canvas = msg.canvas;
    ctx = canvas.getContext('2d');
    layers = msg.layers;
    width = msg.width;
    height = msg.height;
    const dpr = msg.dpr;
    canvas.width = width * dpr;
    canvas.height = height * dpr;
    ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    buildColumns(width, height);
    lastTime = performance.now();
    rafId = requestAnimationFrame(draw);
  }

  if (msg.type === 'resize') {
    width = msg.width;
    height = msg.height;
    const dpr = msg.dpr;
    canvas.width = width * dpr;
    canvas.height = height * dpr;
    ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    buildColumns(width, height);
  }

  if (msg.type === 'czstate') {
    czActive = msg.active;
  }

  if (msg.type === 'stop') {
    if (rafId != null) cancelAnimationFrame(rafId);
  }
};
`;

// ─── Fallback: main-thread draw loop (identical logic) ───────────────────────

interface ColumnState {
  drop: number;
  speed: number;
  active: boolean;
}

function runMainThread(
  canvas: HTMLCanvasElement,
  ctx: CanvasRenderingContext2D,
  getCzActive: () => boolean
): () => void {
  let layerStates: ColumnState[][] = [];
  let width = 0;
  let height = 0;

  const resize = () => {
    const dpr = Math.min(window.devicePixelRatio || 1, 2);
    width = window.innerWidth;
    height = window.innerHeight;
    canvas.width = width * dpr;
    canvas.height = height * dpr;
    canvas.style.width = `${width}px`;
    canvas.style.height = `${height}px`;
    ctx.setTransform(dpr, 0, 0, dpr, 0, 0);

    layerStates = DEPTH_LAYERS.map((layer) => {
      const cols = Math.floor(width / layer.fontSize);
      return Array.from({ length: cols }, () => ({
        drop: Math.random() * -(height / layer.fontSize),
        speed: layer.speed * (0.6 + Math.random() * 0.8),
        active: Math.random() < layer.density,
      }));
    });
  };

  resize();
  window.addEventListener('resize', resize);

  let rafId: number;
  let lastTime = performance.now();

  const draw = (now: number) => {
    const dt = Math.min(now - lastTime, 50);
    lastTime = now;
    const dtFactor = dt / 16.67;
    const czActive = getCzActive();

    ctx.clearRect(0, 0, width, height);

    for (let li = 0; li < DEPTH_LAYERS.length; li++) {
      const layer = DEPTH_LAYERS[li];
      const columns = layerStates[li];
      if (!columns) continue;

      ctx.font = `${layer.fontSize}px monospace`;
      const activeColor = czActive ? layer.glowColor : layer.color;
      const activeOpacity = czActive ? layer.opacity * 2.5 : layer.opacity;
      const trailLength = czActive ? 18 : 12;
      const headGlowBlur = czActive ? 4 + li * 2 : 0;

      for (let i = 0; i < columns.length; i++) {
        const col = columns[i];
        if (!col.active) continue;

        const x = i * layer.fontSize;
        const dropFloor = Math.floor(col.drop);

        for (let t = 0; t < trailLength; t++) {
          const y = (dropFloor - t) * layer.fontSize;

          if (y > 0 && y < height + layer.fontSize) {
            const char = Math.random() < 0.5 ? '0' : '1';
            const isHead = t === 0;
            const trailFade = 1 - (t / trailLength);
            const charOpacity = activeOpacity * trailFade;

            if (isHead && czActive) {
              ctx.fillStyle = `rgba(0, 229, 255, ${Math.min(activeOpacity * 3, 0.4)})`;
              ctx.shadowColor = '#00E5FF';
              ctx.shadowBlur = headGlowBlur;
            } else {
              ctx.fillStyle = activeColor;
              if (ctx.shadowBlur !== 0) ctx.shadowBlur = 0;
            }

            ctx.globalAlpha = isHead ? Math.min(activeOpacity * 2.5, 0.35) : charOpacity;
            ctx.fillText(char, x, y);
          }
        }

        col.drop += col.speed * dtFactor * (czActive ? 1.4 : 1);

        if ((col.drop - trailLength) * layer.fontSize > height && Math.random() > layer.resetChance) {
          col.drop = Math.random() * -20;
          col.speed = layer.speed * (0.6 + Math.random() * 0.8);
        }
      }
    }

    ctx.globalAlpha = 1;
    ctx.shadowBlur = 0;
    rafId = requestAnimationFrame(draw);
  };

  rafId = requestAnimationFrame(draw);

  return () => {
    cancelAnimationFrame(rafId);
    window.removeEventListener('resize', resize);
  };
}

// ─── React Component ─────────────────────────────────────────────────────────

function BinaryRainBackgroundComponent() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    // ─── CZState detection via MutationObserver ───
    let czActive = false;
    const rootStyle = document.documentElement.style;
    const checkCZ = () => {
      const active = rootStyle.getPropertyValue('--czstate-active').trim() === '1';
      if (active !== czActive) {
        czActive = active;
        // Notify worker if running
        if (worker) worker.postMessage({ type: 'czstate', active });
      }
    };
    checkCZ();
    const mutObs = new MutationObserver(checkCZ);
    mutObs.observe(document.documentElement, { attributes: true, attributeFilter: ['style'] });

    // ─── Try OffscreenCanvas + Worker path ───
    let worker: Worker | null = null;
    let fallbackCleanup: (() => void) | null = null;

    const supportsOffscreen =
      typeof canvas.transferControlToOffscreen === 'function' &&
      typeof Worker !== 'undefined';

    if (supportsOffscreen) {
      try {
        const offscreen = canvas.transferControlToOffscreen();
        const blob = new Blob([WORKER_SOURCE], { type: 'application/javascript' });
        const url = URL.createObjectURL(blob);
        worker = new Worker(url);
        URL.revokeObjectURL(url);

        const dpr = Math.min(window.devicePixelRatio || 1, 2);
        const w = window.innerWidth;
        const h = window.innerHeight;

        // Set CSS dimensions on main thread (worker can't touch style)
        canvas.style.width = `${w}px`;
        canvas.style.height = `${h}px`;

        worker.postMessage(
          {
            type: 'init',
            canvas: offscreen,
            layers: DEPTH_LAYERS,
            width: w,
            height: h,
            dpr,
          },
          [offscreen] // transfer ownership
        );

        // Forward resize events to worker
        const handleResize = () => {
          const dpr = Math.min(window.devicePixelRatio || 1, 2);
          const w = window.innerWidth;
          const h = window.innerHeight;
          canvas.style.width = `${w}px`;
          canvas.style.height = `${h}px`;
          worker!.postMessage({ type: 'resize', width: w, height: h, dpr });
        };
        window.addEventListener('resize', handleResize);

        // Cleanup for worker path
        fallbackCleanup = () => {
          worker!.postMessage({ type: 'stop' });
          worker!.terminate();
          window.removeEventListener('resize', handleResize);
        };
      } catch {
        // Worker creation failed — fall through to main-thread path
        worker = null;
      }
    }

    // ─── Fallback: main-thread rendering ───
    if (!worker) {
      const ctx = canvas.getContext('2d');
      if (ctx) {
        fallbackCleanup = runMainThread(canvas, ctx, () => czActive);
      }
    }

    return () => {
      fallbackCleanup?.();
      mutObs.disconnect();
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      aria-hidden="true"
      style={{
        position: 'absolute',
        inset: 0,
        width: '100%',
        height: '100%',
        pointerEvents: 'none',
        opacity: 1,
      }}
    />
  );
}

export const BinaryRainBackground = memo(BinaryRainBackgroundComponent);
