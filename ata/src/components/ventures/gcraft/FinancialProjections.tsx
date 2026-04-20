import React from 'react';
import { LineChart, Line, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { DollarSign, TrendingUp, Users, Target } from 'lucide-react';

export function GcraftFinancialProjections() {
  const revenueData = [
    { year: 'Year 1', revenue: 18, costs: 12, profit: 6 },
    { year: 'Year 2', revenue: 58, costs: 32, profit: 26 },
    { year: 'Year 3', revenue: 145, costs: 65, profit: 80 },
    { year: 'Year 4', revenue: 265, costs: 98, profit: 167 },
    { year: 'Year 5', revenue: 420, costs: 135, profit: 285 },
  ];

  const gmvGrowth = [
    { year: 'Year 1', gmv: 128 },
    { year: 'Year 2', gmv: 415 },
    { year: 'Year 3', gmv: 1035 },
    { year: 'Year 4', gmv: 1890 },
    { year: 'Year 5', gmv: 3000 },
  ];

  const metrics = [
    { label: 'Year 3 Revenue', value: '$145M', icon: DollarSign, color: 'from-green-500 to-emerald-500' },
    { label: 'Gross Margin', value: '55%', icon: TrendingUp, color: 'from-blue-500 to-cyan-500' },
    { label: 'Active Users', value: '2.1M', icon: Users, color: 'from-purple-500 to-pink-500' },
    { label: 'Market Share', value: '8.2%', icon: Target, color: 'from-yellow-500 to-amber-500' },
  ];

  return (
    <div className="min-h-screen relative overflow-hidden">
      <div className="relative z-10 p-8">
        <div className="mb-8">
          <div className="flex items-center gap-3 mb-2">
            <DollarSign className="w-8 h-8 text-green-400" />
            <h1 className="text-white">Financial Projections</h1>
          </div>
          <p className="text-[#717182]">5-Year Revenue & Growth Forecast</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          {metrics.map((metric, index) => {
            const Icon = metric.icon;
            return (
              <div key={index} className="glass-light liquid-border rounded-2xl p-6">
                <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${metric.color} flex items-center justify-center mb-4`}>
                  <Icon className="w-6 h-6 text-white" />
                </div>
                <div className="text-3xl text-white mb-1">{metric.value}</div>
                <div className="text-sm text-[#717182]">{metric.label}</div>
              </div>
            );
          })}
        </div>

        <div className="glass-light liquid-border rounded-2xl p-6 mb-8">
          <h3 className="text-white mb-6">Revenue Projection (Millions USD)</h3>
          <ResponsiveContainer width="100%" height={350}>
            <BarChart data={revenueData}>
              <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.1)" />
              <XAxis dataKey="year" stroke="#717182" />
              <YAxis stroke="#717182" />
              <Tooltip
                contentStyle={{
                  backgroundColor: 'rgba(0,0,0,0.8)',
                  border: '1px solid rgba(255,255,255,0.1)',
                  borderRadius: '12px',
                  color: '#fff'
                }}
              />
              <Bar dataKey="revenue" fill="url(#revenueGradient)" radius={[8, 8, 0, 0]} />
              <Bar dataKey="costs" fill="url(#costsGradient)" radius={[8, 8, 0, 0]} />
              <Bar dataKey="profit" fill="url(#profitGradient)" radius={[8, 8, 0, 0]} />
              <defs>
                <linearGradient id="revenueGradient" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor="#10b981" />
                  <stop offset="100%" stopColor="#059669" />
                </linearGradient>
                <linearGradient id="costsGradient" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor="#ef4444" />
                  <stop offset="100%" stopColor="#dc2626" />
                </linearGradient>
                <linearGradient id="profitGradient" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor="#3b82f6" />
                  <stop offset="100%" stopColor="#2563eb" />
                </linearGradient>
              </defs>
            </BarChart>
          </ResponsiveContainer>
        </div>

        <div className="glass-light liquid-border rounded-2xl p-6 mb-8">
          <h3 className="text-white mb-6">GMV Growth (Millions USD)</h3>
          <ResponsiveContainer width="100%" height={300}>
            <LineChart data={gmvGrowth}>
              <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.1)" />
              <XAxis dataKey="year" stroke="#717182" />
              <YAxis stroke="#717182" />
              <Tooltip
                contentStyle={{
                  backgroundColor: 'rgba(0,0,0,0.8)',
                  border: '1px solid rgba(255,255,255,0.1)',
                  borderRadius: '12px',
                  color: '#fff'
                }}
              />
              <Line type="monotone" dataKey="gmv" stroke="#10b981" strokeWidth={3} dot={{ r: 6, fill: '#10b981' }} />
            </LineChart>
          </ResponsiveContainer>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="glass-light liquid-border rounded-2xl p-6">
            <h4 className="text-white mb-4">Revenue Model</h4>
            <div className="space-y-3">
              <div className="flex justify-between">
                <span className="text-[#717182] text-sm">Platform Fee (14%)</span>
                <span className="text-white">$145M</span>
              </div>
              <div className="flex justify-between">
                <span className="text-[#717182] text-sm">GMV (Year 3)</span>
                <span className="text-white">$1.035B</span>
              </div>
              <div className="flex justify-between">
                <span className="text-[#717182] text-sm">Avg Transaction</span>
                <span className="text-white">$87</span>
              </div>
              <div className="flex justify-between border-t border-white/10 pt-3">
                <span className="text-white">Take Rate</span>
                <span className="text-green-400">14%</span>
              </div>
            </div>
          </div>

          <div className="glass-light liquid-border rounded-2xl p-6">
            <h4 className="text-white mb-4">Unit Economics</h4>
            <div className="space-y-3">
              <div className="flex justify-between">
                <span className="text-[#717182] text-sm">Avg Fee per Transaction</span>
                <span className="text-white">$12.18</span>
              </div>
              <div className="flex justify-between">
                <span className="text-[#717182] text-sm">CAC</span>
                <span className="text-white">$8</span>
              </div>
              <div className="flex justify-between">
                <span className="text-[#717182] text-sm">LTV (12-month)</span>
                <span className="text-white">$145</span>
              </div>
              <div className="flex justify-between border-t border-white/10 pt-3">
                <span className="text-white">LTV:CAC Ratio</span>
                <span className="text-green-400">18:1</span>
              </div>
            </div>
          </div>

          <div className="glass-light liquid-border rounded-2xl p-6">
            <h4 className="text-white mb-4">Market Opportunity</h4>
            <div className="space-y-3">
              <div className="flex justify-between">
                <span className="text-[#717182] text-sm">TAM</span>
                <span className="text-white">$1.8B</span>
              </div>
              <div className="flex justify-between">
                <span className="text-[#717182] text-sm">SAM</span>
                <span className="text-white">$620M</span>
              </div>
              <div className="flex justify-between">
                <span className="text-[#717182] text-sm">SOM (Year 3)</span>
                <span className="text-white">$145M</span>
              </div>
              <div className="flex justify-between border-t border-white/10 pt-3">
                <span className="text-white">Market Share</span>
                <span className="text-cyan-400">8.2%</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
