
import React from 'react';
import { ChatBubbleLeftRightIcon, PhotoIcon, WxzaIcon } from './icons';

type GenerationMode = 'chat' | 'image';

interface ModeSelectorProps {
  mode: GenerationMode;
  setMode: (mode: GenerationMode) => void;
  isLoading: boolean;
  isLeapMode: boolean;
  setIsLeapMode: (isLeap: boolean) => void;
  systemLevel: number;
}

const modes: { id: GenerationMode; label: string; icon: React.FC<{ className?: string }> }[] = [
  { id: 'chat', label: 'Chat', icon: ChatBubbleLeftRightIcon },
  { id: 'image', label: 'Image', icon: PhotoIcon },
];

export const ModeSelector: React.FC<ModeSelectorProps> = ({ mode, setMode, isLoading, isLeapMode, setIsLeapMode, systemLevel }) => {
  return (
    <div className="w-full max-w-3xl mx-auto px-4 pb-2 pt-4 flex items-center justify-between gap-4">
      {/* Mode Tabs (Left) */}
      <div className="bg-zinc-900/30 backdrop-blur-xl border border-white/10 rounded-2xl p-1.5 flex items-center gap-1 shadow-lg shadow-black/20">
        {modes.map((m) => {
          const isDisabled = isLoading || (m.id === 'image' && systemLevel < 4);
          return (
          <button
            key={m.id}
            onClick={() => setMode(m.id)}
            disabled={isDisabled}
            title={m.id === 'image' && systemLevel < 4 ? "Unlocks at Level 4" : ""}
            className={`flex items-center gap-2 text-xs font-medium rounded-xl px-4 py-2 transition-all duration-300 focus:outline-none disabled:opacity-50 ${
              mode === m.id
                ? 'bg-white/10 text-white shadow-[0_2px_10px_rgba(0,0,0,0.2),inset_0_1px_0_rgba(255,255,255,0.1)] border border-white/5'
                : 'text-zinc-400 hover:text-zinc-200 hover:bg-white/5'
            }`}
            aria-pressed={mode === m.id}
          >
            <m.icon className="w-4 h-4" />
            <span>{m.label}</span>
            {m.id === 'image' && systemLevel < 4 && <span className="text-[10px] text-zinc-500 ml-1">(Lv.4)</span>}
          </button>
        )})}
      </div>

      {/* LEAP Toggle (Right) */}
      <button
        onClick={() => setIsLeapMode(!isLeapMode)}
        disabled={isLoading}
        className={`group relative flex items-center gap-3 pl-4 pr-2 py-2 rounded-full border transition-all duration-500 shadow-xl overflow-hidden ${
            isLeapMode 
            ? 'bg-blue-900/30 border-blue-500/30 shadow-[0_0_20px_rgba(59,130,246,0.3),inset_0_1px_0_rgba(255,255,255,0.1)] backdrop-blur-xl' 
            : 'bg-zinc-900/30 border-white/10 hover:border-white/20 backdrop-blur-lg hover:shadow-[0_0_15px_rgba(255,255,255,0.05)]'
        }`}
      >
        <span className={`text-[10px] font-bold tracking-[0.2em] transition-colors duration-300 uppercase ${isLeapMode ? 'text-blue-300 drop-shadow-sm' : 'text-zinc-500'}`}>
            LEAP
        </span>
        
        <div className={`relative flex items-center justify-center w-4 h-4 rounded-full transition-colors duration-500 ${isLeapMode ? 'text-blue-400' : 'text-zinc-500'}`}>
            <WxzaIcon className="w-full h-full drop-shadow-md" />
            {isLeapMode && <span className="absolute inset-0 animate-ping rounded-full bg-blue-400 opacity-60"></span>}
        </div>

        <div className={`w-8 h-4 rounded-full p-0.5 transition-colors duration-300 flex items-center ${isLeapMode ? 'bg-blue-500/50' : 'bg-zinc-800/80 shadow-inner'}`}>
            <div className={`w-3 h-3 rounded-full bg-white shadow-sm transform transition-transform duration-300 ease-spring ${isLeapMode ? 'translate-x-4' : 'translate-x-0'}`} />
        </div>
      </button>
    </div>
  );
};
