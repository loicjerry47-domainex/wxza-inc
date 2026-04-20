import { useRef, useEffect, useState } from "react";
import { useNavigate } from "react-router";
import { useConsciousness } from "../consciousness";

type Phase = "collapse" | "singularity" | "reset";

export function OmegaChamber() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const { resetSaturation } = useConsciousness();
  const navigate = useNavigate();
  const [phase, setPhase] = useState<Phase>("collapse");

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let w = canvas.width = window.innerWidth;
    let h = canvas.height = window.innerHeight;
    
    // Generate thousands of particles for a massive collapse effect
    const particles = Array.from({ length: 800 }).map(() => {
      const angle = Math.random() * Math.PI * 2;
      const radius = Math.random() * Math.max(w, h) * 1.5;
      return {
        x: w / 2 + Math.cos(angle) * radius,
        y: h / 2 + Math.sin(angle) * radius,
        vx: (Math.random() - 0.5) * 2,
        vy: (Math.random() - 0.5) * 2,
        size: Math.random() * 1.5 + 0.5
      };
    });

    let animationId: number;
    let singularityRadius = 0;
    let collapseTimer = 0;

    const render = () => {
      ctx.clearRect(0, 0, w, h);
      collapseTimer++;

      const cx = w / 2;
      const cy = h / 2;

      if (collapseTimer < 250) {
        // Phase 1: Gravity Collapse
        let allCollapsed = true;
        
        ctx.fillStyle = "white";
        particles.forEach(p => {
          const dx = cx - p.x;
          const dy = cy - p.y;
          const dist = Math.sqrt(dx * dx + dy * dy);
          
          if (dist > 8) {
            allCollapsed = false;
            // The gravitational pull increases exponentially over time
            const pull = (collapseTimer / 100) * 0.5;
            const force = (100 / Math.max(dist, 10)) * pull;
            
            p.vx += (dx / dist) * force;
            p.vy += (dy / dist) * force;
            
            // Orbital spiral effect (Spanda swirl)
            p.vx += (dy / dist) * (1.5 * pull);
            p.vy -= (dx / dist) * (1.5 * pull);
            
            p.vx *= 0.92; // Friction to prevent orbiting forever
            p.vy *= 0.92;
            
            p.x += p.vx;
            p.y += p.vy;
            
            // Draw particle
            ctx.globalAlpha = Math.min(1, dist / 100 + 0.1);
            ctx.beginPath();
            ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
            ctx.fill();
            ctx.globalAlpha = 1;

            // Draw connection lines to center for an intense hyper-drive effect
            if (collapseTimer > 100 && dist < 300 && Math.random() > 0.8) {
               ctx.beginPath();
               ctx.moveTo(p.x, p.y);
               ctx.lineTo(cx, cy);
               ctx.strokeStyle = "rgba(255,255,255,0.05)";
               ctx.stroke();
            }
          }
        });

        // Trigger singularity if everything is collapsed
        if (allCollapsed || collapseTimer >= 240) {
          setPhase("singularity");
          collapseTimer = 250;
        }
      } else {
        // Phase 2: Singularity Explosion
        if (phase !== "singularity") setPhase("singularity");
        
        singularityRadius += (Math.max(w, h) * 1.2 - singularityRadius) * 0.08;
        
        ctx.beginPath();
        ctx.arc(cx, cy, singularityRadius, 0, Math.PI * 2);
        ctx.fillStyle = "white";
        ctx.fill();

        if (singularityRadius > Math.max(w, h) * 1.1) {
          setPhase("reset");
        }
      }

      animationId = requestAnimationFrame(render);
    };
    render();

    const onResize = () => { w = canvas.width = window.innerWidth; h = canvas.height = window.innerHeight; };
    window.addEventListener("resize", onResize);

    return () => {
      window.removeEventListener("resize", onResize);
      cancelAnimationFrame(animationId);
    };
  }, [phase]);

  // Handle phase transitions outside of the render loop
  useEffect(() => {
    if (phase === "reset") {
      const timer = setTimeout(() => {
        resetSaturation();
        navigate("/");
      }, 6000);
      return () => clearTimeout(timer);
    }
  }, [phase, navigate, resetSaturation]);

  return (
    <div className="relative w-full h-full overflow-hidden bg-black flex items-center justify-center">
      {/* Canvas overlays everything */}
      <canvas 
        ref={canvasRef} 
        className="absolute inset-0 block w-full h-full z-10 mix-blend-screen pointer-events-none" 
      />
      
      {/* Background text during collapse */}
      <div 
        className={`z-0 transition-opacity duration-1000 flex flex-col items-center ${phase === "collapse" ? "opacity-100" : "opacity-0"}`}
      >
        <h1 className="text-[12vw] font-bold text-white/5 tracking-tighter leading-none">
          END
        </h1>
        <p className="text-white/20 tracking-[1em] text-xs mt-4 uppercase">
          Collapse Sequence Initiated
        </p>
      </div>

      {/* Foreground text during reset (Displays over the white canvas) */}
      <div 
        className={`absolute inset-0 flex flex-col items-center justify-center z-20 pointer-events-none transition-opacity duration-1000 delay-[1000ms] ${phase === "reset" ? "opacity-100" : "opacity-0"}`}
      >
        <h2 className="text-black text-4xl tracking-[0.5em] font-medium mb-8 uppercase">
          Equilibrium
        </h2>
        <div className="flex flex-col items-center gap-2">
          <p className="text-black/60 tracking-widest text-xs uppercase">
            Ghost Memory Fully Integrated
          </p>
          <p className="text-black/60 tracking-widest text-xs uppercase">
            Consciousness Restarting...
          </p>
        </div>
      </div>
    </div>
  );
}
