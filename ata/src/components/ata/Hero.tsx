/**
 * Hero Component - Performance Optimized
 * 
 * Lighthouse Optimizations Applied:
 * - Reduced animation delays (2700ms → 1100ms) to improve LCP
 * - Added will-change-transform for GPU acceleration
 * - Implemented tabular-nums for time counter to prevent layout shifts
 * - Added pointer-events-none to decorative elements
 * - Optimized fade-in animations with shorter durations
 */

import { ArrowRight, Clock } from "lucide-react";
import { ParticleText } from "./ParticleText";
import { useState, useEffect, useMemo } from "react";
import { useNavigate } from "react-router";
import { WelcomeSection } from "./home/WelcomeSection";
import { VentureLinksSection } from "./home/VentureLinksSection";
import { EcosystemLinksSection } from "./home/EcosystemLinksSection";
// FIXED: Import VENTURES to calculate market size dynamically (was hardcoded "$90B+")
import { VENTURES } from "../utils/ventureData";

interface HeroProps {
  onNavigate?: (path: string) => void; // Make optional for backward compatibility
}

export function Hero({ onNavigate }: HeroProps) {
  const navigate = useNavigate();
  const [time, setTime] = useState(new Date());

  // FIXED: Compute total market size from ventureData (consistent with About.tsx + WelcomeSection)
  const totalMarketSize = useMemo(() => {
    const total = VENTURES.reduce((acc, v) => {
      const size = parseFloat(v.marketSize?.replace(/[^0-9.]/g, '') || '0');
      return acc + size;
    }, 0);
    return `$${total.toFixed(0)}B+`;
  }, []);

  // Use React Router navigate if available, otherwise fall back to onNavigate prop
  const handleNavigate = (path: string) => {
    if (onNavigate) {
      onNavigate(path);
    } else {
      navigate(path);
    }
  };

  useEffect(() => {
    const timer = setInterval(() => {
      setTime(new Date());
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  const formatTime = (date: Date) => {
    const hours = date.getHours().toString().padStart(2, "0");
    const minutes = date
      .getMinutes()
      .toString()
      .padStart(2, "0");
    const seconds = date
      .getSeconds()
      .toString()
      .padStart(2, "0");
    return `${hours}:${minutes}:${seconds}`;
  };

  const formatDate = (date: Date) => {
    const options: Intl.DateTimeFormatOptions = {
      year: "numeric",
      month: "short",
      day: "2-digit",
    };
    return date
      .toLocaleDateString("en-US", options)
      .toUpperCase();
  };

  return (
    <>
      {/* Hero Section */}
      <section className="min-h-screen flex items-center justify-center relative overflow-hidden px-4 sm:px-6 pt-28 sm:pt-32">
        {/* Live Time Counter - Left Side (Hidden on mobile) */}
        <div className="hidden sm:block fixed left-4 md:left-8 top-1/2 -translate-y-1/2 z-50 group will-change-transform">
          <div className="relative">
            {/* Outer glow ring */}
            <div className="absolute inset-0 bg-amber-400/10 rounded-3xl blur-xl transition-all duration-500 scale-110 pointer-events-none" />

            {/* Time display container with liquid glass */}
            <div className="relative liquid-glass glass-refract rounded-3xl px-4 py-3 transition-all duration-500 hover:scale-105">
              <div className="flex items-center gap-3 mb-2">
                <Clock
                  className="w-4 h-4 text-amber-400/60"
                  strokeWidth={1.5}
                />
                <span className="text-amber-400/40 text-[10px] tracking-widest uppercase">
                  System Time
                </span>
              </div>
              <div className="liquid-glass-text text-lg tracking-wider tabular-nums">
                {formatTime(time)}
              </div>
              <div className="text-white/30 text-[10px] tracking-wide mt-1">
                {formatDate(time)}
              </div>
            </div>
          </div>
        </div>

        {/* Subtle geometric background elements */}
        <div className="absolute inset-0 opacity-5 pointer-events-none" aria-hidden="true">
          <div className="absolute top-20 left-10 w-64 h-64 border border-amber-400/30 rotate-45 rounded-[4rem] will-change-transform" />
          <div className="absolute bottom-20 right-10 w-96 h-96 border border-amber-400/20 rotate-12 rounded-[6rem] will-change-transform" />
          <div className="absolute top-1/2 left-1/3 w-32 h-32 border border-amber-400/25 rounded-3xl will-change-transform" />
        </div>

        <div className="max-w-6xl mx-auto text-center relative z-10">
          {/* Hero Content Card with liquid glass */}
          <div className="group relative liquid-glass liquid-shimmer glass-refract rounded-[2rem] sm:rounded-[3rem] p-6 sm:p-10 md:p-16 transition-all duration-700 will-change-transform">
            <div className="mb-12 sm:mb-16 md:mb-20">
              {/* Awakening Prelude */}
              <div className="liquid-glass-text text-xs uppercase tracking-[0.3em] sm:tracking-[0.4em] mb-8 sm:mb-12 animate-pulse">
                OUR VALUE: #X∞
              </div>

              {/* Main H1 - SEO Optimized and Visible */}
              <h1 className="liquid-glass-text text-4xl sm:text-5xl md:text-6xl font-bold mb-6 sm:mb-8 tracking-wider">
                WXZA Inc.
              </h1>

              {/* Particle Text Animation - Visual Enhancement */}
              <div
                className="relative mx-auto mb-6 sm:mb-8"
                style={{ 
                  height: "120px", 
                  maxWidth: "90%",
                  contentVisibility: "auto"
                }}
                aria-hidden="true"
              >
                <ParticleText text="WXZA" />
              </div>

              {/* Divider with liquid glow */}
              <div className="w-16 sm:w-24 h-px bg-gradient-to-r from-transparent via-amber-400/50 to-transparent mx-auto mb-8 sm:mb-12 rounded-full shadow-[0_0_20px_rgba(251,191,36,0.3)]" />

              {/* Subtitle - Philosophical Context */}
              <div className="max-w-3xl mx-auto px-4 sm:px-6 space-y-5 sm:space-y-6">
                {/* Opening Question */}
                <p className="text-white/50 text-xs sm:text-sm leading-relaxed tracking-wide opacity-0 animate-[fadeInFast_0.3s_ease-out_0s_forwards] sm:animate-[fadeInFast_0.4s_ease-out_0.1s_forwards]">
                  If two opposites can be right, how many opposites can be at the same time?
                </p>

                {/* Subtle Divider */}
                <div className="w-12 h-px bg-gradient-to-r from-transparent via-amber-400/30 to-transparent mx-auto rounded-full opacity-0 animate-[fadeInFast_0.3s_ease-out_0.1s_forwards] sm:animate-[fadeInFast_0.4s_ease-out_0.3s_forwards]" />

                {/* Realization */}
                <p className="text-white/70 text-xs sm:text-sm leading-relaxed tracking-wide opacity-0 animate-[fadeInFast_0.3s_ease-out_0.2s_forwards] sm:animate-[fadeInFast_0.4s_ease-out_0.5s_forwards]">
                  In fact, <span className="liquid-glass-text">none of them are right nor wrong</span>.
                </p>

                {/* The Response - Elevated with liquid glass */}
                <div className="relative opacity-0 animate-[fadeInFast_0.3s_ease-out_0.3s_forwards] sm:animate-[fadeInFast_0.4s_ease-out_0.7s_forwards]">
                  {/* Subtle glow background */}
                  <div className="absolute inset-0 bg-amber-400/5 blur-xl sm:blur-2xl rounded-3xl pointer-events-none" />
                  
                  <div className="relative liquid-glass-glow glass-refract rounded-2xl sm:rounded-3xl px-6 sm:px-8 py-4 sm:py-5">
                    <p className="liquid-glass-text text-sm sm:text-base md:text-lg uppercase tracking-[0.2em] sm:tracking-[0.25em] leading-relaxed">
                      SO WE CHOOSE OUR VALUE
                    </p>
                  </div>
                </div>

                {/* Grounding Context */}
                <div className="pt-2 sm:pt-3 opacity-0 animate-[fadeInFast_0.3s_ease-out_0.4s_forwards] sm:animate-[fadeInFast_0.4s_ease-out_0.9s_forwards]">
                  <p className="text-white/40 text-[10px] sm:text-xs leading-relaxed tracking-wide">
                    10 ventures across Cybersecurity, Quantum Computing, AR, and 5 more breakthrough domains. {totalMarketSize} market opportunity. Closing distances.
                  </p>
                </div>
              </div>
            </div>

            {/* CTA Buttons with liquid glass */}
            <div className="flex flex-col sm:flex-row gap-4 sm:gap-6 justify-center items-center opacity-0 animate-[fadeInFast_0.3s_ease-out_0.5s_forwards] sm:animate-[fadeInFast_0.4s_ease-out_1.1s_forwards]">
              <button
                onClick={() => handleNavigate('/portfolio')}
                className="w-full sm:w-auto group liquid-glass-button glass-refract px-6 sm:px-8 py-3 sm:py-4 text-amber-400 flex items-center justify-center gap-3 uppercase tracking-widest text-xs rounded-2xl"
              >
                <span>View All 10 Ventures</span>
                <ArrowRight
                  className="w-4 h-4 group-hover:translate-x-1 transition-transform"
                  strokeWidth={1.5}
                />
              </button>

              <button
                onClick={() => handleNavigate('/contact')}
                className="w-full sm:w-auto liquid-glass glass-refract px-6 sm:px-8 py-3 sm:py-4 text-white/60 hover:text-amber-400 transition-all duration-300 uppercase tracking-widest text-xs rounded-2xl"
              >
                Partner With Us
              </button>
            </div>
          </div>

          {/* Scroll Indicator */}
          <div className="mt-16 sm:animate-bounce will-change-transform">
            <div className="liquid-glass-text text-xs tracking-widest uppercase">
              Scroll to Explore
            </div>
            <div className="w-px h-12 bg-gradient-to-b from-amber-400/40 to-transparent mx-auto mt-4 rounded-full shadow-[0_0_20px_rgba(251,191,36,0.3)]" />
          </div>
        </div>
      </section>

      {/* Welcome Section - Below Hero */}
      <WelcomeSection />

      {/* Venture Links Section - WXZA.net Subdomains */}
      <VentureLinksSection />

      {/* Ecosystem Links Section - Below Welcome */}
      <EcosystemLinksSection />
    </>
  );
}