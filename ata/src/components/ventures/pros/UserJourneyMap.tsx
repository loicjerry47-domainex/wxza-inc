import React from 'react';
import { Lightbulb, Users, Briefcase, Rocket, CheckCircle, TrendingUp } from 'lucide-react';

export function PROSUserJourneyMap() {
  const journeySteps = [
    {
      step: 1,
      title: 'Ideation',
      description: 'Submit your idea to the AI-powered system',
      icon: Lightbulb,
      color: 'from-yellow-500 to-amber-500',
      duration: '5 min',
      actions: ['Describe your project vision', 'Set goals and objectives', 'Define success metrics'],
    },
    {
      step: 2,
      title: 'AI Analysis',
      description: 'Machine learning evaluates feasibility and requirements',
      icon: TrendingUp,
      color: 'from-purple-500 to-pink-500',
      duration: '2 min',
      actions: ['Technical feasibility scan', 'Market analysis', 'Resource estimation'],
    },
    {
      step: 3,
      title: 'Team Matching',
      description: 'Connect with vetted professionals',
      icon: Users,
      color: 'from-blue-500 to-cyan-500',
      duration: '1-2 days',
      actions: ['Review matched professionals', 'Check portfolios and ratings', 'Schedule consultations'],
    },
    {
      step: 4,
      title: 'Project Planning',
      description: 'Collaborative roadmap and timeline creation',
      icon: Briefcase,
      color: 'from-green-500 to-emerald-500',
      duration: '3-5 days',
      actions: ['Define milestones', 'Allocate resources', 'Set budget and timeline'],
    },
    {
      step: 5,
      title: 'Execution',
      description: 'Build and iterate with real-time tracking',
      icon: Rocket,
      color: 'from-orange-500 to-red-500',
      duration: '30-90 days',
      actions: ['Sprint-based development', 'Regular check-ins', 'Holographic progress visualization'],
    },
    {
      step: 6,
      title: 'Delivery & Launch',
      description: 'Complete project and deploy solution',
      icon: CheckCircle,
      color: 'from-indigo-500 to-violet-500',
      duration: 'Ongoing',
      actions: ['Final quality assurance', 'Launch preparation', 'Post-launch support'],
    },
  ];

  return (
    <div className="min-h-screen relative overflow-hidden">
      <div className="relative z-10 p-8">
        <div className="mb-8">
          <h1 className="text-white mb-2">User Journey Map</h1>
          <p className="text-[#717182]">From Idea to Reality - The PRO'S Experience</p>
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
                          <span className="text-xs px-2 py-1 bg-white/10 rounded-full text-white">{step.duration}</span>
                        </div>
                        <h3 className="text-white text-xl mb-1">{step.title}</h3>
                        <p className="text-[#717182]">{step.description}</p>
                      </div>
                    </div>

                    {/* Actions */}
                    <div className="space-y-2">
                      {step.actions.map((action, actionIndex) => (
                        <div key={actionIndex} className="flex items-center gap-3 text-sm">
                          <div className="w-1.5 h-1.5 rounded-full bg-gradient-to-r from-purple-400 to-pink-400" />
                          <span className="text-gray-300">{action}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Success Metrics */}
        <div className="mt-12 glass-light rounded-2xl p-8">
          <h3 className="text-white text-xl mb-6">Journey Success Metrics</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="bg-white/5 rounded-xl p-6">
              <div className="text-3xl text-white mb-2">87%</div>
              <div className="text-sm text-[#717182]">Completion Rate</div>
            </div>
            <div className="bg-white/5 rounded-xl p-6">
              <div className="text-3xl text-white mb-2">45 days</div>
              <div className="text-sm text-[#717182]">Average Time to Launch</div>
            </div>
            <div className="bg-white/5 rounded-xl p-6">
              <div className="text-3xl text-white mb-2">4.8/5</div>
              <div className="text-sm text-[#717182]">Average Satisfaction</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}