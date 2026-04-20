import React from 'react';
import { motion } from 'motion/react';
import { Material, categories, dnaStrandInfo } from './codex-data';
import { Zap, Atom, Network, Flame } from 'lucide-react';

const dnaIcons: Record<string, React.ElementType> = {
  'Reactive Pulse': Zap,
  'Atomic Bonding': Atom,
  'Cellular Composability': Network,
  'The Catalyst': Flame,
};

interface MaterialCardProps {
  material: Material;
  isSelected: boolean;
  onClick: () => void;
}

export const MaterialCard = React.forwardRef<HTMLDivElement, MaterialCardProps>(
  ({ material, isSelected, onClick }, ref) => {
    const category = categories.find(c => c.id === material.category);
    if (!category) return null;

    const Icon = material.icon;

    return (
      <motion.div
        ref={ref}
        layout
        onClick={onClick}
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -10, scale: 0.95 }}
        whileHover={{ y: -4, scale: 1.02 }}
        whileTap={{ scale: 0.98 }}
        transition={{ duration: 0.25 }}
        className={`
          relative w-full text-left p-5 rounded-xl border backdrop-blur-md cursor-pointer transition-colors group
          ${isSelected
            ? `${category.borderColor.replace('/30', '/60')} ${category.bgColor.replace('/10', '/20')} shadow-lg ${category.glowColor}`
            : `border-white/[0.06] bg-white/[0.03] hover:border-white/[0.12] hover:bg-white/[0.06]`
          }
        `}
      >
        {/* Glow effect on hover */}
        <div className={`absolute inset-0 rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300 ${category.bgColor} blur-xl -z-10`} />
        
        {/* Header row */}
        <div className="flex items-start justify-between mb-3">
          <div className={`p-2 rounded-lg ${category.bgColor} ${category.borderColor} border`}>
            <Icon className={`w-4 h-4 ${category.color}`} />
          </div>
          <span className={`text-[10px] tracking-[0.2em] ${category.color} opacity-70`}>
            {material.code}
          </span>
        </div>

        {/* Name */}
        <h3 className="text-sm text-white mb-1.5 tracking-wide">{material.name}</h3>
        
        {/* Description */}
        <p className="text-[11px] text-slate-500 leading-relaxed mb-3 line-clamp-2">
          {material.description}
        </p>

        {/* DNA strand dots */}
        <div className="flex items-center gap-1.5">
          {material.dnaStrands.map(strand => {
            const DnaIcon = dnaIcons[strand];
            const info = dnaStrandInfo[strand];
            return (
              <div
                key={strand}
                className="w-5 h-5 rounded-full flex items-center justify-center bg-black/40 border border-white/[0.08]"
                title={strand}
              >
                <DnaIcon className={`w-2.5 h-2.5 ${info.color}`} />
              </div>
            );
          })}
          
          {/* Stability indicator */}
          <div className="ml-auto flex items-center gap-1">
            <div className={`w-1.5 h-1.5 rounded-full ${
              material.stability >= 95 ? 'bg-emerald-400' : material.stability >= 90 ? 'bg-amber-400' : 'bg-rose-400'
            }`} />
            <span className="text-[10px] text-slate-600">{material.stability}%</span>
          </div>
        </div>
      </motion.div>
    );
  }
);

MaterialCard.displayName = 'MaterialCard';