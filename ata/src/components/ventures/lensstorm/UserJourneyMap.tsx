import React from 'react';
import { Package, Glasses, Sparkles, Eye, Shield, TrendingUp } from 'lucide-react';

export function LensstormUserJourneyMap() {
  const journeySteps = [
    {
      step: 1,
      title: 'Unboxing',
      description: 'Premium packaging with calibration tools',
      icon: Package,
      color: 'from-cyan-500 to-blue-500',
      duration: '5 min',
      actions: ['Open sleek packaging', 'Inspect lenses and frame', 'Find charging case'],
    },
    {
      step: 2,
      title: 'Physical Setup',
      description: 'Adjust fit and calibrate lenses',
      icon: Glasses,
      color: 'from-purple-500 to-pink-500',
      duration: '10 min',
      actions: ['Adjust nose pads', 'Fit temple arms', 'Clean nano-diffractive lenses'],
    },
    {
      step: 3,
      title: 'App Pairing',
      description: 'Connect via Bluetooth and configure',
      icon: Sparkles,
      color: 'from-green-500 to-emerald-500',
      duration: '5 min',
      actions: ['Download LENSSTORM app', 'Pair via Bluetooth 5.3', 'Update firmware'],
    },
    {
      step: 4,
      title: 'Visual Calibration',
      description: 'Personalize AR display to your vision',
      icon: Eye,
      color: 'from-yellow-500 to-amber-500',
      duration: '8 min',
      actions: ['Vision test procedure', 'Adjust hologram brightness', 'Set focal depth'],
    },
    {
      step: 5,
      title: 'Privacy Setup',
      description: 'Configure hardware privacy controls',
      icon: Shield,
      color: 'from-red-500 to-orange-500',
      duration: '3 min',
      actions: ['Test camera shutter', 'Configure mic settings', 'Set privacy modes'],
    },
    {
      step: 6,
      title: 'Daily Use',
      description: 'Experience seamless AR in everyday life',
      icon: TrendingUp,
      color: 'from-indigo-500 to-violet-500',
      duration: '12+ hrs',
      actions: ['Live translation', 'Navigation AR', 'Smart notifications'],
    },
  ];

  return (
    <div className="min-h-screen relative overflow-hidden">
      <div className="relative z-10 p-8">
        <div className="mb-8">
          <h1 className="text-white mb-2">User Journey Map</h1>
          <p className="text-[#717182]">From Unboxing to All-Day AR</p>
        </div>

        <div className="space-y-8">
          {journeySteps.map((step, index) => {
            const Icon = step.icon;
            const isLast = index === journeySteps.length - 1;
            
            return (
              <div key={step.step} className="relative">
                {!isLast && (
                  <div className="absolute left-[2.25rem] top-[5rem] w-0.5 h-16 bg-gradient-to-b from-white/20 to-transparent" />
                )}
                
                <div className="flex gap-6">
                  <div className="flex-shrink-0">
                    <div className={`w-20 h-20 rounded-2xl bg-gradient-to-br ${step.color} flex items-center justify-center`}>
                      <Icon className="w-10 h-10 text-white" />
                    </div>
                  </div>

                  <div className="flex-1 glass-light glass-hover rounded-2xl p-6">
                    <div className="flex items-start justify-between mb-4">
                      <div>
                        <div className="flex items-center gap-3 mb-2">
                          <span className="text-sm text-[#717182]">Step {step.step}</span>
                          <span className="px-3 py-1 rounded-full bg-white/10 text-xs text-white">{step.duration}</span>
                        </div>
                        <h3 className="text-white mb-2">{step.title}</h3>
                        <p className="text-[#717182] text-sm">{step.description}</p>
                      </div>
                    </div>

                    <div className="space-y-2">
                      {step.actions.map((action, actionIndex) => (
                        <div key={actionIndex} className="flex items-center gap-2">
                          <div className="w-1.5 h-1.5 rounded-full bg-cyan-400" />
                          <span className="text-sm text-white">{action}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Summary Stats */}
        <div className="mt-12 grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="glass-light glass-hover rounded-2xl p-6">
            <div className="text-2xl text-white mb-1">31 minutes</div>
            <div className="text-sm text-[#717182]">Total Setup Time</div>
          </div>
          <div className="glass-light glass-hover rounded-2xl p-6">
            <div className="text-2xl text-white mb-1">12+ hours</div>
            <div className="text-sm text-[#717182]">All-Day Battery</div>
          </div>
          <div className="glass-light glass-hover rounded-2xl p-6">
            <div className="text-2xl text-white mb-1">1.8mm</div>
            <div className="text-sm text-[#717182]">Thinnest AR Lenses</div>
          </div>
        </div>
      </div>
    </div>
  );
}