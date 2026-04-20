import React from 'react';
import { Glasses, Eye, Cpu, Battery, Zap, Camera } from 'lucide-react';

export function LensstormPlatformDashboard() {
  const metrics = [
    { label: 'Active Devices', value: '78,450', icon: Glasses, trend: '+15%', color: 'from-cyan-500 to-blue-500' },
    { label: 'AR Sessions (24h)', value: '234K', icon: Eye, trend: '+8%', color: 'from-purple-500 to-pink-500' },
    { label: 'Avg Battery Life', value: '12.3hrs', icon: Battery, trend: '+0.5h', color: 'from-green-500 to-emerald-500' },
    { label: 'AI Model Latency', value: '8.7ms', icon: Cpu, trend: '-2ms', color: 'from-yellow-500 to-amber-500' },
    { label: 'Camera Shutter Uses', value: '892K', icon: Camera, trend: '99.8% privacy', color: 'from-red-500 to-orange-500' },
    { label: 'Voice Commands', value: '1.2M', icon: Zap, trend: '96% accuracy', color: 'from-indigo-500 to-violet-500' },
  ];

  const recentActivity = [
    { id: 1, device: 'LENS-PRO-0014', feature: 'Live Translation', duration: '2h 34m', battery: '78%', location: 'Tokyo' },
    { id: 2, device: 'LENS-STD-0892', feature: 'Navigation AR', duration: '45m', battery: '92%', location: 'NYC' },
    { id: 3, device: 'LENS-PRO-0423', feature: 'Object Recognition', duration: '1h 12m', battery: '64%', location: 'London' },
    { id: 4, device: 'LENS-STD-1245', feature: 'Smart Notifications', duration: '3h 18m', battery: '45%', location: 'SF' },
    { id: 5, device: 'LENS-PRO-0678', feature: 'Fitness Tracking', duration: '58m', battery: '88%', location: 'Berlin' },
  ];

  const getBatteryColor = (battery: string) => {
    const value = parseInt(battery);
    if (value > 60) return 'text-green-400';
    if (value > 30) return 'text-yellow-400';
    return 'text-red-400';
  };

  return (
    <div className="min-h-screen relative overflow-hidden">
      <div className="relative z-10 p-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-white mb-2">LENSSTORM</h1>
          <p className="text-[#717182]">Invisible AR Eyewear - Real-Time Device Analytics</p>
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
          <h2 className="text-white mb-6">Active Sessions</h2>
          
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-white/10">
                  <th className="text-left text-[#717182] pb-4 pr-4">Device ID</th>
                  <th className="text-left text-[#717182] pb-4 pr-4">Feature</th>
                  <th className="text-left text-[#717182] pb-4 pr-4">Session Duration</th>
                  <th className="text-left text-[#717182] pb-4 pr-4">Battery</th>
                  <th className="text-left text-[#717182] pb-4">Location</th>
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
                      <code className="text-cyan-400 text-sm">{activity.device}</code>
                    </td>
                    <td className="py-4 pr-4">
                      <span className="text-white">{activity.feature}</span>
                    </td>
                    <td className="py-4 pr-4">
                      <span className="text-[#717182]">{activity.duration}</span>
                    </td>
                    <td className="py-4 pr-4">
                      <span className={`${getBatteryColor(activity.battery)}`}>{activity.battery}</span>
                    </td>
                    <td className="py-4">
                      <span className="text-white text-sm">{activity.location}</span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Live Status Indicator */}
        <div className="fixed bottom-8 right-8 bg-white/10 backdrop-blur-xl border border-white/20 rounded-full px-6 py-3 flex items-center gap-3">
          <div className="w-2 h-2 bg-cyan-400 rounded-full animate-pulse" />
          <span className="text-white text-sm">78.4K Devices Online</span>
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