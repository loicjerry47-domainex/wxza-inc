import React from 'react';
import { LineChart, Line, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { DollarSign, TrendingUp, Users, Target } from 'lucide-react';

export function InectFinancialProjections() {
  const revenueData = [
    { year: 'Year 1', revenue: 42, costs: 28, profit: 14 },
    { year: 'Year 2', revenue: 125, costs: 62, profit: 63 },
    { year: 'Year 3', revenue: 320, costs: 125, profit: 195 },
    { year: 'Year 4', revenue: 580, costs: 185, profit: 395 },
    { year: 'Year 5', revenue: 920, costs: 245, profit: 675 },
  ];

  const broadcasterGrowth = [
    { year: 'Year 1', broadcasters: 2100 },
    { year: 'Year 2', broadcasters: 6800 },
    { year: 'Year 3', broadcasters: 16000 },
    { year: 'Year 4', broadcasters: 28500 },
    { year: 'Year 5', broadcasters: 45000 },
  ];

  const metrics = [
    { label: 'Year 3 Revenue', value: '$320M', icon: DollarSign, color: 'from-red-500 to-orange-500' },
    { label: 'Gross Margin', value: '61%', icon: TrendingUp, color: 'from-blue-500 to-cyan-500' },
    { label: 'Active Broadcasters', value: '16K', icon: Users, color: 'from-purple-500 to-pink-500' },
    { label: 'Market Share', value: '18.5%', icon: Target, color: 'from-green-500 to-emerald-500' },
  ];

  return (
    <div className="min-h-screen relative overflow-hidden">
      <div className="relative z-10 p-8">
        <div className="mb-8">
          <div className="flex items-center gap-3 mb-2">
            <DollarSign className="w-8 h-8 text-red-400" />
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
                  <stop offset="0%" stopColor="#ef4444" />
                  <stop offset="100%" stopColor="#f97316" />
                </linearGradient>
                <linearGradient id="costsGradient" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor="#dc2626" />
                  <stop offset="100%" stopColor="#b91c1c" />
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
          <h3 className="text-white mb-6">Broadcaster Growth</h3>
          <ResponsiveContainer width="100%" height={300}>
            <LineChart data={broadcasterGrowth}>
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
              <Line type="monotone" dataKey="broadcasters" stroke="#ef4444" strokeWidth={3} dot={{ r: 6, fill: '#ef4444' }} />
            </LineChart>
          </ResponsiveContainer>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="glass-light liquid-border rounded-2xl p-6">
            <h4 className="text-white mb-4">Revenue Model</h4>
            <div className="space-y-3">
              <div className="flex justify-between">
                <span className="text-[#717182] text-sm">Platform Fee (20%)</span>
                <span className="text-white">$240M</span>
              </div>
              <div className="flex justify-between">
                <span className="text-[#717182] text-sm">Subscriptions</span>
                <span className="text-white">$50M</span>
              </div>
              <div className="flex justify-between">
                <span className="text-[#717182] text-sm">Enterprise Deals</span>
                <span className="text-white">$30M</span>
              </div>
              <div className="flex justify-between border-t border-white/10 pt-3">
                <span className="text-white">Year 3 Total</span>
                <span className="text-green-400">$320M</span>
              </div>
            </div>
          </div>

          <div className="glass-light liquid-border rounded-2xl p-6">
            <h4 className="text-white mb-4">Pricing Tiers</h4>
            <div className="space-y-3">
              <div className="flex justify-between">
                <span className="text-[#717182] text-sm">Starter (720p)</span>
                <span className="text-white">$49/mo</span>
              </div>
              <div className="flex justify-between">
                <span className="text-[#717182] text-sm">Pro (4K + AI)</span>
                <span className="text-white">$149/mo</span>
              </div>
              <div className="flex justify-between">
                <span className="text-[#717182] text-sm">Enterprise</span>
                <span className="text-white">Custom</span>
              </div>
              <div className="flex justify-between border-t border-white/10 pt-3">
                <span className="text-white">Pro Adoption</span>
                <span className="text-cyan-400">58%</span>
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
                <span className="text-white">$680M</span>
              </div>
              <div className="flex justify-between">
                <span className="text-[#717182] text-sm">SOM (Year 3)</span>
                <span className="text-white">$320M</span>
              </div>
              <div className="flex justify-between border-t border-white/10 pt-3">
                <span className="text-white">Market Share</span>
                <span className="text-cyan-400">18.5%</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
