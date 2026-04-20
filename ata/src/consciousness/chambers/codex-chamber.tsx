import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { categories, materials, Material } from '../codex-data';
import { MaterialCard } from '../material-card';
import { InspectionPanel } from '../inspection-panel';
import { useConsciousness } from '../consciousness';

export function CodexChamber() {
  const { visitChamber, state, recordInteraction } = useConsciousness();
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [selectedMaterial, setSelectedMaterial] = useState<Material | null>(null);

  useEffect(() => {
    visitChamber('codex');
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const filteredMaterials = selectedCategory === 'all'
    ? materials
    : materials.filter(m => m.category === selectedCategory);

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 1 }}
      className="relative min-h-screen z-10"
    >
      <div className="max-w-7xl mx-auto px-6 py-20">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.5, delay: 0.2 }}
          className="text-center mb-16"
        >
          <p className="text-[9px] tracking-[0.6em] text-slate-600 mb-4">
            MATERIAL CODEX // CHAMBER TWO
          </p>
          <h1
            className="text-3xl md:text-5xl tracking-tight font-mono mb-4"
            style={{
              color: `hsla(185, 60%, 70%, ${0.6 + state.heartbeat * 0.15})`,
              textShadow: `0 0 40px hsla(185, 80%, 50%, ${0.1 + state.heartbeat * 0.05})`,
            }}
          >
            The Living Catalog
          </h1>
          <p className="text-[11px] text-slate-500 tracking-[0.15em] max-w-md mx-auto leading-relaxed">
            Every material is a building block of digital reality.
            <br />
            Inspect. Understand. Compose.
          </p>
        </motion.div>

        {/* Category filters */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.8 }}
          className="flex flex-wrap justify-center gap-2 mb-12"
        >
          <button
            onClick={() => { setSelectedCategory('all'); recordInteraction(); }}
            className={`px-4 py-2 rounded-lg text-[10px] tracking-[0.2em] border transition-all cursor-pointer ${
              selectedCategory === 'all'
                ? 'border-white/20 bg-white/[0.08] text-white/80'
                : 'border-white/[0.06] bg-transparent text-slate-600 hover:border-white/[0.12] hover:text-slate-400'
            }`}
          >
            ALL
          </button>
          {categories.map(cat => (
            <button
              key={cat.id}
              onClick={() => { setSelectedCategory(cat.id); recordInteraction(); }}
              className={`px-4 py-2 rounded-lg text-[10px] tracking-[0.2em] border transition-all cursor-pointer ${
                selectedCategory === cat.id
                  ? `${cat.borderColor} ${cat.bgColor} ${cat.color}`
                  : 'border-white/[0.06] bg-transparent text-slate-600 hover:border-white/[0.12] hover:text-slate-400'
              }`}
            >
              {cat.code} · {cat.name.toUpperCase()}
            </button>
          ))}
        </motion.div>

        {/* Materials grid */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1 }}
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4"
        >
          <AnimatePresence mode="popLayout">
            {filteredMaterials.map(material => (
              <MaterialCard
                key={material.id}
                material={material}
                isSelected={selectedMaterial?.id === material.id}
                onClick={() => {
                  setSelectedMaterial(material);
                  recordInteraction();
                }}
              />
            ))}
          </AnimatePresence>
        </motion.div>

        {/* Bottom signature */}
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.5 }}
          className="text-center mt-16 text-[8px] tracking-[0.4em] text-slate-700"
        >
          {materials.length} MATERIALS CATALOGED · {categories.length} CATEGORIES · DECLARATIVE GENOME ACTIVE
        </motion.p>
      </div>

      {/* Inspection panel */}
      <InspectionPanel
        material={selectedMaterial}
        onClose={() => setSelectedMaterial(null)}
      />
    </motion.div>
  );
}