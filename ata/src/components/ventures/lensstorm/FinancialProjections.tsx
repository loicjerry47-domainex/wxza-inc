import React from 'react';
import { LineChart, Line, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { DollarSign, TrendingUp, Users, Target } from 'lucide-react';

export function LensstormFinancialProjections() {
  const revenueData = [
    { year: 'Year 1', revenue: 58, costs: 38, profit: 20 },
    { year: 'Year 2', revenue: 185, costs: 95, profit: 90 },
    { year: 'Year 3', revenue: 480, costs: 185, profit: 295 },
    { year: 'Year 4', revenue: 850, costs: 285, profit: 565 },
    { year: 'Year 5', revenue: 1320, costs: 395, profit: 925 },
  ];

  const deviceSales = [
    { year: 'Year 1', devices: 29000 },
    { year: 'Year 2', devices: 92500 },
    { year: 'Year 3', devices: 240000 },
    { year: 'Year 4', devices: 425000 },
    { year: 'Year 5', devices: 660000 },
  ];

  const metrics = [
    { label: 'Year 3 Revenue', value: '$480M', icon: DollarSign, color: 'from-cyan-500 to-blue-500' },
    { label: 'Gross Margin', value: '61%', icon: TrendingUp, color: 'from-purple-500 to-pink-500' },
    { label: 'Devices Sold', value: '240K', icon: Users, color: 'from-green-500 to-emerald-500' },
    { label: 'Market Share', value: '14.2%', icon: Target, color: 'from-yellow-500 to-amber-500' },
  ];

  return (
    <div className="min-h-screen relative overflow-hidden">
      <div className="relative z-10 p-8">
        <div className="mb-8">
          <div className="flex items-center gap-3 mb-2">
            <DollarSign className="w-8 h-8 text-cyan-400" />
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
                  <stop offset="0%" stopColor="#06b6d4" />
                  <stop offset="100%" stopColor="#0891b2" />
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
          <h3 className="text-white mb-6">Device Sales Growth</h3>
          <ResponsiveContainer width="100%" height={300}>
            <LineChart data={deviceSales}>
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
              <Line type="monotone" dataKey="devices" stroke="#06b6d4" strokeWidth={3} dot={{ r: 6, fill: '#06b6d4' }} />
            </LineChart>
          </ResponsiveContainer>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="glass-light liquid-border rounded-2xl p-6">
            <h4 className="text-white mb-4">Unit Economics</h4>
            <div className="space-y-3">
              <div className="flex justify-between">
                <span className="text-[#717182] text-sm">Avg Device Price</span>
                <span className="text-white">$2,000</span>
              </div>
              <div className="flex justify-between">
                <span className="text-[#717182] text-sm">COGS (Hardware)</span>
                <span className="text-white">$780</span>
              </div>
              <div className="flex justify-between">
                <span className="text-[#717182] text-sm">CAC</span>
                <span className="text-white">$140</span>
              </div>
              <div className="flex justify-between border-t border-white/10 pt-3">
                <span className="text-white">Gross Profit</span>
                <span className="text-green-400">$1,080</span>
              </div>
            </div>
          </div>

          <div className="glass-light liquid-border rounded-2xl p-6">
            <h4 className="text-white mb-4">Product SKUs</h4>
            <div className="space-y-3">
              <div className="flex justify-between">
                <span className="text-[#717182] text-sm">LENSSTORM STANDARD</span>
                <span className="text-white">$1,500</span>
              </div>
              <div className="flex justify-between">
                <span className="text-[#717182] text-sm">LENSSTORM PRO</span>
                <span className="text-white">$2,500</span>
              </div>
              <div className="flex justify-between">
                <span className="text-[#717182] text-sm">Accessories (avg)</span>
                <span className="text-white">$150</span>
              </div>
              <div className="flex justify-between border-t border-white/10 pt-3">
                <span className="text-white">PRO Adoption</span>
                <span className="text-cyan-400">42%</span>
              </div>
            </div>
          </div>

          <div className="glass-light liquid-border rounded-2xl p-6">
            <h4 className="text-white mb-4">Market Opportunity</h4>
            <div className="space-y-3">
              <div className="flex justify-between">
                <span className="text-[#717182] text-sm">TAM</span>
                <span className="text-white">$3.4B</span>
              </div>
              <div className="flex justify-between">
                <span className="text-[#717182] text-sm">SAM</span>
                <span className="text-white">$1.2B</span>
              </div>
              <div className="flex justify-between">
                <span className="text-[#717182] text-sm">SOM (Year 3)</span>
                <span className="text-white">$480M</span>
              </div>
              <div className="flex justify-between border-t border-white/10 pt-3">
                <span className="text-white">Market Share</span>
                <span className="text-cyan-400">14.2%</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
