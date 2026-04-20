import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "motion/react";
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";
import { Button } from "../ui/button";
import { Badge } from "../ui/badge";
import { ImageWithFallback } from "../figma/ImageWithFallback";
import { LiveTicker } from "./shared/LiveTicker";
import { 
  Scan,
  ScanLine,
  Printer,
  Headphones,
  Mic,
  Eye,
  Volume2,
  Heart,
  Smartphone,
  Zap,
  Shield,
  TrendingUp,
  Globe,
  Users,
  Award,
  BarChart3,
  Target,
  CheckCircle,
  Camera,
  Radio,
  Circle,
  Home,
  Pill,
  Shirt,
  UtensilsCrossed,
  Book,
  Coffee,
  Sparkles,
  Play,
  AlertCircle,
  DollarSign
} from "lucide-react";

interface HearbAssistPrototypeProps {
  deviceView: 'desktop' | 'tablet' | 'mobile';
}

export function HearbAssistPrototype({ deviceView }: HearbAssistPrototypeProps) {
  const [activeSection, setActiveSection] = useState<'hero' | 'system' | 'workflow' | 'usecases' | 'vision'>('hero');
  const [isScanning, setIsScanning] = useState(false);
  const [isRecording, setIsRecording] = useState(false);
  const [isPrinting, setIsPrinting] = useState(false);
  const [totalUsers, setTotalUsers] = useState(12847);
  const [labelsCreated, setLabelsCreated] = useState(287934);

  const isMobile = deviceView === 'mobile';
  const isTablet = deviceView === 'tablet';

  // Simulate real-time data
  useEffect(() => {
    const interval = setInterval(() => {
      setTotalUsers(prev => prev + (Math.random() > 0.8 ? 1 : 0));
      setLabelsCreated(prev => prev + Math.floor(Math.random() * 5));
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  const systemComponents = [
    {
      id: 'ring',
      name: 'HearB Ring Scanner',
      icon: ScanLine,
      size: '8mm thick',
      features: ['Laser + Camera Hybrid', 'Haptic Feedback', '12-hour Battery', 'Wireless Charging'],
      color: 'from-cyan-500 to-blue-500',
      specs: 'Scans barcodes, QR codes, and text'
    },
    {
      id: 'earbud',
      name: 'HearB Earbud',
      icon: Headphones,
      size: 'AirPods Pro size',
      features: ['Bone Conduction Audio', 'Noise Cancellation', '8-hour Battery', '24hr Charging Case'],
      color: 'from-purple-500 to-pink-500',
      specs: 'Real-time audio feedback'
    },
    {
      id: 'printer',
      name: 'SpeechCode Printer',
      icon: Printer,
      size: '10cm x 3cm',
      features: ['Voice Activation', 'Thermal Printing', '50 Labels/Charge', 'Pocket-Sized'],
      color: 'from-indigo-500 to-purple-500',
      specs: 'Creates custom voice-linked labels'
    },
  ];

  const workflowSteps = [
    {
      step: 1,
      title: 'Scan Blank Code',
      description: 'Scan the "blank" barcode on your SpeechCode Printer with your HearB Ring.',
      icon: Scan,
      color: 'from-cyan-500 to-blue-500'
    },
    {
      step: 2,
      title: 'Voice Prompt',
      description: 'System asks: "Name this item." Get ready to describe your object.',
      icon: Mic,
      color: 'from-blue-500 to-purple-500'
    },
    {
      step: 3,
      title: 'Speak Label',
      description: 'Say the item name: "Mom\'s sugar cookies, baked Nov 2024"',
      icon: Volume2,
      color: 'from-purple-500 to-pink-500'
    },
    {
      step: 4,
      title: 'Generate Code',
      description: 'Printer creates unique QR code linked to your voice recording.',
      icon: Printer,
      color: 'from-pink-500 to-rose-500'
    },
    {
      step: 5,
      title: 'Apply Label',
      description: 'Stick the printed label on your jar, box, or container.',
      icon: CheckCircle,
      color: 'from-rose-500 to-orange-500'
    },
    {
      step: 6,
      title: 'Hear Your Voice',
      description: 'Next time you scan, your HearB Earbud plays: "Mom\'s sugar cookies, baked Nov 2024"',
      icon: Headphones,
      color: 'from-orange-500 to-amber-500'
    },
  ];

  const useCases = [
    {
      category: 'Kitchen & Pantry',
      icon: UtensilsCrossed,
      color: 'from-orange-500 to-red-500',
      examples: [
        { item: 'Homemade jam', label: 'Strawberry jam, made June 2024' },
        { item: 'Spice jars', label: 'Cinnamon - use sparingly' },
        { item: 'Leftovers', label: 'Chicken soup, expires Nov 30' },
      ]
    },
    {
      category: 'Medication',
      icon: Pill,
      color: 'from-blue-500 to-cyan-500',
      examples: [
        { item: 'Prescriptions', label: 'Heart medication, take 2 at 8 AM' },
        { item: 'Vitamins', label: 'Vitamin D, 1000 IU daily' },
        { item: 'First aid', label: 'Pain reliever, 2 tablets max' },
      ]
    },
    {
      category: 'Wardrobe',
      icon: Shirt,
      color: 'from-purple-500 to-pink-500',
      examples: [
        { item: 'Clothing', label: 'Blue sweater for interviews' },
        { item: 'Shoes', label: 'Black dress shoes, size 10' },
        { item: 'Accessories', label: 'Wedding tie - special occasions' },
      ]
    },
    {
      category: 'Personal Items',
      icon: Home,
      color: 'from-green-500 to-emerald-500',
      examples: [
        { item: 'Books', label: 'Favorite novel - rereading' },
        { item: 'Photos', label: 'Wedding day with Sarah' },
        { item: 'Collections', label: 'Grandpa\'s watch - fragile' },
      ]
    },
  ];

  const navigationTabs = [
    { id: 'hero', label: 'Home', icon: Eye },
    { id: 'system', label: 'System', icon: Zap },
    { id: 'workflow', label: 'How It Works', icon: Radio },
    { id: 'usecases', label: 'Use Cases', icon: Heart },
    { id: 'vision', label: '$41.8M Vision', icon: TrendingUp },
  ];

  return (
    <div className="h-full text-white overflow-auto relative">
      <div className="relative z-10">
        {/* Header */}
        <div className="glass-strong border-b border-white/5 sticky top-0 z-50">
          <div className="flex items-center justify-between p-4">
            <div className="flex items-center gap-4">
              <div className="relative">
                <div className="w-14 h-14 bg-gradient-to-br from-cyan-500 via-blue-500 to-purple-500 rounded-2xl p-3 shadow-xl">
                  <Eye className="h-8 w-8 text-white" />
                </div>
                <motion.div 
                  className="absolute inset-0 bg-cyan-500 rounded-2xl blur-xl opacity-50"
                  animate={{ scale: [1, 1.2, 1], opacity: [0.3, 0.5, 0.3] }}
                  transition={{ duration: 2, repeat: Infinity }}
                />
              </div>
              <div>
                <h1 className="text-2xl font-black bg-gradient-to-r from-cyan-400 via-blue-400 to-purple-400 bg-clip-text text-transparent tracking-tight">
                  HEARB ASSIST 360
                </h1>
                <p className="text-sm text-cyan-300 font-bold tracking-wide">YOUR VOICE BECOMES THE LABEL</p>
              </div>
            </div>
            
            {!isMobile && (
              <div className="flex items-center gap-6">
                <div className="text-right">
                  <div className="text-xs text-cyan-300/80 font-bold uppercase tracking-wide">Active Users</div>
                  <div className="text-xl font-black text-cyan-400">{totalUsers.toLocaleString()}</div>
                </div>
                <div className="text-right">
                  <div className="text-xs text-purple-300/80 font-bold uppercase tracking-wide">Labels Created</div>
                  <div className="text-xl font-black text-purple-400">{labelsCreated.toLocaleString()}</div>
                </div>
                <Badge className="bg-gradient-to-r from-cyan-500/20 to-purple-500/20 text-cyan-300 border border-cyan-500/40 px-4 py-2 font-black uppercase tracking-wide">
                  <Shield className="h-3 w-3 mr-2" />
                  FDA Compliant
                </Badge>
              </div>
            )}
          </div>

          {/* Navigation */}
          <div className="px-4 pb-4">
            <div className="flex gap-1 glass-ultra p-1 rounded-xl border border-cyan-500/10 overflow-x-auto">
              {navigationTabs.map((tab) => (
                <Button
                  key={tab.id}
                  variant={activeSection === tab.id ? 'default' : 'ghost'}
                  size="sm"
                  onClick={() => setActiveSection(tab.id as any)}
                  className={`flex-shrink-0 ${
                    activeSection === tab.id 
                      ? 'bg-gradient-to-r from-cyan-600 via-blue-600 to-purple-600 text-white shadow-lg shadow-cyan-500/50 font-black' 
                      : 'text-cyan-300 hover:bg-cyan-500/20 hover:text-white'
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
            caption="ASSIST LIVE"
            pulseColor="bg-violet-400"
            metrics={[
              { label: 'Users Assisted', base: 84250, drift: 1, counter: true, accent: 'text-violet-300' },
              { label: 'Objects Recognized / hr', base: 18420, drift: 60, min: 14000, max: 24000, accent: 'text-sky-300' },
              { label: 'Navigation Fidelity', base: 98.7, drift: 0.2, min: 96, max: 100, suffix: '%', decimals: 2, accent: 'text-emerald-300' },
              { label: 'Response Latency', base: 84, drift: 6, min: 60, max: 120, suffix: ' ms', accent: 'text-amber-300' },
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
                    src="https://images.unsplash.com/photo-1634947096822-3790a926271f?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxhY2Nlc3NpYmlsaXR5JTIwdGVjaG5vbG9neXxlbnwxfHx8fDE3NjQyNzk1Nzl8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral"
                    alt="Assistive Technology"
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-r from-cyan-900/95 via-blue-900/90 to-purple-900/95" />
                  
                  {/* Floating Elements */}
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
                        duration: Math.random() * 10 + 10,
                        repeat: Infinity,
                        delay: Math.random() * 5,
                      }}
                    >
                      {i % 3 === 0 ? (
                        <Eye className="h-5 w-5 text-cyan-400/60" />
                      ) : i % 3 === 1 ? (
                        <Headphones className="h-5 w-5 text-blue-400/60" />
                      ) : (
                        <Sparkles className="h-5 w-5 text-purple-400/60" />
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
                      <h1 className="text-6xl md:text-7xl font-black mb-6 bg-gradient-to-r from-cyan-300 via-blue-300 to-purple-300 bg-clip-text text-transparent leading-tight">
                        THE UNLABELED<br />WORLD, SOLVED
                      </h1>
                    </motion.div>
                    
                    <motion.p
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.8, delay: 0.2 }}
                      className="text-2xl text-cyan-200 mb-8 font-medium leading-relaxed"
                    >
                      A wearable ecosystem that <span className="text-white font-bold">empowers blind individuals</span> to identify,<br className="hidden md:block" />
                      label, and interact with any object using <span className="text-white font-bold">their own voice.</span>
                    </motion.p>

                    <motion.div
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.8, delay: 0.4 }}
                      className="flex flex-wrap gap-4 justify-center mb-8"
                    >
                      <Button 
                        size="lg" 
                        onClick={() => setActiveSection('system')}
                        className="bg-gradient-to-r from-cyan-600 via-blue-600 to-purple-600 hover:from-cyan-500 hover:via-blue-500 hover:to-purple-500 text-white font-black px-8 py-6 text-lg shadow-2xl shadow-cyan-500/50 transition-colors duration-300 hover:scale-105"
                      >
                        <Eye className="h-6 w-6 mr-3" />
                        Explore System
                      </Button>
                      <Button 
                        size="lg" 
                        variant="outline"
                        onClick={() => setActiveSection('vision')}
                        className="border-2 border-cyan-400/50 text-cyan-200 hover:bg-cyan-500/20 font-black px-8 py-6 text-lg backdrop-blur-xl"
                      >
                        <TrendingUp className="h-6 w-6 mr-3" />
                        $41.8M Vision
                      </Button>
                    </motion.div>

                    <motion.div
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{ duration: 0.8, delay: 0.6 }}
                      className="flex flex-wrap gap-8 justify-center"
                    >
                      {[
                        { label: '$699', sublabel: 'Complete System', icon: Zap },
                        { label: '285M', sublabel: 'Potential Users', icon: Users },
                        { label: '80% Cheaper', sublabel: 'Than OrCam', icon: TrendingUp },
                      ].map((stat, idx) => (
                        <div key={idx} className="text-center">
                          <div className="flex items-center justify-center gap-2 mb-2">
                            <stat.icon className="h-5 w-5 text-cyan-400" />
                            <div className="text-3xl font-black text-white">{stat.label}</div>
                          </div>
                          <div className="text-sm text-cyan-300 font-medium">{stat.sublabel}</div>
                        </div>
                      ))}
                    </motion.div>
                  </div>
                </div>
              </div>

              {/* The Problem */}
              <div className="p-6 md:p-12 max-w-7xl mx-auto">
                <div className="text-center mb-12">
                  <h2 className="text-4xl md:text-5xl font-black mb-4 bg-gradient-to-r from-cyan-400 to-purple-400 bg-clip-text text-transparent">
                    The Invisible Crisis
                  </h2>
                  <p className="text-xl text-cyan-200/80 max-w-3xl mx-auto">
                    90% of everyday objects lack identifiable markers — forcing blind individuals into constant dependency
                  </p>
                </div>

                <Card className="bg-gradient-to-br from-red-900/30 to-orange-900/30 border-2 border-red-500/50 mb-12">
                  <CardContent className="p-12 text-center">
                    <AlertCircle className="h-24 w-24 mx-auto mb-6 text-red-400" />
                    <h3 className="text-3xl font-black text-white mb-4">The Unlabeled World Problem</h3>
                    <p className="text-cyan-200/80 max-w-2xl mx-auto mb-8 text-lg">
                      Homemade food containers, wardrobe items, medications, family photos — none have barcodes or braille. 
                      Existing solutions like OrCam only recognize pre-labeled or common items.
                    </p>
                    <div className="grid md:grid-cols-3 gap-6">
                      {[
                        { stat: '90%', label: 'Objects Unlabeled' },
                        { stat: '68%', label: 'Report Daily Anxiety' },
                        { stat: '$4,500', label: 'OrCam Cost' },
                      ].map((item, idx) => (
                        <div key={idx} className="p-6 bg-black/40 rounded-xl">
                          <div className="text-4xl font-black text-red-400 mb-2">{item.stat}</div>
                          <div className="text-cyan-300">{item.label}</div>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>

                {/* The Solution */}
                <div className="text-center mb-12">
                  <h2 className="text-4xl font-black mb-4 text-white">The HearB Revolution</h2>
                  <p className="text-xl text-cyan-200/80 max-w-3xl mx-auto">
                    A closed-loop system where YOUR VOICE becomes the label
                  </p>
                </div>

                <div className={`grid gap-8 ${isMobile ? 'grid-cols-1' : isTablet ? 'grid-cols-2' : 'grid-cols-3'}`}>
                  {systemComponents.map((component, index) => (
                    <motion.div
                      key={component.id}
                      initial={{ opacity: 0, y: 30 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true }}
                      transition={{ delay: index * 0.1 }}
                      whileHover={{ y: -8, scale: 1.02 }}
                    >
                      <Card className="bg-gradient-to-br from-black/60 to-black/40 border-cyan-500/20 hover:border-cyan-400/50 transition-colors duration-300 hover:shadow-2xl hover:shadow-cyan-500/20 h-full">
                        <CardContent className="p-8">
                          <div className={`w-20 h-20 mb-6 rounded-2xl bg-gradient-to-br ${component.color} p-5 shadow-lg flex items-center justify-center`}>
                            <component.icon className="h-10 w-10 text-white" />
                          </div>
                          <h3 className="text-2xl font-black mb-2 text-white">{component.name}</h3>
                          <Badge className="bg-cyan-500/20 text-cyan-400 border-cyan-500/40 mb-4">
                            {component.size}
                          </Badge>
                          <p className="text-cyan-200/70 mb-4">{component.specs}</p>
                          <div className="space-y-2">
                            {component.features.map((feature, idx) => (
                              <div key={idx} className="flex items-center gap-2 text-sm text-cyan-300">
                                <CheckCircle className="h-4 w-4 text-cyan-400 flex-shrink-0" />
                                <span>{feature}</span>
                              </div>
                            ))}
                          </div>
                        </CardContent>
                      </Card>
                    </motion.div>
                  ))}
                </div>
              </div>
            </motion.div>
          </AnimatePresence>
        )}

        {/* System Section */}
        {activeSection === 'system' && (
          <AnimatePresence mode="wait">
            <motion.div
              key="system"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="p-6 md:p-12 max-w-7xl mx-auto"
            >
              <div className="text-center mb-12">
                <h2 className="text-5xl font-black mb-4 bg-gradient-to-r from-cyan-400 via-blue-400 to-purple-400 bg-clip-text text-transparent">
                  Complete Wearable Ecosystem
                </h2>
                <p className="text-xl text-cyan-200/80 max-w-3xl mx-auto">
                  Discreet, affordable, and fully user-controlled
                </p>
              </div>

              {/* Ring Scanner Detail */}
              <Card className="bg-gradient-to-br from-cyan-900/30 to-blue-900/30 border-2 border-cyan-500/50 mb-12">
                <div className="grid md:grid-cols-2 gap-8 p-8">
                  <div>
                    <div className="aspect-square bg-gradient-to-br from-cyan-500/20 to-blue-500/20 rounded-2xl flex items-center justify-center relative overflow-hidden mb-6">
                      <ImageWithFallback
                        src="https://images.unsplash.com/photo-1760088348194-a5ac70a8aa9f?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxzbWFydCUyMHJpbmclMjB3ZWFyYWJsZXxlbnwxfHx8fDE3NjQxNzkzMzJ8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral"
                        alt="Smart Ring"
                        className="absolute inset-0 w-full h-full object-cover opacity-40"
                      />
                      <div className="relative z-10">
                        <ScanLine className="h-32 w-32 text-cyan-400" />
                      </div>
                    </div>
                  </div>
                  <div className="flex flex-col justify-center">
                    <h3 className="text-3xl font-black text-white mb-4">HearB Ring Scanner</h3>
                    <p className="text-cyan-200/80 mb-6 text-lg">
                      Worn on your left hand, this 8mm-thick ring contains a hybrid laser and camera scanner that reads barcodes, 
                      QR codes, and text. Haptic feedback confirms successful scans.
                    </p>
                    <div className="grid grid-cols-2 gap-4">
                      {[
                        { label: 'Thickness', value: '8mm' },
                        { label: 'Battery', value: '12 hours' },
                        { label: 'Scanning', value: 'Laser + Cam' },
                        { label: 'Feedback', value: 'Haptic' },
                      ].map((spec, idx) => (
                        <div key={idx} className="p-4 bg-black/40 rounded-lg">
                          <div className="text-sm text-cyan-300/70 mb-1">{spec.label}</div>
                          <div className="text-xl font-black text-white">{spec.value}</div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </Card>

              {/* Earbud Detail */}
              <Card className="bg-gradient-to-br from-purple-900/30 to-pink-900/30 border-2 border-purple-500/50 mb-12">
                <div className="grid md:grid-cols-2 gap-8 p-8">
                  <div className="flex flex-col justify-center order-2 md:order-1">
                    <h3 className="text-3xl font-black text-white mb-4">HearB Earbud</h3>
                    <p className="text-cyan-200/80 mb-6 text-lg">
                      AirPods Pro-sized earpiece with bone conduction audio technology. Leaves your ear canal open for ambient sounds 
                      while delivering crystal-clear voice playback of your custom labels.
                    </p>
                    <div className="grid grid-cols-2 gap-4">
                      {[
                        { label: 'Size', value: '20mm' },
                        { label: 'Battery', value: '8 hours' },
                        { label: 'Audio', value: 'Bone Cond.' },
                        { label: 'Case', value: '+24 hours' },
                      ].map((spec, idx) => (
                        <div key={idx} className="p-4 bg-black/40 rounded-lg">
                          <div className="text-sm text-cyan-300/70 mb-1">{spec.label}</div>
                          <div className="text-xl font-black text-white">{spec.value}</div>
                        </div>
                      ))}
                    </div>
                  </div>
                  <div className="order-1 md:order-2">
                    <div className="aspect-square bg-gradient-to-br from-purple-500/20 to-pink-500/20 rounded-2xl flex items-center justify-center relative overflow-hidden mb-6">
                      <ImageWithFallback
                        src="https://images.unsplash.com/photo-1596088869451-491e167efabb?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxoZWFyaW5nJTIwYWlkJTIwZGV2aWNlfGVufDF8fHx8MTc2NDI0MzE2OHww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral"
                        alt="Earbud"
                        className="absolute inset-0 w-full h-full object-cover opacity-40"
                      />
                      <div className="relative z-10">
                        <Headphones className="h-32 w-32 text-purple-400" />
                      </div>
                    </div>
                  </div>
                </div>
              </Card>

              {/* Printer Detail */}
              <Card className="bg-gradient-to-br from-indigo-900/30 to-purple-900/30 border-2 border-indigo-500/50">
                <div className="grid md:grid-cols-2 gap-8 p-8">
                  <div>
                    <div className="aspect-square bg-gradient-to-br from-indigo-500/20 to-purple-500/20 rounded-2xl flex items-center justify-center relative overflow-hidden mb-6">
                      <div className="relative z-10">
                        <Printer className="h-32 w-32 text-indigo-400" />
                      </div>
                    </div>
                  </div>
                  <div className="flex flex-col justify-center">
                    <h3 className="text-3xl font-black text-white mb-4">SpeechCode Printer</h3>
                    <p className="text-cyan-200/80 mb-6 text-lg">
                      Pocket-sized thermal printer that generates unique QR codes linked to your voice recordings. 
                      Prints 25mm adhesive labels — 50 per charge. The magic that makes everything labelable.
                    </p>
                    <div className="grid grid-cols-2 gap-4">
                      {[
                        { label: 'Size', value: '10cm x 3cm' },
                        { label: 'Capacity', value: '50 labels' },
                        { label: 'Activation', value: 'Voice' },
                        { label: 'Label Size', value: '25mm' },
                      ].map((spec, idx) => (
                        <div key={idx} className="p-4 bg-black/40 rounded-lg">
                          <div className="text-sm text-cyan-300/70 mb-1">{spec.label}</div>
                          <div className="text-xl font-black text-white">{spec.value}</div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </Card>
            </motion.div>
          </AnimatePresence>
        )}

        {/* Workflow Section */}
        {activeSection === 'workflow' && (
          <AnimatePresence mode="wait">
            <motion.div
              key="workflow"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="p-6 md:p-12 max-w-7xl mx-auto"
            >
              <div className="text-center mb-12">
                <h2 className="text-5xl font-black mb-4 bg-gradient-to-r from-cyan-400 via-blue-400 to-purple-400 bg-clip-text text-transparent">
                  How It Works
                </h2>
                <p className="text-xl text-cyan-200/80 max-w-3xl mx-auto">
                  Six simple steps to label anything in your world
                </p>
              </div>

              {/* Workflow Steps */}
              <div className="space-y-8 mb-12">
                {workflowSteps.map((step, index) => (
                  <motion.div
                    key={step.step}
                    initial={{ opacity: 0, x: -30 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: index * 0.1 }}
                  >
                    <Card className="bg-gradient-to-br from-black/60 to-black/40 border-cyan-500/30 hover:border-cyan-400/50 transition-colors duration-300">
                      <CardContent className="p-8">
                        <div className="grid md:grid-cols-12 gap-6 items-center">
                          <div className="md:col-span-2 flex justify-center">
                            <div className={`w-24 h-24 rounded-full bg-gradient-to-br ${step.color} p-6 flex items-center justify-center shadow-xl`}>
                              <step.icon className="h-12 w-12 text-white" />
                            </div>
                          </div>
                          <div className="md:col-span-1 text-center">
                            <div className="text-6xl font-black text-cyan-400/30">
                              {step.step}
                            </div>
                          </div>
                          <div className="md:col-span-9">
                            <h3 className="text-2xl font-black text-white mb-2">{step.title}</h3>
                            <p className="text-cyan-200/70 text-lg">{step.description}</p>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  </motion.div>
                ))}
              </div>

              {/* Interactive Demo */}
              <Card className="bg-gradient-to-br from-cyan-900/30 to-purple-900/30 border-2 border-cyan-500/50">
                <CardHeader>
                  <CardTitle className="flex items-center gap-3 text-white text-2xl">
                    <Play className="h-7 w-7 text-cyan-400" />
                    Interactive Demo
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="aspect-video bg-gradient-to-br from-cyan-900/50 via-blue-900/50 to-purple-900/50 rounded-2xl flex items-center justify-center relative overflow-hidden mb-6">
                    <div className="text-center">
                      <motion.div
                        animate={{
                          scale: isScanning ? [1, 1.1, 1] : 1,
                          opacity: isScanning ? [1, 0.8, 1] : 1,
                        }}
                        transition={{ duration: 0.5, repeat: isScanning ? Infinity : 0 }}
                      >
                        <Scan className="h-32 w-32 mx-auto mb-4 text-cyan-400" />
                      </motion.div>
                      <p className="text-xl text-white font-black mb-2">
                        {isScanning ? 'Scanning...' : isRecording ? 'Recording Your Voice...' : isPrinting ? 'Printing Label...' : 'Try It Now'}
                      </p>
                      <p className="text-cyan-300">Simulate the voice labeling workflow</p>
                    </div>
                  </div>

                  <div className="grid md:grid-cols-3 gap-4">
                    <Button
                      onClick={() => {
                        setIsScanning(true);
                        setTimeout(() => {
                          setIsScanning(false);
                          setIsRecording(true);
                          setTimeout(() => {
                            setIsRecording(false);
                            setIsPrinting(true);
                            setTimeout(() => setIsPrinting(false), 2000);
                          }, 2000);
                        }, 2000);
                      }}
                      disabled={isScanning || isRecording || isPrinting}
                      className="bg-gradient-to-r from-cyan-600 to-blue-600 hover:from-cyan-500 hover:to-blue-500 font-black py-6"
                      size="lg"
                    >
                      <Scan className="h-5 w-5 mr-2" />
                      Scan Blank Code
                    </Button>
                    <Button
                      disabled
                      variant="outline"
                      className="border-purple-500/50 text-purple-300 font-black py-6"
                      size="lg"
                    >
                      <Mic className="h-5 w-5 mr-2" />
                      {isRecording ? 'Listening...' : 'Speak Label'}
                    </Button>
                    <Button
                      disabled
                      variant="outline"
                      className="border-indigo-500/50 text-indigo-300 font-black py-6"
                      size="lg"
                    >
                      <Printer className="h-5 w-5 mr-2" />
                      {isPrinting ? 'Printing...' : 'Generate Code'}
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
                <h2 className="text-5xl font-black mb-4 bg-gradient-to-r from-cyan-400 via-blue-400 to-purple-400 bg-clip-text text-transparent">
                  Real-World Impact
                </h2>
                <p className="text-xl text-cyan-200/80 max-w-3xl mx-auto">
                  Label anything, everywhere — from pantry to wardrobe
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
                    <Card className="bg-gradient-to-br from-black/60 to-black/40 border-cyan-500/30">
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
                          {useCase.examples.map((example, idx) => (
                            <div key={idx} className="p-6 bg-black/40 rounded-xl border border-cyan-500/20 hover:border-cyan-400/50 transition-colors duration-300">
                              <h4 className="text-lg font-black text-white mb-3">{example.item}</h4>
                              <div className="p-4 bg-cyan-500/10 rounded-lg border border-cyan-500/30">
                                <div className="flex items-start gap-2">
                                  <Volume2 className="h-4 w-4 text-cyan-400 flex-shrink-0 mt-1" />
                                  <p className="text-cyan-200 text-sm italic">"{example.label}"</p>
                                </div>
                              </div>
                            </div>
                          ))}
                        </div>
                      </CardContent>
                    </Card>
                  </motion.div>
                ))}
              </div>

              {/* User Testimonial */}
              <Card className="bg-gradient-to-br from-purple-900/30 to-pink-900/30 border-2 border-purple-500/50 mt-12">
                <CardContent className="p-12 text-center">
                  <Heart className="h-16 w-16 mx-auto mb-6 text-pink-400" />
                  <blockquote className="text-2xl text-white font-medium italic mb-4">
                    "I labeled my yarn stash! Now I can knit alone without asking for help. 
                    HearB gave me my independence back."
                  </blockquote>
                  <p className="text-cyan-300 font-bold">— Pilot User Feedback</p>
                </CardContent>
              </Card>
            </motion.div>
          </AnimatePresence>
        )}

        {/* $41.8M Vision Section */}
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
                <h2 className="text-6xl md:text-7xl font-black mb-4 bg-gradient-to-r from-green-400 via-cyan-400 to-blue-400 bg-clip-text text-transparent">
                  $41.8 MILLION VISION
                </h2>
                <p className="text-2xl text-cyan-200/80 max-w-3xl mx-auto">
                  Year 5 Projection — Empowering 285M Visually Impaired Globally
                </p>
              </div>

              {/* Financial Hero */}
              <Card className="bg-gradient-to-br from-green-900/30 to-cyan-900/30 border-2 border-green-500/50 mb-12 overflow-hidden">
                <div className="relative h-64">
                  <div className="absolute inset-0 bg-gradient-to-r from-green-900/90 to-cyan-900/90" />
                  <div className="relative z-10 flex items-center justify-center h-full">
                    <div className="text-center">
                      <motion.div
                        initial={{ scale: 0 }}
                        animate={{ scale: 1 }}
                        transition={{ type: "spring", duration: 1 }}
                        className="text-7xl font-black text-white mb-4"
                      >
                        $41,800,000
                      </motion.div>
                      <div className="text-2xl text-green-200 font-bold">Year 5 Revenue Target</div>
                      <div className="text-cyan-300 mt-2">50,000 units sold • 78% profit margin</div>
                    </div>
                  </div>
                </div>
              </Card>

              {/* 5-Year Growth */}
              <Card className="bg-gradient-to-br from-black/60 to-black/40 border-cyan-500/30 mb-12">
                <CardHeader>
                  <CardTitle className="flex items-center gap-3 text-white text-2xl">
                    <TrendingUp className="h-7 w-7 text-green-400" />
                    5-Year Revenue Trajectory
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {[
                      { year: 1, revenue: '$1.64M', units: '2,000', profit: '-$380K*', margin: '45%', highlight: 'Launch' },
                      { year: 2, revenue: '$4.1M', units: '5,000', profit: '$620K', margin: '50%', highlight: 'Growth' },
                      { year: 3, revenue: '$9.8M', units: '12,000', profit: '$2.1M', margin: '55%', highlight: 'Scale' },
                      { year: 4, revenue: '$20.4M', units: '25,000', profit: '$5.3M', margin: '60%', highlight: 'Expansion' },
                      { year: 5, revenue: '$41.8M', units: '50,000', profit: '$12.7M', margin: '65%', highlight: 'Dominance' },
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
                            ? 'bg-gradient-to-r from-green-500/20 to-cyan-500/20 border-2 border-green-500/50' 
                            : 'bg-cyan-500/10 border border-cyan-500/20'
                        }`}>
                          <div className="grid grid-cols-2 md:grid-cols-6 gap-4 items-center">
                            <div>
                              <div className="text-sm text-cyan-300/80 mb-1">Year {milestone.year}</div>
                              <div className={`text-2xl font-black ${milestone.year === 5 ? 'text-green-400' : 'text-white'}`}>
                                {milestone.highlight}
                              </div>
                            </div>
                            <div>
                              <div className="text-sm text-cyan-300/80 mb-1">Revenue</div>
                              <div className="text-xl font-black text-white">{milestone.revenue}</div>
                            </div>
                            <div>
                              <div className="text-sm text-cyan-300/80 mb-1">Units</div>
                              <div className="text-xl font-black text-white">{milestone.units}</div>
                            </div>
                            <div>
                              <div className="text-sm text-cyan-300/80 mb-1">Net Profit</div>
                              <div className="text-xl font-black text-white">{milestone.profit}</div>
                            </div>
                            <div>
                              <div className="text-sm text-cyan-300/80 mb-1">Margin</div>
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
                  <p className="text-cyan-300/70 text-sm mt-4 text-center">*Year 1 includes $380K development costs</p>
                </CardContent>
              </Card>

              {/* Market & Impact */}
              <div className={`grid gap-8 mb-12 ${isMobile ? 'grid-cols-1' : 'grid-cols-2'}`}>
                <Card className="bg-gradient-to-br from-cyan-900/30 to-blue-900/30 border-2 border-cyan-500/40">
                  <CardHeader>
                    <CardTitle className="flex items-center gap-3 text-white text-xl">
                      <Globe className="h-6 w-6 text-cyan-400" />
                      Market Opportunity
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="text-5xl font-black text-white mb-2">285M</div>
                    <div className="text-cyan-200/80 mb-6">Visually Impaired Globally</div>
                    <div className="space-y-3">
                      {[
                        { segment: 'TAM (Total Market)', size: '$3.4B' },
                        { segment: 'SAM (Serviceable)', size: '$680M' },
                        { segment: 'Target (Year 5)', size: '$41.8M' },
                      ].map((segment, idx) => (
                        <div key={idx} className="flex justify-between items-center p-3 bg-black/40 rounded-lg">
                          <span className="text-cyan-200">{segment.segment}</span>
                          <span className="text-xl font-black text-cyan-400">{segment.size}</span>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>

                <Card className="bg-gradient-to-br from-purple-900/30 to-pink-900/30 border-2 border-purple-500/40">
                  <CardHeader>
                    <CardTitle className="flex items-center gap-3 text-white text-xl">
                      <Heart className="h-6 w-6 text-purple-400" />
                      Social Impact
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      {[
                        { metric: 'Users Empowered', value: '50,000', icon: Users },
                        { metric: 'Independence Gain', value: '40%', icon: TrendingUp },
                        { metric: 'Labels Created', value: '5M+', icon: CheckCircle },
                      ].map((impact, idx) => (
                        <div key={idx} className="p-4 bg-black/40 rounded-lg">
                          <div className="flex items-center gap-3 mb-2">
                            <impact.icon className="h-5 w-5 text-purple-400" />
                            <span className="text-purple-200 font-bold">{impact.metric}</span>
                          </div>
                          <div className="text-3xl font-black text-white">{impact.value}</div>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </div>

              {/* Key Metrics */}
              <Card className="bg-gradient-to-br from-black/60 to-black/40 border-cyan-500/30">
                <CardHeader>
                  <CardTitle className="flex items-center gap-3 text-white text-2xl">
                    <BarChart3 className="h-7 w-7 text-cyan-400" />
                    Year 5 Key Metrics
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
                    {[
                      { label: 'Revenue', value: '$41.8M', icon: DollarSign, color: 'text-green-400' },
                      { label: 'Units Sold', value: '50,000', icon: Target, color: 'text-cyan-400' },
                      { label: 'Profit Margin', value: '65%', icon: TrendingUp, color: 'text-emerald-400' },
                      { label: 'Net Profit', value: '$12.7M', icon: Award, color: 'text-green-400' },
                      { label: 'Active Users', value: '50,000', icon: Users, color: 'text-blue-400' },
                      { label: 'Subscriptions', value: '35,000', icon: CheckCircle, color: 'text-purple-400' },
                      { label: 'NGO Partners', value: '25+', icon: Globe, color: 'text-cyan-400' },
                      { label: 'Team Size', value: '85', icon: Users, color: 'text-indigo-400' },
                    ].map((metric, idx) => (
                      <motion.div
                        key={idx}
                        initial={{ opacity: 0, scale: 0.9 }}
                        whileInView={{ opacity: 1, scale: 1 }}
                        viewport={{ once: true }}
                        transition={{ delay: idx * 0.05 }}
                        className="text-center p-6 bg-cyan-500/10 rounded-xl border border-cyan-500/20"
                      >
                        <metric.icon className={`h-10 w-10 mx-auto mb-3 ${metric.color}`} />
                        <div className="text-3xl font-black text-white mb-2">{metric.value}</div>
                        <div className="text-sm text-cyan-300/80">{metric.label}</div>
                      </motion.div>
                    ))}
                  </div>
                </CardContent>
              </Card>

              {/* Loan Information */}
              <Card className="bg-gradient-to-br from-green-900/30 to-emerald-900/30 border-2 border-green-500/50 mt-12">
                <CardContent className="p-12 text-center">
                  <DollarSign className="h-16 w-16 mx-auto mb-6 text-green-400" />
                  <h3 className="text-3xl font-black text-white mb-4">$500K Loan Request</h3>
                  <p className="text-cyan-200/80 max-w-2xl mx-auto mb-8 text-lg">
                    Funding for R&D, certifications, and initial production run. Repayable in 5 years at 6% interest 
                    from revenue starting Year 2. 12x ROI by Year 5.
                  </p>
                  <div className="grid md:grid-cols-4 gap-6">
                    {[
                      { label: 'R&D', amount: '$200K', percent: '40%' },
                      { label: 'Production', amount: '$200K', percent: '40%' },
                      { label: 'Marketing', amount: '$50K', percent: '10%' },
                      { label: 'Contingency', amount: '$50K', percent: '10%' },
                    ].map((allocation, idx) => (
                      <div key={idx} className="p-6 bg-black/40 rounded-xl">
                        <div className="text-2xl font-black text-green-400 mb-2">{allocation.amount}</div>
                        <div className="text-white font-bold mb-1">{allocation.label}</div>
                        <div className="text-sm text-cyan-300/70">{allocation.percent}</div>
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