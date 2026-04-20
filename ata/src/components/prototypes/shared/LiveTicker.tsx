import { useEffect, useState } from "react";
import { motion } from "motion/react";

/**
 * LiveTicker — ambient real-time metrics bar for prototype heroes.
 *
 * Each metric ticks on a drift+noise model so the values feel alive
 * (oscillating around a baseline rather than random walking).
 * Keep it visual only: do not use for anything load-bearing.
 */

export interface TickerMetric {
  /** Label shown above the value */
  label: string;
  /** Starting value (treated as baseline) */
  base: number;
  /** Max ± delta per tick */
  drift?: number;
  /** Min floor — values won't drop below this */
  min?: number;
  /** Max ceiling */
  max?: number;
  /** Optional prefix like "$" */
  prefix?: string;
  /** Optional suffix like "%", "°C", "/sec" */
  suffix?: string;
  /** Decimal places to display */
  decimals?: number;
  /** Tailwind class for accent (e.g. "text-sky-300") */
  accent?: string;
  /** If true, value monotonically increases (counter, not oscillation) */
  counter?: boolean;
}

interface LiveTickerProps {
  metrics: TickerMetric[];
  /** Tick interval in ms. Default 1500 */
  interval?: number;
  /** Optional caption label shown on the left */
  caption?: string;
  /** Accent color for the pulse dot */
  pulseColor?: string;
  className?: string;
}

function formatNumber(n: number, decimals: number): string {
  const rounded = Number(n.toFixed(decimals));
  // Use locale separators for large numbers without decimals
  if (decimals === 0) return Math.round(rounded).toLocaleString();
  return rounded.toLocaleString(undefined, { minimumFractionDigits: decimals, maximumFractionDigits: decimals });
}

export function LiveTicker({
  metrics,
  interval = 1500,
  caption = "LIVE",
  pulseColor = "bg-emerald-400",
  className = "",
}: LiveTickerProps) {
  const [values, setValues] = useState<number[]>(() => metrics.map((m) => m.base));

  useEffect(() => {
    const id = setInterval(() => {
      setValues((prev) =>
        prev.map((v, i) => {
          const m = metrics[i];
          if (m.counter) {
            const step = (m.drift ?? 1) * (0.5 + Math.random());
            return v + step;
          }
          // Mean-reverting drift around base
          const drift = m.drift ?? m.base * 0.02;
          const noise = (Math.random() - 0.5) * 2 * drift;
          const pull = (m.base - v) * 0.15;
          let next = v + noise + pull;
          if (m.min !== undefined) next = Math.max(m.min, next);
          if (m.max !== undefined) next = Math.min(m.max, next);
          return next;
        })
      );
    }, interval);
    return () => clearInterval(id);
  }, [metrics, interval]);

  return (
    <div
      className={`glass-light rounded-2xl border border-white/5 p-4 md:p-5 flex flex-col md:flex-row md:items-center gap-4 ${className}`}
    >
      <div className="flex items-center gap-2 shrink-0">
        <motion.span
          className={`w-2 h-2 rounded-full ${pulseColor} shadow-[0_0_10px_currentColor]`}
          animate={{ opacity: [1, 0.3, 1] }}
          transition={{ duration: 1.6, repeat: Infinity, ease: "easeInOut" }}
        />
        <span className="text-[10px] uppercase tracking-[0.3em] text-gray-500">{caption}</span>
      </div>

      <div className="flex-1 grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6">
        {metrics.map((m, i) => (
          <div key={m.label} className="min-w-0">
            <div className="text-[10px] uppercase tracking-widest text-gray-600 truncate">{m.label}</div>
            <div className={`text-lg md:text-xl font-black tabular-nums ${m.accent ?? "text-white"}`}>
              {m.prefix ?? ""}
              {formatNumber(values[i] ?? m.base, m.decimals ?? 0)}
              {m.suffix ?? ""}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
