import { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";
import { Button } from "../ui/button";
import { Badge } from "../ui/badge";
import { Progress } from "../ui/progress";
import { Slider } from "../ui/slider";
import { 
  ArrowLeft, 
  Vote, 
  ArrowRight, 
  Check, 
  TrendingUp,
  Users,
  DollarSign,
  Clock,
  Target,
  ChevronRight,
  Zap,
  Shield,
  Award,
  Coins,
  Timer,
  Star,
  BarChart3,
  Activity,
  Sparkles,
  Trophy,
  Flame
} from "lucide-react";

interface StakingGovernanceWalkthroughProps {
  onBack: () => void;
}

export function StakingGovernanceWalkthrough({ onBack }: StakingGovernanceWalkthroughProps) {
  const [currentFrame, setCurrentFrame] = useState(1);
  const [stakeAmount, setStakeAmount] = useState([1000]);
  const [selectedPool, setSelectedPool] = useState('governance');
  const [showStakeModal, setShowStakeModal] = useState(false);
  const [stakeConfirmed, setStakeConfirmed] = useState(false);
  const [selectedProposal, setSelectedProposal] = useState(0);
  const [voteWeight, setVoteWeight] = useState([75]);
  const [hasVoted, setHasVoted] = useState(false);
  const [showVoteModal, setShowVoteModal] = useState(false);
  const [showSuccessAnimation, setShowSuccessAnimation] = useState(false);

  const frames = [
    { id: 1, title: 'Dashboard', description: 'Connected wallet with staking overview' },
    { id: 2, title: 'Staking Hub', description: 'Choose staking pools and APY options' },
    { id: 3, title: 'Stake Configuration', description: 'Configure stake amount with live projections' },
    { id: 4, title: 'Governance', description: 'Browse and analyze active proposals' },
    { id: 5, title: 'Vote & Confirm', description: 'Cast weighted vote with confirmation' }
  ];

  const stakingPools = [
    {
      id: 'standard',
      name: 'Standard Pool',
      apy: 8.5,
      description: 'Basic staking with competitive rewards and flexible terms',
      tvl: '$18.7M',
      userStaked: 750,
      minStake: 100,
      lockPeriod: 'Flexible',
      participants: 2847,
      gradient: 'from-blue-500 to-cyan-500',
      icon: '⚡',
      features: ['Flexible unstaking', 'Basic rewards', 'Community access']
    },
    {
      id: 'governance',
      name: 'Governance Pool',
      apy: 12.8,
      description: 'Enhanced rewards with full voting power and governance benefits',
      tvl: '$24.3M',
      userStaked: 2250,
      minStake: 500,
      lockPeriod: '30 days',
      participants: 1245,
      gradient: 'from-purple-500 to-indigo-500',
      icon: '🏛️',
      popular: true,
      features: ['Voting power', 'Premium APY', 'Exclusive proposals', 'Priority support']
    },
    {
      id: 'venture',
      name: 'Venture Pool',
      apy: 15.2,
      description: 'Maximum rewards for venture portfolio supporters with locked staking',
      tvl: '$12.8M',
      userStaked: 0,
      minStake: 1000,
      lockPeriod: '90 days',
      participants: 623,
      gradient: 'from-emerald-500 to-green-500',
      icon: '🚀',
      exclusive: true,
      features: ['Highest APY', 'Venture rewards', 'Token airdrops', 'Early access']
    }
  ];

  const proposals = [
    {
      id: 1,
      title: 'Expand Venture Portfolio: AI & Robotics Focus',
      description: 'Allocate 25% of treasury funds ($48M) toward acquiring equity stakes in breakthrough AI and robotics ventures, including autonomous systems and neural interface technologies.',
      votesFor: 2847563,
      votesAgainst: 425123,
      timeRemaining: '2 days 14h',
      quorum: 78,
      status: 'active',
      category: 'Treasury',
      impact: 'High',
      requiredStake: 1000,
      proposer: 'Venture Committee',
      details: {
        funding: '$48M',
        timeline: '6 months',
        expectedReturn: '25-35% IRR',
        ventures: ['Neural Interface Co.', 'Autonomous Systems Ltd.', 'Quantum Robotics Inc.']
      }
    },
    {
      id: 2,
      title: 'Enhanced Staking Rewards Algorithm v2.0',
      description: 'Implement dynamic staking rewards that adjust based on network participation, governance activity, and overall ecosystem health to maximize long-term value.',
      votesFor: 1876543,
      votesAgainst: 234567,
      timeRemaining: '5 days 8h',
      quorum: 65,
      status: 'active',
      category: 'Protocol',
      impact: 'Medium',
      requiredStake: 500,
      proposer: 'Technical Committee',
      details: {
        funding: 'Protocol upgrade',
        timeline: '3 months',
        expectedReturn: '8-15% APY increase',
        benefits: ['Dynamic rewards', 'Participation bonuses', 'Anti-whale measures']
      }
    },
    {
      id: 3,
      title: 'AND DeFi Integration & Liquidity Program',
      description: 'Launch comprehensive DeFi integration with Uniswap, Curve, and Balancer including $10M liquidity mining program to enhance AND token utility and accessibility.',
      votesFor: 3456789,
      votesAgainst: 123456,
      timeRemaining: '1 week 3d',
      quorum: 89,
      status: 'active',
      category: 'DeFi',
      impact: 'High',
      requiredStake: 750,
      proposer: 'DeFi Working Group',
      details: {
        funding: '$10M',
        timeline: '4 months',
        expectedReturn: 'Increased liquidity & adoption',
        platforms: ['Uniswap V3', 'Curve Finance', 'Balancer V2']
      }
    }
  ];

  const userStats = {
    totalStaked: 2250,
    currentAPY: 12.8,
    votingPower: 3500,
    rewardsEarned: 847,
    proposalsVoted: 23,
    stakingTier: 'Governance',
    monthlyRewards: 24.1,
    stakingDuration: 127
  };

  const calculateEstimatedRewards = () => {
    const pool = stakingPools.find(p => p.id === selectedPool);
    const dailyReward = (stakeAmount[0] * (pool?.apy || 0) / 100) / 365;
    return dailyReward;
  };

  const formatNumber = (num: number) => {
    return new Intl.NumberFormat('en-US').format(num);
  };

  // Success animation effect
  useEffect(() => {
    if (hasVoted) {
      setShowSuccessAnimation(true);
      const timer = setTimeout(() => setShowSuccessAnimation(false), 3000);
      return () => clearTimeout(timer);
    }
  }, [hasVoted]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-white to-indigo-50 dark:from-purple-950 dark:via-background dark:to-indigo-950">
      <div className="container mx-auto px-4 py-8 max-w-6xl">
        {/* Header */}
        <div className="mb-8">
          <Button 
            onClick={onBack}
            variant="ghost" 
            className="mb-6 hover:bg-purple-100 dark:hover:bg-purple-900/20"
          >
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back to Walkthroughs
          </Button>
          
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold text-purple-900 dark:text-purple-100">
                Staking & Governance Participation
              </h1>
              <p className="text-purple-700 dark:text-purple-300 mt-2">
                Frame {currentFrame} of {frames.length}: {frames[currentFrame - 1]?.description}
              </p>
            </div>
            <Badge className="bg-purple-500 text-white px-4 py-2">
              <Vote className="h-4 w-4 mr-2" />
              Walkthrough B
            </Badge>
          </div>
        </div>

        {/* Progress Bar */}
        <div className="mb-8">
          <div className="flex items-center justify-between mb-2">
            <span className="text-sm font-medium text-purple-700 dark:text-purple-300">Progress</span>
            <span className="text-sm text-purple-600 dark:text-purple-400">{currentFrame}/{frames.length}</span>
          </div>
          <Progress value={(currentFrame / frames.length) * 100} className="h-2" />
        </div>

        {/* Enhanced User Stats */}
        <div className="mb-8 grid grid-cols-2 md:grid-cols-5 gap-4">
          <Card className="bg-gradient-to-r from-purple-100 to-indigo-100 dark:from-purple-900/30 dark:to-indigo-900/30 border-purple-200 dark:border-purple-800">
            <CardContent className="pt-4 text-center">
              <div className="flex items-center justify-center gap-1 mb-1">
                <Coins className="h-4 w-4 text-purple-600" />
                <div className="text-lg font-bold text-purple-600">{formatNumber(userStats.totalStaked)}</div>
              </div>
              <div className="text-xs text-purple-700 dark:text-purple-300">AND Staked</div>
            </CardContent>
          </Card>
          
          <Card className="bg-gradient-to-r from-green-100 to-emerald-100 dark:from-green-900/30 dark:to-emerald-900/30 border-green-200 dark:border-green-800">
            <CardContent className="pt-4 text-center">
              <div className="flex items-center justify-center gap-1 mb-1">
                <TrendingUp className="h-4 w-4 text-green-600" />
                <div className="text-lg font-bold text-green-600">{userStats.currentAPY}%</div>
              </div>
              <div className="text-xs text-green-700 dark:text-green-300">Current APY</div>
            </CardContent>
          </Card>
          
          <Card className="bg-gradient-to-r from-blue-100 to-cyan-100 dark:from-blue-900/30 dark:to-cyan-900/30 border-blue-200 dark:border-blue-800">
            <CardContent className="pt-4 text-center">
              <div className="flex items-center justify-center gap-1 mb-1">
                <Vote className="h-4 w-4 text-blue-600" />
                <div className="text-lg font-bold text-blue-600">{formatNumber(userStats.votingPower)}</div>
              </div>
              <div className="text-xs text-blue-700 dark:text-blue-300">Voting Power</div>
            </CardContent>
          </Card>
          
          <Card className="bg-gradient-to-r from-yellow-100 to-orange-100 dark:from-yellow-900/30 dark:to-orange-900/30 border-yellow-200 dark:border-yellow-800">
            <CardContent className="pt-4 text-center">
              <div className="flex items-center justify-center gap-1 mb-1">
                <Award className="h-4 w-4 text-yellow-600" />
                <div className="text-lg font-bold text-yellow-600">{userStats.rewardsEarned}</div>
              </div>
              <div className="text-xs text-yellow-700 dark:text-yellow-300">AND Earned</div>
            </CardContent>
          </Card>
          
          <Card className="bg-gradient-to-r from-pink-100 to-rose-100 dark:from-pink-900/30 dark:to-rose-900/30 border-pink-200 dark:border-pink-800">
            <CardContent className="pt-4 text-center">
              <div className="flex items-center justify-center gap-1 mb-1">
                <Trophy className="h-4 w-4 text-pink-600" />
                <div className="text-lg font-bold text-pink-600">{userStats.proposalsVoted}</div>
              </div>
              <div className="text-xs text-pink-700 dark:text-pink-300">Votes Cast</div>
            </CardContent>
          </Card>
        </div>

        {/* Frame Navigation */}
        <div className="mb-8">
          <div className="flex gap-2 overflow-x-auto">
            {frames.map((frame) => (
              <Button
                key={frame.id}
                onClick={() => setCurrentFrame(frame.id)}
                variant={currentFrame === frame.id ? 'default' : 'outline'}
                size="sm"
                className={`whitespace-nowrap ${
                  currentFrame === frame.id 
                    ? 'bg-purple-600 text-white' 
                    : 'border-purple-200 text-purple-700 hover:bg-purple-50 dark:border-purple-800 dark:text-purple-300 dark:hover:bg-purple-900/20'
                }`}
              >
                {frame.title}
              </Button>
            ))}
          </div>
        </div>

        {/* Frame Content */}
        <Card className="min-h-96 bg-white/60 dark:bg-gray-900/60 backdrop-blur-sm border-purple-200 dark:border-purple-800">
          <CardContent className="p-8">
            
            {/* Frame 1: Enhanced Dashboard */}
            {currentFrame === 1 && (
              <div className="space-y-6">
                <div className="text-center">
                  <h2 className="text-2xl font-bold text-purple-900 dark:text-purple-100 mb-2">
                    AND Token Staking Dashboard
                  </h2>
                  <p className="text-purple-700 dark:text-purple-300">
                    Your connected wallet is ready for advanced staking and governance participation
                  </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  {/* Enhanced Wallet Balance */}
                  <Card className="bg-gradient-to-br from-purple-500 to-indigo-500 text-white border-0 relative overflow-hidden">
                    <div className="absolute top-0 right-0 w-20 h-20 bg-white/10 rounded-full -translate-y-10 translate-x-10" />
                    <CardContent className="pt-6 relative">
                      <div className="space-y-3">
                        <div className="flex items-center justify-between">
                          <div className="text-purple-100">AND Balance</div>
                          <Sparkles className="h-5 w-5 text-purple-200 animate-pulse" />
                        </div>
                        <div className="text-3xl font-bold">12,847</div>
                        <div className="text-purple-200 text-sm flex items-center gap-2">
                          <DollarSign className="h-4 w-4" />
                          ≈ $3,854 USD
                        </div>
                        <div className="text-purple-300 text-xs">
                          0x7a4f...8d2c
                        </div>
                      </div>
                    </CardContent>
                  </Card>

                  {/* Enhanced Staking Summary */}
                  <Card className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm border border-purple-200 dark:border-purple-800">
                    <CardHeader>
                      <CardTitle className="text-sm text-muted-foreground flex items-center gap-2">
                        <Shield className="h-4 w-4" />
                        Active Staking
                      </CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-3">
                      <div className="text-2xl font-bold text-purple-600">{formatNumber(userStats.totalStaked)} AND</div>
                      <div className="space-y-2">
                        <div className="flex items-center justify-between text-sm">
                          <span className="text-purple-700 dark:text-purple-300">Earning</span>
                          <span className="font-bold text-green-600">{userStats.currentAPY}% APY</span>
                        </div>
                        <div className="flex items-center justify-between text-sm">
                          <span className="text-purple-700 dark:text-purple-300">Daily</span>
                          <span className="font-bold text-green-600">+{userStats.monthlyRewards.toFixed(1)} AND</span>
                        </div>
                        <div className="flex items-center justify-between text-sm">
                          <span className="text-purple-700 dark:text-purple-300">Duration</span>
                          <span className="font-bold text-blue-600">{userStats.stakingDuration} days</span>
                        </div>
                      </div>
                      <Progress value={75} className="h-2" />
                      <div className="text-xs text-purple-600 dark:text-purple-400">Tier: {userStats.stakingTier}</div>
                    </CardContent>
                  </Card>

                  {/* Enhanced Quick Actions */}
                  <Card className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm border border-purple-200 dark:border-purple-800">
                    <CardHeader>
                      <CardTitle className="text-sm text-muted-foreground flex items-center gap-2">
                        <Zap className="h-4 w-4" />
                        Quick Actions
                      </CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-3">
                      <Button 
                        onClick={() => setCurrentFrame(2)}
                        className="w-full bg-gradient-to-r from-purple-600 to-indigo-600 text-white hover:shadow-lg transition-all duration-200"
                      >
                        <span className="bg-yellow-400 text-yellow-900 px-1 py-0.5 rounded text-xs font-bold mr-2">[HS]</span>
                        <Coins className="h-4 w-4 mr-2" />
                        Stake More
                      </Button>
                      <Button 
                        onClick={() => setCurrentFrame(4)}
                        variant="outline" 
                        className="w-full border-purple-300 text-purple-700 hover:bg-purple-50 dark:border-purple-700 dark:text-purple-300"
                      >
                        <Vote className="h-4 w-4 mr-2" />
                        Governance
                      </Button>
                      <Button variant="outline" className="w-full">
                        <TrendingUp className="h-4 w-4 mr-2" />
                        Claim Rewards
                      </Button>
                    </CardContent>
                  </Card>
                </div>

                {/* Recent Activity */}
                <Card className="bg-gradient-to-r from-purple-50 to-indigo-50 dark:from-purple-950/30 dark:to-indigo-950/30 border border-purple-200 dark:border-purple-800">
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <Activity className="h-5 w-5 text-purple-600" />
                      Recent Activity
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                      <div className="flex items-center justify-between p-3 bg-white/60 dark:bg-gray-800/60 rounded-lg">
                        <div className="flex items-center gap-2">
                          <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse" />
                          <span className="text-sm">Rewards Claimed</span>
                        </div>
                        <span className="text-green-600 font-bold">+24.1 AND</span>
                      </div>
                      <div className="flex items-center justify-between p-3 bg-white/60 dark:bg-gray-800/60 rounded-lg">
                        <div className="flex items-center gap-2">
                          <div className="w-2 h-2 bg-blue-500 rounded-full" />
                          <span className="text-sm">Voted on Proposal</span>
                        </div>
                        <span className="text-blue-600 font-bold">#3</span>
                      </div>
                      <div className="flex items-center justify-between p-3 bg-white/60 dark:bg-gray-800/60 rounded-lg">
                        <div className="flex items-center gap-2">
                          <div className="w-2 h-2 bg-purple-500 rounded-full" />
                          <span className="text-sm">Staking Tier</span>
                        </div>
                        <span className="text-purple-600 font-bold">Upgraded</span>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                <div className="text-center">
                  <p className="text-sm text-purple-600 dark:text-purple-400">
                    ↑ Click "Stake More" to explore enhanced staking pools
                  </p>
                </div>
              </div>
            )}

            {/* Frame 2: Enhanced Staking Hub */}
            {currentFrame === 2 && (
              <div className="space-y-6">
                <div className="text-center">
                  <h2 className="text-2xl font-bold text-purple-900 dark:text-purple-100 mb-2">
                    Advanced Staking Hub
                  </h2>
                  <p className="text-purple-700 dark:text-purple-300">
                    Choose from premium staking pools with competitive APYs and exclusive benefits
                  </p>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                  {stakingPools.map((pool) => (
                    <Card 
                      key={pool.id}
                      className={`cursor-pointer transition-all duration-300 hover:scale-105 border-2 relative overflow-hidden ${
                        selectedPool === pool.id 
                          ? 'border-purple-500 shadow-lg shadow-purple-500/20' 
                          : 'border-purple-200 dark:border-purple-800 hover:border-purple-400'
                      }`}
                      onClick={() => setSelectedPool(pool.id)}
                    >
                      {/* Enhanced badges */}
                      <div className="absolute top-3 right-3 z-10 flex flex-col gap-1">
                        {pool.popular && (
                          <Badge className="bg-gradient-to-r from-yellow-500 to-orange-500 text-black text-xs">
                            <Star className="h-3 w-3 mr-1" />
                            Popular
                          </Badge>
                        )}
                        {pool.exclusive && (
                          <Badge className="bg-gradient-to-r from-purple-500 to-pink-500 text-white text-xs">
                            <Flame className="h-3 w-3 mr-1" />
                            Exclusive
                          </Badge>
                        )}
                      </div>

                      <CardHeader className="space-y-4">
                        <div className="flex items-center gap-3">
                          <div className={`w-12 h-12 bg-gradient-to-br ${pool.gradient} rounded-xl flex items-center justify-center text-xl group-hover:scale-110 transition-transform shadow-lg`}>
                            {pool.icon}
                          </div>
                          <div className="flex-1">
                            <h3 className="font-bold text-purple-900 dark:text-purple-100 group-hover:text-purple-600 transition-colors">
                              {pool.name}
                            </h3>
                            <div className="text-3xl font-bold text-purple-600 mt-1">
                              {pool.apy}% APY
                            </div>
                          </div>
                        </div>
                        
                        <p className="text-purple-700 dark:text-purple-300 text-sm">
                          {pool.description}
                        </p>
                      </CardHeader>

                      <CardContent className="space-y-4">
                        {/* Key metrics */}
                        <div className="grid grid-cols-2 gap-3 text-sm">
                          <div className="bg-purple-50 dark:bg-purple-950/30 p-2 rounded">
                            <div className="text-purple-600 dark:text-purple-400">TVL</div>
                            <div className="font-bold">{pool.tvl}</div>
                          </div>
                          <div className="bg-purple-50 dark:bg-purple-950/30 p-2 rounded">
                            <div className="text-purple-600 dark:text-purple-400">Lock Period</div>
                            <div className="font-bold">{pool.lockPeriod}</div>
                          </div>
                          <div className="bg-purple-50 dark:bg-purple-950/30 p-2 rounded">
                            <div className="text-purple-600 dark:text-purple-400">Your Stake</div>
                            <div className="font-bold">{formatNumber(pool.userStaked)} AND</div>
                          </div>
                          <div className="bg-purple-50 dark:bg-purple-950/30 p-2 rounded">
                            <div className="text-purple-600 dark:text-purple-400">Participants</div>
                            <div className="font-bold">{formatNumber(pool.participants)}</div>
                          </div>
                        </div>

                        {/* Features */}
                        <div className="space-y-2">
                          <div className="text-xs font-medium text-purple-700 dark:text-purple-300">Features</div>
                          <div className="flex flex-wrap gap-1">
                            {pool.features.map((feature, index) => (
                              <Badge key={index} variant="outline" className="text-xs border-purple-300 text-purple-700 dark:border-purple-700 dark:text-purple-300">
                                {feature}
                              </Badge>
                            ))}
                          </div>
                        </div>

                        {/* Minimum stake */}
                        <div className="space-y-2">
                          <div className="flex justify-between text-sm">
                            <span className="text-purple-700 dark:text-purple-300">Minimum Stake</span>
                            <span className="font-bold text-purple-600">{formatNumber(pool.minStake)} AND</span>
                          </div>
                          <Progress value={(pool.userStaked / (pool.minStake * 4)) * 100} className="h-2" />
                        </div>

                        <Button 
                          onClick={(e) => {
                            e.stopPropagation();
                            setCurrentFrame(3);
                          }}
                          className={`w-full transition-all duration-200 ${
                            selectedPool === pool.id 
                              ? `bg-gradient-to-r ${pool.gradient} text-white hover:opacity-90 shadow-lg` 
                              : 'bg-purple-100 hover:bg-purple-200 text-purple-700 dark:bg-purple-900/30 dark:hover:bg-purple-900/50 dark:text-purple-300'
                          }`}
                        >
                          <span className="bg-yellow-400 text-yellow-900 px-1 py-0.5 rounded text-xs font-bold mr-2">[HS]</span>
                          <Coins className="h-4 w-4 mr-2" />
                          Stake in Pool
                        </Button>
                      </CardContent>

                      {/* Hover effect */}
                      <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 transform skew-x-12" />
                    </Card>
                  ))}
                </div>
              </div>
            )}

            {/* Frame 3: Enhanced Stake Configuration */}
            {currentFrame === 3 && (
              <div className="space-y-6">
                <div className="text-center">
                  <h2 className="text-2xl font-bold text-purple-900 dark:text-purple-100 mb-2">
                    Configure Your Stake
                  </h2>
                  <p className="text-purple-700 dark:text-purple-300">
                    Set your stake amount and see real-time reward projections
                  </p>
                </div>

                <div className="max-w-2xl mx-auto space-y-6">
                  {/* Selected pool info */}
                  {(() => {
                    const pool = stakingPools.find(p => p.id === selectedPool);
                    return pool ? (
                      <Card className={`bg-gradient-to-br ${pool.gradient} text-white border-0`}>
                        <CardContent className="pt-6">
                          <div className="flex items-center gap-4">
                            <div className="text-4xl">{pool.icon}</div>
                            <div>
                              <h3 className="text-xl font-bold">{pool.name}</h3>
                              <div className="text-white/80">{pool.apy}% APY • {pool.lockPeriod}</div>
                            </div>
                          </div>
                        </CardContent>
                      </Card>
                    ) : null;
                  })()}

                  <div className="space-y-4">
                    <div>
                      <label className="text-sm font-medium text-purple-900 dark:text-purple-100 block mb-3">
                        Stake Amount: {formatNumber(stakeAmount[0])} AND
                      </label>
                      <Slider
                        value={stakeAmount}
                        onValueChange={setStakeAmount}
                        max={10000}
                        min={stakingPools.find(p => p.id === selectedPool)?.minStake || 100}
                        step={100}
                        className="w-full"
                      />
                      <div className="flex justify-between text-sm text-purple-600 dark:text-purple-400 mt-2">
                        <span>{formatNumber(stakingPools.find(p => p.id === selectedPool)?.minStake || 100)} AND</span>
                        <span>Available: 10,597 AND</span>
                        <span>10,000 AND</span>
                      </div>
                    </div>

                    {/* Enhanced Reward Projection */}
                    <Card className="bg-gradient-to-br from-purple-50 to-indigo-50 dark:from-purple-950/30 dark:to-indigo-950/30 border border-purple-200 dark:border-purple-800">
                      <CardHeader>
                        <CardTitle className="text-purple-900 dark:text-purple-100 flex items-center gap-2">
                          <BarChart3 className="h-5 w-5" />
                          Live Reward Projections
                        </CardTitle>
                      </CardHeader>
                      <CardContent className="space-y-4">
                        <div className="grid grid-cols-3 gap-4">
                          <div className="text-center p-3 bg-white/60 dark:bg-gray-800/60 rounded-lg">
                            <div className="text-lg font-bold text-purple-600">{calculateEstimatedRewards().toFixed(2)}</div>
                            <div className="text-xs text-purple-700 dark:text-purple-300">Daily AND</div>
                          </div>
                          <div className="text-center p-3 bg-white/60 dark:bg-gray-800/60 rounded-lg">
                            <div className="text-lg font-bold text-purple-600">{(calculateEstimatedRewards() * 30).toFixed(0)}</div>
                            <div className="text-xs text-purple-700 dark:text-purple-300">Monthly AND</div>
                          </div>
                          <div className="text-center p-3 bg-white/60 dark:bg-gray-800/60 rounded-lg">
                            <div className="text-lg font-bold text-purple-600">{(calculateEstimatedRewards() * 365).toFixed(0)}</div>
                            <div className="text-xs text-purple-700 dark:text-purple-300">Annual AND</div>
                          </div>
                        </div>
                        
                        {/* Enhanced visual chart */}
                        <div className="h-20 bg-gradient-to-r from-purple-200 to-indigo-200 dark:from-purple-800 dark:to-indigo-800 rounded-lg relative overflow-hidden">
                          <div className="absolute bottom-0 left-0 w-full h-full bg-gradient-to-t from-purple-400 to-transparent opacity-30" />
                          {Array.from({ length: 12 }).map((_, i) => (
                            <div
                              key={i}
                              className="absolute bottom-0 bg-purple-500 opacity-70"
                              style={{
                                left: `${(i / 11) * 100}%`,
                                width: '2px',
                                height: `${30 + (Math.sin(i * 0.5) * 20) + (stakeAmount[0] / 200)}%`,
                              }}
                            />
                          ))}
                        </div>
                        
                        <div className="text-center space-y-1">
                          <div className="text-sm font-medium text-purple-600">
                            Estimated USD Value: ${((calculateEstimatedRewards() * 365) * 0.30).toFixed(0)}/year
                          </div>
                          <div className="text-xs text-purple-600 dark:text-purple-400">
                            Based on current AND price of $0.30
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  </div>

                  {!stakeConfirmed ? (
                    <Button 
                      onClick={() => {
                        setStakeConfirmed(true);
                        setTimeout(() => setCurrentFrame(4), 2000);
                      }}
                      className="w-full bg-gradient-to-r from-purple-600 to-indigo-600 text-white py-4 text-lg hover:shadow-xl transition-all duration-300"
                    >
                      <span className="bg-yellow-400 text-yellow-900 px-2 py-1 rounded text-xs font-bold mr-3">[HS]</span>
                      <Coins className="h-5 w-5 mr-2" />
                      Confirm Stake ({formatNumber(stakeAmount[0])} AND)
                    </Button>
                  ) : (
                    <div className="text-center space-y-4">
                      <div className="w-16 h-16 bg-gradient-to-br from-green-500 to-emerald-500 rounded-full mx-auto flex items-center justify-center animate-pulse">
                        <Check className="h-8 w-8 text-white" />
                      </div>
                      <div className="space-y-2">
                        <div className="text-green-600 font-bold">Stake Confirmed Successfully!</div>
                        <div className="text-sm text-purple-700 dark:text-purple-300">
                          Your {formatNumber(stakeAmount[0])} AND tokens are now earning rewards
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            )}

            {/* Frame 4: Enhanced Governance Hub */}
            {currentFrame === 4 && (
              <div className="space-y-6">
                <div className="text-center">
                  <h2 className="text-2xl font-bold text-purple-900 dark:text-purple-100 mb-2">
                    Governance Hub
                  </h2>
                  <p className="text-purple-700 dark:text-purple-300">
                    Participate in ecosystem governance and shape the future of AND
                  </p>
                </div>

                <div className="space-y-6">
                  {proposals.map((proposal, index) => (
                    <Card 
                      key={proposal.id}
                      className={`cursor-pointer transition-all duration-300 hover:scale-[1.02] border-2 ${
                        selectedProposal === index 
                          ? 'border-purple-500 shadow-lg shadow-purple-500/20' 
                          : 'border-purple-200 dark:border-purple-800 hover:border-purple-400'
                      }`}
                      onClick={() => setSelectedProposal(index)}
                    >
                      <CardHeader>
                        <div className="flex items-start justify-between">
                          <div className="space-y-3 flex-1">
                            <div className="flex items-center gap-3">
                              <h3 className="text-lg font-bold text-purple-900 dark:text-purple-100">
                                {proposal.title}
                              </h3>
                              <div className="flex gap-2">
                                <Badge className={`${
                                  proposal.impact === 'High' 
                                    ? 'bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-200' 
                                    : 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900/30 dark:text-yellow-200'
                                }`}>
                                  {proposal.impact} Impact
                                </Badge>
                                <Badge className="bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-200">
                                  {proposal.category}
                                </Badge>
                              </div>
                            </div>
                            <p className="text-purple-700 dark:text-purple-300 text-sm">
                              {proposal.description}
                            </p>
                            <div className="text-xs text-purple-600 dark:text-purple-400">
                              Proposed by: {proposal.proposer} • Minimum stake: {formatNumber(proposal.requiredStake)} AND
                            </div>
                          </div>
                          <Badge className="bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-200">
                            {proposal.status}
                          </Badge>
                        </div>
                      </CardHeader>

                      <CardContent className="space-y-4">
                        {/* Enhanced voting metrics */}
                        <div className="grid grid-cols-4 gap-4 text-sm">
                          <div className="bg-green-50 dark:bg-green-950/30 p-3 rounded-lg text-center">
                            <div className="font-bold text-green-600">{formatNumber(proposal.votesFor)}</div>
                            <div className="text-green-700 dark:text-green-300">For</div>
                          </div>
                          <div className="bg-red-50 dark:bg-red-950/30 p-3 rounded-lg text-center">
                            <div className="font-bold text-red-600">{formatNumber(proposal.votesAgainst)}</div>
                            <div className="text-red-700 dark:text-red-300">Against</div>
                          </div>
                          <div className="bg-blue-50 dark:bg-blue-950/30 p-3 rounded-lg text-center">
                            <div className="font-bold text-blue-600">{proposal.quorum}%</div>
                            <div className="text-blue-700 dark:text-blue-300">Quorum</div>
                          </div>
                          <div className="bg-purple-50 dark:bg-purple-950/30 p-3 rounded-lg text-center">
                            <div className="font-bold text-purple-600">{proposal.timeRemaining}</div>
                            <div className="text-purple-700 dark:text-purple-300">Remaining</div>
                          </div>
                        </div>

                        {/* Vote distribution bar */}
                        <div className="space-y-2">
                          <div className="flex justify-between text-sm">
                            <span className="text-muted-foreground">Vote Distribution</span>
                            <span className="font-bold text-purple-600">
                              {((proposal.votesFor / (proposal.votesFor + proposal.votesAgainst)) * 100).toFixed(1)}% support
                            </span>
                          </div>
                          <div className="h-3 bg-gray-200 dark:bg-gray-700 rounded-full overflow-hidden">
                            <div 
                              className="h-full bg-gradient-to-r from-green-500 to-green-600 transition-all duration-1000"
                              style={{ width: `${(proposal.votesFor / (proposal.votesFor + proposal.votesAgainst)) * 100}%` }}
                            />
                          </div>
                        </div>

                        {/* Proposal details */}
                        <div className="bg-purple-50 dark:bg-purple-950/30 p-3 rounded-lg">
                          <div className="grid grid-cols-2 gap-3 text-sm">
                            <div>
                              <span className="text-purple-700 dark:text-purple-300">Funding: </span>
                              <span className="font-bold">{proposal.details.funding}</span>
                            </div>
                            <div>
                              <span className="text-purple-700 dark:text-purple-300">Timeline: </span>
                              <span className="font-bold">{proposal.details.timeline}</span>
                            </div>
                            <div className="col-span-2">
                              <span className="text-purple-700 dark:text-purple-300">Expected: </span>
                              <span className="font-bold">{proposal.details.expectedReturn}</span>
                            </div>
                          </div>
                        </div>

                        <Button 
                          onClick={(e) => {
                            e.stopPropagation();
                            setCurrentFrame(5);
                            setShowVoteModal(true);
                          }}
                          className="w-full bg-gradient-to-r from-purple-600 to-indigo-600 text-white hover:shadow-lg transition-all duration-200"
                        >
                          <span className="bg-yellow-400 text-yellow-900 px-1 py-0.5 rounded text-xs font-bold mr-2">[HS]</span>
                          <Vote className="h-4 w-4 mr-2" />
                          Cast Your Vote
                        </Button>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </div>
            )}

            {/* Frame 5: Enhanced Vote & Confirm */}
            {currentFrame === 5 && (
              <div className="space-y-6">
                <div className="text-center">
                  <h2 className="text-2xl font-bold text-purple-900 dark:text-purple-100 mb-2">
                    Cast Your Vote
                  </h2>
                  <p className="text-purple-700 dark:text-purple-300">
                    {proposals[selectedProposal]?.title}
                  </p>
                </div>

                <div className="max-w-2xl mx-auto space-y-6">
                  {/* Enhanced voting power display */}
                  <Card className="bg-gradient-to-br from-purple-50 to-indigo-50 dark:from-purple-950/30 dark:to-indigo-950/30 border border-purple-200 dark:border-purple-800">
                    <CardContent className="pt-6 space-y-4">
                      <div className="text-center">
                        <div className="flex items-center justify-center gap-2 mb-2">
                          <Vote className="h-6 w-6 text-purple-600" />
                          <div className="text-3xl font-bold text-purple-600">{formatNumber(userStats.votingPower)}</div>
                        </div>
                        <div className="text-sm text-purple-700 dark:text-purple-300">Your Total Voting Power</div>
                        <div className="text-xs text-purple-600 dark:text-purple-400 mt-1">
                          Based on {formatNumber(userStats.totalStaked)} AND staked in governance pool
                        </div>
                      </div>

                      <div className="space-y-3">
                        <label className="text-sm font-medium text-purple-900 dark:text-purple-100 block">
                          Vote Weight: {voteWeight[0]}% ({formatNumber(Math.round((voteWeight[0] / 100) * userStats.votingPower))} voting power)
                        </label>
                        <Slider
                          value={voteWeight}
                          onValueChange={setVoteWeight}
                          max={100}
                          min={1}
                          step={1}
                          className="w-full"
                        />
                        <div className="flex justify-between text-sm text-purple-600 dark:text-purple-400">
                          <span>1%</span>
                          <span className="font-bold">
                            {formatNumber(Math.round((voteWeight[0] / 100) * userStats.votingPower))} votes
                          </span>
                          <span>100%</span>
                        </div>
                        <div className="text-xs text-center text-purple-600 dark:text-purple-400">
                          Tip: You can split your voting power across multiple proposals
                        </div>
                      </div>
                    </CardContent>
                  </Card>

                  {/* Vote impact preview */}
                  <Card className="bg-gradient-to-r from-blue-50 to-cyan-50 dark:from-blue-950/30 dark:to-cyan-950/30 border border-blue-200 dark:border-blue-800">
                    <CardContent className="pt-4">
                      <div className="space-y-3">
                        <div className="text-center">
                          <div className="text-sm font-medium text-blue-700 dark:text-blue-300">Vote Impact Preview</div>
                        </div>
                        <div className="grid grid-cols-2 gap-4 text-sm">
                          <div className="text-center p-3 bg-white/60 dark:bg-gray-800/60 rounded-lg">
                            <div className="font-bold text-blue-600">
                              {(((proposals[selectedProposal]?.votesFor + Math.round((voteWeight[0] / 100) * userStats.votingPower)) / (proposals[selectedProposal]?.votesFor + proposals[selectedProposal]?.votesAgainst + Math.round((voteWeight[0] / 100) * userStats.votingPower))) * 100).toFixed(1)}%
                            </div>
                            <div className="text-blue-700 dark:text-blue-300">Support After Vote</div>
                          </div>
                          <div className="text-center p-3 bg-white/60 dark:bg-gray-800/60 rounded-lg">
                            <div className="font-bold text-blue-600">
                              +{(Math.round((voteWeight[0] / 100) * userStats.votingPower) / 10000).toFixed(2)}%
                            </div>
                            <div className="text-blue-700 dark:text-blue-300">Quorum Contribution</div>
                          </div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>

                  {/* Enhanced voting buttons */}
                  <div className="grid grid-cols-2 gap-4">
                    <Button 
                      onClick={() => {
                        setHasVoted(true);
                        setTimeout(() => setCurrentFrame(4), 3000);
                      }}
                      className="bg-gradient-to-r from-green-600 to-emerald-600 text-white py-4 text-lg hover:shadow-xl transition-all duration-300"
                    >
                      <span className="bg-yellow-400 text-yellow-900 px-1 py-0.5 rounded text-xs font-bold mr-2">[HS]</span>
                      <Check className="h-5 w-5 mr-2" />
                      Vote For
                    </Button>
                    <Button 
                      variant="outline"
                      className="border-red-300 text-red-700 hover:bg-red-50 dark:border-red-700 dark:text-red-300 dark:hover:bg-red-900/20 py-4 text-lg transition-all duration-300"
                    >
                      <Target className="h-5 w-5 mr-2" />
                      Vote Against
                    </Button>
                  </div>

                  {/* Enhanced success feedback */}
                  {hasVoted && (
                    <div className="text-center space-y-4">
                      <div className="relative">
                        <div className="w-20 h-20 bg-gradient-to-br from-green-500 to-emerald-500 rounded-full mx-auto flex items-center justify-center relative overflow-hidden">
                          <Check className="h-10 w-10 text-white z-10" />
                          
                          {showSuccessAnimation && (
                            <>
                              {Array.from({ length: 8 }).map((_, i) => (
                                <div
                                  key={i}
                                  className="absolute w-2 h-2 bg-gradient-to-r from-yellow-400 to-orange-500 rounded-full animate-ping"
                                  style={{
                                    left: '50%',
                                    top: '50%',
                                    transform: `rotate(${i * 45}deg) translateY(-50px)`,
                                    animationDelay: `${i * 0.1}s`,
                                    animationDuration: '1.5s'
                                  }}
                                />
                              ))}
                              <div className="absolute inset-0 border-4 border-green-300 rounded-full animate-ping" />
                            </>
                          )}
                        </div>
                      </div>
                      
                      <div className="space-y-2">
                        <div className="text-green-600 font-bold text-lg">Vote Recorded Successfully!</div>
                        <div className="text-sm text-purple-700 dark:text-purple-300">
                          Your {formatNumber(Math.round((voteWeight[0] / 100) * userStats.votingPower))} votes have been cast and your voice has been heard in the ecosystem.
                        </div>
                      </div>

                      {/* Updated stats */}
                      <div className="grid grid-cols-3 gap-4 max-w-md mx-auto">
                        <div className="bg-purple-50 dark:bg-purple-950/30 p-3 rounded-lg border border-purple-200 dark:border-purple-800">
                          <div className="text-lg font-bold text-purple-600">{userStats.proposalsVoted + 1}</div>
                          <div className="text-xs text-purple-700 dark:text-purple-300">Total Votes</div>
                        </div>
                        <div className="bg-green-50 dark:bg-green-950/30 p-3 rounded-lg border border-green-200 dark:border-green-800">
                          <div className="text-lg font-bold text-green-600">+5</div>
                          <div className="text-xs text-green-700 dark:text-green-300">Governance XP</div>
                        </div>
                        <div className="bg-blue-50 dark:bg-blue-950/30 p-3 rounded-lg border border-blue-200 dark:border-blue-800">
                          <div className="text-lg font-bold text-blue-600">Active</div>
                          <div className="text-xs text-blue-700 dark:text-blue-300">Status</div>
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            )}

          </CardContent>
        </Card>

        {/* Navigation Controls */}
        <div className="flex items-center justify-between mt-8">
          <Button 
            onClick={() => setCurrentFrame(Math.max(1, currentFrame - 1))}
            disabled={currentFrame === 1}
            variant="outline"
            className="border-purple-200 text-purple-700 hover:bg-purple-50 dark:border-purple-800 dark:text-purple-300 dark:hover:bg-purple-900/20"
          >
            <ArrowLeft className="h-4 w-4 mr-2" />
            Previous Frame
          </Button>

          <div className="text-sm text-purple-600 dark:text-purple-400 font-medium">
            Frame {currentFrame} of {frames.length}
          </div>

          <Button 
            onClick={() => setCurrentFrame(Math.min(frames.length, currentFrame + 1))}
            disabled={currentFrame === frames.length}
            className="bg-purple-600 hover:bg-purple-700 text-white"
          >
            Next Frame
            <ArrowRight className="h-4 w-4 ml-2" />
          </Button>
        </div>
      </div>
    </div>
  );
}