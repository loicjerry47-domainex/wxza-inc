import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { ChevronUp } from 'lucide-react';
import { INTERACTIONS, DURATION, EASING, createTransition } from '../../utils/animationConfig';

export function ScrollToTop() {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    let rafId: number | null = null;

    const toggleVisibility = () => {
      if (rafId) return;

      rafId = requestAnimationFrame(() => {
        if (window.pageYOffset > 300) {
          setIsVisible(true);
        } else {
          setIsVisible(false);
        }
        rafId = null;
      });
    };

    window.addEventListener('scroll', toggleVisibility, { passive: true });
    return () => {
      window.removeEventListener('scroll', toggleVisibility);
      if (rafId) cancelAnimationFrame(rafId);
    };
  }, []);

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  };

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.button
          onClick={scrollToTop}
          initial={{ opacity: 0, scale: 0.5, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.5, y: 20 }}
          transition={createTransition('normal', 'diamond')}
          whileHover={{ 
            scale: 1.15,
            boxShadow: "0 0 30px rgba(14, 165, 233, 0.5)"
          }}
          whileTap={{ scale: 0.9 }}
          className="fixed bottom-8 right-8 z-50 p-3 bg-gradient-to-br from-sky-600 to-blue-700 text-white rounded-full shadow-lg shadow-sky-500/20"
          title="Scroll to top"
          aria-label="Scroll to top"
        >
          <motion.div
            animate={{ y: [0, -3, 0] }}
            transition={{ duration: 1.5, repeat: Infinity, ease: EASING.smooth }}
          >
            <ChevronUp className="w-6 h-6" />
          </motion.div>
        </motion.button>
      )}
    </AnimatePresence>
  );
}