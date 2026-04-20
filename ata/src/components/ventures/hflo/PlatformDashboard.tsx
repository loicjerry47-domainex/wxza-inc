import React from 'react';
import { Flower2, Sun, Sparkles, Leaf, Battery, Eye } from 'lucide-react';

export function HfloPlatformDashboard() {
  const metrics = [
    { label: 'Units Deployed', value: '12,450', icon: Flower2, trend: '+8%', color: 'from-pink-500 to-rose-500' },
    { label: 'Solar Efficiency', value: '30%', icon: Sun, trend: 'Quantum dots', color: 'from-yellow-500 to-amber-500' },
    { label: 'Species Library', value: '1,247', icon: Sparkles, trend: '+42 new', color: 'from-purple-500 to-pink-500' },
    { label: 'Active Gardens', value: '8,923', icon: Leaf, trend: '+15%', color: 'from-green-500 to-emerald-500' },
    { label: 'Avg Lifespan', value: '15 yrs', icon: Battery, trend: 'Zero maintenance', color: 'from-blue-500 to-cyan-500' },
    { label: 'Display Quality', value: '4K', icon: Eye, trend: 'Pepper Ghost', color: 'from-indigo-500 to-violet-500' },
  ];

  const recentInstallations = [
    { id: 1, location: 'Central Park, NYC', species: 'Cherry Blossom', units: 24, status: 'active', uptime: '99.8%' },
    { id: 2, location: 'Dubai Mall Atrium', species: 'Orchid Mix', units: 48, status: 'active', uptime: '100%' },
    { id: 3, location: 'Tokyo Garden Museum', species: 'Sakura Collection', units: 36, status: 'active', uptime: '99.9%' },
    { id: 4, location: 'Singapore Changi Airport', species: 'Tropical Paradise', units: 72, status: 'maintenance', uptime: '98.2%' },
    { id: 5, location: 'London Kew Gardens', species: 'Rose Garden', units: 18, status: 'active', uptime: '100%' },
  ];

  const getStatusColor = (status: string) => {
    if (status === 'active') return 'text-green-400 bg-green-500/10 border-green-500/20';
    return 'text-yellow-400 bg-yellow-500/10 border-yellow-500/20';
  };

  return (
    <div className="min-h-screen relative overflow-hidden">
      <div className="relative z-10 p-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-white mb-2">HFLO</h1>
          <p className="text-[#717182]">Solar Holographic Flowers - Global Deployment Dashboard</p>
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

        {/* Recent Installations Table */}
        <div className="glass-light rounded-2xl p-6">
          <h2 className="text-white mb-6">Recent Installations</h2>
          
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-white/10">
                  <th className="text-left text-[#717182] pb-4 pr-4">Location</th>
                  <th className="text-left text-[#717182] pb-4 pr-4">Species</th>
                  <th className="text-left text-[#717182] pb-4 pr-4">Units</th>
                  <th className="text-left text-[#717182] pb-4 pr-4">Uptime</th>
                  <th className="text-left text-[#717182] pb-4">Status</th>
                </tr>
              </thead>
              <tbody>
                {recentInstallations.map((install, index) => (
                  <tr
                    key={install.id}
                    className="border-b border-white/5 hover:bg-white/5 transition-colors"
                    style={{ animation: `fadeIn 0.3s ease-out ${index * 0.1}s both` }}
                  >
                    <td className="py-4 pr-4">
                      <span className="text-white">{install.location}</span>
                    </td>
                    <td className="py-4 pr-4">
                      <span className="text-pink-400">{install.species}</span>
                    </td>
                    <td className="py-4 pr-4">
                      <span className="text-[#717182]">{install.units}</span>
                    </td>
                    <td className="py-4 pr-4">
                      <span className="text-green-400">{install.uptime}</span>
                    </td>
                    <td className="py-4">
                      <span className={`inline-flex items-center px-3 py-1 rounded-full text-xs border ${getStatusColor(install.status)}`}>
                        {install.status.toUpperCase()}
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
          <div className="w-2 h-2 bg-pink-400 rounded-full animate-pulse" />
          <span className="text-white text-sm">12.4K Units Online</span>
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