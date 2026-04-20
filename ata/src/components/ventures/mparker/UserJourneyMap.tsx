import React from 'react';
import { Smartphone, MapPin, ParkingCircle, Bike, CheckCircle, Home } from 'lucide-react';

export function MparkerUserJourneyMap() {
  const journeySteps = [
    {
      step: 1,
      title: 'App Download',
      description: 'Download Mparker app and create account',
      icon: Smartphone,
      color: 'from-blue-500 to-cyan-500',
      duration: '3 min',
      actions: ['Install mobile app', 'Create account with email', 'Add payment method'],
    },
    {
      step: 2,
      title: 'Destination Entry',
      description: 'Navigate to parking location',
      icon: MapPin,
      color: 'from-purple-500 to-pink-500',
      duration: '2 min',
      actions: ['Enter destination address', 'View available hubs nearby', 'Check real-time availability'],
    },
    {
      step: 3,
      title: 'Park Vehicle',
      description: 'Secure parking with automated entry',
      icon: ParkingCircle,
      color: 'from-green-500 to-emerald-500',
      duration: '5 min',
      actions: ['Drive to selected hub', 'AI-guided parking assistance', 'Confirm parking via app'],
    },
    {
      step: 4,
      title: 'Select Mobility',
      description: 'Choose last-mile transport option',
      icon: Bike,
      color: 'from-yellow-500 to-amber-500',
      duration: '2 min',
      actions: ['Browse available e-scooters/bikes', 'Unlock device via QR code', 'Start ride to destination'],
    },
    {
      step: 5,
      title: 'Return Journey',
      description: 'Return to hub and retrieve vehicle',
      icon: Home,
      color: 'from-orange-500 to-red-500',
      duration: '10 min',
      actions: ['Return mobility device', 'Navigate back to hub', 'Automated vehicle retrieval'],
    },
    {
      step: 6,
      title: 'Checkout',
      description: 'Complete transaction and review',
      icon: CheckCircle,
      color: 'from-indigo-500 to-violet-500',
      duration: 'Instant',
      actions: ['Automatic payment processing', 'View trip summary', 'Rate experience'],
    },
  ];

  return (
    <div className="min-h-screen relative overflow-hidden">
      <div className="relative z-10 p-8">
        <div className="mb-8">
          <h1 className="text-white mb-2">User Journey Map</h1>
          <p className="text-[#717182]">From Arrival to Departure - The Mparker Experience</p>
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
                          <span className="text-xs px-2 py-1 bg-white/10 rounded-full text-white">{step.duration}</span>
                        </div>
                        <h3 className="text-white text-xl mb-1">{step.title}</h3>
                        <p className="text-[#717182]">{step.description}</p>
                      </div>
                    </div>

                    <div className="space-y-2">
                      {step.actions.map((action, actionIndex) => (
                        <div key={actionIndex} className="flex items-center gap-3 text-sm">
                          <div className="w-1.5 h-1.5 rounded-full bg-gradient-to-r from-blue-400 to-green-400" />
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

        <div className="mt-12 glass-light rounded-2xl p-8">
          <h3 className="text-white text-xl mb-6">Journey Success Metrics</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="bg-white/5 rounded-xl p-6">
              <div className="text-3xl text-white mb-2">4.7/5</div>
              <div className="text-sm text-[#717182]">Average User Satisfaction</div>
            </div>
            <div className="bg-white/5 rounded-xl p-6">
              <div className="text-3xl text-white mb-2">18 min</div>
              <div className="text-sm text-[#717182]">Average Total Journey Time</div>
            </div>
            <div className="bg-white/5 rounded-xl p-6">
              <div className="text-3xl text-white mb-2">92%</div>
              <div className="text-sm text-[#717182]">Return User Rate</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}