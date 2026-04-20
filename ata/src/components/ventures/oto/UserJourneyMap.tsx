import React from 'react';
import { UserPlus, Upload, Sparkles, Heart, Gift, TrendingUp } from 'lucide-react';

export function OtoUserJourneyMap() {
  const journeySteps = [
    {
      step: 1,
      title: 'Sign Up',
      description: 'Create account with secure authentication',
      icon: UserPlus,
      color: 'from-blue-500 to-cyan-500',
      duration: '2 min',
      actions: ['Download OTO app', 'Create account', 'Enable privacy settings'],
    },
    {
      step: 2,
      title: 'Import Contacts',
      description: 'Securely import contacts from phone/email',
      icon: Upload,
      color: 'from-purple-500 to-pink-500',
      duration: '5 min',
      actions: ['Grant contact permissions', 'Select import sources', 'Review imported contacts'],
    },
    {
      step: 3,
      title: 'AI Analysis',
      description: 'AI learns relationship patterns and preferences',
      icon: Sparkles,
      color: 'from-yellow-500 to-amber-500',
      duration: '24 hours',
      actions: ['AI analyzes interactions', 'Builds relationship graph', 'Generates initial insights'],
    },
    {
      step: 4,
      title: 'Relationship Setup',
      description: 'Categorize and enrich contact details',
      icon: Heart,
      color: 'from-pink-500 to-rose-500',
      duration: '10 min',
      actions: ['Set relationship types', 'Add important dates', 'Note preferences'],
    },
    {
      step: 5,
      title: 'Smart Reminders',
      description: 'Set up AI-powered event reminders',
      icon: Gift,
      color: 'from-green-500 to-emerald-500',
      duration: '5 min',
      actions: ['Enable notifications', 'Set reminder preferences', 'Activate gift suggestions'],
    },
    {
      step: 6,
      title: 'Ongoing Engagement',
      description: 'Receive insights and maintain relationships',
      icon: TrendingUp,
      color: 'from-indigo-500 to-violet-500',
      duration: 'Daily',
      actions: ['Review AI insights', 'Track health scores', 'Follow suggested actions'],
    },
  ];

  return (
    <div className="min-h-screen relative overflow-hidden">
      <div className="relative z-10 p-8">
        <div className="mb-8">
          <h1 className="text-white mb-2">User Journey Map</h1>
          <p className="text-[#717182]">From Sign-Up to Meaningful Connections</p>
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
            <div className="text-2xl text-white mb-1">22 minutes</div>
            <div className="text-sm text-[#717182]">Active Setup Time</div>
          </div>
          <div className="glass-light glass-hover rounded-2xl p-6">
            <div className="text-2xl text-white mb-1">24 hours</div>
            <div className="text-sm text-[#717182]">AI Learning Period</div>
          </div>
          <div className="glass-light glass-hover rounded-2xl p-6">
            <div className="text-2xl text-white mb-1">87%</div>
            <div className="text-sm text-[#717182]">User Retention (6mo)</div>
          </div>
        </div>
      </div>
    </div>
  );
}