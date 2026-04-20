import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "motion/react";
import { Button } from "../ui/button";
import { Badge } from "../ui/badge";
import { Card, CardContent } from "../ui/card";
import { ImageWithFallback } from "../figma/ImageWithFallback";
import { 
  Flower,
  Flower2,
  Sun,
  Sparkles,
  Heart,
  Clock,
  DollarSign,
  Leaf,
  TrendingUp,
  Globe,
  Users,
  Award,
  BarChart3,
  Target,
  RefreshCw,
  CheckCircle,
  Calendar,
  CreditCard,
  Gift,
  TreePine,
  Zap,
  Eye,
  Play,
  Settings,
  Save
} from "lucide-react";

type BloomSection = 'hero' | 'lifecycle' | 'myflowers' | 'device' | 'vision';

interface EverBloomPrototypeProps {
  deviceView: 'desktop' | 'tablet' | 'mobile';
  /** Optional starting section. Lets parent prototypes (e.g. HFLO) open the bloom experience on a specific section. */
  initialSection?: BloomSection;
}

export function EverBloomPrototype({ deviceView, initialSection = 'hero' }: EverBloomPrototypeProps) {
  const [activeSection, setActiveSection] = useState<BloomSection>(initialSection);
  const [selectedFlower, setSelectedFlower] = useState<any>(null);
  const [flowersSold, setFlowersSold] = useState(24789);
  const [co2Saved, setCo2Saved] = useState(297);

  const isMobile = deviceView === 'mobile';
  const isTablet = deviceView === 'tablet';

  // Simulate real-time data
  useEffect(() => {
    const interval = setInterval(() => {
      setFlowersSold(prev => prev + Math.floor(Math.random() * 3));
      setCo2Saved(prev => prev + (Math.random() > 0.8 ? 0.1 : 0));
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  const myFlowers = [
    {
      id: 1,
      name: 'Golden Rose',
      variant: 'Premium',
      purchaseDate: '6 months ago',
      stage: 'Blossoming',
      daysRemaining: 47,
      progress: 73,
      nextDecay: '47 days',
      refreshCost: null,
      color: 'from-amber-500 to-yellow-500'
    },
    {
      id: 2,
      name: 'Sunset Lily',
      variant: 'Basic',
      purchaseDate: '8 months ago',
      stage: 'Decay Stage 2',
      daysRemaining: 3,
      progress: 45,
      nextDecay: '3 days',
      refreshCost: '$3',
      color: 'from-orange-500 to-red-500'
    },
    {
      id: 3,
      name: 'Eternal Orchid',
      variant: 'Luxury',
      purchaseDate: '2.3 years ago',
      stage: 'Bonsai Ready',
      daysRemaining: 0,
      progress: 100,
      nextDecay: 'Complete',
      refreshCost: null,
      color: 'from-purple-500 to-pink-500',
      reward: 'Bonsai + NFT'
    },
  ];

  const decayStages = [
    { id: 1, name: 'Petal Curl', cost: '$1', duration: '10% fade/day', description: 'Gentle wilting begins' },
    { id: 2, name: 'Color Fade', cost: '$3', duration: '20% fade/day', description: 'Golden hues dim' },
    { id: 3, name: 'Stem Brown', cost: '$5', duration: '30% fade/day', description: 'Structural decay visible' },
    { id: 4, name: 'Fragmentation', cost: '$15', duration: 'Critical', description: 'Emergency revival needed' },
  ];

  const pricingTiers = [
    {
      name: 'Basic Bloom',
      price: '$15',
      features: ['Single flower', '2-day decay option', '6-month blossoming', 'Solar powered', 'App connectivity'],
      popular: false
    },
    {
      name: 'Premium Garden',
      price: '$35',
      features: ['Multi-bloom bouquet', '5-week decay option', 'Custom animations', 'NFC interactions', 'Priority support'],
      popular: true
    },
    {
      name: 'Luxury Collection',
      price: '$50',
      features: ['Limited edition designs', 'AR message triggers', 'Extended warranty', 'Exclusive NFTs', 'VIP refresh rates'],
      popular: false
    },
  ];

  const navigationTabs = [
    { id: 'hero', label: 'Home', icon: Flower },
    { id: 'lifecycle', label: 'Lifecycle', icon: RefreshCw },
    { id: 'myflowers', label: 'My Flowers', icon: Flower2 },
    { id: 'device', label: 'Device', icon: Sun },
    { id: 'vision', label: '$40.5M Vision', icon: TrendingUp },
  ];

  return (
    <div className="h-full text-white overflow-auto relative">
      <div className="relative z-10">
        {/* Header */}
        <div className="glass-strong border-b border-white/5 sticky top-0 z-50">
          <div className="flex items-center justify-between p-4">
            <div className="flex items-center gap-4">
              <div className="relative">
                <div className="w-14 h-14 bg-gradient-to-br from-amber-500 via-yellow-500 to-green-500 rounded-2xl p-3 shadow-xl">
                  <Flower className="h-8 w-8 text-white" />
                </div>
                <motion.div 
                  className="absolute inset-0 bg-amber-500 rounded-2xl blur-xl opacity-50"
                  animate={{ scale: [1, 1.2, 1], opacity: [0.3, 0.5, 0.3] }}
                  transition={{ duration: 2, repeat: Infinity }}
                />
              </div>
              <div>
                <h1 className="text-2xl font-black bg-gradient-to-r from-amber-400 via-yellow-400 to-green-400 bg-clip-text text-transparent tracking-tight">
                  EVERBLOOM
                </h1>
                <p className="text-sm text-amber-300 font-bold tracking-wide">DIGITAL GARDENS</p>
              </div>
            </div>
            
            {!isMobile && (
              <div className="flex items-center gap-6">
                <div className="text-right">
                  <div className="text-xs text-amber-300/80 font-bold uppercase tracking-wide">Flowers Sold</div>
                  <div className="text-xl font-black text-amber-400">{flowersSold.toLocaleString()}</div>
                </div>
                <div className="text-right">
                  <div className="text-xs text-green-300/80 font-bold uppercase tracking-wide">CO₂ Saved</div>
                  <div className="text-xl font-black text-green-400">{co2Saved.toFixed(1)} tons</div>
                </div>
                <Badge className="bg-gradient-to-r from-amber-500/20 to-green-500/20 text-amber-300 border border-amber-500/40 px-4 py-2 font-black uppercase tracking-wide">
                  <Sun className="h-3 w-3 mr-2" />
                  Solar Powered
                </Badge>
              </div>
            )}
          </div>

          {/* Navigation */}
          <div className="px-4 pb-4">
            <div className="flex gap-1 glass-ultra p-1 rounded-xl border border-amber-500/10 overflow-x-auto">
              {navigationTabs.map((tab) => (
                <Button
                  key={tab.id}
                  variant={activeSection === tab.id ? 'default' : 'ghost'}
                  size="sm"
                  onClick={() => setActiveSection(tab.id as any)}
                  className={`flex-shrink-0 ${
                    activeSection === tab.id 
                      ? 'bg-gradient-to-r from-amber-600 via-yellow-600 to-green-600 text-white shadow-lg shadow-amber-500/50 font-black' 
                      : 'text-amber-300 hover:bg-amber-500/20 hover:text-white'
                  }`}
                >
                  <tab.icon className="h-4 w-4 mr-2" />
                  {!isMobile && tab.label}
                </Button>
              ))}
            </div>
          </div>
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
                    src="https://images.unsplash.com/photo-1560991553-0ac2b83ba773?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxnb2xkZW4lMjBmbG93ZXIlMjBibG9vbXxlbnwxfHx8fDE3NjQyODA5OTd8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral"
                    alt="Golden Flower"
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-r from-amber-900/95 via-yellow-900/90 to-green-900/95" />
                  
                  {/* Floating Sparkles */}
                  {Array.from({ length: 20 }).map((_, i) => (
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
                        scale: [0, 1, 1, 0],
                      }}
                      transition={{
                        duration: Math.random() * 8 + 8,
                        repeat: Infinity,
                        delay: Math.random() * 5,
                      }}
                    >
                      <Sparkles className="h-4 w-4 text-amber-400/60" />
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
                      <h1 className="text-6xl md:text-7xl font-black mb-6 bg-gradient-to-r from-amber-300 via-yellow-300 to-green-300 bg-clip-text text-transparent leading-tight">
                        FLOWERS THAT<br />NEVER DIE
                      </h1>
                    </motion.div>
                    
                    <motion.p
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.8, delay: 0.2 }}
                      className="text-2xl text-amber-200 mb-8 font-medium leading-relaxed"
                    >
                      Solar-powered holographic flowers that <span className="text-white font-bold">bloom, decay, and revive.</span><br className="hidden md:block" />
                      Create lasting memories with digital flora that evolves with you.
                    </motion.p>

                    <motion.div
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.8, delay: 0.4 }}
                      className="flex flex-wrap gap-4 justify-center mb-8"
                    >
                      <Button 
                        size="lg" 
                        onClick={() => setActiveSection('lifecycle')}
                        className="bg-gradient-to-r from-amber-600 via-yellow-600 to-green-600 hover:from-amber-500 hover:via-yellow-500 hover:to-green-500 text-white font-black px-8 py-6 text-lg shadow-2xl shadow-amber-500/50 transition-colors duration-300 hover:scale-105"
                      >
                        <Flower className="h-6 w-6 mr-3" />
                        Explore Lifecycle
                      </Button>
                      <Button 
                        size="lg" 
                        variant="outline"
                        onClick={() => setActiveSection('vision')}
                        className="border-2 border-amber-400/50 text-amber-200 hover:bg-amber-500/20 font-black px-8 py-6 text-lg backdrop-blur-xl"
                      >
                        <TrendingUp className="h-6 w-6 mr-3" />
                        $40.5M Vision
                      </Button>
                    </motion.div>

                    <motion.div
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{ duration: 0.8, delay: 0.6 }}
                      className="flex flex-wrap gap-8 justify-center"
                    >
                      {[
                        { label: '6 Months', sublabel: 'Blossoming', icon: Flower },
                        { label: 'Solar Powered', sublabel: '100% Sustainable', icon: Sun },
                        { label: '2.5 Years', sublabel: 'Bonsai Reward', icon: TreePine },
                      ].map((stat, idx) => (
                        <div key={idx} className="text-center">
                          <div className="flex items-center justify-center gap-2 mb-2">
                            <stat.icon className="h-5 w-5 text-amber-400" />
                            <div className="text-3xl font-black text-white">{stat.label}</div>
                          </div>
                          <div className="text-sm text-amber-300 font-medium">{stat.sublabel}</div>
                        </div>
                      ))}
                    </motion.div>
                  </div>
                </div>
              </div>

              {/* Key Features */}
              <div className="p-6 md:p-12 max-w-7xl mx-auto">
                <div className="text-center mb-12">
                  <h2 className="text-4xl md:text-5xl font-black mb-4 bg-gradient-to-r from-amber-400 to-green-400 bg-clip-text text-transparent">
                    How EverBloom Works
                  </h2>
                  <p className="text-xl text-amber-200/80 max-w-3xl mx-auto">
                    Digital flowers with emotional lifecycles — blossom, decay, and revival
                  </p>
                </div>

                <div className={`grid gap-8 ${isMobile ? 'grid-cols-1' : isTablet ? 'grid-cols-2' : 'grid-cols-3'}`}>
                  {[
                    {
                      icon: Flower,
                      title: '6-Month Blossoming',
                      description: 'Watch your golden flower grow and evolve over 6 months. AI-driven animations show petals expanding 0.5% daily with color shifts from gold to rose-gold.',
                      gradient: 'from-amber-500 to-yellow-500'
                    },
                    {
                      icon: Clock,
                      title: 'Customizable Decay',
                      description: 'Choose your decay timeline: 2 days for impulse gifts or 5 weeks for extended beauty. Four decay stages create emotional depth and connection.',
                      gradient: 'from-yellow-500 to-orange-500'
                    },
                    {
                      icon: RefreshCw,
                      title: 'Revival System',
                      description: 'Refresh your flower for $1-$15 based on decay stage. Watch the 48-hour recovery process with soothing light pulses and emotional storytelling.',
                      gradient: 'from-orange-500 to-red-500'
                    },
                    {
                      icon: Sun,
                      title: 'Solar Powered',
                      description: 'Zero carbon footprint. 6W solar panels charge in 3 hours of sunlight. Battery lasts 6 months on a full charge. Completely sustainable.',
                      gradient: 'from-green-500 to-emerald-500'
                    },
                    {
                      icon: Heart,
                      title: 'Emotional Connection',
                      description: 'Flowers retain "scars" from past decays. Build memories and stories. 92% of users report emotional attachment after 3 months.',
                      gradient: 'from-pink-500 to-rose-500'
                    },
                    {
                      icon: TreePine,
                      title: 'Bonsai Reward',
                      description: 'After 2.5 years, receive a physical 6" juniper bonsai plus NFT certificate. Start a new digital flower journey with exclusive rewards.',
                      gradient: 'from-teal-500 to-cyan-500'
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
                      <Card className="bg-black/30 backdrop-blur-xl border-amber-500/20 hover:border-amber-400/50 transition-colors duration-300 hover:shadow-2xl hover:shadow-amber-500/20 h-full">
                        <CardContent className="p-8">
                          <div className={`w-16 h-16 mb-6 rounded-2xl bg-gradient-to-br ${feature.gradient} p-4 shadow-lg`}>
                            <feature.icon className="h-8 w-8 text-white" />
                          </div>
                          <h3 className="text-2xl font-black mb-3 text-white">{feature.title}</h3>
                          <p className="text-amber-200/70 leading-relaxed">{feature.description}</p>
                        </CardContent>
                      </Card>
                    </motion.div>
                  ))}
                </div>

                {/* Pricing Tiers */}
                <div className="mt-20">
                  <div className="text-center mb-12">
                    <h2 className="text-4xl font-black mb-4 text-white">Choose Your Bloom</h2>
                    <p className="text-xl text-amber-200/80">Start your digital garden journey</p>
                  </div>

                  <div className={`grid gap-6 ${isMobile ? 'grid-cols-1' : 'grid-cols-3'}`}>
                    {pricingTiers.map((tier, index) => (
                      <motion.div
                        key={index}
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: index * 0.1 }}
                      >
                        <Card className={`${
                          tier.popular 
                            ? 'bg-gradient-to-br from-amber-900/40 to-yellow-900/40 border-2 border-amber-400 shadow-2xl shadow-amber-500/20' 
                            : 'bg-black/30 backdrop-blur-xl border-amber-500/30'
                        } relative h-full`}>
                          {tier.popular && (
                            <div className="absolute -top-4 left-1/2 -translate-x-1/2">
                              <Badge className="bg-gradient-to-r from-amber-500 to-yellow-500 text-white border-none font-black px-4 py-2">
                                MOST POPULAR
                              </Badge>
                            </div>
                          )}
                          <CardContent className="p-8">
                            <h3 className="text-2xl font-black text-white mb-2">{tier.name}</h3>
                            <div className="mb-6">
                              <span className="text-5xl font-black text-amber-400">{tier.price}</span>
                            </div>
                            <div className="space-y-3 mb-8">
                              {tier.features.map((feature, idx) => (
                                <div key={idx} className="flex items-center gap-2 text-amber-200">
                                  <CheckCircle className="h-5 w-5 text-amber-400 flex-shrink-0" />
                                  <span>{feature}</span>
                                </div>
                              ))}
                            </div>
                            <Button 
                              className={`w-full font-black ${
                                tier.popular
                                  ? 'bg-gradient-to-r from-amber-600 to-yellow-600 hover:from-amber-500 hover:to-yellow-500'
                                  : 'bg-gradient-to-r from-gray-700 to-gray-800 hover:from-gray-600 hover:to-gray-700'
                              }`}
                              size="lg"
                            >
                              Purchase Now
                            </Button>
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

        {/* Lifecycle Section - Showing full lifecycle management with decay stages and revival */}
        {activeSection === 'lifecycle' && (
          <AnimatePresence mode="wait">
            <motion.div
              key="lifecycle"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="p-6 md:p-12 max-w-7xl mx-auto"
            >
              <div className="text-center mb-12">
                <h2 className="text-5xl font-black mb-4 bg-gradient-to-r from-amber-400 via-yellow-400 to-green-400 bg-clip-text text-transparent">
                  Flower Lifecycle
                </h2>
                <p className="text-xl text-amber-200/80 max-w-3xl mx-auto">
                  Experience the complete journey from blossom to revival
                </p>
              </div>

              {/* Lifecycle Timeline */}
              <Card className="bg-black/30 backdrop-blur-xl border-amber-500/30 mb-12">
                <CardContent className="p-8">
                  <div className="space-y-8">
                    {/* Phase 1: Blossoming */}
                    <motion.div
                      initial={{ opacity: 0, x: -30 }}
                      animate={{ opacity: 1, x: 0 }}
                      className="flex items-center gap-6"
                    >
                      <div className="w-20 h-20 rounded-full bg-gradient-to-br from-amber-500 to-yellow-500 p-5 flex items-center justify-center shadow-lg">
                        <Flower className="h-10 w-10 text-white" />
                      </div>
                      <div className="flex-1">
                        <h3 className="text-2xl font-black text-white mb-2">Phase 1: Blossoming</h3>
                        <p className="text-amber-200/70 mb-3">6 months of AI-driven growth. Petals expand, colors shift from gold to rose-gold.</p>
                        <div className="flex items-center gap-4">
                          <Badge className="bg-amber-500/20 text-amber-400 border-amber-500/40">Duration: 6 months</Badge>
                          <Badge className="bg-green-500/20 text-green-400 border-green-500/40">Growth: 0.5%/day</Badge>
                        </div>
                      </div>
                    </motion.div>

                    <div className="w-0.5 h-12 bg-amber-500/30 ml-10" />

                    {/* Phase 2: Decay Stages */}
                    <motion.div
                      initial={{ opacity: 0, x: -30 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: 0.2 }}
                    >
                      <div className="flex items-center gap-6 mb-6">
                        <div className="w-20 h-20 rounded-full bg-gradient-to-br from-orange-500 to-red-500 p-5 flex items-center justify-center shadow-lg">
                          <Clock className="h-10 w-10 text-white" />
                        </div>
                        <div className="flex-1">
                          <h3 className="text-2xl font-black text-white mb-2">Phase 2: Decay Stages</h3>
                          <p className="text-amber-200/70">Choose your timeline: 2 days to 5 weeks of gradual decay</p>
                        </div>
                      </div>

                      <div className="grid md:grid-cols-2 gap-4 ml-26">
                        {decayStages.map((stage, idx) => (
                          <Card key={idx} className="bg-black/40 border-orange-500/30">
                            <CardContent className="p-6">
                              <div className="flex justify-between items-start mb-3">
                                <div>
                                  <h4 className="text-lg font-black text-white">Stage {stage.id}: {stage.name}</h4>
                                  <p className="text-sm text-orange-300">{stage.description}</p>
                                </div>
                                <div className="text-2xl font-black text-orange-400">{stage.cost}</div>
                              </div>
                              <Badge className="bg-orange-500/20 text-orange-400 border-orange-500/40">
                                {stage.duration}
                              </Badge>
                            </CardContent>
                          </Card>
                        ))}
                      </div>
                    </motion.div>

                    <div className="w-0.5 h-12 bg-amber-500/30 ml-10" />

                    {/* Phase 3: Revival */}
                    <motion.div
                      initial={{ opacity: 0, x: -30 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: 0.4 }}
                      className="flex items-center gap-6"
                    >
                      <div className="w-20 h-20 rounded-full bg-gradient-to-br from-green-500 to-emerald-500 p-5 flex items-center justify-center shadow-lg">
                        <RefreshCw className="h-10 w-10 text-white" />
                      </div>
                      <div className="flex-1">
                        <h3 className="text-2xl font-black text-white mb-2">Phase 3: Revival</h3>
                        <p className="text-amber-200/70 mb-3">48-hour recovery with soothing light pulses. Flower retains emotional "scars".</p>
                        <div className="flex items-center gap-4">
                          <Badge className="bg-green-500/20 text-green-400 border-green-500/40">Recovery: 2 days</Badge>
                          <Badge className="bg-purple-500/20 text-purple-400 border-purple-500/40">Memories: Preserved</Badge>
                        </div>
                      </div>
                    </motion.div>
                  </div>
                </CardContent>
              </Card>

              {/* Interactive Lifecycle Visualization */}
              <Card className="bg-gradient-to-br from-amber-900/30 to-yellow-900/30 border-2 border-amber-500/40">
                <CardHeader>
                  <CardTitle className="flex items-center gap-3 text-white text-2xl">
                    <Eye className="h-7 w-7 text-amber-400" />
                    Watch the Lifecycle
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="aspect-video bg-gradient-to-br from-amber-900/50 via-yellow-900/50 to-green-900/50 rounded-2xl flex items-center justify-center relative overflow-hidden">
                    <ImageWithFallback
                      src="https://images.unsplash.com/photo-1728618388608-7152fcbe24c6?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxkaWdpdGFsJTIwYXJ0JTIwZmxvd2Vyc3xlbnwxfHx8fDE3NjQyODA5OTl8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral"
                      alt="Digital Flowers"
                      className="absolute inset-0 w-full h-full object-cover opacity-40"
                    />
                    <div className="relative z-10 text-center">
                      <motion.div
                        animate={{
                          scale: [1, 1.2, 1],
                          rotate: [0, 360],
                        }}
                        transition={{
                          duration: 8,
                          repeat: Infinity,
                          ease: "easeInOut"
                        }}
                      >
                        <Flower className="h-32 w-32 mx-auto text-amber-400 mb-4" />
                      </motion.div>
                      <p className="text-xl text-white font-black">Interactive Demo Coming Soon</p>
                    </div>
                  </div>

                  <div className="mt-6 grid grid-cols-3 gap-4">
                    <Button variant="outline" className="border-amber-500/30 text-amber-300 hover:bg-amber-500/20">
                      <Play className="h-4 w-4 mr-2" />
                      Play
                    </Button>
                    <Button variant="outline" className="border-amber-500/30 text-amber-300 hover:bg-amber-500/20">
                      <Settings className="h-4 w-4 mr-2" />
                      Adjust Speed
                    </Button>
                    <Button variant="outline" className="border-amber-500/30 text-amber-300 hover:bg-amber-500/20">
                      <Save className="h-4 w-4 mr-2" />
                      Save State
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          </AnimatePresence>
        )}

        {/* My Flowers Section - Dashboard for user's flower collection */}
        {activeSection === 'myflowers' && (
          <AnimatePresence mode="wait">
            <motion.div
              key="myflowers"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="p-6 md:p-12 max-w-7xl mx-auto"
            >
              <div className="text-center mb-12">
                <h2 className="text-5xl font-black mb-4 bg-gradient-to-r from-amber-400 via-yellow-400 to-green-400 bg-clip-text text-transparent">
                  My Digital Garden
                </h2>
                <p className="text-xl text-amber-200/80 max-w-3xl mx-auto">
                  Manage your collection of blooming memories
                </p>
              </div>

              {/* Flower Cards */}
              <div className="grid gap-6 mb-12">
                {myFlowers.map((flower, index) => (
                  <motion.div
                    key={flower.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.1 }}
                  >
                    <Card className="bg-black/30 backdrop-blur-xl border-amber-500/30 hover:border-amber-400 transition-colors duration-300">
                      <CardContent className="p-6">
                        <div className={`grid ${isMobile ? 'grid-cols-1' : 'md:grid-cols-4'} gap-6 items-center`}>
                          {/* Flower Visual */}
                          <div className="text-center">
                            <div className={`w-24 h-24 mx-auto mb-3 rounded-full bg-gradient-to-br ${flower.color} p-6 flex items-center justify-center shadow-lg`}>
                              <Flower className="h-12 w-12 text-white" />
                            </div>
                            <Badge className={`${
                              flower.stage === 'Blossoming' 
                                ? 'bg-green-500/20 text-green-400 border-green-500/40'
                                : flower.stage.includes('Decay')
                                ? 'bg-orange-500/20 text-orange-400 border-orange-500/40'
                                : 'bg-purple-500/20 text-purple-400 border-purple-500/40'
                            }`}>
                              {flower.stage}
                            </Badge>
                          </div>

                          {/* Flower Info */}
                          <div className="md:col-span-2">
                            <h3 className="text-2xl font-black text-white mb-2">{flower.name}</h3>
                            <p className="text-amber-300 mb-3">{flower.variant} • Purchased {flower.purchaseDate}</p>
                            
                            <div className="space-y-2">
                              <div className="flex items-center justify-between text-sm mb-2">
                                <span className="text-amber-200">Lifecycle Progress</span>
                                <span className="text-white font-black">{flower.progress}%</span>
                              </div>
                              <div className="h-2 bg-black/40 rounded-full overflow-hidden">
                                <div 
                                  className={`h-full bg-gradient-to-r ${flower.color}`}
                                  style={{ width: `${flower.progress}%` }}
                                />
                              </div>
                              {flower.daysRemaining > 0 && (
                                <p className="text-sm text-amber-300/70">
                                  {flower.nextDecay} until next decay stage
                                </p>
                              )}
                            </div>
                          </div>

                          {/* Actions */}
                          <div className="space-y-3">
                            {flower.reward ? (
                              <>
                                <div className="text-center p-4 bg-purple-500/20 rounded-xl border-2 border-purple-500/50">
                                  <Gift className="h-8 w-8 mx-auto mb-2 text-purple-400" />
                                  <div className="font-black text-white mb-1">Reward Ready!</div>
                                  <div className="text-sm text-purple-300">{flower.reward}</div>
                                </div>
                                <Button className="w-full bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-500 hover:to-pink-500 font-black">
                                  <Gift className="h-4 w-4 mr-2" />
                                  Claim Bonsai
                                </Button>
                              </>
                            ) : flower.refreshCost ? (
                              <>
                                <div className="text-center">
                                  <div className="text-3xl font-black text-amber-400 mb-1">{flower.refreshCost}</div>
                                  <div className="text-sm text-amber-300">Refresh Cost</div>
                                </div>
                                <Button className="w-full bg-gradient-to-r from-amber-600 to-yellow-600 hover:from-amber-500 hover:to-yellow-500 font-black">
                                  <RefreshCw className="h-4 w-4 mr-2" />
                                  Revive Now
                                </Button>
                              </>
                            ) : (
                              <>
                                <div className="text-center p-3 bg-green-500/20 rounded-lg">
                                  <div className="text-sm text-green-300 mb-1">Healthy & Growing</div>
                                  <div className="font-black text-white">{flower.daysRemaining} days</div>
                                </div>
                                <Button variant="outline" className="w-full border-amber-500/30 text-amber-300 hover:bg-amber-500/20">
                                  <Eye className="h-4 w-4 mr-2" />
                                  View Details
                                </Button>
                              </>
                            )}
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  </motion.div>
                ))}
              </div>

              {/* Add New Flower CTA */}
              <Card className="bg-gradient-to-br from-amber-900/30 to-yellow-900/30 border-2 border-amber-500/40">
                <CardContent className="p-12 text-center">
                  <Flower className="h-16 w-16 mx-auto mb-4 text-amber-400" />
                  <h3 className="text-2xl font-black text-white mb-2">Start a New Bloom</h3>
                  <p className="text-amber-200/80 mb-6">Add another digital flower to your garden</p>
                  <Button
                    size="lg"
                    className="bg-gradient-to-r from-amber-600 to-yellow-600 hover:from-amber-500 hover:to-yellow-500 font-black"
                  >
                    <Flower className="h-5 w-5 mr-2" />
                    Browse Collection
                  </Button>
                </CardContent>
              </Card>
            </motion.div>
          </AnimatePresence>
        )}

        {/* Device Section - Showcasing the solar-powered hologram device */}
        {activeSection === 'device' && (
          <AnimatePresence mode="wait">
            <motion.div
              key="device"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="p-6 md:p-12 max-w-7xl mx-auto"
            >
              <div className="text-center mb-12">
                <h2 className="text-5xl font-black mb-4 bg-gradient-to-r from-amber-400 via-yellow-400 to-green-400 bg-clip-text text-transparent">
                  The EverBloom Device
                </h2>
                <p className="text-xl text-amber-200/80 max-w-3xl mx-auto">
                  Solar-powered holographic projector — sustainable beauty that lasts
                </p>
              </div>

              {/* Device Showcase */}
              <Card className="bg-black/30 backdrop-blur-xl border-amber-500/30 mb-12 overflow-hidden">
                <div className={`grid ${isMobile ? 'grid-cols-1' : 'md:grid-cols-2'} gap-0`}>
                  <div className="aspect-square bg-gradient-to-br from-amber-900/50 to-yellow-900/50 relative flex items-center justify-center">
                    <ImageWithFallback
                      src="https://images.unsplash.com/photo-1756908992154-c8a89f5e517f?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxob2xvZ3JhbSUyMHRlY2hub2xvZ3klMjBmdXR1cmlzdGljfGVufDF8fHx8MTc2NDI1MDg4M3ww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral"
                      alt="Hologram Technology"
                      className="absolute inset-0 w-full h-full object-cover opacity-60"
                    />
                    <motion.div
                      animate={{
                        rotateY: [0, 360],
                        scale: [1, 1.1, 1]
                      }}
                      transition={{
                        duration: 10,
                        repeat: Infinity,
                        ease: "easeInOut"
                      }}
                      className="relative z-10"
                    >
                      <Sun className="h-48 w-48 text-amber-400" />
                    </motion.div>
                  </div>

                  <CardContent className="p-8 flex flex-col justify-center">
                    <h3 className="text-3xl font-black text-white mb-6">Technical Specifications</h3>
                    
                    <div className="space-y-4">
                      {[
                        { label: 'Size', value: '8" x 4" disc', icon: Target },
                        { label: 'Display', value: '4K MEMS laser', icon: Eye },
                        { label: 'Solar Panel', value: '6W monocrystalline', icon: Sun },
                        { label: 'Battery', value: '6-month lifespan', icon: Zap },
                        { label: 'Charge Time', value: '3 hours sunlight', icon: Clock },
                        { label: 'Connectivity', value: 'NFC + Bluetooth', icon: Sparkles },
                      ].map((spec, idx) => (
                        <div key={idx} className="flex items-center justify-between p-4 bg-black/40 rounded-lg border border-amber-500/20">
                          <div className="flex items-center gap-3">
                            <spec.icon className="h-5 w-5 text-amber-400" />
                            <span className="text-amber-200 font-bold">{spec.label}</span>
                          </div>
                          <span className="text-white font-black">{spec.value}</span>
                        </div>
                      ))}
                    </div>

                    <div className="mt-6 p-6 bg-green-500/20 rounded-xl border-2 border-green-500/50">
                      <div className="flex items-center gap-3 mb-2">
                        <Leaf className="h-6 w-6 text-green-400" />
                        <h4 className="text-xl font-black text-white">100% Sustainable</h4>
                      </div>
                      <p className="text-green-200/80">Zero carbon footprint. Fully recyclable materials. Each device saves 12kg CO₂ vs. traditional flowers.</p>
                    </div>
                  </CardContent>
                </div>
              </Card>

              {/* Solar Panel Info */}
              <Card className="bg-gradient-to-br from-green-900/30 to-emerald-900/30 border-2 border-green-500/50">
                <CardHeader>
                  <CardTitle className="flex items-center gap-3 text-white text-2xl">
                    <Sun className="h-7 w-7 text-green-400" />
                    Solar Power Technology
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="grid md:grid-cols-2 gap-8">
                    <div>
                      <ImageWithFallback
                        src="https://images.unsplash.com/photo-1679046410011-b6bf7ce71f22?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxzb2xhciUyMHBhbmVsJTIwc3VzdGFpbmFiaWxpdHl8ZW58MXx8fHwxNzY0MjgwOTk5fDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral"
                        alt="Solar Panels"
                        className="w-full h-64 object-cover rounded-xl"
                      />
                    </div>
                    <div>
                      <h3 className="text-2xl font-black text-white mb-4">Clean Energy, Beautiful Results</h3>
                      <div className="space-y-3">
                        {[
                          '20% solar efficiency (monocrystalline cells)',
                          '5000mAh LiFePO4 battery (recyclable)',
                          'Works in cloudy climates (USB-C backup)',
                          'Partnership with EcoBat for recycling'
                        ].map((point, idx) => (
                          <div key={idx} className="flex items-start gap-2">
                            <CheckCircle className="h-5 w-5 text-green-400 flex-shrink-0 mt-0.5" />
                            <span className="text-green-200">{point}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          </AnimatePresence>
        )}

        {/* $40.5M Vision Section */}
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
                  $40.5 MILLION VISION
                </h2>
                <p className="text-2xl text-amber-200/80 max-w-3xl mx-auto">
                  Year 5 Projection — Transforming the $70B Floral Industry
                </p>
              </div>

              {/* Financial Hero */}
              <Card className="bg-gradient-to-br from-green-900/30 to-emerald-900/30 border-2 border-green-500/50 mb-12 overflow-hidden">
                <div className="relative h-64">
                  <ImageWithFallback
                    src="https://images.unsplash.com/photo-1549133888-b32c56a5ee64?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxib25zYWklMjB0cmVlJTIwemVufGVufDF8fHx8MTc2NDI4MDk5OHww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral"
                    alt="Bonsai Vision"
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
                        $40,500,000
                      </motion.div>
                      <div className="text-2xl text-green-200 font-bold">Year 5 Revenue Target</div>
                    </div>
                  </div>
                </div>
              </Card>

              {/* 5-Year Growth */}
              <Card className="bg-black/30 backdrop-blur-xl border-amber-500/30 mb-12">
                <CardHeader>
                  <CardTitle className="flex items-center gap-3 text-white text-2xl">
                    <TrendingUp className="h-7 w-7 text-green-400" />
                    5-Year Growth Trajectory
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {[
                      { year: 1, revenue: '$1.35M', devices: '50', users: '4.5K', highlight: 'Pilot Launch' },
                      { year: 2, revenue: '$5.4M', devices: '200', users: '24K', highlight: 'Scale Up' },
                      { year: 3, revenue: '$13.5M', devices: '500', users: '120K', highlight: 'Market Expansion' },
                      { year: 4, revenue: '$27M', devices: '1,200', users: '350K', highlight: 'Global Reach' },
                      { year: 5, revenue: '$40.5M', devices: '2,500', users: '750K', highlight: 'Industry Leader' },
                    ].map((milestone, idx) => (
                      <motion.div
                        key={idx}
                        initial={{ opacity: 0, x: -20 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: idx * 0.1 }}
                        className="relative"
                      >
                        <div className={`p-6 rounded-xl ${
                          milestone.year === 5 
                            ? 'bg-gradient-to-r from-green-500/20 to-emerald-500/20 border-2 border-green-500/50' 
                            : 'bg-amber-500/10 border border-amber-500/20'
                        }`}>
                          <div className="grid grid-cols-2 md:grid-cols-5 gap-4 items-center">
                            <div>
                              <div className="text-sm text-amber-300/80 mb-1">Year {milestone.year}</div>
                              <div className={`text-2xl font-black ${milestone.year === 5 ? 'text-green-400' : 'text-white'}`}>
                                {milestone.highlight}
                              </div>
                            </div>
                            <div>
                              <div className="text-sm text-amber-300/80 mb-1">Revenue</div>
                              <div className="text-xl font-black text-white">{milestone.revenue}</div>
                            </div>
                            <div>
                              <div className="text-sm text-amber-300/80 mb-1">Devices</div>
                              <div className="text-xl font-black text-white">{milestone.devices}</div>
                            </div>
                            <div>
                              <div className="text-sm text-amber-300/80 mb-1">Users</div>
                              <div className="text-xl font-black text-white">{milestone.users}</div>
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
                        {idx < 4 && (
                          <div className="absolute left-8 top-full w-0.5 h-4 bg-amber-500/30" />
                        )}
                      </motion.div>
                    ))}
                  </div>
                </CardContent>
              </Card>

              {/* Market Breakdown */}
              <div className={`grid gap-8 mb-12 ${isMobile ? 'grid-cols-1' : 'grid-cols-2'}`}>
                <Card className="bg-gradient-to-br from-amber-900/30 to-yellow-900/30 border-2 border-amber-500/40">
                  <CardHeader>
                    <CardTitle className="flex items-center gap-3 text-white text-xl">
                      <Globe className="h-6 w-6 text-amber-400" />
                      Market Opportunity
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="text-5xl font-black text-white mb-2">$70B</div>
                    <div className="text-amber-200/80 mb-6">Global Floral Industry</div>
                    <div className="space-y-3">
                      {[
                        { segment: 'Traditional Flowers', size: '$50B', share: '71%' },
                        { segment: 'Digital Gifting', size: '$20B', share: '29%' },
                      ].map((segment, idx) => (
                        <div key={idx}>
                          <div className="flex justify-between items-center mb-2">
                            <span className="text-amber-200">{segment.segment}</span>
                            <span className="text-xl font-black text-amber-400">{segment.size}</span>
                          </div>
                          <div className="h-2 bg-black/40 rounded-full overflow-hidden">
                            <div 
                              className="h-full bg-gradient-to-r from-amber-500 to-yellow-500"
                              style={{ width: segment.share }}
                            />
                          </div>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>

                <Card className="bg-gradient-to-br from-green-900/30 to-emerald-900/30 border-2 border-green-500/50">
                  <CardHeader>
                    <CardTitle className="flex items-center gap-3 text-white text-xl">
                      <Target className="h-6 w-6 text-green-400" />
                      Revenue Streams
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      {[
                        { stream: 'Device Sales', revenue: '$20M', percentage: '49%' },
                        { stream: 'Refresh Fees', revenue: '$13M', percentage: '32%' },
                        { stream: 'Bonsai Upsells', revenue: '$7.5M', percentage: '19%' },
                      ].map((stream, idx) => (
                        <div key={idx}>
                          <div className="flex justify-between items-center mb-2">
                            <span className="text-green-200 font-bold">{stream.stream}</span>
                            <span className="text-xl font-black text-white">{stream.revenue}</span>
                          </div>
                          <div className="h-2 bg-black/40 rounded-full overflow-hidden">
                            <motion.div
                              initial={{ width: 0 }}
                              whileInView={{ width: stream.percentage }}
                              viewport={{ once: true }}
                              transition={{ duration: 1, delay: idx * 0.2 }}
                              className="h-full bg-gradient-to-r from-green-500 to-emerald-500"
                            />
                          </div>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </div>

              {/* Key Metrics */}
              <Card className="bg-black/30 backdrop-blur-xl border-amber-500/30">
                <CardHeader>
                  <CardTitle className="flex items-center gap-3 text-white text-2xl">
                    <BarChart3 className="h-7 w-7 text-amber-400" />
                    Year 5 Key Metrics
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
                    {[
                      { label: 'Annual Revenue', value: '$40.5M', icon: DollarSign, color: 'text-green-400' },
                      { label: 'Active Users', value: '750K', icon: Users, color: 'text-amber-400' },
                      { label: 'Devices Deployed', value: '2,500', icon: Sun, color: 'text-yellow-400' },
                      { label: 'CO₂ Saved', value: '1,200 tons', icon: Leaf, color: 'text-green-400' },
                      { label: 'Bonsai Delivered', value: '150K', icon: TreePine, color: 'text-emerald-400' },
                      { label: 'Countries', value: '45+', icon: Globe, color: 'text-cyan-400' },
                      { label: 'Net Profit', value: '$14.6M', icon: TrendingUp, color: 'text-green-400' },
                      { label: 'Team Size', value: '200+', icon: Users, color: 'text-purple-400' },
                    ].map((metric, idx) => (
                      <motion.div
                        key={idx}
                        initial={{ opacity: 0, scale: 0.9 }}
                        whileInView={{ opacity: 1, scale: 1 }}
                        viewport={{ once: true }}
                        transition={{ delay: idx * 0.05 }}
                        className="text-center p-6 bg-amber-500/10 rounded-xl border border-amber-500/20"
                      >
                        <metric.icon className={`h-10 w-10 mx-auto mb-3 ${metric.color}`} />
                        <div className="text-3xl font-black text-white mb-2">{metric.value}</div>
                        <div className="text-sm text-amber-300/80">{metric.label}</div>
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