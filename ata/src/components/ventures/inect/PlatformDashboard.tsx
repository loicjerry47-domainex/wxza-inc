import React from 'react';
import { Video, Users, Wifi, Cpu, Activity, Radio } from 'lucide-react';

export function InectPlatformDashboard() {
  const metrics = [
    { label: 'Live Events', value: '1,847', icon: Video, trend: '+23%', color: 'from-red-500 to-orange-500' },
    { label: 'Concurrent Viewers', value: '892K', icon: Users, trend: 'Peak: 1.2M', color: 'from-blue-500 to-cyan-500' },
    { label: 'Stream Latency', value: '0.8s', icon: Wifi, trend: '-0.2s', color: 'from-green-500 to-emerald-500' },
    { label: 'AI Camera Switches', value: '45.2K', icon: Cpu, trend: '87% accuracy', color: 'from-purple-500 to-pink-500' },
    { label: 'Avg Bitrate', value: '12Mbps', icon: Activity, trend: '4K quality', color: 'from-yellow-500 to-amber-500' },
    { label: 'Active Broadcasters', value: '12,450', icon: Radio, trend: '+18%', color: 'from-indigo-500 to-violet-500' },
  ];

  const liveEvents = [
    { id: 1, name: 'TechCon 2025 - Main Stage', viewers: 45200, duration: '2h 34m', quality: '4K/60fps', status: 'live' },
    { id: 2, name: 'Music Festival - EDM Stage', viewers: 89340, duration: '1h 12m', quality: '4K/30fps', status: 'live' },
    { id: 3, name: 'Product Launch - Apple Park', viewers: 124500, duration: '58m', quality: '4K/60fps', status: 'live' },
    { id: 4, name: 'Sports: NBA Finals Game 7', viewers: 892000, duration: '3h 18m', quality: '4K/60fps', status: 'live' },
    { id: 5, name: 'Gaming Tournament - Finals', viewers: 67800, duration: '4h 45m', quality: '1080p/60fps', status: 'live' },
  ];

  const getStatusColor = (status: string) => {
    if (status === 'live') return 'text-red-400 bg-red-500/10 border-red-500/20';
    return 'text-gray-400 bg-gray-500/10 border-gray-500/20';
  };

  return (
    <div className="min-h-screen relative overflow-hidden">
      <div className="relative z-10 p-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-white mb-2">INECT</h1>
          <p className="text-[#717182]">Live Event Streaming - Real-Time Platform Analytics</p>
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

        {/* Live Events Table */}
        <div className="glass-light rounded-2xl p-6">
          <h2 className="text-white mb-6">Live Events Right Now</h2>
          
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-white/10">
                  <th className="text-left text-[#717182] pb-4 pr-4">Event Name</th>
                  <th className="text-left text-[#717182] pb-4 pr-4">Viewers</th>
                  <th className="text-left text-[#717182] pb-4 pr-4">Duration</th>
                  <th className="text-left text-[#717182] pb-4 pr-4">Quality</th>
                  <th className="text-left text-[#717182] pb-4">Status</th>
                </tr>
              </thead>
              <tbody>
                {liveEvents.map((event, index) => (
                  <tr
                    key={event.id}
                    className="border-b border-white/5 hover:bg-white/5 transition-colors"
                    style={{ animation: `fadeIn 0.3s ease-out ${index * 0.1}s both` }}
                  >
                    <td className="py-4 pr-4">
                      <div className="text-white">{event.name}</div>
                    </td>
                    <td className="py-4 pr-4">
                      <span className="text-cyan-400">{event.viewers.toLocaleString()}</span>
                    </td>
                    <td className="py-4 pr-4">
                      <span className="text-[#717182]">{event.duration}</span>
                    </td>
                    <td className="py-4 pr-4">
                      <span className="text-white text-sm">{event.quality}</span>
                    </td>
                    <td className="py-4">
                      <span className={`inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs border ${getStatusColor(event.status)}`}>
                        <div className="w-1.5 h-1.5 bg-red-400 rounded-full animate-pulse" />
                        LIVE
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Live Status Indicator */}
        <div className="fixed bottom-8 right-8 bg-white/10 backdrop-blur-xl border border-white/20 rounded-full px-6 py-3 flex items-center gap-3">
          <div className="w-2 h-2 bg-red-400 rounded-full animate-pulse" />
          <span className="text-white text-sm">892K Live Viewers</span>
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