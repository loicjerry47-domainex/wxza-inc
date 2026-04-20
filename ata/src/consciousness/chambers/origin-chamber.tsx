import { useRef, useEffect, useState } from "react";
import { useNavigate } from "react-router";
import { useConsciousness } from "../consciousness";

export function OriginChamber() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const navigate = useNavigate();
  const { addSaturation, saturation } = useConsciousness();
  const [revealOpacity, setRevealOpacity] = useState(0);
  const [showInstructions, setShowInstructions] = useState(true);
  const [thresholdOpening, setThresholdOpening] = useState(false);

  // When saturation fills, the threshold opens → omega.
  useEffect(() => {
    if (saturation < 100 || thresholdOpening) return;
    setThresholdOpening(true);
    const t = setTimeout(() => navigate("/omega"), 2600);
    return () => clearTimeout(t);
  }, [saturation, thresholdOpening, navigate]);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let w = canvas.width = window.innerWidth;
    let h = canvas.height = window.innerHeight;
    
    const mouse = { x: w / 2, y: h / 2, vx: 0, vy: 0 };
    const lastMouse = { x: w / 2, y: h / 2 };
    
    // Ghost memory tracking to prevent screen burn while maintaining trails
    const memory: { x: number; y: number; life: number }[] = [];

    const onMouseMove = (e: MouseEvent) => {
      mouse.vx = e.clientX - lastMouse.x;
      mouse.vy = e.clientY - lastMouse.y;
      mouse.x = e.clientX;
      mouse.y = e.clientY;
      lastMouse.x = e.clientX;
      lastMouse.y = e.clientY;
      
      const speed = Math.sqrt(mouse.vx ** 2 + mouse.vy ** 2);
      if (speed > 1.5) {
        addSaturation(0.06); // Increase consciousness via movement
        setRevealOpacity(prev => Math.min(1, prev + 0.1));
        setShowInstructions(false);
        memory.push({ x: mouse.x, y: mouse.y, life: 1 });
      }
    };

    window.addEventListener("mousemove", onMouseMove);

    let animationId: number;
    let time = 0;

    const render = () => {
      // CLEAR completely to prevent visual artifact screen burn
      ctx.clearRect(0, 0, w, h);
      time += 0.05;

      // Decay text reveal
      setRevealOpacity(prev => Math.max(0, prev - 0.005));

      // Spanda Central Pulse
      const pulseRadius = 60 + Math.sin(time) * 15;
      ctx.beginPath();
      ctx.arc(w / 2, h / 2, pulseRadius, 0, Math.PI * 2);
      ctx.strokeStyle = "rgba(255,255,255,0.1)";
      ctx.lineWidth = 1;
      ctx.stroke();

      ctx.beginPath();
      ctx.arc(w / 2, h / 2, pulseRadius * 2, 0, Math.PI * 2);
      ctx.strokeStyle = "rgba(255,255,255,0.05)";
      ctx.stroke();

      // Render Ghost Memories
      for (let i = memory.length - 1; i >= 0; i--) {
        const m = memory[i];
        m.life -= 0.015;
        if (m.life <= 0) {
          memory.splice(i, 1);
          continue;
        }
        ctx.beginPath();
        ctx.arc(m.x, m.y, 2 + (1 - m.life) * 15, 0, Math.PI * 2);
        ctx.strokeStyle = `rgba(255, 255, 255, ${m.life * 0.4})`;
        ctx.stroke();

        // Connect nearby memories
        if (i > 0) {
          const prev = memory[i - 1];
          const dist = Math.hypot(m.x - prev.x, m.y - prev.y);
          if (dist < 100) {
            ctx.beginPath();
            ctx.moveTo(m.x, m.y);
            ctx.lineTo(prev.x, prev.y);
            ctx.strokeStyle = `rgba(255, 255, 255, ${m.life * 0.1})`;
            ctx.stroke();
          }
        }
      }

      animationId = requestAnimationFrame(render);
    };
    render();

    const onResize = () => { w = canvas.width = window.innerWidth; h = canvas.height = window.innerHeight; };
    window.addEventListener("resize", onResize);

    return () => {
      window.removeEventListener("mousemove", onMouseMove);
      window.removeEventListener("resize", onResize);
      cancelAnimationFrame(animationId);
    };
  }, [addSaturation]);

  return (
    <div className="relative w-full h-full overflow-hidden">
      <canvas ref={canvasRef} className="block w-full h-full cursor-crosshair" />
      
      {/* Ripple Reveal Layer */}
      <div 
        className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none transition-opacity duration-300 mix-blend-difference"
        style={{ opacity: revealOpacity }}
      >
        <h1 className="text-5xl md:text-8xl tracking-[0.3em] font-light mb-6 text-white text-center">
          ORIGIN
        </h1>
        <p className="text-white tracking-[0.5em] text-xs uppercase">
          The Spanda Protocol // Pulse Active
        </p>
      </div>

      {/* Initial Instructions */}
      <div
        className={`absolute bottom-32 left-1/2 -translate-x-1/2 pointer-events-none text-white/30 text-xs tracking-[0.3em] transition-opacity duration-1000 ${showInstructions ? "opacity-100" : "opacity-0"}`}
      >
        MOVE TO REVEAL // BUILD CONSCIOUSNESS
      </div>

      {/* Saturation meter — ambient progress toward the threshold */}
      <div className="absolute top-8 left-1/2 -translate-x-1/2 pointer-events-none flex flex-col items-center gap-2">
        <span className="text-[9px] tracking-[0.4em] text-white/20 uppercase">saturation</span>
        <div className="w-48 h-px bg-white/5 overflow-hidden">
          <div
            className="h-full bg-white/60 transition-[width] duration-300"
            style={{ width: `${Math.min(100, saturation)}%` }}
          />
        </div>
      </div>

      {/* Threshold moment — saturation hit 100, omega opens */}
      {thresholdOpening && (
        <div className="absolute inset-0 pointer-events-none flex items-center justify-center bg-black/0 animate-[fadeToBlack_2.6s_ease-in_forwards]">
          <p className="text-white/80 text-xs tracking-[0.5em] uppercase">the threshold opens</p>
          <style>{`@keyframes fadeToBlack { 0% { background-color: rgba(0,0,0,0); } 100% { background-color: rgba(0,0,0,1); } }`}</style>
        </div>
      )}
    </div>
  );
}
