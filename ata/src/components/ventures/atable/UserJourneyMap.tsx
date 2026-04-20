import React from 'react';
import { Download, Shield, CheckCircle, Settings, Bell, BarChart } from 'lucide-react';

export function AtableUserJourneyMap() {
  const journeySteps = [
    {
      step: 1,
      title: 'Installation',
      description: 'Download and install ATABLE agent on endpoints',
      icon: Download,
      color: 'from-blue-500 to-cyan-500',
      duration: '5 min',
      actions: ['Download agent', 'Install on endpoints', 'Enter license key'],
    },
    {
      step: 2,
      title: 'Initial Scan',
      description: 'AI baseline scan to learn normal behavior',
      icon: Shield,
      color: 'from-purple-500 to-pink-500',
      duration: '24 hours',
      actions: ['Behavioral analysis', 'Network mapping', 'Asset discovery'],
    },
    {
      step: 3,
      title: 'Configuration',
      description: 'Customize security policies and alerts',
      icon: Settings,
      color: 'from-green-500 to-emerald-500',
      duration: '10 min',
      actions: ['Set threat levels', 'Configure alerts', 'Define policies'],
    },
    {
      step: 4,
      title: 'Active Protection',
      description: 'Real-time threat detection and blocking',
      icon: CheckCircle,
      color: 'from-yellow-500 to-amber-500',
      duration: 'Ongoing',
      actions: ['Monitor threats', 'Auto-block attacks', 'Log incidents'],
    },
    {
      step: 5,
      title: 'Alerts & Response',
      description: 'Receive notifications for critical threats',
      icon: Bell,
      color: 'from-red-500 to-orange-500',
      duration: 'Real-time',
      actions: ['Email alerts', 'Slack notifications', 'SMS (critical)'],
    },
    {
      step: 6,
      title: 'Analytics',
      description: 'View dashboards and security reports',
      icon: BarChart,
      color: 'from-indigo-500 to-violet-500',
      duration: 'Daily',
      actions: ['Review metrics', 'Export reports', 'Trend analysis'],
    },
  ];

  return (
    <div className="min-h-screen relative overflow-hidden">
      <div className="relative z-10 p-8">
        <div className="mb-8">
          <h1 className="text-white mb-2">User Journey Map</h1>
          <p className="text-[#717182]">From Installation to Full Protection</p>
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
            <div className="text-2xl text-white mb-1">~25 hours</div>
            <div className="text-sm text-[#717182]">Time to Full Protection</div>
          </div>
          <div className="glass-light glass-hover rounded-2xl p-6">
            <div className="text-2xl text-white mb-1">15 min</div>
            <div className="text-sm text-[#717182]">Active Setup Time</div>
          </div>
          <div className="glass-light glass-hover rounded-2xl p-6">
            <div className="text-2xl text-white mb-1">Zero</div>
            <div className="text-sm text-[#717182]">Manual Intervention Required</div>
          </div>
        </div>
      </div>
    </div>
  );
}