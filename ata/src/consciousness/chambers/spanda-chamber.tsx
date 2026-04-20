import React, { useEffect } from 'react';
import { SpandaCanvas } from '../spanda-canvas';
import { SpandaText } from '../spanda-text';
import { useConsciousness } from '../consciousness';
import { RevealHint } from '../ripple-reveal';
import { motion } from 'motion/react';

export function SpandaChamber() {
  const { visitChamber } = useConsciousness();

  useEffect(() => {
    visitChamber('spanda');
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 1.5 }}
      className="relative min-h-screen"
    >
      <SpandaCanvas />
      
      {/* Scanline overlay */}
      <div className="fixed inset-0 z-[1] pointer-events-none opacity-[0.03]">
        <div className="w-full h-full bg-[linear-gradient(transparent_50%,rgba(0,0,0,1)_50%)] bg-[size:100%_3px] mix-blend-overlay" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,transparent_0%,#020206_100%)] opacity-80" />
      </div>

      <SpandaText />

      {/* Hint — fades permanently on first movement */}
      <RevealHint />
    </motion.div>
  );
}