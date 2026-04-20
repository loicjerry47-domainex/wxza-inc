import React from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Material, categories, dnaStrandInfo, DnaStrand } from './codex-data';
import { X, Zap, Atom, Network, Flame, Package, Shield, Activity } from 'lucide-react';

const dnaIcons: Record<string, React.ElementType> = {
  'Reactive Pulse': Zap,
  'Atomic Bonding': Atom,
  'Cellular Composability': Network,
  'The Catalyst': Flame,
};

interface InspectionPanelProps {
  material: Material | null;
  onClose: () => void;
}

export function InspectionPanel({ material, onClose }: InspectionPanelProps) {
  return (
    <AnimatePresence>
      {material && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-black/60 backdrop-blur-sm z-40 lg:hidden"
          />

          {/* Panel */}
          <motion.div
            initial={{ x: '100%', opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            exit={{ x: '100%', opacity: 0 }}
            transition={{ type: 'spring', damping: 30, stiffness: 300 }}
            className="fixed right-0 top-0 bottom-0 w-full max-w-md z-50 border-l border-white/[0.08] bg-[#0a0a0f]/95 backdrop-blur-2xl overflow-y-auto"
          >
            <PanelContent material={material} onClose={onClose} />
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}

function PanelContent({ material, onClose }: { material: Material; onClose: () => void }) {
  const category = categories.find(c => c.id === material.category);
  if (!category) return null;

  const Icon = material.icon;

  return (
    <div className="p-6 md:p-8">
      {/* Close button */}
      <button
        onClick={onClose}
        className="absolute top-4 right-4 p-2 rounded-lg border border-white/[0.08] bg-white/[0.03] hover:bg-white/[0.08] transition-colors cursor-pointer"
      >
        <X className="w-4 h-4 text-slate-400" />
      </button>

      {/* Category tag */}
      <div className={`inline-flex items-center gap-2 px-3 py-1 rounded-full text-[10px] tracking-[0.2em] ${category.bgColor} ${category.borderColor} border ${category.color} mb-6`}>
        {category.code} · {category.name.toUpperCase()}
      </div>

      {/* Icon + Title */}
      <div className="flex items-center gap-4 mb-6">
        <div className={`p-4 rounded-2xl ${category.bgColor} ${category.borderColor} border`}>
          <Icon className={`w-8 h-8 ${category.color}`} />
        </div>
        <div>
          <h2 className="text-xl text-white tracking-wide">{material.name}</h2>
          <p className="text-xs text-slate-500 font-mono">{material.code}</p>
        </div>
      </div>

      {/* Package */}
      <div className="flex items-center gap-2 p-3 rounded-lg bg-white/[0.03] border border-white/[0.06] mb-6">
        <Package className="w-4 h-4 text-slate-500" />
        <code className="text-xs text-slate-400 font-mono">{material.packageName}</code>
      </div>

      {/* Description */}
      <div className="mb-6">
        <h4 className="text-[10px] tracking-[0.3em] text-slate-600 mb-2">DESCRIPTION</h4>
        <p className="text-sm text-slate-300 leading-relaxed">{material.description}</p>
      </div>

      {/* Purpose */}
      <div className="mb-8">
        <h4 className="text-[10px] tracking-[0.3em] text-slate-600 mb-2">ARCHITECTURAL PURPOSE</h4>
        <p className="text-sm text-cyan-100/80 leading-relaxed italic">"{material.purpose}"</p>
      </div>

      {/* Metrics */}
      <div className="grid grid-cols-2 gap-3 mb-8">
        <div className="p-4 rounded-xl bg-white/[0.03] border border-white/[0.06]">
          <div className="flex items-center gap-2 mb-2">
            <Shield className="w-3.5 h-3.5 text-slate-500" />
            <span className="text-[10px] tracking-[0.2em] text-slate-600">STABILITY</span>
          </div>
          <div className="flex items-end gap-2">
            <span className="text-2xl text-white">{material.stability}</span>
            <span className="text-xs text-slate-500 mb-1">%</span>
          </div>
          {/* Mini bar */}
          <div className="mt-2 h-1 rounded-full bg-white/[0.06] overflow-hidden">
            <motion.div
              initial={{ width: 0 }}
              animate={{ width: `${material.stability}%` }}
              transition={{ duration: 1, delay: 0.3 }}
              className={`h-full rounded-full ${
                material.stability >= 95 ? 'bg-emerald-400' : material.stability >= 90 ? 'bg-amber-400' : 'bg-rose-400'
              }`}
            />
          </div>
        </div>

        <div className="p-4 rounded-xl bg-white/[0.03] border border-white/[0.06]">
          <div className="flex items-center gap-2 mb-2">
            <Activity className="w-3.5 h-3.5 text-slate-500" />
            <span className="text-[10px] tracking-[0.2em] text-slate-600">REACTIVITY</span>
          </div>
          <span className={`text-lg ${
            material.reactivity === 'Critical' ? 'text-rose-400' :
            material.reactivity === 'High' ? 'text-amber-400' :
            material.reactivity === 'Medium' ? 'text-cyan-400' :
            'text-emerald-400'
          }`}>
            {material.reactivity}
          </span>
        </div>
      </div>

      {/* DNA Strands */}
      <div>
        <h4 className="text-[10px] tracking-[0.3em] text-slate-600 mb-4">DECLARATIVE GENOME — ACTIVE STRANDS</h4>
        <div className="space-y-3">
          {material.dnaStrands.map((strand) => {
            const DnaIcon = dnaIcons[strand];
            const info = dnaStrandInfo[strand];
            return (
              <motion.div
                key={strand}
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.4, delay: 0.1 }}
                className="p-4 rounded-xl bg-white/[0.03] border border-white/[0.06] flex items-start gap-3"
              >
                <div className={`p-1.5 rounded-lg ${
                  strand === 'Reactive Pulse' ? 'bg-cyan-500/10 border-cyan-500/20' :
                  strand === 'Atomic Bonding' ? 'bg-fuchsia-500/10 border-fuchsia-500/20' :
                  strand === 'Cellular Composability' ? 'bg-emerald-500/10 border-emerald-500/20' :
                  'bg-amber-500/10 border-amber-500/20'
                } border`}>
                  <DnaIcon className={`w-3.5 h-3.5 ${info.color}`} />
                </div>
                <div>
                  <h5 className={`text-xs ${info.color} tracking-wide mb-1`}>{strand}</h5>
                  <p className="text-[11px] text-slate-500 leading-relaxed">{info.description}</p>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
