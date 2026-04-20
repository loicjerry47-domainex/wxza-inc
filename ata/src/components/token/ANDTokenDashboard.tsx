import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "motion/react";
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";
import { Button } from "../ui/button";
import { Badge } from "../ui/badge";
import { 
  Coins,
  TrendingUp,
  Users,
  Lock,
  Vote,
  DollarSign,
  PieChart,
  Flame,
  Shield,
  Zap,
  Award,
  BarChart3,
  Globe,
  CheckCircle,
  AlertTriangle,
  ArrowUpRight,
  ArrowDownRight,
  Calendar,
  Clock,
  Target,
  Wallet,
  FileText,
  Scale,
  Gavel
} from "lucide-react";

interface ANDTokenDashboardProps {
  deviceView: 'desktop' | 'tablet' | 'mobile';
}

export function ANDTokenDashboard({ deviceView }: ANDTokenDashboardProps) {
  const [activeTab, setActiveTab] = useState<'overview' | 'tokenomics' | 'staking' | 'governance' | 'legal'>('overview');
  const [tokenPrice, setTokenPrice] = useState(0.50);
  const [totalBurned, setTotalBurned] = useState(0);
  const [stakingAPY, setStakingAPY] = useState(5.0);

  const isMobile = deviceView === 'mobile';
  const isTablet = deviceView === 'tablet';

  // Simulate live price updates
  useEffect(() => {
    const interval = setInterval(() => {
      setTokenPrice(prev => prev + (Math.random() - 0.5) * 0.01);
      setTotalBurned(prev => prev + Math.random() * 1000);
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  const tokenMetrics = [
    {
      label: 'Token Price',
      value: `$${tokenPrice.toFixed(4)}`,
      change: '+12.5%',
      positive: true,
      icon: DollarSign,
      color: 'from-green-500 to-emerald-500'
    },
    {
      label: 'Market Cap',
      value: `$${(tokenPrice * 1000000000 * 0.08).toFixed(0)}M`,
      change: '+8.2%',
      positive: true,
      icon: Globe,
      color: 'from-blue-500 to-cyan-500'
    },
    {
      label: 'Circulating Supply',
      value: '80M AND',
      change: '8% of total',
      positive: null,
      icon: Coins,
      color: 'from-purple-500 to-pink-500'
    },
    {
      label: 'Total Burned',
      value: `${(totalBurned / 1000).toFixed(1)}K AND`,
      change: '+' + Math.floor(totalBurned).toString(),
      positive: true,
      icon: Flame,
      color: 'from-orange-500 to-red-500'
    },
  ];

  const tokenAllocation = [
    { category: 'Portfolio Treasury', amount: 400, percentage: 40, color: 'bg-blue-500', vesting: '5 years linear' },
    { category: 'Founder/Team', amount: 200, percentage: 20, color: 'bg-purple-500', vesting: '4 years w/ 1yr cliff' },
    { category: 'Early Investors', amount: 150, percentage: 15, color: 'bg-green-500', vesting: '4 years w/ 1yr cliff' },
    { category: 'Public Sale', amount: 150, percentage: 15, color: 'bg-yellow-500', vesting: '6 months' },
    { category: 'Community Rewards', amount: 100, percentage: 10, color: 'bg-pink-500', vesting: '5 years linear' },
  ];

  const stakingTiers = [
    { duration: 'No Lock', voting: '1.0x', rewards: '1.0x', apy: '3.0%', penalty: '50%', color: 'from-gray-500 to-slate-500' },
    { duration: '3 Months', voting: '1.2x', rewards: '1.1x', apy: '4.5%', penalty: '20%', color: 'from-blue-500 to-cyan-500' },
    { duration: '6 Months', voting: '1.5x', rewards: '1.25x', apy: '6.3%', penalty: '15%', color: 'from-green-500 to-emerald-500' },
    { duration: '12 Months', voting: '2.0x', rewards: '1.5x', apy: '7.5%', penalty: '10%', color: 'from-purple-500 to-pink-500' },
    { duration: '24 Months', voting: '3.0x', rewards: '2.0x', apy: '10.0%', penalty: '5%', color: 'from-orange-500 to-red-500' },
  ];

  const governanceProposals = [
    { 
      id: '#007', 
      title: 'Increase 12-month staking APY from 5% to 7%', 
      status: 'Active', 
      votes: { for: 68, against: 28, abstain: 4 }, 
      quorum: 8, 
      endsIn: '3 days',
      type: 'Standard'
    },
    { 
      id: '#008', 
      title: 'Invest $10M in QuantumMesh (10th venture)', 
      status: 'Pending', 
      votes: { for: 0, against: 0, abstain: 0 }, 
      quorum: 0, 
      endsIn: '7 days',
      type: 'Treasury'
    },
    { 
      id: '#006', 
      title: 'Update governance quorum from 5% to 7%', 
      status: 'Executed', 
      votes: { for: 82, against: 15, abstain: 3 }, 
      quorum: 12, 
      endsIn: 'Completed',
      type: 'Constitutional'
    },
  ];

  const vestingSchedule = [
    { month: 'TGE', treasury: 10, team: 0, investors: 0, publicSale: 20, community: 10, total: 80 },
    { month: 'Month 6', treasury: 13, team: 0, investors: 0, publicSale: 15, community: 11, total: 130 },
    { month: 'Month 12', treasury: 16, team: 12.5, investors: 9, publicSale: 15, community: 12, total: 180 },
    { month: 'Year 2', treasury: 24, team: 25, investors: 19, community: 14, total: 300 },
    { month: 'Year 3', treasury: 32, team: 37.5, investors: 28, community: 16, total: 450 },
    { month: 'Year 5', treasury: 40, team: 50, investors: 37.5, publicSale: 15, community: 20, total: 850 },
  ];

  const legalMilestones = [
    { phase: 'Entity Setup', status: 'Complete', date: 'Q1 2026', items: ['Swiss Foundation', 'Cayman SPVs', 'Legal opinions'] },
    { phase: 'Smart Contract Audit', status: 'Complete', date: 'Q2 2026', items: ['CertiK audit', 'Trail of Bits audit', 'Bug bounty'] },
    { phase: 'Token Sale (Offshore)', status: 'In Progress', date: 'Q3 2026', items: ['KYC integration', 'Geo-blocking', 'IDO launch'] },
    { phase: 'Reg A+ Filing', status: 'Planned', date: 'Q2 2027', items: ['Offering Circular', 'SEC review', 'U.S. market access'] },
  ];

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-4xl font-black bg-gradient-to-r from-blue-400 via-purple-400 to-green-400 bg-clip-text text-transparent">
            AND TOKEN ECOSYSTEM
          </h2>
          <p className="text-blue-200/80 mt-2">Aggregated Network Dividend • ERC-20 Governance Token</p>
        </div>
        
        {!isMobile && (
          <div className="flex items-center gap-4">
            <Badge className="bg-green-500/20 text-green-300 border-green-500/40 px-4 py-2">
              <CheckCircle className="h-4 w-4 mr-2" />
              Audited
            </Badge>
            <Badge className="bg-blue-500/20 text-blue-300 border-blue-500/40 px-4 py-2">
              <Lock className="h-4 w-4 mr-2" />
              Liquidity Locked
            </Badge>
          </div>
        )}
      </div>

      {/* Navigation Tabs */}
      <div className="flex gap-2 bg-black/40 p-2 rounded-xl border border-blue-500/20 overflow-x-auto">
        {[
          { id: 'overview', label: 'Overview', icon: PieChart },
          { id: 'tokenomics', label: 'Tokenomics', icon: BarChart3 },
          { id: 'staking', label: 'Staking', icon: Lock },
          { id: 'governance', label: 'Governance', icon: Vote },
          { id: 'legal', label: 'Legal', icon: Scale },
        ].map((tab) => (
          <Button
            key={tab.id}
            variant={activeTab === tab.id ? 'default' : 'ghost'}
            size="sm"
            onClick={() => setActiveTab(tab.id as any)}
            className={`flex-shrink-0 ${
              activeTab === tab.id 
                ? 'bg-gradient-to-r from-blue-600 via-purple-600 to-green-600 text-white font-black' 
                : 'text-blue-300 hover:bg-blue-500/20'
            }`}
          >
            <tab.icon className="h-4 w-4 mr-2" />
            {!isMobile && tab.label}
          </Button>
        ))}
      </div>

      {/* Overview Tab */}
      {activeTab === 'overview' && (
        <AnimatePresence mode="wait">
          <motion.div
            key="overview"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="space-y-8"
          >
            {/* Token Metrics */}
            <div className={`grid gap-6 ${isMobile ? 'grid-cols-1' : isTablet ? 'grid-cols-2' : 'grid-cols-4'}`}>
              {tokenMetrics.map((metric, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: index * 0.1 }}
                >
                  <Card className="bg-gradient-to-br from-black/60 to-black/40 border-blue-500/30 hover:border-blue-400/50 transition-all">
                    <CardContent className="p-6">
                      <div className="flex items-start justify-between mb-4">
                        <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${metric.color} p-3 flex items-center justify-center`}>
                          <metric.icon className="h-6 w-6 text-white" />
                        </div>
                        {metric.positive !== null && (
                          <Badge className={`${metric.positive ? 'bg-green-500/20 text-green-400' : 'bg-red-500/20 text-red-400'} border-0`}>
                            {metric.positive ? <ArrowUpRight className="h-3 w-3 mr-1" /> : <ArrowDownRight className="h-3 w-3 mr-1" />}
                            {metric.change}
                          </Badge>
                        )}
                      </div>
                      <div className="text-3xl font-black text-white mb-1">{metric.value}</div>
                      <div className="text-sm text-blue-300/70">{metric.label}</div>
                    </CardContent>
                  </Card>
                </motion.div>
              ))}
            </div>

            {/* Quick Stats */}
            <div className="grid md:grid-cols-3 gap-6">
              <Card className="bg-gradient-to-br from-blue-900/30 to-purple-900/30 border-2 border-blue-500/50">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2 text-white">
                    <TrendingUp className="h-5 w-5 text-blue-400" />
                    Price Targets
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  {[
                    { label: 'Year 1', price: '$0.83', scenario: 'Conservative' },
                    { label: 'Year 3', price: '$1.33', scenario: 'Conservative' },
                    { label: 'Year 5', price: '$2.14', scenario: 'Conservative' },
                  ].map((target, idx) => (
                    <div key={idx} className="flex justify-between items-center p-3 bg-black/40 rounded-lg">
                      <div>
                        <div className="text-sm text-blue-300/70">{target.label} ({target.scenario})</div>
                        <div className="text-xl font-black text-white">{target.price}</div>
                      </div>
                      <div className="text-sm text-green-400">
                        +{((parseFloat(target.price.replace('$', '')) / tokenPrice - 1) * 100).toFixed(0)}%
                      </div>
                    </div>
                  ))}
                </CardContent>
              </Card>

              <Card className="bg-gradient-to-br from-green-900/30 to-emerald-900/30 border-2 border-green-500/50">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2 text-white">
                    <Flame className="h-5 w-5 text-orange-400" />
                    Buyback & Burn
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  <div className="p-4 bg-black/40 rounded-lg">
                    <div className="text-sm text-orange-300/70 mb-2">Year 5 Target</div>
                    <div className="text-3xl font-black text-white mb-1">$92.6M</div>
                    <div className="text-sm text-orange-300">30% of $309M net profit</div>
                  </div>
                  <div className="p-4 bg-black/40 rounded-lg">
                    <div className="text-sm text-orange-300/70 mb-2">Projected Burn</div>
                    <div className="text-3xl font-black text-white mb-1">46.3M</div>
                    <div className="text-sm text-orange-300">AND tokens/year by Y5</div>
                  </div>
                </CardContent>
              </Card>

              <Card className="bg-gradient-to-br from-purple-900/30 to-pink-900/30 border-2 border-purple-500/50">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2 text-white">
                    <Lock className="h-5 w-5 text-purple-400" />
                    Staking Stats
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  <div className="p-4 bg-black/40 rounded-lg">
                    <div className="text-sm text-purple-300/70 mb-2">Total Staked</div>
                    <div className="text-3xl font-black text-white mb-1">35%</div>
                    <div className="text-sm text-purple-300">28M AND tokens</div>
                  </div>
                  <div className="p-4 bg-black/40 rounded-lg">
                    <div className="text-sm text-purple-300/70 mb-2">Average APY</div>
                    <div className="text-3xl font-black text-white mb-1">{stakingAPY.toFixed(1)}%</div>
                    <div className="text-sm text-purple-300">12-month tier</div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </motion.div>
        </AnimatePresence>
      )}

      {/* Tokenomics Tab */}
      {activeTab === 'tokenomics' && (
        <AnimatePresence mode="wait">
          <motion.div
            key="tokenomics"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="space-y-8"
          >
            {/* Allocation Breakdown */}
            <Card className="bg-gradient-to-br from-black/60 to-black/40 border-blue-500/30">
              <CardHeader>
                <CardTitle className="text-2xl text-white flex items-center gap-2">
                  <PieChart className="h-6 w-6 text-blue-400" />
                  Token Allocation (1B Total Supply)
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {tokenAllocation.map((allocation, idx) => (
                    <div key={idx} className="space-y-2">
                      <div className="flex justify-between items-center">
                        <div className="flex items-center gap-3">
                          <div className={`w-4 h-4 rounded ${allocation.color}`} />
                          <span className="text-white font-bold">{allocation.category}</span>
                        </div>
                        <div className="text-right">
                          <div className="text-white font-black">{allocation.amount}M ({allocation.percentage}%)</div>
                          <div className="text-xs text-blue-300/70">{allocation.vesting}</div>
                        </div>
                      </div>
                      <div className="h-3 bg-black/40 rounded-full overflow-hidden">
                        <motion.div
                          initial={{ width: 0 }}
                          animate={{ width: `${allocation.percentage}%` }}
                          transition={{ duration: 1, delay: idx * 0.1 }}
                          className={`h-full ${allocation.color}`}
                        />
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Vesting Schedule */}
            <Card className="bg-gradient-to-br from-black/60 to-black/40 border-blue-500/30">
              <CardHeader>
                <CardTitle className="text-2xl text-white flex items-center gap-2">
                  <Calendar className="h-6 w-6 text-green-400" />
                  Vesting Schedule & Circulating Supply
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="overflow-x-auto">
                  <table className="w-full">
                    <thead>
                      <tr className="border-b border-blue-500/30">
                        <th className="text-left p-3 text-blue-300">Milestone</th>
                        <th className="text-right p-3 text-blue-300">Treasury</th>
                        <th className="text-right p-3 text-blue-300">Team</th>
                        <th className="text-right p-3 text-blue-300">Investors</th>
                        <th className="text-right p-3 text-blue-300">Public</th>
                        <th className="text-right p-3 text-blue-300">Community</th>
                        <th className="text-right p-3 text-green-300 font-black">Total</th>
                      </tr>
                    </thead>
                    <tbody>
                      {vestingSchedule.map((schedule, idx) => (
                        <tr key={idx} className="border-b border-blue-500/10">
                          <td className="p-3 text-white font-bold">{schedule.month}</td>
                          <td className="text-right p-3 text-blue-200">{schedule.treasury}%</td>
                          <td className="text-right p-3 text-purple-200">{schedule.team}%</td>
                          <td className="text-right p-3 text-green-200">{schedule.investors}%</td>
                          <td className="text-right p-3 text-yellow-200">{schedule.publicSale || '-'}%</td>
                          <td className="text-right p-3 text-pink-200">{schedule.community}%</td>
                          <td className="text-right p-3 text-green-300 font-black">{schedule.total}M</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </CardContent>
            </Card>

            {/* Value Accrual */}
            <div className="grid md:grid-cols-2 gap-6">
              <Card className="bg-gradient-to-br from-orange-900/30 to-red-900/30 border-2 border-orange-500/50">
                <CardHeader>
                  <CardTitle className="text-white flex items-center gap-2">
                    <Flame className="h-5 w-5 text-orange-400" />
                    Deflationary Mechanism
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="p-4 bg-black/40 rounded-lg">
                    <div className="text-sm text-orange-300/70 mb-2">Buyback Source</div>
                    <div className="text-xl font-black text-white mb-2">30% of Portfolio Net Profits</div>
                    <div className="text-sm text-orange-300">Converted to USDC → Buy AND → Burn</div>
                  </div>
                  <div className="space-y-2">
                    <div className="flex justify-between text-sm">
                      <span className="text-blue-300/70">Year 1 Burn</span>
                      <span className="text-white font-bold">9M tokens</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span className="text-blue-300/70">Year 5 Burn</span>
                      <span className="text-white font-bold">46M tokens/year</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span className="text-blue-300/70">Cumulative (Y1-Y5)</span>
                      <span className="text-green-400 font-black">~120M tokens (12%)</span>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card className="bg-gradient-to-br from-blue-900/30 to-cyan-900/30 border-2 border-blue-500/50">
                <CardHeader>
                  <CardTitle className="text-white flex items-center gap-2">
                    <Award className="h-5 w-5 text-blue-400" />
                    Staking Rewards
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="p-4 bg-black/40 rounded-lg">
                    <div className="text-sm text-blue-300/70 mb-2">Reward Pool</div>
                    <div className="text-xl font-black text-white mb-2">100M AND (10% of supply)</div>
                    <div className="text-sm text-blue-300">Distributed over 5 years</div>
                  </div>
                  <div className="space-y-2">
                    <div className="flex justify-between text-sm">
                      <span className="text-blue-300/70">Annual Distribution</span>
                      <span className="text-white font-bold">20M tokens/year</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span className="text-blue-300/70">Base APY (12mo)</span>
                      <span className="text-white font-bold">5.0%</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span className="text-blue-300/70">Max APY (24mo)</span>
                      <span className="text-green-400 font-black">10.0%</span>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </motion.div>
        </AnimatePresence>
      )}

      {/* Staking Tab */}
      {activeTab === 'staking' && (
        <AnimatePresence mode="wait">
          <motion.div
            key="staking"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="space-y-8"
          >
            <Card className="bg-gradient-to-br from-black/60 to-black/40 border-blue-500/30">
              <CardHeader>
                <CardTitle className="text-2xl text-white flex items-center gap-2">
                  <Lock className="h-6 w-6 text-purple-400" />
                  Staking Tiers & Multipliers
                </CardTitle>
                <p className="text-blue-200/70">Lock tokens to increase voting power and earn higher APY</p>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {stakingTiers.map((tier, idx) => (
                    <motion.div
                      key={idx}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: idx * 0.1 }}
                      className="p-6 bg-black/40 rounded-xl border border-blue-500/20 hover:border-blue-400/50 transition-all"
                    >
                      <div className="flex items-center justify-between mb-4">
                        <div className="flex items-center gap-4">
                          <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${tier.color} p-3 flex items-center justify-center`}>
                            <Lock className="h-6 w-6 text-white" />
                          </div>
                          <div>
                            <div className="text-xl font-black text-white">{tier.duration}</div>
                            <div className="text-sm text-blue-300/70">Lock Period</div>
                          </div>
                        </div>
                        <Badge className="bg-green-500/20 text-green-400 border-green-500/40 px-4 py-2 text-lg font-black">
                          {tier.apy} APY
                        </Badge>
                      </div>
                      
                      <div className="grid grid-cols-3 gap-4">
                        <div className="p-3 bg-blue-500/10 rounded-lg text-center">
                          <div className="text-2xl font-black text-blue-400">{tier.voting}</div>
                          <div className="text-xs text-blue-300/70">Voting Power</div>
                        </div>
                        <div className="p-3 bg-green-500/10 rounded-lg text-center">
                          <div className="text-2xl font-black text-green-400">{tier.rewards}</div>
                          <div className="text-xs text-green-300/70">Reward Multiplier</div>
                        </div>
                        <div className="p-3 bg-red-500/10 rounded-lg text-center">
                          <div className="text-2xl font-black text-red-400">{tier.penalty}</div>
                          <div className="text-xs text-red-300/70">Early Penalty</div>
                        </div>
                      </div>
                    </motion.div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Staking Calculator */}
            <Card className="bg-gradient-to-br from-purple-900/30 to-pink-900/30 border-2 border-purple-500/50">
              <CardHeader>
                <CardTitle className="text-white flex items-center gap-2">
                  <Zap className="h-5 w-5 text-purple-400" />
                  Staking Rewards Calculator
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-6">
                  <div className="p-6 bg-black/40 rounded-xl">
                    <div className="text-center mb-6">
                      <div className="text-sm text-purple-300/70 mb-2">Example: 10,000 AND staked for 12 months</div>
                      <div className="text-5xl font-black text-white mb-2">750 AND</div>
                      <div className="text-purple-300">First Year Rewards (7.5% effective APY)</div>
                    </div>
                    
                    <div className="grid md:grid-cols-3 gap-4">
                      <div className="p-4 bg-purple-500/10 rounded-lg text-center">
                        <div className="text-sm text-purple-300/70 mb-1">Base Stake</div>
                        <div className="text-2xl font-black text-white">10,000</div>
                      </div>
                      <div className="p-4 bg-blue-500/10 rounded-lg text-center">
                        <div className="text-sm text-blue-300/70 mb-1">Voting Power</div>
                        <div className="text-2xl font-black text-blue-400">20,000</div>
                        <div className="text-xs text-blue-300/70">(2.0x multiplier)</div>
                      </div>
                      <div className="p-4 bg-green-500/10 rounded-lg text-center">
                        <div className="text-sm text-green-300/70 mb-1">Year 1 Value</div>
                        <div className="text-2xl font-black text-green-400">10,750</div>
                        <div className="text-xs text-green-300/70">(+7.5%)</div>
                      </div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        </AnimatePresence>
      )}

      {/* Governance Tab */}
      {activeTab === 'governance' && (
        <AnimatePresence mode="wait">
          <motion.div
            key="governance"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="space-y-8"
          >
            {/* Active Proposals */}
            <Card className="bg-gradient-to-br from-black/60 to-black/40 border-blue-500/30">
              <CardHeader>
                <CardTitle className="text-2xl text-white flex items-center gap-2">
                  <Vote className="h-6 w-6 text-blue-400" />
                  Active Governance Proposals
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {governanceProposals.map((proposal, idx) => (
                    <div key={idx} className="p-6 bg-black/40 rounded-xl border border-blue-500/20 hover:border-blue-400/50 transition-all">
                      <div className="flex items-start justify-between mb-4">
                        <div className="flex-1">
                          <div className="flex items-center gap-3 mb-2">
                            <Badge className="bg-blue-500/20 text-blue-400 border-blue-500/40">
                              {proposal.id}
                            </Badge>
                            <Badge className={`${
                              proposal.type === 'Treasury' ? 'bg-green-500/20 text-green-400 border-green-500/40' :
                              proposal.type === 'Constitutional' ? 'bg-purple-500/20 text-purple-400 border-purple-500/40' :
                              'bg-blue-500/20 text-blue-400 border-blue-500/40'
                            }`}>
                              {proposal.type}
                            </Badge>
                          </div>
                          <div className="text-xl font-black text-white mb-2">{proposal.title}</div>
                          <div className="flex items-center gap-4 text-sm">
                            <div className="flex items-center gap-2 text-blue-300">
                              <Clock className="h-4 w-4" />
                              {proposal.endsIn}
                            </div>
                            <div className="flex items-center gap-2 text-green-300">
                              <Users className="h-4 w-4" />
                              {proposal.quorum}% quorum
                            </div>
                          </div>
                        </div>
                        <Badge className={`${
                          proposal.status === 'Active' ? 'bg-green-500 text-white' :
                          proposal.status === 'Pending' ? 'bg-yellow-500 text-black' :
                          'bg-gray-500 text-white'
                        } px-4 py-2`}>
                          {proposal.status}
                        </Badge>
                      </div>
                      
                      {proposal.status !== 'Pending' && (
                        <div className="space-y-2">
                          <div className="flex justify-between text-sm mb-1">
                            <span className="text-green-400">FOR {proposal.votes.for}%</span>
                            <span className="text-red-400">AGAINST {proposal.votes.against}%</span>
                          </div>
                          <div className="h-3 bg-black/40 rounded-full overflow-hidden flex">
                            <div className="bg-green-500" style={{ width: `${proposal.votes.for}%` }} />
                            <div className="bg-red-500" style={{ width: `${proposal.votes.against}%` }} />
                            <div className="bg-gray-500" style={{ width: `${proposal.votes.abstain}%` }} />
                          </div>
                          <div className="flex justify-between text-xs text-blue-300/70">
                            <span>FOR: {proposal.votes.for}%</span>
                            <span>ABSTAIN: {proposal.votes.abstain}%</span>
                            <span>AGAINST: {proposal.votes.against}%</span>
                          </div>
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Governance Parameters */}
            <div className="grid md:grid-cols-2 gap-6">
              <Card className="bg-gradient-to-br from-blue-900/30 to-cyan-900/30 border-2 border-blue-500/50">
                <CardHeader>
                  <CardTitle className="text-white flex items-center gap-2">
                    <Target className="h-5 w-5 text-blue-400" />
                    Proposal Requirements
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  {[
                    { type: 'Standard', threshold: '10,000 AND', quorum: '5%', pass: '>50%' },
                    { type: 'Treasury', threshold: '50,000 AND', quorum: '10%', pass: '>66%' },
                    { type: 'Emergency', threshold: '100,000 AND', quorum: '20%', pass: '>75%' },
                    { type: 'Constitutional', threshold: '200,000 AND', quorum: '30%', pass: '>80%' },
                  ].map((req, idx) => (
                    <div key={idx} className="p-4 bg-black/40 rounded-lg">
                      <div className="text-white font-bold mb-2">{req.type}</div>
                      <div className="grid grid-cols-3 gap-2 text-xs">
                        <div>
                          <div className="text-blue-300/70">Threshold</div>
                          <div className="text-blue-300 font-bold">{req.threshold}</div>
                        </div>
                        <div>
                          <div className="text-green-300/70">Quorum</div>
                          <div className="text-green-300 font-bold">{req.quorum}</div>
                        </div>
                        <div>
                          <div className="text-purple-300/70">Pass</div>
                          <div className="text-purple-300 font-bold">{req.pass}</div>
                        </div>
                      </div>
                    </div>
                  ))}
                </CardContent>
              </Card>

              <Card className="bg-gradient-to-br from-purple-900/30 to-pink-900/30 border-2 border-purple-500/50">
                <CardHeader>
                  <CardTitle className="text-white flex items-center gap-2">
                    <Gavel className="h-5 w-5 text-purple-400" />
                    Progressive Decentralization
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  {[
                    { phase: 'Year 1', status: 'Current', control: 'Founder-Led', description: 'Founders have veto power' },
                    { phase: 'Year 2', status: 'Next', control: 'Hybrid', description: 'Shared control with community' },
                    { phase: 'Year 3+', status: 'Future', control: 'Full DAO', description: 'Complete community control' },
                  ].map((phase, idx) => (
                    <div key={idx} className="p-4 bg-black/40 rounded-lg border-l-4 border-purple-500">
                      <div className="flex items-center gap-2 mb-2">
                        <div className="text-white font-bold">{phase.phase}</div>
                        <Badge className={`${
                          phase.status === 'Current' ? 'bg-green-500 text-white' :
                          phase.status === 'Next' ? 'bg-blue-500 text-white' :
                          'bg-gray-500 text-white'
                        }`}>
                          {phase.status}
                        </Badge>
                      </div>
                      <div className="text-purple-300 font-bold mb-1">{phase.control}</div>
                      <div className="text-sm text-purple-200/70">{phase.description}</div>
                    </div>
                  ))}
                </CardContent>
              </Card>
            </div>
          </motion.div>
        </AnimatePresence>
      )}

      {/* Legal Tab */}
      {activeTab === 'legal' && (
        <AnimatePresence mode="wait">
          <motion.div
            key="legal"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="space-y-8"
          >
            {/* Legal Milestones */}
            <Card className="bg-gradient-to-br from-black/60 to-black/40 border-blue-500/30">
              <CardHeader>
                <CardTitle className="text-2xl text-white flex items-center gap-2">
                  <Scale className="h-6 w-6 text-blue-400" />
                  Legal & Compliance Roadmap
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-6">
                  {legalMilestones.map((milestone, idx) => (
                    <div key={idx} className="relative pl-8 pb-6 border-l-2 border-blue-500/30 last:border-0">
                      <div className={`absolute left-[-9px] top-0 w-4 h-4 rounded-full ${
                        milestone.status === 'Complete' ? 'bg-green-500' :
                        milestone.status === 'In Progress' ? 'bg-blue-500' :
                        'bg-gray-500'
                      }`} />
                      
                      <div className="flex items-start justify-between mb-3">
                        <div>
                          <div className="text-xl font-black text-white mb-1">{milestone.phase}</div>
                          <div className="text-sm text-blue-300/70">{milestone.date}</div>
                        </div>
                        <Badge className={`${
                          milestone.status === 'Complete' ? 'bg-green-500 text-white' :
                          milestone.status === 'In Progress' ? 'bg-blue-500 text-white' :
                          'bg-gray-500 text-white'
                        }`}>
                          {milestone.status}
                        </Badge>
                      </div>
                      
                      <div className="space-y-2">
                        {milestone.items.map((item, itemIdx) => (
                          <div key={itemIdx} className="flex items-center gap-2 text-blue-200">
                            {milestone.status === 'Complete' ? (
                              <CheckCircle className="h-4 w-4 text-green-400 flex-shrink-0" />
                            ) : (
                              <div className="w-4 h-4 rounded-full border-2 border-blue-500/40 flex-shrink-0" />
                            )}
                            <span className="text-sm">{item}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Entity Structure */}
            <Card className="bg-gradient-to-br from-blue-900/30 to-purple-900/30 border-2 border-blue-500/50">
              <CardHeader>
                <CardTitle className="text-white flex items-center gap-2">
                  <FileText className="h-5 w-5 text-blue-400" />
                  Entity Structure
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="p-4 bg-black/40 rounded-lg border-l-4 border-blue-500">
                    <div className="text-white font-black mb-2">WXZA Inc. (Delaware C-Corp)</div>
                    <div className="text-sm text-blue-200/70">
                      • Operates 9 portfolio ventures<br />
                      • Employs team in U.S.<br />
                      • Owns IP and trademarks
                    </div>
                  </div>
                  
                  <div className="text-center text-blue-400">↓ Service Agreement</div>
                  
                  <div className="p-4 bg-black/40 rounded-lg border-l-4 border-green-500">
                    <div className="text-white font-black mb-2">WXZA Foundation (Swiss Foundation)</div>
                    <div className="text-sm text-green-200/70">
                      • Issues AND tokens<br />
                      • Holds treasury tokens<br />
                      • Manages token governance
                    </div>
                  </div>
                  
                  <div className="text-center text-blue-400">↓ Revenue Share Agreement</div>
                  
                  <div className="p-4 bg-black/40 rounded-lg border-l-4 border-purple-500">
                    <div className="text-white font-black mb-2">Portfolio SPVs (Cayman Islands)</div>
                    <div className="text-sm text-purple-200/70">
                      • Each venture operates via separate SPV<br />
                      • Profits flow to WXZA Inc. (30%)<br />
                      • Distributed via buyback mechanism
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Compliance & Audits */}
            <div className="grid md:grid-cols-2 gap-6">
              <Card className="bg-gradient-to-br from-green-900/30 to-emerald-900/30 border-2 border-green-500/50">
                <CardHeader>
                  <CardTitle className="text-white flex items-center gap-2">
                    <Shield className="h-5 w-5 text-green-400" />
                    Security Audits
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  {[
                    { firm: 'CertiK', status: 'Complete', score: '98/100', date: 'May 2026' },
                    { firm: 'Trail of Bits', status: 'Complete', score: '96/100', date: 'May 2026' },
                    { firm: 'Bug Bounty Program', status: 'Active', score: '$500K pool', date: 'Ongoing' },
                  ].map((audit, idx) => (
                    <div key={idx} className="p-4 bg-black/40 rounded-lg flex items-center justify-between">
                      <div>
                        <div className="text-white font-bold">{audit.firm}</div>
                        <div className="text-sm text-green-200/70">{audit.date}</div>
                      </div>
                      <div className="text-right">
                        <Badge className={`${
                          audit.status === 'Complete' ? 'bg-green-500 text-white' : 'bg-blue-500 text-white'
                        } mb-1`}>
                          {audit.status}
                        </Badge>
                        <div className="text-sm text-green-300 font-bold">{audit.score}</div>
                      </div>
                    </div>
                  ))}
                </CardContent>
              </Card>

              <Card className="bg-gradient-to-br from-orange-900/30 to-red-900/30 border-2 border-orange-500/50">
                <CardHeader>
                  <CardTitle className="text-white flex items-center gap-2">
                    <AlertTriangle className="h-5 w-5 text-orange-400" />
                    Risk Disclosures
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-2 text-sm">
                  {[
                    'Token value may decline to zero (investment risk)',
                    'No guarantees on returns or buyback amounts',
                    'Regulatory changes may affect token classification',
                    'Smart contract risks (bugs, exploits, hacks)',
                    'Venture failure may reduce portfolio value',
                  ].map((risk, idx) => (
                    <div key={idx} className="flex items-start gap-2 p-3 bg-black/40 rounded-lg">
                      <AlertTriangle className="h-4 w-4 text-orange-400 flex-shrink-0 mt-0.5" />
                      <span className="text-orange-200/80">{risk}</span>
                    </div>
                  ))}
                </CardContent>
              </Card>
            </div>
          </motion.div>
        </AnimatePresence>
      )}
    </div>
  );
}
