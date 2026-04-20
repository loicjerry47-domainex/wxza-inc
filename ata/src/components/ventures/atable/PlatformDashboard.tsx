import React from 'react';
import { Shield, Activity, AlertTriangle, CheckCircle, TrendingUp, Zap } from 'lucide-react';

export function AtablePlatformDashboard() {
  const metrics = [
    { label: 'Threat Detection Rate', value: '99.3%', icon: Shield, trend: '+0.2%', color: 'from-blue-500 to-cyan-500' },
    { label: 'Active Endpoints', value: '127,450', icon: Activity, trend: '+12%', color: 'from-purple-500 to-pink-500' },
    { label: 'Threats Blocked (24h)', value: '8,234', icon: AlertTriangle, trend: '-5%', color: 'from-red-500 to-orange-500' },
    { label: 'System Uptime', value: '99.99%', icon: CheckCircle, trend: '0%', color: 'from-green-500 to-emerald-500' },
    { label: 'Avg Detection Latency', value: '8.4ms', icon: Zap, trend: '-12%', color: 'from-yellow-500 to-amber-500' },
    { label: 'AI Model Accuracy', value: '97.8%', icon: TrendingUp, trend: '+1.3%', color: 'from-indigo-500 to-violet-500' },
  ];

  const recentThreats = [
    { id: 1, type: 'Ransomware Attempt', severity: 'Critical', status: 'Blocked', time: '2 min ago', ip: '203.45.67.89' },
    { id: 2, type: 'SQL Injection', severity: 'High', status: 'Blocked', time: '5 min ago', ip: '198.23.45.12' },
    { id: 3, type: 'DDoS Attack', severity: 'Critical', status: 'Mitigated', time: '12 min ago', ip: '45.67.89.123' },
    { id: 4, type: 'Phishing Email', severity: 'Medium', status: 'Quarantined', time: '18 min ago', ip: '87.34.12.45' },
    { id: 5, type: 'Brute Force Login', severity: 'High', status: 'Blocked', time: '23 min ago', ip: '156.78.90.234' },
  ];

  const getSeverityColor = (severity: string) => {
    switch (severity) {
      case 'Critical': return 'text-red-400 bg-red-500/10 border-red-500/20';
      case 'High': return 'text-orange-400 bg-orange-500/10 border-orange-500/20';
      case 'Medium': return 'text-yellow-400 bg-yellow-500/10 border-yellow-500/20';
      default: return 'text-gray-400 bg-gray-500/10 border-gray-500/20';
    }
  };

  return (
    <div className="min-h-screen relative overflow-hidden">
      <div className="relative z-10 p-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-white mb-2">ATABLE NEURAL 2077</h1>
          <p className="text-[#717182]">AI-Native Security Platform - Real-Time Dashboard</p>
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
                  <div className={`text-sm px-3 py-1 rounded-full ${metric.trend.startsWith('+') ? 'bg-green-500/10 text-green-400' : metric.trend.startsWith('-') && metric.label.includes('Latency') ? 'bg-green-500/10 text-green-400' : metric.trend.startsWith('-') ? 'bg-red-500/10 text-red-400' : 'bg-gray-500/10 text-gray-400'}`}>
                    {metric.trend}
                  </div>
                </div>
                <div className="text-3xl text-white mb-1">{metric.value}</div>
                <div className="text-sm text-[#717182]">{metric.label}</div>
              </div>
            );
          })}
        </div>

        {/* Recent Threats Table */}
        <div className="bg-black/40 backdrop-blur-xl border border-white/5 rounded-2xl p-6">
          <h2 className="text-white mb-6">Recent Threat Activity</h2>
          
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-white/10">
                  <th className="text-left text-[#717182] pb-4 pr-4">Threat Type</th>
                  <th className="text-left text-[#717182] pb-4 pr-4">Severity</th>
                  <th className="text-left text-[#717182] pb-4 pr-4">Status</th>
                  <th className="text-left text-[#717182] pb-4 pr-4">Source IP</th>
                  <th className="text-left text-[#717182] pb-4">Time</th>
                </tr>
              </thead>
              <tbody>
                {recentThreats.map((threat, index) => (
                  <tr
                    key={threat.id}
                    className="border-b border-white/5 hover:bg-white/5 transition-colors"
                    style={{ animation: `fadeIn 0.3s ease-out ${index * 0.1}s both` }}
                  >
                    <td className="py-4 pr-4">
                      <div className="text-white">{threat.type}</div>
                    </td>
                    <td className="py-4 pr-4">
                      <span className={`inline-block px-3 py-1 rounded-full text-xs border ${getSeverityColor(threat.severity)}`}>
                        {threat.severity}
                      </span>
                    </td>
                    <td className="py-4 pr-4">
                      <span className="text-green-400">{threat.status}</span>
                    </td>
                    <td className="py-4 pr-4">
                      <code className="text-cyan-400 text-sm">{threat.ip}</code>
                    </td>
                    <td className="py-4">
                      <span className="text-[#717182] text-sm">{threat.time}</span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Live Feed Indicator */}
        <div className="fixed bottom-8 right-8 bg-black/50 backdrop-blur-xl border border-purple-500/30 rounded-full px-6 py-3 flex items-center gap-3 shadow-lg shadow-purple-500/20">
          <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse" />
          <span className="text-white text-sm">Live Monitoring Active</span>
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