import React from 'react';
import { LineChart, Line, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { DollarSign, TrendingUp, Users, Target } from 'lucide-react';

export function HfloFinancialProjections() {
  const revenueData = [
    { year: 'Year 1', revenue: 12, costs: 8, profit: 4 },
    { year: 'Year 2', revenue: 38, costs: 22, profit: 16 },
    { year: 'Year 3', revenue: 95, costs: 45, profit: 50 },
    { year: 'Year 4', revenue: 175, costs: 72, profit: 103 },
    { year: 'Year 5', revenue: 280, costs: 98, profit: 182 },
  ];

  const unitSales = [
    { year: 'Year 1', units: 2400 },
    { year: 'Year 2', units: 7600 },
    { year: 'Year 3', units: 19000 },
    { year: 'Year 4', units: 35000 },
    { year: 'Year 5', units: 56000 },
  ];

  const metrics = [
    { label: 'Year 3 Revenue', value: '$95M', icon: DollarSign, color: 'from-pink-500 to-rose-500' },
    { label: 'Gross Margin', value: '53%', icon: TrendingUp, color: 'from-yellow-500 to-amber-500' },
    { label: 'Units Sold', value: '19K', icon: Users, color: 'from-purple-500 to-pink-500' },
    { label: 'Market Share', value: '7.5%', icon: Target, color: 'from-green-500 to-emerald-500' },
  ];

  return (
    <div className="min-h-screen relative overflow-hidden">
      <div className="relative z-10 p-8">
        <div className="mb-8">
          <div className="flex items-center gap-3 mb-2">
            <DollarSign className="w-8 h-8 text-pink-400" />
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
                  <stop offset="0%" stopColor="#ec4899" />
                  <stop offset="100%" stopColor="#f43f5e" />
                </linearGradient>
                <linearGradient id="costsGradient" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor="#ef4444" />
                  <stop offset="100%" stopColor="#dc2626" />
                </linearGradient>
                <linearGradient id="profitGradient" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor="#10b981" />
                  <stop offset="100%" stopColor="#059669" />
                </linearGradient>
              </defs>
            </BarChart>
          </ResponsiveContainer>
        </div>

        <div className="glass-light liquid-border rounded-2xl p-6 mb-8">
          <h3 className="text-white mb-6">Unit Sales Growth</h3>
          <ResponsiveContainer width="100%" height={300}>
            <LineChart data={unitSales}>
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
              <Line type="monotone" dataKey="units" stroke="#ec4899" strokeWidth={3} dot={{ r: 6, fill: '#ec4899' }} />
            </LineChart>
          </ResponsiveContainer>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="glass-light liquid-border rounded-2xl p-6">
            <h4 className="text-white mb-4">Product SKUs</h4>
            <div className="space-y-3">
              <div className="flex justify-between">
                <span className="text-[#717182] text-sm">HFLO Residential</span>
                <span className="text-white">$3,500</span>
              </div>
              <div className="flex justify-between">
                <span className="text-[#717182] text-sm">HFLO Commercial</span>
                <span className="text-white">$8,500</span>
              </div>
              <div className="flex justify-between">
                <span className="text-[#717182] text-sm">Installation Service</span>
                <span className="text-white">$500</span>
              </div>
              <div className="flex justify-between border-t border-white/10 pt-3">
                <span className="text-white">Avg Unit Price</span>
                <span className="text-pink-400">$5,000</span>
              </div>
            </div>
          </div>

          <div className="glass-light liquid-border rounded-2xl p-6">
            <h4 className="text-white mb-4">Unit Economics</h4>
            <div className="space-y-3">
              <div className="flex justify-between">
                <span className="text-[#717182] text-sm">COGS (Hardware)</span>
                <span className="text-white">$2,350</span>
              </div>
              <div className="flex justify-between">
                <span className="text-[#717182] text-sm">CAC</span>
                <span className="text-white">$180</span>
              </div>
              <div className="flex justify-between">
                <span className="text-[#717182] text-sm">Gross Profit</span>
                <span className="text-white">$2,650</span>
              </div>
              <div className="flex justify-between border-t border-white/10 pt-3">
                <span className="text-white">Gross Margin</span>
                <span className="text-green-400">53%</span>
              </div>
            </div>
          </div>

          <div className="glass-light liquid-border rounded-2xl p-6">
            <h4 className="text-white mb-4">Market Opportunity</h4>
            <div className="space-y-3">
              <div className="flex justify-between">
                <span className="text-[#717182] text-sm">TAM</span>
                <span className="text-white">$1.3B</span>
              </div>
              <div className="flex justify-between">
                <span className="text-[#717182] text-sm">SAM</span>
                <span className="text-white">$450M</span>
              </div>
              <div className="flex justify-between">
                <span className="text-[#717182] text-sm">SOM (Year 3)</span>
                <span className="text-white">$95M</span>
              </div>
              <div className="flex justify-between border-t border-white/10 pt-3">
                <span className="text-white">Market Share</span>
                <span className="text-cyan-400">7.5%</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
