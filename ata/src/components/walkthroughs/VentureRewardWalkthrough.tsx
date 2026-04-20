import { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";
import { Button } from "../ui/button";
import { Badge } from "../ui/badge";
import { Progress } from "../ui/progress";
import { 
  ArrowLeft, 
  Gift, 
  ArrowRight, 
  Check, 
  Star,
  ShoppingBag,
  Sparkles,
  Wallet,
  ExternalLink,
  Trophy,
  Zap,
  Heart,
  Coins,
  Clock,
  Users,
  TrendingUp,
  Shield,
  Award,
  Timer
} from "lucide-react";

interface VentureRewardWalkthroughProps {
  onBack: () => void;
}

export function VentureRewardWalkthrough({ onBack }: VentureRewardWalkthroughProps) {
  const [currentFrame, setCurrentFrame] = useState(1);
  const [selectedVenture, setSelectedVenture] = useState('nimbus');
  const [showRewardModal, setShowRewardModal] = useState(false);
  const [showApprovalModal, setShowApprovalModal] = useState(false);
  const [rewardRedeemed, setRewardRedeemed] = useState(false);
  const [showSuccessAnimation, setShowSuccessAnimation] = useState(false);
  const [processingTime, setProcessingTime] = useState(3);

  const frames = [
    { id: 1, title: 'Marketplace', description: 'Browse venture rewards and exclusive discounts' },
    { id: 2, title: 'Reward Detail', description: 'Review discount details and AND token cost' },
    { id: 3, title: 'Wallet Approval', description: 'Sign transaction to redeem reward' },
    { id: 4, title: 'Success', description: 'Confirmation and instant coupon delivery' }
  ];

  const ventures = [
    {
      id: 'nimbus',
      name: 'NIMBUS BIOME™',
      description: 'Biophilic Luxury Ecosystems',
      discount: '15%',
      cost: 50,
      originalPrice: 2999,
      gradient: 'from-emerald-500 to-green-600',
      icon: '🌿',
      category: 'Sustainability',
      availability: 47,
      maxRedemptions: 100,
      trending: true,
      estimatedSavings: 450,
      validDays: 30
    },
    {
      id: 'lensstorm',
      name: 'LensStorm',
      description: 'Invisible AR Smart Lenses',
      discount: '20%',
      cost: 75,
      originalPrice: 1299,
      gradient: 'from-blue-500 to-cyan-600',
      icon: '👓',
      category: 'AR/VR',
      availability: 23,
      maxRedemptions: 50,
      estimatedSavings: 260,
      validDays: 45
    },
    {
      id: 'everbloom',
      name: 'EverBloom',
      description: 'Digital Gardens & NFTs',
      discount: '25%',
      cost: 100,
      originalPrice: 199,
      gradient: 'from-pink-500 to-rose-600',
      icon: '🌸',
      category: 'Digital Art',
      availability: 12,
      maxRedemptions: 25,
      popular: true,
      estimatedSavings: 50,
      validDays: 60
    },
    {
      id: 'oto',
      name: 'OTO',
      description: 'Global Relationship AI',
      discount: '12%',
      cost: 60,
      originalPrice: 49,
      gradient: 'from-purple-500 to-indigo-600',
      icon: '🤖',
      category: 'AI/ML',
      availability: 34,
      maxRedemptions: 75,
      estimatedSavings: 6,
      validDays: 90
    },
    {
      id: 'gcraft',
      name: 'Gcraft',
      description: 'Universal Gift Card Wallet',
      discount: '18%',
      cost: 80,
      originalPrice: 0, // Free app with premium features
      gradient: 'from-orange-500 to-red-600',
      icon: '💳',
      category: 'Fintech',
      availability: 18,
      maxRedemptions: 40,
      estimatedSavings: 25,
      validDays: 120
    },
    {
      id: 'mparker',
      name: 'Mparker',
      description: 'Urban Mobility Hub',
      discount: '30%',
      cost: 120,
      originalPrice: 85,
      gradient: 'from-gray-500 to-slate-600',
      icon: '🚗',
      category: 'Mobility',
      availability: 8,
      maxRedemptions: 20,
      limited: true,
      estimatedSavings: 25,
      validDays: 14
    }
  ];

  const userStats = {
    andBalance: 1250,
    totalRewards: 7,
    savedAmount: 1847,
    loyaltyTier: 'Platinum',
    nextTierProgress: 76,
    lifetimeSpent: 847,
    memberSince: '2023'
  };

  const selectedVentureData = ventures.find(v => v.id === selectedVenture) || ventures[0];

  // Processing animation
  useEffect(() => {
    if (showApprovalModal && processingTime > 0) {
      const timer = setTimeout(() => {
        setProcessingTime(prev => prev - 1);
      }, 1000);
      return () => clearTimeout(timer);
    } else if (showApprovalModal && processingTime === 0) {
      setShowApprovalModal(false);
      setRewardRedeemed(true);
      setShowSuccessAnimation(true);
      setCurrentFrame(4);
    }
  }, [showApprovalModal, processingTime]);

  const handleRedemption = () => {
    setShowRewardModal(false);
    setShowApprovalModal(true);
    setProcessingTime(3);
    setCurrentFrame(3);
  };

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' }).format(amount);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 via-white to-emerald-50 dark:from-green-950 dark:via-background dark:to-emerald-950">
      <div className="container mx-auto px-4 py-8 max-w-6xl">
        {/* Header */}
        <div className="mb-8">
          <Button 
            onClick={onBack}
            variant="ghost" 
            className="mb-6 hover:bg-green-100 dark:hover:bg-green-900/20"
          >
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back to Walkthroughs
          </Button>
          
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold text-green-900 dark:text-green-100">
                Venture Reward Redemption
              </h1>
              <p className="text-green-700 dark:text-green-300 mt-2">
                Frame {currentFrame} of {frames.length}: {frames[currentFrame - 1]?.description}
              </p>
            </div>
            <Badge className="bg-green-500 text-white px-4 py-2">
              <Gift className="h-4 w-4 mr-2" />
              Walkthrough C
            </Badge>
          </div>
        </div>

        {/* Progress Bar */}
        <div className="mb-8">
          <div className="flex items-center justify-between mb-2">
            <span className="text-sm font-medium text-green-700 dark:text-green-300">Progress</span>
            <span className="text-sm text-green-600 dark:text-green-400">{currentFrame}/{frames.length}</span>
          </div>
          <Progress value={(currentFrame / frames.length) * 100} className="h-2" />
        </div>

        {/* Enhanced User Stats Dashboard */}
        <div className="mb-8 grid grid-cols-2 md:grid-cols-5 gap-4">
          <Card className="bg-gradient-to-r from-green-100 to-emerald-100 dark:from-green-900/30 dark:to-emerald-900/30 border-green-200 dark:border-green-800">
            <CardContent className="pt-4 text-center">
              <div className="flex items-center justify-center gap-1 mb-1">
                <Coins className="h-4 w-4 text-green-600" />
                <div className="text-lg font-bold text-green-600">{userStats.andBalance}</div>
              </div>
              <div className="text-xs text-green-700 dark:text-green-300">AND Balance</div>
            </CardContent>
          </Card>
          
          <Card className="bg-gradient-to-r from-purple-100 to-indigo-100 dark:from-purple-900/30 dark:to-indigo-900/30 border-purple-200 dark:border-purple-800">
            <CardContent className="pt-4 text-center">
              <div className="flex items-center justify-center gap-1 mb-1">
                <Award className="h-4 w-4 text-purple-600" />
                <div className="text-lg font-bold text-purple-600">{userStats.totalRewards}</div>
              </div>
              <div className="text-xs text-purple-700 dark:text-purple-300">Rewards Claimed</div>
            </CardContent>
          </Card>
          
          <Card className="bg-gradient-to-r from-blue-100 to-cyan-100 dark:from-blue-900/30 dark:to-cyan-900/30 border-blue-200 dark:border-blue-800">
            <CardContent className="pt-4 text-center">
              <div className="flex items-center justify-center gap-1 mb-1">
                <TrendingUp className="h-4 w-4 text-blue-600" />
                <div className="text-lg font-bold text-blue-600">{formatCurrency(userStats.savedAmount)}</div>
              </div>
              <div className="text-xs text-blue-700 dark:text-blue-300">Total Saved</div>
            </CardContent>
          </Card>
          
          <Card className="bg-gradient-to-r from-yellow-100 to-orange-100 dark:from-yellow-900/30 dark:to-orange-900/30 border-yellow-200 dark:border-yellow-800">
            <CardContent className="pt-4 text-center">
              <div className="flex items-center justify-center gap-1 mb-1">
                <Trophy className="h-4 w-4 text-yellow-600" />
                <div className="text-lg font-bold text-yellow-600">{userStats.loyaltyTier}</div>
              </div>
              <div className="text-xs text-yellow-700 dark:text-yellow-300">Loyalty Tier</div>
            </CardContent>
          </Card>
          
          <Card className="bg-gradient-to-r from-pink-100 to-rose-100 dark:from-pink-900/30 dark:to-rose-900/30 border-pink-200 dark:border-pink-800">
            <CardContent className="pt-4 text-center">
              <div className="flex items-center justify-center gap-1 mb-1">
                <Users className="h-4 w-4 text-pink-600" />
                <div className="text-lg font-bold text-pink-600">{userStats.nextTierProgress}%</div>
              </div>
              <div className="text-xs text-pink-700 dark:text-pink-300">To Diamond</div>
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
                    ? 'bg-green-600 text-white' 
                    : 'border-green-200 text-green-700 hover:bg-green-50 dark:border-green-800 dark:text-green-300 dark:hover:bg-green-900/20'
                }`}
              >
                {frame.title}
              </Button>
            ))}
          </div>
        </div>

        {/* Frame Content */}
        <Card className="min-h-96 bg-white/60 dark:bg-gray-900/60 backdrop-blur-sm border-green-200 dark:border-green-800">
          <CardContent className="p-8">
            
            {/* Frame 1: Enhanced Ecosystem Marketplace */}
            {currentFrame === 1 && (
              <div className="space-y-6">
                <div className="text-center">
                  <h2 className="text-2xl font-bold text-green-900 dark:text-green-100 mb-2">
                    Ecosystem Marketplace
                  </h2>
                  <p className="text-green-700 dark:text-green-300">
                    Use your AND tokens to unlock exclusive venture discounts and premium rewards
                  </p>
                </div>

                {/* Trending & Popular Section */}
                <div className="mb-6">
                  <div className="flex items-center gap-2 mb-4">
                    <Sparkles className="h-5 w-5 text-yellow-500" />
                    <h3 className="text-lg font-bold text-green-900 dark:text-green-100">Trending Rewards</h3>
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {ventures.filter(v => v.trending || v.popular || v.limited).map((venture) => (
                      <Card 
                        key={venture.id}
                        className={`group cursor-pointer transition-all duration-300 hover:scale-105 border-2 relative overflow-hidden ${
                          selectedVenture === venture.id 
                            ? 'border-green-500 shadow-lg shadow-green-500/20' 
                            : 'border-green-200 dark:border-green-800 hover:border-green-400'
                        }`}
                        onClick={() => setSelectedVenture(venture.id)}
                      >
                        {/* Enhanced badges */}
                        <div className="absolute top-2 right-2 z-10 flex flex-col gap-1">
                          {venture.trending && (
                            <Badge className="bg-gradient-to-r from-orange-500 to-red-500 text-white">
                              <TrendingUp className="h-3 w-3 mr-1" />
                              Trending
                            </Badge>
                          )}
                          {venture.popular && (
                            <Badge className="bg-gradient-to-r from-yellow-500 to-orange-500 text-black">
                              <Star className="h-3 w-3 mr-1" />
                              Popular
                            </Badge>
                          )}
                          {venture.limited && (
                            <Badge className="bg-gradient-to-r from-red-500 to-pink-500 text-white animate-pulse">
                              <Zap className="h-3 w-3 mr-1" />
                              Limited
                            </Badge>
                          )}
                        </div>

                        <CardHeader className="space-y-3">
                          <div className="flex items-center gap-3">
                            <div className={`w-14 h-14 bg-gradient-to-br ${venture.gradient} rounded-xl flex items-center justify-center text-2xl group-hover:scale-110 transition-transform shadow-lg`}>
                              {venture.icon}
                            </div>
                            <div className="flex-1">
                              <h3 className="font-bold text-green-900 dark:text-green-100 group-hover:text-green-600 transition-colors">
                                {venture.name}
                              </h3>
                              <p className="text-sm text-green-700 dark:text-green-300">
                                {venture.description}
                              </p>
                            </div>
                          </div>
                        </CardHeader>

                        <CardContent className="space-y-4">
                          {/* Discount highlight */}
                          <div className="bg-gradient-to-r from-green-50 to-emerald-50 dark:from-green-950/50 dark:to-emerald-950/50 rounded-lg p-3 border border-green-200 dark:border-green-800">
                            <div className="flex items-center justify-between">
                              <div>
                                <div className="text-2xl font-bold text-green-600">
                                  {venture.discount}
                                </div>
                                <div className="text-sm text-green-700 dark:text-green-300">
                                  Exclusive Discount
                                </div>
                              </div>
                              <div className="text-right">
                                <div className="text-lg font-bold text-green-600">
                                  {formatCurrency(venture.estimatedSavings)}
                                </div>
                                <div className="text-sm text-green-700 dark:text-green-300">
                                  Est. Savings
                                </div>
                              </div>
                            </div>
                          </div>

                          {/* Availability */}
                          <div className="space-y-2">
                            <div className="flex justify-between text-sm">
                              <span className="text-green-700 dark:text-green-300 flex items-center gap-1">
                                <Clock className="h-3 w-3" />
                                Available
                              </span>
                              <span className="font-bold text-green-600">{venture.availability}/{venture.maxRedemptions}</span>
                            </div>
                            <Progress value={(venture.availability / venture.maxRedemptions) * 100} className="h-2" />
                            <div className="text-xs text-green-600 dark:text-green-400 flex items-center gap-1">
                              <Timer className="h-3 w-3" />
                              Valid for {venture.validDays} days
                            </div>
                          </div>

                          {/* Category and cost */}
                          <div className="flex items-center justify-between">
                            <Badge variant="outline" className="border-green-300 text-green-700 dark:border-green-700 dark:text-green-300">
                              {venture.category}
                            </Badge>
                            <div className="flex items-center gap-1">
                              <Coins className="h-4 w-4 text-green-600" />
                              <span className="font-bold text-green-600">{venture.cost} AND</span>
                            </div>
                          </div>

                          <Button 
                            onClick={(e) => {
                              e.stopPropagation();
                              setShowRewardModal(true);
                              setCurrentFrame(2);
                            }}
                            className={`w-full bg-gradient-to-r ${venture.gradient} text-white hover:opacity-90 transition-all duration-200`}
                          >
                            <span className="bg-yellow-400 text-yellow-900 px-1 py-0.5 rounded text-xs font-bold mr-2">[HS]</span>
                            <Gift className="h-4 w-4 mr-2" />
                            Claim Reward
                          </Button>
                        </CardContent>

                        {/* Enhanced hover effect */}
                        <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 transform skew-x-12 pointer-events-none" />
                      </Card>
                    ))}
                  </div>
                </div>

                {/* All Ventures Section */}
                <div>
                  <h3 className="text-lg font-bold text-green-900 dark:text-green-100 mb-4">All Available Rewards</h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {ventures.filter(v => !v.trending && !v.popular && !v.limited).map((venture) => (
                      <Card 
                        key={venture.id}
                        className={`group cursor-pointer transition-all duration-300 hover:scale-105 border-2 relative overflow-hidden ${
                          selectedVenture === venture.id 
                            ? 'border-green-500 shadow-lg shadow-green-500/20' 
                            : 'border-green-200 dark:border-green-800 hover:border-green-400'
                        }`}
                        onClick={() => setSelectedVenture(venture.id)}
                      >
                        <CardHeader className="space-y-3">
                          <div className="flex items-center gap-3">
                            <div className={`w-12 h-12 bg-gradient-to-br ${venture.gradient} rounded-xl flex items-center justify-center text-xl group-hover:scale-110 transition-transform`}>
                              {venture.icon}
                            </div>
                            <div>
                              <h3 className="font-bold text-green-900 dark:text-green-100 group-hover:text-green-600 transition-colors">
                                {venture.name}
                              </h3>
                              <p className="text-sm text-green-700 dark:text-green-300">
                                {venture.description}
                              </p>
                            </div>
                          </div>
                        </CardHeader>

                        <CardContent className="space-y-4">
                          <div className="flex items-center justify-between">
                            <div className="flex items-center gap-2">
                              <div className="text-xl font-bold text-green-600">
                                {venture.discount}
                              </div>
                              <div className="text-sm text-green-700 dark:text-green-300">
                                off
                              </div>
                            </div>
                            <Badge variant="outline" className="border-green-300 text-green-700 dark:border-green-700 dark:text-green-300">
                              {venture.category}
                            </Badge>
                          </div>

                          <div className="space-y-2">
                            <div className="flex justify-between text-sm">
                              <span className="text-green-700 dark:text-green-300">Available</span>
                              <span className="font-bold text-green-600">{venture.availability}/{venture.maxRedemptions}</span>
                            </div>
                            <Progress value={(venture.availability / venture.maxRedemptions) * 100} className="h-2" />
                          </div>

                          <div className="flex items-center justify-between">
                            <div className="flex items-center gap-1">
                              <Coins className="h-4 w-4 text-green-600" />
                              <span className="font-bold text-green-600">{venture.cost} AND</span>
                            </div>
                            
                            <Button 
                              onClick={(e) => {
                                e.stopPropagation();
                                setShowRewardModal(true);
                                setCurrentFrame(2);
                              }}
                              size="sm"
                              className={`bg-gradient-to-r ${venture.gradient} text-white hover:opacity-90`}
                            >
                              <span className="bg-yellow-400 text-yellow-900 px-1 py-0.5 rounded text-xs font-bold mr-2">[HS]</span>
                              Claim
                            </Button>
                          </div>
                        </CardContent>

                        {/* Hover effect */}
                        <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 transform skew-x-12" />
                      </Card>
                    ))}
                  </div>
                </div>

                <div className="text-center">
                  <p className="text-sm text-green-600 dark:text-green-400">
                    ↑ Browse rewards and click "Claim Reward" to view discount details
                  </p>
                </div>
              </div>
            )}

            {/* Frame 2: Enhanced Reward Detail Overlay */}
            {currentFrame === 2 && (
              <div className="space-y-6">
                <div className="text-center">
                  <h2 className="text-2xl font-bold text-green-900 dark:text-green-100 mb-2">
                    Reward Details
                  </h2>
                  <p className="text-green-700 dark:text-green-300">
                    Review your exclusive discount and confirm redemption
                  </p>
                </div>

                <div className="max-w-lg mx-auto">
                  <Card className={`bg-gradient-to-br ${selectedVentureData.gradient} text-white border-0 shadow-2xl overflow-hidden`}>
                    {/* Animated background pattern */}
                    <div className="absolute inset-0 opacity-10">
                      <div className="absolute inset-0 bg-gradient-to-r from-white/5 via-transparent to-white/5 animate-pulse" />
                    </div>
                    
                    <CardHeader className="text-center space-y-4 relative">
                      <div className="text-6xl animate-bounce">{selectedVentureData.icon}</div>
                      <div>
                        <h3 className="text-2xl font-bold">{selectedVentureData.name}</h3>
                        <p className="text-white/80">{selectedVentureData.description}</p>
                        <Badge className="mt-2 bg-white/20 text-white border-white/30">
                          {selectedVentureData.category}
                        </Badge>
                      </div>
                    </CardHeader>
                    
                    <CardContent className="space-y-6 relative">
                      {/* Discount showcase */}
                      <div className="text-center bg-white/10 backdrop-blur-sm rounded-lg p-6 border border-white/20">
                        <div className="text-5xl font-bold mb-2">{selectedVentureData.discount}</div>
                        <div className="text-white/90 text-lg">Exclusive Discount</div>
                        <div className="text-white/70 text-sm mt-1">
                          Save up to {formatCurrency(selectedVentureData.estimatedSavings)}
                        </div>
                      </div>

                      {/* Cost breakdown */}
                      <div className="space-y-3 bg-white/10 backdrop-blur-sm rounded-lg p-4 border border-white/20">
                        <div className="flex justify-between items-center">
                          <span className="text-white/80">Cost in AND</span>
                          <span className="font-bold text-xl">{selectedVentureData.cost} AND</span>
                        </div>
                        <div className="flex justify-between items-center">
                          <span className="text-white/80">Your Balance</span>
                          <span className="font-bold">{userStats.andBalance} AND</span>
                        </div>
                        <div className="border-t border-white/20 pt-2 flex justify-between items-center">
                          <span className="text-white/80">After Redemption</span>
                          <span className="font-bold text-green-200">{userStats.andBalance - selectedVentureData.cost} AND</span>
                        </div>
                        <div className="flex justify-between items-center">
                          <span className="text-white/80 flex items-center gap-1">
                            <Timer className="h-3 w-3" />
                            Valid Period
                          </span>
                          <span className="font-bold">{selectedVentureData.validDays} days</span>
                        </div>
                      </div>

                      {/* Loyalty benefits */}
                      <div className="bg-gradient-to-r from-yellow-500/20 to-orange-500/20 rounded-lg p-3 border border-yellow-400/30">
                        <div className="flex items-center gap-2 mb-2">
                          <Trophy className="h-4 w-4 text-yellow-300" />
                          <span className="text-yellow-200 font-medium">Platinum Member Benefits</span>
                        </div>
                        <div className="text-yellow-100 text-sm">
                          • Extended 60-day validity • Priority support • Bonus 5% loyalty credit
                        </div>
                      </div>

                      {/* Action buttons */}
                      <div className="space-y-3">
                        <Button 
                          onClick={handleRedemption}
                          className="w-full bg-white text-gray-900 hover:bg-gray-100 font-bold py-3 transition-all duration-200 shadow-lg"
                        >
                          <span className="bg-yellow-400 text-yellow-900 px-2 py-1 rounded text-xs font-bold mr-3">[HS]</span>
                          <Coins className="h-4 w-4 mr-2" />
                          Redeem for {selectedVentureData.cost} AND
                        </Button>
                        
                        <Button 
                          onClick={() => setCurrentFrame(1)}
                          variant="outline"
                          className="w-full border-white/30 text-white hover:bg-white/10 transition-all duration-200"
                        >
                          <ArrowLeft className="h-4 w-4 mr-2" />
                          Back to Marketplace
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                </div>
              </div>
            )}

            {/* Frame 3: Enhanced Wallet Approval */}
            {currentFrame === 3 && (
              <div className="space-y-6">
                <div className="text-center">
                  <h2 className="text-2xl font-bold text-green-900 dark:text-green-100 mb-2">
                    Wallet Approval
                  </h2>
                  <p className="text-green-700 dark:text-green-300">
                    {showApprovalModal ? 'Processing your transaction...' : 'Sign the transaction to complete your reward redemption'}
                  </p>
                </div>

                <div className="max-w-md mx-auto">
                  {showApprovalModal ? (
                    // Processing animation
                    <Card className="bg-gradient-to-br from-blue-50 to-purple-50 dark:from-blue-950/30 dark:to-purple-950/30 border-2 border-blue-300 dark:border-blue-700">
                      <CardContent className="p-8 text-center">
                        <div className="space-y-6">
                          <div className="relative">
                            <div className="w-20 h-20 bg-gradient-to-br from-blue-500 to-purple-500 rounded-full mx-auto flex items-center justify-center animate-pulse">
                              <Wallet className="h-10 w-10 text-white" />
                            </div>
                            <div className="absolute inset-0 border-4 border-blue-300 rounded-full animate-spin border-t-transparent" />
                          </div>
                          
                          <div>
                            <h3 className="text-lg font-bold text-blue-900 dark:text-blue-100 mb-2">
                              Processing Transaction
                            </h3>
                            <p className="text-blue-700 dark:text-blue-300 mb-4">
                              Please wait while we confirm your redemption
                            </p>
                            
                            <div className="bg-blue-100 dark:bg-blue-900/30 rounded-lg p-4">
                              <div className="text-3xl font-bold text-blue-600 mb-1">
                                {processingTime}
                              </div>
                              <div className="text-sm text-blue-700 dark:text-blue-300">
                                seconds remaining
                              </div>
                            </div>
                          </div>

                          <div className="space-y-2">
                            <div className="flex items-center justify-center gap-2 text-blue-600">
                              <Shield className="h-4 w-4" />
                              <span className="text-sm font-medium">Secure Transaction</span>
                            </div>
                            <Progress value={((3 - processingTime) / 3) * 100} className="h-2" />
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  ) : (
                    // Initial approval interface
                    <Card className="bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-800 dark:to-gray-900 border-2 border-gray-300 dark:border-gray-600">
                      <CardHeader className="text-center">
                        <div className="w-16 h-16 bg-gradient-to-br from-blue-500 to-purple-500 rounded-full mx-auto mb-4 flex items-center justify-center">
                          <Wallet className="h-8 w-8 text-white" />
                        </div>
                        <h3 className="text-lg font-bold text-gray-900 dark:text-gray-100">
                          MetaMask Transaction
                        </h3>
                        <p className="text-gray-600 dark:text-gray-400">
                          Confirm reward redemption
                        </p>
                      </CardHeader>

                      <CardContent className="space-y-4">
                        <div className="bg-gray-100 dark:bg-gray-700 rounded-lg p-4 space-y-3">
                          <div className="flex justify-between">
                            <span className="text-gray-600 dark:text-gray-400">Action</span>
                            <span className="font-bold text-gray-900 dark:text-gray-100">Redeem Reward</span>
                          </div>
                          <div className="flex justify-between">
                            <span className="text-gray-600 dark:text-gray-400">Venture</span>
                            <span className="font-bold text-gray-900 dark:text-gray-100">{selectedVentureData.name}</span>
                          </div>
                          <div className="flex justify-between">
                            <span className="text-gray-600 dark:text-gray-400">Amount</span>
                            <span className="font-bold text-gray-900 dark:text-gray-100">{selectedVentureData.cost} AND</span>
                          </div>
                          <div className="flex justify-between">
                            <span className="text-gray-600 dark:text-gray-400">Discount</span>
                            <span className="font-bold text-green-600">{selectedVentureData.discount} off</span>
                          </div>
                          <div className="flex justify-between">
                            <span className="text-gray-600 dark:text-gray-400">Gas Fee</span>
                            <span className="font-bold text-gray-900 dark:text-gray-100">~$2.50</span>
                          </div>
                          <div className="border-t border-gray-300 dark:border-gray-600 pt-2 flex justify-between">
                            <span className="font-bold text-gray-900 dark:text-gray-100">Total</span>
                            <span className="font-bold text-gray-900 dark:text-gray-100">{selectedVentureData.cost} AND + Gas</span>
                          </div>
                        </div>

                        <div className="grid grid-cols-2 gap-3">
                          <Button 
                            variant="outline"
                            className="border-gray-300 text-gray-700 hover:bg-gray-50 dark:border-gray-600 dark:text-gray-300 dark:hover:bg-gray-800"
                          >
                            Reject
                          </Button>
                          <Button 
                            onClick={() => {
                              setShowApprovalModal(true);
                              setProcessingTime(3);
                            }}
                            className="bg-blue-600 hover:bg-blue-700 text-white"
                          >
                            <span className="bg-yellow-400 text-yellow-900 px-1 py-0.5 rounded text-xs font-bold mr-2">[HS]</span>
                            Approve
                          </Button>
                        </div>
                      </CardContent>
                    </Card>
                  )}
                </div>
              </div>
            )}

            {/* Frame 4: Enhanced Success Confirmation */}
            {currentFrame === 4 && (
              <div className="text-center space-y-8">
                {/* Enhanced success animation */}
                <div className="relative">
                  <div className="w-32 h-32 bg-gradient-to-br from-green-500 to-emerald-500 rounded-full mx-auto flex items-center justify-center relative overflow-hidden">
                    <Check className="h-16 w-16 text-white z-10" />
                    
                    {/* Particle burst animation */}
                    {showSuccessAnimation && (
                      <>
                        {Array.from({ length: 16 }).map((_, i) => (
                          <div
                            key={i}
                            className="absolute w-3 h-3 bg-gradient-to-r from-yellow-400 to-orange-500 rounded-full animate-ping"
                            style={{
                              left: '50%',
                              top: '50%',
                              transform: `rotate(${i * 22.5}deg) translateY(-70px)`,
                              animationDelay: `${i * 0.1}s`,
                              animationDuration: '1.5s'
                            }}
                          />
                        ))}
                        
                        {/* Ripple effect */}
                        <div className="absolute inset-0 border-4 border-green-300 rounded-full animate-ping" />
                        <div className="absolute inset-4 border-4 border-green-400 rounded-full animate-ping" style={{ animationDelay: '0.3s' }} />
                      </>
                    )}
                  </div>
                </div>

                <div className="space-y-4">
                  <h2 className="text-3xl font-bold text-green-900 dark:text-green-100">
                    Reward Redeemed Successfully!
                  </h2>
                  <p className="text-green-700 dark:text-green-300 max-w-2xl mx-auto text-lg">
                    Your {selectedVentureData.discount} discount for {selectedVentureData.name} has been activated. 
                    Check your email for the exclusive coupon code and redemption instructions.
                  </p>
                </div>

                {/* Enhanced reward summary */}
                <div className="max-w-lg mx-auto">
                  <Card className="bg-gradient-to-br from-green-50 to-emerald-50 dark:from-green-950/30 dark:to-emerald-950/30 border-green-200 dark:border-green-800">
                    <CardContent className="pt-6 space-y-6">
                      <div className="flex items-center justify-center gap-4">
                        <div className="text-5xl">{selectedVentureData.icon}</div>
                        <div className="text-center">
                          <div className="font-bold text-green-900 dark:text-green-100 text-xl">
                            {selectedVentureData.name}
                          </div>
                          <div className="text-green-700 dark:text-green-300">
                            {selectedVentureData.discount} Discount Applied
                          </div>
                        </div>
                      </div>

                      <div className="grid grid-cols-2 gap-4">
                        <div className="bg-white/80 dark:bg-gray-800/80 rounded-lg p-4 text-center">
                          <div className="text-2xl font-bold text-green-600">{selectedVentureData.discount}</div>
                          <div className="text-sm text-green-700 dark:text-green-300">Discount</div>
                        </div>
                        <div className="bg-white/80 dark:bg-gray-800/80 rounded-lg p-4 text-center">
                          <div className="text-2xl font-bold text-green-600">{formatCurrency(selectedVentureData.estimatedSavings)}</div>
                          <div className="text-sm text-green-700 dark:text-green-300">Max Savings</div>
                        </div>
                      </div>

                      <div className="space-y-3 bg-white/60 dark:bg-gray-800/60 rounded-lg p-4">
                        <div className="flex justify-between">
                          <span className="text-green-700 dark:text-green-300 flex items-center gap-1">
                            <Sparkles className="h-4 w-4" />
                            Coupon Code
                          </span>
                          <span className="font-bold text-green-600 font-mono bg-green-100 dark:bg-green-900/30 px-2 py-1 rounded">
                            {selectedVentureData.name.replace(/[^A-Z]/g, '').slice(0, 3)}-{selectedVentureData.discount}-{Math.random().toString(36).substr(2, 6).toUpperCase()}
                          </span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-green-700 dark:text-green-300 flex items-center gap-1">
                            <Clock className="h-4 w-4" />
                            Valid Until
                          </span>
                          <span className="font-bold text-green-600">
                            {new Date(Date.now() + selectedVentureData.validDays * 24 * 60 * 60 * 1000).toLocaleDateString()}
                          </span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-green-700 dark:text-green-300 flex items-center gap-1">
                            <Award className="h-4 w-4" />
                            Loyalty Points
                          </span>
                          <span className="font-bold text-green-600">+{selectedVentureData.cost * 2} pts</span>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </div>

                {/* Updated user stats */}
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4 max-w-2xl mx-auto">
                  <div className="bg-blue-50 dark:bg-blue-950/30 p-4 rounded-lg border border-blue-200 dark:border-blue-800 relative overflow-hidden">
                    <div className="text-2xl font-bold text-blue-600">{userStats.andBalance - selectedVentureData.cost}</div>
                    <div className="text-sm text-blue-700 dark:text-blue-300">AND Balance</div>
                    <div className="absolute top-1 right-1">
                      <div className="w-2 h-2 bg-blue-400 rounded-full animate-pulse" />
                    </div>
                  </div>
                  <div className="bg-purple-50 dark:bg-purple-950/30 p-4 rounded-lg border border-purple-200 dark:border-purple-800 relative overflow-hidden">
                    <div className="text-2xl font-bold text-purple-600">{userStats.totalRewards + 1}</div>
                    <div className="text-sm text-purple-700 dark:text-purple-300">Total Rewards</div>
                    <div className="absolute top-1 right-1">
                      <Sparkles className="w-3 h-3 text-purple-400 animate-pulse" />
                    </div>
                  </div>
                  <div className="bg-green-50 dark:bg-green-950/30 p-4 rounded-lg border border-green-200 dark:border-green-800 relative overflow-hidden">
                    <div className="text-2xl font-bold text-green-600">{formatCurrency(selectedVentureData.estimatedSavings)}</div>
                    <div className="text-sm text-green-700 dark:text-green-300">Potential Savings</div>
                    <div className="absolute top-1 right-1">
                      <TrendingUp className="w-3 h-3 text-green-400 animate-pulse" />
                    </div>
                  </div>
                  <div className="bg-yellow-50 dark:bg-yellow-950/30 p-4 rounded-lg border border-yellow-200 dark:border-yellow-800 relative overflow-hidden">
                    <div className="text-2xl font-bold text-yellow-600 flex items-center justify-center">
                      <Trophy className="h-6 w-6" />
                    </div>
                    <div className="text-sm text-yellow-700 dark:text-yellow-300">Tier Progress</div>
                    <div className="absolute top-1 right-1">
                      <Star className="w-3 h-3 text-yellow-400 animate-pulse" />
                    </div>
                  </div>
                </div>

                <div className="space-y-4">
                  <div className="text-center">
                    <div className="inline-flex items-center gap-2 bg-emerald-100 dark:bg-emerald-900/30 text-emerald-800 dark:text-emerald-200 px-6 py-3 rounded-full">
                      <Sparkles className="h-4 w-4" />
                      Marketplace updated: "{selectedVentureData.name}" marked as redeemed
                    </div>
                  </div>

                  <div className="flex flex-wrap gap-4 justify-center">
                    <Button 
                      onClick={() => setCurrentFrame(1)}
                      className="bg-gradient-to-r from-green-600 to-emerald-600 text-white px-6 py-3"
                    >
                      <span className="bg-yellow-400 text-yellow-900 px-1 py-0.5 rounded text-xs font-bold mr-2">[HS]</span>
                      <ShoppingBag className="h-4 w-4 mr-2" />
                      View More Rewards
                    </Button>
                    <Button 
                      variant="outline" 
                      className="border-green-300 text-green-700 hover:bg-green-50 dark:border-green-700 dark:text-green-300 dark:hover:bg-green-900/20 px-6 py-3"
                    >
                      <ExternalLink className="h-4 w-4 mr-2" />
                      Visit {selectedVentureData.name}
                    </Button>
                  </div>
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
            className="border-green-200 text-green-700 hover:bg-green-50 dark:border-green-800 dark:text-green-300 dark:hover:bg-green-900/20"
          >
            <ArrowLeft className="h-4 w-4 mr-2" />
            Previous Frame
          </Button>

          <div className="text-sm text-green-600 dark:text-green-400 font-medium">
            Frame {currentFrame} of {frames.length}
          </div>

          <Button 
            onClick={() => setCurrentFrame(Math.min(frames.length, currentFrame + 1))}
            disabled={currentFrame === frames.length}
            className="bg-green-600 hover:bg-green-700 text-white"
          >
            Next Frame
            <ArrowRight className="h-4 w-4 ml-2" />
          </Button>
        </div>
      </div>
    </div>
  );
}