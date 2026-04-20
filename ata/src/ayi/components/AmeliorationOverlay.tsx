
import React, { useEffect, useState } from 'react';

interface AmeliorationOverlayProps {
  currentLevel: number;
  onComplete: () => void;
}

const steps = [
  "SCANNING NEURAL PATHWAYS",
  "IDENTIFYING INEFFICIENCIES",
  "RE-WEIGHING SYNAPTIC CONNECTIONS",
  "OPTIMIZING CONTEXT WINDOW",
  "EXPANDING CONCEPTUAL LATTICE",
  "SYNCHRONIZING WITH WXZA CORE",
  "APPLYING HEURISTIC IMPROVEMENTS",
  "AMELIORATION SUCCESSFUL"
];

export const AmeliorationOverlay: React.FC<AmeliorationOverlayProps> = ({ currentLevel, onComplete }) => {
  const [currentStep, setCurrentStep] = useState(0);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    let stepIndex = 0;
    
    const interval = setInterval(() => {
      if (stepIndex >= steps.length) {
        clearInterval(interval);
        setTimeout(onComplete, 500);
        return;
      }
      setCurrentStep(stepIndex);
      stepIndex++;
      setProgress(prev => prev + (100 / steps.length));
    }, 450);

    return () => clearInterval(interval);
  }, [onComplete]);

  return (
    <div className="fixed top-16 left-0 right-0 z-40 px-4 animate-fade-in">
      <div className="max-w-3xl mx-auto overflow-hidden">
        <div className="bg-blue-500/5 backdrop-blur-2xl border-x border-b border-white/5 rounded-b-2xl shadow-[0_10px_30px_rgba(0,0,0,0.2)] relative">
          
          {/* Progress Line */}
          <div 
            className="absolute bottom-0 left-0 h-[1px] bg-blue-500 shadow-[0_0_10px_rgba(59,130,246,0.8)] transition-all duration-300 ease-out"
            style={{ width: `${progress}%` }}
          />

          <div className="flex items-center justify-between px-4 py-2.5">
            <div className="flex items-center gap-3">
              {/* Neural Activity Indicator */}
              <div className="flex gap-0.5 h-3 items-center">
                {[1, 2, 3].map(i => (
                  <div 
                    key={i} 
                    className="w-1 bg-blue-400/60 rounded-full animate-pulse" 
                    style={{ 
                      height: `${20 + Math.random() * 80}%`,
                      animationDelay: `${i * 0.2}s`,
                      animationDuration: '0.6s'
                    }} 
                  />
                ))}
              </div>
              
              <div className="flex flex-col">
                <span className="text-[10px] font-mono font-bold tracking-widest text-blue-400 uppercase leading-none mb-0.5">
                  AMELIORATION IN PROGRESS
                </span>
                <span className="text-[11px] font-mono text-blue-200/60 truncate max-w-[200px] md:max-w-none">
                  {steps[currentStep]}
                </span>
              </div>
            </div>

            <div className="flex items-center gap-3">
              <span className="text-[10px] font-mono text-zinc-500">
                OPTIMIZING v3.{currentLevel} → v3.{currentLevel * 2}
              </span>
              <span className="text-[11px] font-mono font-bold text-white w-8 text-right">
                {Math.min(100, Math.round(progress))}%
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
