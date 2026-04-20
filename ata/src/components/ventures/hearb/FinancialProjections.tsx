import React from 'react';
import { LineChart, Line, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { DollarSign, TrendingUp, Users, Target } from 'lucide-react';

export function HearbFinancialProjections() {
  const revenueData = [
    { year: 'Year 1', revenue: 28, costs: 18, profit: 10 },
    { year: 'Year 2', revenue: 85, costs: 42, profit: 43 },
    { year: 'Year 3', revenue: 215, costs: 85, profit: 130 },
    { year: 'Year 4', revenue: 395, costs: 135, profit: 260 },
    { year: 'Year 5', revenue: 620, costs: 185, profit: 435 },
  ];

  const userGrowth = [
    { year: 'Year 1', users: 48000 },
    { year: 'Year 2', users: 145000 },
    { year: 'Year 3', users: 340000 },
    { year: 'Year 4', users: 625000 },
    { year: 'Year 5', users: 980000 },
  ];

  const metrics = [
    { label: 'Year 3 Revenue', value: '$215M', icon: DollarSign, color: 'from-blue-500 to-cyan-500' },
    { label: 'Gross Margin', value: '60%', icon: TrendingUp, color: 'from-purple-500 to-pink-500' },
    { label: 'Active Users', value: '340K', icon: Users, color: 'from-green-500 to-emerald-500' },
    { label: 'Market Penetration', value: '12.8%', icon: Target, color: 'from-yellow-500 to-amber-500' },
  ];

  return (
    <div className="min-h-screen relative overflow-hidden">
      <div className="relative z-10 p-8">
        <div className="mb-8">
          <div className="flex items-center gap-3 mb-2">
            <DollarSign className="w-8 h-8 text-blue-400" />
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
                  <stop offset="0%" stopColor="#3b82f6" />
                  <stop offset="100%" stopColor="#06b6d4" />
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
          <h3 className="text-white mb-6">User Growth</h3>
          <ResponsiveContainer width="100%" height={300}>
            <LineChart data={userGrowth}>
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
              <Line type="monotone" dataKey="users" stroke="#3b82f6" strokeWidth={3} dot={{ r: 6, fill: '#3b82f6' }} />
            </LineChart>
          </ResponsiveContainer>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="glass-light liquid-border rounded-2xl p-6">
            <h4 className="text-white mb-4">Pricing Model</h4>
            <div className="space-y-3">
              <div className="flex justify-between">
                <span className="text-[#717182] text-sm">Free (Basic)</span>
                <span className="text-white">$0</span>
              </div>
              <div className="flex justify-between">
                <span className="text-[#717182] text-sm">Premium</span>
                <span className="text-white">$14.99/mo</span>
              </div>
              <div className="flex justify-between">
                <span className="text-[#717182] text-sm">Enterprise</span>
                <span className="text-white">$299/user/yr</span>
              </div>
              <div className="flex justify-between border-t border-white/10 pt-3">
                <span className="text-white">Premium Conversion</span>
                <span className="text-cyan-400">42%</span>
              </div>
            </div>
          </div>

          <div className="glass-light liquid-border rounded-2xl p-6">
            <h4 className="text-white mb-4">Unit Economics</h4>
            <div className="space-y-3">
              <div className="flex justify-between">
                <span className="text-[#717182] text-sm">ARPU (Monthly)</span>
                <span className="text-white">$6.30</span>
              </div>
              <div className="flex justify-between">
                <span className="text-[#717182] text-sm">CAC</span>
                <span className="text-white">$12</span>
              </div>
              <div className="flex justify-between">
                <span className="text-[#717182] text-sm">LTV (3-year)</span>
                <span className="text-white">$189</span>
              </div>
              <div className="flex justify-between border-t border-white/10 pt-3">
                <span className="text-white">LTV:CAC Ratio</span>
                <span className="text-green-400">15.8:1</span>
              </div>
            </div>
          </div>

          <div className="glass-light liquid-border rounded-2xl p-6">
            <h4 className="text-white mb-4">Market Opportunity</h4>
            <div className="space-y-3">
              <div className="flex justify-between">
                <span className="text-[#717182] text-sm">TAM</span>
                <span className="text-white">$1.7B</span>
              </div>
              <div className="flex justify-between">
                <span className="text-[#717182] text-sm">SAM</span>
                <span className="text-white">$580M</span>
              </div>
              <div className="flex justify-between">
                <span className="text-[#717182] text-sm">SOM (Year 3)</span>
                <span className="text-white">$215M</span>
              </div>
              <div className="flex justify-between border-t border-white/10 pt-3">
                <span className="text-white">Market Share</span>
                <span className="text-cyan-400">12.8%</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
