import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "motion/react";
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";
import { Button } from "../ui/button";
import { Badge } from "../ui/badge";
import { Input } from "../ui/input";
import { Textarea } from "../ui/textarea";
import { ImageWithFallback } from "../figma/ImageWithFallback";
import { PROSTechDashboard } from "../ventures/pros/PROSTechDashboard";
import { DatabaseSchemaVisualizer } from "../ventures/pros/DatabaseSchemaVisualizer";
import { 
  Brain,
  Sparkles,
  Mic,
  Box,
  Lightbulb,
  Rocket,
  Zap,
  TrendingUp,
  Globe,
  Users,
  Award,
  Play,
  Send,
  Download,
  Share2,
  Eye,
  Layers,
  Target,
  DollarSign,
  BarChart3,
  Activity,
  Waves,
  Radio,
  Boxes,
  Wand2,
  ShoppingBag,
  Building2,
  Cpu,
  Code
} from "lucide-react";

interface ProsPrototypeProps {
  deviceView: 'desktop' | 'tablet' | 'mobile';
}

export function ProsPrototype({ deviceView }: ProsPrototypeProps) {
  const [activeSection, setActiveSection] = useState<'hero' | 'casting' | 'ai-process' | 'holograms' | 'templates' | 'vision' | 'technical'>('hero');
  const [ideaInput, setIdeaInput] = useState("");
  const [isProcessing, setIsProcessing] = useState(false);
  const [processingStage, setProcessingStage] = useState(0);
  const [showHolograms, setShowHolograms] = useState(false);
  const [selectedHologram, setSelectedHologram] = useState<number | null>(null);
  const [templateSearch, setTemplateSearch] = useState("");
  const [eventsProcessed, setEventsProcessed] = useState(52847293);
  const [projectsGenerated, setProjectsGenerated] = useState(847621);

  const isMobile = deviceView === 'mobile';
  const isTablet = deviceView === 'tablet';

  // Simulate real-time data updates
  useEffect(() => {
    const interval = setInterval(() => {
      setEventsProcessed(prev => prev + Math.floor(Math.random() * 10000));
      setProjectsGenerated(prev => prev + Math.floor(Math.random() * 10));
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  // Processing stages simulation
  useEffect(() => {
    if (isProcessing) {
      const stages = [
        { id: 0, duration: 800 },
        { id: 1, duration: 1200 },
        { id: 2, duration: 1000 },
        { id: 3, duration: 1500 },
      ];
      
      let currentStage = 0;
      const processNextStage = () => {
        if (currentStage < stages.length) {
          setTimeout(() => {
            setProcessingStage(stages[currentStage].id);
            currentStage++;
            if (currentStage < stages.length) {
              processNextStage();
            } else {
              setTimeout(() => {
                setIsProcessing(false);
                setShowHolograms(true);
              }, 500);
            }
          }, stages[currentStage].duration);
        }
      };
      processNextStage();
    }
  }, [isProcessing]);

  const handleCastIdea = () => {
    if (ideaInput.trim()) {
      setIsProcessing(true);
      setProcessingStage(0);
      setShowHolograms(false);
      setSelectedHologram(null);
    }
  };

  const templateCategories = [
    { id: 'startup', name: 'Startup & Business', count: 12847, icon: Rocket, color: 'from-purple-500 to-pink-500', templates: ['SaaS Business Plan', 'E-commerce Strategy', 'VC Pitch Deck'] },
    { id: 'architecture', name: 'Architecture & Design', count: 8923, icon: Building2, color: 'from-blue-500 to-cyan-500', templates: ['Sustainable Building', 'Urban Planning', 'Interior Design'] },
    { id: 'engineering', name: 'Engineering & Tech', count: 15621, icon: Cpu, color: 'from-green-500 to-emerald-500', templates: ['IoT Solutions', 'Robotics', 'AI Systems'] },
    { id: 'creative', name: 'Creative & Media', count: 9847, icon: Sparkles, color: 'from-orange-500 to-red-500', templates: ['Film Production', 'Marketing Campaign', 'Brand Identity'] },
    { id: 'healthcare', name: 'Healthcare & Pharma', count: 6234, icon: Activity, color: 'from-red-500 to-pink-500', templates: ['Medical Device', 'Drug Development', 'Telemedicine'] },
    { id: 'education', name: 'Education & Research', count: 7456, icon: Brain, color: 'from-indigo-500 to-purple-500', templates: ['Curriculum Design', 'Research Proposal', 'EdTech Platform'] },
  ];

  const hologramOptions = [
    {
      id: 1,
      name: 'Minimalist Pitch',
      style: 'Clean & Professional',
      description: 'Elegant presentation with focus on key metrics and data visualization',
      color: 'from-blue-500 to-cyan-500',
      features: ['Executive Summary', 'Financial Charts', 'Timeline View', 'Contact Info']
    },
    {
      id: 2,
      name: 'Animated Story',
      style: 'Dynamic & Engaging',
      description: 'Interactive narrative with animated transitions and immersive storytelling',
      color: 'from-purple-500 to-pink-500',
      features: ['Story Arc', 'Motion Graphics', 'Character Animation', 'Scene Transitions']
    },
    {
      id: 3,
      name: 'Interactive 3D',
      style: 'Immersive & Explorable',
      description: 'Fully interactive holographic experience with gesture controls and spatial audio',
      color: 'from-orange-500 to-red-500',
      features: ['3D Models', 'Gesture Control', 'Spatial Audio', '360° View']
    },
  ];

  const processingStages = [
    { id: 0, label: 'Analyzing Idea', sublabel: 'Neural pattern recognition', icon: Brain, progress: 100 },
    { id: 1, label: 'Template Matching', sublabel: '100M+ projects scanned', icon: Layers, progress: 100 },
    { id: 2, label: 'Market Analysis', sublabel: 'Global data synthesis', icon: Globe, progress: 100 },
    { id: 3, label: 'Hologram Generation', sublabel: '3D rendering complete', icon: Box, progress: 100 },
  ];

  const successStories = [
    {
      name: 'Solar Farm in Borgou',
      location: 'Benin',
      impact: '$500K Grant Secured',
      description: 'PRO\'S generated complete infrastructure plan in 10 minutes',
      icon: Zap,
      color: 'from-yellow-500 to-orange-500'
    },
    {
      name: 'Sustainable Housing',
      location: 'Nigeria',
      impact: '200 Units Built',
      description: 'Architectural holograms convinced investors instantly',
      icon: Building2,
      color: 'from-green-500 to-emerald-500'
    },
    {
      name: 'EdTech Platform',
      location: 'Kenya',
      impact: '50K Students',
      description: 'Business plan led to $2M Series A funding',
      icon: Brain,
      color: 'from-blue-500 to-cyan-500'
    },
  ];

  const navigationTabs = [
    { id: 'hero', label: 'Home', icon: Sparkles },
    { id: 'casting', label: 'Idea Casting', icon: Wand2 },
    { id: 'ai-process', label: 'AI Engine', icon: Brain },
    { id: 'holograms', label: 'Holograms', icon: Box },
    { id: 'templates', label: 'Templates', icon: Layers },
    { id: 'vision', label: '$5B Vision', icon: TrendingUp },
    { id: 'technical', label: 'Technical Docs', icon: Code },
  ];

  return (
    <div className="h-full text-white overflow-auto relative">
      <div className="relative z-10">
        {/* Revolutionary Header */}
        <div className="glass-strong border-b border-white/5 sticky top-0 z-50">
          <div className="flex items-center justify-between p-4">
            <div className="flex items-center gap-4">
              <div className="relative">
                <div className="w-14 h-14 bg-gradient-to-br from-purple-500 via-pink-500 to-indigo-500 rounded-2xl p-3 shadow-xl">
                  <Brain className="h-8 w-8 text-white" />
                </div>
                <motion.div 
                  className="absolute inset-0 bg-purple-500 rounded-2xl blur-xl opacity-50"
                  animate={{ scale: [1, 1.2, 1], opacity: [0.3, 0.5, 0.3] }}
                  transition={{ duration: 2, repeat: Infinity }}
                />
              </div>
              <div>
                <h1 className="text-2xl font-black bg-gradient-to-r from-purple-400 via-pink-400 to-indigo-400 bg-clip-text text-transparent tracking-tight">
                  PRO'S
                </h1>
                <p className="text-sm text-purple-300 font-bold tracking-wide">PROJECT REALIZATION OPTIMIZER</p>
              </div>
            </div>
            
            {!isMobile && (
              <div className="flex items-center gap-6">
                <div className="text-right">
                  <div className="text-xs text-purple-300/80 font-bold uppercase tracking-wide">Projects Generated</div>
                  <div className="text-xl font-black text-purple-400">{projectsGenerated.toLocaleString()}</div>
                </div>
                <div className="text-right">
                  <div className="text-xs text-pink-300/80 font-bold uppercase tracking-wide">AI Events/sec</div>
                  <div className="text-xl font-black text-pink-400">{(eventsProcessed / 1000000).toFixed(2)}M</div>
                </div>
                <Badge className="bg-gradient-to-r from-purple-500/20 to-pink-500/20 text-purple-300 border border-purple-500/40 px-4 py-2 font-black uppercase tracking-wide">
                  <Sparkles className="h-3 w-3 mr-2" />
                  200+ Patents
                </Badge>
              </div>
            )}
          </div>

          {/* Navigation */}
          <div className="px-4 pb-4">
            <div className="flex gap-1 glass-ultra p-1 rounded-xl border border-purple-500/10 overflow-x-auto">
              {navigationTabs.map((tab) => (
                <Button
                  key={tab.id}
                  variant={activeSection === tab.id ? 'default' : 'ghost'}
                  size="sm"
                  onClick={() => setActiveSection(tab.id as any)}
                  className={`flex-shrink-0 ${
                    activeSection === tab.id 
                      ? 'bg-gradient-to-r from-purple-600 via-pink-600 to-indigo-600 text-white shadow-lg shadow-purple-500/50 font-black' 
                      : 'text-purple-300 hover:bg-purple-500/20 hover:text-white'
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
              {/* Revolutionary Hero */}
              <div className="relative h-[600px] overflow-hidden">
                <div className="absolute inset-0">
                  <ImageWithFallback
                    src="https://images.unsplash.com/photo-1620423855978-e5d74a7bef30?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxob2xvZ3JhcGhpYyUyMHRlY2hub2xvZ3klMjBkZXZpY2V8ZW58MXx8fHwxNzY0Mjc4Mzc0fDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral"
                    alt="PRO'S Holographic Device"
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-r from-purple-900/95 via-pink-900/90 to-indigo-900/95" />
                  
                  {/* Animated Holographic Particles */}
                  {Array.from({ length: 30 }).map((_, i) => (
                    <motion.div
                      key={i}
                      className="absolute w-2 h-2 bg-purple-400/60 rounded-full"
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
                        duration: Math.random() * 5 + 5,
                        repeat: Infinity,
                        delay: Math.random() * 3,
                      }}
                    />
                  ))}
                </div>

                <div className="relative z-10 flex items-center justify-center h-full px-4">
                  <div className="text-center max-w-4xl">
                    <motion.div
                      initial={{ opacity: 0, scale: 0.8 }}
                      animate={{ opacity: 1, scale: 1 }}
                      transition={{ duration: 0.8 }}
                    >
                      <h1 className="text-6xl md:text-7xl font-black mb-6 bg-gradient-to-r from-purple-300 via-pink-300 to-indigo-300 bg-clip-text text-transparent leading-tight">
                        FROM IDEA TO<br />HOLOGRAPHIC REALITY
                      </h1>
                    </motion.div>
                    
                    <motion.p
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.8, delay: 0.2 }}
                      className="text-2xl text-purple-200 mb-8 font-medium leading-relaxed"
                    >
                      Speak your vision. Watch AI transform it into a complete, <br className="hidden md:block" />
                      investor-ready project with 3 holographic presentations — <span className="text-white font-bold">in 90 seconds.</span>
                    </motion.p>

                    <motion.div
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.8, delay: 0.4 }}
                      className="flex flex-wrap gap-4 justify-center mb-8"
                    >
                      <Button 
                        size="lg" 
                        onClick={() => setActiveSection('casting')}
                        className="bg-gradient-to-r from-purple-600 via-pink-600 to-indigo-600 hover:from-purple-500 hover:via-pink-500 hover:to-indigo-500 text-white font-black px-8 py-6 text-lg shadow-2xl shadow-purple-500/50 transition-colors duration-300 hover:scale-105"
                      >
                        <Wand2 className="h-6 w-6 mr-3" />
                        Start Casting Ideas
                      </Button>
                      <Button 
                        size="lg" 
                        variant="outline"
                        onClick={() => setActiveSection('vision')}
                        className="border-2 border-purple-400/50 text-purple-200 hover:bg-purple-500/20 font-black px-8 py-6 text-lg backdrop-blur-xl"
                      >
                        <TrendingUp className="h-6 w-6 mr-3" />
                        $5B Vision
                      </Button>
                    </motion.div>

                    <motion.div
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{ duration: 0.8, delay: 0.6 }}
                      className="flex flex-wrap gap-8 justify-center"
                    >
                      {[
                        { label: '90 Seconds', sublabel: 'Idea to Reality', icon: Zap },
                        { label: '10,000+', sublabel: 'Templates', icon: Layers },
                        { label: '3 Holograms', sublabel: 'Per Project', icon: Box },
                      ].map((stat, idx) => (
                        <div key={idx} className="text-center">
                          <div className="flex items-center justify-center gap-2 mb-2">
                            <stat.icon className="h-5 w-5 text-purple-400" />
                            <div className="text-3xl font-black text-white">{stat.label}</div>
                          </div>
                          <div className="text-sm text-purple-300 font-medium">{stat.sublabel}</div>
                        </div>
                      ))}
                    </motion.div>
                  </div>
                </div>
              </div>

              {/* Revolutionary Features */}
              <div className="p-6 md:p-12 max-w-7xl mx-auto">
                <div className="text-center mb-12">
                  <h2 className="text-4xl md:text-5xl font-black mb-4 bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
                    The PRO'S Revolution
                  </h2>
                  <p className="text-xl text-purple-200/80 max-w-3xl mx-auto">
                    Like "Prouesse" in French — showcasing mastery, excellence, and revolutionary achievement
                  </p>
                </div>

                <div className={`grid gap-8 ${isMobile ? 'grid-cols-1' : isTablet ? 'grid-cols-2' : 'grid-cols-3'}`}>
                  {[
                    {
                      icon: Brain,
                      title: 'Neural AI Analysis',
                      description: 'Trained on 100M+ projects across 200+ industries. Understands context, market trends, and regulatory requirements instantly.',
                      gradient: 'from-purple-500 to-pink-500'
                    },
                    {
                      icon: Box,
                      title: 'Holographic Output',
                      description: 'Three stunning 3D holographic presentations per project. Minimalist, animated, or interactive — choose your style.',
                      gradient: 'from-pink-500 to-indigo-500'
                    },
                    {
                      icon: Layers,
                      title: 'Template Universe',
                      description: '10,000+ battle-tested templates. From startups to pharma, architecture to AI — every industry covered.',
                      gradient: 'from-indigo-500 to-purple-500'
                    },
                    {
                      icon: Wand2,
                      title: 'Idea Casting Device',
                      description: 'Pocket-sized miracle. Connect to your phone, speak your vision, watch holographic magic unfold in real-time.',
                      gradient: 'from-blue-500 to-cyan-500'
                    },
                    {
                      icon: Globe,
                      title: 'Global Intelligence',
                      description: 'Real-time data from 195 countries. Market analysis, competitor insights, regulatory compliance — all automated.',
                      gradient: 'from-green-500 to-emerald-500'
                    },
                    {
                      icon: Rocket,
                      title: 'Instant Execution',
                      description: 'Export to any format. Business plans, CAD files, pitch decks, financial models — ready for implementation.',
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
                      <Card className="bg-gradient-to-br from-black/60 to-black/40 border-purple-500/20 hover:border-purple-400/50 transition-colors duration-300 hover:shadow-2xl hover:shadow-purple-500/20 h-full">
                        <CardContent className="p-8">
                          <div className={`w-16 h-16 mb-6 rounded-2xl bg-gradient-to-br ${feature.gradient} p-4 shadow-lg`}>
                            <feature.icon className="h-8 w-8 text-white" />
                          </div>
                          <h3 className="text-2xl font-black mb-3 text-white">{feature.title}</h3>
                          <p className="text-purple-200/70 leading-relaxed">{feature.description}</p>
                        </CardContent>
                      </Card>
                    </motion.div>
                  ))}
                </div>

                {/* Success Stories */}
                <div className="mt-20">
                  <div className="text-center mb-12">
                    <h2 className="text-4xl font-black mb-4 text-white">Real Projects. Real Impact.</h2>
                    <p className="text-xl text-purple-200/80">PRO'S is already changing lives across Africa and beyond</p>
                  </div>

                  <div className={`grid gap-6 ${isMobile ? 'grid-cols-1' : 'grid-cols-3'}`}>
                    {successStories.map((story, index) => (
                      <motion.div
                        key={index}
                        initial={{ opacity: 0, scale: 0.9 }}
                        whileInView={{ opacity: 1, scale: 1 }}
                        viewport={{ once: true }}
                        transition={{ delay: index * 0.15 }}
                        whileHover={{ y: -8 }}
                      >
                        <Card className="bg-gradient-to-br from-black/60 to-black/40 border-purple-500/30 hover:border-purple-400 transition-colors duration-300 h-full">
                          <CardContent className="p-6">
                            <div className={`w-14 h-14 mb-4 rounded-xl bg-gradient-to-br ${story.color} p-3 shadow-lg`}>
                              <story.icon className="h-8 w-8 text-white" />
                            </div>
                            <h3 className="text-xl font-black text-white mb-2">{story.name}</h3>
                            <Badge className="mb-3 bg-purple-500/20 text-purple-300 border-purple-500/40">
                              {story.location}
                            </Badge>
                            <p className="text-purple-200/70 mb-4">{story.description}</p>
                            <div className="text-2xl font-black bg-gradient-to-r from-green-400 to-emerald-400 bg-clip-text text-transparent">
                              {story.impact}
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

        {/* Idea Casting Section */}
        {activeSection === 'casting' && (
          <AnimatePresence mode="wait">
            <motion.div
              key="casting"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="p-6 md:p-12 max-w-6xl mx-auto"
            >
              <div className="text-center mb-12">
                <h2 className="text-5xl font-black mb-4 bg-gradient-to-r from-purple-400 via-pink-400 to-indigo-400 bg-clip-text text-transparent">
                  Idea Casting Interface
                </h2>
                <p className="text-xl text-purple-200/80 max-w-3xl mx-auto">
                  The PRO'S Casting Device transforms your raw thoughts into complete, investor-ready projects
                </p>
              </div>

              {/* Casting Device Showcase */}
              <Card className="bg-gradient-to-br from-purple-900/30 to-pink-900/30 border-2 border-purple-500/40 mb-8 overflow-hidden">
                <CardContent className="p-8">
                  <div className="grid md:grid-cols-2 gap-8 items-center">
                    <div>
                      <h3 className="text-3xl font-black mb-4 text-white">The Casting Device</h3>
                      <p className="text-purple-200/80 mb-6 text-lg leading-relaxed">
                        A pocket-sized marvel of engineering. Connects to your smartphone via Bluetooth. 
                        Powered by quantum-level AI processors and nano-holographic projectors.
                      </p>
                      <div className="space-y-4">
                        {[
                          { label: 'Size', value: '3" x 3" x 0.5"' },
                          { label: 'Battery Life', value: '48 hours' },
                          { label: 'Hologram Resolution', value: '4K Ultra HD' },
                          { label: 'Processing Speed', value: '50M events/sec' },
                        ].map((spec, idx) => (
                          <div key={idx} className="flex justify-between items-center p-3 bg-black/40 rounded-lg border border-purple-500/20">
                            <span className="text-purple-300 font-bold">{spec.label}</span>
                            <span className="text-white font-black">{spec.value}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                    
                    <div className="relative">
                      <div className="aspect-square bg-gradient-to-br from-purple-600/20 to-pink-600/20 rounded-2xl flex items-center justify-center relative overflow-hidden">
                        {/* Holographic Effect */}
                        {[...Array(4)].map((_, i) => (
                          <motion.div
                            key={i}
                            className="absolute inset-0"
                            animate={{
                              scale: [1 + i * 0.15, 1 + i * 0.15 + 0.1, 1 + i * 0.15],
                              opacity: [0.1 - i * 0.02, 0.2 - i * 0.02, 0.1 - i * 0.02]
                            }}
                            transition={{
                              duration: 3,
                              repeat: Infinity,
                              delay: i * 0.3
                            }}
                          >
                            <div className="w-full h-full border-2 border-purple-500/40 rounded-2xl" />
                          </motion.div>
                        ))}
                        
                        <motion.div
                          animate={{
                            rotateY: [0, 360],
                            scale: [1, 1.1, 1]
                          }}
                          transition={{
                            duration: 8,
                            repeat: Infinity,
                            ease: "easeInOut"
                          }}
                          className="relative z-10"
                        >
                          <Box className="h-40 w-40 text-purple-400" />
                        </motion.div>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Idea Input Interface */}
              {!isProcessing && !showHolograms && (
                <Card className="bg-gradient-to-br from-black/60 to-black/40 border-2 border-purple-500/40">
                  <CardHeader>
                    <CardTitle className="flex items-center gap-3 text-white text-2xl">
                      <Wand2 className="h-7 w-7 text-purple-400" />
                      Cast Your Idea
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-6">
                    <div>
                      <label className="block text-purple-200 font-bold mb-3 text-lg">
                        Describe your vision in natural language:
                      </label>
                      <Textarea
                        value={ideaInput}
                        onChange={(e) => setIdeaInput(e.target.value)}
                        placeholder="Example: I want to build a solar-powered irrigation system for small farmers in West Africa that reduces water usage by 70% and increases crop yields. The system should be affordable, easy to maintain, and powered by AI to optimize water distribution..."
                        className="bg-black/40 border-purple-500/40 text-white placeholder:text-purple-300/40 min-h-[200px] text-lg p-4"
                      />
                    </div>

                    <div className="grid md:grid-cols-3 gap-4">
                      {[
                        { icon: Mic, label: 'Voice Input', color: 'from-blue-500 to-cyan-500' },
                        { icon: Eye, label: 'Sketch Recognition', color: 'from-purple-500 to-pink-500' },
                        { icon: Brain, label: 'Smart Suggestions', color: 'from-green-500 to-emerald-500' },
                      ].map((option, idx) => (
                        <Button
                          key={idx}
                          variant="outline"
                          className="border-purple-500/30 text-purple-300 hover:bg-purple-500/20 font-bold"
                        >
                          <option.icon className="h-4 w-4 mr-2" />
                          {option.label}
                        </Button>
                      ))}
                    </div>

                    <Button
                      size="lg"
                      onClick={handleCastIdea}
                      disabled={!ideaInput.trim()}
                      className="w-full bg-gradient-to-r from-purple-600 via-pink-600 to-indigo-600 hover:from-purple-500 hover:via-pink-500 hover:to-indigo-500 text-white font-black text-xl py-6 shadow-2xl shadow-purple-500/50 disabled:opacity-50"
                    >
                      <Send className="h-6 w-6 mr-3" />
                      Cast to PRO'S Device
                    </Button>

                    <p className="text-center text-purple-300/60 text-sm">
                      Your idea will be processed through 100M+ project templates in 90 seconds
                    </p>
                  </CardContent>
                </Card>
              )}

              {/* Processing Animation */}
              {isProcessing && (
                <Card className="bg-gradient-to-br from-black/60 to-black/40 border-2 border-purple-500/40">
                  <CardContent className="p-12">
                    <div className="text-center mb-8">
                      <motion.div
                        className="w-32 h-32 mx-auto mb-6 relative"
                      >
                        {/* Rotating Neural Network */}
                        <motion.div
                          animate={{ rotate: 360 }}
                          transition={{ duration: 3, repeat: Infinity, ease: "linear" }}
                          className="absolute inset-0"
                        >
                          <div className="w-full h-full border-4 border-purple-600 border-t-transparent rounded-full" />
                        </motion.div>
                        <motion.div
                          animate={{ rotate: -360 }}
                          transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
                          className="absolute inset-4"
                        >
                          <div className="w-full h-full border-4 border-pink-600 border-b-transparent rounded-full" />
                        </motion.div>
                        <div className="absolute inset-0 flex items-center justify-center">
                          <Brain className="h-12 w-12 text-purple-400" />
                        </div>
                      </motion.div>

                      <h3 className="text-3xl font-black text-white mb-2">AI Processing...</h3>
                      <p className="text-purple-200/80 text-lg">Neural analysis in progress</p>
                    </div>

                    <div className="space-y-4 max-w-2xl mx-auto">
                      {processingStages.map((stage, idx) => (
                        <motion.div
                          key={stage.id}
                          initial={{ opacity: 0, x: -20 }}
                          animate={{ 
                            opacity: processingStage >= stage.id ? 1 : 0.3,
                            x: 0 
                          }}
                          transition={{ delay: idx * 0.1 }}
                          className={`flex items-center gap-4 p-4 rounded-xl ${
                            processingStage >= stage.id 
                              ? 'bg-purple-500/20 border-2 border-purple-500/50' 
                              : 'bg-black/20 border border-purple-500/20'
                          }`}
                        >
                          <div className={`w-12 h-12 rounded-xl flex items-center justify-center ${
                            processingStage >= stage.id 
                              ? 'bg-gradient-to-br from-purple-600 to-pink-600' 
                              : 'bg-black/40'
                          }`}>
                            <stage.icon className="h-6 w-6 text-white" />
                          </div>
                          <div className="flex-1">
                            <div className="font-black text-white">{stage.label}</div>
                            <div className="text-sm text-purple-300/70">{stage.sublabel}</div>
                          </div>
                          {processingStage >= stage.id && (
                            <motion.div
                              initial={{ scale: 0 }}
                              animate={{ scale: 1 }}
                              className="text-green-400"
                            >
                              <Sparkles className="h-6 w-6" />
                            </motion.div>
                          )}
                        </motion.div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              )}

              {/* Hologram Selection */}
              {showHolograms && (
                <motion.div
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="space-y-8"
                >
                  <Card className="bg-gradient-to-br from-green-900/30 to-emerald-900/30 border-2 border-green-500/50">
                    <CardContent className="p-8 text-center">
                      <motion.div
                        initial={{ scale: 0 }}
                        animate={{ scale: 1 }}
                        transition={{ type: "spring", duration: 0.6 }}
                      >
                        <Sparkles className="h-16 w-16 mx-auto mb-4 text-green-400" />
                      </motion.div>
                      <h3 className="text-3xl font-black text-white mb-2">Project Generated Successfully!</h3>
                      <p className="text-green-200/80 text-lg">Choose your holographic presentation style</p>
                    </CardContent>
                  </Card>

                  <div className={`grid gap-6 ${isMobile ? 'grid-cols-1' : 'grid-cols-3'}`}>
                    {hologramOptions.map((hologram, index) => (
                      <motion.div
                        key={hologram.id}
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: index * 0.15 }}
                        whileHover={{ y: -8, scale: 1.02 }}
                      >
                        <Card 
                          onClick={() => setSelectedHologram(hologram.id)}
                          className={`cursor-pointer transition-colors duration-300 ${
                            selectedHologram === hologram.id
                              ? 'border-2 border-purple-400 shadow-2xl shadow-purple-500/50 bg-gradient-to-br from-purple-900/40 to-pink-900/40'
                              : 'border border-purple-500/30 bg-gradient-to-br from-black/60 to-black/40 hover:border-purple-400'
                          }`}
                        >
                          <CardContent className="p-6">
                            <div className="relative aspect-square mb-4 rounded-xl bg-gradient-to-br from-purple-600/20 to-pink-600/20 overflow-hidden">
                              {/* Hologram Preview */}
                              <div className="absolute inset-0 flex items-center justify-center">
                                <motion.div
                                  animate={{
                                    scale: [1, 1.1, 1],
                                    rotate: hologram.id === 2 ? [0, 360] : 0
                                  }}
                                  transition={{
                                    duration: 4,
                                    repeat: Infinity,
                                  }}
                                >
                                  <Box className="h-24 w-24 text-purple-400" />
                                </motion.div>
                              </div>
                              {selectedHologram === hologram.id && (
                                <motion.div
                                  initial={{ scale: 0 }}
                                  animate={{ scale: 1 }}
                                  className="absolute top-3 right-3 bg-green-500 text-white rounded-full p-2"
                                >
                                  <Sparkles className="h-4 w-4" />
                                </motion.div>
                              )}
                            </div>

                            <div className={`inline-block px-3 py-1 rounded-full text-xs font-black mb-3 ${
                              selectedHologram === hologram.id
                                ? 'bg-purple-500 text-white'
                                : 'bg-purple-500/20 text-purple-300'
                            }`}>
                              {hologram.style}
                            </div>

                            <h3 className="text-xl font-black text-white mb-2">{hologram.name}</h3>
                            <p className="text-purple-200/70 mb-4 text-sm leading-relaxed">{hologram.description}</p>

                            <div className="space-y-2">
                              {hologram.features.map((feature, idx) => (
                                <div key={idx} className="flex items-center gap-2 text-sm text-purple-300/80">
                                  <div className="w-1.5 h-1.5 rounded-full bg-purple-400" />
                                  {feature}
                                </div>
                              ))}
                            </div>
                          </CardContent>
                        </Card>
                      </motion.div>
                    ))}
                  </div>

                  {selectedHologram && (
                    <motion.div
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      className="flex gap-4"
                    >
                      <Button
                        size="lg"
                        className="flex-1 bg-gradient-to-r from-purple-600 via-pink-600 to-indigo-600 hover:from-purple-500 hover:via-pink-500 hover:to-indigo-500 font-black text-lg py-6 shadow-2xl shadow-purple-500/50"
                      >
                        <Play className="h-5 w-5 mr-3" />
                        View Hologram
                      </Button>
                      <Button
                        size="lg"
                        variant="outline"
                        className="flex-1 border-2 border-purple-400 text-purple-300 hover:bg-purple-500/20 font-black text-lg py-6"
                      >
                        <Download className="h-5 w-5 mr-3" />
                        Export Project
                      </Button>
                    </motion.div>
                  )}

                  <Button
                    variant="ghost"
                    onClick={() => {
                      setShowHolograms(false);
                      setSelectedHologram(null);
                      setIdeaInput("");
                    }}
                    className="w-full text-purple-300 hover:text-white hover:bg-purple-500/20"
                  >
                    Start New Project
                  </Button>
                </motion.div>
              )}
            </motion.div>
          </AnimatePresence>
        )}

        {/* AI Processing Engine Section */}
        {activeSection === 'ai-process' && (
          <AnimatePresence mode="wait">
            <motion.div
              key="ai-process"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="p-6 md:p-12 max-w-7xl mx-auto"
            >
              <div className="text-center mb-12">
                <h2 className="text-5xl font-black mb-4 bg-gradient-to-r from-purple-400 via-pink-400 to-indigo-400 bg-clip-text text-transparent">
                  Neural AI Engine
                </h2>
                <p className="text-xl text-purple-200/80 max-w-3xl mx-auto">
                  The intelligence behind the magic — 100M+ projects, quantum-level processing
                </p>
              </div>

              {/* Neural Network Visualization */}
              <Card className="bg-gradient-to-br from-purple-900/30 to-pink-900/30 border-2 border-purple-500/40 mb-8">
                <CardContent className="p-8">
                  <div className="aspect-video bg-gradient-to-br from-purple-900/50 via-pink-900/50 to-indigo-900/50 rounded-2xl flex items-center justify-center relative overflow-hidden">
                    {/* Neural Network Visualization */}
                    <ImageWithFallback
                      src="https://images.unsplash.com/photo-1761740533449-b8d4385e60b0?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxuZXVyYWwlMjBuZXR3b3JrJTIwdmlzdWFsaXphdGlvbnxlbnwxfHx8fDE3NjQyMjkzNzF8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral"
                      alt="Neural Network"
                      className="absolute inset-0 w-full h-full object-cover opacity-40"
                    />
                    <div className="absolute inset-0 bg-gradient-to-br from-purple-900/80 to-pink-900/80" />

                    {/* Animated Neural Particles */}
                    {Array.from({ length: 20 }).map((_, i) => (
                      <motion.div
                        key={i}
                        className="absolute w-3 h-3 bg-purple-400 rounded-full"
                        initial={{
                          x: `${Math.random() * 100}%`,
                          y: `${Math.random() * 100}%`,
                        }}
                        animate={{
                          x: [`${Math.random() * 100}%`, `${Math.random() * 100}%`],
                          y: [`${Math.random() * 100}%`, `${Math.random() * 100}%`],
                          opacity: [0.3, 1, 0.3],
                        }}
                        transition={{
                          duration: Math.random() * 3 + 2,
                          repeat: Infinity,
                          ease: "easeInOut"
                        }}
                      />
                    ))}

                    <motion.div
                      animate={{ rotate: 360 }}
                      transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
                      className="relative z-10"
                    >
                      <Brain className="h-40 w-40 text-purple-400/80" />
                    </motion.div>
                  </div>

                  <div className="mt-8 grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
                    {[
                      { label: 'Projects Analyzed', value: '100M+', icon: Layers },
                      { label: 'Processing Speed', value: '50M/sec', icon: Zap },
                      { label: 'Accuracy Rate', value: '99.7%', icon: Target },
                      { label: 'Industries Covered', value: '200+', icon: Globe },
                    ].map((metric, idx) => (
                      <div key={idx}>
                        <metric.icon className="h-8 w-8 mx-auto mb-3 text-purple-400" />
                        <div className="text-3xl font-black text-white mb-1">{metric.value}</div>
                        <div className="text-sm text-purple-300/80">{metric.label}</div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>

              {/* AI Capabilities */}
              <div className={`grid gap-6 ${isMobile ? 'grid-cols-1' : 'grid-cols-2'}`}>
                {[
                  {
                    title: 'Context-Aware Learning',
                    description: 'Understands industry nuances, regional regulations, and cultural context. Adapts outputs to your specific market and audience.',
                    icon: Brain,
                    color: 'from-purple-500 to-pink-500'
                  },
                  {
                    title: 'Real-Time Market Analysis',
                    description: 'Pulls live data from 10,000+ sources. Competitor analysis, trend forecasting, and demand prediction in milliseconds.',
                    icon: TrendingUp,
                    color: 'from-blue-500 to-cyan-500'
                  },
                  {
                    title: 'Multi-Industry Expertise',
                    description: 'From aerospace to agriculture, fintech to pharmaceuticals. Every sector covered with battle-tested templates.',
                    icon: Globe,
                    color: 'from-green-500 to-emerald-500'
                  },
                  {
                    title: 'Quantum Processing',
                    description: 'Next-gen processors handle complex calculations instantly. Financial modeling, risk analysis, scenario planning — all automated.',
                    icon: Cpu,
                    color: 'from-orange-500 to-red-500'
                  },
                ].map((capability, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: index * 0.1 }}
                  >
                    <Card className="bg-gradient-to-br from-black/60 to-black/40 border-purple-500/30 hover:border-purple-400 transition-colors duration-300 h-full">
                      <CardContent className="p-6">
                        <div className={`w-14 h-14 mb-4 rounded-xl bg-gradient-to-br ${capability.color} p-3 shadow-lg`}>
                          <capability.icon className="h-8 w-8 text-white" />
                        </div>
                        <h3 className="text-xl font-black text-white mb-3">{capability.title}</h3>
                        <p className="text-purple-200/70 leading-relaxed">{capability.description}</p>
                      </CardContent>
                    </Card>
                  </motion.div>
                ))}
              </div>

              {/* Live Processing Stats */}
              <Card className="mt-8 bg-gradient-to-br from-black/60 to-black/40 border-purple-500/30">
                <CardHeader>
                  <CardTitle className="flex items-center gap-3 text-white text-2xl">
                    <Activity className="h-7 w-7 text-purple-400" />
                    Live Neural Activity
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    {[
                      { label: 'Events Processed', value: eventsProcessed.toLocaleString(), change: '+10K/sec' },
                      { label: 'Projects Generated', value: projectsGenerated.toLocaleString(), change: '+5/min' },
                      { label: 'Template Matches', value: '847,291', change: '+15/sec' },
                    ].map((stat, idx) => (
                      <div key={idx} className="p-6 bg-purple-500/10 rounded-xl border border-purple-500/20">
                        <div className="text-sm text-purple-300/80 mb-2">{stat.label}</div>
                        <div className="text-3xl font-black text-white mb-1">{stat.value}</div>
                        <div className="text-sm text-green-400 font-bold">{stat.change}</div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          </AnimatePresence>
        )}

        {/* Holograms Section */}
        {activeSection === 'holograms' && (
          <AnimatePresence mode="wait">
            <motion.div
              key="holograms"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="p-6 md:p-12 max-w-7xl mx-auto"
            >
              <div className="text-center mb-12">
                <h2 className="text-5xl font-black mb-4 bg-gradient-to-r from-purple-400 via-pink-400 to-indigo-400 bg-clip-text text-transparent">
                  Holographic Presentations
                </h2>
                <p className="text-xl text-purple-200/80 max-w-3xl mx-auto">
                  Three stunning visualization styles per project — choose what fits your audience
                </p>
              </div>

              {/* Hologram Showcase */}
              <div className="grid gap-8 mb-12">
                {hologramOptions.map((hologram, index) => (
                  <motion.div
                    key={hologram.id}
                    initial={{ opacity: 0, x: index % 2 === 0 ? -50 : 50 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: index * 0.2 }}
                  >
                    <Card className="bg-gradient-to-br from-black/60 to-black/40 border-purple-500/30 overflow-hidden">
                      <div className={`grid ${isMobile ? 'grid-cols-1' : 'md:grid-cols-2'} gap-0`}>
                        {/* Hologram Preview */}
                        <div className={`aspect-square bg-gradient-to-br ${hologram.color}/20 relative overflow-hidden ${index % 2 === 0 ? 'md:order-1' : 'md:order-2'}`}>
                          <ImageWithFallback
                            src="https://images.unsplash.com/photo-1562873120-ba8c5c6658d5?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHwzZCUyMGhvbG9ncmFtJTIwcHJvamVjdGlvbnxlbnwxfHx8fDE3NjQyNzgzNzR8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral"
                            alt={hologram.name}
                            className="absolute inset-0 w-full h-full object-cover opacity-30"
                          />
                          <div className={`absolute inset-0 bg-gradient-to-br ${hologram.color}/40`} />
                          
                          {/* 3D Effect */}
                          {[...Array(5)].map((_, i) => (
                            <motion.div
                              key={i}
                              className="absolute inset-0"
                              animate={{
                                scale: [1 + i * 0.1, 1 + i * 0.1 + 0.05, 1 + i * 0.1],
                                opacity: [0.15 - i * 0.02, 0.25 - i * 0.02, 0.15 - i * 0.02]
                              }}
                              transition={{
                                duration: 3,
                                repeat: Infinity,
                                delay: i * 0.2
                              }}
                            >
                              <div className={`w-full h-full border-2 border-white/30 ${index === 1 ? 'rounded-full' : 'rounded-2xl'}`} />
                            </motion.div>
                          ))}

                          <motion.div
                            animate={{
                              rotateY: index === 2 ? [0, 360] : 0,
                              scale: [1, 1.1, 1]
                            }}
                            transition={{
                              duration: 8,
                              repeat: Infinity,
                              ease: "easeInOut"
                            }}
                            className="absolute inset-0 flex items-center justify-center"
                          >
                            <Box className="h-48 w-48 text-white/80" />
                          </motion.div>
                        </div>

                        {/* Description */}
                        <CardContent className={`p-8 flex flex-col justify-center ${index % 2 === 0 ? 'md:order-2' : 'md:order-1'}`}>
                          <Badge className={`mb-4 w-fit bg-gradient-to-r ${hologram.color} text-white border-none font-black px-4 py-2`}>
                            {hologram.style}
                          </Badge>
                          <h3 className="text-3xl font-black text-white mb-4">{hologram.name}</h3>
                          <p className="text-purple-200/80 text-lg mb-6 leading-relaxed">{hologram.description}</p>
                          
                          <div className="space-y-3 mb-6">
                            {hologram.features.map((feature, idx) => (
                              <div key={idx} className="flex items-center gap-3">
                                <div className={`w-2 h-2 rounded-full bg-gradient-to-r ${hologram.color}`} />
                                <span className="text-purple-200">{feature}</span>
                              </div>
                            ))}
                          </div>

                          <Button 
                            className={`bg-gradient-to-r ${hologram.color} hover:opacity-90 text-white font-black`}
                            size="lg"
                          >
                            <Play className="h-5 w-5 mr-2" />
                            Preview Hologram
                          </Button>
                        </CardContent>
                      </div>
                    </Card>
                  </motion.div>
                ))}
              </div>

              {/* Hologram Tech Specs */}
              <Card className="bg-gradient-to-br from-purple-900/30 to-pink-900/30 border-2 border-purple-500/40">
                <CardHeader>
                  <CardTitle className="flex items-center gap-3 text-white text-2xl">
                    <Box className="h-7 w-7 text-purple-400" />
                    Holographic Technology
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
                    {[
                      { label: 'Resolution', value: '4K Ultra HD' },
                      { label: 'Viewing Angle', value: '360°' },
                      { label: 'Projection Range', value: 'Up to 20 feet' },
                      { label: 'Gesture Controls', value: 'Enabled' },
                      { label: 'Spatial Audio', value: '3D Surround' },
                      { label: 'Brightness', value: 'Daylight Visible' },
                      { label: 'Frame Rate', value: '120 FPS' },
                      { label: 'Latency', value: '<10ms' },
                    ].map((spec, idx) => (
                      <div key={idx} className="text-center p-4 bg-black/40 rounded-xl border border-purple-500/20">
                        <div className="text-sm text-purple-300/80 mb-2">{spec.label}</div>
                        <div className="text-xl font-black text-white">{spec.value}</div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          </AnimatePresence>
        )}

        {/* Templates Universe Section */}
        {activeSection === 'templates' && (
          <AnimatePresence mode="wait">
            <motion.div
              key="templates"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="p-6 md:p-12 max-w-7xl mx-auto"
            >
              <div className="text-center mb-12">
                <h2 className="text-5xl font-black mb-4 bg-gradient-to-r from-purple-400 via-pink-400 to-indigo-400 bg-clip-text text-transparent">
                  Template Universe
                </h2>
                <p className="text-xl text-purple-200/80 max-w-3xl mx-auto">
                  10,000+ battle-tested templates across 200+ industries — ready to deploy
                </p>
              </div>

              {/* Search Bar */}
              <Card className="bg-gradient-to-br from-black/60 to-black/40 border-purple-500/30 mb-8">
                <CardContent className="p-6">
                  <div className="flex gap-4">
                    <Input
                      value={templateSearch}
                      onChange={(e) => setTemplateSearch(e.target.value)}
                      placeholder="Search templates: 'SaaS startup', 'solar farm', 'mobile app', 'vaccine research'..."
                      className="flex-1 bg-black/40 border-purple-500/40 text-white placeholder:text-purple-300/40 text-lg"
                    />
                    <Button className="bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-500 hover:to-pink-500 font-black">
                      Search
                    </Button>
                  </div>
                </CardContent>
              </Card>

              {/* Template Categories */}
              <div className={`grid gap-6 mb-12 ${isMobile ? 'grid-cols-1' : isTablet ? 'grid-cols-2' : 'grid-cols-3'}`}>
                {templateCategories.map((category, index) => (
                  <motion.div
                    key={category.id}
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: index * 0.1 }}
                    whileHover={{ y: -8, scale: 1.02 }}
                  >
                    <Card className="bg-gradient-to-br from-black/60 to-black/40 border-purple-500/30 hover:border-purple-400 transition-colors duration-300 cursor-pointer h-full">
                      <CardContent className="p-6">
                        <div className={`w-16 h-16 mb-4 rounded-2xl bg-gradient-to-br ${category.color} p-4 shadow-lg`}>
                          <category.icon className="h-8 w-8 text-white" />
                        </div>
                        <h3 className="text-2xl font-black text-white mb-2">{category.name}</h3>
                        <div className="text-3xl font-black text-purple-400 mb-4">
                          {category.count.toLocaleString()}
                        </div>
                        <div className="space-y-2 mb-6">
                          {category.templates.map((template, idx) => (
                            <div key={idx} className="flex items-center gap-2 text-sm text-purple-200/70">
                              <div className="w-1.5 h-1.5 rounded-full bg-purple-400" />
                              {template}
                            </div>
                          ))}
                        </div>
                        <Button 
                          variant="outline" 
                          className="w-full border-purple-500/40 text-purple-300 hover:bg-purple-500/20 font-bold"
                        >
                          Browse Templates
                        </Button>
                      </CardContent>
                    </Card>
                  </motion.div>
                ))}
              </div>

              {/* Template Stats */}
              <Card className="bg-gradient-to-br from-purple-900/30 to-pink-900/30 border-2 border-purple-500/40">
                <CardContent className="p-8">
                  <div className="grid grid-cols-1 md:grid-cols-4 gap-8 text-center">
                    {[
                      { label: 'Total Templates', value: '10,000+', icon: Layers },
                      { label: 'Industries Covered', value: '200+', icon: Globe },
                      { label: 'Projects Analyzed', value: '100M+', icon: Brain },
                      { label: 'Success Rate', value: '94.7%', icon: Award },
                    ].map((stat, idx) => (
                      <div key={idx}>
                        <stat.icon className="h-10 w-10 mx-auto mb-3 text-purple-400" />
                        <div className="text-4xl font-black text-white mb-2">{stat.value}</div>
                        <div className="text-purple-300/80">{stat.label}</div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>

              {/* Template Marketplace */}
              <Card className="mt-8 bg-gradient-to-br from-black/60 to-black/40 border-purple-500/30">
                <CardHeader>
                  <CardTitle className="flex items-center gap-3 text-white text-2xl">
                    <ShoppingBag className="h-7 w-7 text-purple-400" />
                    Template Marketplace
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-purple-200/80 text-lg mb-6">
                    Create and sell your own templates. Earn royalties every time someone uses your expertise.
                  </p>
                  <div className="grid md:grid-cols-3 gap-4">
                    <div className="p-4 bg-purple-500/10 rounded-xl border border-purple-500/20">
                      <div className="text-3xl font-black text-white mb-1">30%</div>
                      <div className="text-sm text-purple-300/80">Commission on Sales</div>
                    </div>
                    <div className="p-4 bg-purple-500/10 rounded-xl border border-purple-500/20">
                      <div className="text-3xl font-black text-white mb-1">$2.5M</div>
                      <div className="text-sm text-purple-300/80">Paid to Creators (2024)</div>
                    </div>
                    <div className="p-4 bg-purple-500/10 rounded-xl border border-purple-500/20">
                      <div className="text-3xl font-black text-white mb-1">5,847</div>
                      <div className="text-sm text-purple-300/80">Active Sellers</div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          </AnimatePresence>
        )}

        {/* $5B Vision Section */}
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
                  $5 BILLION VISION
                </h2>
                <p className="text-2xl text-purple-200/80 max-w-3xl mx-auto">
                  Year 5 Projection — From Revolutionary Tech to Global Infrastructure
                </p>
              </div>

              {/* Financial Projections Hero */}
              <Card className="bg-gradient-to-br from-green-900/30 to-emerald-900/30 border-2 border-green-500/50 mb-12 overflow-hidden">
                <div className="relative h-64">
                  <ImageWithFallback
                    src="https://images.unsplash.com/photo-1758873272353-2ed038aa4ff9?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxzdGFydHVwJTIwc3VjY2VzcyUyMGNlbGVicmF0aW9ufGVufDF8fHx8MTc2NDI1Njc4NHww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral"
                    alt="Success Vision"
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
                        $5,000,000,000
                      </motion.div>
                      <div className="text-2xl text-green-200 font-bold">Year 5 Revenue Projection</div>
                    </div>
                  </div>
                </div>
              </Card>

              {/* 5-Year Growth Trajectory */}
              <Card className="bg-gradient-to-br from-black/60 to-black/40 border-purple-500/30 mb-12">
                <CardHeader>
                  <CardTitle className="flex items-center gap-3 text-white text-2xl">
                    <TrendingUp className="h-7 w-7 text-green-400" />
                    5-Year Growth Trajectory
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {[
                      { year: 1, revenue: '$15M', profit: '-$1.5M', users: '50K', highlight: 'MVP Launch' },
                      { year: 2, revenue: '$75M', profit: '$10M', users: '250K', highlight: 'Hardware Release' },
                      { year: 3, revenue: '$300M', profit: '$90M', users: '1.2M', highlight: 'Enterprise Adoption' },
                      { year: 4, revenue: '$1.2B', profit: '$400M', users: '5M', highlight: 'Global Expansion' },
                      { year: 5, revenue: '$5B', profit: '$2B', users: '20M', highlight: 'Market Dominance' },
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
                            : 'bg-purple-500/10 border border-purple-500/20'
                        }`}>
                          <div className="grid grid-cols-2 md:grid-cols-5 gap-4 items-center">
                            <div>
                              <div className="text-sm text-purple-300/80 mb-1">Year {milestone.year}</div>
                              <div className={`text-2xl font-black ${milestone.year === 5 ? 'text-green-400' : 'text-white'}`}>
                                {milestone.highlight}
                              </div>
                            </div>
                            <div>
                              <div className="text-sm text-purple-300/80 mb-1">Revenue</div>
                              <div className="text-xl font-black text-white">{milestone.revenue}</div>
                            </div>
                            <div>
                              <div className="text-sm text-purple-300/80 mb-1">Net Profit</div>
                              <div className={`text-xl font-black ${milestone.profit.startsWith('-') ? 'text-red-400' : 'text-green-400'}`}>
                                {milestone.profit}
                              </div>
                            </div>
                            <div>
                              <div className="text-sm text-purple-300/80 mb-1">Users</div>
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
                          <div className="absolute left-8 top-full w-0.5 h-4 bg-purple-500/30" />
                        )}
                      </motion.div>
                    ))}
                  </div>
                </CardContent>
              </Card>

              {/* Market Opportunity */}
              <div className={`grid gap-8 mb-12 ${isMobile ? 'grid-cols-1' : 'grid-cols-2'}`}>
                <Card className="bg-gradient-to-br from-purple-900/30 to-pink-900/30 border-2 border-purple-500/40">
                  <CardHeader>
                    <CardTitle className="flex items-center gap-3 text-white text-xl">
                      <Globe className="h-6 w-6 text-purple-400" />
                      Total Addressable Market
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      <div>
                        <div className="text-5xl font-black text-white mb-2">$25B</div>
                        <div className="text-purple-200/80">Global TAM (2025)</div>
                      </div>
                      <div className="space-y-3">
                        {[
                          { segment: 'Enterprise Software', size: '$8B' },
                          { segment: 'Creative Tools', size: '$7B' },
                          { segment: 'Project Management', size: '$6B' },
                          { segment: 'Holographic Tech', size: '$4B' },
                        ].map((segment, idx) => (
                          <div key={idx} className="flex justify-between items-center p-3 bg-black/40 rounded-lg">
                            <span className="text-purple-200">{segment.segment}</span>
                            <span className="text-white font-black">{segment.size}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  </CardContent>
                </Card>

                <Card className="bg-gradient-to-br from-green-900/30 to-emerald-900/30 border-2 border-green-500/50">
                  <CardHeader>
                    <CardTitle className="flex items-center gap-3 text-white text-xl">
                      <Target className="h-6 w-6 text-green-400" />
                      Market Penetration Strategy
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      {[
                        { phase: 'Year 1-2', target: 'Early Adopters', penetration: '0.1%', revenue: '$90M' },
                        { phase: 'Year 3', target: 'SMEs & Startups', penetration: '1%', revenue: '$300M' },
                        { phase: 'Year 4', target: 'Enterprise', penetration: '5%', revenue: '$1.2B' },
                        { phase: 'Year 5', target: 'Market Leader', penetration: '20%', revenue: '$5B' },
                      ].map((phase, idx) => (
                        <div key={idx} className="p-4 bg-black/40 rounded-lg border border-green-500/20">
                          <div className="flex justify-between items-center mb-2">
                            <span className="text-green-300 font-bold">{phase.phase}</span>
                            <Badge className="bg-green-500/20 text-green-400 border-green-500/40">
                              {phase.penetration}
                            </Badge>
                          </div>
                          <div className="text-sm text-green-200/70 mb-1">{phase.target}</div>
                          <div className="text-xl font-black text-white">{phase.revenue}</div>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </div>

              {/* Key Metrics */}
              <Card className="bg-gradient-to-br from-black/60 to-black/40 border-purple-500/30 mb-12">
                <CardHeader>
                  <CardTitle className="flex items-center gap-3 text-white text-2xl">
                    <BarChart3 className="h-7 w-7 text-purple-400" />
                    Year 5 Key Metrics
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
                    {[
                      { label: 'Annual Revenue', value: '$5B', icon: DollarSign, color: 'text-green-400' },
                      { label: 'Active Users', value: '20M', icon: Users, color: 'text-blue-400' },
                      { label: 'Projects Created', value: '500M+', icon: Rocket, color: 'text-purple-400' },
                      { label: 'Countries', value: '195', icon: Globe, color: 'text-pink-400' },
                      { label: 'Enterprise Clients', value: '10K+', icon: Building2, color: 'text-orange-400' },
                      { label: 'Template Library', value: '1M+', icon: Layers, color: 'text-cyan-400' },
                      { label: 'Net Profit Margin', value: '40%', icon: TrendingUp, color: 'text-emerald-400' },
                      { label: 'Market Share', value: '20%', icon: Target, color: 'text-red-400' },
                    ].map((metric, idx) => (
                      <motion.div
                        key={idx}
                        initial={{ opacity: 0, scale: 0.9 }}
                        whileInView={{ opacity: 1, scale: 1 }}
                        viewport={{ once: true }}
                        transition={{ delay: idx * 0.05 }}
                        className="text-center p-6 bg-purple-500/10 rounded-xl border border-purple-500/20"
                      >
                        <metric.icon className={`h-10 w-10 mx-auto mb-3 ${metric.color}`} />
                        <div className="text-3xl font-black text-white mb-2">{metric.value}</div>
                        <div className="text-sm text-purple-300/80">{metric.label}</div>
                      </motion.div>
                    ))}
                  </div>
                </CardContent>
              </Card>

              {/* Investment Case */}
              <Card className="bg-gradient-to-br from-purple-900/30 to-pink-900/30 border-2 border-purple-500/40">
                <CardHeader>
                  <CardTitle className="flex items-center gap-3 text-white text-2xl">
                    <Award className="h-7 w-7 text-purple-400" />
                    The Investment Case
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-6">
                    <p className="text-xl text-purple-200/80 leading-relaxed">
                      PRO'S isn't just a product — it's a <span className="text-white font-black">global utility</span> that democratizes 
                      innovation at scale. We're positioned to capture 20% of the $25B idea-realization market by Year 5.
                    </p>

                    <div className="grid md:grid-cols-3 gap-6">
                      {[
                        {
                          title: 'Unique Moat',
                          points: ['200+ Patents Filed', 'Proprietary AI Training', 'Holographic Hardware Lock-in']
                        },
                        {
                          title: 'Network Effects',
                          points: ['Template Marketplace', 'Creator Ecosystem', 'Enterprise Integration']
                        },
                        {
                          title: 'Scalability',
                          points: ['Cloud Infrastructure', 'Global CDN', 'Automated Workflows']
                        },
                      ].map((pillar, idx) => (
                        <div key={idx} className="p-6 bg-black/40 rounded-xl border border-purple-500/20">
                          <h4 className="text-xl font-black text-white mb-4">{pillar.title}</h4>
                          <ul className="space-y-2">
                            {pillar.points.map((point, pidx) => (
                              <li key={pidx} className="flex items-start gap-2 text-purple-200/80">
                                <Sparkles className="h-4 w-4 text-purple-400 flex-shrink-0 mt-1" />
                                <span>{point}</span>
                              </li>
                            ))}
                          </ul>
                        </div>
                      ))}
                    </div>

                    <div className="p-8 bg-gradient-to-r from-green-900/30 to-emerald-900/30 rounded-xl border-2 border-green-500/50 text-center">
                      <div className="text-2xl font-black text-white mb-2">Projected ROI for Early Investors</div>
                      <div className="text-6xl font-black bg-gradient-to-r from-green-400 to-emerald-400 bg-clip-text text-transparent mb-2">
                        250x
                      </div>
                      <div className="text-green-200/80">Based on $20M valuation → $5B by Year 5</div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          </AnimatePresence>
        )}

        {/* Technical Documentation Section */}
        {activeSection === 'technical' && (
          <AnimatePresence mode="wait">
            <motion.div
              key="technical"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
            >
              <PROSTechDashboard deviceView={deviceView} />
            </motion.div>
          </AnimatePresence>
        )}
      </div>
    </div>
  );
}
