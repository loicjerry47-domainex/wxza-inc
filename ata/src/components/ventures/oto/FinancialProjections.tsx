import React from 'react';
import { LineChart, Line, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { DollarSign, TrendingUp, Users, Target } from 'lucide-react';

export function OtoFinancialProjections() {
  const revenueData = [
    { year: 'Year 1', revenue: 12, costs: 8, profit: 4 },
    { year: 'Year 2', revenue: 38, costs: 18, profit: 20 },
    { year: 'Year 3', revenue: 95, costs: 35, profit: 60 },
    { year: 'Year 4', revenue: 180, costs: 55, profit: 125 },
    { year: 'Year 5', revenue: 290, costs: 78, profit: 212 },
  ];

  const userGrowth = [
    { year: 'Year 1', users: 50000 },
    { year: 'Year 2', users: 185000 },
    { year: 'Year 3', users: 520000 },
    { year: 'Year 4', users: 980000 },
    { year: 'Year 5', users: 1650000 },
  ];

  const metrics = [
    { label: 'Year 3 Revenue', value: '$95M', icon: DollarSign, color: 'from-pink-500 to-rose-500' },
    { label: 'Gross Margin', value: '63%', icon: TrendingUp, color: 'from-blue-500 to-cyan-500' },
    { label: 'Total Users', value: '520K', icon: Users, color: 'from-purple-500 to-violet-500' },
    { label: 'Market Penetration', value: '8.2%', icon: Target, color: 'from-yellow-500 to-amber-500' },
  ];

  return (
    <div className="min-h-screen relative overflow-hidden">
      <div className="relative z-10 p-8">
        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center gap-3 mb-2">
            <DollarSign className="w-8 h-8 text-pink-400" />
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
                  <stop offset="0%" stopColor="#ec4899" />
                  <stop offset="100%" stopColor="#f43f5e" />
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
              <Line type="monotone" dataKey="users" stroke="#ec4899" strokeWidth={3} dot={{ r: 6, fill: '#ec4899' }} />
            </LineChart>
          </ResponsiveContainer>
        </div>

        {/* Unit Economics */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="glass-light rounded-2xl p-6">
            <h4 className="text-white mb-4">Unit Economics</h4>
            <div className="space-y-3">
              <div className="flex justify-between">
                <span className="text-[#717182] text-sm">ARPU (Monthly)</span>
                <span className="text-white">$15</span>
              </div>
              <div className="flex justify-between">
                <span className="text-[#717182] text-sm">CAC</span>
                <span className="text-white">$18</span>
              </div>
              <div className="flex justify-between">
                <span className="text-[#717182] text-sm">LTV (3-year)</span>
                <span className="text-white">$420</span>
              </div>
              <div className="flex justify-between border-t border-white/10 pt-3">
                <span className="text-white">LTV:CAC Ratio</span>
                <span className="text-green-400">23:1</span>
              </div>
            </div>
          </div>

          <div className="glass-light rounded-2xl p-6">
            <h4 className="text-white mb-4">Pricing Tiers</h4>
            <div className="space-y-3">
              <div className="flex justify-between">
                <span className="text-[#717182] text-sm">Free (100 contacts)</span>
                <span className="text-white">$0</span>
              </div>
              <div className="flex justify-between">
                <span className="text-[#717182] text-sm">Plus (Unlimited)</span>
                <span className="text-white">$9.99/mo</span>
              </div>
              <div className="flex justify-between">
                <span className="text-[#717182] text-sm">Pro (Advanced AI)</span>
                <span className="text-white">$19.99/mo</span>
              </div>
              <div className="flex justify-between border-t border-white/10 pt-3">
                <span className="text-white">Premium Adoption</span>
                <span className="text-cyan-400">34%</span>
              </div>
            </div>
          </div>

          <div className="glass-light rounded-2xl p-6">
            <h4 className="text-white mb-4">Market Opportunity</h4>
            <div className="space-y-3">
              <div className="flex justify-between">
                <span className="text-[#717182] text-sm">TAM</span>
                <span className="text-white">$1.2B</span>
              </div>
              <div className="flex justify-between">
                <span className="text-[#717182] text-sm">SAM</span>
                <span className="text-white">$420M</span>
              </div>
              <div className="flex justify-between">
                <span className="text-[#717182] text-sm">SOM (Year 3)</span>
                <span className="text-white">$95M</span>
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