import React from 'react';
import { LineChart, Line, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { DollarSign, TrendingUp, Users, Target } from 'lucide-react';

export function NimbusFinancialProjections() {
  const revenueData = [
    { year: 'Year 1', revenue: 28, costs: 18, profit: 10 },
    { year: 'Year 2', revenue: 75, costs: 38, profit: 37 },
    { year: 'Year 3', revenue: 185, costs: 72, profit: 113 },
    { year: 'Year 4', revenue: 320, costs: 98, profit: 222 },
    { year: 'Year 5', revenue: 480, costs: 125, profit: 355 },
  ];

  const customerGrowth = [
    { year: 'Year 1', customers: 14000 },
    { year: 'Year 2', customers: 37500 },
    { year: 'Year 3', customers: 92500 },
    { year: 'Year 4', customers: 160000 },
    { year: 'Year 5', customers: 240000 },
  ];

  const metrics = [
    { label: 'Year 3 Revenue', value: '$185M', icon: DollarSign, color: 'from-green-500 to-emerald-500' },
    { label: 'Gross Margin', value: '61%', icon: TrendingUp, color: 'from-blue-500 to-cyan-500' },
    { label: 'Total Customers', value: '92,500', icon: Users, color: 'from-purple-500 to-pink-500' },
    { label: 'Market Share', value: '7.4%', icon: Target, color: 'from-yellow-500 to-amber-500' },
  ];

  return (
    <div className="min-h-screen relative overflow-hidden">
      <div className="relative z-10 p-8">
        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center gap-3 mb-2">
            <DollarSign className="w-8 h-8 text-green-400" />
            <h1 className="text-white">Financial Projections</h1>
          </div>
          <p className="text-[#717182]">5-Year Revenue & Growth Forecast</p>
        </div>

        {/* Key Metrics */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          {metrics.map((metric, index) => {
            const Icon = metric.icon;
            return (
              <div key={index} className="glass-light glass-hover rounded-2xl p-6">
                <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${metric.color} flex items-center justify-center mb-4`}>
                  <Icon className="w-6 h-6 text-white" />
                </div>
                <div className="text-3xl text-white mb-1">{metric.value}</div>
                <div className="text-sm text-[#717182]">{metric.label}</div>
              </div>
            );
          })}
        </div>

        {/* Revenue Chart */}
        <div className="glass-light rounded-2xl p-6 mb-8">
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
                  <stop offset="0%" stopColor="#06b6d4" />
                  <stop offset="100%" stopColor="#0891b2" />
                </linearGradient>
              </defs>
            </BarChart>
          </ResponsiveContainer>
        </div>

        {/* Customer Growth */}
        <div className="glass-light rounded-2xl p-6 mb-8">
          <h3 className="text-white mb-6">Customer Growth</h3>
          <ResponsiveContainer width="100%" height={300}>
            <LineChart data={customerGrowth}>
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
              <Line type="monotone" dataKey="customers" stroke="#10b981" strokeWidth={3} dot={{ r: 6, fill: '#10b981' }} />
            </LineChart>
          </ResponsiveContainer>
        </div>

        {/* Unit Economics */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="glass-light rounded-2xl p-6">
            <h4 className="text-white mb-4">Unit Economics</h4>
            <div className="space-y-3">
              <div className="flex justify-between">
                <span className="text-[#717182] text-sm">Avg Device Price</span>
                <span className="text-white">$2,000</span>
              </div>
              <div className="flex justify-between">
                <span className="text-[#717182] text-sm">COGS</span>
                <span className="text-white">$780</span>
              </div>
              <div className="flex justify-between">
                <span className="text-[#717182] text-sm">CAC</span>
                <span className="text-white">$120</span>
              </div>
              <div className="flex justify-between border-t border-white/10 pt-3">
                <span className="text-white">Gross Profit</span>
                <span className="text-green-400">$1,100</span>
              </div>
            </div>
          </div>

          <div className="glass-light rounded-2xl p-6">
            <h4 className="text-white mb-4">Product Mix</h4>
            <div className="space-y-3">
              <div className="flex justify-between">
                <span className="text-[#717182] text-sm">NIMBUS HOME</span>
                <span className="text-white">$1,200</span>
              </div>
              <div className="flex justify-between">
                <span className="text-[#717182] text-sm">NIMBUS PRO</span>
                <span className="text-white">$2,500</span>
              </div>
              <div className="flex justify-between">
                <span className="text-[#717182] text-sm">NIMBUS MINI</span>
                <span className="text-white">$800</span>
              </div>
            </div>
          </div>

          <div className="glass-light rounded-2xl p-6">
            <h4 className="text-white mb-4">Market Opportunity</h4>
            <div className="space-y-3">
              <div className="flex justify-between">
                <span className="text-[#717182] text-sm">TAM</span>
                <span className="text-white">$2.5B</span>
              </div>
              <div className="flex justify-between">
                <span className="text-[#717182] text-sm">SAM</span>
                <span className="text-white">$850M</span>
              </div>
              <div className="flex justify-between">
                <span className="text-[#717182] text-sm">SOM (Year 3)</span>
                <span className="text-white">$185M</span>
              </div>
              <div className="flex justify-between border-t border-white/10 pt-3">
                <span className="text-white">Market Share</span>
                <span className="text-cyan-400">7.4%</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}