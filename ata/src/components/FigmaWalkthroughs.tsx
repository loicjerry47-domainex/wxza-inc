import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
import { Button } from "./ui/button";
import { Badge } from "./ui/badge";
import { 
  ArrowLeft, 
  Wallet, 
  Vote, 
  Gift,
  Play,
  Users,
  DollarSign,
  Target,
  TrendingUp,
  Shield,
  Zap,
  Award,
  Clock,
  Star,
  Sparkles
} from "lucide-react";
import { WalletOnboardingWalkthrough } from "./walkthroughs/WalletOnboardingWalkthrough";
import { StakingGovernanceWalkthrough } from "./walkthroughs/StakingGovernanceWalkthrough";
import { VentureRewardWalkthrough } from "./walkthroughs/VentureRewardWalkthrough";

interface FigmaWalkthroughsProps {
  onBack: () => void;
}

export function FigmaWalkthroughs({ onBack }: FigmaWalkthroughsProps) {
  const [activeWalkthrough, setActiveWalkthrough] = useState<'selection' | 'onboarding' | 'staking' | 'rewards'>('selection');

  const walkthroughs = [
    {
      id: 'onboarding',
      title: 'Investor Onboarding & Wallet Setup',
      description: 'Complete wallet connection, token swapping, and cross-chain bridge flows with multi-step confirmations and security features',
      icon: Wallet,
      color: 'from-blue-500 to-cyan-500',
      duration: '3-4 min',
      steps: 5,
      complexity: 'Beginner',
      features: ['MetaMask Integration', 'WalletConnect QR', 'Cross-chain Bridge', 'Security Confirmations', 'Live Transaction Status']
    },
    {
      id: 'staking',
      title: 'Staking & Governance Participation',
      description: 'Stake tokens across multiple pools, participate in ecosystem governance, and vote on proposals with weighted voting power',
      icon: Vote,
      color: 'from-purple-500 to-indigo-500',
      duration: '4-5 min',
      steps: 5,
      complexity: 'Intermediate',
      features: ['Multi-Pool Staking', 'Live APY Calculator', 'Governance Voting', 'Vote Weight Control', 'Reward Projections']
    },
    {
      id: 'rewards',
      title: 'Venture Reward Redemption',
      description: 'Browse exclusive venture discounts, redeem tokens for premium rewards, and access member-only benefits with instant delivery',
      icon: Gift,
      color: 'from-green-500 to-emerald-500',
      duration: '3-4 min',
      steps: 4,
      complexity: 'Beginner',
      features: ['Venture Marketplace', 'Token Redemption', 'Instant Coupons', 'Loyalty Tiers', 'Member Benefits']
    }
  ];

  const ecosystemStats = {
    totalUsers: 14752,
    totalStaked: 47.2,
    successRate: 94.7,
    avgCompletionTime: '3.8 min',
    totalRewards: 284,
    governanceParticipation: 68.3
  };

  if (activeWalkthrough === 'onboarding') {
    return <WalletOnboardingWalkthrough onBack={() => setActiveWalkthrough('selection')} />;
  }

  if (activeWalkthrough === 'staking') {
    return <StakingGovernanceWalkthrough onBack={() => setActiveWalkthrough('selection')} />;
  }

  if (activeWalkthrough === 'rewards') {
    return <VentureRewardWalkthrough onBack={() => setActiveWalkthrough('selection')} />;
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-background to-muted/20">
      <div className="container mx-auto px-3 sm:px-4 lg:px-6 py-4 sm:py-6 lg:py-8 max-w-6xl">
        {/* Mobile-Optimized Header */}
        <div className="mb-6 sm:mb-8">
          <Button 
            onClick={onBack}
            variant="ghost" 
            className="mb-4 sm:mb-6 hover:bg-muted/50 -ml-2 sm:-ml-3"
          >
            <ArrowLeft className="h-4 w-4 mr-2" />
            <span className="text-sm sm:text-base">Back to Dashboard</span>
          </Button>
          
          <div className="text-center space-y-3 sm:space-y-4">
            <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold bg-gradient-to-r from-foreground to-muted-foreground bg-clip-text text-transparent leading-tight">
              Interactive Walkthroughs
            </h1>
            <p className="text-base sm:text-lg lg:text-xl text-muted-foreground max-w-3xl mx-auto leading-relaxed px-4 sm:px-0">
              Experience the AND token ecosystem through immersive user journey simulations with real-time interactions, 
              enterprise-grade interfaces, and prototype-quality demonstrations
            </p>
          </div>
        </div>

        {/* Mobile-First Stats Overview */}
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3 sm:gap-4 mb-8 sm:mb-12">
          <Card className="text-center bg-gradient-to-br from-blue-50 to-cyan-50 dark:from-blue-950/30 dark:to-cyan-950/30 border-blue-200 dark:border-blue-800">
            <CardContent className="pt-3 sm:pt-4 pb-3 sm:pb-4 px-2 sm:px-4">
              <div className="w-8 h-8 sm:w-10 sm:h-10 bg-gradient-to-br from-blue-500 to-cyan-500 rounded-lg sm:rounded-xl mx-auto mb-2 sm:mb-3 flex items-center justify-center">
                <Users className="h-4 w-4 sm:h-5 sm:w-5 text-white" />
              </div>
              <div className="text-lg sm:text-xl font-bold text-blue-600 dark:text-blue-400 leading-tight">
                {ecosystemStats.totalUsers.toLocaleString()}
              </div>
              <div className="text-xs text-blue-600/80 dark:text-blue-400/80 leading-tight">Active Users</div>
            </CardContent>
          </Card>

          <Card className="text-center bg-gradient-to-br from-purple-50 to-indigo-50 dark:from-purple-950/30 dark:to-indigo-950/30 border-purple-200 dark:border-purple-800">
            <CardContent className="pt-3 sm:pt-4 pb-3 sm:pb-4 px-2 sm:px-4">
              <div className="w-8 h-8 sm:w-10 sm:h-10 bg-gradient-to-br from-purple-500 to-indigo-500 rounded-lg sm:rounded-xl mx-auto mb-2 sm:mb-3 flex items-center justify-center">
                <DollarSign className="h-4 w-4 sm:h-5 sm:w-5 text-white" />
              </div>
              <div className="text-lg sm:text-xl font-bold text-purple-600 dark:text-purple-400 leading-tight">
                ${ecosystemStats.totalStaked}M
              </div>
              <div className="text-xs text-purple-600/80 dark:text-purple-400/80 leading-tight">Total Staked</div>
            </CardContent>
          </Card>

          <Card className="text-center bg-gradient-to-br from-green-50 to-emerald-50 dark:from-green-950/30 dark:to-emerald-950/30 border-green-200 dark:border-green-800">
            <CardContent className="pt-3 sm:pt-4 pb-3 sm:pb-4 px-2 sm:px-4">
              <div className="w-8 h-8 sm:w-10 sm:h-10 bg-gradient-to-br from-green-500 to-emerald-500 rounded-lg sm:rounded-xl mx-auto mb-2 sm:mb-3 flex items-center justify-center">
                <Target className="h-4 w-4 sm:h-5 sm:w-5 text-white" />
              </div>
              <div className="text-lg sm:text-xl font-bold text-green-600 dark:text-green-400 leading-tight">
                {ecosystemStats.successRate}%
              </div>
              <div className="text-xs text-green-600/80 dark:text-green-400/80 leading-tight">Success Rate</div>
            </CardContent>
          </Card>

          <Card className="text-center bg-gradient-to-br from-yellow-50 to-orange-50 dark:from-yellow-950/30 dark:to-orange-950/30 border-yellow-200 dark:border-yellow-800">
            <CardContent className="pt-3 sm:pt-4 pb-3 sm:pb-4 px-2 sm:px-4">
              <div className="w-8 h-8 sm:w-10 sm:h-10 bg-gradient-to-br from-yellow-500 to-orange-500 rounded-lg sm:rounded-xl mx-auto mb-2 sm:mb-3 flex items-center justify-center">
                <Clock className="h-4 w-4 sm:h-5 sm:w-5 text-white" />
              </div>
              <div className="text-lg sm:text-xl font-bold text-yellow-600 dark:text-yellow-400 leading-tight">
                {ecosystemStats.avgCompletionTime}
              </div>
              <div className="text-xs text-yellow-600/80 dark:text-yellow-400/80 leading-tight">Avg. Time</div>
            </CardContent>
          </Card>

          <Card className="text-center bg-gradient-to-br from-pink-50 to-rose-50 dark:from-pink-950/30 dark:to-rose-950/30 border-pink-200 dark:border-pink-800">
            <CardContent className="pt-3 sm:pt-4 pb-3 sm:pb-4 px-2 sm:px-4">
              <div className="w-8 h-8 sm:w-10 sm:h-10 bg-gradient-to-br from-pink-500 to-rose-500 rounded-lg sm:rounded-xl mx-auto mb-2 sm:mb-3 flex items-center justify-center">
                <Award className="h-4 w-4 sm:h-5 sm:w-5 text-white" />
              </div>
              <div className="text-lg sm:text-xl font-bold text-pink-600 dark:text-pink-400 leading-tight">
                {ecosystemStats.totalRewards}K
              </div>
              <div className="text-xs text-pink-600/80 dark:text-pink-400/80 leading-tight">Rewards Given</div>
            </CardContent>
          </Card>

          <Card className="text-center bg-gradient-to-br from-teal-50 to-cyan-50 dark:from-teal-950/30 dark:to-cyan-950/30 border-teal-200 dark:border-teal-800">
            <CardContent className="pt-3 sm:pt-4 pb-3 sm:pb-4 px-2 sm:px-4">
              <div className="w-8 h-8 sm:w-10 sm:h-10 bg-gradient-to-br from-teal-500 to-cyan-500 rounded-lg sm:rounded-xl mx-auto mb-2 sm:mb-3 flex items-center justify-center">
                <Vote className="h-4 w-4 sm:h-5 sm:w-5 text-white" />
              </div>
              <div className="text-lg sm:text-xl font-bold text-teal-600 dark:text-teal-400 leading-tight">
                {ecosystemStats.governanceParticipation}%
              </div>
              <div className="text-xs text-teal-600/80 dark:text-teal-400/80 leading-tight">Governance</div>
            </CardContent>
          </Card>
        </div>

        {/* Mobile-Optimized Walkthrough Selection */}
        <div className="space-y-6 sm:space-y-8">
          <div className="text-center space-y-2 sm:space-y-2">
            <h2 className="text-xl sm:text-2xl font-bold">Choose Your Journey</h2>
            <p className="text-sm sm:text-base text-muted-foreground px-4 sm:px-0">
              Experience the complete AND ecosystem through interactive prototype demonstrations
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 sm:gap-8">
            {walkthroughs.map((walkthrough) => (
              <Card 
                key={walkthrough.id}
                className="group cursor-pointer transition-all duration-300 hover:scale-[1.02] lg:hover:scale-105 hover:shadow-xl border-2 hover:border-primary/20 relative overflow-hidden"
                onClick={() => setActiveWalkthrough(walkthrough.id as any)}
              >
                {/* Animated background gradient */}
                <div className={`absolute inset-0 bg-gradient-to-br ${walkthrough.color} opacity-5 group-hover:opacity-10 transition-opacity duration-300`} />
                
                <CardHeader className="space-y-4 relative z-10 p-4 sm:p-6">
                  <div className="flex items-center justify-between">
                    <div className={`w-12 h-12 sm:w-14 sm:h-14 bg-gradient-to-br ${walkthrough.color} rounded-xl flex items-center justify-center group-hover:scale-110 transition-transform duration-300 shadow-lg flex-shrink-0`}>
                      <walkthrough.icon className="h-6 w-6 sm:h-7 sm:w-7 text-white" />
                    </div>
                    <div className="flex flex-col gap-1 items-end">
                      <Badge variant="secondary" className="font-medium text-xs">
                        {walkthrough.steps} Steps
                      </Badge>
                      <Badge variant="outline" className={`text-xs ${
                        walkthrough.complexity === 'Beginner' 
                          ? 'border-green-300 text-green-700 dark:border-green-700 dark:text-green-300'
                          : 'border-yellow-300 text-yellow-700 dark:border-yellow-700 dark:text-yellow-300'
                      }`}>
                        {walkthrough.complexity}
                      </Badge>
                    </div>
                  </div>
                  
                  <div>
                    <h3 className="text-lg sm:text-xl font-bold group-hover:text-primary transition-colors leading-tight">
                      {walkthrough.title}
                    </h3>
                    <p className="text-muted-foreground mt-2 text-sm leading-relaxed">
                      {walkthrough.description}
                    </p>
                  </div>
                </CardHeader>

                <CardContent className="space-y-4 relative z-10 p-4 sm:p-6 pt-0">
                  <div className="flex items-center justify-between text-sm">
                    <div className="flex items-center gap-2">
                      <Clock className="h-4 w-4 text-muted-foreground flex-shrink-0" />
                      <span className="text-muted-foreground">Duration</span>
                    </div>
                    <span className="font-medium">{walkthrough.duration}</span>
                  </div>

                  <div className="space-y-2">
                    <div className="text-sm font-medium text-muted-foreground flex items-center gap-2">
                      <Sparkles className="h-4 w-4 flex-shrink-0" />
                      Key Features
                    </div>
                    <div className="grid grid-cols-1 gap-2">
                      {walkthrough.features.slice(0, 3).map((feature, index) => (
                        <div key={index} className="flex items-center gap-2 text-xs">
                          <div className={`w-2 h-2 rounded-full bg-gradient-to-r ${walkthrough.color} flex-shrink-0`} />
                          <span className="text-muted-foreground leading-tight">{feature}</span>
                        </div>
                      ))}
                      {walkthrough.features.length > 3 && (
                        <div className="text-xs text-muted-foreground/70">
                          +{walkthrough.features.length - 3} more features
                        </div>
                      )}
                    </div>
                  </div>

                  <Button 
                    className={`w-full mt-4 bg-gradient-to-r ${walkthrough.color} hover:opacity-90 text-white border-0 group-hover:shadow-lg transition-all h-11 text-sm`}
                  >
                    <Play className="h-4 w-4 mr-2 flex-shrink-0" />
                    Start Walkthrough
                  </Button>
                </CardContent>

                {/* Hover shine effect */}
                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 transform -skew-x-12 translate-x-full group-hover:translate-x-[-100%] pointer-events-none" />
              </Card>
            ))}
          </div>
        </div>

        {/* Enhanced Technical Info with Mobile Layout */}
        <div className="mt-12 sm:mt-16">
          <Card className="bg-gradient-to-r from-muted/50 to-muted/30 border-muted overflow-hidden relative">
            <div className="absolute top-0 right-0 w-32 h-32 bg-primary/5 rounded-full -translate-y-16 translate-x-16" />
            <CardHeader className="p-4 sm:p-6">
              <CardTitle className="flex items-center gap-2 text-base sm:text-lg">
                <Shield className="h-5 w-5 text-primary flex-shrink-0" />
                <span className="leading-tight">Enterprise-Grade Prototype Specifications</span>
              </CardTitle>
            </CardHeader>
            <CardContent className="relative z-10 p-4 sm:p-6 pt-0">
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 text-sm">
                <div className="space-y-2">
                  <div className="font-medium text-muted-foreground flex items-center gap-2">
                    <Zap className="h-4 w-4 flex-shrink-0" />
                    Performance
                  </div>
                  <div className="space-y-1 text-sm">
                    <div>Transition Duration: 200–300ms</div>
                    <div>Frame Rate: 60fps smooth</div>
                    <div>Load Time: &lt;2s average</div>
                  </div>
                </div>
                <div className="space-y-2">
                  <div className="font-medium text-muted-foreground flex items-center gap-2">
                    <Star className="h-4 w-4 flex-shrink-0" />
                    Visual Design
                  </div>
                  <div className="space-y-1 text-sm">
                    <div>Backdrop Blur: 60% opacity</div>
                    <div>Shadow System: Multi-layer</div>
                    <div>Animation: Easing curves</div>
                  </div>
                </div>
                <div className="space-y-2">
                  <div className="font-medium text-muted-foreground flex items-center gap-2">
                    <Target className="h-4 w-4 flex-shrink-0" />
                    Interaction
                  </div>
                  <div className="space-y-1 text-sm">
                    <div>Hotspot Prefix: [HS]</div>
                    <div>Touch Targets: 44px min</div>
                    <div>Keyboard Navigation: Full</div>
                  </div>
                </div>
                <div className="space-y-2">
                  <div className="font-medium text-muted-foreground flex items-center gap-2">
                    <Award className="h-4 w-4 flex-shrink-0" />
                    Components
                  </div>
                  <div className="space-y-1 text-sm">
                    <div>UI Library: Shadcn variants</div>
                    <div>Icons: Lucide React</div>
                    <div>Responsive: Mobile-first</div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}