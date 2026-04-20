import React from 'react';
import { Download, Settings, Mic, Eye, Bell, BarChart } from 'lucide-react';

export function HearbUserJourneyMap() {
  const journeySteps = [
    {
      step: 1,
      title: 'Download App',
      description: 'Get HEARb ASSIST from app store',
      icon: Download,
      color: 'from-blue-500 to-cyan-500',
      duration: '2 min',
      actions: ['Search app store', 'Install application', 'Grant permissions'],
    },
    {
      step: 2,
      title: 'Profile Setup',
      description: 'Configure accessibility needs',
      icon: Settings,
      color: 'from-purple-500 to-pink-500',
      duration: '5 min',
      actions: ['Select accessibility features', 'Choose preferred language', 'Set up emergency contacts'],
    },
    {
      step: 3,
      title: 'Voice Calibration',
      description: 'Train speech recognition',
      icon: Mic,
      color: 'from-green-500 to-emerald-500',
      duration: '3 min',
      actions: ['Record voice samples', 'Test recognition', 'Adjust sensitivity'],
    },
    {
      step: 4,
      title: 'Vision Features',
      description: 'Set up object recognition',
      icon: Eye,
      color: 'from-yellow-500 to-amber-500',
      duration: '4 min',
      actions: ['Enable camera access', 'Test object detection', 'Configure announcements'],
    },
    {
      step: 5,
      title: 'Alerts & Safety',
      description: 'Configure emergency features',
      icon: Bell,
      color: 'from-red-500 to-orange-500',
      duration: '3 min',
      actions: ['Add emergency contacts', 'Enable fall detection', 'Test alert system'],
    },
    {
      step: 6,
      title: 'Daily Use',
      description: 'Experience seamless accessibility',
      icon: BarChart,
      color: 'from-indigo-500 to-violet-500',
      duration: '6+ hrs',
      actions: ['Real-time captions', 'Object identification', 'Voice navigation'],
    },
  ];

  return (
    <div className="min-h-screen relative overflow-hidden">
      <div className="relative z-10 p-8">
        <div className="mb-8">
          <h1 className="text-white mb-2">User Journey Map</h1>
          <p className="text-[#717182]">From Setup to Empowered Independence</p>
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
                          <div className="w-1.5 h-1.5 rounded-full bg-blue-400" />
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
            <div className="text-2xl text-white mb-1">17 minutes</div>
            <div className="text-sm text-[#717182]">Total Setup Time</div>
          </div>
          <div className="glass-light glass-hover rounded-2xl p-6">
            <div className="text-2xl text-white mb-1">95 languages</div>
            <div className="text-sm text-[#717182]">Speech Recognition Support</div>
          </div>
          <div className="glass-light glass-hover rounded-2xl p-6">
            <div className="text-2xl text-white mb-1">HIPAA</div>
            <div className="text-sm text-[#717182]">Privacy Compliant</div>
          </div>
        </div>
      </div>
    </div>
  );
}