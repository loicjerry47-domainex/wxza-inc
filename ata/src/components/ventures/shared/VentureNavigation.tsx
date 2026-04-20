import React from 'react';
import { Database, Code, Server, BarChart3, Map, DollarSign, LayoutDashboard, Sparkles, Home, ChevronLeft, ChevronRight } from 'lucide-react';

interface VentureNavigationProps {
  activeView: string;
  onViewChange: (view: string) => void;
  ventureName: string;
  onBackToHome?: () => void;
  onPreviousVenture?: () => void;
  onNextVenture?: () => void;
  hasNextVenture?: boolean;
  hasPreviousVenture?: boolean;
  currentVentureIndex?: number;
  totalVentures?: number;
}

export function VentureNavigation({ 
  activeView, 
  onViewChange, 
  ventureName,
  onBackToHome,
  onPreviousVenture,
  onNextVenture,
  hasNextVenture = false,
  hasPreviousVenture = false,
  currentVentureIndex,
  totalVentures
}: VentureNavigationProps) {
  const navItems = [
    { id: 'prototype', label: 'Live Prototype', icon: Sparkles },
    { id: 'dashboard', label: 'Dashboard', icon: LayoutDashboard },
    { id: 'database', label: 'Database Schema', icon: Database },
    { id: 'architecture', label: 'Architecture', icon: Server },
    { id: 'api', label: 'API Playground', icon: Code },
    { id: 'performance', label: 'Performance', icon: BarChart3 },
    { id: 'journey', label: 'User Journey', icon: Map },
    { id: 'financial', label: 'Financials', icon: DollarSign },
  ];

  return (
    <div className="bg-black/50 backdrop-blur-xl border-b border-white/5 sticky top-0 z-40">
      <div className="max-w-7xl mx-auto px-6 py-4">
        {/* Breadcrumb & Back Navigation */}
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-4">
            {/* Back to Portfolio Button */}
            {onBackToHome && (
              <button
                onClick={onBackToHome}
                className="flex items-center gap-2 px-3 py-1.5 rounded-lg text-sm text-[#717182] hover:text-white hover:bg-black/40 transition-all group"
                title="Back to Portfolio (Esc)"
              >
                <Home className="w-4 h-4 group-hover:scale-110 transition-transform" />
                <span className="hidden md:inline">Portfolio</span>
              </button>
            )}
            
            {/* Breadcrumb */}
            <div className="flex items-center gap-2 text-sm">
              <span className="text-[#717182]">Home</span>
              <span className="text-[#717182]">/</span>
              <span className="text-white">{ventureName}</span>
              {currentVentureIndex !== undefined && totalVentures && (
                <span className="text-[#717182] text-xs ml-2">
                  ({currentVentureIndex + 1}/{totalVentures})
                </span>
              )}
            </div>
          </div>

          <div className="flex items-center gap-3">
            {/* Previous Venture */}
            {onPreviousVenture && (
              <button
                onClick={onPreviousVenture}
                disabled={!hasPreviousVenture}
                className="flex items-center gap-1 px-3 py-1.5 rounded-lg text-sm text-[#717182] hover:text-white hover:bg-black/40 transition-all disabled:opacity-30 disabled:cursor-not-allowed"
                title="Previous Venture (←)"
              >
                <ChevronLeft className="w-4 h-4" />
                <span className="hidden md:inline">Prev</span>
              </button>
            )}

            {/* Next Venture */}
            {onNextVenture && (
              <button
                onClick={onNextVenture}
                disabled={!hasNextVenture}
                className="flex items-center gap-1 px-3 py-1.5 rounded-lg text-sm text-[#717182] hover:text-white hover:bg-black/40 transition-all disabled:opacity-30 disabled:cursor-not-allowed"
                title="Next Venture (→)"
              >
                <span className="hidden md:inline">Next</span>
                <ChevronRight className="w-4 h-4" />
              </button>
            )}

            <div className="text-xs text-[#717182]">Complete Technical Showcase</div>
          </div>
        </div>
        
        {/* Tab Navigation */}
        <div className="flex gap-2 overflow-x-auto pb-2 scrollbar-hide">
          {navItems.map((item) => {
            const Icon = item.icon;
            const isActive = activeView === item.id;
            
            return (
              <button
                key={item.id}
                onClick={() => onViewChange(item.id)}
                className={`flex items-center gap-2 px-4 py-2 rounded-lg text-sm whitespace-nowrap transition-all ${
                  isActive
                    ? 'bg-black/60 text-white border border-purple-500/30 shadow-lg shadow-purple-500/20'
                    : 'text-[#717182] hover:text-white hover:bg-black/40 border border-transparent'
                }`}
              >
                <Icon className="w-4 h-4" />
                <span>{item.label}</span>
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
}