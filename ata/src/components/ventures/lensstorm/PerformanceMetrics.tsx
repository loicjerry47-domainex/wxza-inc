import React from 'react';
import { LineChart, Line, AreaChart, Area, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell } from 'recharts';
import { TrendingUp, Battery, Eye, Zap } from 'lucide-react';

export function LensstormPerformanceMetrics() {
  const batteryData = [
    { hour: '0h', battery: 100, usage: 'standby' },
    { hour: '2h', battery: 92, usage: 'light' },
    { hour: '4h', battery: 83, usage: 'moderate' },
    { hour: '6h', battery: 71, usage: 'heavy' },
    { hour: '8h', battery: 58, usage: 'heavy' },
    { hour: '10h', battery: 42, usage: 'moderate' },
    { hour: '12h', battery: 28, usage: 'light' },
  ];

  const latencyData = [
    { model: 'Translation', latency: 6.2 },
    { model: 'Navigation', latency: 5.8 },
    { model: 'Object Detect', latency: 8.7 },
    { model: 'Text OCR', latency: 12.3 },
    { model: 'Face Blur', latency: 4.5 },
    { model: 'Voice CMD', latency: 7.1 },
  ];

  const featureUsage = [
    { name: 'Live Translation', value: 32, color: '#06b6d4' },
    { name: 'Navigation AR', value: 28, color: '#8b5cf6' },
    { name: 'Smart Notifications', value: 22, color: '#10b981' },
    { name: 'Object Recognition', value: 12, color: '#eab308' },
    { name: 'Fitness Tracking', value: 6, color: '#f97316' },
  ];

  const sessionData = [
    { day: 'Mon', sessions: 28, avgDuration: 42 },
    { day: 'Tue', sessions: 35, avgDuration: 38 },
    { day: 'Wed', sessions: 31, avgDuration: 45 },
    { day: 'Thu', sessions: 42, avgDuration: 51 },
    { day: 'Fri', sessions: 38, avgDuration: 48 },
    { day: 'Sat', sessions: 29, avgDuration: 62 },
    { day: 'Sun', sessions: 24, avgDuration: 58 },
  ];

  return (
    <div className="min-h-screen relative overflow-hidden">
      <div className="relative z-10 p-8">
        <div className="mb-8">
          <div className="flex items-center gap-3 mb-2">
            <Eye className="w-8 h-8 text-cyan-400" />
            <h1 className="text-white">Performance Metrics</h1>
          </div>
          <p className="text-[#717182]">LENSSTORM - Device & AI Analytics</p>
        </div>

        {/* Key Metrics */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <div className="glass-light glass-hover rounded-2xl p-6">
            <div className="flex items-center justify-between mb-4">
              <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-green-500 to-emerald-500 flex items-center justify-center">
                <Battery className="w-6 h-6 text-white" />
              </div>
              <div className="text-green-400 text-sm">+0.5h</div>
            </div>
            <div className="text-3xl text-white mb-1">12.3hrs</div>
            <div className="text-sm text-[#717182]">Avg Battery Life</div>
          </div>

          <div className="glass-light glass-hover rounded-2xl p-6">
            <div className="flex items-center justify-between mb-4">
              <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-cyan-500 to-blue-500 flex items-center justify-center">
                <Zap className="w-6 h-6 text-white" />
              </div>
              <div className="text-green-400 text-sm">-2ms</div>
            </div>
            <div className="text-3xl text-white mb-1">8.7ms</div>
            <div className="text-sm text-[#717182]">AI Model Latency</div>
          </div>

          <div className="glass-light glass-hover rounded-2xl p-6">
            <div className="flex items-center justify-between mb-4">
              <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-purple-500 to-pink-500 flex items-center justify-center">
                <TrendingUp className="w-6 h-6 text-white" />
              </div>
              <div className="text-green-400 text-sm">+8%</div>
            </div>
            <div className="text-3xl text-white mb-1">234K</div>
            <div className="text-sm text-[#717182]">Sessions (24h)</div>
          </div>

          <div className="glass-light glass-hover rounded-2xl p-6">
            <div className="flex items-center justify-between mb-4">
              <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-yellow-500 to-amber-500 flex items-center justify-center">
                <Eye className="w-6 h-6 text-white" />
              </div>
              <div className="text-white text-sm">96%</div>
            </div>
            <div className="text-3xl text-white mb-1">94%</div>
            <div className="text-sm text-[#717182]">Object Detection Accuracy</div>
          </div>
        </div>

        {/* Charts Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
          {/* Chart 1 */}
          <div className="glass-light rounded-2xl p-6">
            <h3 className="text-white mb-6">Battery Drain Profile</h3>
            <ResponsiveContainer width="100%" height={300}>
              <AreaChart data={batteryData}>
                <defs>
                  <linearGradient id="batteryGradient" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#10b981" stopOpacity={0.3}/>
                    <stop offset="95%" stopColor="#10b981" stopOpacity={0}/>
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.1)" />
                <XAxis dataKey="hour" stroke="#717182" />
                <YAxis stroke="#717182" domain={[0, 100]} />
                <Tooltip
                  contentStyle={{
                    backgroundColor: 'rgba(0,0,0,0.8)',
                    border: '1px solid rgba(255,255,255,0.1)',
                    borderRadius: '12px',
                    color: '#fff'
                  }}
                />
                <Area type="monotone" dataKey="battery" stroke="#10b981" fill="url(#batteryGradient)" strokeWidth={3} />
              </AreaChart>
            </ResponsiveContainer>
          </div>

          {/* Chart 2 */}
          <div className="glass-light rounded-2xl p-6">
            <h3 className="text-white mb-6">AI Model Latency (ms)</h3>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={latencyData} layout="horizontal">
                <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.1)" />
                <XAxis type="number" stroke="#717182" />
                <YAxis dataKey="model" type="category" stroke="#717182" width={100} />
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
                    <stop offset="0%" stopColor="#06b6d4" />
                    <stop offset="100%" stopColor="#8b5cf6" />
                  </linearGradient>
                </defs>
              </BarChart>
            </ResponsiveContainer>
          </div>

          {/* Chart 3 */}
          <div className="glass-light rounded-2xl p-6">
            <h3 className="text-white mb-6">Feature Usage Distribution</h3>
            <ResponsiveContainer width="100%" height={300}>
              <PieChart>
                <Pie
                  data={featureUsage}
                  cx="50%"
                  cy="50%"
                  innerRadius={60}
                  outerRadius={100}
                  paddingAngle={5}
                  dataKey="value"
                  label={(entry) => `${entry.name} (${entry.value}%)`}
                  labelLine={false}
                >
                  {featureUsage.map((entry, index) => (
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

          {/* Chart 4 */}
          <div className="glass-light rounded-2xl p-6">
            <h3 className="text-white mb-6">Weekly Session Analytics</h3>
            <ResponsiveContainer width="100%" height={300}>
              <LineChart data={sessionData}>
                <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.1)" />
                <XAxis dataKey="day" stroke="#717182" />
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
                <Line yAxisId="left" type="monotone" dataKey="sessions" stroke="#06b6d4" strokeWidth={2} name="Sessions" />
                <Line yAxisId="right" type="monotone" dataKey="avgDuration" stroke="#eab308" strokeWidth={2} name="Avg Duration (min)" />
              </LineChart>
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
                <span className="text-white">87%</span>
              </div>
              <div className="h-2 bg-white/10 rounded-full overflow-hidden">
                <div className="h-full bg-gradient-to-r from-cyan-500 to-blue-500" style={{ width: '87%' }} />
              </div>
            </div>
            <div>
              <div className="flex items-center justify-between mb-2">
                <span className="text-sm text-[#717182]">Camera Frame Processing Rate</span>
                <span className="text-white">60 FPS</span>
              </div>
              <div className="h-2 bg-white/10 rounded-full overflow-hidden">
                <div className="h-full bg-gradient-to-r from-purple-500 to-pink-500" style={{ width: '100%' }} />
              </div>
            </div>
            <div>
              <div className="flex items-center justify-between mb-2">
                <span className="text-sm text-[#717182]">Privacy Hardware Reliability</span>
                <span className="text-white">99.98%</span>
              </div>
              <div className="h-2 bg-white/10 rounded-full overflow-hidden">
                <div className="h-full bg-gradient-to-r from-green-500 to-emerald-500" style={{ width: '99.98%' }} />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}