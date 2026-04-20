import React from 'react';
import { LineChart, Line, AreaChart, Area, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell } from 'recharts';
import { TrendingUp, Droplet, ThermometerSun, Leaf } from 'lucide-react';

export function NimbusPerformanceMetrics() {
  const environmentalData = [
    { time: '00:00', temperature: 21.5, humidity: 70, light: 0, co2: 420 },
    { time: '04:00', temperature: 20.8, humidity: 72, light: 0, co2: 430 },
    { time: '08:00', temperature: 21.2, humidity: 68, light: 8500, co2: 415 },
    { time: '12:00', temperature: 22.8, humidity: 65, light: 15000, co2: 400 },
    { time: '16:00', temperature: 23.5, humidity: 62, light: 12000, co2: 410 },
    { time: '20:00', temperature: 22.1, humidity: 67, light: 5000, co2: 425 },
  ];

  const plantHealthData = [
    { month: 'Month 1', health: 72 },
    { month: 'Month 2', health: 78 },
    { month: 'Month 3', health: 85 },
    { month: 'Month 4', health: 90 },
    { month: 'Month 5', health: 92 },
    { month: 'Month 6', health: 95 },
  ];

  const deviceDistribution = [
    { name: 'NIMBUS HOME', value: 45, color: '#10b981' },
    { name: 'NIMBUS PRO', value: 32, color: '#06b6d4' },
    { name: 'NIMBUS MINI', value: 23, color: '#8b5cf6' },
  ];

  const automationStats = [
    { action: 'Auto-Water', count: 12450 },
    { action: 'Light Adjust', count: 8920 },
    { action: 'Temp Control', count: 6780 },
    { action: 'Humidity', count: 5340 },
    { action: 'Nutrient', count: 3210 },
  ];

  return (
    <div className="min-h-screen relative overflow-hidden">
      <div className="relative z-10 p-8">
        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center gap-3 mb-2">
            <Leaf className="w-8 h-8 text-green-400" />
            <h1 className="text-white">Performance Metrics</h1>
          </div>
          <p className="text-[#717182]">NIMBUS BIOME™ - Environmental Analytics</p>
        </div>

        {/* Key Metrics */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <div className="glass-light glass-hover rounded-2xl p-6">
            <div className="flex items-center justify-between mb-4">
              <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-green-500 to-emerald-500 flex items-center justify-center">
                <Leaf className="w-6 h-6 text-white" />
              </div>
              <div className="text-green-400 text-sm">+2%</div>
            </div>
            <div className="text-3xl text-white mb-1">95%</div>
            <div className="text-sm text-[#717182]">Plant Survival Rate</div>
          </div>

          <div className="glass-light glass-hover rounded-2xl p-6">
            <div className="flex items-center justify-between mb-4">
              <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-orange-500 to-red-500 flex items-center justify-center">
                <ThermometerSun className="w-6 h-6 text-white" />
              </div>
              <div className="text-gray-400 text-sm">±0.3°C</div>
            </div>
            <div className="text-3xl text-white mb-1">22.5°C</div>
            <div className="text-sm text-[#717182]">Avg Temperature</div>
          </div>

          <div className="glass-light glass-hover rounded-2xl p-6">
            <div className="flex items-center justify-between mb-4">
              <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-blue-500 to-cyan-500 flex items-center justify-center">
                <Droplet className="w-6 h-6 text-white" />
              </div>
              <div className="text-green-400 text-sm">+3%</div>
            </div>
            <div className="text-3xl text-white mb-1">68%</div>
            <div className="text-sm text-[#717182]">Avg Humidity</div>
          </div>

          <div className="glass-light glass-hover rounded-2xl p-6">
            <div className="flex items-center justify-between mb-4">
              <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-purple-500 to-pink-500 flex items-center justify-center">
                <TrendingUp className="w-6 h-6 text-white" />
              </div>
              <div className="text-green-400 text-sm">+12%</div>
            </div>
            <div className="text-3xl text-white mb-1">36.7K</div>
            <div className="text-sm text-[#717182]">Automations (24h)</div>
          </div>
        </div>

        {/* Charts Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
          {/* Chart 1 */}
          <div className="glass-light rounded-2xl p-6">
            <h3 className="text-white mb-6">Environmental Conditions (24h)</h3>
            <ResponsiveContainer width="100%" height={300}>
              <LineChart data={environmentalData}>
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
                <Line type="monotone" dataKey="temperature" stroke="#f97316" strokeWidth={2} name="Temp (°C)" />
                <Line type="monotone" dataKey="humidity" stroke="#06b6d4" strokeWidth={2} name="Humidity (%)" />
              </LineChart>
            </ResponsiveContainer>
          </div>

          {/* Chart 2 */}
          <div className="glass-light rounded-2xl p-6">
            <h3 className="text-white mb-6">Plant Health Score Trend</h3>
            <ResponsiveContainer width="100%" height={300}>
              <AreaChart data={plantHealthData}>
                <defs>
                  <linearGradient id="healthGradient" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#10b981" stopOpacity={0.3}/>
                    <stop offset="95%" stopColor="#10b981" stopOpacity={0}/>
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.1)" />
                <XAxis dataKey="month" stroke="#717182" />
                <YAxis stroke="#717182" domain={[60, 100]} />
                <Tooltip
                  contentStyle={{
                    backgroundColor: 'rgba(0,0,0,0.8)',
                    border: '1px solid rgba(255,255,255,0.1)',
                    borderRadius: '12px',
                    color: '#fff'
                  }}
                />
                <Area type="monotone" dataKey="health" stroke="#10b981" fill="url(#healthGradient)" strokeWidth={3} />
              </AreaChart>
            </ResponsiveContainer>
          </div>

          {/* Chart 3 */}
          <div className="glass-light rounded-2xl p-6">
            <h3 className="text-white mb-6">Device Model Distribution</h3>
            <ResponsiveContainer width="100%" height={300}>
              <PieChart>
                <Pie
                  data={deviceDistribution}
                  cx="50%"
                  cy="50%"
                  innerRadius={60}
                  outerRadius={100}
                  paddingAngle={5}
                  dataKey="value"
                  label={(entry) => `${entry.name} (${entry.value}%)`}
                  labelLine={false}
                >
                  {deviceDistribution.map((entry, index) => (
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
            <h3 className="text-white mb-6">Automation Actions (30d)</h3>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={automationStats}>
                <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.1)" />
                <XAxis dataKey="action" stroke="#717182" />
                <YAxis stroke="#717182" />
                <Tooltip
                  contentStyle={{
                    backgroundColor: 'rgba(0,0,0,0.8)',
                    border: '1px solid rgba(255,255,255,0.1)',
                    borderRadius: '12px',
                    color: '#fff'
                  }}
                />
                <Bar dataKey="count" fill="url(#barGradient)" radius={[8, 8, 0, 0]} />
                <defs>
                  <linearGradient id="barGradient" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stopColor="#10b981" />
                    <stop offset="100%" stopColor="#059669" />
                  </linearGradient>
                </defs>
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Performance Indicators */}
        <div className="glass-light rounded-2xl p-6">
          <h3 className="text-white mb-6">System Performance Indicators</h3>
          <div className="space-y-4">
            <div>
              <div className="flex items-center justify-between mb-2">
                <span className="text-sm text-[#717182]">MQTT Message Throughput</span>
                <span className="text-white">92%</span>
              </div>
              <div className="h-2 bg-white/10 rounded-full overflow-hidden">
                <div className="h-full bg-gradient-to-r from-green-500 to-emerald-500" style={{ width: '92%' }} />
              </div>
            </div>
            <div>
              <div className="flex items-center justify-between mb-2">
                <span className="text-sm text-[#717182]">Sensor Reading Accuracy</span>
                <span className="text-white">98%</span>
              </div>
              <div className="h-2 bg-white/10 rounded-full overflow-hidden">
                <div className="h-full bg-gradient-to-r from-blue-500 to-cyan-500" style={{ width: '98%' }} />
              </div>
            </div>
            <div>
              <div className="flex items-center justify-between mb-2">
                <span className="text-sm text-[#717182]">Automation Success Rate</span>
                <span className="text-white">96%</span>
              </div>
              <div className="h-2 bg-white/10 rounded-full overflow-hidden">
                <div className="h-full bg-gradient-to-r from-purple-500 to-pink-500" style={{ width: '96%' }} />
              </div>
            </div>
            <div>
              <div className="flex items-center justify-between mb-2">
                <span className="text-sm text-[#717182]">Cloud Sync Rate</span>
                <span className="text-white">99%</span>
              </div>
              <div className="h-2 bg-white/10 rounded-full overflow-hidden">
                <div className="h-full bg-gradient-to-r from-yellow-500 to-amber-500" style={{ width: '99%' }} />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}