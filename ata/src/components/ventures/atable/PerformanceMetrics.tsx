import React from 'react';
import { LineChart, Line, AreaChart, Area, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell } from 'recharts';
import { TrendingUp, Zap, Shield, Activity } from 'lucide-react';

export function AtablePerformanceMetrics() {
  const threatDetectionData = [
    { time: '00:00', detected: 245, blocked: 242, false_positives: 3 },
    { time: '04:00', detected: 189, blocked: 187, false_positives: 2 },
    { time: '08:00', detected: 412, blocked: 408, false_positives: 4 },
    { time: '12:00', detected: 523, blocked: 518, false_positives: 5 },
    { time: '16:00', detected: 689, blocked: 683, false_positives: 6 },
    { time: '20:00', detected: 456, blocked: 452, false_positives: 4 },
  ];

  const latencyData = [
    { time: '00:00', p50: 6.2, p95: 12.4, p99: 18.7 },
    { time: '04:00', p50: 5.8, p95: 11.2, p99: 16.9 },
    { time: '08:00', p50: 7.1, p95: 14.3, p99: 21.5 },
    { time: '12:00', p50: 8.4, p95: 16.8, p99: 25.2 },
    { time: '16:00', p50: 9.2, p95: 18.4, p99: 27.6 },
    { time: '20:00', p50: 7.5, p95: 15.0, p99: 22.5 },
  ];

  const threatTypeDistribution = [
    { name: 'Ransomware', value: 28, color: '#ef4444' },
    { name: 'SQL Injection', value: 22, color: '#f97316' },
    { name: 'DDoS', value: 18, color: '#eab308' },
    { name: 'Phishing', value: 15, color: '#06b6d4' },
    { name: 'Brute Force', value: 12, color: '#8b5cf6' },
    { name: 'Other', value: 5, color: '#6b7280' },
  ];

  const mlModelAccuracy = [
    { model: 'XGBoost', accuracy: 97.8 },
    { model: 'Random Forest', accuracy: 96.2 },
    { model: 'LSTM', accuracy: 94.5 },
    { model: 'CNN', accuracy: 95.8 },
    { model: 'Ensemble', accuracy: 99.3 },
  ];

  return (
    <div className="min-h-screen relative overflow-hidden">
      <div className="relative z-10 p-8">
        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center gap-3 mb-2">
            <Activity className="w-8 h-8 text-cyan-400" />
            <h1 className="text-white">Performance Metrics</h1>
          </div>
          <p className="text-[#717182]">ATABLE NEURAL 2077 - Real-Time Analytics</p>
        </div>

        {/* Key Metrics */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <div className="glass-light glass-hover rounded-2xl p-6">
            <div className="flex items-center justify-between mb-4">
              <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-green-500 to-emerald-500 flex items-center justify-center">
                <Shield className="w-6 h-6 text-white" />
              </div>
              <div className="text-green-400 text-sm">+0.2%</div>
            </div>
            <div className="text-3xl text-white mb-1">99.3%</div>
            <div className="text-sm text-[#717182]">Detection Accuracy</div>
          </div>

          <div className="glass-light glass-hover rounded-2xl p-6">
            <div className="flex items-center justify-between mb-4">
              <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-blue-500 to-cyan-500 flex items-center justify-center">
                <Zap className="w-6 h-6 text-white" />
              </div>
              <div className="text-green-400 text-sm">-12%</div>
            </div>
            <div className="text-3xl text-white mb-1">8.4ms</div>
            <div className="text-sm text-[#717182]">Avg Detection Time</div>
          </div>

          <div className="glass-light glass-hover rounded-2xl p-6">
            <div className="flex items-center justify-between mb-4">
              <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-purple-500 to-pink-500 flex items-center justify-center">
                <TrendingUp className="w-6 h-6 text-white" />
              </div>
              <div className="text-green-400 text-sm">+15%</div>
            </div>
            <div className="text-3xl text-white mb-1">8,234</div>
            <div className="text-sm text-[#717182]">Threats Blocked (24h)</div>
          </div>

          <div className="glass-light glass-hover rounded-2xl p-6">
            <div className="flex items-center justify-between mb-4">
              <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-red-500 to-orange-500 flex items-center justify-center">
                <Activity className="w-6 h-6 text-white" />
              </div>
              <div className="text-gray-400 text-sm">0.7%</div>
            </div>
            <div className="text-3xl text-white mb-1">0.7%</div>
            <div className="text-sm text-[#717182]">False Positive Rate</div>
          </div>
        </div>

        {/* Charts Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
          {/* Threat Detection Over Time */}
          <div className="glass-light rounded-2xl p-6">
            <h3 className="text-white mb-6">Threat Detection (24h)</h3>
            <ResponsiveContainer width="100%" height={300}>
              <AreaChart data={threatDetectionData}>
                <defs>
                  <linearGradient id="detectedGradient" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#06b6d4" stopOpacity={0.3}/>
                    <stop offset="95%" stopColor="#06b6d4" stopOpacity={0}/>
                  </linearGradient>
                  <linearGradient id="blockedGradient" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#10b981" stopOpacity={0.3}/>
                    <stop offset="95%" stopColor="#10b981" stopOpacity={0}/>
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.1)" />
                <XAxis dataKey="time" stroke="#717182" />
                <YAxis stroke="#717182" />
                <Tooltip
                  contentStyle={{
                    backgroundColor: 'rgba(0,0,0,0.8)',
                    border: '1px solid rgba(255,255,255,0.1)',
                    borderRadius: '12px',
                    color: '#fff'
                  }}
                />
                <Area type="monotone" dataKey="detected" stroke="#06b6d4" fill="url(#detectedGradient)" strokeWidth={2} />
                <Area type="monotone" dataKey="blocked" stroke="#10b981" fill="url(#blockedGradient)" strokeWidth={2} />
              </AreaChart>
            </ResponsiveContainer>
          </div>

          {/* Detection Latency */}
          <div className="glass-light rounded-2xl p-6">
            <h3 className="text-white mb-6">Detection Latency (ms)</h3>
            <ResponsiveContainer width="100%" height={300}>
              <LineChart data={latencyData}>
                <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.1)" />
                <XAxis dataKey="time" stroke="#717182" />
                <YAxis stroke="#717182" />
                <Tooltip
                  contentStyle={{
                    backgroundColor: 'rgba(0,0,0,0.8)',
                    border: '1px solid rgba(255,255,255,0.1)',
                    borderRadius: '12px',
                    color: '#fff'
                  }}
                />
                <Line type="monotone" dataKey="p50" stroke="#10b981" strokeWidth={2} name="p50" />
                <Line type="monotone" dataKey="p95" stroke="#eab308" strokeWidth={2} name="p95" />
                <Line type="monotone" dataKey="p99" stroke="#ef4444" strokeWidth={2} name="p99" />
              </LineChart>
            </ResponsiveContainer>
          </div>

          {/* Threat Type Distribution */}
          <div className="glass-light rounded-2xl p-6">
            <h3 className="text-white mb-6">Threat Type Distribution</h3>
            <ResponsiveContainer width="100%" height={300}>
              <PieChart>
                <Pie
                  data={threatTypeDistribution}
                  cx="50%"
                  cy="50%"
                  innerRadius={60}
                  outerRadius={100}
                  paddingAngle={5}
                  dataKey="value"
                  label={(entry) => `${entry.name} (${entry.value}%)`}
                  labelLine={false}
                >
                  {threatTypeDistribution.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip
                  contentStyle={{
                    backgroundColor: 'rgba(0,0,0,0.8)',
                    border: '1px solid rgba(255,255,255,0.1)',
                    borderRadius: '12px',
                    color: '#fff'
                  }}
                />
              </PieChart>
            </ResponsiveContainer>
          </div>

          {/* ML Model Accuracy */}
          <div className="glass-light rounded-2xl p-6">
            <h3 className="text-white mb-6">ML Model Accuracy</h3>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={mlModelAccuracy}>
                <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.1)" />
                <XAxis dataKey="model" stroke="#717182" />
                <YAxis stroke="#717182" domain={[90, 100]} />
                <Tooltip
                  contentStyle={{
                    backgroundColor: 'rgba(0,0,0,0.8)',
                    border: '1px solid rgba(255,255,255,0.1)',
                    borderRadius: '12px',
                    color: '#fff'
                  }}
                />
                <Bar dataKey="accuracy" fill="url(#barGradient)" radius={[8, 8, 0, 0]} />
                <defs>
                  <linearGradient id="barGradient" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stopColor="#8b5cf6" />
                    <stop offset="100%" stopColor="#ec4899" />
                  </linearGradient>
                </defs>
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Performance Indicators */}
        <div className="glass-light rounded-2xl p-6">
          <h3 className="text-white mb-6">System Health Indicators</h3>
          <div className="space-y-4">
            <div>
              <div className="flex items-center justify-between mb-2">
                <span className="text-sm text-[#717182]">CPU Usage</span>
                <span className="text-white">42%</span>
              </div>
              <div className="h-2 bg-white/10 rounded-full overflow-hidden">
                <div className="h-full bg-gradient-to-r from-blue-500 to-cyan-500" style={{ width: '42%' }} />
              </div>
            </div>
            <div>
              <div className="flex items-center justify-between mb-2">
                <span className="text-sm text-[#717182]">Memory Usage</span>
                <span className="text-white">68%</span>
              </div>
              <div className="h-2 bg-white/10 rounded-full overflow-hidden">
                <div className="h-full bg-gradient-to-r from-purple-500 to-pink-500" style={{ width: '68%' }} />
              </div>
            </div>
            <div>
              <div className="flex items-center justify-between mb-2">
                <span className="text-sm text-[#717182]">Network I/O</span>
                <span className="text-white">35%</span>
              </div>
              <div className="h-2 bg-white/10 rounded-full overflow-hidden">
                <div className="h-full bg-gradient-to-r from-green-500 to-emerald-500" style={{ width: '35%' }} />
              </div>
            </div>
            <div>
              <div className="flex items-center justify-between mb-2">
                <span className="text-sm text-[#717182]">Disk I/O</span>
                <span className="text-white">23%</span>
              </div>
              <div className="h-2 bg-white/10 rounded-full overflow-hidden">
                <div className="h-full bg-gradient-to-r from-yellow-500 to-amber-500" style={{ width: '23%' }} />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}