import React from 'react';
import { Ear, MessageSquare, Eye, Volume2, Languages, Heart } from 'lucide-react';

export function HearbPlatformDashboard() {
  const metrics = [
    { label: 'Active Users', value: '124K', icon: Heart, trend: '+14%', color: 'from-blue-500 to-cyan-500' },
    { label: 'Speech-to-Text (24h)', value: '892K', icon: MessageSquare, trend: '&lt;200ms', color: 'from-purple-500 to-pink-500' },
    { label: 'Object Recognition', value: '1.2M', icon: Eye, trend: '97% accuracy', color: 'from-green-500 to-emerald-500' },
    { label: 'Voice Commands', value: '567K', icon: Volume2, trend: '94% success', color: 'from-yellow-500 to-amber-500' },
    { label: 'Languages Supported', value: '95', icon: Languages, trend: '+5 new', color: 'from-red-500 to-orange-500' },
    { label: 'Avg Session Duration', value: '6.2hrs', icon: Ear, trend: '+0.8h', color: 'from-indigo-500 to-violet-500' },
  ];

  const recentActivity = [
    { id: 1, feature: 'Live Captions', user: 'User #8423', duration: '2h 14m', accuracy: '98%', language: 'English' },
    { id: 2, feature: 'Object Detection', user: 'User #5192', duration: '45m', accuracy: '96%', language: 'Spanish' },
    { id: 3, feature: 'Voice Navigation', user: 'User #9871', duration: '1h 32m', accuracy: '95%', language: 'French' },
    { id: 4, feature: 'Live Captions', user: 'User #2456', duration: '3h 05m', accuracy: '97%', language: 'Mandarin' },
    { id: 5, feature: 'Emergency Alert', user: 'User #6734', duration: '12m', accuracy: '99%', language: 'English' },
  ];

  return (
    <div className="min-h-screen relative overflow-hidden">
      <div className="relative z-10 p-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-white mb-2">HEARb ASSIST</h1>
          <p className="text-[#717182]">Assistive Technology - Real-Time Accessibility Platform</p>
        </div>

        {/* Metrics Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
          {metrics.map((metric, index) => {
            const Icon = metric.icon;
            return (
              <div
                key={index}
                className="glass-light glass-hover rounded-2xl p-6"
              >
                <div className="flex items-start justify-between mb-4">
                  <div className={`p-3 rounded-xl bg-gradient-to-br ${metric.color}`}>
                    <Icon className="w-6 h-6 text-white" />
                  </div>
                  <div className="text-sm px-3 py-1 rounded-full bg-white/10 text-white">
                    {metric.trend}
                  </div>
                </div>
                <div className="text-3xl text-white mb-1">{metric.value}</div>
                <div className="text-sm text-[#717182]">{metric.label}</div>
              </div>
            );
          })}
        </div>

        {/* Recent Activity Table */}
        <div className="glass-light rounded-2xl p-6">
          <h2 className="text-white mb-6">Recent Activity</h2>
          
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-white/10">
                  <th className="text-left text-[#717182] pb-4 pr-4">Feature Used</th>
                  <th className="text-left text-[#717182] pb-4 pr-4">User</th>
                  <th className="text-left text-[#717182] pb-4 pr-4">Duration</th>
                  <th className="text-left text-[#717182] pb-4 pr-4">Accuracy</th>
                  <th className="text-left text-[#717182] pb-4">Language</th>
                </tr>
              </thead>
              <tbody>
                {recentActivity.map((activity, index) => (
                  <tr
                    key={activity.id}
                    className="border-b border-white/5 hover:bg-white/5 transition-colors"
                    style={{ animation: `fadeIn 0.3s ease-out ${index * 0.1}s both` }}
                  >
                    <td className="py-4 pr-4">
                      <span className="text-white">{activity.feature}</span>
                    </td>
                    <td className="py-4 pr-4">
                      <code className="text-cyan-400 text-sm">{activity.user}</code>
                    </td>
                    <td className="py-4 pr-4">
                      <span className="text-[#717182]">{activity.duration}</span>
                    </td>
                    <td className="py-4 pr-4">
                      <span className="text-green-400">{activity.accuracy}</span>
                    </td>
                    <td className="py-4">
                      <span className="text-white text-sm">{activity.language}</span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Live Status Indicator */}
        <div className="fixed bottom-8 right-8 bg-white/10 backdrop-blur-xl border border-white/20 rounded-full px-6 py-3 flex items-center gap-3">
          <div className="w-2 h-2 bg-blue-400 rounded-full animate-pulse" />
          <span className="text-white text-sm">HIPAA Compliant</span>
        </div>
      </div>

      <style>{`
        @keyframes fadeIn {
          from {
            opacity: 0;
            transform: translateY(10px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
      `}</style>
    </div>
  );
}