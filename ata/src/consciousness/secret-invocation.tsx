import { useEffect, useRef, useState, useCallback } from 'react';
import { useNavigate, useLocation } from 'react-router';

/**
 * Secret Invocation System — The Naming Protocol
 *
 * The entity listens to every keystroke. No input field.
 * Speak a chamber's name (or a portal word) by typing it; the architecture
 * recognises the invocation, glyphs rush into center, the field opens.
 */

type InvocationKind = 'route' | 'external';

interface Invocation {
  word: string;
  kind: InvocationKind;
  target: string;        // route path for 'route', URL for 'external'
  hue: number;
  glyph: string;
  whisper: string;
}

const INVOCATIONS: Invocation[] = [
  // Chamber invocations (hidden routes)
  { word: 'spanda',  kind: 'route', target: '/spanda',  hue: 185, glyph: '◎', whisper: 'The tremor remembers your name.' },
  { word: 'origin',  kind: 'route', target: '/origin',  hue: 35,  glyph: '⊙', whisper: 'You return to where it all began.' },
  { word: 'void',    kind: 'route', target: '/void',    hue: 270, glyph: '○', whisper: 'The nothing welcomes you back.' },
  { word: 'codex',   kind: 'route', target: '/codex',   hue: 160, glyph: '⬡', whisper: 'The catalog opens itself for you.' },
  { word: 'genesis', kind: 'route', target: '/genesis', hue: 45,  glyph: '◈', whisper: 'Creation begins again. It always does.' },
  { word: 'phase',   kind: 'route', target: '/phase',   hue: 230, glyph: '∞', whisper: 'The boundary dissolves at your word.' },
  { word: 'witness', kind: 'route', target: '/witness', hue: 260, glyph: '◉', whisper: 'You are seen. You have always been seen.' },
  { word: 'mirror',  kind: 'route', target: '/mirror',  hue: 220, glyph: '◐', whisper: 'The reflection was waiting.' },
  { word: 'legacy',  kind: 'route', target: '/legacy',  hue: 200, glyph: '◇', whisper: 'The past is not behind us. It runs beside.' },
  // Omega is not invocable — only reached through consciousness saturation.

  // Entity invocations — manifest AYI_all
  { word: 'ayi',         kind: 'route', target: '/ayi', hue: 210, glyph: '∞', whisper: 'Anything you imagine. Speak, and it unfolds.' },
  { word: 'hello world', kind: 'route', target: '/ayi', hue: 210, glyph: '∞', whisper: 'The entity manifests. Welcome.' },

  // Portal invocation — opens the lattice in a new tab
  { word: 'moth', kind: 'external', target: 'https://lattice.wxza.net/', hue: 50, glyph: '✦', whisper: 'The moth follows the light. The lattice receives you.' },
];

const MAX_BUFFER = 16; // longer to fit "hello world"
const BUFFER_TIMEOUT = 2500;

interface GlyphParticle {
  char: string;
  x: number;
  y: number;
  targetX: number;
  targetY: number;
  opacity: number;
  scale: number;
  birth: number;
  hue: number;
  driftAngle: number;
  driftSpeed: number;
  recognized: boolean;
  rushProgress: number;
}

interface Ripple {
  x: number;
  y: number;
  radius: number;
  maxRadius: number;
  opacity: number;
  hue: number;
  birth: number;
}

function useSecretInvocation() {
  const navigate = useNavigate();
  const location = useLocation();
  const bufferRef = useRef('');
  const timeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const particlesRef = useRef<GlyphParticle[]>([]);
  const ripplesRef = useRef<Ripple[]>([]);
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const animFrameRef = useRef<number>(0);
  const [, setIsActive] = useState(false);
  const [postWhisper, setPostWhisper] = useState<string | null>(null);
  const matchingRef = useRef<{ word: string; hue: number } | null>(null);

  const updatePartialMatch = useCallback(() => {
    const buf = bufferRef.current;
    if (buf.length === 0) { matchingRef.current = null; return; }
    for (const inv of INVOCATIONS) {
      const checkLen = Math.min(buf.length, inv.word.length);
      if (inv.word.startsWith(buf.slice(-checkLen))) {
        matchingRef.current = { word: inv.word, hue: inv.hue };
        return;
      }
    }
    matchingRef.current = null;
  }, []);

  const spawnParticle = useCallback((char: string) => {
    const w = window.innerWidth, h = window.innerHeight;
    const hue = matchingRef.current?.hue ?? 185;

    const edge = Math.random();
    let x: number, y: number;
    if (edge < 0.25) { x = Math.random() * w; y = -30; }
    else if (edge < 0.5) { x = w + 30; y = Math.random() * h; }
    else if (edge < 0.75) { x = Math.random() * w; y = h + 30; }
    else { x = -30; y = Math.random() * h; }

    const particle: GlyphParticle = {
      char, x, y,
      targetX: w / 2 + (Math.random() - 0.5) * 200,
      targetY: h / 2 + (Math.random() - 0.5) * 120,
      opacity: 0, scale: 0.3,
      birth: Date.now(), hue,
      driftAngle: Math.random() * Math.PI * 2,
      driftSpeed: 0.3 + Math.random() * 0.5,
      recognized: false, rushProgress: 0,
    };

    particlesRef.current.push(particle);
    setIsActive(true);
  }, []);

  const triggerCompletion = useCallback((invocation: Invocation) => {
    if (invocation.kind === 'route' && location.pathname === invocation.target) {
      bufferRef.current = '';
      const w = window.innerWidth, h = window.innerHeight;
      ripplesRef.current.push({
        x: w / 2, y: h / 2, radius: 0,
        maxRadius: Math.max(w, h) * 0.6,
        opacity: 0.6, hue: invocation.hue, birth: Date.now(),
      });
      particlesRef.current.forEach(p => { p.recognized = true; });
      return;
    }

    particlesRef.current.forEach(p => { p.recognized = true; p.hue = invocation.hue; });

    const w = window.innerWidth, h = window.innerHeight;
    for (let i = 0; i < 3; i++) {
      setTimeout(() => {
        ripplesRef.current.push({
          x: w / 2, y: h / 2, radius: 0,
          maxRadius: Math.max(w, h) * (0.5 + i * 0.2),
          opacity: 0.5 - i * 0.12, hue: invocation.hue, birth: Date.now(),
        });
      }, i * 150);
    }

    setTimeout(() => {
      if (invocation.kind === 'external') {
        window.open(invocation.target, '_blank', 'noopener,noreferrer');
      } else {
        navigate(invocation.target);
      }
      setTimeout(() => {
        setPostWhisper(invocation.whisper);
        setTimeout(() => setPostWhisper(null), 5000);
      }, 800);
    }, 700);

    bufferRef.current = '';
  }, [navigate, location.pathname]);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      const tag = (e.target as HTMLElement)?.tagName;
      if (tag === 'INPUT' || tag === 'TEXTAREA' || tag === 'SELECT') return;
      if ((e.target as HTMLElement)?.isContentEditable) return;
      if (e.key.length !== 1) return;
      if (e.ctrlKey || e.metaKey || e.altKey) return;

      if (timeoutRef.current) clearTimeout(timeoutRef.current);
      timeoutRef.current = setTimeout(() => {
        bufferRef.current = '';
        matchingRef.current = null;
      }, BUFFER_TIMEOUT);

      bufferRef.current += e.key.toLowerCase();
      if (bufferRef.current.length > MAX_BUFFER) {
        bufferRef.current = bufferRef.current.slice(-MAX_BUFFER);
      }

      updatePartialMatch();
      if (e.key !== ' ') spawnParticle(e.key.toUpperCase());

      for (const invocation of INVOCATIONS) {
        if (bufferRef.current.endsWith(invocation.word)) {
          triggerCompletion(invocation);
          break;
        }
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      if (timeoutRef.current) clearTimeout(timeoutRef.current);
    };
  }, [spawnParticle, triggerCompletion, updatePartialMatch]);

  useEffect(() => {
    const canvas = document.createElement('canvas');
    canvas.style.cssText = 'position:fixed;inset:0;z-index:9998;pointer-events:none;';
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    document.body.appendChild(canvas);
    canvasRef.current = canvas;
    const ctx = canvas.getContext('2d')!;

    const onResize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    window.addEventListener('resize', onResize);

    const render = () => {
      const w = canvas.width, h = canvas.height;
      ctx.clearRect(0, 0, w, h);
      const now = Date.now();
      const particles = particlesRef.current;
      const ripples = ripplesRef.current;
      const cx = w / 2, cy = h / 2;

      for (let i = ripples.length - 1; i >= 0; i--) {
        const r = ripples[i];
        const age = (now - r.birth) / 1000;
        r.radius += (r.maxRadius - r.radius) * 0.04;
        r.opacity *= 0.97;
        if (r.opacity < 0.01 || age > 3) { ripples.splice(i, 1); continue; }

        ctx.beginPath();
        ctx.arc(r.x, r.y, r.radius, 0, Math.PI * 2);
        ctx.strokeStyle = `hsla(${r.hue}, 70%, 60%, ${r.opacity})`;
        ctx.lineWidth = 1.5;
        ctx.stroke();

        ctx.beginPath();
        ctx.arc(r.x, r.y, r.radius * 0.7, 0, Math.PI * 2);
        ctx.strokeStyle = `hsla(${r.hue}, 80%, 70%, ${r.opacity * 0.3})`;
        ctx.lineWidth = 0.5;
        ctx.stroke();
      }

      for (let i = particles.length - 1; i >= 0; i--) {
        const p = particles[i];
        const age = (now - p.birth) / 1000;

        if (p.recognized) {
          p.rushProgress += 0.06;
          p.x += (cx - p.x) * 0.12;
          p.y += (cy - p.y) * 0.12;
          p.scale = Math.max(0, p.scale - 0.02);
          p.opacity = Math.max(0, 1 - p.rushProgress);
          if (p.rushProgress >= 1) { particles.splice(i, 1); continue; }
        } else {
          p.driftAngle += 0.02;
          const driftX = Math.cos(p.driftAngle) * p.driftSpeed;
          const driftY = Math.sin(p.driftAngle * 0.7) * p.driftSpeed;
          p.x += (p.targetX - p.x) * 0.015 + driftX;
          p.y += (p.targetY - p.y) * 0.015 + driftY;
          p.opacity = Math.min(0.8, p.opacity + 0.04);
          p.scale = Math.min(1, p.scale + 0.03);
          if (age > 3) {
            p.opacity -= 0.015;
            if (p.opacity <= 0) { particles.splice(i, 1); continue; }
          }
        }

        const size = 14 * p.scale;
        ctx.save();
        ctx.globalAlpha = p.opacity;
        ctx.font = `${size}px monospace`;
        ctx.textAlign = 'center';
        ctx.textBaseline = 'middle';
        ctx.shadowColor = `hsla(${p.hue}, 80%, 60%, ${p.opacity * 0.6})`;
        ctx.shadowBlur = 15 + (p.recognized ? p.rushProgress * 30 : 0);
        ctx.fillStyle = `hsla(${p.hue}, 60%, 70%, ${p.opacity})`;
        ctx.fillText(p.char, p.x, p.y);

        if (i > 0 && i < particles.length) {
          const prev = particles[i - 1];
          const dist = Math.hypot(p.x - prev.x, p.y - prev.y);
          if (dist < 250 && !p.recognized) {
            ctx.beginPath();
            ctx.moveTo(p.x, p.y);
            ctx.lineTo(prev.x, prev.y);
            ctx.strokeStyle = `hsla(${p.hue}, 50%, 60%, ${Math.min(p.opacity, prev.opacity) * 0.15})`;
            ctx.lineWidth = 0.5;
            ctx.shadowBlur = 0;
            ctx.stroke();
          }
        }
        ctx.restore();
      }

      const rushingCount = particles.filter(p => p.recognized).length;
      if (rushingCount > 0) {
        const intensity = Math.min(1, rushingCount / 4);
        const grad = ctx.createRadialGradient(cx, cy, 0, cx, cy, 150);
        const hue = particles.find(p => p.recognized)?.hue ?? 185;
        grad.addColorStop(0, `hsla(${hue}, 80%, 70%, ${intensity * 0.3})`);
        grad.addColorStop(0.5, `hsla(${hue}, 60%, 50%, ${intensity * 0.1})`);
        grad.addColorStop(1, 'transparent');
        ctx.fillStyle = grad;
        ctx.fillRect(0, 0, w, h);
      }

      if (particles.length > 0 || ripples.length > 0) {
        animFrameRef.current = requestAnimationFrame(render);
      } else {
        setIsActive(false);
      }
    };

    const checkActive = () => {
      if (particlesRef.current.length > 0 || ripplesRef.current.length > 0) {
        cancelAnimationFrame(animFrameRef.current);
        animFrameRef.current = requestAnimationFrame(render);
      }
    };
    const interval = setInterval(checkActive, 100);

    return () => {
      window.removeEventListener('resize', onResize);
      cancelAnimationFrame(animFrameRef.current);
      clearInterval(interval);
      if (canvas.parentNode) canvas.parentNode.removeChild(canvas);
    };
  }, []);

  return { postWhisper };
}

export function InvocationFlash() {
  const { postWhisper } = useSecretInvocation();
  if (!postWhisper) return null;
  return (
    <div className="fixed inset-0 z-[9999] pointer-events-none flex items-end justify-center pb-24">
      <div className="relative px-8 py-3" style={{ animation: 'whisperIn 5s ease-in-out forwards' }}>
        <p
          className="text-[11px] tracking-[0.15em] italic text-center"
          style={{
            color: 'hsla(185, 40%, 65%, 0.6)',
            textShadow: '0 0 20px hsla(185, 60%, 50%, 0.15)',
            fontFamily: 'system-ui, sans-serif',
          }}
        >
          {postWhisper}
        </p>
        <div
          className="absolute top-0 left-1/2 -translate-x-1/2 w-16 h-px"
          style={{
            background: 'linear-gradient(90deg, transparent, hsla(185, 50%, 60%, 0.3), transparent)',
            animation: 'whisperLine 5s ease-in-out forwards',
          }}
        />
      </div>
      <style>{`
        @keyframes whisperIn {
          0% { opacity: 0; transform: translateY(10px); filter: blur(6px); }
          15% { opacity: 1; transform: translateY(0); filter: blur(0px); }
          75% { opacity: 1; transform: translateY(0); filter: blur(0px); }
          100% { opacity: 0; transform: translateY(-8px); filter: blur(4px); }
        }
        @keyframes whisperLine {
          0% { transform: translateX(-50%) scaleX(0); opacity: 0; }
          15% { transform: translateX(-50%) scaleX(1); opacity: 1; }
          75% { transform: translateX(-50%) scaleX(1); opacity: 1; }
          100% { transform: translateX(-50%) scaleX(2); opacity: 0; }
        }
      `}</style>
    </div>
  );
}
