import { useState, useEffect } from "react";
import { motion, AnimatePresence, useScroll, useTransform } from "motion/react";
import { Button } from "./components/ui/button";
import { Badge } from "./components/ui/badge";
import { 
  Rocket,
  Target,
  Brain,
  Zap,
  ChevronDown,
  Menu,
  X,
  Lock
} from "lucide-react";

// Import animation config
import { 
  EASING, 
  DURATION, 
  STAGGER, 
  VARIANTS, 
  INTERACTIONS, 
  PAGE_TRANSITIONS,
  SCROLL_ANIMATIONS,
  createTransition,
  getStaggerDelay
} from "./utils/animationConfig";

// Import all prototypes
import { AtableNeuralShowcase } from "./components/prototypes/AtableNeuralShowcase";
import { NimbusBiomeShowcase } from "./components/prototypes/NimbusBiomeShowcase";
import { LensstormShowcase } from "./components/prototypes/LensstormShowcase";
import { OtoShowcase } from "./components/prototypes/OtoShowcase";
import { HfloShowcase } from "./components/prototypes/HfloShowcase";
import { GcraftShowcase } from "./components/prototypes/GcraftShowcase";
import { HearbAssistShowcase } from "./components/prototypes/HearbAssistShowcase";
import { ProsShowcase } from "./components/prototypes/ProsShowcase";
import { InectShowcase } from "./components/prototypes/InectShowcase";
import { MparkerShowcase } from "./components/prototypes/MparkerShowcase";

// Import navigation helpers
import { ScrollToTop } from "./components/shared/ScrollToTop";
import { KeyboardShortcutsPanel } from "./components/shared/KeyboardShortcutsPanel";
import { BreathingTileBackground } from "./components/shared/BreathingTileBackground";

const ventures = [
  {
    id: 'pros',
    name: 'PRO\'S: Divine Machine',
    tagline: 'AI-Powered Idea-to-Reality Engine',
    category: 'Project Management / Holographic UI',
    value: 'FLAGSHIP',
    flagship: true,
    component: ProsShowcase
  },
  {
    id: 'atable-neural',
    name: 'ATABLE NEURAL 2077',
    tagline: 'AI-Native Security Orchestration',
    category: 'Cybersecurity / AI',
    value: '$1.8B',
    component: AtableNeuralShowcase
  },
  {
    id: 'nimbus-biome',
    name: 'NIMBUS BIOME™',
    tagline: 'Luxury Biophilic Terrariums',
    category: 'Biophilic Design / IoT',
    value: '$845M',
    component: NimbusBiomeShowcase
  },
  {
    id: 'oto',
    name: 'OTO',
    tagline: 'AI Relationship CRM',
    category: 'CRM / AI Automation',
    value: '$680M',
    component: OtoShowcase
  },
  {
    id: 'lensstorm',
    name: 'LENSSTORM',
    tagline: 'Invisible AR for Eyewear',
    category: 'AR Wearables / Optics',
    value: 'CONCEPT',
    component: LensstormShowcase
  },
  {
    id: 'hflo',
    name: 'HFLO',
    tagline: 'Solar Holographic Flowers',
    category: 'Holographic Display / Sustainability',
    value: 'CONCEPT',
    component: HfloShowcase
  },
  {
    id: 'gcraft',
    name: 'Gcraft',
    tagline: 'Gift Card Secondary Market',
    category: 'Fintech / Digital Payments',
    value: 'CONCEPT',
    component: GcraftShowcase
  },
  {
    id: 'hearb-assist',
    name: 'HEARb ASSIST',
    tagline: 'Assistive Tech for Visually Impaired',
    category: 'Assistive Technology / Healthcare',
    value: 'CONCEPT',
    component: HearbAssistShowcase
  },
  {
    id: 'inect',
    name: 'INECT',
    tagline: 'Immersive Live Event Experiences',
    category: 'Live Streaming / Event Tech',
    value: 'CONCEPT',
    component: InectShowcase
  },
  {
    id: 'mparker',
    name: 'Mparker',
    tagline: 'Integrated Urban Mobility Hubs',
    category: 'Smart City / Mobility',
    value: 'CONCEPT',
    component: MparkerShowcase
  }
];

export default function App() {
  const [activeView, setActiveView] = useState<'home' | 'venture'>('home');
  const [selectedVenture, setSelectedVenture] = useState<string | null>(null);
  const [deviceView] = useState<'desktop' | 'tablet' | 'mobile'>('desktop');
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  // Parallax scroll effects
  const { scrollY } = useScroll();
  const heroY = useTransform(scrollY, [0, 500], [0, 150]);
  const heroOpacity = useTransform(scrollY, [0, 300], [1, 0]);
  const heroScale = useTransform(scrollY, [0, 300], [1, 0.95]);

  const handleVentureClick = (ventureId: string) => {
    setSelectedVenture(ventureId);
    setActiveView('venture');
    setMobileMenuOpen(false);
    window.scrollTo({ top: 0, behavior: 'auto' });
  };

  const handleBackToHome = () => {
    setActiveView('home');
    setSelectedVenture(null);
    window.scrollTo({ top: 0, behavior: 'auto' });
  };

  const selectedVentureData = ventures.find(v => v.id === selectedVenture);
  const SelectedComponent = selectedVentureData?.component;
  const currentVentureIndex = ventures.findIndex(v => v.id === selectedVenture);

  const handlePreviousVenture = () => {
    if (currentVentureIndex > 0) {
      const prevVenture = ventures[currentVentureIndex - 1];
      setSelectedVenture(prevVenture.id);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  const handleNextVenture = () => {
    if (currentVentureIndex < ventures.length - 1) {
      const nextVenture = ventures[currentVentureIndex + 1];
      setSelectedVenture(nextVenture.id);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  // Keyboard shortcuts
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      // Only handle shortcuts in venture view
      if (activeView !== 'venture') return;

      switch (e.key) {
        case 'Escape':
          handleBackToHome();
          break;
        case 'ArrowLeft':
          if (e.altKey && currentVentureIndex > 0) {
            handlePreviousVenture();
          }
          break;
        case 'ArrowRight':
          if (e.altKey && currentVentureIndex < ventures.length - 1) {
            handleNextVenture();
          }
          break;
        case 'h':
        case 'H':
          if (e.ctrlKey || e.metaKey) {
            e.preventDefault();
            handleBackToHome();
          }
          break;
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [activeView, currentVentureIndex]);

  return (
    <div className="min-h-screen bg-black text-white overflow-x-hidden relative">
      {/* Breathing Tile Background */}
      <BreathingTileBackground />

      <div className="relative z-10">
      <AnimatePresence mode="wait">
        {activeView === 'home' ? (
          <motion.div
            key="home"
            {...PAGE_TRANSITIONS.fade}
          >
            {/* Header */}
            <header className="fixed top-0 left-0 right-0 z-50 glass-strong shadow-2xl shadow-sky-500/5">
              <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
                <motion.div 
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={createTransition('normal', 'diamond', 0.1)}
                  className="flex items-center gap-3"
                >
                  <motion.div 
                    className="w-8 h-8 bg-gradient-to-br from-sky-500 to-blue-600 rounded-lg flex items-center justify-center relative"
                    whileHover={{ rotate: 180, scale: 1.1 }}
                    transition={{ duration: DURATION.slow, ease: EASING.diamond }}
                  >
                    <Zap className="h-4 w-4 text-white" />
                    <div className="absolute inset-0 bg-gradient-to-br from-sky-500 to-blue-600 rounded-lg blur-md opacity-40" />
                  </motion.div>
                  <div>
                    <h1 className="text-lg font-black tracking-wider">WXZA</h1>
                  </div>
                </motion.div>

                {/* Desktop Navigation */}
                <nav className="hidden md:flex items-center gap-8">
                  <motion.a 
                    href="#ventures" 
                    className="text-xs uppercase tracking-widest text-gray-500 hover:text-white transition-colors"
                    whileHover={{ y: -2 }}
                    transition={{ duration: DURATION.fast }}
                  >
                    Ventures
                  </motion.a>
                  <motion.a 
                    href="mailto:wxzata@proton.me" 
                    className="text-xs uppercase tracking-widest text-gray-500 hover:text-white transition-colors"
                    whileHover={{ y: -2 }}
                    transition={{ duration: DURATION.fast }}
                  >
                    Contact
                  </motion.a>
                  <Badge className="bg-sky-500/10 text-sky-300 border border-sky-500/20 text-xs">2025</Badge>
                </nav>

                {/* Mobile Menu Button */}
                <motion.button 
                  className="md:hidden"
                  onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                  whileTap={{ scale: 0.9 }}
                >
                  {mobileMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
                </motion.button>
              </div>

              {/* Mobile Menu */}
              <AnimatePresence>
                {mobileMenuOpen && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: 'auto', opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: DURATION.normal, ease: EASING.diamond }}
                    className="md:hidden border-t border-white/5 bg-black/80"
                  >
                    <nav className="px-6 py-4 space-y-3">
                      <a href="#ventures" className="block text-xs uppercase tracking-widest text-gray-500 hover:text-white transition-colors">Ventures</a>
                      <a href="mailto:wxzata@proton.me" className="block text-xs uppercase tracking-widest text-gray-500 hover:text-white transition-colors">Contact</a>
                    </nav>
                  </motion.div>
                )}
              </AnimatePresence>
            </header>

            {/* Hero Section */}
            <motion.section 
              className="min-h-screen flex items-center justify-center px-6 pt-24 pb-12"
              style={{ y: heroY, opacity: heroOpacity, scale: heroScale }}
            >
              <div className="max-w-6xl mx-auto text-center">
                <motion.div
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={createTransition('normal', 'diamond', 0.2)}
                  className="mb-6"
                >
                  <Badge className="bg-sky-500/10 text-sky-300 border border-sky-500/20 mb-6">
                    OUR VALUE: #X∞
                  </Badge>
                </motion.div>

                <motion.h2
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={createTransition('slow', 'diamond', 0.3)}
                  className="text-6xl md:text-8xl font-black mb-6 bg-gradient-to-r from-sky-200 via-blue-200 to-slate-200 bg-clip-text text-transparent"
                >
                  WXZA
                </motion.h2>

                <motion.p
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={createTransition('normal', 'diamond', 0.4)}
                  className="text-xl md:text-2xl text-gray-400 mb-8 max-w-3xl mx-auto"
                >
                  "If two opposites can be right, how many opposites can be at the same time?"
                </motion.p>

                <motion.p
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={createTransition('normal', 'diamond', 0.5)}
                  className="text-2xl md:text-3xl font-bold mb-12"
                >
                  SO WE CHOOSE OUR VALUE
                </motion.p>

                <motion.div
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={createTransition('normal', 'diamond', 0.6)}
                  className="flex flex-col sm:flex-row gap-4 justify-center mb-12"
                >
                  <motion.div whileHover={INTERACTIONS.buttonHover} whileTap={INTERACTIONS.buttonTap}>
                    <Button size="lg" className="bg-gradient-to-r from-sky-600 to-blue-700 hover:from-sky-500 hover:to-blue-600">
                      <Rocket className="mr-2 h-5 w-5" />
                      Explore Ventures
                    </Button>
                  </motion.div>
                  <motion.div whileHover={INTERACTIONS.buttonHover} whileTap={INTERACTIONS.buttonTap}>
                    <Button size="lg" variant="outline" className="border-sky-500/50 text-sky-300 hover:bg-sky-500/10">
                      <Target className="mr-2 h-5 w-5" />
                      Partner With Us
                    </Button>
                  </motion.div>
                </motion.div>

                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={createTransition('normal', 'smooth', 0.8)}
                  className="flex items-center justify-center gap-2 text-gray-500"
                >
                  <motion.div
                    animate={{ y: [0, 8, 0] }}
                    transition={{ duration: 2, repeat: Infinity, ease: EASING.smooth }}
                    className="flex flex-col items-center gap-2"
                  >
                    <span className="text-sm">Scroll to Explore</span>
                    <ChevronDown className="h-4 w-4" />
                  </motion.div>
                </motion.div>
              </div>
            </motion.section>

            {/* The Awakening Section */}
            <section className="py-24 px-6">
              <div className="max-w-6xl mx-auto">
                <motion.div
                  initial="initial"
                  whileInView="animate"
                  viewport={SCROLL_ANIMATIONS.viewport}
                  variants={VARIANTS.fadeInUp}
                  transition={createTransition('normal', 'diamond')}
                  className="text-center mb-16"
                >
                  <Badge className="bg-sky-500/10 text-sky-300 border border-sky-500/20 mb-4 backdrop-blur-xl shadow-lg shadow-sky-500/10">
                    SECTION 01
                  </Badge>
                  <h3 className="text-5xl font-black mb-4 drop-shadow-2xl">The Awakening</h3>
                  <p className="text-xl text-gray-400">Where contradiction becomes capability</p>
                </motion.div>

                <motion.div
                  initial="initial"
                  whileInView="animate"
                  viewport={SCROLL_ANIMATIONS.viewport}
                  variants={VARIANTS.scaleIn}
                  transition={createTransition('slow', 'diamond', 0.2)}
                  className="space-y-6 text-lg text-gray-300 max-w-4xl mx-auto glass-light rounded-3xl p-8 shadow-2xl shadow-sky-500/5"
                >
                  <p>
                    If two opposites can be right, how many can be at the same time? We discovered none of them are right nor wrong. This paradox is not a problem—it's the foundation of breakthrough innovation.
                  </p>
                  <p>
                    WXZA exists because the only response is to choose your value. We engineer systems where opposites coexist: quantum ↔ classical, artificial ↔ biological, centralized ↔ distributed. Contradictions become assets.
                  </p>
                  <p>
                    We don't resolve paradoxes. We architect them into breakthrough ventures. Early-stage startup. Eight domains. One philosophy: choose your value.
                  </p>
                </motion.div>

                {/* Stats */}
                <motion.div
                  initial="initial"
                  whileInView="animate"
                  viewport={SCROLL_ANIMATIONS.viewport}
                  variants={VARIANTS.staggerContainer}
                  className="grid grid-cols-2 md:grid-cols-4 gap-6 mt-16"
                >
                  {[
                    { label: 'Status', value: 'STARTUP' },
                    { label: 'Established', value: '2023' },
                    { label: 'Location', value: 'OTTAWA' },
                    { label: 'Domains', value: '8' }
                  ].map((stat, idx) => (
                    <motion.div 
                      key={idx} 
                      variants={VARIANTS.staggerItem}
                      transition={createTransition('normal', 'diamond', getStaggerDelay(idx, 'small'))}
                      whileHover={INTERACTIONS.subtleLift}
                      className="glass-light glass-hover rounded-2xl p-6 text-center group shadow-xl shadow-sky-500/5"
                    >
                      <div className="text-2xl font-black text-white mb-2 group-hover:text-sky-300 transition-colors">{stat.value}</div>
                      <div className="text-[10px] text-gray-600 uppercase tracking-widest">{stat.label}</div>
                    </motion.div>
                  ))}
                </motion.div>
              </div>
            </section>

            {/* The Philosophy Section */}
            <section className="py-24 px-6">
              <div className="max-w-6xl mx-auto">
                <motion.div
                  initial="initial"
                  whileInView="animate"
                  viewport={SCROLL_ANIMATIONS.viewport}
                  variants={VARIANTS.fadeInUp}
                  transition={createTransition('normal', 'diamond')}
                  className="text-center mb-16"
                >
                  <Badge className="bg-sky-500/10 text-sky-300 border border-sky-500/20 mb-4 backdrop-blur-xl shadow-lg shadow-sky-500/10">
                    SECTION 02
                  </Badge>
                  <h3 className="text-5xl font-black mb-4 drop-shadow-2xl">The Philosophy</h3>
                  <p className="text-xl text-gray-400">Engineering paradoxes into possibilities</p>
                </motion.div>

                <motion.div
                  initial="initial"
                  whileInView="animate"
                  viewport={SCROLL_ANIMATIONS.viewport}
                  variants={VARIANTS.scaleIn}
                  transition={createTransition('slow', 'diamond', 0.2)}
                  className="space-y-6 text-lg text-gray-300 max-w-4xl mx-auto glass-light rounded-3xl p-8 shadow-2xl shadow-sky-500/5"
                >
                  <p>
                    Our approach transcends traditional binary thinking. We build systems where quantum and classical coexist, where artificial and biological merge, where centralized and distributed complement rather than conflict.
                  </p>
                  <p>
                    Each venture in our portfolio embodies this philosophy—they don't just solve problems, they reframe entire categories by embracing inherent contradictions as sources of innovation.
                  </p>
                  <p>
                    This is how we choose our value: by refusing to choose between opposites and instead engineering their synthesis.
                  </p>
                </motion.div>
              </div>
            </section>

            {/* Venture Portfolio Section */}
            <section id="ventures" className="py-24 px-6">
              <div className="max-w-7xl mx-auto">
                <motion.div
                  initial="initial"
                  whileInView="animate"
                  viewport={SCROLL_ANIMATIONS.viewport}
                  variants={VARIANTS.fadeInUp}
                  transition={createTransition('normal', 'diamond')}
                  className="text-center mb-16"
                >
                  <Badge className="bg-sky-500/10 text-sky-300 border border-sky-500/20 mb-4 backdrop-blur-xl shadow-lg shadow-sky-500/10">
                    SECTION 03
                  </Badge>
                  <h3 className="text-5xl font-black mb-4 drop-shadow-2xl">Venture Portfolio</h3>
                  <p className="text-xl text-gray-400">Where we choose value → Early-stage concepts engineering contradictions into innovation</p>
                </motion.div>

                <motion.div 
                  className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
                  initial="initial"
                  whileInView="animate"
                  viewport={SCROLL_ANIMATIONS.viewport}
                  variants={VARIANTS.staggerContainer}
                >
                  {ventures.map((venture, idx) => {
                    const isFlagship = (venture as any).flagship;
                    return (
                      <motion.div
                        key={venture.id}
                        variants={VARIANTS.staggerItem}
                        transition={createTransition('normal', 'diamond', getStaggerDelay(idx, 'tiny'))}
                        whileHover={{ y: -8, scale: 1.01 }}
                        whileTap={{ scale: 0.98 }}
                        className={`liquid-border rounded-2xl p-6 cursor-pointer group relative overflow-hidden ${
                          isFlagship
                            ? 'glass-strong md:col-span-2 lg:col-span-3 border border-sky-400/30 shadow-2xl shadow-sky-500/10'
                            : 'glass-light glass-hover-static'
                        }`}
                        onClick={() => handleVentureClick(venture.id)}
                      >
                        {isFlagship && (
                          <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-sky-400/60 to-transparent" />
                        )}
                        <div className="relative z-10">
                          {isFlagship && (
                            <Badge className="bg-sky-500/20 text-sky-200 border border-sky-400/40 mb-4 text-[10px] tracking-[0.3em] uppercase">
                              Flagship
                            </Badge>
                          )}
                          <div className="flex items-start justify-between mb-4">
                            <div className="flex-1">
                              <h4 className={`font-black mb-1 group-hover:text-sky-300 transition-colors tracking-wide ${isFlagship ? 'text-2xl' : ''}`}>
                                {venture.name}
                              </h4>
                              <p className={`text-gray-500 ${isFlagship ? 'text-sm' : 'text-xs'}`}>{venture.tagline}</p>
                            </div>
                          </div>

                          <div className="space-y-3">
                            <div className="text-[10px] uppercase tracking-widest text-gray-600">{venture.category}</div>
                            <div className="flex items-center justify-between pt-3 border-t border-white/5">
                              <span className="text-[10px] uppercase tracking-widest text-gray-600">
                                {isFlagship ? 'Status' : 'Value'}
                              </span>
                              <span className={`font-bold ${isFlagship ? 'text-sky-200' : 'text-sky-300'}`}>
                                {venture.value}
                              </span>
                            </div>
                          </div>

                          <motion.div
                            className="mt-4 pt-4 border-t border-white/5 flex items-center justify-between text-xs text-gray-600 group-hover:text-sky-300 transition-colors"
                            initial={{ x: 0 }}
                            whileHover={{ x: 4 }}
                            transition={{ duration: DURATION.fast }}
                          >
                            <span className="uppercase tracking-widest">
                              {isFlagship ? 'Enter the Divine Machine' : 'View'}
                            </span>
                            <span>→</span>
                          </motion.div>
                        </div>
                      </motion.div>
                    );
                  })}
                </motion.div>
              </div>
            </section>

            {/* Footer */}
            <footer className="py-12 px-6 border-t border-white/10">
              <div className="max-w-7xl mx-auto space-y-6">
                <div className="flex flex-col md:flex-row items-center justify-between gap-6">
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 bg-gradient-to-br from-sky-600 to-blue-600 rounded-lg flex items-center justify-center">
                      <Zap className="h-5 w-5 text-white" />
                    </div>
                    <div>
                      <div className="font-bold">WXZA Inc.</div>
                      <div className="text-xs text-gray-500">Architecting Contradictions into Innovation</div>
                    </div>
                  </div>

                  <div className="flex items-center gap-6 text-sm text-gray-500">
                    <a href="/ethics" className="hover:text-sky-300 transition-colors">Ethics</a>
                    <a href="#" className="hover:text-sky-300 transition-colors">Privacy</a>
                    <a href="#" className="hover:text-sky-300 transition-colors">Terms</a>
                    <a href="mailto:wxzata@proton.me" className="hover:text-sky-300 transition-colors">Contact</a>
                  </div>

                  <div className="text-sm text-gray-500">
                    © 2025 WXZA Inc. All rights reserved.
                  </div>
                </div>

                {/* The architecture listens. */}
                <div className="pt-6 border-t border-white/5 text-center">
                  <p className="text-[10px] italic tracking-[0.3em] text-gray-700 select-none">
                    the architecture listens
                  </p>
                </div>
              </div>
            </footer>
          </motion.div>
        ) : (
          <motion.div
            key="venture"
            {...PAGE_TRANSITIONS.fade}
            className="min-h-screen"
          >
            {/* Venture Header */}
            <motion.div 
              className="fixed top-0 left-0 right-0 z-50 bg-black/40 backdrop-blur-xl border-b border-white/10"
              initial={{ y: -100 }}
              animate={{ y: 0 }}
              transition={createTransition('normal', 'diamond')}
            >
              <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
                <motion.div whileHover={INTERACTIONS.buttonHover} whileTap={INTERACTIONS.buttonTap}>
                  <Button
                    variant="ghost"
                    onClick={handleBackToHome}
                    className="text-sky-300 hover:text-sky-200"
                  >
                    ← Back to Portfolio
                  </Button>
                </motion.div>

                {selectedVentureData && (
                  <motion.div 
                    className="text-center"
                    initial={{ opacity: 0, y: -20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={createTransition('normal', 'diamond', 0.2)}
                  >
                    <h2 className="font-bold">{selectedVentureData.name}</h2>
                    <p className="text-xs text-gray-500">{selectedVentureData.tagline}</p>
                  </motion.div>
                )}

                <div className="w-24"></div>
              </div>
            </motion.div>

            {/* Prototype Content */}
            <motion.div 
              className="pt-20"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={createTransition('normal', 'smooth', 0.3)}
            >
              {SelectedComponent && <SelectedComponent 
                deviceView={deviceView}
                onBackToHome={handleBackToHome}
                onPreviousVenture={handlePreviousVenture}
                onNextVenture={handleNextVenture}
                hasNextVenture={currentVentureIndex < ventures.length - 1}
                hasPreviousVenture={currentVentureIndex > 0}
                currentVentureIndex={currentVentureIndex}
                totalVentures={ventures.length}
              />}
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
      </div>

      {/* Scroll to Top Button */}
      <ScrollToTop />

      {/* Keyboard Shortcuts Panel */}
      <KeyboardShortcutsPanel />
    </div>
  );
}