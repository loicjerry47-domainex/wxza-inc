import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "motion/react";
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";
import { Button } from "../ui/button";
import { Badge } from "../ui/badge";
import { ImageWithFallback } from "../figma/ImageWithFallback";
import { ANDTokenDashboard } from "../token/ANDTokenDashboard";
import { 
  Shield,
  AlertTriangle,
  CheckCircle,
  Zap,
  Brain,
  Lock,
  Activity,
  Eye,
  TrendingUp,
  Server,
  Globe,
  Cpu,
  Target,
  Sparkles,
  Radio,
  Layers,
  Network,
  Database,
  Atom,
  Microscope,
  Binary,
  Code,
  Cloud,
  Bot,
  Radar,
  Scan,
  FileWarning,
  Users,
  DollarSign,
  BarChart3,
  Award,
  Rocket,
  Smartphone,
  Leaf,
  Camera,
  Headphones,
  Home,
  Package,
  Briefcase,
  GitBranch,
  PieChart,
  Layout,
  Lightbulb,
  Flower2,
  CreditCard,
  Car,
  Droplets,
  Coins
} from "lucide-react";

interface AtableNeuralPrototypeProps {
  deviceView: 'desktop' | 'tablet' | 'mobile';
}

export function AtableNeuralPrototype({ deviceView }: AtableNeuralPrototypeProps) {
  const [activeSection, setActiveSection] = useState<'hero' | 'ventures' | 'analytics' | 'technology' | 'business' | 'vision' | 'token'>('hero');
  const [totalRevenue, setTotalRevenue] = useState(1029300000);
  const [totalUsers, setTotalUsers] = useState(1547000000);
  const [venturesActive, setVenturesActive] = useState(9);

  const isMobile = deviceView === 'mobile';
  const isTablet = deviceView === 'tablet';

  // Simulate real-time portfolio updates
  useEffect(() => {
    const interval = setInterval(() => {
      setTotalRevenue(prev => prev + Math.floor(Math.random() * 100000));
      setTotalUsers(prev => prev + Math.floor(Math.random() * 1000));
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  const ventures = [
    {
      id: 'nimbus',
      name: 'NIMBUS BIOME™',
      tagline: 'Cloud-Based Bio-Monitoring',
      description: 'Real-time atmospheric biology tracking with AI-powered sensor networks',
      icon: Leaf,
      color: 'from-green-500 to-emerald-500',
      revenue: '$78M Year 5',
      market: '$95B TAM',
      users: '500M+ lives protected',
      status: 'Production Ready',
      category: 'Environmental Tech'
    },
    {
      id: 'lensstorm',
      name: 'LENSSTORM',
      tagline: 'Invisible Smart Glasses Retrofit',
      description: 'Universal frame compatibility with micro-LED displays and neural interfaces',
      icon: Eye,
      color: 'from-purple-500 to-pink-500',
      revenue: '$140M Year 5',
      market: '$127B TAM',
      users: '50M users',
      status: 'Prototype Complete',
      category: 'Wearable Tech'
    },
    {
      id: 'oto',
      name: 'OTO',
      tagline: 'Neural Language Translator',
      description: 'Brain-computer interface for instant multilingual communication',
      icon: Brain,
      color: 'from-blue-500 to-cyan-500',
      revenue: '$340M Year 5',
      market: '$56B TAM',
      users: '100M users',
      status: 'R&D Phase',
      category: 'Neural Tech'
    },
    {
      id: 'everbloom',
      name: 'EVERBLOOM',
      tagline: 'Solar Holographic Gardens',
      description: 'Self-sustaining holographic flowers with solar power and IoT connectivity',
      icon: Flower2,
      color: 'from-yellow-500 to-orange-500',
      revenue: '$40.5M Year 5',
      market: '$12B TAM',
      users: '10M homes',
      status: 'Manufacturing',
      category: 'Smart Home'
    },
    {
      id: 'gcraft',
      name: 'GCRAFT',
      tagline: 'Gift Card Liquidity Platform',
      description: 'Cash conversion and exchange network with ATM integration',
      icon: CreditCard,
      color: 'from-orange-500 to-red-500',
      revenue: '$60M Year 5',
      market: '$350B TAM',
      users: '25M cardholders',
      status: 'Beta Testing',
      category: 'FinTech'
    },
    {
      id: 'hearb',
      name: 'HEARB ASSIST 360',
      tagline: 'Voice-Activated Assistive Tech',
      description: 'Ring scanner + earbud + speech printer for visually impaired',
      icon: Headphones,
      color: 'from-blue-500 to-green-500',
      revenue: '$41.8M Year 5',
      market: '$8B TAM',
      users: '285M visually impaired',
      status: 'Clinical Trials',
      category: 'Accessibility'
    },
    {
      id: 'pros',
      name: 'PRO\'S',
      tagline: 'AI Professional Marketplace',
      description: 'Intelligent matching for freelancers with skills verification',
      icon: Briefcase,
      color: 'from-purple-500 to-blue-500',
      revenue: '$110M Year 5',
      market: '$400B TAM',
      users: '50M professionals',
      status: 'Market Launch',
      category: 'Marketplace'
    },
    {
      id: 'inect',
      name: 'INECT',
      tagline: 'Bio-Organic Fertilizer',
      description: 'Insect-based sustainable agriculture solution',
      icon: Microscope,
      color: 'from-green-500 to-lime-500',
      revenue: '$120M Year 5',
      market: '$240B TAM',
      users: '1B+ farmland acres',
      status: 'Scaling Production',
      category: 'AgriTech'
    },
    {
      id: 'mparker',
      name: 'MPARKER',
      tagline: 'Urban Mobility Ecosystem',
      description: 'Integrated parking + mobility + care + residences',
      icon: Car,
      color: 'from-blue-500 to-cyan-500',
      revenue: '$22M Year 5',
      market: '$12B TAM',
      users: '15K daily users',
      status: 'Pilot Hub Active',
      category: 'Urban Tech'
    },
  ];

  const portfolioMetrics = [
    {
      label: 'Total Market Opportunity',
      value: '$1.3 Trillion',
      sublabel: 'Combined TAM',
      icon: Globe,
      color: 'from-blue-500 to-cyan-500'
    },
    {
      label: 'Year 5 Revenue Target',
      value: '$1.03B',
      sublabel: 'All ventures combined',
      icon: TrendingUp,
      color: 'from-green-500 to-emerald-500'
    },
    {
      label: 'Global Impact Reach',
      value: '1.5B+',
      sublabel: 'People affected',
      icon: Users,
      color: 'from-purple-500 to-pink-500'
    },
    {
      label: 'Active Ventures',
      value: '9',
      sublabel: 'Revolutionary solutions',
      icon: Rocket,
      color: 'from-orange-500 to-red-500'
    },
  ];

  const technologyStack = [
    {
      name: 'AI Business Planning Engine',
      description: 'Neural networks that generate comprehensive business plans with market analysis, financial projections, and go-to-market strategies',
      icon: Brain,
      color: 'from-blue-500 to-purple-500',
      capabilities: ['Market analysis', 'Financial modeling', 'Risk assessment', 'Competitive intelligence']
    },
    {
      name: 'Venture Prototyping System',
      description: 'Rapid prototype generation with interactive demos, user flows, and investment-grade presentations',
      icon: Layout,
      color: 'from-purple-500 to-pink-500',
      capabilities: ['UI/UX generation', 'Interactive demos', 'Real-time collaboration', 'Design systems']
    },
    {
      name: 'Portfolio Analytics Platform',
      description: 'Real-time tracking of all ventures with predictive modeling, scenario planning, and performance dashboards',
      icon: BarChart3,
      color: 'from-green-500 to-emerald-500',
      capabilities: ['Real-time metrics', 'Predictive analytics', 'Scenario modeling', 'Risk monitoring']
    },
    {
      name: 'Innovation Intelligence Network',
      description: 'Global trend analysis, patent scanning, and emerging technology detection for new venture opportunities',
      icon: Lightbulb,
      color: 'from-yellow-500 to-orange-500',
      capabilities: ['Trend detection', 'Patent analysis', 'Market gaps', 'Opportunity scoring']
    },
  ];

  const businessModelTypes = [
    {
      type: 'Product-as-a-Service',
      ventures: ['NIMBUS BIOME', 'LENSSTORM', 'HEARB ASSIST 360'],
      revenue: '$259.8M',
      description: 'Hardware + software subscriptions with recurring revenue',
      icon: Package
    },
    {
      type: 'Platform Marketplace',
      ventures: ['PRO\'S', 'GCRAFT'],
      revenue: '$170M',
      description: 'Two-sided platforms with transaction fees and commissions',
      icon: Network
    },
    {
      type: 'B2B SaaS + Hardware',
      ventures: ['OTO', 'MPARKER'],
      revenue: '$362M',
      description: 'Enterprise software with physical infrastructure',
      icon: Server
    },
    {
      type: 'D2C Consumer Products',
      ventures: ['EVERBLOOM', 'INECT'],
      revenue: '$160.5M',
      description: 'Direct-to-consumer physical products with digital features',
      icon: Home
    },
  ];

  const visionElements = [
    {
      timeline: '2025-2027',
      title: 'Portfolio Launch Phase',
      description: 'Launch all 9 ventures with production-ready prototypes, secure initial funding rounds, establish market presence in key verticals',
      milestones: ['$50M seed funding', '9 ventures operational', '100K early adopters'],
      icon: Rocket,
      color: 'from-blue-500 to-cyan-500'
    },
    {
      timeline: '2028-2030',
      title: 'Scale & Expansion',
      description: 'Scale successful ventures, expand to 50+ countries, achieve profitability milestones, introduce venture synergies and cross-platform integrations',
      milestones: ['$500M ARR total', '25+ countries', '10M users'],
      icon: TrendingUp,
      color: 'from-green-500 to-emerald-500'
    },
    {
      timeline: '2031-2035',
      title: 'Ecosystem Integration',
      description: 'Create interconnected ecosystem where ventures complement each other, develop shared technology infrastructure, establish industry partnerships',
      milestones: ['$1B+ valuation', 'Platform integration', 'IPO consideration'],
      icon: Network,
      color: 'from-purple-500 to-pink-500'
    },
    {
      timeline: '2036-2050',
      title: 'AI-Powered Innovation',
      description: 'Deploy AGI systems for autonomous venture creation, predictive market analysis, and real-time business model optimization',
      milestones: ['AI venture creation', 'Global dominance', '1B+ users'],
      icon: Brain,
      color: 'from-orange-500 to-red-500'
    },
    {
      timeline: '2051-2077',
      title: 'Planetary Impact',
      description: 'Transform into a global innovation engine powering sustainable solutions, space-based ventures, and consciousness-augmenting technologies',
      milestones: ['Climate solutions', 'Space ventures', 'Human augmentation'],
      icon: Globe,
      color: 'from-cyan-500 to-blue-500'
    },
  ];

  const navigationTabs = [
    { id: 'hero', label: 'Portfolio', icon: PieChart },
    { id: 'ventures', label: '9 Ventures', icon: Rocket },
    { id: 'analytics', label: 'Analytics', icon: BarChart3 },
    { id: 'technology', label: 'Technology', icon: Brain },
    { id: 'business', label: 'Business Models', icon: DollarSign },
    { id: 'token', label: 'AND Token', icon: Coins },
    { id: 'vision', label: '2077 Vision', icon: Target },
  ];

  return (
    <div className="h-full text-white overflow-auto relative">
      <div className="relative z-10">
        {/* Header */}
        <div className="glass-strong border-b border-white/5 sticky top-0 z-50">
          <div className="flex items-center justify-between p-4">
            <div className="flex items-center gap-4">
              <div className="relative">
                <div className="w-14 h-14 bg-gradient-to-br from-blue-500 via-purple-500 to-green-500 rounded-2xl p-3 shadow-xl">
                  <PieChart className="h-8 w-8 text-white" />
                </div>
                <motion.div 
                  className="absolute inset-0 bg-blue-500 rounded-2xl blur-xl opacity-50"
                  animate={{ scale: [1, 1.2, 1], opacity: [0.3, 0.5, 0.3] }}
                  transition={{ duration: 2, repeat: Infinity }}
                />
              </div>
              <div>
                <h1 className="text-2xl font-black bg-gradient-to-r from-blue-400 via-purple-400 to-green-400 bg-clip-text text-transparent tracking-tight">
                  WXZA VENTURES
                </h1>
                <p className="text-sm text-blue-300 font-bold tracking-wide">PORTFOLIO MANAGEMENT DASHBOARD</p>
              </div>
            </div>
            
            {!isMobile && (
              <div className="flex items-center gap-6">
                <div className="text-right">
                  <div className="text-xs text-blue-300/80 font-bold uppercase tracking-wide">Total Revenue (Y5)</div>
                  <div className="text-xl font-black text-blue-400">${(totalRevenue / 1000000).toFixed(0)}M</div>
                </div>
                <div className="text-right">
                  <div className="text-xs text-green-300/80 font-bold uppercase tracking-wide">Global Reach</div>
                  <div className="text-xl font-black text-green-400">{(totalUsers / 1000000000).toFixed(1)}B</div>
                </div>
                <Badge className="bg-gradient-to-r from-green-500/20 to-emerald-500/20 text-green-300 border border-green-500/40 px-4 py-2 font-black uppercase tracking-wide">
                  <CheckCircle className="h-3 w-3 mr-2" />
                  {venturesActive} Active
                </Badge>
              </div>
            )}
          </div>

          {/* Navigation */}
          <div className="px-4 pb-4">
            <div className="flex gap-1 glass-ultra p-1 rounded-xl border border-blue-500/10 overflow-x-auto">
              {navigationTabs.map((tab) => (
                <Button
                  key={tab.id}
                  variant={activeSection === tab.id ? 'default' : 'ghost'}
                  size="sm"
                  onClick={() => setActiveSection(tab.id as any)}
                  className={`flex-shrink-0 ${
                    activeSection === tab.id 
                      ? 'bg-gradient-to-r from-blue-600 via-purple-600 to-green-600 text-white shadow-lg shadow-blue-500/50 font-black' 
                      : 'text-blue-300 hover:bg-blue-500/20 hover:text-white'
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
                    src="https://images.unsplash.com/photo-1672581437674-3186b17b405a?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxmdXR1cmlzdGljJTIwdGVjaG5vbG9neXxlbnwxfHx8fDE3NjQyMjE5MDR8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral"
                    alt="Futuristic Technology"
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-r from-blue-900/95 via-purple-900/90 to-green-900/95" />
                  
                  {/* Floating Venture Icons */}
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
                      }}
                      transition={{
                        duration: Math.random() * 15 + 10,
                        repeat: Infinity,
                        delay: Math.random() * 5,
                      }}
                    >
                      {i % 9 === 0 ? (
                        <Leaf className="h-6 w-6 text-green-400/60" />
                      ) : i % 9 === 1 ? (
                        <Eye className="h-6 w-6 text-purple-400/60" />
                      ) : i % 9 === 2 ? (
                        <Brain className="h-6 w-6 text-blue-400/60" />
                      ) : i % 9 === 3 ? (
                        <Flower2 className="h-6 w-6 text-yellow-400/60" />
                      ) : i % 9 === 4 ? (
                        <CreditCard className="h-6 w-6 text-orange-400/60" />
                      ) : i % 9 === 5 ? (
                        <Headphones className="h-6 w-6 text-cyan-400/60" />
                      ) : i % 9 === 6 ? (
                        <Briefcase className="h-6 w-6 text-indigo-400/60" />
                      ) : i % 9 === 7 ? (
                        <Microscope className="h-6 w-6 text-lime-400/60" />
                      ) : (
                        <Car className="h-6 w-6 text-teal-400/60" />
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
                      <h1 className="text-6xl md:text-7xl font-black mb-6 bg-gradient-to-r from-blue-300 via-purple-300 to-green-300 bg-clip-text text-transparent leading-tight">
                        9 REVOLUTIONARY<br />VENTURES<br />ONE VISION
                      </h1>
                    </motion.div>
                    
                    <motion.p
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.8, delay: 0.2 }}
                      className="text-2xl text-blue-200 mb-8 font-medium leading-relaxed"
                    >
                      <span className="text-white font-bold">AI-powered venture creation platform</span> managing a portfolio of<br className="hidden md:block" />
                      <span className="text-white font-bold">$1.03B in Year 5 revenue</span> across 9 groundbreaking companies
                    </motion.p>

                    <motion.div
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.8, delay: 0.4 }}
                      className="flex flex-wrap gap-4 justify-center mb-8"
                    >
                      <Button 
                        size="lg" 
                        onClick={() => setActiveSection('ventures')}
                        className="bg-gradient-to-r from-blue-600 via-purple-600 to-green-600 hover:from-blue-500 hover:via-purple-500 hover:to-green-500 text-white font-black px-8 py-6 text-lg shadow-2xl shadow-blue-500/50 transition-colors duration-300 hover:scale-105"
                      >
                        <Rocket className="h-6 w-6 mr-3" />
                        Explore Ventures
                      </Button>
                      <Button 
                        size="lg" 
                        variant="outline"
                        onClick={() => setActiveSection('vision')}
                        className="border-2 border-blue-400/50 text-blue-200 hover:bg-blue-500/20 font-black px-8 py-6 text-lg backdrop-blur-xl"
                      >
                        <Target className="h-6 w-6 mr-3" />
                        2077 Vision
                      </Button>
                    </motion.div>

                    <motion.div
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{ duration: 0.8, delay: 0.6 }}
                      className="flex flex-wrap gap-8 justify-center"
                    >
                      {[
                        { label: '$1.03B', sublabel: 'Year 5 Revenue', icon: DollarSign },
                        { label: '1.5B+', sublabel: 'People Impacted', icon: Users },
                        { label: '$1.3T', sublabel: 'Market Opportunity', icon: Globe },
                      ].map((stat, idx) => (
                        <div key={idx} className="text-center">
                          <div className="flex items-center justify-center gap-2 mb-2">
                            <stat.icon className="h-5 w-5 text-blue-400" />
                            <div className="text-3xl font-black text-white">{stat.label}</div>
                          </div>
                          <div className="text-sm text-blue-300 font-medium">{stat.sublabel}</div>
                        </div>
                      ))}
                    </motion.div>
                  </div>
                </div>
              </div>

              {/* Portfolio Metrics */}
              <div className="p-6 md:p-12 max-w-7xl mx-auto">
                <div className="text-center mb-12">
                  <h2 className="text-4xl md:text-5xl font-black mb-4 bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
                    Portfolio at a Glance
                  </h2>
                  <p className="text-xl text-blue-200/80 max-w-3xl mx-auto">
                    Comprehensive dashboard showcasing all ventures, prototypes, and business plans
                  </p>
                </div>

                <div className={`grid gap-8 ${isMobile ? 'grid-cols-1' : isTablet ? 'grid-cols-2' : 'grid-cols-4'}`}>
                  {portfolioMetrics.map((metric, index) => (
                    <motion.div
                      key={index}
                      initial={{ opacity: 0, y: 30 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true }}
                      transition={{ delay: index * 0.1 }}
                      whileHover={{ y: -8, scale: 1.02 }}
                    >
                      <Card className="bg-gradient-to-br from-black/60 to-black/40 border-blue-500/20 hover:border-blue-400/50 transition-colors duration-300 hover:shadow-2xl hover:shadow-blue-500/20 h-full">
                        <CardContent className="p-8 text-center">
                          <div className={`w-20 h-20 mb-6 rounded-2xl bg-gradient-to-br ${metric.color} p-5 shadow-lg flex items-center justify-center mx-auto`}>
                            <metric.icon className="h-10 w-10 text-white" />
                          </div>
                          <div className="text-4xl font-black mb-2 text-white">{metric.value}</div>
                          <div className="text-lg font-medium mb-2 text-blue-200">{metric.label}</div>
                          <div className="text-sm text-blue-300/70">{metric.sublabel}</div>
                        </CardContent>
                      </Card>
                    </motion.div>
                  ))}
                </div>
              </div>
            </motion.div>
          </AnimatePresence>
        )}

        {/* Ventures Section */}
        {activeSection === 'ventures' && (
          <AnimatePresence mode="wait">
            <motion.div
              key="ventures"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="p-6 md:p-12 max-w-7xl mx-auto"
            >
              <div className="text-center mb-12">
                <h2 className="text-5xl font-black mb-4 bg-gradient-to-r from-blue-400 via-purple-400 to-green-400 bg-clip-text text-transparent">
                  9 Revolutionary Ventures
                </h2>
                <p className="text-xl text-blue-200/80 max-w-3xl mx-auto">
                  Each with complete business plans, prototypes, and market strategies
                </p>
              </div>

              <div className="grid gap-6">
                {ventures.map((venture, index) => (
                  <motion.div
                    key={venture.id}
                    initial={{ opacity: 0, x: -30 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: index * 0.05 }}
                  >
                    <Card className="bg-gradient-to-br from-black/60 to-black/40 border-blue-500/30 hover:border-blue-400/50 transition-colors duration-300">
                      <CardContent className="p-6">
                        <div className="grid md:grid-cols-12 gap-6 items-center">
                          <div className="md:col-span-2 flex justify-center">
                            <div className={`w-20 h-20 rounded-2xl bg-gradient-to-br ${venture.color} p-5 shadow-xl flex items-center justify-center`}>
                              <venture.icon className="h-10 w-10 text-white" />
                            </div>
                          </div>
                          
                          <div className="md:col-span-7">
                            <div className="flex items-center gap-3 mb-2">
                              <h3 className="text-2xl font-black text-white">{venture.name}</h3>
                              <Badge className="bg-blue-500/20 text-blue-400 border-blue-500/40">
                                {venture.category}
                              </Badge>
                            </div>
                            <p className="text-blue-300 italic mb-2">"{venture.tagline}"</p>
                            <p className="text-blue-200/70 mb-3">{venture.description}</p>
                            <div className="flex flex-wrap gap-3">
                              <Badge className="bg-green-500/20 text-green-400 border-green-500/40">
                                <TrendingUp className="h-3 w-3 mr-1" />
                                {venture.revenue}
                              </Badge>
                              <Badge className="bg-purple-500/20 text-purple-400 border-purple-500/40">
                                <Globe className="h-3 w-3 mr-1" />
                                {venture.market}
                              </Badge>
                              <Badge className="bg-cyan-500/20 text-cyan-400 border-cyan-500/40">
                                <Users className="h-3 w-3 mr-1" />
                                {venture.users}
                              </Badge>
                            </div>
                          </div>
                          
                          <div className="md:col-span-3 text-center">
                            <Badge className={`px-4 py-2 text-sm font-black ${
                              venture.status === 'Production Ready' || venture.status === 'Market Launch' 
                                ? 'bg-green-500 text-white' 
                                : venture.status === 'Prototype Complete' || venture.status === 'Beta Testing'
                                ? 'bg-blue-500 text-white'
                                : 'bg-purple-500 text-white'
                            }`}>
                              {venture.status}
                            </Badge>
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

        {/* Analytics Section */}
        {activeSection === 'analytics' && (
          <AnimatePresence mode="wait">
            <motion.div
              key="analytics"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="p-6 md:p-12 max-w-7xl mx-auto"
            >
              <div className="text-center mb-12">
                <h2 className="text-5xl font-black mb-4 bg-gradient-to-r from-green-400 via-blue-400 to-purple-400 bg-clip-text text-transparent">
                  Portfolio Analytics
                </h2>
                <p className="text-xl text-blue-200/80 max-w-3xl mx-auto">
                  Real-time performance metrics across all ventures
                </p>
              </div>

              {/* Revenue Breakdown */}
              <Card className="bg-gradient-to-br from-green-900/30 to-emerald-900/30 border-2 border-green-500/50 mb-12">
                <CardHeader>
                  <CardTitle className="flex items-center gap-3 text-white text-2xl">
                    <DollarSign className="h-7 w-7 text-green-400" />
                    Year 5 Revenue Breakdown
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {ventures.map((venture, idx) => {
                      const revenueNum = parseInt(venture.revenue.replace(/[^0-9]/g, ''));
                      const totalRevenue = 1029;
                      const percentage = ((revenueNum / totalRevenue) * 100).toFixed(1);
                      
                      return (
                        <div key={idx} className="p-4 bg-black/40 rounded-xl">
                          <div className="flex justify-between items-center mb-2">
                            <div className="flex items-center gap-3">
                              <venture.icon className={`h-5 w-5 ${venture.color.replace('from-', 'text-').split(' ')[0]}`} />
                              <span className="text-white font-black">{venture.name}</span>
                            </div>
                            <div className="text-right">
                              <div className="text-xl font-black text-white">{venture.revenue}</div>
                              <div className="text-sm text-green-300">{percentage}%</div>
                            </div>
                          </div>
                          <div className="h-2 bg-black/40 rounded-full overflow-hidden">
                            <motion.div
                              initial={{ width: 0 }}
                              whileInView={{ width: `${percentage}%` }}
                              viewport={{ once: true }}
                              transition={{ duration: 1, delay: idx * 0.1 }}
                              className={`h-full bg-gradient-to-r ${venture.color}`}
                            />
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </CardContent>
              </Card>

              {/* Market Coverage */}
              <div className="grid md:grid-cols-2 gap-8">
                <Card className="bg-gradient-to-br from-blue-900/30 to-purple-900/30 border-2 border-blue-500/50">
                  <CardHeader>
                    <CardTitle className="flex items-center gap-3 text-white text-2xl">
                      <Globe className="h-7 w-7 text-blue-400" />
                      Market Coverage
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      {[
                        { sector: 'Environmental Tech', tam: '$95B', ventures: 1 },
                        { sector: 'Consumer Tech', tam: '$127B', ventures: 2 },
                        { sector: 'Healthcare Tech', tam: '$64B', ventures: 2 },
                        { sector: 'FinTech', tam: '$750B', ventures: 2 },
                        { sector: 'AgriTech', tam: '$240B', ventures: 1 },
                        { sector: 'Urban Tech', tam: '$12B', ventures: 1 },
                      ].map((sector, idx) => (
                        <div key={idx} className="p-4 bg-black/40 rounded-lg">
                          <div className="flex justify-between items-center">
                            <div>
                              <div className="text-white font-black">{sector.sector}</div>
                              <div className="text-sm text-blue-300/70">{sector.ventures} venture(s)</div>
                            </div>
                            <div className="text-xl font-black text-blue-400">{sector.tam}</div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>

                <Card className="bg-gradient-to-br from-purple-900/30 to-pink-900/30 border-2 border-purple-500/50">
                  <CardHeader>
                    <CardTitle className="flex items-center gap-3 text-white text-2xl">
                      <Users className="h-7 w-7 text-purple-400" />
                      Impact Reach
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="text-center mb-6">
                      <div className="text-6xl font-black text-white mb-2">1.5B+</div>
                      <div className="text-blue-200/70">People Globally Impacted</div>
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                      {[
                        { label: 'Lives Protected', value: '500M+', icon: Shield },
                        { label: 'Users Served', value: '235M', icon: Users },
                        { label: 'Farmland Acres', value: '1B+', icon: Leaf },
                        { label: 'Daily Commuters', value: '15K', icon: Car },
                      ].map((stat, idx) => (
                        <div key={idx} className="p-4 bg-black/40 rounded-lg text-center">
                          <stat.icon className="h-8 w-8 mx-auto mb-2 text-purple-400" />
                          <div className="text-2xl font-black text-white mb-1">{stat.value}</div>
                          <div className="text-xs text-purple-300/70">{stat.label}</div>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </div>
            </motion.div>
          </AnimatePresence>
        )}

        {/* Technology Section */}
        {activeSection === 'technology' && (
          <AnimatePresence mode="wait">
            <motion.div
              key="technology"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="p-6 md:p-12 max-w-7xl mx-auto"
            >
              <div className="text-center mb-12">
                <h2 className="text-5xl font-black mb-4 bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400 bg-clip-text text-transparent">
                  AI-Powered Venture Creation
                </h2>
                <p className="text-xl text-blue-200/80 max-w-3xl mx-auto">
                  The technology stack behind revolutionary business planning
                </p>
              </div>

              <div className="grid md:grid-cols-2 gap-8">
                {technologyStack.map((tech, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, scale: 0.9 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    viewport={{ once: true }}
                    transition={{ delay: index * 0.1 }}
                  >
                    <Card className="bg-gradient-to-br from-black/60 to-black/40 border-blue-500/30 hover:border-blue-400/50 transition-colors duration-300 h-full">
                      <CardContent className="p-8">
                        <div className={`w-20 h-20 mb-6 rounded-2xl bg-gradient-to-br ${tech.color} p-5 shadow-lg flex items-center justify-center`}>
                          <tech.icon className="h-10 w-10 text-white" />
                        </div>
                        <h3 className="text-2xl font-black mb-3 text-white">{tech.name}</h3>
                        <p className="text-blue-200/70 mb-6">{tech.description}</p>
                        <div className="space-y-2">
                          {tech.capabilities.map((capability, idx) => (
                            <div key={idx} className="flex items-center gap-2 text-sm text-blue-300">
                              <CheckCircle className="h-4 w-4 text-blue-400 flex-shrink-0" />
                              <span>{capability}</span>
                            </div>
                          ))}
                        </div>
                      </CardContent>
                    </Card>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          </AnimatePresence>
        )}

        {/* Business Models Section */}
        {activeSection === 'business' && (
          <AnimatePresence mode="wait">
            <motion.div
              key="business"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="p-6 md:p-12 max-w-7xl mx-auto"
            >
              <div className="text-center mb-12">
                <h2 className="text-5xl font-black mb-4 bg-gradient-to-r from-green-400 via-blue-400 to-purple-400 bg-clip-text text-transparent">
                  Business Model Architecture
                </h2>
                <p className="text-xl text-blue-200/80 max-w-3xl mx-auto">
                  Four distinct revenue models across the portfolio
                </p>
              </div>

              <div className="grid md:grid-cols-2 gap-8">
                {businessModelTypes.map((model, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: index * 0.1 }}
                  >
                    <Card className="bg-gradient-to-br from-black/60 to-black/40 border-blue-500/30 hover:border-blue-400/50 transition-colors duration-300 h-full">
                      <CardContent className="p-8">
                        <div className="flex items-start gap-4 mb-6">
                          <div className="w-16 h-16 rounded-xl bg-gradient-to-br from-blue-500 to-purple-500 p-4 flex items-center justify-center flex-shrink-0">
                            <model.icon className="h-8 w-8 text-white" />
                          </div>
                          <div>
                            <h3 className="text-2xl font-black text-white mb-2">{model.type}</h3>
                            <p className="text-blue-200/70">{model.description}</p>
                          </div>
                        </div>
                        
                        <div className="mb-6">
                          <div className="text-sm text-blue-300/70 mb-2">Combined Year 5 Revenue</div>
                          <div className="text-4xl font-black text-green-400">{model.revenue}</div>
                        </div>
                        
                        <div>
                          <div className="text-sm text-blue-300/70 mb-3">Ventures in this model:</div>
                          <div className="space-y-2">
                            {model.ventures.map((venture, idx) => (
                              <div key={idx} className="p-3 bg-blue-500/10 rounded-lg border border-blue-500/30">
                                <span className="text-white font-bold">{venture}</span>
                              </div>
                            ))}
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  </motion.div>
                ))}
              </div>

              {/* Total Revenue */}
              <Card className="bg-gradient-to-br from-green-900/30 to-emerald-900/30 border-2 border-green-500/50 mt-12">
                <CardContent className="p-12 text-center">
                  <h3 className="text-4xl font-black text-white mb-4">$1,029,300,000</h3>
                  <p className="text-2xl text-green-200 font-bold mb-6">Combined Year 5 Revenue Target</p>
                  <div className="text-blue-200/70 mb-8">
                    Real-time tracking: <span className="text-white font-black">${(totalRevenue / 1000000).toFixed(2)}M</span> and counting...
                  </div>
                  <div className="grid md:grid-cols-3 gap-6">
                    {[
                      { label: 'Average per Venture', value: '$114M' },
                      { label: 'Portfolio Margin', value: '48%' },
                      { label: 'Market Penetration', value: '0.08%' },
                    ].map((stat, idx) => (
                      <div key={idx} className="p-4 bg-black/40 rounded-xl">
                        <div className="text-3xl font-black text-green-400 mb-1">{stat.value}</div>
                        <div className="text-blue-300">{stat.label}</div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          </AnimatePresence>
        )}

        {/* AND Token Section */}
        {activeSection === 'token' && (
          <AnimatePresence mode="wait">
            <motion.div
              key="token"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="p-6 md:p-12 max-w-7xl mx-auto"
            >
              <ANDTokenDashboard deviceView={deviceView} />
            </motion.div>
          </AnimatePresence>
        )}

        {/* Vision 2077 Section */}
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
                <h2 className="text-6xl md:text-7xl font-black mb-4 bg-gradient-to-r from-blue-400 via-purple-400 to-green-400 bg-clip-text text-transparent">
                  VISION 2077
                </h2>
                <p className="text-2xl text-blue-200/80 max-w-3xl mx-auto">
                  52-year roadmap to planetary-scale innovation
                </p>
              </div>

              {/* Vision Hero */}
              <Card className="bg-gradient-to-br from-blue-900/30 to-purple-900/30 border-2 border-blue-500/50 mb-12 overflow-hidden">
                <div className="relative h-80">
                  <ImageWithFallback
                    src="https://images.unsplash.com/photo-1672581437674-3186b17b405a?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxmdXR1cmlzdGljJTIwdGVjaG5vbG9neXxlbnwxfHx8fDE3NjQyMjE5MDR8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral"
                    alt="Future Technology"
                    className="absolute inset-0 w-full h-full object-cover opacity-30"
                  />
                  <div className="absolute inset-0 bg-gradient-to-r from-blue-900/90 to-purple-900/90" />
                  <div className="relative z-10 flex items-center justify-center h-full">
                    <div className="text-center">
                      <motion.div
                        initial={{ scale: 0 }}
                        animate={{ scale: 1 }}
                        transition={{ type: "spring", duration: 1 }}
                        className="text-7xl font-black text-white mb-4"
                      >
                        2025→2077
                      </motion.div>
                      <div className="text-2xl text-blue-200 font-bold">From 9 Ventures to Planetary Innovation Engine</div>
                    </div>
                  </div>
                </div>
              </Card>

              {/* Roadmap Phases */}
              <div className="space-y-8">
                {visionElements.map((phase, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, x: -30 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: index * 0.1 }}
                  >
                    <Card className="bg-gradient-to-br from-black/60 to-black/40 border-blue-500/30 hover:border-blue-400/50 transition-colors duration-300">
                      <CardContent className="p-8">
                        <div className="grid md:grid-cols-12 gap-6">
                          <div className="md:col-span-3">
                            <div className={`w-20 h-20 rounded-2xl bg-gradient-to-br ${phase.color} p-5 shadow-lg flex items-center justify-center mb-4`}>
                              <phase.icon className="h-10 w-10 text-white" />
                            </div>
                            <div className="text-3xl font-black text-blue-400">{phase.timeline}</div>
                          </div>
                          
                          <div className="md:col-span-9">
                            <h3 className="text-3xl font-black text-white mb-3">{phase.title}</h3>
                            <p className="text-blue-200/80 mb-6 text-lg">{phase.description}</p>
                            
                            <div className="grid md:grid-cols-3 gap-4">
                              {phase.milestones.map((milestone, idx) => (
                                <div key={idx} className="p-4 bg-blue-500/10 rounded-lg border border-blue-500/30">
                                  <CheckCircle className="h-5 w-5 text-blue-400 mb-2" />
                                  <div className="text-white font-bold">{milestone}</div>
                                </div>
                              ))}
                            </div>
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
      </div>
    </div>
  );
}
