import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "motion/react";
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";
import { Button } from "../ui/button";
import { Badge } from "../ui/badge";
import { ImageWithFallback } from "../figma/ImageWithFallback";
import { LiveTicker } from "./shared/LiveTicker";
import { 
  CreditCard,
  Repeat,
  DollarSign,
  MapPin,
  Smartphone,
  Camera,
  Shield,
  Zap,
  TrendingUp,
  Globe,
  Users,
  Award,
  BarChart3,
  Target,
  CheckCircle,
  ArrowRightLeft,
  Wallet,
  Banknote,
  Scan,
  Upload,
  AlertCircle,
  Clock,
  Settings,
  Leaf
} from "lucide-react";

interface GcraftPrototypeProps {
  deviceView: 'desktop' | 'tablet' | 'mobile';
}

export function GcraftPrototype({ deviceView }: GcraftPrototypeProps) {
  const [activeSection, setActiveSection] = useState<'hero' | 'convert' | 'atm' | 'exchange' | 'vision'>('hero');
  const [cardBalance, setCardBalance] = useState(100);
  const [selectedMethod, setSelectedMethod] = useState('cash');
  const [totalConverted, setTotalConverted] = useState(8472956);
  const [activeUsers, setActiveUsers] = useState(127483);

  const isMobile = deviceView === 'mobile';
  const isTablet = deviceView === 'tablet';

  // Simulate real-time data
  useEffect(() => {
    const interval = setInterval(() => {
      setTotalConverted(prev => prev + Math.floor(Math.random() * 1000));
      setActiveUsers(prev => prev + (Math.random() > 0.7 ? 1 : 0));
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  const conversionMethods = [
    { id: 'cash', name: 'Cash', fee: '1.7%', icon: Banknote, payout: '$98.30', color: 'from-green-500 to-emerald-500' },
    { id: 'paypal', name: 'PayPal', fee: '1.7%', icon: Wallet, payout: '$98.30', color: 'from-blue-500 to-cyan-500' },
    { id: 'interac', name: 'Interac', fee: '1.7%', icon: DollarSign, payout: '$98.30', color: 'from-purple-500 to-pink-500' },
    { id: 'bank', name: 'Bank Transfer', fee: '1.7%', icon: Wallet, payout: '$98.30', color: 'from-indigo-500 to-blue-500' },
  ];

  const popularCards = [
    { name: 'Amazon', logo: '🛒', balance: '$150', fee: '1.7%', payout: '$147.45' },
    { name: 'Visa', logo: '💳', balance: '$100', fee: '1.7%', payout: '$98.30' },
    { name: 'Starbucks', logo: '☕', balance: '$50', fee: '1.7%', payout: '$49.15' },
    { name: 'Target', logo: '🎯', balance: '$75', fee: '1.7%', payout: '$73.72' },
  ];

  const atmLocations = [
    { id: 1, name: 'Downtown Mall', address: '123 Main St', distance: '0.3 mi', status: 'Available' },
    { id: 2, name: 'Central Station', address: '456 Transit Ave', distance: '0.7 mi', status: 'Available' },
    { id: 3, name: 'Shopping Plaza', address: '789 Commerce Blvd', distance: '1.2 mi', status: 'Available' },
    { id: 4, name: 'Airport Terminal', address: '321 Airport Rd', distance: '3.5 mi', status: 'Busy' },
  ];

  const exchangeOptions = [
    { from: 'Amazon', to: 'Visa', fee: '0.88%', example: '$100 → $99.12' },
    { from: 'Starbucks', to: 'Amazon', fee: '0.88%', example: '$50 → $49.56' },
    { from: 'Target', to: 'Visa', fee: '0.88%', example: '$75 → $74.34' },
  ];

  const navigationTabs = [
    { id: 'hero', label: 'Home', icon: CreditCard },
    { id: 'convert', label: 'Convert', icon: Repeat },
    { id: 'atm', label: 'ATM Network', icon: MapPin },
    { id: 'exchange', label: 'Exchange', icon: ArrowRightLeft },
    { id: 'vision', label: '$60M Vision', icon: TrendingUp },
  ];

  return (
    <div className="h-full text-white overflow-auto relative">
      <div className="relative z-10">
        {/* Header */}
        <div className="glass-strong border-b border-white/5 sticky top-0 z-50">
          <div className="flex items-center justify-between p-4">
            <div className="flex items-center gap-4">
              <div className="relative">
                <div className="w-14 h-14 bg-gradient-to-br from-emerald-500 via-blue-500 to-purple-500 rounded-2xl p-3 shadow-xl">
                  <CreditCard className="h-8 w-8 text-white" />
                </div>
                <motion.div 
                  className="absolute inset-0 bg-emerald-500 rounded-2xl blur-xl opacity-50"
                  animate={{ scale: [1, 1.2, 1], opacity: [0.3, 0.5, 0.3] }}
                  transition={{ duration: 2, repeat: Infinity }}
                />
              </div>
              <div>
                <h1 className="text-2xl font-black bg-gradient-to-r from-emerald-400 via-blue-400 to-purple-400 bg-clip-text text-transparent tracking-tight">
                  GCRAFT
                </h1>
                <p className="text-sm text-emerald-300 font-bold tracking-wide">GIFT CARD LIQUIDITY</p>
              </div>
            </div>
            
            {!isMobile && (
              <div className="flex items-center gap-6">
                <div className="text-right">
                  <div className="text-xs text-emerald-300/80 font-bold uppercase tracking-wide">Total Converted</div>
                  <div className="text-xl font-black text-emerald-400">${(totalConverted / 1000000).toFixed(2)}M</div>
                </div>
                <div className="text-right">
                  <div className="text-xs text-blue-300/80 font-bold uppercase tracking-wide">Active Users</div>
                  <div className="text-xl font-black text-blue-400">{activeUsers.toLocaleString()}</div>
                </div>
                <Badge className="bg-gradient-to-r from-emerald-500/20 to-blue-500/20 text-emerald-300 border border-emerald-500/40 px-4 py-2 font-black uppercase tracking-wide">
                  <Shield className="h-3 w-3 mr-2" />
                  KYC Verified
                </Badge>
              </div>
            )}
          </div>

          {/* Navigation */}
          <div className="px-4 pb-4">
            <div className="flex gap-1 glass-ultra p-1 rounded-xl border border-emerald-500/10 overflow-x-auto">
              {navigationTabs.map((tab) => (
                <Button
                  key={tab.id}
                  variant={activeSection === tab.id ? 'default' : 'ghost'}
                  size="sm"
                  onClick={() => setActiveSection(tab.id as any)}
                  className={`flex-shrink-0 ${
                    activeSection === tab.id 
                      ? 'bg-gradient-to-r from-emerald-600 via-blue-600 to-purple-600 text-white shadow-lg shadow-emerald-500/50 font-black' 
                      : 'text-emerald-300 hover:bg-emerald-500/20 hover:text-white'
                  }`}
                >
                  <tab.icon className="h-4 w-4 mr-2" />
                  {!isMobile && tab.label}
                </Button>
              ))}
            </div>
          </div>
        </div>

        {/* Live ambient metrics */}
        <div className="px-4 pt-4">
          <LiveTicker
            caption="MARKET LIVE"
            pulseColor="bg-fuchsia-400"
            metrics={[
              { label: 'Cards Listed', base: 18420, drift: 2, counter: true, accent: 'text-fuchsia-300' },
              { label: 'Avg Discount', base: 11.4, drift: 0.4, min: 8, max: 16, suffix: '%', decimals: 2, accent: 'text-rose-300' },
              { label: 'Volume / hr', base: 42830, drift: 180, min: 30000, max: 60000, prefix: '$', accent: 'text-emerald-300' },
              { label: 'Trades Today', base: 3247, drift: 2, counter: true, accent: 'text-sky-300' },
            ]}
          />
        </div>

        {/* Hero Section */}
        {activeSection === 'hero' && (
          <AnimatePresence mode="wait">
            <motion.div
              key="hero"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="relative"
            >
              {/* Hero Banner */}
              <div className="relative h-[600px] overflow-hidden">
                <div className="absolute inset-0">
                  <ImageWithFallback
                    src="https://images.unsplash.com/photo-1703206430439-b1ac230d7c9e?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxnaWZ0JTIwY2FyZCUyMHBheW1lbnR8ZW58MXx8fHwxNzY0MjgyNDM1fDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral"
                    alt="Gift Cards"
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-r from-emerald-900/95 via-blue-900/90 to-purple-900/95" />
                  
                  {/* Floating Elements */}
                  {Array.from({ length: 15 }).map((_, i) => (
                    <motion.div
                      key={i}
                      className="absolute"
                      initial={{
                        x: `${Math.random() * 100}%`,
                        y: `${Math.random() * 100}%`,
                      }}
                      animate={{
                        y: ['-10%', '110%'],
                        opacity: [0, 1, 1, 0],
                      }}
                      transition={{
                        duration: Math.random() * 10 + 10,
                        repeat: Infinity,
                        delay: Math.random() * 5,
                      }}
                    >
                      {i % 2 === 0 ? (
                        <CreditCard className="h-6 w-6 text-emerald-400/60" />
                      ) : (
                        <DollarSign className="h-6 w-6 text-blue-400/60" />
                      )}
                    </motion.div>
                  ))}
                </div>

                <div className="relative z-10 flex items-center justify-center h-full px-4">
                  <div className="text-center max-w-4xl">
                    <motion.div
                      initial={{ opacity: 0, scale: 0.8 }}
                      animate={{ opacity: 1, scale: 1 }}
                      transition={{ duration: 0.8 }}
                    >
                      <h1 className="text-6xl md:text-7xl font-black mb-6 bg-gradient-to-r from-emerald-300 via-blue-300 to-purple-300 bg-clip-text text-transparent leading-tight">
                        TURN CLUTTER<br />INTO CASH
                      </h1>
                    </motion.div>
                    
                    <motion.p
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.8, delay: 0.2 }}
                      className="text-2xl text-emerald-200 mb-8 font-medium leading-relaxed"
                    >
                      Convert unwanted gift cards to <span className="text-white font-bold">instant cash</span> or <span className="text-white font-bold">exchange for others.</span><br className="hidden md:block" />
                      Lowest fees. Instant payouts. 200+ ATM locations.
                    </motion.p>

                    <motion.div
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.8, delay: 0.4 }}
                      className="flex flex-wrap gap-4 justify-center mb-8"
                    >
                      <Button 
                        size="lg" 
                        onClick={() => setActiveSection('convert')}
                        className="bg-gradient-to-r from-emerald-600 via-blue-600 to-purple-600 hover:from-emerald-500 hover:via-blue-500 hover:to-purple-500 text-white font-black px-8 py-6 text-lg shadow-2xl shadow-emerald-500/50 transition-colors duration-300 hover:scale-105"
                      >
                        <Repeat className="h-6 w-6 mr-3" />
                        Convert Now
                      </Button>
                      <Button 
                        size="lg" 
                        variant="outline"
                        onClick={() => setActiveSection('vision')}
                        className="border-2 border-emerald-400/50 text-emerald-200 hover:bg-emerald-500/20 font-black px-8 py-6 text-lg backdrop-blur-xl"
                      >
                        <TrendingUp className="h-6 w-6 mr-3" />
                        $60M Vision
                      </Button>
                    </motion.div>

                    <motion.div
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{ duration: 0.8, delay: 0.6 }}
                      className="flex flex-wrap gap-8 justify-center"
                    >
                      {[
                        { label: '1.7% Fee', sublabel: 'Cash Conversion', icon: DollarSign },
                        { label: '0.88% Fee', sublabel: 'Card Exchange', icon: ArrowRightLeft },
                        { label: '200+ ATMs', sublabel: 'Instant Access', icon: MapPin },
                      ].map((stat, idx) => (
                        <div key={idx} className="text-center">
                          <div className="flex items-center justify-center gap-2 mb-2">
                            <stat.icon className="h-5 w-5 text-emerald-400" />
                            <div className="text-3xl font-black text-white">{stat.label}</div>
                          </div>
                          <div className="text-sm text-emerald-300 font-medium">{stat.sublabel}</div>
                        </div>
                      ))}
                    </motion.div>
                  </div>
                </div>
              </div>

              {/* How It Works */}
              <div className="p-6 md:p-12 max-w-7xl mx-auto">
                <div className="text-center mb-12">
                  <h2 className="text-4xl md:text-5xl font-black mb-4 bg-gradient-to-r from-emerald-400 to-purple-400 bg-clip-text text-transparent">
                    How Gcraft Works
                  </h2>
                  <p className="text-xl text-emerald-200/80 max-w-3xl mx-auto">
                    Industry-leading gift card liquidity platform with instant payouts
                  </p>
                </div>

                <div className={`grid gap-8 ${isMobile ? 'grid-cols-1' : isTablet ? 'grid-cols-2' : 'grid-cols-3'}`}>
                  {[
                    {
                      icon: Camera,
                      step: '01',
                      title: 'Scan Your Card',
                      description: 'Take photos of both sides of your gift card using our NFC-enabled app. AI instantly verifies the balance and authenticity.',
                      gradient: 'from-emerald-500 to-green-500'
                    },
                    {
                      icon: Shield,
                      step: '02',
                      title: 'KYC Verification',
                      description: 'Complete one-time identity verification to prevent fraud. Full account creation with secure data encryption.',
                      gradient: 'from-blue-500 to-cyan-500'
                    },
                    {
                      icon: DollarSign,
                      step: '03',
                      title: 'Choose Payout Method',
                      description: 'Select cash (1.7% fee), PayPal, Interac, or bank transfer. Or exchange for another gift card at 0.88% fee.',
                      gradient: 'from-purple-500 to-pink-500'
                    },
                    {
                      icon: Zap,
                      step: '04',
                      title: 'Instant Processing',
                      description: 'Our AI fraud detection verifies the card. Most transactions complete in under 2 minutes.',
                      gradient: 'from-indigo-500 to-blue-500'
                    },
                    {
                      icon: Wallet,
                      step: '05',
                      title: 'Receive Your Money',
                      description: 'Get paid instantly via your chosen method. $100 card = $98.30 cash after 1.7% fee.',
                      gradient: 'from-pink-500 to-rose-500'
                    },
                    {
                      icon: MapPin,
                      step: '06',
                      title: 'ATM Withdrawals',
                      description: 'Use our 200+ ATM network for instant cash. Member card + gift card verification = cash in hand.',
                      gradient: 'from-orange-500 to-red-500'
                    },
                  ].map((feature, index) => (
                    <motion.div
                      key={index}
                      initial={{ opacity: 0, y: 30 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true }}
                      transition={{ delay: index * 0.1 }}
                      whileHover={{ y: -8, scale: 1.02 }}
                    >
                      <Card className="bg-gradient-to-br from-black/60 to-black/40 border-emerald-500/20 hover:border-emerald-400/50 transition-colors duration-300 hover:shadow-2xl hover:shadow-emerald-500/20 h-full">
                        <CardContent className="p-8">
                          <div className="flex items-center gap-4 mb-6">
                            <div className={`w-16 h-16 rounded-2xl bg-gradient-to-br ${feature.gradient} p-4 shadow-lg flex items-center justify-center`}>
                              <feature.icon className="h-8 w-8 text-white" />
                            </div>
                            <div className="text-5xl font-black text-emerald-400/30">{feature.step}</div>
                          </div>
                          <h3 className="text-2xl font-black mb-3 text-white">{feature.title}</h3>
                          <p className="text-emerald-200/70 leading-relaxed">{feature.description}</p>
                        </CardContent>
                      </Card>
                    </motion.div>
                  ))}
                </div>

                {/* Popular Cards */}
                <div className="mt-20">
                  <div className="text-center mb-12">
                    <h2 className="text-4xl font-black mb-4 text-white">Popular Gift Cards</h2>
                    <p className="text-xl text-emerald-200/80">See what your card is worth instantly</p>
                  </div>

                  <div className={`grid gap-6 ${isMobile ? 'grid-cols-1' : isTablet ? 'grid-cols-2' : 'grid-cols-4'}`}>
                    {popularCards.map((card, index) => (
                      <motion.div
                        key={index}
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: index * 0.1 }}
                      >
                        <Card className="bg-gradient-to-br from-black/60 to-black/40 border-emerald-500/30 hover:border-emerald-400 transition-colors duration-300">
                          <CardContent className="p-6 text-center">
                            <div className="text-6xl mb-4">{card.logo}</div>
                            <h3 className="text-xl font-black text-white mb-2">{card.name}</h3>
                            <p className="text-3xl font-black text-emerald-400 mb-2">{card.balance}</p>
                            <div className="text-sm text-emerald-300/70 mb-3">Fee: {card.fee}</div>
                            <div className="p-3 bg-emerald-500/20 rounded-lg border border-emerald-500/40">
                              <div className="text-xs text-emerald-300/80 mb-1">You Get</div>
                              <div className="text-2xl font-black text-white">{card.payout}</div>
                            </div>
                          </CardContent>
                        </Card>
                      </motion.div>
                    ))}
                  </div>
                </div>
              </div>
            </motion.div>
          </AnimatePresence>
        )}

        {/* Convert Section */}
        {activeSection === 'convert' && (
          <AnimatePresence mode="wait">
            <motion.div
              key="convert"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="p-6 md:p-12 max-w-7xl mx-auto"
            >
              <div className="text-center mb-12">
                <h2 className="text-5xl font-black mb-4 bg-gradient-to-r from-emerald-400 via-blue-400 to-purple-400 bg-clip-text text-transparent">
                  Convert Gift Card to Cash
                </h2>
                <p className="text-xl text-emerald-200/80 max-w-3xl mx-auto">
                  Upload your card and get paid instantly
                </p>
              </div>

              {/* Card Scanner */}
              <Card className="bg-black/30 backdrop-blur-xl border-emerald-500/30 mb-8 max-w-3xl mx-auto">
                <CardHeader>
                  <CardTitle className="flex items-center gap-3 text-white text-2xl">
                    <Scan className="h-7 w-7 text-emerald-400" />
                    Scan Gift Card
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="aspect-video bg-gradient-to-br from-emerald-900/50 via-blue-900/50 to-purple-900/50 rounded-2xl flex items-center justify-center relative overflow-hidden mb-6">
                    <div className="text-center">
                      <Upload className="h-24 w-24 mx-auto mb-4 text-emerald-400" />
                      <p className="text-xl text-white font-black mb-2">Upload Card Images</p>
                      <p className="text-emerald-300/70">Front and back photos required</p>
                    </div>
                  </div>

                  <div className="space-y-4">
                    <div className="p-4 bg-emerald-500/20 rounded-lg border border-emerald-500/40">
                      <div className="flex items-center gap-3 mb-2">
                        <CreditCard className="h-5 w-5 text-emerald-400" />
                        <span className="text-white font-black">Card Balance: ${cardBalance.toFixed(2)}</span>
                      </div>
                      <div className="flex items-center gap-3">
                        <CheckCircle className="h-5 w-5 text-green-400" />
                        <span className="text-green-300">Verified ✓</span>
                      </div>
                    </div>

                    <Button 
                      className="w-full bg-gradient-to-r from-emerald-600 to-blue-600 hover:from-emerald-500 hover:to-blue-500 font-black py-6"
                      size="lg"
                    >
                      <Camera className="h-5 w-5 mr-2" />
                      Scan Card with NFC
                    </Button>
                  </div>
                </CardContent>
              </Card>

              {/* Payout Methods */}
              <Card className="bg-gradient-to-br from-black/60 to-black/40 border-emerald-500/30 max-w-3xl mx-auto">
                <CardHeader>
                  <CardTitle className="flex items-center gap-3 text-white text-2xl">
                    <Wallet className="h-7 w-7 text-emerald-400" />
                    Choose Payout Method
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="grid md:grid-cols-2 gap-4">
                    {conversionMethods.map((method) => (
                      <Card
                        key={method.id}
                        onClick={() => setSelectedMethod(method.id)}
                        className={`cursor-pointer transition-colors duration-300 ${
                          selectedMethod === method.id
                            ? 'border-2 border-emerald-400 bg-emerald-500/20 shadow-lg shadow-emerald-500/30'
                            : 'border border-emerald-500/30 bg-black/40 hover:border-emerald-400'
                        }`}
                      >
                        <CardContent className="p-6">
                          <div className={`w-12 h-12 mb-4 rounded-xl bg-gradient-to-br ${method.color} p-3`}>
                            <method.icon className="h-6 w-6 text-white" />
                          </div>
                          <h3 className="text-xl font-black text-white mb-2">{method.name}</h3>
                          <div className="text-sm text-emerald-300/70 mb-3">Fee: {method.fee}</div>
                          <div className="p-3 bg-black/40 rounded-lg">
                            <div className="text-xs text-emerald-300/80 mb-1">You Receive</div>
                            <div className="text-2xl font-black text-emerald-400">{method.payout}</div>
                          </div>
                        </CardContent>
                      </Card>
                    ))}
                  </div>

                  <Button 
                    className="w-full mt-6 bg-gradient-to-r from-emerald-600 to-purple-600 hover:from-emerald-500 hover:to-purple-500 font-black py-6"
                    size="lg"
                  >
                    <Zap className="h-5 w-5 mr-2" />
                    Convert Now - Get ${(cardBalance * 0.983).toFixed(2)}
                  </Button>
                </CardContent>
              </Card>
            </motion.div>
          </AnimatePresence>
        )}

        {/* ATM Network Section */}
        {activeSection === 'atm' && (
          <AnimatePresence mode="wait">
            <motion.div
              key="atm"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="p-6 md:p-12 max-w-7xl mx-auto"
            >
              <div className="text-center mb-12">
                <h2 className="text-5xl font-black mb-4 bg-gradient-to-r from-emerald-400 via-blue-400 to-purple-400 bg-clip-text text-transparent">
                  ATM Network
                </h2>
                <p className="text-xl text-emerald-200/80 max-w-3xl mx-auto">
                  200+ locations for instant cash withdrawals
                </p>
              </div>

              {/* ATM Hero */}
              <Card className="bg-gradient-to-br from-black/60 to-black/40 border-emerald-500/30 mb-8 overflow-hidden">
                <div className="aspect-video bg-gradient-to-br from-emerald-900/50 via-blue-900/50 to-purple-900/50 relative">
                  <ImageWithFallback
                    src="https://images.unsplash.com/photo-1668609541695-56ddc557db57?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxhdG0lMjBjYXNoJTIwbWFjaGluZXxlbnwxfHx8fDE3NjQyODI0MzV8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral"
                    alt="ATM Machine"
                    className="absolute inset-0 w-full h-full object-cover opacity-60"
                  />
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className="text-center bg-black/40 backdrop-blur-xl rounded-2xl p-8 border border-emerald-500/30">
                      <MapPin className="h-16 w-16 mx-auto mb-4 text-emerald-400" />
                      <h3 className="text-3xl font-black text-white mb-2">Instant Cash Access</h3>
                      <p className="text-emerald-300 mb-4">Member card + gift card = instant cash</p>
                      <Badge className="bg-emerald-500/20 text-emerald-400 border-emerald-500/40 px-4 py-2">
                        $1.50 ATM Fee
                      </Badge>
                    </div>
                  </div>
                </div>
              </Card>

              {/* ATM Locations */}
              <div className="grid gap-6">
                {atmLocations.map((location, index) => (
                  <motion.div
                    key={location.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.1 }}
                  >
                    <Card className="bg-gradient-to-br from-black/60 to-black/40 border-emerald-500/30 hover:border-emerald-400 transition-colors duration-300">
                      <CardContent className="p-6">
                        <div className={`grid ${isMobile ? 'grid-cols-1' : 'md:grid-cols-4'} gap-6 items-center`}>
                          <div className="flex items-center gap-4">
                            <div className="w-16 h-16 rounded-full bg-gradient-to-br from-emerald-500 to-blue-500 p-4 flex items-center justify-center shadow-lg">
                              <MapPin className="h-8 w-8 text-white" />
                            </div>
                            <div>
                              <h3 className="text-xl font-black text-white">{location.name}</h3>
                              <p className="text-sm text-emerald-300/70">{location.address}</p>
                            </div>
                          </div>

                          <div className="text-center">
                            <div className="text-3xl font-black text-emerald-400 mb-1">{location.distance}</div>
                            <div className="text-sm text-emerald-300/70">Away</div>
                          </div>

                          <div className="text-center">
                            <Badge className={`${
                              location.status === 'Available'
                                ? 'bg-green-500/20 text-green-400 border-green-500/40'
                                : 'bg-orange-500/20 text-orange-400 border-orange-500/40'
                            } px-4 py-2 font-black`}>
                              {location.status}
                            </Badge>
                          </div>

                          <Button 
                            className="bg-gradient-to-r from-emerald-600 to-blue-600 hover:from-emerald-500 hover:to-blue-500 font-black"
                          >
                            Get Directions
                          </Button>
                        </div>
                      </CardContent>
                    </Card>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          </AnimatePresence>
        )}

        {/* Exchange Section */}
        {activeSection === 'exchange' && (
          <AnimatePresence mode="wait">
            <motion.div
              key="exchange"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="p-6 md:p-12 max-w-7xl mx-auto"
            >
              <div className="text-center mb-12">
                <h2 className="text-5xl font-black mb-4 bg-gradient-to-r from-emerald-400 via-blue-400 to-purple-400 bg-clip-text text-transparent">
                  Gift Card Exchange
                </h2>
                <p className="text-xl text-emerald-200/80 max-w-3xl mx-auto">
                  Swap unwanted cards for ones you want — only 0.88% fee
                </p>
              </div>

              <Card className="bg-gradient-to-br from-purple-900/30 to-pink-900/30 border-2 border-purple-500/50 mb-12">
                <CardContent className="p-12 text-center">
                  <ArrowRightLeft className="h-24 w-24 mx-auto mb-6 text-purple-400" />
                  <h3 className="text-3xl font-black text-white mb-4">0.88% Exchange Fee</h3>
                  <p className="text-emerald-200/80 max-w-2xl mx-auto mb-8">
                    Exchange gift cards for other gift cards at the lowest fee in the industry. No cash conversion fees.
                  </p>
                  <Badge className="bg-purple-500/20 text-purple-400 border-purple-500/40 px-6 py-3 text-lg font-black">
                    $100 Card → $99.12 New Card
                  </Badge>
                </CardContent>
              </Card>

              <div className="grid gap-6">
                {exchangeOptions.map((option, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: index * 0.1 }}
                  >
                    <Card className="bg-gradient-to-br from-black/60 to-black/40 border-emerald-500/30">
                      <CardContent className="p-6">
                        <div className={`grid ${isMobile ? 'grid-cols-1' : 'grid-cols-3'} gap-6 items-center`}>
                          <div className="text-center">
                            <div className="text-4xl mb-2">🛒</div>
                            <div className="text-xl font-black text-white">{option.from}</div>
                          </div>

                          <div className="text-center">
                            <ArrowRightLeft className="h-12 w-12 mx-auto text-purple-400 mb-2" />
                            <div className="text-purple-300 font-bold">Fee: {option.fee}</div>
                            <div className="text-sm text-emerald-300/70 mt-1">{option.example}</div>
                          </div>

                          <div className="text-center">
                            <div className="text-4xl mb-2">💳</div>
                            <div className="text-xl font-black text-white">{option.to}</div>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          </AnimatePresence>
        )}

        {/* $60M Vision Section */}
        {activeSection === 'vision' && (
          <AnimatePresence mode="wait">
            <motion.div
              key="vision"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="p-6 md:p-12 max-w-7xl mx-auto"
            >
              <div className="text-center mb-12">
                <h2 className="text-6xl md:text-7xl font-black mb-4 bg-gradient-to-r from-green-400 via-emerald-400 to-teal-400 bg-clip-text text-transparent">
                  $60 MILLION VISION
                </h2>
                <p className="text-2xl text-emerald-200/80 max-w-3xl mx-auto">
                  Year 5 Projection — Dominating the $500B Gift Card Market
                </p>
              </div>

              {/* Financial Hero */}
              <Card className="bg-gradient-to-br from-green-900/30 to-emerald-900/30 border-2 border-green-500/50 mb-12 overflow-hidden">
                <div className="relative h-64">
                  <ImageWithFallback
                    src="https://images.unsplash.com/photo-1523629619140-ee5b56cb3b23?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxtb25leSUyMGNhc2glMjBleGNoYW5nZXxlbnwxfHx8fDE3NjQyODI0Mzd8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral"
                    alt="Financial Vision"
                    className="absolute inset-0 w-full h-full object-cover opacity-20"
                  />
                  <div className="absolute inset-0 bg-gradient-to-r from-green-900/90 to-emerald-900/90" />
                  <div className="relative z-10 flex items-center justify-center h-full">
                    <div className="text-center">
                      <motion.div
                        initial={{ scale: 0 }}
                        animate={{ scale: 1 }}
                        transition={{ type: "spring", duration: 1 }}
                        className="text-7xl font-black text-white mb-4"
                      >
                        $60,000,000
                      </motion.div>
                      <div className="text-2xl text-green-200 font-bold">Year 5 Revenue Target</div>
                      <div className="text-emerald-300 mt-2">Transforming $30B in unused gift cards</div>
                    </div>
                  </div>
                </div>
              </Card>

              {/* 5-Year Growth */}
              <Card className="bg-gradient-to-br from-black/60 to-black/40 border-emerald-500/30 mb-12">
                <CardHeader>
                  <CardTitle className="flex items-center gap-3 text-white text-2xl">
                    <TrendingUp className="h-7 w-7 text-green-400" />
                    5-Year Revenue Trajectory
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {[
                      { year: 1, revenue: '$4.5M', transactions: '600K', atms: '50', highlight: 'Launch' },
                      { year: 2, revenue: '$11.5M', transactions: '1.4M', atms: '200', highlight: 'Scale' },
                      { year: 3, revenue: '$25.5M', transactions: '3M', atms: '500', highlight: 'Growth' },
                      { year: 4, revenue: '$42M', transactions: '5M', atms: '1,000', highlight: 'Expansion' },
                      { year: 5, revenue: '$60M', transactions: '7.5M', atms: '2,000', highlight: 'Dominance' },
                    ].map((milestone, idx) => (
                      <motion.div
                        key={idx}
                        initial={{ opacity: 0, x: -20 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: idx * 0.1 }}
                      >
                        <div className={`p-6 rounded-xl ${
                          milestone.year === 5 
                            ? 'bg-gradient-to-r from-green-500/20 to-emerald-500/20 border-2 border-green-500/50' 
                            : 'bg-emerald-500/10 border border-emerald-500/20'
                        }`}>
                          <div className="grid grid-cols-2 md:grid-cols-5 gap-4 items-center">
                            <div>
                              <div className="text-sm text-emerald-300/80 mb-1">Year {milestone.year}</div>
                              <div className={`text-2xl font-black ${milestone.year === 5 ? 'text-green-400' : 'text-white'}`}>
                                {milestone.highlight}
                              </div>
                            </div>
                            <div>
                              <div className="text-sm text-emerald-300/80 mb-1">Revenue</div>
                              <div className="text-xl font-black text-white">{milestone.revenue}</div>
                            </div>
                            <div>
                              <div className="text-sm text-emerald-300/80 mb-1">Transactions</div>
                              <div className="text-xl font-black text-white">{milestone.transactions}</div>
                            </div>
                            <div>
                              <div className="text-sm text-emerald-300/80 mb-1">ATMs</div>
                              <div className="text-xl font-black text-white">{milestone.atms}</div>
                            </div>
                            <div className="text-right">
                              {milestone.year === 5 && (
                                <Badge className="bg-green-500 text-white border-none font-black px-4 py-2">
                                  TARGET
                                </Badge>
                              )}
                            </div>
                          </div>
                        </div>
                      </motion.div>
                    ))}
                  </div>
                </CardContent>
              </Card>

              {/* Market Breakdown */}
              <div className={`grid gap-8 mb-12 ${isMobile ? 'grid-cols-1' : 'grid-cols-2'}`}>
                <Card className="bg-gradient-to-br from-emerald-900/30 to-green-900/30 border-2 border-emerald-500/40">
                  <CardHeader>
                    <CardTitle className="flex items-center gap-3 text-white text-xl">
                      <Globe className="h-6 w-6 text-emerald-400" />
                      Market Opportunity
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="text-5xl font-black text-white mb-2">$500B</div>
                    <div className="text-emerald-200/80 mb-6">Global Gift Card Market</div>
                    <div className="space-y-3">
                      {[
                        { segment: 'Total Gift Card Market', size: '$500B' },
                        { segment: 'Unused Cards (US)', size: '$30B' },
                        { segment: 'Secondary Market', size: '$10B' },
                      ].map((segment, idx) => (
                        <div key={idx} className="flex justify-between items-center p-3 bg-black/40 rounded-lg">
                          <span className="text-emerald-200">{segment.segment}</span>
                          <span className="text-xl font-black text-emerald-400">{segment.size}</span>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>

                <Card className="bg-gradient-to-br from-blue-900/30 to-purple-900/30 border-2 border-blue-500/40">
                  <CardHeader>
                    <CardTitle className="flex items-center gap-3 text-white text-xl">
                      <Target className="h-6 w-6 text-blue-400" />
                      Revenue Streams
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      {[
                        { stream: 'Conversion Fees', revenue: '$32M', percentage: '53%' },
                        { stream: 'ATM Fees', revenue: '$11M', percentage: '18%' },
                        { stream: 'Partner Revenue', revenue: '$17M', percentage: '29%' },
                      ].map((stream, idx) => (
                        <div key={idx}>
                          <div className="flex justify-between items-center mb-2">
                            <span className="text-blue-200 font-bold">{stream.stream}</span>
                            <span className="text-xl font-black text-white">{stream.revenue}</span>
                          </div>
                          <div className="h-2 bg-black/40 rounded-full overflow-hidden">
                            <motion.div
                              initial={{ width: 0 }}
                              whileInView={{ width: stream.percentage }}
                              viewport={{ once: true }}
                              transition={{ duration: 1, delay: idx * 0.2 }}
                              className="h-full bg-gradient-to-r from-blue-500 to-purple-500"
                            />
                          </div>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </div>

              {/* Key Metrics */}
              <Card className="bg-gradient-to-br from-black/60 to-black/40 border-emerald-500/30">
                <CardHeader>
                  <CardTitle className="flex items-center gap-3 text-white text-2xl">
                    <BarChart3 className="h-7 w-7 text-emerald-400" />
                    Year 5 Key Metrics
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
                    {[
                      { label: 'Total Revenue', value: '$60M', icon: DollarSign, color: 'text-green-400' },
                      { label: 'Transactions', value: '7.5M', icon: Repeat, color: 'text-emerald-400' },
                      { label: 'ATM Network', value: '2,000', icon: MapPin, color: 'text-blue-400' },
                      { label: 'Active Users', value: '1.2M', icon: Users, color: 'text-cyan-400' },
                      { label: 'Partnerships', value: '150+', icon: Globe, color: 'text-purple-400' },
                      { label: 'Profit Margin', value: '78%', icon: TrendingUp, color: 'text-green-400' },
                      { label: 'Team Size', value: '200+', icon: Users, color: 'text-indigo-400' },
                      { label: 'Cards Saved', value: '50K tons', icon: Leaf, color: 'text-green-400' },
                    ].map((metric, idx) => (
                      <motion.div
                        key={idx}
                        initial={{ opacity: 0, scale: 0.9 }}
                        whileInView={{ opacity: 1, scale: 1 }}
                        viewport={{ once: true }}
                        transition={{ delay: idx * 0.05 }}
                        className="text-center p-6 bg-emerald-500/10 rounded-xl border border-emerald-500/20"
                      >
                        <metric.icon className={`h-10 w-10 mx-auto mb-3 ${metric.color}`} />
                        <div className="text-3xl font-black text-white mb-2">{metric.value}</div>
                        <div className="text-sm text-emerald-300/80">{metric.label}</div>
                      </motion.div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          </AnimatePresence>
        )}
      </div>
    </div>
  );
}