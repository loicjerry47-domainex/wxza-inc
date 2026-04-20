import React from 'react';
import { Package, Settings, Sun, Flower2, Sparkles, BarChart } from 'lucide-react';

export function HfloUserJourneyMap() {
  const journeySteps = [
    {
      step: 1,
      title: 'Purchase',
      description: 'Order HFLO holographic flower',
      icon: Package,
      color: 'from-pink-500 to-rose-500',
      duration: '5 min',
      actions: ['Choose flower species', 'Select installation size', 'Complete checkout'],
    },
    {
      step: 2,
      title: 'Installation',
      description: 'Professional setup service',
      icon: Settings,
      color: 'from-blue-500 to-cyan-500',
      duration: '2 hours',
      actions: ['Technician visit', 'Mount solar panel', 'Position hologram unit'],
    },
    {
      step: 3,
      title: 'Solar Activation',
      description: 'Quantum dot panels power on',
      icon: Sun,
      color: 'from-yellow-500 to-amber-500',
      duration: '30 min',
      actions: ['Sunlight collection starts', 'Battery charging begins', 'System self-test'],
    },
    {
      step: 4,
      title: 'First Display',
      description: 'Holographic flower appears',
      icon: Flower2,
      color: 'from-purple-500 to-pink-500',
      duration: 'Instant',
      actions: ['4K hologram projection', '60fps smooth animation', 'Pepper Ghost effect'],
    },
    {
      step: 5,
      title: 'Customization',
      description: 'Download new species',
      icon: Sparkles,
      color: 'from-green-500 to-emerald-500',
      duration: '10 min',
      actions: ['Browse 1,247 species', 'OTA download', 'Switch displays'],
    },
    {
      step: 6,
      title: 'Zero Maintenance',
      description: '15-year autonomous operation',
      icon: BarChart,
      color: 'from-indigo-500 to-violet-500',
      duration: '15 years',
      actions: ['Solar self-powered', 'Weather resistant', 'Lifetime warranty'],
    },
  ];

  return (
    <div className="min-h-screen relative overflow-hidden">
      <div className="relative z-10 p-8">
        <div className="mb-8">
          <h1 className="text-white mb-2">User Journey Map</h1>
          <p className="text-[#717182]">From Purchase to Perpetual Beauty</p>
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
                          <div className="w-1.5 h-1.5 rounded-full bg-pink-400" />
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
            <div className="text-2xl text-white mb-1">3 hours</div>
            <div className="text-sm text-[#717182]">Install to First Display</div>
          </div>
          <div className="glass-light glass-hover rounded-2xl p-6">
            <div className="text-2xl text-white mb-1">15 years</div>
            <div className="text-sm text-[#717182]">Zero Maintenance</div>
          </div>
          <div className="glass-light glass-hover rounded-2xl p-6">
            <div className="text-2xl text-white mb-1">100%</div>
            <div className="text-sm text-[#717182]">Solar Powered</div>
          </div>
        </div>
      </div>
    </div>
  );
}