import React from 'react';
import { LineChart, Line, BarChart, Bar, PieChart, Pie, Cell, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { TrendingUp, DollarSign, Shield, Users } from 'lucide-react';

export function GcraftPerformanceMetrics() {
  const gmvData = [
    { month: 'Jun', gmv: 28, transactions: 18000 },
    { month: 'Jul', gmv: 32, transactions: 21000 },
    { month: 'Aug', gmv: 35, transactions: 23500 },
    { month: 'Sep', gmv: 38, transactions: 26000 },
    { month: 'Oct', gmv: 40, transactions: 28500 },
    { month: 'Nov', gmv: 42.5, transactions: 31000 },
  ];

  const retailerData = [
    { retailer: 'Amazon', volume: 28, color: '#FF9900' },
    { retailer: 'Target', volume: 18, color: '#CC0000' },
    { retailer: 'Walmart', volume: 15, color: '#0071CE' },
    { retailer: 'Best Buy', volume: 12, color: '#FFF200' },
    { retailer: 'Starbucks', volume: 10, color: '#00704A' },
    { retailer: 'Others', volume: 17, color: '#717182' },
  ];

  const fraudData = [
    { week: 'Week 1', flagged: 42, confirmed: 38 },
    { week: 'Week 2', flagged: 35, confirmed: 32 },
    { week: 'Week 3', flagged: 48, confirmed: 45 },
    { week: 'Week 4', flagged: 39, confirmed: 36 },
  ];

  return (
    <div className="min-h-screen relative overflow-hidden">
      <div className="relative z-10 p-8">
        <div className="mb-8">
          <div className="flex items-center gap-3 mb-2">
            <TrendingUp className="w-8 h-8 text-green-400" />
            <h1 className="text-white">Performance Metrics</h1>
          </div>
          <p className="text-[#717182]">Gcraft - Marketplace Analytics</p>
        </div>

        {/* Key Metrics */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <div className="glass-light glass-hover rounded-2xl p-6">
            <div className="flex items-center justify-between mb-4">
              <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-green-500 to-emerald-500 flex items-center justify-center">
                <DollarSign className="w-6 h-6 text-white" />
              </div>
              <div className="text-green-400 text-sm">+18%</div>
            </div>
            <div className="text-3xl text-white mb-1">$42.5M</div>
            <div className="text-sm text-[#717182]">Monthly GMV</div>
          </div>

          <div className="glass-light glass-hover rounded-2xl p-6">
            <div className="flex items-center justify-between mb-4">
              <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-blue-500 to-cyan-500 flex items-center justify-center">
                <Users className="w-6 h-6 text-white" />
              </div>
              <div className="text-green-400 text-sm">+12%</div>
            </div>
            <div className="text-3xl text-white mb-1">245K</div>
            <div className="text-sm text-[#717182]">Active Listings</div>
          </div>

          <div className="glass-light glass-hover rounded-2xl p-6">
            <div className="flex items-center justify-between mb-4">
              <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-red-500 to-orange-500 flex items-center justify-center">
                <Shield className="w-6 h-6 text-white" />
              </div>
              <div className="text-white text-sm">XGBoost</div>
            </div>
            <div className="text-3xl text-white mb-1">99.7%</div>
            <div className="text-sm text-[#717182]">Fraud Detection</div>
          </div>

          <div className="glass-light glass-hover rounded-2xl p-6">
            <div className="flex items-center justify-between mb-4">
              <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-purple-500 to-pink-500 flex items-center justify-center">
                <TrendingUp className="w-6 h-6 text-white" />
              </div>
              <div className="text-white text-sm">+23%</div>
            </div>
            <div className="text-3xl text-white mb-1">892K</div>
            <div className="text-sm text-[#717182]">Active Users</div>
          </div>
        </div>

        {/* Charts Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
          {/* Chart 1 */}
          <div className="glass-light rounded-2xl p-6">
            <h3 className="text-white mb-6">GMV & Transaction Growth</h3>
            <ResponsiveContainer width="100%" height={300}>
              <LineChart data={gmvData}>
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
                <Line yAxisId="left" type="monotone" dataKey="gmv" stroke="#10b981" strokeWidth={3} name="GMV ($M)" />
                <Line yAxisId="right" type="monotone" dataKey="transactions" stroke="#06b6d4" strokeWidth={2} name="Transactions" />
              </LineChart>
            </ResponsiveContainer>
          </div>

          {/* Chart 2 */}
          <div className="glass-light rounded-2xl p-6">
            <h3 className="text-white mb-6">Top Retailers by Volume (%)</h3>
            <ResponsiveContainer width="100%" height={300}>
              <PieChart>
                <Pie
                  data={retailerData}
                  cx="50%"
                  cy="50%"
                  innerRadius={60}
                  outerRadius={100}
                  paddingAngle={3}
                  dataKey="volume"
                >
                  {retailerData.map((entry, index) => (
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

          {/* Chart 3 */}
          <div className="glass-light rounded-2xl p-6">
            <h3 className="text-white mb-6">Fraud Detection Performance</h3>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={fraudData}>
                <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.1)" />
                <XAxis dataKey="week" stroke="#717182" />
                <YAxis stroke="#717182" />
                <Tooltip
                  contentStyle={{
                    backgroundColor: 'rgba(0,0,0,0.8)',
                    border: '1px solid rgba(255,255,255,0.1)',
                    borderRadius: '12px',
                    color: '#fff'
                  }}
                />
                <Bar dataKey="flagged" fill="#ef4444" radius={[8, 8, 0, 0]} name="Flagged" />
                <Bar dataKey="confirmed" fill="#dc2626" radius={[8, 8, 0, 0]} name="Confirmed Fraud" />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Performance Indicators */}
        <div className="glass-light rounded-2xl p-6">
          <h3 className="text-white mb-6">Platform Health</h3>
          <div className="space-y-4">
            <div>
              <div className="flex items-center justify-between mb-2">
                <span className="text-sm text-[#717182]">Transaction Success Rate</span>
                <span className="text-white">98.5%</span>
              </div>
              <div className="h-2 bg-white/10 rounded-full overflow-hidden">
                <div className="h-full bg-gradient-to-r from-green-500 to-emerald-500" style={{ width: '98.5%' }} />
              </div>
            </div>
            <div>
              <div className="flex items-center justify-between mb-2">
                <span className="text-sm text-[#717182]">Balance Verification Accuracy</span>
                <span className="text-white">99.2%</span>
              </div>
              <div className="h-2 bg-white/10 rounded-full overflow-hidden">
                <div className="h-full bg-gradient-to-r from-blue-500 to-cyan-500" style={{ width: '99.2%' }} />
              </div>
            </div>
            <div>
              <div className="flex items-center justify-between mb-2">
                <span className="text-sm text-[#717182]">Avg Payout Speed</span>
                <span className="text-white">2.3 minutes</span>
              </div>
              <div className="h-2 bg-white/10 rounded-full overflow-hidden">
                <div className="h-full bg-gradient-to-r from-purple-500 to-pink-500" style={{ width: '95%' }} />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}