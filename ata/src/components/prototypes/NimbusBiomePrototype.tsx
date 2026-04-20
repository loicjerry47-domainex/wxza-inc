import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "motion/react";
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";
import { Button } from "../ui/button";
import { Badge } from "../ui/badge";
import { ImageWithFallback } from "../figma/ImageWithFallback";
import { LiveTicker } from "./shared/LiveTicker";
import { 
  Leaf,
  TreePine,
  Cloud,
  Brain,
  TrendingUp,
  Bug,
  Sun,
  Smartphone,
  Heart,
  Activity,
  Thermometer,
  Droplets,
  Play,
  Settings,
  CheckCircle,
  Eye,
  Zap,
  Target,
  Globe,
  BarChart3,
  DollarSign,
  Users,
  Award,
} from "lucide-react";

interface NimbusBiomePrototypeProps {
  deviceView: 'desktop' | 'tablet' | 'mobile';
}

export function NimbusBiomePrototype({ deviceView }: NimbusBiomePrototypeProps) {
  const [activeSection, setActiveSection] = useState<'hero' | 'products' | 'ecosystem' | 'floraaai' | 'vision'>('hero');
  const [selectedProduct, setSelectedProduct] = useState('core');
  const [humidity, setHumidity] = useState(68);
  const [temperature, setTemperature] = useState(72);
  const [co2Offset, setCo2Offset] = useState(847);
  const [ecosystemsActive, setEcosystemsActive] = useState(1247);

  const isMobile = deviceView === 'mobile';
  const isTablet = deviceView === 'tablet';

  // Simulate real-time data
  useEffect(() => {
    const interval = setInterval(() => {
      setHumidity(prev => Math.min(85, Math.max(55, prev + (Math.random() - 0.5) * 2)));
      setTemperature(prev => Math.min(78, Math.max(68, prev + (Math.random() - 0.5))));
      setCo2Offset(prev => prev + (Math.random() > 0.7 ? 1 : 0));
      setEcosystemsActive(prev => prev + (Math.random() > 0.95 ? 1 : 0));
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  const products = [
    {
      id: 'core',
      name: 'Nimbus Core',
      price: '$2,499',
      size: '12" Glass Dome',
      features: ['Living bonsai tree', '3 solar fireflies', 'Cloud weather system', 'Basic app control', '1-year warranty'],
      specs: { bots: 3, weather: 'Basic', ai: 'Standard', size: '12"' },
      margin: '35%',
      color: 'from-emerald-500 to-green-500'
    },
    {
      id: 'pro',
      name: 'Nimbus Pro',
      price: '$3,999',
      size: '18" Borosilicate',
      features: ['Ancient ficus bonsai', '5 robotic creatures', 'AI weather patterns', 'Circadian lighting', 'Priority support'],
      specs: { bots: 5, weather: 'AI-Driven', ai: 'Advanced', size: '18"' },
      margin: '55%',
      color: 'from-cyan-500 to-blue-500',
      popular: true
    },
    {
      id: 'enterprise',
      name: 'Nimbus Enterprise',
      price: 'Custom Quote',
      size: 'Wall-Sized+',
      features: ['Custom ecosystem design', 'Gesture control weather', 'Corporate wellness integration', 'Installation service', 'Dedicated support'],
      specs: { bots: '10+', weather: 'Custom', ai: 'Enterprise', size: 'Custom' },
      margin: '65%',
      color: 'from-purple-500 to-pink-500'
    },
  ];

  const roboticCreatures = [
    { name: 'Solar Butterflies', behavior: 'Emerge at dawn, flutter near bonsai', energy: 'Solar (48hr battery)' },
    { name: 'Firefly Bots', behavior: 'Bioluminescent glow at dusk', energy: 'Ambient light charging' },
    { name: 'Beetle Drones', behavior: 'Ground patrol, moss inspection', energy: 'Inductive charging pads' },
    { name: 'Dragonfly Scouts', behavior: 'Mid-air hovering, fog interaction', energy: 'Solar + kinetic' },
  ];

  const navigationTabs = [
    { id: 'hero', label: 'Home', icon: TreePine },
    { id: 'products', label: 'Products', icon: Leaf },
    { id: 'ecosystem', label: 'Ecosystem', icon: Cloud },
    { id: 'floraaai', label: 'FloraAI', icon: Brain },
    { id: 'vision', label: '$6M Vision', icon: TrendingUp },
  ];

  return (
    <div className="h-full text-white overflow-auto relative">
      <div className="relative z-10">
        {/* Header */}
        <div className="glass-strong border-b border-white/5 sticky top-0 z-50">
          <div className="flex items-center justify-between p-4">
            <div className="flex items-center gap-4">
              <div className="relative">
                <div className="w-10 h-10 bg-gradient-to-br from-emerald-500 via-green-500 to-cyan-500 rounded-lg flex items-center justify-center">
                  <TreePine className="h-5 w-5 text-white" />
                </div>
              </div>
              <div>
                <h1 className="text-lg font-black tracking-wider">NIMBUS BIOME</h1>
                <p className="text-xs text-gray-500 uppercase tracking-wide">Biophilic Design / IoT</p>
              </div>
            </div>
            
            {!isMobile && (
              <div className="flex items-center gap-4">
                <Badge className="bg-emerald-600/20 text-emerald-400 border border-emerald-600/30 text-xs">
                  $845M
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
                      ? 'bg-gradient-to-r from-emerald-600 via-green-600 to-cyan-600 text-white shadow-lg shadow-emerald-500/50 font-black' 
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
            caption="BIOME LIVE"
            pulseColor="bg-emerald-400"
            metrics={[
              { label: 'Ecosystems Online', base: 1247, drift: 1, counter: true, accent: 'text-emerald-300' },
              { label: 'Avg Humidity', base: 68, drift: 1.5, min: 55, max: 85, suffix: '%', decimals: 1, accent: 'text-cyan-300' },
              { label: 'Avg Temp', base: 72, drift: 0.8, min: 68, max: 78, suffix: '°F', decimals: 1, accent: 'text-amber-300' },
              { label: 'CO₂ Offset', base: 847, drift: 2, counter: true, suffix: ' kg', accent: 'text-green-300' },
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
              <div className="relative h-[600px] overflow-hidden bg-black">
                <div className="absolute inset-0">
                  <ImageWithFallback
                    src="https://images.unsplash.com/photo-1762180581958-911c3cc56234?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx0ZXJyYXJpdW0lMjBlY29zeXN0ZW0lMjBnbGFzc3xlbnwxfHx8fDE3NjQyODE2MzJ8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral"
                    alt="Terrarium Ecosystem"
                    className="w-full h-full object-cover opacity-20"
                  />
                  <div className="absolute inset-0 bg-black/60" />
                </div>

                <div className="relative z-10 flex items-center justify-center h-full px-4">
                  <div className="text-center max-w-4xl">
                    <motion.div
                      initial={{ opacity: 0, scale: 0.8 }}
                      animate={{ opacity: 1, scale: 1 }}
                      transition={{ duration: 0.8 }}
                    >
                      <h1 className="text-6xl md:text-7xl font-black mb-6 bg-gradient-to-r from-emerald-300 via-green-300 to-cyan-300 bg-clip-text text-transparent leading-tight">
                        NATURE MEETS<br />ROBOTICS
                      </h1>
                    </motion.div>
                    
                    <motion.p
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.8, delay: 0.2 }}
                      className="text-2xl text-emerald-200 mb-8 font-medium leading-relaxed"
                    >
                      Self-sustaining terrarium ecosystems with <span className="text-white font-bold">living bonsai,</span><br className="hidden md:block" />
                      <span className="text-white font-bold">robotic wildlife,</span> and <span className="text-white font-bold">dynamic weather.</span> Zero maintenance.
                    </motion.p>

                    <motion.div
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.8, delay: 0.4 }}
                      className="flex flex-wrap gap-4 justify-center mb-8"
                    >
                      <Button 
                        size="lg" 
                        onClick={() => setActiveSection('products')}
                        className="bg-gradient-to-r from-emerald-600 via-green-600 to-cyan-600 hover:from-emerald-500 hover:via-green-500 hover:to-cyan-500 text-white font-black px-8 py-6 text-lg shadow-2xl shadow-emerald-500/50 transition-colors duration-300 hover:scale-105"
                      >
                        <TreePine className="h-6 w-6 mr-3" />
                        Explore Biomes
                      </Button>
                      <Button 
                        size="lg" 
                        variant="outline"
                        onClick={() => setActiveSection('vision')}
                        className="border-2 border-emerald-400/50 text-emerald-200 hover:bg-emerald-500/20 font-black px-8 py-6 text-lg backdrop-blur-xl"
                      >
                        <TrendingUp className="h-6 w-6 mr-3" />
                        $6M Vision
                      </Button>
                    </motion.div>

                    <motion.div
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{ duration: 0.8, delay: 0.6 }}
                      className="flex flex-wrap gap-8 justify-center"
                    >
                      {[
                        { label: 'Cloud Weather', sublabel: 'Real Fog Cycles', icon: Cloud },
                        { label: 'Solar Bots', sublabel: 'Robotic Wildlife', icon: Bug },
                        { label: 'FloraAI', sublabel: 'Plant Health AI', icon: Brain },
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
            </motion.div>
          </AnimatePresence>
        )}

        {/* Products Section */}
        {activeSection === 'products' && (
          <AnimatePresence mode="wait">
            <motion.div
              key="products"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="p-6 md:p-12 max-w-7xl mx-auto"
            >
              <div className="text-center mb-12">
                <h2 className="text-5xl font-black mb-4 bg-gradient-to-r from-emerald-400 via-green-400 to-cyan-400 bg-clip-text text-transparent">
                  Choose Your Ecosystem
                </h2>
                <p className="text-xl text-emerald-200/80 max-w-3xl mx-auto">
                  From personal luxury to enterprise installations
                </p>
              </div>

              <div className={`grid gap-8 mb-12 ${isMobile ? 'grid-cols-1' : 'grid-cols-3'}`}>
                {products.map((product, index) => (
                  <motion.div
                    key={product.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.1 }}
                  >
                    <Card className={`${
                      product.popular 
                        ? 'glass-medium border-2 border-emerald-400 shadow-2xl shadow-emerald-500/20' 
                        : 'glass-ultra glass-hover-static border-emerald-500/10 shadow-xl shadow-emerald-500/5'
                    } relative h-full`}>
                      {product.popular && (
                        <div className="absolute -top-4 left-1/2 -translate-x-1/2">
                          <Badge className="bg-gradient-to-r from-emerald-500 to-cyan-500 text-white border-none font-black px-4 py-2">
                            MOST POPULAR
                          </Badge>
                        </div>
                      )}
                      
                      <CardContent className="p-8">
                        <div className={`w-20 h-20 mb-6 rounded-2xl bg-gradient-to-br ${product.color} p-5 shadow-lg mx-auto`}>
                          <TreePine className="h-10 w-10 text-white" />
                        </div>
                        
                        <h3 className="text-2xl font-black text-white mb-2 text-center">{product.name}</h3>
                        <p className="text-center text-emerald-300 mb-4">{product.size}</p>
                        
                        <div className="text-center mb-6">
                          <span className="text-5xl font-black text-emerald-400">{product.price}</span>
                        </div>

                        <div className="space-y-3 mb-8">
                          {product.features.map((feature, idx) => (
                            <div key={idx} className="flex items-center gap-2 text-emerald-200">
                              <CheckCircle className="h-5 w-5 text-emerald-400 flex-shrink-0" />
                              <span>{feature}</span>
                            </div>
                          ))}
                        </div>

                        <div className="grid grid-cols-2 gap-3 mb-6 text-sm">
                          <div className="glass-light p-3 rounded-lg">
                            <div className="text-emerald-300/70">Bots</div>
                            <div className="text-white font-black">{product.specs.bots}</div>
                          </div>
                          <div className="glass-light p-3 rounded-lg">
                            <div className="text-emerald-300/70">AI Level</div>
                            <div className="text-white font-black text-xs">{product.specs.ai}</div>
                          </div>
                        </div>

                        <Button 
                          className={`w-full font-black ${
                            product.popular
                              ? 'bg-gradient-to-r from-emerald-600 to-cyan-600 hover:from-emerald-500 hover:to-cyan-500'
                              : 'bg-gradient-to-r from-gray-700 to-gray-800 hover:from-gray-600 hover:to-gray-700'
                          }`}
                          size="lg"
                        >
                          {product.id === 'enterprise' ? 'Get Quote' : 'Purchase Now'}
                        </Button>
                      </CardContent>
                    </Card>
                  </motion.div>
                ))}
              </div>

              {/* Robotic Wildlife Details */}
              <Card className="glass-light glass-hover-static border-emerald-500/10 shadow-xl shadow-emerald-500/5">
                <CardHeader>
                  <CardTitle className="flex items-center gap-3 text-white text-2xl">
                    <Bug className="h-7 w-7 text-emerald-400" />
                    Robotic Wildlife Collection
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="grid md:grid-cols-2 gap-6">
                    {roboticCreatures.map((creature, idx) => (
                      <Card key={idx} className="glass-ultra glass-hover-static border-emerald-500/10">
                        <CardContent className="p-6">
                          <h3 className="text-xl font-black text-white mb-2">{creature.name}</h3>
                          <p className="text-sm text-emerald-200/70 mb-3">{creature.behavior}</p>
                          <Badge className="bg-emerald-500/20 text-emerald-400 border-emerald-500/40">
                            {creature.energy}
                          </Badge>
                        </CardContent>
                      </Card>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          </AnimatePresence>
        )}

        {/* Ecosystem Control Section */}
        {activeSection === 'ecosystem' && (
          <AnimatePresence mode="wait">
            <motion.div
              key="ecosystem"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="p-6 md:p-12 max-w-7xl mx-auto"
            >
              <div className="text-center mb-12">
                <h2 className="text-5xl font-black mb-4 bg-gradient-to-r from-emerald-400 via-green-400 to-cyan-400 bg-clip-text text-transparent">
                  Live Ecosystem Monitor
                </h2>
                <p className="text-xl text-emerald-200/80 max-w-3xl mx-auto">
                  Real-time control of your self-sustaining biome
                </p>
              </div>

              {/* Live View */}
              <Card className="glass-light border-emerald-500/10 mb-8 overflow-hidden">
                <div className="aspect-video bg-gradient-to-br from-emerald-900/50 via-green-900/50 to-cyan-900/50 relative">
                  <ImageWithFallback
                    src="https://images.unsplash.com/photo-1624162872504-e57ceca8874f?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxib25zYWklMjB0cmVlJTIwbWluaWF0dXJlfGVufDF8fHx8MTc2NDI4MTYzMnww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral"
                    alt="Bonsai Ecosystem"
                    className="absolute inset-0 w-full h-full object-cover opacity-60"
                  />
                  
                  {/* Live Overlay */}
                  <div className="absolute top-4 left-4 right-4 flex items-center justify-between">
                    <Badge className="bg-emerald-500 text-white border-none font-black px-4 py-2 animate-pulse">
                      <Activity className="h-3 w-3 mr-2" />
                      LIVE ECOSYSTEM
                    </Badge>
                    <div className="flex items-center gap-2 glass-medium rounded-full px-4 py-2">
                      <Heart className="h-4 w-4 text-emerald-400" />
                      <span className="text-white font-black">Healthy</span>
                    </div>
                  </div>

                  {/* Center Stats */}
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className="grid grid-cols-3 gap-4">
                      {[
                        { icon: Droplets, label: 'Humidity', value: `${humidity.toFixed(1)}%`, color: 'text-cyan-400' },
                        { icon: Thermometer, label: 'Temperature', value: `${temperature.toFixed(1)}°F`, color: 'text-orange-400' },
                        { icon: Cloud, label: 'Fog Level', value: 'Medium', color: 'text-blue-400' },
                      ].map((stat, idx) => (
                        <div key={idx} className="text-center glass-light rounded-2xl p-6 border border-emerald-500/10">
                          <stat.icon className={`h-8 w-8 mx-auto mb-2 ${stat.color}`} />
                          <div className="text-sm text-emerald-300/80 mb-1">{stat.label}</div>
                          <div className="text-2xl font-black text-white">{stat.value}</div>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Bottom Controls */}
                  <div className="absolute bottom-4 left-4 right-4 flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <Button
                        size="sm"
                        className="glass-medium hover:glass-strong"
                      >
                        <Play className="h-4 w-4" />
                      </Button>
                      <Button
                        size="sm"
                        className="glass-medium hover:glass-strong"
                      >
                        <Settings className="h-4 w-4" />
                      </Button>
                    </div>
                    <Badge className="glass-medium text-emerald-300 border-emerald-500/10">
                      Uptime: 47 days
                    </Badge>
                  </div>
                </div>
              </Card>

              {/* Control Panels */}
              <div className={`grid gap-6 ${isMobile ? 'grid-cols-1' : 'grid-cols-2'}`}>
                <Card className="glass-light glass-hover-static border-emerald-500/10">
                  <CardHeader>
                    <CardTitle className="flex items-center gap-3 text-white">
                      <Cloud className="h-6 w-6 text-cyan-400" />
                      Weather Control
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-6">
                    <div>
                      <label className="block text-emerald-200 font-bold mb-3">Mist Intensity</label>
                      <div className="flex items-center gap-4">
                        <Droplets className="h-4 w-4 text-cyan-400" />
                        <div className="flex-1 h-2 bg-gray-700 rounded-full overflow-hidden">
                          <div className="h-full bg-gradient-to-r from-cyan-500 to-blue-500" style={{ width: '65%' }} />
                        </div>
                        <span className="text-white font-black">65%</span>
                      </div>
                    </div>
                    <div>
                      <label className="block text-emerald-200 font-bold mb-3">Lighting Mode</label>
                      <div className="grid grid-cols-3 gap-2">
                        {['Sunrise', 'Day', 'Storm'].map((mode) => (
                          <Button
                            key={mode}
                            size="sm"
                            className={mode === 'Day' ? 'bg-gradient-to-r from-emerald-600 to-cyan-600' : 'bg-gray-700'}
                          >
                            {mode}
                          </Button>
                        ))}
                      </div>
                    </div>
                  </CardContent>
                </Card>

                <Card className="glass-light glass-hover border-emerald-500/10">
                  <CardHeader>
                    <CardTitle className="flex items-center gap-3 text-white">
                      <Bug className="h-6 w-6 text-emerald-400" />
                      Robotic Activity
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    {[
                      { name: 'Butterflies', status: 'Active', battery: 87 },
                      { name: 'Fireflies', status: 'Charging', battery: 34 },
                      { name: 'Beetles', status: 'Active', battery: 92 },
                    ].map((bot, idx) => (
                      <div key={idx} className="flex items-center justify-between p-3 glass-ultra rounded-lg">
                        <div>
                          <div className="text-white font-black">{bot.name}</div>
                          <div className="text-sm text-emerald-300/70">{bot.status}</div>
                        </div>
                        <div className="text-right">
                          <div className="text-emerald-400 font-black">{bot.battery}%</div>
                          <div className="text-xs text-emerald-300/70">Battery</div>
                        </div>
                      </div>
                    ))}
                  </CardContent>
                </Card>
              </div>
            </motion.div>
          </AnimatePresence>
        )}

        {/* FloraAI Section */}
        {activeSection === 'floraaai' && (
          <AnimatePresence mode="wait">
            <motion.div
              key="floraaai"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="p-6 md:p-12 max-w-7xl mx-auto"
            >
              <div className="text-center mb-12">
                <h2 className="text-5xl font-black mb-4 bg-gradient-to-r from-purple-400 via-pink-400 to-rose-400 bg-clip-text text-transparent">
                  FloraAI™ Technology
                </h2>
                <p className="text-xl text-emerald-200/80 max-w-3xl mx-auto">
                  AI-powered plant health monitoring and ecosystem optimization
                </p>
              </div>

              <Card className="glass-light border-2 border-purple-500/20 mb-12">
                <CardContent className="p-12 text-center">
                  <Brain className="h-24 w-24 mx-auto mb-6 text-purple-400" />
                  <h3 className="text-3xl font-black text-white mb-4">Patent-Pending AI Algorithms</h3>
                  <p className="text-emerald-200/80 max-w-2xl mx-auto mb-8">
                    FloraAI monitors root growth, humidity levels, and plant health 24/7. Automated vents prevent mold. Smart alerts via app for rare interventions. Machine learning adapts to your specific bonsai species.
                  </p>
                  <div className="grid md:grid-cols-3 gap-6">
                    {[
                      { metric: 'Plant Health', score: '97%', trend: 'Excellent' },
                      { metric: 'Ecosystem Balance', score: '94%', trend: 'Stable' },
                      { metric: 'AI Confidence', score: '99%', trend: 'High' },
                    ].map((stat, idx) => (
                      <div key={idx} className="glass-ultra p-6 rounded-xl border border-purple-500/10">
                        <div className="text-purple-300/80 mb-2">{stat.metric}</div>
                        <div className="text-4xl font-black text-white mb-1">{stat.score}</div>
                        <div className="text-sm text-purple-300">{stat.trend}</div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>

              <div className={`grid gap-8 ${isMobile ? 'grid-cols-1' : 'grid-cols-2'}`}>
                <Card className="glass-light glass-hover-static border-emerald-500/10">
                  <CardHeader>
                    <CardTitle className="flex items-center gap-3 text-white">
                      <Eye className="h-6 w-6 text-emerald-400" />
                      Computer Vision Analysis
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <ul className="space-y-3">
                      {[
                        'Leaf color health detection',
                        'Root growth monitoring',
                        'Pest/mold early warning',
                        'Growth rate tracking',
                      ].map((feature, idx) => (
                        <li key={idx} className="flex items-center gap-2 text-emerald-200">
                          <CheckCircle className="h-5 w-5 text-emerald-400" />
                          {feature}
                        </li>
                      ))}
                    </ul>
                  </CardContent>
                </Card>

                <Card className="glass-light glass-hover border-emerald-500/10">
                  <CardHeader>
                    <CardTitle className="flex items-center gap-3 text-white">
                      <Zap className="h-6 w-6 text-yellow-400" />
                      Predictive Maintenance
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <ul className="space-y-3">
                      {[
                        'Optimal pruning schedules',
                        'Water cycle optimization',
                        'Light intensity adjustment',
                        'Robot charging predictions',
                      ].map((feature, idx) => (
                        <li key={idx} className="flex items-center gap-2 text-emerald-200">
                          <CheckCircle className="h-5 w-5 text-yellow-400" />
                          {feature}
                        </li>
                      ))}
                    </ul>
                  </CardContent>
                </Card>
              </div>
            </motion.div>
          </AnimatePresence>
        )}

        {/* $6M Vision Section */}
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
                  $6 MILLION VISION
                </h2>
                <p className="text-2xl text-emerald-200/80 max-w-3xl mx-auto">
                  Year 5 Projection — Leading the Biophilic Tech Revolution
                </p>
              </div>

              {/* Financial Hero */}
              <Card className="glass-light border-2 border-green-500/20 mb-12 overflow-hidden">
                <div className="relative h-64">
                  <ImageWithFallback
                    src="https://images.unsplash.com/photo-1683248888943-952fc0a6d609?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxzdXN0YWluYWJsZSUyMGdyZWVuJTIwZWNvc3lzdGVtfGVufDF8fHx8MTc2NDI4MTYzM3ww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral"
                    alt="Sustainable Vision"
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
                        $6,050,000
                      </motion.div>
                      <div className="text-2xl text-green-200 font-bold">Year 5 Total Revenue</div>
                      <div className="text-emerald-300 mt-2">Product Sales + Licensing</div>
                    </div>
                  </div>
                </div>
              </Card>

              {/* 5-Year Growth */}
              <Card className="glass-light border-emerald-500/10 mb-12">
                <CardHeader>
                  <CardTitle className="flex items-center gap-3 text-white text-2xl">
                    <TrendingUp className="h-7 w-7 text-green-400" />
                    5-Year Revenue Trajectory
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {[
                      { year: 1, product: '$186k', licensing: '$25k', total: '$211k', highlight: 'Pilot Launch' },
                      { year: 2, product: '$360k', licensing: '$130k', total: '$490k', highlight: 'Scale Up' },
                      { year: 3, product: '$800k', licensing: '$480k', total: '$1.28M', highlight: 'Licensing Focus' },
                      { year: 4, product: '$1.5M', licensing: '$1.35M', total: '$2.85M', highlight: 'Enterprise' },
                      { year: 5, product: '$3M', licensing: '$3.05M', total: '$6.05M', highlight: 'Market Leader' },
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
                              <div className="text-sm text-emerald-300/80 mb-1">Products</div>
                              <div className="text-xl font-black text-white">{milestone.product}</div>
                            </div>
                            <div>
                              <div className="text-sm text-emerald-300/80 mb-1">Licensing</div>
                              <div className="text-xl font-black text-cyan-400">{milestone.licensing}</div>
                            </div>
                            <div>
                              <div className="text-sm text-emerald-300/80 mb-1">Total</div>
                              <div className="text-xl font-black text-emerald-400">{milestone.total}</div>
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

              {/* Revenue Breakdown */}
              <div className={`grid gap-8 mb-12 ${isMobile ? 'grid-cols-1' : 'grid-cols-2'}`}>
                <Card className="glass-light border-2 border-emerald-500/20">
                  <CardHeader>
                    <CardTitle className="flex items-center gap-3 text-white text-xl">
                      <Target className="h-6 w-6 text-emerald-400" />
                      Year 5 Revenue Mix
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      {[
                        { stream: 'Product Sales', revenue: '$3M', percentage: '50%' },
                        { stream: 'FloraAI Licensing', revenue: '$2.8M', percentage: '46%' },
                        { stream: 'Robot Licensing', revenue: '$250k', percentage: '4%' },
                      ].map((stream, idx) => (
                        <div key={idx}>
                          <div className="flex justify-between items-center mb-2">
                            <span className="text-emerald-200 font-bold">{stream.stream}</span>
                            <span className="text-xl font-black text-white">{stream.revenue}</span>
                          </div>
                          <div className="h-2 glass-ultra rounded-full overflow-hidden">
                            <motion.div
                              initial={{ width: 0 }}
                              whileInView={{ width: stream.percentage }}
                              viewport={{ once: true }}
                              transition={{ duration: 1, delay: idx * 0.2 }}
                              className="h-full bg-gradient-to-r from-emerald-500 to-green-500"
                            />
                          </div>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>

                <Card className="glass-light border-2 border-cyan-500/20">
                  <CardHeader>
                    <CardTitle className="flex items-center gap-3 text-white text-xl">
                      <Globe className="h-6 w-6 text-cyan-400" />
                      Market Position
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="text-5xl font-black text-white mb-2">10%</div>
                    <div className="text-cyan-200/80 mb-6">Luxury Biophilic Market Share</div>
                    <div className="space-y-3">
                      {[
                        { market: 'Terrarium Industry', size: '$2.1B' },
                        { market: 'Smart Home Tech', size: '$150B' },
                        { market: 'Wellness Market', size: '$1.5T' },
                      ].map((market, idx) => (
                        <div key={idx} className="flex justify-between items-center p-3 glass-ultra rounded-lg">
                          <span className="text-cyan-200">{market.market}</span>
                          <span className="text-xl font-black text-cyan-400">{market.size}</span>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </div>

              {/* Key Metrics */}
              <Card className="glass-light border-emerald-500/10">
                <CardHeader>
                  <CardTitle className="flex items-center gap-3 text-white text-2xl">
                    <BarChart3 className="h-7 w-7 text-emerald-400" />
                    Year 5 Key Metrics
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
                    {[
                      { label: 'Total Revenue', value: '$6.05M', icon: DollarSign, color: 'text-green-400' },
                      { label: 'Net Profit', value: '$2M', icon: TrendingUp, color: 'text-emerald-400' },
                      { label: 'Units Deployed', value: '500', icon: TreePine, color: 'text-green-400' },
                      { label: 'Team Size', value: '50+', icon: Users, color: 'text-cyan-400' },
                      { label: 'Licensing Partners', value: '8', icon: Globe, color: 'text-blue-400' },
                      { label: 'CO₂ Offset', value: '2.5k kg', icon: Leaf, color: 'text-green-400' },
                      { label: 'Countries', value: '12', icon: Globe, color: 'text-purple-400' },
                      { label: 'Patent Portfolio', value: '15', icon: Award, color: 'text-yellow-400' },
                    ].map((metric, idx) => (
                      <motion.div
                        key={idx}
                        initial={{ opacity: 0, scale: 0.9 }}
                        whileInView={{ opacity: 1, scale: 1 }}
                        viewport={{ once: true }}
                        transition={{ delay: idx * 0.05 }}
                        className="text-center p-6 bg-emerald-500/10 rounded-xl border border-emerald-500/10"
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
