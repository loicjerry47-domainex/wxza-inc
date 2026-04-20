import React from 'react';
import { CreditCard, DollarSign, Shield, TrendingUp, Users, Zap } from 'lucide-react';

export function GcraftPlatformDashboard() {
  const metrics = [
    { label: 'Monthly GMV', value: '$42.5M', icon: DollarSign, trend: '+18%', color: 'from-green-500 to-emerald-500' },
    { label: 'Active Listings', value: '245K', icon: CreditCard, trend: '+12%', color: 'from-blue-500 to-cyan-500' },
    { label: 'Fraud Detection', value: '99.7%', icon: Shield, trend: 'XGBoost', color: 'from-red-500 to-orange-500' },
    { label: 'Avg Transaction', value: '$87', icon: TrendingUp, trend: '+$5', color: 'from-purple-500 to-pink-500' },
    { label: 'Active Users', value: '892K', icon: Users, trend: '+23%', color: 'from-yellow-500 to-amber-500' },
    { label: 'Instant Payouts', value: '2.3 min', icon: Zap, trend: 'Stripe', color: 'from-indigo-500 to-violet-500' },
  ];

  const recentTransactions = [
    { id: 1, seller: 'User #8423', buyer: 'User #5192', amount: 95, retailer: 'Amazon', status: 'completed', fraud_score: 0.02 },
    { id: 2, seller: 'User #3109', buyer: 'User #7841', amount: 50, retailer: 'Target', status: 'completed', fraud_score: 0.01 },
    { id: 3, seller: 'User #9214', buyer: 'User #4563', amount: 125, retailer: 'Best Buy', status: 'pending', fraud_score: 0.15 },
    { id: 4, seller: 'User #6728', buyer: 'User #2891', amount: 75, retailer: 'Starbucks', status: 'completed', fraud_score: 0.03 },
    { id: 5, seller: 'User #1542', buyer: 'User #8967', amount: 200, retailer: 'Apple', status: 'flagged', fraud_score: 0.78 },
  ];

  const getStatusColor = (status: string) => {
    if (status === 'completed') return 'text-green-400 bg-green-500/10 border-green-500/20';
    if (status === 'pending') return 'text-yellow-400 bg-yellow-500/10 border-yellow-500/20';
    return 'text-red-400 bg-red-500/10 border-red-500/20';
  };

  const getFraudColor = (score: number) => {
    if (score < 0.1) return 'text-green-400';
    if (score < 0.5) return 'text-yellow-400';
    return 'text-red-400';
  };

  return (
    <div className="min-h-screen relative overflow-hidden">
      <div className="relative z-10 p-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-white mb-2">Gcraft</h1>
          <p className="text-[#717182]">Gift Card Marketplace - Real-Time Trading Platform</p>
        </div>

        {/* Metrics Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
          {metrics.map((metric, index) => {
            const Icon = metric.icon;
            return (
              <div
                key={index}
                className="glass-light glass-hover rounded-2xl p-6"
              >
                <div className="flex items-start justify-between mb-4">
                  <div className={`p-3 rounded-xl bg-gradient-to-br ${metric.color}`}>
                    <Icon className="w-6 h-6 text-white" />
                  </div>
                  <div className="text-sm px-3 py-1 rounded-full bg-white/10 text-white">
                    {metric.trend}
                  </div>
                </div>
                <div className="text-3xl text-white mb-1">{metric.value}</div>
                <div className="text-sm text-[#717182]">{metric.label}</div>
              </div>
            );
          })}
        </div>

        {/* Recent Transactions Table */}
        <div className="glass-light rounded-2xl p-6">
          <h2 className="text-white mb-6">Recent Transactions</h2>
          
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-white/10">
                  <th className="text-left text-[#717182] pb-4 pr-4">Seller</th>
                  <th className="text-left text-[#717182] pb-4 pr-4">Buyer</th>
                  <th className="text-left text-[#717182] pb-4 pr-4">Amount</th>
                  <th className="text-left text-[#717182] pb-4 pr-4">Retailer</th>
                  <th className="text-left text-[#717182] pb-4 pr-4">Fraud Score</th>
                  <th className="text-left text-[#717182] pb-4">Status</th>
                </tr>
              </thead>
              <tbody>
                {recentTransactions.map((tx, index) => (
                  <tr
                    key={tx.id}
                    className="border-b border-white/5 hover:bg-white/5 transition-colors"
                    style={{ animation: `fadeIn 0.3s ease-out ${index * 0.1}s both` }}
                  >
                    <td className="py-4 pr-4">
                      <code className="text-cyan-400 text-sm">{tx.seller}</code>
                    </td>
                    <td className="py-4 pr-4">
                      <code className="text-blue-400 text-sm">{tx.buyer}</code>
                    </td>
                    <td className="py-4 pr-4">
                      <span className="text-white">${tx.amount}</span>
                    </td>
                    <td className="py-4 pr-4">
                      <span className="text-[#717182]">{tx.retailer}</span>
                    </td>
                    <td className="py-4 pr-4">
                      <span className={getFraudColor(tx.fraud_score)}>{(tx.fraud_score * 100).toFixed(1)}%</span>
                    </td>
                    <td className="py-4">
                      <span className={`inline-flex items-center px-3 py-1 rounded-full text-xs border ${getStatusColor(tx.status)}`}>
                        {tx.status.toUpperCase()}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Live Status Indicator */}
        <div className="fixed bottom-8 right-8 bg-white/10 backdrop-blur-xl border border-white/20 rounded-full px-6 py-3 flex items-center gap-3">
          <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse" />
          <span className="text-white text-sm">245K Active Listings</span>
        </div>
      </div>

      <style>{`
        @keyframes fadeIn {
          from {
            opacity: 0;
            transform: translateY(10px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
      `}</style>
    </div>
  );
}