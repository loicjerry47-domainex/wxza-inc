import React from 'react';
import { LineChart, Line, BarChart, Bar, AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { Sun, Flower2, TrendingUp, Battery } from 'lucide-react';

export function HfloPerformanceMetrics() {
  const solarData = [
    { month: 'Jun', output: 11.2, efficiency: 29 },
    { month: 'Jul', output: 12.5, efficiency: 30 },
    { month: 'Aug', output: 12.1, efficiency: 29.5 },
    { month: 'Sep', output: 10.8, efficiency: 29 },
    { month: 'Oct', output: 9.5, efficiency: 28.5 },
    { month: 'Nov', output: 8.2, efficiency: 28 },
  ];

  const speciesPopularity = [
    { species: 'Cherry Blossom', downloads: 8923 },
    { species: 'Rose', downloads: 7245 },
    { species: 'Orchid', downloads: 6892 },
    { species: 'Tulip', downloads: 5634 },
    { species: 'Sunflower', downloads: 4821 },
  ];

  const uptimeData = [
    { week: 'Week 1', uptime: 99.7 },
    { week: 'Week 2', uptime: 99.9 },
    { week: 'Week 3', uptime: 99.8 },
    { week: 'Week 4', uptime: 100 },
  ];

  return (
    <div className="min-h-screen relative overflow-hidden">
      <div className="relative z-10 p-8">
        <div className="mb-8">
          <div className="flex items-center gap-3 mb-2">
            <Flower2 className="w-8 h-8 text-pink-400" />
            <h1 className="text-white">Performance Metrics</h1>
          </div>
          <p className="text-[#717182]">HFLO - Solar & Display Analytics</p>
        </div>

        {/* Key Metrics */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <div className="glass-light glass-hover rounded-2xl p-6">
            <div className="flex items-center justify-between mb-4">
              <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-yellow-500 to-amber-500 flex items-center justify-center">
                <Sun className="w-6 h-6 text-white" />
              </div>
              <div className="text-white text-sm">Quantum dots</div>
            </div>
            <div className="text-3xl text-white mb-1">30%</div>
            <div className="text-sm text-[#717182]">Solar Efficiency</div>
          </div>

          <div className="glass-light glass-hover rounded-2xl p-6">
            <div className="flex items-center justify-between mb-4">
              <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-pink-500 to-rose-500 flex items-center justify-center">
                <Flower2 className="w-6 h-6 text-white" />
              </div>
              <div className="text-green-400 text-sm">+42 new</div>
            </div>
            <div className="text-3xl text-white mb-1">1,247</div>
            <div className="text-sm text-[#717182]">Species Library</div>
          </div>

          <div className="glass-light glass-hover rounded-2xl p-6">
            <div className="flex items-center justify-between mb-4">
              <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-green-500 to-emerald-500 flex items-center justify-center">
                <TrendingUp className="w-6 h-6 text-white" />
              </div>
              <div className="text-green-400 text-sm">+8%</div>
            </div>
            <div className="text-3xl text-white mb-1">12.4K</div>
            <div className="text-sm text-[#717182]">Units Deployed</div>
          </div>

          <div className="glass-light glass-hover rounded-2xl p-6">
            <div className="flex items-center justify-between mb-4">
              <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-blue-500 to-cyan-500 flex items-center justify-center">
                <Battery className="w-6 h-6 text-white" />
              </div>
              <div className="text-white text-sm">Zero maintenance</div>
            </div>
            <div className="text-3xl text-white mb-1">15 yrs</div>
            <div className="text-sm text-[#717182]">Avg Lifespan</div>
          </div>
        </div>

        {/* Charts Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
          {/* Chart 1 */}
          <div className="glass-light rounded-2xl p-6">
            <h3 className="text-white mb-6">Solar Output & Efficiency</h3>
            <ResponsiveContainer width="100%" height={300}>
              <LineChart data={solarData}>
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
                <Line yAxisId="left" type="monotone" dataKey="output" stroke="#eab308" strokeWidth={3} name="Output (W)" />
                <Line yAxisId="right" type="monotone" dataKey="efficiency" stroke="#f97316" strokeWidth={2} name="Efficiency (%)" />
              </LineChart>
            </ResponsiveContainer>
          </div>

          {/* Chart 2 */}
          <div className="glass-light rounded-2xl p-6">
            <h3 className="text-white mb-6">Popular Species (Downloads)</h3>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={speciesPopularity}>
                <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.1)" />
                <XAxis dataKey="species" stroke="#717182" angle={-15} textAnchor="end" height={80} />
                <YAxis stroke="#717182" />
                <Tooltip
                  contentStyle={{
                    backgroundColor: 'rgba(0,0,0,0.8)',
                    border: '1px solid rgba(255,255,255,0.1)',
                    borderRadius: '12px',
                    color: '#fff'
                  }}
                />
                <Bar dataKey="downloads" fill="url(#speciesGradient)" radius={[8, 8, 0, 0]} />
                <defs>
                  <linearGradient id="speciesGradient" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stopColor="#ec4899" />
                    <stop offset="100%" stopColor="#f43f5e" />
                  </linearGradient>
                </defs>
              </BarChart>
            </ResponsiveContainer>
          </div>

          {/* Chart 3 */}
          <div className="lg:col-span-2 glass-light rounded-2xl p-6">
            <h3 className="text-white mb-6">System Uptime (%)</h3>
            <ResponsiveContainer width="100%" height={250}>
              <AreaChart data={uptimeData}>
                <defs>
                  <linearGradient id="uptimeGradient" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#10b981" stopOpacity={0.3}/>
                    <stop offset="95%" stopColor="#10b981" stopOpacity={0}/>
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.1)" />
                <XAxis dataKey="week" stroke="#717182" />
                <YAxis stroke="#717182" domain={[99, 100]} />
                <Tooltip
                  contentStyle={{
                    backgroundColor: 'rgba(0,0,0,0.8)',
                    border: '1px solid rgba(255,255,255,0.1)',
                    borderRadius: '12px',
                    color: '#fff'
                  }}
                />
                <Area type="monotone" dataKey="uptime" stroke="#10b981" fill="url(#uptimeGradient)" strokeWidth={3} />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Performance Indicators */}
        <div className="glass-light rounded-2xl p-6">
          <h3 className="text-white mb-6">System Health</h3>
          <div className="space-y-4">
            <div>
              <div className="flex items-center justify-between mb-2">
                <span className="text-sm text-[#717182]">Hologram Display Quality</span>
                <span className="text-white">4K/60fps</span>
              </div>
              <div className="h-2 bg-white/10 rounded-full overflow-hidden">
                <div className="h-full bg-gradient-to-r from-pink-500 to-rose-500" style={{ width: '100%' }} />
              </div>
            </div>
            <div>
              <div className="flex items-center justify-between mb-2">
                <span className="text-sm text-[#717182]">Energy Self-Sufficiency</span>
                <span className="text-white">100%</span>
              </div>
              <div className="h-2 bg-white/10 rounded-full overflow-hidden">
                <div className="h-full bg-gradient-to-r from-yellow-500 to-amber-500" style={{ width: '100%' }} />
              </div>
            </div>
            <div>
              <div className="flex items-center justify-between mb-2">
                <span className="text-sm text-[#717182]">Customer Satisfaction</span>
                <span className="text-white">98%</span>
              </div>
              <div className="h-2 bg-white/10 rounded-full overflow-hidden">
                <div className="h-full bg-gradient-to-r from-green-500 to-emerald-500" style={{ width: '98%' }} />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}