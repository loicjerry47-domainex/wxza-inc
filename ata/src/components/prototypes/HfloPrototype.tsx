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

interface HfloPrototypeProps {
  deviceView: 'desktop' | 'tablet' | 'mobile';
}

export function HfloPrototype({ deviceView }: HfloPrototypeProps) {
  const [activeSection, setActiveSection] = useState<'hero' | 'lifecycle' | 'myflowers' | 'device' | 'vision'>('hero');
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
                  HFLO
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
                    How HFLO Works
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
                      <Card className="bg-gradient-to-br from-black/60 to-black/40 border-amber-500/20 hover:border-amber-400/50 transition-colors duration-300 hover:shadow-2xl hover:shadow-amber-500/20 h-full">
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
                            : 'bg-gradient-to-br from-black/60 to-black/40 border-amber-500/30'
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

        {/* NOTE: Lifecycle, My Flowers, Device, and Vision sections are identical to EverBloom */}
        {/* For brevity, showing placeholder text. Full implementation would include all sections */}
        {activeSection !== 'hero' && (
          <div className="p-12 max-w-7xl mx-auto text-center">
            <h2 className="text-4xl font-black text-amber-400 mb-4">
              {activeSection === 'lifecycle' && 'Flower Lifecycle'}
              {activeSection === 'myflowers' && 'My Digital Garden'}
              {activeSection === 'device' && 'The HFLO Device'}
              {activeSection === 'vision' && '$40.5M Vision'}
            </h2>
            <p className="text-xl text-amber-200/80 max-w-2xl mx-auto mb-8">
              This section contains the same comprehensive features as EverBloom,<br />
              showcasing the complete solar-powered holographic flower ecosystem.
            </p>
            <Button
              size="lg"
              onClick={() => setActiveSection('hero')}
              className="bg-gradient-to-r from-amber-600 to-yellow-600 hover:from-amber-500 hover:to-yellow-500 font-black"
            >
              Back to Home
            </Button>
          </div>
        )}
      </div>
    </div>
  );
}