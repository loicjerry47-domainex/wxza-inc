import React from 'react';
import { Package, Wifi, Droplet, Settings, Leaf, BarChart } from 'lucide-react';

export function NimbusUserJourneyMap() {
  const journeySteps = [
    {
      step: 1,
      title: 'Unboxing',
      description: 'Receive and unpack NIMBUS BIOME™',
      icon: Package,
      color: 'from-green-500 to-emerald-500',
      duration: '5 min',
      actions: ['Remove device from box', 'Check included accessories', 'Read quick start guide'],
    },
    {
      step: 2,
      title: 'Setup & Connection',
      description: 'Connect device to Wi-Fi and mobile app',
      icon: Wifi,
      color: 'from-blue-500 to-cyan-500',
      duration: '10 min',
      actions: ['Download NIMBUS app', 'Connect to Wi-Fi', 'Pair device via Bluetooth'],
    },
    {
      step: 3,
      title: 'Initial Fill',
      description: 'Add water and plant your selection',
      icon: Droplet,
      color: 'from-purple-500 to-pink-500',
      duration: '15 min',
      actions: ['Fill water reservoir', 'Add nutrient solution', 'Plant seeds or transplant'],
    },
    {
      step: 4,
      title: 'Customization',
      description: 'Configure climate settings and automation',
      icon: Settings,
      color: 'from-yellow-500 to-amber-500',
      duration: '5 min',
      actions: ['Select plant species', 'Set temperature preferences', 'Configure watering schedule'],
    },
    {
      step: 5,
      title: 'Growth Phase',
      description: 'AI monitors and optimizes environment',
      icon: Leaf,
      color: 'from-green-500 to-emerald-500',
      duration: '30+ days',
      actions: ['Automatic watering', 'Light optimization', 'Real-time notifications'],
    },
    {
      step: 6,
      title: 'Monitoring',
      description: 'Track plant health and environmental data',
      icon: BarChart,
      color: 'from-indigo-500 to-violet-500',
      duration: 'Ongoing',
      actions: ['View health dashboard', 'Review sensor history', 'Receive care tips'],
    },
  ];

  return (
    <div className="min-h-screen relative overflow-hidden">
      <div className="relative z-10 p-8">
        <div className="mb-8">
          <h1 className="text-white mb-2">User Journey Map</h1>
          <p className="text-[#717182]">From Unboxing to Thriving Garden</p>
        </div>

        {/* Journey Timeline */}
        <div className="space-y-8">
          {journeySteps.map((step, index) => {
            const Icon = step.icon;
            const isLast = index === journeySteps.length - 1;
            
            return (
              <div key={step.step} className="relative">
                {/* Connection Line */}
                {!isLast && (
                  <div className="absolute left-[2.25rem] top-[5rem] w-0.5 h-16 bg-gradient-to-b from-white/20 to-transparent" />
                )}
                
                <div className="flex gap-6">
                  {/* Step Icon */}
                  <div className="flex-shrink-0">
                    <div className={`w-20 h-20 rounded-2xl bg-gradient-to-br ${step.color} flex items-center justify-center`}>
                      <Icon className="w-10 h-10 text-white" />
                    </div>
                  </div>

                  {/* Step Content */}
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

                    {/* Actions */}
                    <div className="space-y-2">
                      {step.actions.map((action, actionIndex) => (
                        <div key={actionIndex} className="flex items-center gap-2">
                          <div className="w-1.5 h-1.5 rounded-full bg-green-400" />
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
            <div className="text-2xl text-white mb-1">35 minutes</div>
            <div className="text-sm text-[#717182]">Total Setup Time</div>
          </div>
          <div className="glass-light glass-hover rounded-2xl p-6">
            <div className="text-2xl text-white mb-1">30 days</div>
            <div className="text-sm text-[#717182]">Self-Watering Capacity</div>
          </div>
          <div className="glass-light glass-hover rounded-2xl p-6">
            <div className="text-2xl text-white mb-1">95%</div>
            <div className="text-sm text-[#717182]">Plant Survival Rate</div>
          </div>
        </div>
      </div>
    </div>
  );
}