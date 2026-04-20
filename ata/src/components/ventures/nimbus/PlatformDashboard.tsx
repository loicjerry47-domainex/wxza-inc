import React from 'react';
import { Droplet, ThermometerSun, Wind, Sun, Leaf, Zap } from 'lucide-react';

export function NimbusPlatformDashboard() {
  const metrics = [
    { label: 'Active Devices', value: '45,230', icon: Leaf, trend: '+8%', color: 'from-green-500 to-emerald-500' },
    { label: 'Plant Survival Rate', value: '95%', icon: Sun, trend: '+2%', color: 'from-yellow-500 to-amber-500' },
    { label: 'Avg Temperature', value: '22.5°C', icon: ThermometerSun, trend: '±0', color: 'from-orange-500 to-red-500' },
    { label: 'Humidity Level', value: '68%', icon: Droplet, trend: '+3%', color: 'from-blue-500 to-cyan-500' },
    { label: 'Air Quality', value: '98/100', icon: Wind, trend: '+5', color: 'from-purple-500 to-pink-500' },
    { label: 'Energy Usage', value: '12W avg', icon: Zap, trend: '-8%', color: 'from-indigo-500 to-violet-500' },
  ];

  const recentAlerts = [
    { id: 1, device: 'NIMBUS-HOME-001', type: 'Low Water Level', severity: 'Warning', time: '5 min ago', status: 'Auto-refilled' },
    { id: 2, device: 'NIMBUS-OFFICE-042', type: 'High Temperature', severity: 'Info', time: '12 min ago', status: 'Adjusted' },
    { id: 3, device: 'NIMBUS-CAFE-018', type: 'Low Light', severity: 'Info', time: '18 min ago', status: 'LED increased' },
    { id: 4, device: 'NIMBUS-HOME-087', type: 'Nutrient Low', severity: 'Warning', time: '23 min ago', status: 'Scheduled refill' },
    { id: 5, device: 'NIMBUS-HOTEL-123', type: 'Optimal Conditions', severity: 'Success', time: '30 min ago', status: 'Thriving' },
  ];

  const getSeverityColor = (severity: string) => {
    switch (severity) {
      case 'Warning': return 'text-yellow-400 bg-yellow-500/10 border-yellow-500/20';
      case 'Info': return 'text-blue-400 bg-blue-500/10 border-blue-500/20';
      case 'Success': return 'text-green-400 bg-green-500/10 border-green-500/20';
      default: return 'text-gray-400 bg-gray-500/10 border-gray-500/20';
    }
  };

  return (
    <div className="min-h-screen relative overflow-hidden">
      <div className="relative z-10 p-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-white mb-2">NIMBUS BIOME™</h1>
          <p className="text-[#717182]">Climate Tech Platform - Real-Time Environmental Monitoring</p>
        </div>

        {/* Metrics Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
          {metrics.map((metric, index) => {
            const Icon = metric.icon;
            return (
              <div
                key={index}
                className="bg-black/40 backdrop-blur-xl border border-white/5 rounded-2xl p-6 hover:bg-black/60 hover:border-purple-500/30 transition-all duration-300"
              >
                <div className="flex items-start justify-between mb-4">
                  <div className={`p-3 rounded-xl bg-gradient-to-br ${metric.color}`}>
                    <Icon className="w-6 h-6 text-white" />
                  </div>
                  <div className={`text-sm px-3 py-1 rounded-full ${
                    metric.trend.startsWith('+') && !metric.label.includes('Energy') ? 'bg-green-500/10 text-green-400' : 
                    metric.trend.startsWith('-') ? 'bg-green-500/10 text-green-400' : 
                    'bg-gray-500/10 text-gray-400'
                  }`}>
                    {metric.trend}
                  </div>
                </div>
                <div className="text-3xl text-white mb-1">{metric.value}</div>
                <div className="text-sm text-[#717182]">{metric.label}</div>
              </div>
            );
          })}
        </div>

        {/* Recent Alerts Table */}
        <div className="bg-black/40 backdrop-blur-xl border border-white/5 rounded-2xl p-6">
          <h2 className="text-white mb-6">Recent Device Alerts</h2>
          
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-white/10">
                  <th className="text-left text-[#717182] pb-4 pr-4">Device ID</th>
                  <th className="text-left text-[#717182] pb-4 pr-4">Alert Type</th>
                  <th className="text-left text-[#717182] pb-4 pr-4">Severity</th>
                  <th className="text-left text-[#717182] pb-4 pr-4">Status</th>
                  <th className="text-left text-[#717182] pb-4">Time</th>
                </tr>
              </thead>
              <tbody>
                {recentAlerts.map((alert, index) => (
                  <tr
                    key={alert.id}
                    className="border-b border-white/5 hover:bg-white/5 transition-colors"
                    style={{ animation: `fadeIn 0.3s ease-out ${index * 0.1}s both` }}
                  >
                    <td className="py-4 pr-4">
                      <code className="text-cyan-400 text-sm">{alert.device}</code>
                    </td>
                    <td className="py-4 pr-4">
                      <div className="text-white">{alert.type}</div>
                    </td>
                    <td className="py-4 pr-4">
                      <span className={`inline-block px-3 py-1 rounded-full text-xs border ${getSeverityColor(alert.severity)}`}>
                        {alert.severity}
                      </span>
                    </td>
                    <td className="py-4 pr-4">
                      <span className="text-green-400">{alert.status}</span>
                    </td>
                    <td className="py-4">
                      <span className="text-[#717182] text-sm">{alert.time}</span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Live Status Indicator */}
        <div className="fixed bottom-8 right-8 bg-white/10 backdrop-blur-xl border border-white/20 rounded-full px-6 py-3 flex items-center gap-3">
          <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse" />
          <span className="text-white text-sm">All Systems Optimal</span>
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