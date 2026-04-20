import { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Keyboard, X } from 'lucide-react';
import { INTERACTIONS, createTransition, VARIANTS, DURATION, EASING } from '../../utils/animationConfig';

export function KeyboardShortcutsPanel() {
  const [isOpen, setIsOpen] = useState(false);

  const shortcuts = [
    { key: 'Esc', description: 'Back to Portfolio' },
    { key: 'Alt + ←', description: 'Previous Venture' },
    { key: 'Alt + →', description: 'Next Venture' },
    { key: 'Ctrl/⌘ + H', description: 'Home' },
  ];

  return (
    <>
      {/* Trigger Button */}
      <motion.button
        onClick={() => setIsOpen(true)}
        initial={{ opacity: 0, scale: 0.5, x: -20 }}
        animate={{ opacity: 1, scale: 1, x: 0 }}
        transition={createTransition('normal', 'diamond', 0.5)}
        whileHover={{ 
          scale: 1.1,
          boxShadow: "0 0 30px rgba(56, 189, 248, 0.3)"
        }}
        whileTap={{ scale: 0.9 }}
        className="fixed bottom-8 left-8 z-50 p-3 glass-medium text-white rounded-full shadow-lg border border-white/10 hover:border-sky-500/30"
        title="Keyboard Shortcuts"
        aria-label="Show keyboard shortcuts"
      >
        <motion.div
          animate={{ rotate: [0, 5, 0, -5, 0] }}
          transition={{ duration: 3, repeat: Infinity, ease: EASING.smooth }}
        >
          <Keyboard className="w-5 h-5" />
        </motion.div>
      </motion.button>

      {/* Panel */}
      <AnimatePresence>
        {isOpen && (
          <motion.div 
            className="fixed inset-0 z-[100] flex items-center justify-center backdrop-blur-sm"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={createTransition('fast', 'smooth')}
            onClick={() => setIsOpen(false)}
          >
            <motion.div 
              className="bg-black/95 border border-white/20 rounded-3xl p-8 max-w-md w-full mx-4 shadow-2xl shadow-sky-500/20"
              initial={{ scale: 0.9, y: 20, opacity: 0 }}
              animate={{ scale: 1, y: 0, opacity: 1 }}
              exit={{ scale: 0.9, y: 20, opacity: 0 }}
              transition={createTransition('normal', 'diamond')}
              onClick={(e) => e.stopPropagation()}
            >
              <div className="flex items-center justify-between mb-6">
                <motion.div 
                  className="flex items-center gap-3"
                  initial={{ x: -20, opacity: 0 }}
                  animate={{ x: 0, opacity: 1 }}
                  transition={createTransition('normal', 'diamond', 0.1)}
                >
                  <div className="p-2 bg-gradient-to-br from-sky-600 to-blue-600 rounded-lg">
                    <Keyboard className="w-6 h-6 text-white" />
                  </div>
                  <h3 className="text-white text-xl font-bold">Keyboard Shortcuts</h3>
                </motion.div>
                <motion.button
                  onClick={() => setIsOpen(false)}
                  whileHover={{ scale: 1.1, rotate: 90 }}
                  whileTap={{ scale: 0.9 }}
                  className="p-2 hover:bg-white/10 rounded-lg transition-colors"
                  aria-label="Close"
                >
                  <X className="w-5 h-5 text-gray-400" />
                </motion.button>
              </div>

              <motion.div 
                className="space-y-3"
                initial="initial"
                animate="animate"
                variants={VARIANTS.staggerContainer}
              >
                {shortcuts.map((shortcut, index) => (
                  <motion.div
                    key={index}
                    variants={VARIANTS.staggerItem}
                    whileHover={{ x: 4, backgroundColor: 'rgba(56, 189, 248, 0.1)' }}
                    transition={{ duration: DURATION.fast }}
                    className="flex items-center justify-between p-4 glass-light rounded-xl border border-white/5"
                  >
                    <span className="text-gray-300">{shortcut.description}</span>
                    <motion.kbd 
                      className="px-4 py-2 bg-gradient-to-br from-sky-900/50 to-blue-900/50 text-sky-300 rounded-lg border border-sky-500/30 text-sm font-mono shadow-lg shadow-sky-500/10"
                      whileHover={{ scale: 1.05 }}
                    >
                      {shortcut.key}
                    </motion.kbd>
                  </motion.div>
                ))}
              </motion.div>

              <motion.div 
                className="mt-6 pt-6 border-t border-white/10 text-center text-sm text-gray-500"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={createTransition('normal', 'smooth', 0.4)}
              >
                Use these shortcuts anytime during venture navigation
              </motion.div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}