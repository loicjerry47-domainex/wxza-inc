import React from 'react';
import { UserPlus, CreditCard, Shield, DollarSign, Check, BarChart } from 'lucide-react';

export function GcraftUserJourneyMap() {
  const journeySteps = [
    {
      step: 1,
      title: 'Sign Up',
      description: 'Create seller/buyer account',
      icon: UserPlus,
      color: 'from-green-500 to-emerald-500',
      duration: '2 min',
      actions: ['Create account', 'Verify email', 'Connect payment method'],
    },
    {
      step: 2,
      title: 'List Gift Card',
      description: 'Add card to marketplace',
      icon: CreditCard,
      color: 'from-blue-500 to-cyan-500',
      duration: '3 min',
      actions: ['Enter card details', 'Set asking price', 'Upload photo (optional)'],
    },
    {
      step: 3,
      title: 'Balance Verification',
      description: 'Automated balance check',
      icon: Shield,
      color: 'from-red-500 to-orange-500',
      duration: '30 sec',
      actions: ['API verification', 'Fraud check (ML)', 'Listing approval'],
    },
    {
      step: 4,
      title: 'Marketplace Listing',
      description: 'Card goes live for buyers',
      icon: BarChart,
      color: 'from-purple-500 to-pink-500',
      duration: 'Until sold',
      actions: ['Visible to buyers', 'Search optimization', 'Price adjustments allowed'],
    },
    {
      step: 5,
      title: 'Sale Completion',
      description: 'Buyer purchases card',
      icon: Check,
      color: 'from-yellow-500 to-amber-500',
      duration: '1 min',
      actions: ['Buyer payment processed', 'Card details transferred', 'Transaction confirmed'],
    },
    {
      step: 6,
      title: 'Instant Payout',
      description: 'Seller receives funds',
      icon: DollarSign,
      color: 'from-indigo-500 to-violet-500',
      duration: '2.3 min',
      actions: ['Stripe Connect payout', 'Funds in bank account', 'Transaction complete'],
    },
  ];

  return (
    <div className="min-h-screen relative overflow-hidden">
      <div className="relative z-10 p-8">
        <div className="mb-8">
          <h1 className="text-white mb-2">User Journey Map</h1>
          <p className="text-[#717182]">From Listing to Instant Payout</p>
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
            <div className="text-2xl text-white mb-1">8 minutes</div>
            <div className="text-sm text-[#717182]">Listing to Sale</div>
          </div>
          <div className="glass-light glass-hover rounded-2xl p-6">
            <div className="text-2xl text-white mb-1">2.3 minutes</div>
            <div className="text-sm text-[#717182]">Payout Speed</div>
          </div>
          <div className="glass-light glass-hover rounded-2xl p-6">
            <div className="text-2xl text-white mb-1">14% fee</div>
            <div className="text-sm text-[#717182]">Platform Take Rate</div>
          </div>
        </div>
      </div>
    </div>
  );
}