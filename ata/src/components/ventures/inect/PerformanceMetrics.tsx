import React from 'react';
import { LineChart, Line, AreaChart, Area, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { TrendingUp, Users, Wifi, Video } from 'lucide-react';

export function InectPerformanceMetrics() {
  const viewerData = [
    { time: '10:00', viewers: 12000, bandwidth: 145 },
    { time: '10:15', viewers: 28000, bandwidth: 340 },
    { time: '10:30', viewers: 45000, bandwidth: 550 },
    { time: '10:45', viewers: 67000, bandwidth: 820 },
    { time: '11:00', viewers: 89000, bandwidth: 1100 },
    { time: '11:15', viewers: 124000, bandwidth: 1520 },
  ];

  const qualityData = [
    { quality: '4K', viewers: 28 },
    { quality: '1080p', viewers: 45 },
    { quality: '720p', viewers: 22 },
    { quality: '360p', viewers: 5 },
  ];

  const latencyData = [
    { region: 'NA', latency: 650 },
    { region: 'EU', latency: 720 },
    { region: 'APAC', latency: 890 },
    { region: 'LATAM', latency: 980 },
    { region: 'MEA', latency: 1050 },
  ];

  const aiSwitchData = [
    { hour: '10:00', switches: 45, accuracy: 85 },
    { hour: '11:00', switches: 52, accuracy: 87 },
    { hour: '12:00', switches: 48, accuracy: 89 },
    { hour: '13:00', switches: 61, accuracy: 87 },
    { hour: '14:00', switches: 58, accuracy: 91 },
  ];

  return (
    <div className="min-h-screen relative overflow-hidden">
      <div className="relative z-10 p-8">
        <div className="mb-8">
          <div className="flex items-center gap-3 mb-2">
            <Video className="w-8 h-8 text-red-400" />
            <h1 className="text-white">Performance Metrics</h1>
          </div>
          <p className="text-[#717182]">INECT - Live Streaming Analytics</p>
        </div>

        {/* Key Metrics */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <div className="glass-light glass-hover rounded-2xl p-6">
            <div className="flex items-center justify-between mb-4">
              <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-red-500 to-orange-500 flex items-center justify-center">
                <Users className="w-6 h-6 text-white" />
              </div>
              <div className="text-green-400 text-sm">Peak: 1.2M</div>
            </div>
            <div className="text-3xl text-white mb-1">892K</div>
            <div className="text-sm text-[#717182]">Concurrent Viewers</div>
          </div>

          <div className="glass-light glass-hover rounded-2xl p-6">
            <div className="flex items-center justify-between mb-4">
              <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-blue-500 to-cyan-500 flex items-center justify-center">
                <Wifi className="w-6 h-6 text-white" />
              </div>
              <div className="text-green-400 text-sm">-0.2s</div>
            </div>
            <div className="text-3xl text-white mb-1">0.8s</div>
            <div className="text-sm text-[#717182]">Avg Latency</div>
          </div>

          <div className="glass-light glass-hover rounded-2xl p-6">
            <div className="flex items-center justify-between mb-4">
              <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-purple-500 to-pink-500 flex items-center justify-center">
                <TrendingUp className="w-6 h-6 text-white" />
              </div>
              <div className="text-white text-sm">87% acc</div>
            </div>
            <div className="text-3xl text-white mb-1">45.2K</div>
            <div className="text-sm text-[#717182]">AI Camera Switches</div>
          </div>

          <div className="glass-light glass-hover rounded-2xl p-6">
            <div className="flex items-center justify-between mb-4">
              <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-green-500 to-emerald-500 flex items-center justify-center">
                <Video className="w-6 h-6 text-white" />
              </div>
              <div className="text-white text-sm">4K/60fps</div>
            </div>
            <div className="text-3xl text-white mb-1">12Mbps</div>
            <div className="text-sm text-[#717182]">Avg Bitrate</div>
          </div>
        </div>

        {/* Charts Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
          {/* Chart 1 */}
          <div className="glass-light rounded-2xl p-6">
            <h3 className="text-white mb-6">Viewer Growth & Bandwidth</h3>
            <ResponsiveContainer width="100%" height={300}>
              <AreaChart data={viewerData}>
                <defs>
                  <linearGradient id="viewerGradient" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#ef4444" stopOpacity={0.3}/>
                    <stop offset="95%" stopColor="#ef4444" stopOpacity={0}/>
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.1)" />
                <XAxis dataKey="time" stroke="#717182" />
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
                <Area yAxisId="left" type="monotone" dataKey="viewers" stroke="#ef4444" fill="url(#viewerGradient)" strokeWidth={3} />
                <Line yAxisId="right" type="monotone" dataKey="bandwidth" stroke="#06b6d4" strokeWidth={2} name="Bandwidth (Gbps)" />
              </AreaChart>
            </ResponsiveContainer>
          </div>

          {/* Chart 2 */}
          <div className="glass-light rounded-2xl p-6">
            <h3 className="text-white mb-6">Stream Quality Distribution</h3>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={qualityData}>
                <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.1)" />
                <XAxis dataKey="quality" stroke="#717182" />
                <YAxis stroke="#717182" />
                <Tooltip
                  contentStyle={{
                    backgroundColor: 'rgba(0,0,0,0.8)',
                    border: '1px solid rgba(255,255,255,0.1)',
                    borderRadius: '12px',
                    color: '#fff'
                  }}
                />
                <Bar dataKey="viewers" fill="url(#qualityGradient)" radius={[8, 8, 0, 0]} />
                <defs>
                  <linearGradient id="qualityGradient" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stopColor="#8b5cf6" />
                    <stop offset="100%" stopColor="#ec4899" />
                  </linearGradient>
                </defs>
              </BarChart>
            </ResponsiveContainer>
          </div>

          {/* Chart 3 */}
          <div className="glass-light rounded-2xl p-6">
            <h3 className="text-white mb-6">Regional Latency (ms)</h3>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={latencyData} layout="horizontal">
                <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.1)" />
                <XAxis type="number" stroke="#717182" />
                <YAxis dataKey="region" type="category" stroke="#717182" width={60} />
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

          {/* Chart 4 */}
          <div className="glass-light rounded-2xl p-6">
            <h3 className="text-white mb-6">AI Director Performance</h3>
            <ResponsiveContainer width="100%" height={300}>
              <LineChart data={aiSwitchData}>
                <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.1)" />
                <XAxis dataKey="hour" stroke="#717182" />
                <YAxis yAxisId="left" stroke="#717182" />
                <YAxis yAxisId="right" orientation="right" stroke="#717182" domain={[80, 100]} />
                <Tooltip
                  contentStyle={{
                    backgroundColor: 'rgba(0,0,0,0.8)',
                    border: '1px solid rgba(255,255,255,0.1)',
                    borderRadius: '12px',
                    color: '#fff'
                  }}
                />
                <Line yAxisId="left" type="monotone" dataKey="switches" stroke="#8b5cf6" strokeWidth={2} name="Switches" />
                <Line yAxisId="right" type="monotone" dataKey="accuracy" stroke="#10b981" strokeWidth={2} name="Accuracy (%)" />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Performance Indicators */}
        <div className="glass-light rounded-2xl p-6">
          <h3 className="text-white mb-6">Platform Health</h3>
          <div className="space-y-4">
            <div>
              <div className="flex items-center justify-between mb-2">
                <span className="text-sm text-[#717182]">CDN Delivery Success Rate</span>
                <span className="text-white">99.96%</span>
              </div>
              <div className="h-2 bg-white/10 rounded-full overflow-hidden">
                <div className="h-full bg-gradient-to-r from-red-500 to-orange-500" style={{ width: '99.96%' }} />
              </div>
            </div>
            <div>
              <div className="flex items-center justify-between mb-2">
                <span className="text-sm text-[#717182]">Transcoding Pipeline Utilization</span>
                <span className="text-white">78%</span>
              </div>
              <div className="h-2 bg-white/10 rounded-full overflow-hidden">
                <div className="h-full bg-gradient-to-r from-blue-500 to-cyan-500" style={{ width: '78%' }} />
              </div>
            </div>
            <div>
              <div className="flex items-center justify-between mb-2">
                <span className="text-sm text-[#717182]">Viewer Retention Rate</span>
                <span className="text-white">84%</span>
              </div>
              <div className="h-2 bg-white/10 rounded-full overflow-hidden">
                <div className="h-full bg-gradient-to-r from-purple-500 to-pink-500" style={{ width: '84%' }} />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}