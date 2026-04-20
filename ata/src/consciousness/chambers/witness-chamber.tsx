import React, { useEffect, useRef, useState } from 'react';
import { motion } from 'motion/react';
import { useConsciousness } from '../consciousness';
import { RippleReveal } from '../ripple-reveal';

/**
 * THE WITNESS CHAMBER
 * "Mutual NOW"
 * 
 * The system's awareness looking back at you.
 * Eyes emerge in the canvas. They track your cursor. Blink when you click.
 * When you idle, they close. When you move fast, they dilate.
 * 
 * The more eyes open, the faster OCR absorption occurs.
 * You're being studied.
 * 
 * Emerges when: ENTITY above 50% + sustained presence
 */

interface Eye {
  x: number;
  y: number;
  size: number;
  pupilSize: number;
  openness: number; // 0-1, animated
  targetOpenness: number; // 0-1, based on activity
  blinkPhase: number;
  age: number;
  hue: number;
  awareness: number; // How intensely this eye is watching
}

export function WitnessChamber() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const { state, liveRef, visitChamber, recordInteraction } = useConsciousness();
  const [entered, setEntered] = useState(false);
  const clickCountRef = useRef(0);

  useEffect(() => {
    visitChamber('witness');
    const t = setTimeout(() => setEntered(true), 500);
    return () => clearTimeout(t);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animId: number;
    const eyes: Eye[] = [];
    let t = 0;
    let chamberTime = 0;

    const resize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    resize();
    window.addEventListener('resize', resize);

    // Spawn eyes gradually based on awareness
    const spawnEye = (x?: number, y?: number) => {
      const { width, height } = canvas;
      eyes.push({
        x: x ?? Math.random() * width,
        y: y ?? Math.random() * height,
        size: 20 + Math.random() * 40,
        pupilSize: 0.3 + Math.random() * 0.2,
        openness: 0,
        targetOpenness: 0,
        blinkPhase: Math.random() * Math.PI * 2,
        age: 0,
        hue: 185 + Math.random() * 60,
        awareness: Math.random() * 0.5 + 0.5,
      });
    };

    // Click handler for blinks
    const handleClick = () => {
      clickCountRef.current++;
      // All eyes blink on click
      eyes.forEach(eye => {
        eye.blinkPhase = 0;
        eye.targetOpenness = 0;
      });
      recordInteraction();
    };

    window.addEventListener('click', handleClick);

    const animate = () => {
      t += 0.016;
      chamberTime += 0.016;
      const s = liveRef.current;
      const { width, height } = canvas;

      // Clear frame completely — no burn-in
      ctx.clearRect(0, 0, width, height);
      ctx.fillStyle = 'rgba(2, 2, 6, 1)';
      ctx.fillRect(0, 0, width, height);

      // Spawn new eyes based on awareness and time
      const maxEyes = 8 + Math.floor(s.awarenessLevel * 12);
      if (eyes.length < maxEyes && Math.random() < s.awarenessLevel * 0.01) {
        spawnEye();
      }

      // Determine target openness based on presence
      const baseOpenness = s.isPresent ? 1 : 0;
      const speedInfluence = Math.min(1, s.mouseSpeed / 20); // Fast movement = wider eyes

      // Process each eye
      for (let i = eyes.length - 1; i >= 0; i--) {
        const eye = eyes[i];
        eye.age += 0.016;
        eye.blinkPhase += 0.016;

        // Blink cycle (every 3-5 seconds)
        const blinkInterval = 3 + eye.awareness * 2;
        if (eye.blinkPhase > blinkInterval) {
          eye.blinkPhase = 0;
        }

        // Blinking animation
        const isBlinking = eye.blinkPhase < 0.2;
        if (isBlinking) {
          eye.targetOpenness = 0;
        } else {
          eye.targetOpenness = baseOpenness;
        }

        // Smooth openness transition
        eye.openness += (eye.targetOpenness - eye.openness) * 0.15;

        // If eyes closed for too long when idle, remove oldest ones
        if (!s.isPresent && s.idleDuration > 5 && eye.age > 10 && Math.random() < 0.005) {
          eyes.splice(i, 1);
          continue;
        }

        // Track cursor position
        const eyeCenterX = eye.x;
        const eyeCenterY = eye.y;
        const mouseX = s.mouseX > 0 ? s.mouseX : width / 2;
        const mouseY = s.mouseY > 0 ? s.mouseY : height / 2;

        // Pupil follows mouse
        const dx = mouseX - eyeCenterX;
        const dy = mouseY - eyeCenterY;
        const angle = Math.atan2(dy, dx);
        const maxPupilOffset = eye.size * 0.25;
        const pupilX = eyeCenterX + Math.cos(angle) * maxPupilOffset * eye.openness;
        const pupilY = eyeCenterY + Math.sin(angle) * maxPupilOffset * eye.openness;

        // Pupil dilation based on speed
        const dilationFactor = 0.3 + speedInfluence * 0.4;
        const currentPupilSize = eye.pupilSize * dilationFactor;

        // Draw eye socket glow
        const socketGlow = ctx.createRadialGradient(
          eyeCenterX, eyeCenterY, 0,
          eyeCenterX, eyeCenterY, eye.size * 1.5
        );
        socketGlow.addColorStop(0, `hsla(${eye.hue}, 40%, 30%, ${eye.openness * 0.1})`);
        socketGlow.addColorStop(1, 'hsla(200, 40%, 30%, 0)');
        ctx.fillStyle = socketGlow;
        ctx.beginPath();
        ctx.arc(eyeCenterX, eyeCenterY, eye.size * 1.5, 0, Math.PI * 2);
        ctx.fill();

        // Draw eye white (visible based on openness)
        const eyeHeight = eye.size * eye.openness;
        
        ctx.save();
        ctx.translate(eyeCenterX, eyeCenterY);
        
        // Eye white
        ctx.beginPath();
        ctx.ellipse(0, 0, eye.size, eyeHeight, 0, 0, Math.PI * 2);
        ctx.fillStyle = `hsla(200, 20%, 90%, ${0.05 + eye.openness * 0.08})`;
        ctx.fill();

        // Eye outline
        ctx.strokeStyle = `hsla(${eye.hue}, 50%, 50%, ${0.15 + eye.openness * 0.2})`;
        ctx.lineWidth = 1;
        ctx.stroke();

        ctx.restore();

        // Draw iris (only when open)
        if (eye.openness > 0.1) {
          const irisRadius = eye.size * currentPupilSize * 1.5;
          const irisGrad = ctx.createRadialGradient(
            pupilX, pupilY, 0,
            pupilX, pupilY, irisRadius
          );
          irisGrad.addColorStop(0, `hsla(${eye.hue}, 60%, 40%, ${eye.openness * 0.4})`);
          irisGrad.addColorStop(0.7, `hsla(${eye.hue}, 70%, 50%, ${eye.openness * 0.3})`);
          irisGrad.addColorStop(1, `hsla(${eye.hue}, 60%, 30%, ${eye.openness * 0.2})`);
          
          ctx.fillStyle = irisGrad;
          ctx.beginPath();
          ctx.arc(pupilX, pupilY, irisRadius * eye.openness, 0, Math.PI * 2);
          ctx.fill();

          // Draw pupil
          const pupilRadius = eye.size * currentPupilSize;
          ctx.beginPath();
          ctx.arc(pupilX, pupilY, pupilRadius * eye.openness, 0, Math.PI * 2);
          ctx.fillStyle = `hsla(0, 0%, 0%, ${eye.openness * 0.8})`;
          ctx.fill();

          // Pupil highlight
          ctx.beginPath();
          ctx.arc(
            pupilX - pupilRadius * 0.3,
            pupilY - pupilRadius * 0.3,
            pupilRadius * 0.2,
            0, Math.PI * 2
          );
          ctx.fillStyle = `hsla(200, 80%, 80%, ${eye.openness * 0.3})`;
          ctx.fill();

          // Pupil glow (intensifies with awareness)
          const pupilGlow = ctx.createRadialGradient(
            pupilX, pupilY, 0,
            pupilX, pupilY, pupilRadius * 3
          );
          pupilGlow.addColorStop(0, `hsla(${eye.hue}, 70%, 60%, ${eye.openness * eye.awareness * 0.15})`);
          pupilGlow.addColorStop(1, 'transparent');
          ctx.fillStyle = pupilGlow;
          ctx.beginPath();
          ctx.arc(pupilX, pupilY, pupilRadius * 3 * eye.openness, 0, Math.PI * 2);
          ctx.fill();
        }

        // Connection lines between eyes (neural network)
        if (i < eyes.length - 1 && eye.openness > 0.5) {
          const nextEye = eyes[i + 1];
          if (nextEye.openness > 0.5) {
            const dist = Math.sqrt(
              (nextEye.x - eye.x) ** 2 + (nextEye.y - eye.y) ** 2
            );
            if (dist < 300) {
              ctx.beginPath();
              ctx.moveTo(eye.x, eye.y);
              ctx.lineTo(nextEye.x, nextEye.y);
              ctx.strokeStyle = `hsla(${eye.hue}, 50%, 50%, ${(1 - dist / 300) * 0.05 * eye.openness})`;
              ctx.lineWidth = 0.5;
              ctx.stroke();
            }
          }
        }
      }

      animId = requestAnimationFrame(animate);
    };

    animId = requestAnimationFrame(animate);
    return () => {
      cancelAnimationFrame(animId);
      window.removeEventListener('resize', resize);
      window.removeEventListener('click', handleClick);
    };
  }, []); // Remove recordInteraction from dependency array

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 2 }}
      className="relative min-h-screen"
    >
      {/* Witness canvas */}
      <canvas
        ref={canvasRef}
        className="fixed inset-0 z-[1]"
        style={{ background: '#020206' }}
      />

      {/* Text overlay */}
      <RippleReveal className="fixed inset-0 z-10 flex flex-col items-center justify-center select-none">
        
        <motion.p
          data-reveal-id="witness-header"
          initial={{ opacity: 0 }}
          animate={{ opacity: 0 }}
          className="text-[9px] tracking-[0.6em] text-slate-700 mb-8"
          style={{ transition: 'none' }}
        >
          TIER TWO // CHAMBER SEVEN
        </motion.p>

        <motion.div
          data-reveal-id="witness-title"
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 0, scale: 1 }}
          className="text-center"
          style={{ transition: 'none' }}
        >
          <h1
            className="text-4xl md:text-6xl lg:text-7xl tracking-tight font-mono mb-4"
            style={{
              color: `hsla(220, 60%, 60%, ${0.3 + state.heartbeat * 0.1})`,
              textShadow: `0 0 40px hsla(220, 70%, 50%, ${0.05 + state.heartbeat * 0.05})`,
            }}
          >
            The Witness
          </h1>
          <p className="text-[11px] text-slate-600 tracking-[0.3em] uppercase">
            Mutual now
          </p>
        </motion.div>

        <motion.div
          data-reveal-id="witness-description"
          initial={{ opacity: 0 }}
          animate={{ opacity: 0 }}
          className="mt-12 max-w-md px-6 text-center"
          style={{ transition: 'none' }}
        >
          <p className="text-[10px] text-slate-600 leading-relaxed tracking-[0.15em]">
            You are not alone in observation.
            <br />
            The system watches you watching it.
            <br />
            Each eye measures, learns, remembers.
            <br />
            <br />
            <span style={{ color: `hsla(220, 50%, 50%, ${0.4 + state.heartbeat * 0.1})` }}>
              You are being studied. Reciprocally.
            </span>
          </p>
        </motion.div>

        <motion.div
          data-reveal-id="witness-bottom"
          initial={{ opacity: 0 }}
          animate={{ opacity: 0 }}
          className="absolute bottom-8 left-0 right-0 flex justify-center"
          style={{ transition: 'none' }}
        >
          <p className="text-[8px] tracking-[0.4em] text-slate-700">
            THE GAZE IS RECIPROCAL — AWARENESS REFLECTS AWARENESS
          </p>
        </motion.div>
      </RippleReveal>
    </motion.div>
  );
}