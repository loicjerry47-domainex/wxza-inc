import React from 'react';
import { LineChart, Line, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, RadarChart, PolarGrid, PolarAngleAxis, PolarRadiusAxis, Radar } from 'recharts';
import { TrendingUp, Users, Zap, Heart } from 'lucide-react';

export function HearbPerformanceMetrics() {
  const usageData = [
    { month: 'Jun', users: 82000, sessions: 420000 },
    { month: 'Jul', users: 95000, sessions: 510000 },
    { month: 'Aug', users: 107000, sessions: 590000 },
    { month: 'Sep', users: 115000, sessions: 640000 },
    { month: 'Oct', users: 120000, sessions: 680000 },
    { month: 'Nov', users: 124000, sessions: 720000 },
  ];

  const featureAccuracy = [
    { feature: 'Speech-to-Text', accuracy: 97 },
    { feature: 'Object Detection', accuracy: 96 },
    { feature: 'Voice Commands', accuracy: 94 },
    { feature: 'Live Captions', accuracy: 98 },
    { feature: 'Navigation', accuracy: 95 },
    { feature: 'Emergency Alert', accuracy: 99 },
  ];

  const languageUsage = [
    { language: 'English', users: 45 },
    { language: 'Spanish', users: 18 },
    { language: 'Mandarin', users: 12 },
    { language: 'French', users: 8 },
    { language: 'German', users: 6 },
    { language: 'Others', users: 11 },
  ];

  const latencyData = [
    { feature: 'STT', latency: 187 },
    { feature: 'Object Detect', latency: 142 },
    { feature: 'Voice Cmd', latency: 95 },
    { feature: 'Translation', latency: 165 },
    { feature: 'Navigation', latency: 120 },
  ];

  return (
    <div className="min-h-screen relative overflow-hidden">
      <div className="relative z-10 p-8">
        <div className="mb-8">
          <div className="flex items-center gap-3 mb-2">
            <Heart className="w-8 h-8 text-blue-400" />
            <h1 className="text-white">Performance Metrics</h1>
          </div>
          <p className="text-[#717182]">HEARb ASSIST - Accessibility Analytics</p>
        </div>

        {/* Key Metrics */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <div className="glass-light glass-hover rounded-2xl p-6">
            <div className="flex items-center justify-between mb-4">
              <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-blue-500 to-cyan-500 flex items-center justify-center">
                <Users className="w-6 h-6 text-white" />
              </div>
              <div className="text-green-400 text-sm">+14%</div>
            </div>
            <div className="text-3xl text-white mb-1">124K</div>
            <div className="text-sm text-[#717182]">Active Users</div>
          </div>

          <div className="glass-light glass-hover rounded-2xl p-6">
            <div className="flex items-center justify-between mb-4">
              <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-purple-500 to-pink-500 flex items-center justify-center">
                <Zap className="w-6 h-6 text-white" />
              </div>
              <div className="text-white text-sm">97% acc</div>
            </div>
            <div className="text-3xl text-white mb-1">&lt;200ms</div>
            <div className="text-sm text-[#717182]">Avg STT Latency</div>
          </div>

          <div className="glass-light glass-hover rounded-2xl p-6">
            <div className="flex items-center justify-between mb-4">
              <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-green-500 to-emerald-500 flex items-center justify-center">
                <TrendingUp className="w-6 h-6 text-white" />
              </div>
              <div className="text-green-400 text-sm">+18%</div>
            </div>
            <div className="text-3xl text-white mb-1">720K</div>
            <div className="text-sm text-[#717182]">Sessions (Monthly)</div>
          </div>

          <div className="glass-light glass-hover rounded-2xl p-6">
            <div className="flex items-center justify-between mb-4">
              <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-yellow-500 to-amber-500 flex items-center justify-center">
                <Heart className="w-6 h-6 text-white" />
              </div>
              <div className="text-white text-sm">+0.8h</div>
            </div>
            <div className="text-3xl text-white mb-1">6.2hrs</div>
            <div className="text-sm text-[#717182]">Avg Session Duration</div>
          </div>
        </div>

        {/* Charts Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
          {/* Chart 1 */}
          <div className="glass-light rounded-2xl p-6">
            <h3 className="text-white mb-6">User & Session Growth</h3>
            <ResponsiveContainer width="100%" height={300}>
              <LineChart data={usageData}>
                <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.1)" />
                <XAxis dataKey="month" stroke="#717182" />
                <YAxis yAxisId="left" stroke="#717182" />
                <YAxis yAxisId="right" orientation="right" stroke="#717182" />
                <Tooltip
                  contentStyle={{
                    backgroundColor: 'rgba(0,0,0,0.8)',
                    border: '1px solid rgba(255,255,255,0.1)',
                    borderRadius: '12px',
                    color: '#fff'
                  }}
                />
                <Line yAxisId="left" type="monotone" dataKey="users" stroke="#3b82f6" strokeWidth={3} name="Users" />
                <Line yAxisId="right" type="monotone" dataKey="sessions" stroke="#8b5cf6" strokeWidth={2} name="Sessions" />
              </LineChart>
            </ResponsiveContainer>
          </div>

          {/* Chart 2 */}
          <div className="glass-light rounded-2xl p-6">
            <h3 className="text-white mb-6">Feature Accuracy (%)</h3>
            <ResponsiveContainer width="100%" height={300}>
              <RadarChart data={featureAccuracy}>
                <PolarGrid stroke="rgba(255,255,255,0.2)" />
                <PolarAngleAxis dataKey="feature" stroke="#717182" />
                <PolarRadiusAxis angle={90} domain={[90, 100]} stroke="#717182" />
                <Radar name="Accuracy" dataKey="accuracy" stroke="#10b981" fill="#10b981" fillOpacity={0.3} strokeWidth={2} />
                <Tooltip
                  contentStyle={{
                    backgroundColor: 'rgba(0,0,0,0.8)',
                    border: '1px solid rgba(255,255,255,0.1)',
                    borderRadius: '12px',
                    color: '#fff'
                  }}
                />
              </RadarChart>
            </ResponsiveContainer>
          </div>

          {/* Chart 3 */}
          <div className="glass-light rounded-2xl p-6">
            <h3 className="text-white mb-6">Language Distribution (%)</h3>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={languageUsage}>
                <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.1)" />
                <XAxis dataKey="language" stroke="#717182" />
                <YAxis stroke="#717182" />
                <Tooltip
                  contentStyle={{
                    backgroundColor: 'rgba(0,0,0,0.8)',
                    border: '1px solid rgba(255,255,255,0.1)',
                    borderRadius: '12px',
                    color: '#fff'
                  }}
                />
                <Bar dataKey="users" fill="url(#langGradient)" radius={[8, 8, 0, 0]} />
                <defs>
                  <linearGradient id="langGradient" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stopColor="#3b82f6" />
                    <stop offset="100%" stopColor="#8b5cf6" />
                  </linearGradient>
                </defs>
              </BarChart>
            </ResponsiveContainer>
          </div>

          {/* Chart 4 */}
          <div className="glass-light rounded-2xl p-6">
            <h3 className="text-white mb-6">Feature Latency (ms)</h3>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={latencyData} layout="horizontal">
                <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.1)" />
                <XAxis type="number" stroke="#717182" domain={[0, 200]} />
                <YAxis dataKey="feature" type="category" stroke="#717182" width={100} />
                <Tooltip
                  contentStyle={{
                    backgroundColor: 'rgba(0,0,0,0.8)',
                    border: '1px solid rgba(255,255,255,0.1)',
                    borderRadius: '12px',
                    color: '#fff'
                  }}
                />
                <Bar dataKey="latency" fill="url(#latencyGradient)" radius={[0, 8, 8, 0]} />
                <defs>
                  <linearGradient id="latencyGradient" x1="0" y1="0" x2="1" y2="0">
                    <stop offset="0%" stopColor="#10b981" />
                    <stop offset="100%" stopColor="#eab308" />
                  </linearGradient>
                </defs>
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Performance Indicators */}
        <div className="glass-light rounded-2xl p-6">
          <h3 className="text-white mb-6">System Performance</h3>
          <div className="space-y-4">
            <div>
              <div className="flex items-center justify-between mb-2">
                <span className="text-sm text-[#717182]">On-Device AI Utilization</span>
                <span className="text-white">92%</span>
              </div>
              <div className="h-2 bg-white/10 rounded-full overflow-hidden">
                <div className="h-full bg-gradient-to-r from-blue-500 to-cyan-500" style={{ width: '92%' }} />
              </div>
            </div>
            <div>
              <div className="flex items-center justify-between mb-2">
                <span className="text-sm text-[#717182]">HIPAA Compliance Score</span>
                <span className="text-white">100%</span>
              </div>
              <div className="h-2 bg-white/10 rounded-full overflow-hidden">
                <div className="h-full bg-gradient-to-r from-green-500 to-emerald-500" style={{ width: '100%' }} />
              </div>
            </div>
            <div>
              <div className="flex items-center justify-between mb-2">
                <span className="text-sm text-[#717182]">User Satisfaction</span>
                <span className="text-white">96%</span>
              </div>
              <div className="h-2 bg-white/10 rounded-full overflow-hidden">
                <div className="h-full bg-gradient-to-r from-purple-500 to-pink-500" style={{ width: '96%' }} />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}