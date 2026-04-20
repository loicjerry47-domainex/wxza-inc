import React from 'react';
import { UserPlus, Video, Settings, Radio, Users, BarChart } from 'lucide-react';

export function InectUserJourneyMap() {
  const journeySteps = [
    {
      step: 1,
      title: 'Sign Up',
      description: 'Create broadcaster account',
      icon: UserPlus,
      color: 'from-red-500 to-orange-500',
      duration: '3 min',
      actions: ['Create account', 'Verify email', 'Choose pricing tier'],
    },
    {
      step: 2,
      title: 'Equipment Setup',
      description: 'Connect cameras and audio gear',
      icon: Video,
      color: 'from-blue-500 to-cyan-500',
      duration: '15 min',
      actions: ['Install INECT app', 'Connect 1-8 cameras', 'Configure audio inputs'],
    },
    {
      step: 3,
      title: 'Event Configuration',
      description: 'Set up live event details',
      icon: Settings,
      color: 'from-purple-500 to-pink-500',
      duration: '5 min',
      actions: ['Create event', 'Set title and description', 'Enable AI director'],
    },
    {
      step: 4,
      title: 'Go Live',
      description: 'Start broadcasting to the world',
      icon: Radio,
      color: 'from-green-500 to-emerald-500',
      duration: '1 min',
      actions: ['Test stream quality', 'Preview all camera angles', 'Click "Go Live"'],
    },
    {
      step: 5,
      title: 'Audience Growth',
      description: 'Watch viewers join in real-time',
      icon: Users,
      color: 'from-yellow-500 to-amber-500',
      duration: 'Ongoing',
      actions: ['Share stream link', 'Monitor viewer count', 'Engage with chat'],
    },
    {
      step: 6,
      title: 'Analytics Review',
      description: 'Analyze performance post-event',
      icon: BarChart,
      color: 'from-indigo-500 to-violet-500',
      duration: '10 min',
      actions: ['Review viewer stats', 'Download recordings', 'Export analytics'],
    },
  ];

  return (
    <div className="min-h-screen relative overflow-hidden">
      <div className="relative z-10 p-8">
        <div className="mb-8">
          <h1 className="text-white mb-2">User Journey Map</h1>
          <p className="text-[#717182]">From Setup to Live Streaming Success</p>
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
                          <div className="w-1.5 h-1.5 rounded-full bg-red-400" />
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
            <div className="text-2xl text-white mb-1">34 minutes</div>
            <div className="text-sm text-[#717182]">Setup to First Stream</div>
          </div>
          <div className="glass-light glass-hover rounded-2xl p-6">
            <div className="text-2xl text-white mb-1">0.8 seconds</div>
            <div className="text-sm text-[#717182]">Stream Latency</div>
          </div>
          <div className="glass-light glass-hover rounded-2xl p-6">
            <div className="text-2xl text-white mb-1">1M+</div>
            <div className="text-sm text-[#717182]">Max Concurrent Viewers</div>
          </div>
        </div>
      </div>
    </div>
  );
}