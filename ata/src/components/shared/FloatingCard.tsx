import { ReactNode } from 'react';
import { motion } from 'motion/react';

interface FloatingCardProps {
  children: ReactNode;
  className?: string;
  hover?: boolean;
  delay?: number;
}

export function FloatingCard({ children, className = '', hover = true, delay = 0 }: FloatingCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay }}
      whileHover={hover ? { y: -4, scale: 1.01 } : undefined}
      className={`
        bg-black/30 backdrop-blur-xl border border-white/10 rounded-2xl
        shadow-xl shadow-purple-500/10
        hover:shadow-2xl hover:shadow-purple-500/20
        hover:border-purple-500/30
        transition-all duration-300
        ${className}
      `}
    >
      {children}
    </motion.div>
  );
}
