import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "motion/react";
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";
import { Button } from "../ui/button";
import { Badge } from "../ui/badge";
import { ImageWithFallback } from "../figma/ImageWithFallback";
import { LiveTicker } from "./shared/LiveTicker";
import { 
  Glasses,
  Sparkles,
  Shield,
  Eye,
  TrendingUp,
  DollarSign,
  Zap,
  Clock,
  Phone,
  Music,
  Mic,
  CheckCircle,
  Scan,
  Play,
  Hand,
  Settings,
  PhoneCall,
  SkipForward,
  Cpu,
  Target,
  Globe,
  BarChart3,
  Award,
  Users,
  Briefcase,
} from "lucide-react";

interface LensstormPrototypeProps {
  deviceView: 'desktop' | 'tablet' | 'mobile';
}

export function LensstormPrototype({ deviceView }: LensstormPrototypeProps) {
  const [activeSection, setActiveSection] = useState<'hero' | 'tech' | 'controls' | 'usecases' | 'vision'>('hero');
  const [displayDemo, setDisplayDemo] = useState<'time' | 'call' | 'music' | 'lyrics'>('time');
  const [totalUpgrades, setTotalUpgrades] = useState(8743);
  const [partneredBrands, setPartneredBrands] = useState(127);

  const isMobile = deviceView === 'mobile';
  const isTablet = deviceView === 'tablet';

  // Simulate real-time data
  useEffect(() => {
    const interval = setInterval(() => {
      setTotalUpgrades(prev => prev + (Math.random() > 0.7 ? 1 : 0));
      setPartneredBrands(prev => prev + (Math.random() > 0.95 ? 1 : 0));
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  // Auto-rotate display demo
  useEffect(() => {
    const demos: Array<'time' | 'call' | 'music' | 'lyrics'> = ['time', 'call', 'music', 'lyrics'];
    let currentIndex = 0;
    const interval = setInterval(() => {
      currentIndex = (currentIndex + 1) % demos.length;
      setDisplayDemo(demos[currentIndex]);
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  const techComponents = [
    {
      id: 'lens',
      name: 'Smart Lenses',
      icon: Sparkles,
      tech: 'Micro-LED Display',
      features: ['0.3mm Ultra-Thin', 'Invisible Integration', '60% Transparency', 'HD Clarity'],
      color: 'from-blue-500 to-cyan-500',
      specs: 'Laser projection embedded in lenses'
    },
    {
      id: 'power',
      name: 'Power System',
      icon: Sparkles,
      tech: 'Graphene Battery',
      features: ['8-Hour Life', 'Edge-Laminated', 'Wireless Charging', 'Fast Charge'],
      color: 'from-green-500 to-emerald-500',
      specs: 'Flexible strips in lens edges'
    },
    {
      id: 'audio',
      name: 'Audio System',
      icon: Sparkles,
      tech: 'Bone Conduction',
      features: ['Private Audio', 'Universal Fit', 'Ambient Aware', 'Crystal Clear'],
      color: 'from-purple-500 to-pink-500',
      specs: 'Transducers in frame temples'
    },
  ];

  const controlSystems = [
    {
      id: 'touch',
      name: 'Touch Controls',
      icon: Sparkles,
      description: 'Capacitive sensors on frame arms for tap, swipe, and hold gestures.',
      gestures: ['Double Tap: Play/Pause', 'Swipe Up: Volume +', 'Swipe Down: Volume -', 'Hold: Answer Call'],
      color: 'from-cyan-500 to-blue-500'
    },
    {
      id: 'ring',
      name: 'NFC Ring',
      icon: Sparkles,
      description: 'Wearable ring with tap and swipe controls for discreet operation.',
      gestures: ['Tap: Next Track', 'Double Tap: Answer', 'Swipe: Skip', 'Hold: Reject'],
      color: 'from-purple-500 to-pink-500'
    },
    {
      id: 'remote',
      name: 'Pocket Remote',
      icon: Sparkles,
      description: 'Miniature remote control for full feature access.',
      gestures: ['Button 1: Music', 'Button 2: Calls', 'Button 3: Time', 'Wheel: Volume'],
      color: 'from-indigo-500 to-purple-500'
    },
  ];

  const displayFeatures = [
    { id: 'time', label: 'Time Display', icon: Sparkles, demo: '3:47 PM' },
    { id: 'call', label: 'Incoming Calls', icon: Sparkles, demo: 'Mom Calling...' },
    { id: 'music', label: 'Now Playing', icon: Sparkles, demo: '♪ Bohemian Rhapsody' },
    { id: 'lyrics', label: 'Live Lyrics', icon: Sparkles, demo: 'Is this the real life?' },
  ];

  const useCases = [
    {
      category: 'Fashion & Luxury',
      icon: Sparkles,
      color: 'from-pink-500 to-rose-500',
      scenarios: [
        { user: 'Designer Frame Owner', benefit: 'Keep $2,000 Gucci frames while adding smart features' },
        { user: 'Style Enthusiast', benefit: 'Match tech to your aesthetic, not vice versa' },
        { user: 'Vintage Collector', benefit: 'Modernize grandfather\'s Cartier frames' },
      ]
    },
    {
      category: 'Professional Use',
      icon: Sparkles,
      color: 'from-blue-500 to-cyan-500',
      scenarios: [
        { user: 'Surgeon', benefit: 'See patient vitals without looking away' },
        { user: 'Chef', benefit: 'Check recipe timers hands-free' },
        { user: 'Mechanic', benefit: 'View repair instructions on-lens' },
      ]
    },
    {
      category: 'Accessibility',
      icon: Sparkles,
      color: 'from-purple-500 to-pink-500',
      scenarios: [
        { user: 'Visually Impaired', benefit: 'Navigation cues without stigma of "tech glasses"' },
        { user: 'Hearing Impaired', benefit: 'Visual call alerts and captions' },
        { user: 'Busy Parent', benefit: 'Read texts without pulling out phone' },
      ]
    },
  ];

  const supportedBrands = [
    { name: 'Ray-Ban', verified: true },
    { name: 'Oakley', verified: true },
    { name: 'Gucci', verified: true },
    { name: 'Prada', verified: true },
    { name: 'Warby Parker', verified: true },
    { name: 'Tom Ford', verified: true },
    { name: 'Cartier', verified: false },
    { name: 'Persol', verified: false },
  ];

  const navigationTabs = [
    { id: 'hero', label: 'Home', icon: Glasses },
    { id: 'tech', label: 'Technology', icon: Sparkles },
    { id: 'controls', label: 'Controls', icon: Sparkles },
    { id: 'usecases', label: 'Use Cases', icon: Sparkles },
    { id: 'vision', label: '$140M Vision', icon: Sparkles },
  ];

  return (
    <div className="h-full text-white overflow-auto relative">
      <div className="relative z-10">
        {/* Header */}
        <div className="glass-strong border-b border-white/5 sticky top-0 z-50">
          <div className="flex items-center justify-between p-4">
            <div className="flex items-center gap-4">
              <div className="relative">
                <div className="w-14 h-14 bg-gradient-to-br from-blue-500 via-purple-500 to-pink-500 rounded-2xl p-3 shadow-xl">
                  <Glasses className="h-8 w-8 text-white" />
                </div>
                <motion.div 
                  className="absolute inset-0 bg-blue-500 rounded-2xl blur-xl opacity-50"
                  animate={{ scale: [1, 1.2, 1], opacity: [0.3, 0.5, 0.3] }}
                  transition={{ duration: 2, repeat: Infinity }}
                />
              </div>
              <div>
                <h1 className="text-2xl font-black bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400 bg-clip-text text-transparent tracking-tight">
                  LENSSTORM
                </h1>
                <p className="text-sm text-blue-300 font-bold tracking-wide">INVISIBLE INTELLIGENCE</p>
              </div>
            </div>
            
            {!isMobile && (
              <div className="flex items-center gap-6">
                <div className="text-right">
                  <div className="text-xs text-blue-300/80 font-bold uppercase tracking-wide">Lens Upgrades</div>
                  <div className="text-xl font-black text-blue-400">{totalUpgrades.toLocaleString()}</div>
                </div>
                <div className="text-right">
                  <div className="text-xs text-purple-300/80 font-bold uppercase tracking-wide">Partner Brands</div>
                  <div className="text-xl font-black text-purple-400">{partneredBrands}</div>
                </div>
                <Badge className="bg-gradient-to-r from-blue-500/20 to-purple-500/20 text-blue-300 border border-blue-500/40 px-4 py-2 font-black uppercase tracking-wide">
                  <Shield className="h-3 w-3 mr-2" />
                  Stealth Tech
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
                      ? 'bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 text-white shadow-lg shadow-blue-500/50 font-black' 
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

        {/* Live ambient metrics */}
        <div className="px-4 pt-4">
          <LiveTicker
            caption="LENS ACTIVE"
            pulseColor="bg-cyan-400"
            metrics={[
              { label: 'Overlays Rendered/sec', base: 248, drift: 4, min: 200, max: 320, accent: 'text-cyan-300' },
              { label: 'Focus Fidelity', base: 99.4, drift: 0.3, min: 97, max: 100, suffix: '%', decimals: 2, accent: 'text-sky-300' },
              { label: 'Battery Draw', base: 1.8, drift: 0.15, min: 1.2, max: 2.4, suffix: 'W', decimals: 2, accent: 'text-amber-300' },
              { label: 'Active Pairs', base: 12403, drift: 1, counter: true, accent: 'text-indigo-300' },
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
                    src="https://images.unsplash.com/photo-1646084081219-1090f72a531c?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxkZXNpZ25lciUyMGV5ZWdlYXNzZXMlMjBmYXNoaW9ufGVufDF8fHx8MTc2NDI4MzA4NXww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral"
                    alt="Designer Glasses"
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-r from-blue-900/95 via-purple-900/90 to-pink-900/95" />
                  
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
                      {i % 3 === 0 ? (
                        <Glasses className="h-6 w-6 text-blue-400/60" />
                      ) : i % 3 === 1 ? (
                        <Sparkles className="h-6 w-6 text-purple-400/60" />
                      ) : (
                        <Zap className="h-6 w-6 text-pink-400/60" />
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
                      <h1 className="text-6xl md:text-7xl font-black mb-6 bg-gradient-to-r from-blue-300 via-purple-300 to-pink-300 bg-clip-text text-transparent leading-tight">
                        YOUR STYLE<br />UNCOMPROMISED
                      </h1>
                    </motion.div>
                    
                    <motion.p
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.8, delay: 0.2 }}
                      className="text-2xl text-blue-200 mb-8 font-medium leading-relaxed"
                    >
                      Transform <span className="text-white font-bold">any glasses</span> into smart glasses with <span className="text-white font-bold">invisible tech.</span><br className="hidden md:block" />
                      Keep your Ray-Bans, Guccis, or Oakleys — we upgrade the lenses, not your style.
                    </motion.p>

                    <motion.div
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.8, delay: 0.4 }}
                      className="flex flex-wrap gap-4 justify-center mb-8"
                    >
                      <Button 
                        size="lg" 
                        onClick={() => setActiveSection('tech')}
                        className="bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 hover:from-blue-500 hover:via-purple-500 hover:to-pink-500 text-white font-black px-8 py-6 text-lg shadow-2xl shadow-blue-500/50 transition-colors duration-300 hover:scale-105"
                      >
                        <Eye className="h-6 w-6 mr-3" />
                        See The Tech
                      </Button>
                      <Button 
                        size="lg" 
                        variant="outline"
                        onClick={() => setActiveSection('vision')}
                        className="border-2 border-blue-400/50 text-blue-200 hover:bg-blue-500/20 font-black px-8 py-6 text-lg backdrop-blur-xl"
                      >
                        <TrendingUp className="h-6 w-6 mr-3" />
                        $140M Vision
                      </Button>
                    </motion.div>

                    <motion.div
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{ duration: 0.8, delay: 0.6 }}
                      className="flex flex-wrap gap-8 justify-center"
                    >
                      {[
                        { label: '$399-$699', sublabel: 'Lens Upgrade', icon: DollarSign },
                        { label: 'Invisible', sublabel: 'Zero Branding', icon: Eye },
                        { label: 'Any Brand', sublabel: 'Universal Fit', icon: Glasses },
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

              {/* The Problem */}
              <div className="p-6 md:p-12 max-w-7xl mx-auto">
                <div className="text-center mb-12">
                  <h2 className="text-4xl md:text-5xl font-black mb-4 bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
                    The Fashion-Tech Divide
                  </h2>
                  <p className="text-xl text-blue-200/80 max-w-3xl mx-auto">
                    Why should you sacrifice $2,000 designer frames for bulky smart glasses?
                  </p>
                </div>

                <Card className="bg-gradient-to-br from-red-900/30 to-orange-900/30 border-2 border-red-500/50 mb-12">
                  <CardContent className="p-12 text-center">
                    <Sparkles className="h-24 w-24 mx-auto mb-6 text-red-400" />
                    <h3 className="text-3xl font-black text-white mb-4">The Aesthetic-Tech Dissonance</h3>
                    <p className="text-blue-200/80 max-w-2xl mx-auto mb-8 text-lg">
                      74% of glasses wearers refuse smart glasses because they look "geeky". Luxury frames become obsolete. 
                      LensStorm ends this false choice between beauty and brains.
                    </p>
                    <div className="grid md:grid-cols-3 gap-6">
                      {[
                        { stat: '74%', label: 'Reject "Tech Look"' },
                        { stat: '$1,200+', label: 'Wasted on Old Frames' },
                        { stat: '78%', label: 'Smart Glasses Fail' },
                      ].map((item, idx) => (
                        <div key={idx} className="p-6 bg-black/40 rounded-xl">
                          <div className="text-4xl font-black text-red-400 mb-2">{item.stat}</div>
                          <div className="text-blue-300">{item.label}</div>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>

                {/* How It Works */}
                <div className="text-center mb-12">
                  <h2 className="text-4xl font-black mb-4 text-white">How LensStorm Works</h2>
                  <p className="text-xl text-blue-200/80 max-w-3xl mx-auto">
                    Bring your glasses. We upgrade the lenses. No visible changes.
                  </p>
                </div>

                <div className={`grid gap-8 ${isMobile ? 'grid-cols-1' : isTablet ? 'grid-cols-2' : 'grid-cols-4'}`}>
                  {[
                    {
                      step: '01',
                      title: 'Bring Your Glasses',
                      description: 'Any brand, any style. Ray-Ban, Gucci, Oakley — we support them all.',
                      icon: Glasses,
                      color: 'from-blue-500 to-cyan-500'
                    },
                    {
                      step: '02',
                      title: '3D Scan & Match',
                      description: 'We scan your frame specs using precision 3D imaging to match original lens curvature.',
                      icon: Scan,
                      color: 'from-purple-500 to-pink-500'
                    },
                    {
                      step: '03',
                      title: 'Smart Lens Crafting',
                      description: 'Custom lenses with embedded micro-LED displays are crafted to look identical.',
                      icon: Eye,
                      color: 'from-pink-500 to-rose-500'
                    },
                    {
                      step: '04',
                      title: 'Invisible Upgrade',
                      description: 'Get your glasses back with smart features. Zero branding, zero visible tech.',
                      icon: Sparkles,
                      color: 'from-indigo-500 to-purple-500'
                    },
                  ].map((step, index) => (
                    <motion.div
                      key={index}
                      initial={{ opacity: 0, y: 30 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true }}
                      transition={{ delay: index * 0.1 }}
                      whileHover={{ y: -8, scale: 1.02 }}
                    >
                      <Card className="bg-black/30 backdrop-blur-xl border-blue-500/20 hover:border-blue-400/50 transition-colors duration-300 hover:shadow-2xl hover:shadow-blue-500/20 h-full">
                        <CardContent className="p-8">
                          <div className="flex items-center gap-4 mb-6">
                            <div className={`w-16 h-16 rounded-2xl bg-gradient-to-br ${step.color} p-4 shadow-lg flex items-center justify-center`}>
                              <step.icon className="h-8 w-8 text-white" />
                            </div>
                          </div>
                          <h3 className="text-2xl font-black mb-3 text-white">{step.title}</h3>
                          <p className="text-blue-200/70 leading-relaxed">{step.description}</p>
                        </CardContent>
                      </Card>
                    </motion.div>
                  ))}
                </div>

                {/* Supported Brands */}
                <div className="mt-20">
                  <div className="text-center mb-12">
                    <h2 className="text-4xl font-black mb-4 text-white">Compatible Brands</h2>
                    <p className="text-xl text-blue-200/80">Works with 127+ eyewear brands</p>
                  </div>

                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                    {supportedBrands.map((brand, index) => (
                      <motion.div
                        key={index}
                        initial={{ opacity: 0, scale: 0.9 }}
                        whileInView={{ opacity: 1, scale: 1 }}
                        viewport={{ once: true }}
                        transition={{ delay: index * 0.05 }}
                      >
                        <Card className="bg-black/30 backdrop-blur-xl border-blue-500/30 hover:border-blue-400 transition-colors duration-300">
                          <CardContent className="p-6 text-center">
                            <h3 className="text-xl font-black text-white mb-2">{brand.name}</h3>
                            {brand.verified && (
                              <Badge className="bg-green-500/20 text-green-400 border-green-500/40">
                                <CheckCircle className="h-3 w-3 mr-1" />
                                Verified
                              </Badge>
                            )}
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

        {/* Technology Section */}
        {activeSection === 'tech' && (
          <AnimatePresence mode="wait">
            <motion.div
              key="tech"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="p-6 md:p-12 max-w-7xl mx-auto"
            >
              <div className="text-center mb-12">
                <h2 className="text-5xl font-black mb-4 bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400 bg-clip-text text-transparent">
                  Invisible Intelligence
                </h2>
                <p className="text-xl text-blue-200/80 max-w-3xl mx-auto">
                  Cutting-edge tech that disappears into your lenses
                </p>
              </div>

              {/* Live Display Demo */}
              <Card className="bg-black/30 backdrop-blur-xl border-2 border-blue-500/50 mb-12">
                <CardHeader>
                  <CardTitle className="flex items-center gap-3 text-white text-2xl">
                    <Eye className="h-7 w-7 text-blue-400" />
                    Live Display Demo
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="aspect-video bg-black/30 backdrop-blur-xl rounded-2xl flex items-center justify-center relative overflow-hidden mb-6">
                    <div className="text-center">
                      <AnimatePresence mode="wait">
                        <motion.div
                          key={displayDemo}
                          initial={{ opacity: 0, scale: 0.8 }}
                          animate={{ opacity: 1, scale: 1 }}
                          exit={{ opacity: 0, scale: 0.8 }}
                          transition={{ duration: 0.5 }}
                        >
                          {displayDemo === 'time' && (
                            <>
                              <Clock className="h-24 w-24 mx-auto mb-4 text-blue-400" />
                              <p className="text-5xl font-black text-white">3:47 PM</p>
                            </>
                          )}
                          {displayDemo === 'call' && (
                            <>
                              <Phone className="h-24 w-24 mx-auto mb-4 text-green-400 animate-pulse" />
                              <p className="text-4xl font-black text-white mb-2">Mom Calling...</p>
                              <p className="text-blue-300">Swipe to answer</p>
                            </>
                          )}
                          {displayDemo === 'music' && (
                            <>
                              <Music className="h-24 w-24 mx-auto mb-4 text-purple-400" />
                              <p className="text-3xl font-black text-white mb-2">♪ Bohemian Rhapsody</p>
                              <p className="text-blue-300">Queen</p>
                            </>
                          )}
                          {displayDemo === 'lyrics' && (
                            <>
                              <Mic className="h-24 w-24 mx-auto mb-4 text-pink-400" />
                              <p className="text-2xl font-black text-white mb-2">Is this the real life?</p>
                              <p className="text-blue-300">Is this just fantasy?</p>
                            </>
                          )}
                        </motion.div>
                      </AnimatePresence>
                    </div>
                  </div>

                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                    {displayFeatures.map((feature) => (
                      <Button
                        key={feature.id}
                        variant={displayDemo === feature.id ? 'default' : 'outline'}
                        onClick={() => setDisplayDemo(feature.id as any)}
                        className={displayDemo === feature.id 
                          ? 'bg-gradient-to-r from-blue-600 to-purple-600 text-white font-black' 
                          : 'border-blue-500/40 text-blue-300 hover:bg-blue-500/20'}
                      >
                        <feature.icon className="h-4 w-4 mr-2" />
                        {feature.label}
                      </Button>
                    ))}
                  </div>
                </CardContent>
              </Card>

              {/* Tech Components */}
              <div className={`grid gap-8 mb-12 ${isMobile ? 'grid-cols-1' : 'grid-cols-3'}`}>
                {techComponents.map((component, index) => (
                  <motion.div
                    key={component.id}
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: index * 0.1 }}
                    whileHover={{ y: -8, scale: 1.02 }}
                  >
                    <Card className="bg-black/30 backdrop-blur-xl border-blue-500/20 hover:border-blue-400/50 transition-colors duration-300 hover:shadow-2xl hover:shadow-blue-500/20 h-full">
                      <CardContent className="p-8">
                        <div className={`w-20 h-20 mb-6 rounded-2xl bg-gradient-to-br ${component.color} p-5 shadow-lg flex items-center justify-center`}>
                          <component.icon className="h-10 w-10 text-white" />
                        </div>
                        <h3 className="text-2xl font-black mb-2 text-white">{component.name}</h3>
                        <Badge className="bg-blue-500/20 text-blue-400 border-blue-500/40 mb-4">
                          {component.tech}
                        </Badge>
                        <p className="text-blue-200/70 mb-4">{component.specs}</p>
                        <div className="space-y-2">
                          {component.features.map((feature, idx) => (
                            <div key={idx} className="flex items-center gap-2 text-sm text-blue-300">
                              <CheckCircle className="h-4 w-4 text-blue-400 flex-shrink-0" />
                              <span>{feature}</span>
                            </div>
                          ))}
                        </div>
                      </CardContent>
                    </Card>
                  </motion.div>
                ))}
              </div>

              {/* Technical Specs */}
              <Card className="bg-black/30 backdrop-blur-xl border-blue-500/30">
                <CardHeader>
                  <CardTitle className="flex items-center gap-3 text-white text-2xl">
                    <Cpu className="h-7 w-7 text-blue-400" />
                    Technical Specifications
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="grid md:grid-cols-2 gap-6">
                    {[
                      { label: 'Display Resolution', value: '720p per eye' },
                      { label: 'Lens Thickness', value: '0.3mm addition' },
                      { label: 'Transparency', value: '60% (clear view)' },
                      { label: 'Battery Life', value: '8 hours active use' },
                      { label: 'Charging Time', value: '1 hour (wireless)' },
                      { label: 'Connectivity', value: 'Bluetooth 5.3 + Wi-Fi' },
                      { label: 'Audio Type', value: 'Bone Conduction' },
                      { label: 'Water Resistance', value: 'IP54 (splash proof)' },
                    ].map((spec, idx) => (
                      <div key={idx} className="p-4 bg-blue-500/10 rounded-lg border border-blue-500/20">
                        <div className="text-sm text-blue-300/70 mb-1">{spec.label}</div>
                        <div className="text-2xl font-black text-white">{spec.value}</div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          </AnimatePresence>
        )}

        {/* Controls Section */}
        {activeSection === 'controls' && (
          <AnimatePresence mode="wait">
            <motion.div
              key="controls"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="p-6 md:p-12 max-w-7xl mx-auto"
            >
              <div className="text-center mb-12">
                <h2 className="text-5xl font-black mb-4 bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400 bg-clip-text text-transparent">
                  Control Systems
                </h2>
                <p className="text-xl text-blue-200/80 max-w-3xl mx-auto">
                  Choose your interaction method — touch, ring, or remote
                </p>
              </div>

              <div className="grid gap-8">
                {controlSystems.map((system, index) => (
                  <motion.div
                    key={system.id}
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: index * 0.1 }}
                  >
                    <Card className="bg-black/30 backdrop-blur-xl border-blue-500/30">
                      <CardContent className="p-8">
                        <div className="grid md:grid-cols-12 gap-6 items-center">
                          <div className="md:col-span-2 flex justify-center">
                            <div className={`w-24 h-24 rounded-full bg-gradient-to-br ${system.color} p-6 flex items-center justify-center shadow-xl`}>
                              <system.icon className="h-12 w-12 text-white" />
                            </div>
                          </div>
                          <div className="md:col-span-10">
                            <h3 className="text-2xl font-black text-white mb-2">{system.name}</h3>
                            <p className="text-blue-200/70 mb-4 text-lg">{system.description}</p>
                            <div className="grid md:grid-cols-2 gap-3">
                              {system.gestures.map((gesture, idx) => (
                                <div key={idx} className="p-3 bg-blue-500/10 rounded-lg border border-blue-500/20">
                                  <p className="text-blue-300">{gesture}</p>
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

              {/* Control Demo */}
              <Card className="bg-gradient-to-br from-purple-900/30 to-pink-900/30 border-2 border-purple-500/50 mt-12">
                <CardHeader>
                  <CardTitle className="flex items-center gap-3 text-white text-2xl">
                    <Settings className="h-7 w-7 text-purple-400" />
                    Interactive Control Demo
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="aspect-video bg-gradient-to-br from-purple-900/50 via-pink-900/50 to-rose-900/50 rounded-2xl flex items-center justify-center relative overflow-hidden mb-6">
                    <div className="text-center">
                      <Hand className="h-32 w-32 mx-auto mb-4 text-purple-400" />
                      <p className="text-2xl text-white font-black mb-2">Touch Frame to Control</p>
                      <p className="text-purple-300">Tap, swipe, or hold for different actions</p>
                    </div>
                  </div>

                  <div className="grid md:grid-cols-3 gap-4">
                    <Button
                      className="bg-gradient-to-r from-blue-600 to-cyan-600 hover:from-blue-500 hover:to-cyan-500 font-black py-6"
                      size="lg"
                    >
                      <Play className="h-5 w-5 mr-2" />
                      Play Music
                    </Button>
                    <Button
                      className="bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-500 hover:to-pink-500 font-black py-6"
                      size="lg"
                    >
                      <PhoneCall className="h-5 w-5 mr-2" />
                      Answer Call
                    </Button>
                    <Button
                      className="bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-500 hover:to-purple-500 font-black py-6"
                      size="lg"
                    >
                      <SkipForward className="h-5 w-5 mr-2" />
                      Next Track
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          </AnimatePresence>
        )}

        {/* Use Cases Section */}
        {activeSection === 'usecases' && (
          <AnimatePresence mode="wait">
            <motion.div
              key="usecases"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="p-6 md:p-12 max-w-7xl mx-auto"
            >
              <div className="text-center mb-12">
                <h2 className="text-5xl font-black mb-4 bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400 bg-clip-text text-transparent">
                  Real-World Applications
                </h2>
                <p className="text-xl text-blue-200/80 max-w-3xl mx-auto">
                  From fashion to function — LensStorm adapts to your life
                </p>
              </div>

              <div className="grid gap-8">
                {useCases.map((useCase, index) => (
                  <motion.div
                    key={useCase.category}
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: index * 0.1 }}
                  >
                    <Card className="bg-black/30 backdrop-blur-xl border-blue-500/30">
                      <CardHeader>
                        <CardTitle className="flex items-center gap-3 text-white text-2xl">
                          <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${useCase.color} p-3`}>
                            <useCase.icon className="h-6 w-6 text-white" />
                          </div>
                          {useCase.category}
                        </CardTitle>
                      </CardHeader>
                      <CardContent>
                        <div className="grid md:grid-cols-3 gap-6">
                          {useCase.scenarios.map((scenario, idx) => (
                            <div key={idx} className="p-6 bg-black/40 rounded-xl border border-blue-500/20 hover:border-blue-400/50 transition-colors duration-300">
                              <h4 className="text-lg font-black text-white mb-3">{scenario.user}</h4>
                              <p className="text-blue-200/70">{scenario.benefit}</p>
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

        {/* $140M Vision Section */}
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
                <h2 className="text-6xl md:text-7xl font-black mb-4 bg-gradient-to-r from-green-400 via-blue-400 to-purple-400 bg-clip-text text-transparent">
                  $140 MILLION VISION
                </h2>
                <p className="text-2xl text-blue-200/80 max-w-3xl mx-auto">
                  Year 5 Projection — Dominating the $140B Eyewear Market
                </p>
              </div>

              {/* Financial Hero */}
              <Card className="bg-gradient-to-br from-green-900/30 to-blue-900/30 border-2 border-green-500/50 mb-12 overflow-hidden">
                <div className="relative h-64">
                  <div className="absolute inset-0 bg-gradient-to-r from-green-900/90 to-blue-900/90" />
                  <div className="relative z-10 flex items-center justify-center h-full">
                    <div className="text-center">
                      <motion.div
                        initial={{ scale: 0 }}
                        animate={{ scale: 1 }}
                        transition={{ type: "spring", duration: 1 }}
                        className="text-7xl font-black text-white mb-4"
                      >
                        $140,000,000
                      </motion.div>
                      <div className="text-2xl text-green-200 font-bold">Year 5 Revenue Target</div>
                      <div className="text-blue-300 mt-2">200,000 lens upgrades • 65% profit margin</div>
                    </div>
                  </div>
                </div>
              </Card>

              {/* 5-Year Growth */}
              <Card className="bg-black/30 backdrop-blur-xl border-blue-500/30 mb-12">
                <CardHeader>
                  <CardTitle className="flex items-center gap-3 text-white text-2xl">
                    <TrendingUp className="h-7 w-7 text-green-400" />
                    5-Year Revenue Trajectory
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {[
                      { year: 1, revenue: '$2.5M', units: '5,000', profit: '-$1.1M*', margin: '44%', highlight: 'Launch' },
                      { year: 2, revenue: '$12M', units: '20,000', profit: '$3.8M', margin: '57%', highlight: 'Growth' },
                      { year: 3, revenue: '$30M', units: '50,000', profit: '$10.5M', margin: '60%', highlight: 'Scale' },
                      { year: 4, revenue: '$65M', units: '100,000', profit: '$22M', margin: '63%', highlight: 'Expansion' },
                      { year: 5, revenue: '$140M', units: '200,000', profit: '$45M', margin: '65%', highlight: 'Dominance' },
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
                            ? 'bg-gradient-to-r from-green-500/20 to-blue-500/20 border-2 border-green-500/50' 
                            : 'bg-blue-500/10 border border-blue-500/20'
                        }`}>
                          <div className="grid grid-cols-2 md:grid-cols-6 gap-4 items-center">
                            <div>
                              <div className="text-sm text-blue-300/80 mb-1">Year {milestone.year}</div>
                              <div className={`text-2xl font-black ${milestone.year === 5 ? 'text-green-400' : 'text-white'}`}>
                                {milestone.highlight}
                              </div>
                            </div>
                            <div>
                              <div className="text-sm text-blue-300/80 mb-1">Revenue</div>
                              <div className="text-xl font-black text-white">{milestone.revenue}</div>
                            </div>
                            <div>
                              <div className="text-sm text-blue-300/80 mb-1">Units</div>
                              <div className="text-xl font-black text-white">{milestone.units}</div>
                            </div>
                            <div>
                              <div className="text-sm text-blue-300/80 mb-1">Net Profit</div>
                              <div className="text-xl font-black text-white">{milestone.profit}</div>
                            </div>
                            <div>
                              <div className="text-sm text-blue-300/80 mb-1">Margin</div>
                              <div className="text-xl font-black text-white">{milestone.margin}</div>
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
                  <p className="text-blue-300/70 text-sm mt-4 text-center">*Year 1 includes $800K R&D amortization</p>
                </CardContent>
              </Card>

              {/* Market & Revenue */}
              <div className={`grid gap-8 mb-12 ${isMobile ? 'grid-cols-1' : 'grid-cols-2'}`}>
                <Card className="bg-gradient-to-br from-blue-900/30 to-purple-900/30 border-2 border-blue-500/40">
                  <CardHeader>
                    <CardTitle className="flex items-center gap-3 text-white text-xl">
                      <Globe className="h-6 w-6 text-blue-400" />
                      Market Opportunity
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="text-5xl font-black text-white mb-2">$140B</div>
                    <div className="text-blue-200/80 mb-6">Global Eyewear Market</div>
                    <div className="space-y-3">
                      {[
                        { segment: 'Total Eyewear Market', size: '$140B' },
                        { segment: 'Smart Glasses (2030)', size: '$30B' },
                        { segment: 'LensStorm Target (Y5)', size: '$140M' },
                      ].map((segment, idx) => (
                        <div key={idx} className="flex justify-between items-center p-3 bg-black/40 rounded-lg">
                          <span className="text-blue-200">{segment.segment}</span>
                          <span className="text-xl font-black text-blue-400">{segment.size}</span>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>

                <Card className="bg-gradient-to-br from-purple-900/30 to-pink-900/30 border-2 border-purple-500/40">
                  <CardHeader>
                    <CardTitle className="flex items-center gap-3 text-white text-xl">
                      <Target className="h-6 w-6 text-purple-400" />
                      Revenue Breakdown (Year 5)
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      {[
                        { stream: 'Lens Upgrades', revenue: '$98M', percentage: '70%' },
                        { stream: 'Accessories (Rings)', revenue: '$21M', percentage: '15%' },
                        { stream: 'B2B Licensing', revenue: '$21M', percentage: '15%' },
                      ].map((stream, idx) => (
                        <div key={idx}>
                          <div className="flex justify-between items-center mb-2">
                            <span className="text-purple-200 font-bold">{stream.stream}</span>
                            <span className="text-xl font-black text-white">{stream.revenue}</span>
                          </div>
                          <div className="h-2 bg-black/40 rounded-full overflow-hidden">
                            <motion.div
                              initial={{ width: 0 }}
                              whileInView={{ width: stream.percentage }}
                              viewport={{ once: true }}
                              transition={{ duration: 1, delay: idx * 0.2 }}
                              className="h-full bg-gradient-to-r from-purple-500 to-pink-500"
                            />
                          </div>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </div>

              {/* Key Metrics */}
              <Card className="bg-black/30 backdrop-blur-xl border-blue-500/30 mb-12">
                <CardHeader>
                  <CardTitle className="flex items-center gap-3 text-white text-2xl">
                    <BarChart3 className="h-7 w-7 text-blue-400" />
                    Year 5 Key Metrics
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
                    {[
                      { label: 'Revenue', value: '$140M', icon: DollarSign, color: 'text-green-400' },
                      { label: 'Units Sold', value: '200,000', icon: Glasses, color: 'text-blue-400' },
                      { label: 'Profit Margin', value: '65%', icon: TrendingUp, color: 'text-emerald-400' },
                      { label: 'Net Profit', value: '$45M', icon: Award, color: 'text-green-400' },
                      { label: 'Partner Brands', value: '300+', icon: Globe, color: 'text-purple-400' },
                      { label: 'B2B Licenses', value: '15', icon: Briefcase, color: 'text-cyan-400' },
                      { label: 'Team Size', value: '150', icon: Users, color: 'text-indigo-400' },
                      { label: 'Patents Filed', value: '8', icon: Shield, color: 'text-blue-400' },
                    ].map((metric, idx) => (
                      <motion.div
                        key={idx}
                        initial={{ opacity: 0, scale: 0.9 }}
                        whileInView={{ opacity: 1, scale: 1 }}
                        viewport={{ once: true }}
                        transition={{ delay: idx * 0.05 }}
                        className="text-center p-6 bg-blue-500/10 rounded-xl border border-blue-500/20"
                      >
                        <metric.icon className={`h-10 w-10 mx-auto mb-3 ${metric.color}`} />
                        <div className="text-3xl font-black text-white mb-2">{metric.value}</div>
                        <div className="text-sm text-blue-300/80">{metric.label}</div>
                      </motion.div>
                    ))}
                  </div>
                </CardContent>
              </Card>

              {/* Loan Information */}
              <Card className="bg-gradient-to-br from-green-900/30 to-emerald-900/30 border-2 border-green-500/50">
                <CardContent className="p-12 text-center">
                  <DollarSign className="h-16 w-16 mx-auto mb-6 text-green-400" />
                  <h3 className="text-3xl font-black text-white mb-4">$2M Loan Request</h3>
                  <p className="text-blue-200/80 max-w-2xl mx-auto mb-8 text-lg">
                    Funding for R&D, manufacturing setup, and market launch. Repayable in 5 years at 7% interest 
                    from revenue starting Year 2. Patent-protected invisible tech integration.
                  </p>
                  <div className="grid md:grid-cols-4 gap-6">
                    {[
                      { label: 'R&D', amount: '$800K', percent: '40%' },
                      { label: 'Manufacturing', amount: '$600K', percent: '30%' },
                      { label: 'Software', amount: '$300K', percent: '15%' },
                      { label: 'Marketing', amount: '$300K', percent: '15%' },
                    ].map((allocation, idx) => (
                      <div key={idx} className="p-6 bg-black/40 rounded-xl">
                        <div className="text-2xl font-black text-green-400 mb-2">{allocation.amount}</div>
                        <div className="text-white font-bold mb-1">{allocation.label}</div>
                        <div className="text-sm text-blue-300/70">{allocation.percent}</div>
                      </div>
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