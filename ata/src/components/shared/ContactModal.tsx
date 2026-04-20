import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { X, Send, CheckCircle, AlertCircle } from 'lucide-react';

interface ContactModalProps {
  open: boolean;
  onClose: () => void;
}

type Status = 'idle' | 'sending' | 'success' | 'error';

const TOPICS = ['general', 'partnership', 'investor', 'press', 'engineering'] as const;

export function ContactModal({ open, onClose }: ContactModalProps) {
  const [status, setStatus] = useState<Status>('idle');
  const [error, setError] = useState<string | null>(null);
  const firstFieldRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => { if (e.key === 'Escape') onClose(); };
    window.addEventListener('keydown', onKey);
    // Focus the first field on open
    const t = setTimeout(() => firstFieldRef.current?.focus(), 150);
    return () => { window.removeEventListener('keydown', onKey); clearTimeout(t); };
  }, [open, onClose]);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const payload = {
      name: String(formData.get('name') ?? ''),
      email: String(formData.get('email') ?? ''),
      company: String(formData.get('company') ?? ''),
      topic: String(formData.get('topic') ?? 'general'),
      message: String(formData.get('message') ?? ''),
      _gotcha: String(formData.get('_gotcha') ?? ''),
    };

    setStatus('sending');
    setError(null);
    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'content-type': 'application/json' },
        body: JSON.stringify(payload),
      });
      if (!res.ok) {
        const body = await res.json().catch(() => ({}));
        throw new Error(body.error ?? `Request failed (${res.status})`);
      }
      setStatus('success');
    } catch (err) {
      setStatus('error');
      setError(err instanceof Error ? err.message : 'Something went wrong.');
    }
  };

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          className="fixed inset-0 z-[100] flex items-center justify-center p-4"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
        >
          {/* Backdrop */}
          <div
            className="absolute inset-0 bg-black/80 backdrop-blur-md"
            onClick={onClose}
            aria-hidden
          />

          {/* Dialog */}
          <motion.div
            role="dialog"
            aria-modal="true"
            aria-labelledby="contact-title"
            className="relative w-full max-w-lg glass-strong rounded-3xl border border-white/10 shadow-2xl shadow-sky-500/10 p-6 md:p-8"
            initial={{ y: 30, opacity: 0, scale: 0.97 }}
            animate={{ y: 0, opacity: 1, scale: 1 }}
            exit={{ y: 20, opacity: 0, scale: 0.98 }}
            transition={{ duration: 0.25, ease: [0.2, 0.9, 0.3, 1] }}
          >
            <button
              onClick={onClose}
              aria-label="Close"
              className="absolute top-4 right-4 text-gray-500 hover:text-white transition-colors"
            >
              <X className="w-5 h-5" />
            </button>

            <h2 id="contact-title" className="text-2xl font-black tracking-wide mb-1">
              Partner With Us
            </h2>
            <p className="text-xs text-gray-500 tracking-widest uppercase mb-6">
              The architecture is listening
            </p>

            {status === 'success' ? (
              <div className="py-10 flex flex-col items-center text-center gap-3">
                <CheckCircle className="w-10 h-10 text-emerald-400" />
                <h3 className="text-lg font-bold">Signal received</h3>
                <p className="text-sm text-gray-400 max-w-sm">
                  Your message reached the architecture. We'll respond from wxzata@proton.me.
                </p>
                <button
                  onClick={onClose}
                  className="mt-4 px-5 py-2 rounded-full border border-white/10 hover:border-sky-400/40 text-sm tracking-widest uppercase text-gray-300 hover:text-sky-200 transition-colors"
                >
                  Close
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-4">
                {/* Honeypot — hidden from humans */}
                <input
                  type="text"
                  name="_gotcha"
                  tabIndex={-1}
                  autoComplete="off"
                  aria-hidden
                  className="absolute w-0 h-0 opacity-0 -left-[9999px]"
                />

                <div className="grid grid-cols-2 gap-3">
                  <label className="flex flex-col gap-1">
                    <span className="text-[10px] uppercase tracking-widest text-gray-500">Name</span>
                    <input
                      ref={firstFieldRef}
                      name="name"
                      type="text"
                      required
                      maxLength={200}
                      className="bg-black/40 border border-white/10 rounded-lg px-3 py-2 text-sm focus:border-sky-400/50 focus:outline-none transition-colors"
                    />
                  </label>
                  <label className="flex flex-col gap-1">
                    <span className="text-[10px] uppercase tracking-widest text-gray-500">Email</span>
                    <input
                      name="email"
                      type="email"
                      required
                      maxLength={320}
                      className="bg-black/40 border border-white/10 rounded-lg px-3 py-2 text-sm focus:border-sky-400/50 focus:outline-none transition-colors"
                    />
                  </label>
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <label className="flex flex-col gap-1">
                    <span className="text-[10px] uppercase tracking-widest text-gray-500">Company (optional)</span>
                    <input
                      name="company"
                      type="text"
                      maxLength={200}
                      className="bg-black/40 border border-white/10 rounded-lg px-3 py-2 text-sm focus:border-sky-400/50 focus:outline-none transition-colors"
                    />
                  </label>
                  <label className="flex flex-col gap-1">
                    <span className="text-[10px] uppercase tracking-widest text-gray-500">Topic</span>
                    <select
                      name="topic"
                      defaultValue="general"
                      className="bg-black/40 border border-white/10 rounded-lg px-3 py-2 text-sm focus:border-sky-400/50 focus:outline-none transition-colors"
                    >
                      {TOPICS.map((t) => (
                        <option key={t} value={t} className="bg-black">{t}</option>
                      ))}
                    </select>
                  </label>
                </div>

                <label className="flex flex-col gap-1">
                  <span className="text-[10px] uppercase tracking-widest text-gray-500">Message</span>
                  <textarea
                    name="message"
                    required
                    minLength={10}
                    maxLength={5000}
                    rows={5}
                    className="bg-black/40 border border-white/10 rounded-lg px-3 py-2 text-sm focus:border-sky-400/50 focus:outline-none transition-colors resize-none"
                  />
                </label>

                {status === 'error' && (
                  <div className="flex items-start gap-2 text-red-300 text-sm bg-red-500/10 border border-red-500/20 rounded-lg p-3">
                    <AlertCircle className="w-4 h-4 mt-0.5 flex-shrink-0" />
                    <span>{error ?? 'Something went wrong.'}</span>
                  </div>
                )}

                <div className="flex items-center justify-between pt-2">
                  <p className="text-[10px] text-gray-600 tracking-wider">
                    Or email directly: <a className="hover:text-sky-300" href="mailto:wxzata@proton.me">wxzata@proton.me</a>
                  </p>
                  <button
                    type="submit"
                    disabled={status === 'sending'}
                    className="inline-flex items-center gap-2 px-5 py-2 rounded-full bg-gradient-to-r from-sky-600 to-blue-700 hover:from-sky-500 hover:to-blue-600 text-sm tracking-widest uppercase font-bold disabled:opacity-60 disabled:cursor-not-allowed transition-colors"
                  >
                    {status === 'sending' ? 'Sending…' : (<>Send<Send className="w-4 h-4" /></>)}
                  </button>
                </div>
              </form>
            )}
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
