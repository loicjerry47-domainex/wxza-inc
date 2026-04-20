import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "motion/react";
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";
import { Button } from "../ui/button";
import { Badge } from "../ui/badge";
import { ImageWithFallback } from "../figma/ImageWithFallback";
import { LiveTicker } from "./shared/LiveTicker";
import { 
  Glasses,
  Calendar,
  Radio,
  Eye,
  Sparkles,
  Clock,
  Play,
  Pause,
  Volume2,
  VolumeX,
  MessageSquare,
  Save,
  Share2,
  TrendingUp,
  Globe,
  Users,
  Zap,
  Target,
  DollarSign,
  BarChart3,
  Settings,
  Wifi,
  Signal,
  Maximize,
  Download,
  Award,
  CheckCircle,
  AlertCircle,
  Activity,
  Layers,
  Video,
  Satellite,
  Camera
} from "lucide-react";

interface InectPrototypeProps {
  deviceView: 'desktop' | 'tablet' | 'mobile';
}

export function InectPrototype({ deviceView }: InectPrototypeProps) {
  const [activeSection, setActiveSection] = useState<'hero' | 'viewer' | 'glasses' | 'calendar' | 'vision'>('hero');
  const [selectedDrone, setSelectedDrone] = useState(1);
  const [isPlaying, setIsPlaying] = useState(true);
  const [volume, setVolume] = useState(75);
  const [narrationOn, setNarrationOn] = useState(false);
  const [selectedEvent, setSelectedEvent] = useState<any>(null);
  const [liveViewers, setLiveViewers] = useState(247891);
  const [eventsStreamed, setEventsStreamed] = useState(3847);

  const isMobile = deviceView === 'mobile';
  const isTablet = deviceView === 'tablet';

  // Simulate real-time data
  useEffect(() => {
    const interval = setInterval(() => {
      setLiveViewers(prev => prev + Math.floor(Math.random() * 100));
      setEventsStreamed(prev => prev + (Math.random() > 0.95 ? 1 : 0));
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  const upcomingEvents = [
    {
      id: 1,
      name: 'New Year\'s Eve Fireworks',
      location: 'Sydney Harbour',
      date: 'Dec 31, 2024',
      time: '11:59 PM',
      countdown: '33 days',
      drones: 12,
      channels: 3,
      price: '$49',
      duration: '45 min',
      category: 'Fireworks',
      status: 'scheduled',
      views: ['Drone 360°', 'Satellite', 'Ground']
    },
    {
      id: 2,
      name: 'Super Bowl LVIII Halftime',
      location: 'Las Vegas',
      date: 'Feb 11, 2024',
      time: '8:30 PM ET',
      countdown: '75 days',
      drones: 8,
      channels: 2,
      price: '$79',
      duration: '30 min',
      category: 'Sports',
      status: 'scheduled',
      views: ['Drone', 'Ground']
    },
    {
      id: 3,
      name: 'Coachella Opening Night',
      location: 'Indio, California',
      date: 'Apr 12, 2024',
      time: '7:00 PM PT',
      countdown: '135 days',
      drones: 15,
      channels: 3,
      price: '$99',
      duration: '6 hours',
      category: 'Music',
      status: 'available',
      views: ['Drone 360°', 'Satellite', 'Ground', 'Backstage']
    },
  ];

  const droneViews = [
    { id: 1, name: 'Drone 1 - North', angle: 'Front Center', altitude: '200ft', distance: '500ft', quality: '8K' },
    { id: 2, name: 'Drone 2 - South', angle: 'Side Left', altitude: '180ft', distance: '450ft', quality: '8K' },
    { id: 3, name: 'Drone 3 - East', angle: 'Side Right', altitude: '220ft', distance: '480ft', quality: '8K' },
    { id: 4, name: 'Drone 4 - West', angle: 'Rear View', altitude: '190ft', distance: '520ft', quality: '8K' },
    { id: 5, name: 'Satellite', angle: 'Aerial Top', altitude: 'Orbit', distance: 'Space', quality: '4K' },
    { id: 6, name: 'Ground Cam', angle: 'Audience POV', altitude: 'Ground', distance: '0ft', quality: '8K' },
  ];

  const glassesSpecs = [
    {
      model: 'INECT Vision Pro',
      design: 'Sleek Minimalist',
      features: ['8K OLED Display', 'Bone Conduction Audio', 'Voice Control', '6hr Battery'],
      color: 'Matte Black',
      price: '$599',
      image: 'from-gray-900 to-black'
    },
    {
      model: 'INECT Sport',
      design: 'Lightweight Active',
      features: ['4K Display', 'Waterproof IP68', 'Touch Controls', '8hr Battery'],
      color: 'Carbon Fiber',
      price: '$399',
      image: 'from-blue-900 to-gray-900'
    },
    {
      model: 'INECT Classic',
      design: 'Timeless Elegant',
      features: ['4K Display', 'Noise Cancelling', 'Gesture Control', '5hr Battery'],
      color: 'Brushed Gold',
      price: '$499',
      image: 'from-amber-900 to-orange-900'
    },
  ];

  const subscriptionTiers = [
    {
      name: 'Starter',
      price: '$19',
      period: '/month',
      events: '3 events/year',
      features: ['1080p Streaming', '2 Drone Views', 'Basic Audio', '24hr Replay'],
      popular: false
    },
    {
      name: 'Premium',
      price: '$49',
      period: '/month',
      events: '10 events/year',
      features: ['8K Streaming', 'All Drone Views', 'Spatial Audio', '7-day Replay', 'Satellite View'],
      popular: true
    },
    {
      name: 'Ultimate',
      price: '$99',
      period: '/month',
      events: 'Unlimited',
      features: ['8K HDR', 'All Views + Backstage', 'Dolby Atmos', 'Unlimited Replay', 'Priority Support', 'Early Access'],
      popular: false
    },
  ];

  const navigationTabs = [
    { id: 'hero', label: 'Home', icon: Sparkles },
    { id: 'viewer', label: 'Live Viewer', icon: Eye },
    { id: 'glasses', label: 'Smart Glasses', icon: Glasses },
    { id: 'calendar', label: 'Events', icon: Calendar },
    { id: 'vision', label: '$600M Vision', icon: TrendingUp },
  ];

  return (
    <div className="h-full text-white overflow-auto relative">
      <div className="relative z-10">
        {/* Header */}
        <div className="glass-strong border-b border-white/5 sticky top-0 z-50">
          <div className="flex items-center justify-between p-4">
            <div className="flex items-center gap-4">
              <div className="relative">
                <div className="w-14 h-14 bg-gradient-to-br from-cyan-500 via-blue-500 to-orange-500 rounded-2xl p-3 shadow-xl">
                  <Glasses className="h-8 w-8 text-white" />
                </div>
                <motion.div 
                  className="absolute inset-0 bg-cyan-500 rounded-2xl blur-xl opacity-50"
                  animate={{ scale: [1, 1.2, 1], opacity: [0.3, 0.5, 0.3] }}
                  transition={{ duration: 2, repeat: Infinity }}
                />
              </div>
              <div>
                <h1 className="text-2xl font-black bg-gradient-to-r from-cyan-400 via-blue-400 to-orange-400 bg-clip-text text-transparent tracking-tight">
                  INECT
                </h1>
                <p className="text-sm text-cyan-300 font-bold tracking-wide">SEE EVENTS, YOUR WAY</p>
              </div>
            </div>
            
            {!isMobile && (
              <div className="flex items-center gap-6">
                <div className="text-right">
                  <div className="text-xs text-cyan-300/80 font-bold uppercase tracking-wide">Live Viewers</div>
                  <div className="text-xl font-black text-cyan-400">{liveViewers.toLocaleString()}</div>
                </div>
                <div className="text-right">
                  <div className="text-xs text-orange-300/80 font-bold uppercase tracking-wide">Events Streamed</div>
                  <div className="text-xl font-black text-orange-400">{eventsStreamed.toLocaleString()}</div>
                </div>
                <Badge className="bg-gradient-to-r from-cyan-500/20 to-orange-500/20 text-cyan-300 border border-cyan-500/40 px-4 py-2 font-black uppercase tracking-wide">
                  <Zap className="h-3 w-3 mr-2" />
                  8K Live
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
                      ? 'bg-gradient-to-r from-cyan-600 via-blue-600 to-orange-600 text-white shadow-lg shadow-cyan-500/50 font-black' 
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
            caption="BROADCAST LIVE"
            pulseColor="bg-rose-400"
            metrics={[
              { label: 'Concurrent Viewers', base: 287420, drift: 850, min: 240000, max: 360000, accent: 'text-rose-300' },
              { label: 'Streams Active', base: 126, drift: 1, min: 90, max: 180, accent: 'text-pink-300' },
              { label: 'Avg Bitrate', base: 28.4, drift: 0.6, min: 24, max: 34, suffix: ' Mbps', decimals: 1, accent: 'text-amber-300' },
              { label: 'Tickets Sold', base: 41200, drift: 3, counter: true, accent: 'text-emerald-300' },
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
                    src="https://images.unsplash.com/photo-1595567818311-57a0736507d8?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxmaXJld29ya3MlMjBuaWdodCUyMHNreSUyMGNlbGVicmF0aW9ufGVufDF8fHx8MTc2NDI4MDM1OXww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral"
                    alt="Fireworks"
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-r from-cyan-900/95 via-blue-900/90 to-orange-900/95" />
                  
                  {/* Floating Drone Icons */}
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
                        x: [`${Math.random() * 100}%`, `${Math.random() * 100}%`],
                        opacity: [0, 1, 1, 0],
                      }}
                      transition={{
                        duration: Math.random() * 10 + 10,
                        repeat: Infinity,
                        delay: Math.random() * 5,
                      }}
                    >
                      {i % 2 === 0 ? (
                        <Radio className="h-6 w-6 text-cyan-400/60" />
                      ) : (
                        <Camera className="h-6 w-6 text-orange-400/60" />
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
                      <h1 className="text-6xl md:text-7xl font-black mb-6 bg-gradient-to-r from-cyan-300 via-blue-300 to-orange-300 bg-clip-text text-transparent leading-tight">
                        EXPERIENCE EVENTS<br />FROM ABOVE THE CROWD
                      </h1>
                    </motion.div>
                    
                    <motion.p
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.8, delay: 0.2 }}
                      className="text-2xl text-cyan-200 mb-8 font-medium leading-relaxed"
                    >
                      Smart glasses. Drone networks. <span className="text-white font-bold">8K live views</span> from any angle.<br className="hidden md:block" />
                      Watch fireworks, concerts, and sports like never before.
                    </motion.p>

                    <motion.div
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.8, delay: 0.4 }}
                      className="flex flex-wrap gap-4 justify-center mb-8"
                    >
                      <Button 
                        size="lg" 
                        onClick={() => setActiveSection('viewer')}
                        className="bg-gradient-to-r from-cyan-600 via-blue-600 to-orange-600 hover:from-cyan-500 hover:via-blue-500 hover:to-orange-500 text-white font-black px-8 py-6 text-lg shadow-2xl shadow-cyan-500/50 transition-colors duration-300 hover:scale-105"
                      >
                        <Eye className="h-6 w-6 mr-3" />
                        Try Live Viewer
                      </Button>
                      <Button 
                        size="lg" 
                        variant="outline"
                        onClick={() => setActiveSection('vision')}
                        className="border-2 border-cyan-400/50 text-cyan-200 hover:bg-cyan-500/20 font-black px-8 py-6 text-lg backdrop-blur-xl"
                      >
                        <TrendingUp className="h-6 w-6 mr-3" />
                        $600M Vision
                      </Button>
                    </motion.div>

                    <motion.div
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{ duration: 0.8, delay: 0.6 }}
                      className="flex flex-wrap gap-8 justify-center"
                    >
                      {[
                        { label: '12 Drones', sublabel: 'Per Event', icon: Radio },
                        { label: '8K Quality', sublabel: 'Ultra HD', icon: Eye },
                        { label: '<50ms', sublabel: 'Latency', icon: Zap },
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

              {/* How It Works */}
              <div className="p-6 md:p-12 max-w-7xl mx-auto">
                <div className="text-center mb-12">
                  <h2 className="text-4xl md:text-5xl font-black mb-4 bg-gradient-to-r from-cyan-400 to-orange-400 bg-clip-text text-transparent">
                    How INECT Works
                  </h2>
                  <p className="text-xl text-cyan-200/80 max-w-3xl mx-auto">
                    Revolutionary drone networks meet smart glasses for the ultimate viewing experience
                  </p>
                </div>

                <div className={`grid gap-8 ${isMobile ? 'grid-cols-1' : isTablet ? 'grid-cols-2' : 'grid-cols-3'}`}>
                  {[
                    {
                      icon: Radio,
                      step: '01',
                      title: 'Drone Swarm Deployment',
                      description: '12+ drones circle events at safe distances, capturing 8K footage from every angle. Collision avoidance ensures safety.',
                      gradient: 'from-cyan-500 to-blue-500'
                    },
                    {
                      icon: Glasses,
                      step: '02',
                      title: 'Smart Glasses Activate',
                      description: 'Your INECT glasses automatically activate when events start. Countdown timer on the lens keeps you ready.',
                      gradient: 'from-blue-500 to-indigo-500'
                    },
                    {
                      icon: Wifi,
                      step: '03',
                      title: 'Ultra-Low Latency Streaming',
                      description: '5G transmission delivers <50ms latency. Switch between drones, satellite, and ground views instantly.',
                      gradient: 'from-indigo-500 to-purple-500'
                    },
                    {
                      icon: Eye,
                      step: '04',
                      title: 'Multi-Perspective Views',
                      description: 'Choose your angle: drone 360°, satellite top-down, or ground-level POV. Experience it your way.',
                      gradient: 'from-purple-500 to-pink-500'
                    },
                    {
                      icon: Volume2,
                      step: '05',
                      title: 'Immersive Audio',
                      description: 'Bone conduction audio with noise cancellation. Voice narration available for accessibility.',
                      gradient: 'from-pink-500 to-rose-500'
                    },
                    {
                      icon: Save,
                      step: '06',
                      title: 'Save & Replay',
                      description: 'After each event, save recordings to your library. Relive the magic anytime, anywhere.',
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
                      <Card className="bg-gradient-to-br from-black/60 to-black/40 border-cyan-500/20 hover:border-cyan-400/50 transition-colors duration-300 hover:shadow-2xl hover:shadow-cyan-500/20 h-full">
                        <CardContent className="p-8">
                          <div className="flex items-center gap-4 mb-6">
                            <div className={`w-16 h-16 rounded-2xl bg-gradient-to-br ${feature.gradient} p-4 shadow-lg flex items-center justify-center`}>
                              <feature.icon className="h-8 w-8 text-white" />
                            </div>
                            <div className="text-5xl font-black text-cyan-400/30">{feature.step}</div>
                          </div>
                          <h3 className="text-2xl font-black mb-3 text-white">{feature.title}</h3>
                          <p className="text-cyan-200/70 leading-relaxed">{feature.description}</p>
                        </CardContent>
                      </Card>
                    </motion.div>
                  ))}
                </div>

                {/* Event Highlights */}
                <div className="mt-20">
                  <div className="text-center mb-12">
                    <h2 className="text-4xl font-black mb-4 text-white">Upcoming Events</h2>
                    <p className="text-xl text-cyan-200/80">Reserve your spot for the world's biggest celebrations</p>
                  </div>

                  <div className={`grid gap-6 ${isMobile ? 'grid-cols-1' : 'grid-cols-3'}`}>
                    {upcomingEvents.map((event, index) => (
                      <motion.div
                        key={event.id}
                        initial={{ opacity: 0, scale: 0.9 }}
                        whileInView={{ opacity: 1, scale: 1 }}
                        viewport={{ once: true }}
                        transition={{ delay: index * 0.15 }}
                        whileHover={{ y: -8 }}
                      >
                        <Card className="bg-gradient-to-br from-black/60 to-black/40 border-cyan-500/30 hover:border-cyan-400 transition-colors duration-300 h-full">
                          <CardContent className="p-6">
                            <Badge className="mb-4 bg-orange-500/20 text-orange-400 border-orange-500/40 font-bold">
                              {event.category}
                            </Badge>
                            <h3 className="text-xl font-black text-white mb-2">{event.name}</h3>
                            <p className="text-sm text-cyan-300 mb-4">{event.location}</p>
                            
                            <div className="space-y-2 mb-4">
                              <div className="flex items-center gap-2 text-sm text-cyan-200">
                                <Calendar className="h-4 w-4 text-cyan-400" />
                                {event.date} at {event.time}
                              </div>
                              <div className="flex items-center gap-2 text-sm text-cyan-200">
                                <Clock className="h-4 w-4 text-cyan-400" />
                                Countdown: {event.countdown}
                              </div>
                              <div className="flex items-center gap-2 text-sm text-cyan-200">
                                <Radio className="h-4 w-4 text-cyan-400" />
                                {event.drones} drones • {event.channels} channels
                              </div>
                            </div>

                            <div className="flex items-center justify-between">
                              <div className="text-2xl font-black text-cyan-400">{event.price}</div>
                              <Button 
                                size="sm"
                                className="bg-gradient-to-r from-cyan-600 to-blue-600 hover:from-cyan-500 hover:to-blue-500 font-black"
                                onClick={() => {
                                  setSelectedEvent(event);
                                  setActiveSection('calendar');
                                }}
                              >
                                Reserve
                              </Button>
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

        {/* Live Viewer Section */}
        {activeSection === 'viewer' && (
          <AnimatePresence mode="wait">
            <motion.div
              key="viewer"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="p-6 md:p-12 max-w-7xl mx-auto"
            >
              <div className="text-center mb-12">
                <h2 className="text-5xl font-black mb-4 bg-gradient-to-r from-cyan-400 via-blue-400 to-orange-400 bg-clip-text text-transparent">
                  Live Event Viewer
                </h2>
                <p className="text-xl text-cyan-200/80 max-w-3xl mx-auto">
                  Experience multi-angle streaming powered by drone swarms
                </p>
              </div>

              {/* Main Video Display */}
              <Card className="bg-gradient-to-br from-black/60 to-black/40 border-cyan-500/30 mb-8 overflow-hidden">
                <div className="aspect-video bg-gradient-to-br from-cyan-900/50 via-blue-900/50 to-orange-900/50 relative">
                  <ImageWithFallback
                    src="https://images.unsplash.com/photo-1595567818311-57a0736507d8?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxmaXJld29ya3MlMjBuaWdodCUyMHNreSUyMGNlbGVicmF0aW9ufGVufDF8fHx8MTc2NDI4MDM1OXww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral"
                    alt="Live Fireworks"
                    className="absolute inset-0 w-full h-full object-cover opacity-60"
                  />
                  
                  {/* Live Overlay */}
                  <div className="absolute top-4 left-4 right-4 flex items-center justify-between">
                    <Badge className="bg-red-500 text-white border-none font-black px-4 py-2 animate-pulse">
                      <Activity className="h-3 w-3 mr-2" />
                      LIVE
                    </Badge>
                    <div className="flex items-center gap-2 bg-black/60 backdrop-blur-xl rounded-full px-4 py-2">
                      <Users className="h-4 w-4 text-cyan-400" />
                      <span className="text-white font-black">{liveViewers.toLocaleString()}</span>
                    </div>
                  </div>

                  {/* Center Info */}
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className="text-center bg-black/40 backdrop-blur-xl rounded-2xl p-8 border border-cyan-500/30">
                      <h3 className="text-3xl font-black text-white mb-2">New Year's Eve Fireworks</h3>
                      <p className="text-cyan-300 mb-4">Currently viewing: {droneViews[selectedDrone - 1].name}</p>
                      <Badge className="bg-cyan-500/20 text-cyan-400 border-cyan-500/40 px-4 py-2">
                        {droneViews[selectedDrone - 1].quality} • {droneViews[selectedDrone - 1].altitude}
                      </Badge>
                    </div>
                  </div>

                  {/* Bottom Controls */}
                  <div className="absolute bottom-4 left-4 right-4 flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <Button
                        size="sm"
                        onClick={() => setIsPlaying(!isPlaying)}
                        className="bg-black/60 backdrop-blur-xl hover:bg-black/80"
                      >
                        {isPlaying ? <Pause className="h-4 w-4" /> : <Play className="h-4 w-4" />}
                      </Button>
                      <Button
                        size="sm"
                        onClick={() => setVolume(volume > 0 ? 0 : 75)}
                        className="bg-black/60 backdrop-blur-xl hover:bg-black/80"
                      >
                        {volume > 0 ? <Volume2 className="h-4 w-4" /> : <VolumeX className="h-4 w-4" />}
                      </Button>
                    </div>
                    <div className="flex items-center gap-2">
                      <Button
                        size="sm"
                        onClick={() => setNarrationOn(!narrationOn)}
                        className={`backdrop-blur-xl ${narrationOn ? 'bg-cyan-600' : 'bg-black/60'}`}
                      >
                        <MessageSquare className="h-4 w-4" />
                      </Button>
                      <Button
                        size="sm"
                        className="bg-black/60 backdrop-blur-xl hover:bg-black/80"
                      >
                        <Save className="h-4 w-4" />
                      </Button>
                      <Button
                        size="sm"
                        className="bg-black/60 backdrop-blur-xl hover:bg-black/80"
                      >
                        <Maximize className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                </div>
              </Card>

              {/* View Selector */}
              <Card className="bg-gradient-to-br from-black/60 to-black/40 border-cyan-500/30 mb-8">
                <CardHeader>
                  <CardTitle className="flex items-center gap-3 text-white text-2xl">
                    <Layers className="h-7 w-7 text-cyan-400" />
                    Switch Viewing Angle
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                    {droneViews.map((view) => (
                      <Card
                        key={view.id}
                        onClick={() => setSelectedDrone(view.id)}
                        className={`cursor-pointer transition-colors duration-300 ${
                          selectedDrone === view.id
                            ? 'border-2 border-cyan-400 bg-cyan-500/20 shadow-lg shadow-cyan-500/30'
                            : 'border border-cyan-500/30 bg-black/40 hover:border-cyan-400'
                        }`}
                      >
                        <CardContent className="p-4">
                          <div className="flex items-center gap-3 mb-3">
                            {view.id <= 4 ? (
                              <Radio className="h-6 w-6 text-cyan-400" />
                            ) : view.id === 5 ? (
                              <Satellite className="h-6 w-6 text-orange-400" />
                            ) : (
                              <Camera className="h-6 w-6 text-blue-400" />
                            )}
                            <div>
                              <div className="font-black text-white text-sm">{view.name}</div>
                              <div className="text-xs text-cyan-300">{view.angle}</div>
                            </div>
                          </div>
                          <div className="flex items-center justify-between text-xs">
                            <Badge className="bg-cyan-500/20 text-cyan-400 border-cyan-500/40 text-xs">
                              {view.quality}
                            </Badge>
                            {selectedDrone === view.id && (
                              <CheckCircle className="h-4 w-4 text-green-400" />
                            )}
                          </div>
                        </CardContent>
                      </Card>
                    ))}
                  </div>
                </CardContent>
              </Card>

              {/* Accessibility Controls */}
              <Card className="bg-gradient-to-br from-black/60 to-black/40 border-cyan-500/30">
                <CardHeader>
                  <CardTitle className="flex items-center gap-3 text-white text-2xl">
                    <Settings className="h-7 w-7 text-cyan-400" />
                    Accessibility Controls
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="grid md:grid-cols-3 gap-6">
                    <div>
                      <label className="block text-cyan-200 font-bold mb-3">Voice Narration</label>
                      <Button
                        onClick={() => setNarrationOn(!narrationOn)}
                        className={`w-full ${narrationOn ? 'bg-gradient-to-r from-cyan-600 to-blue-600' : 'bg-gray-700'}`}
                      >
                        <MessageSquare className="h-4 w-4 mr-2" />
                        {narrationOn ? 'ON' : 'OFF'}
                      </Button>
                    </div>
                    <div>
                      <label className="block text-cyan-200 font-bold mb-3">Volume: {volume}%</label>
                      <div className="flex items-center gap-4">
                        <VolumeX className="h-4 w-4 text-cyan-400" />
                        <div className="flex-1 h-2 bg-gray-700 rounded-full overflow-hidden">
                          <div 
                            className="h-full bg-gradient-to-r from-cyan-500 to-blue-500"
                            style={{ width: `${volume}%` }}
                          />
                        </div>
                        <Volume2 className="h-4 w-4 text-cyan-400" />
                      </div>
                    </div>
                    <div>
                      <label className="block text-cyan-200 font-bold mb-3">Channel</label>
                      <Button className="w-full bg-gradient-to-r from-cyan-600 to-blue-600">
                        Channel 1 of 3
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          </AnimatePresence>
        )}

        {/* Smart Glasses Section */}
        {activeSection === 'glasses' && (
          <AnimatePresence mode="wait">
            <motion.div
              key="glasses"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="p-6 md:p-12 max-w-7xl mx-auto"
            >
              <div className="text-center mb-12">
                <h2 className="text-5xl font-black mb-4 bg-gradient-to-r from-cyan-400 via-blue-400 to-orange-400 bg-clip-text text-transparent">
                  INECT Smart Glasses
                </h2>
                <p className="text-xl text-cyan-200/80 max-w-3xl mx-auto">
                  Designed for comfort, engineered for performance
                </p>
              </div>

              {/* Glasses Showcase */}
              <div className="grid gap-8 mb-12">
                {glassesSpecs.map((glasses, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: index * 0.2 }}
                  >
                    <Card className="bg-gradient-to-br from-black/60 to-black/40 border-cyan-500/30 overflow-hidden">
                      <div className={`grid ${isMobile ? 'grid-cols-1' : 'md:grid-cols-2'} gap-0`}>
                        <div className={`aspect-square bg-gradient-to-br ${glasses.image} relative flex items-center justify-center`}>
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
                          >
                            <Glasses className="h-48 w-48 text-white/80" />
                          </motion.div>
                        </div>

                        <CardContent className="p-8 flex flex-col justify-center">
                          <Badge className="mb-4 w-fit bg-cyan-500/20 text-cyan-400 border-cyan-500/40 font-bold">
                            {glasses.design}
                          </Badge>
                          <h3 className="text-3xl font-black text-white mb-4">{glasses.model}</h3>
                          
                          <div className="space-y-3 mb-6">
                            {glasses.features.map((feature, idx) => (
                              <div key={idx} className="flex items-center gap-3 text-cyan-200">
                                <CheckCircle className="h-5 w-5 text-cyan-400 flex-shrink-0" />
                                <span>{feature}</span>
                              </div>
                            ))}
                          </div>

                          <div className="flex items-center justify-between">
                            <div className="text-4xl font-black text-cyan-400">{glasses.price}</div>
                            <Button 
                              size="lg"
                              className="bg-gradient-to-r from-cyan-600 to-blue-600 hover:from-cyan-500 hover:to-blue-500 font-black"
                            >
                              Pre-Order
                            </Button>
                          </div>
                        </CardContent>
                      </div>
                    </Card>
                  </motion.div>
                ))}
              </div>

              {/* Technical Specs */}
              <Card className="bg-gradient-to-br from-cyan-900/30 to-blue-900/30 border-2 border-cyan-500/40">
                <CardHeader>
                  <CardTitle className="flex items-center gap-3 text-white text-2xl">
                    <Zap className="h-7 w-7 text-cyan-400" />
                    Technical Specifications
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
                    {[
                      { label: 'Display', value: '8K OLED', icon: Eye },
                      { label: 'Latency', value: '<50ms', icon: Zap },
                      { label: 'Battery', value: '6 hours', icon: Activity },
                      { label: 'Weight', value: '42g', icon: Award },
                      { label: 'FOV', value: '110°', icon: Maximize },
                      { label: 'Connectivity', value: '5G + WiFi 6E', icon: Wifi },
                      { label: 'Audio', value: 'Bone Conduction', icon: Volume2 },
                      { label: 'Controls', value: 'Voice + Touch', icon: Settings },
                    ].map((spec, idx) => (
                      <div key={idx} className="text-center p-4 bg-black/40 rounded-xl border border-cyan-500/20">
                        <spec.icon className="h-8 w-8 mx-auto mb-3 text-cyan-400" />
                        <div className="text-sm text-cyan-300/80 mb-1">{spec.label}</div>
                        <div className="text-xl font-black text-white">{spec.value}</div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          </AnimatePresence>
        )}

        {/* Events Calendar Section */}
        {activeSection === 'calendar' && (
          <AnimatePresence mode="wait">
            <motion.div
              key="calendar"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="p-6 md:p-12 max-w-7xl mx-auto"
            >
              <div className="text-center mb-12">
                <h2 className="text-5xl font-black mb-4 bg-gradient-to-r from-cyan-400 via-blue-400 to-orange-400 bg-clip-text text-transparent">
                  Event Calendar
                </h2>
                <p className="text-xl text-cyan-200/80 max-w-3xl mx-auto">
                  Reserve your spot for the world's most spectacular events
                </p>
              </div>

              {/* Event List */}
              <div className="grid gap-6 mb-12">
                {upcomingEvents.map((event, index) => (
                  <motion.div
                    key={event.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.1 }}
                  >
                    <Card className="bg-gradient-to-br from-black/60 to-black/40 border-cyan-500/30 hover:border-cyan-400 transition-colors duration-300">
                      <CardContent className="p-6">
                        <div className={`grid ${isMobile ? 'grid-cols-1' : 'md:grid-cols-4'} gap-6 items-center`}>
                          {/* Countdown */}
                          <div className="text-center">
                            <div className="text-5xl font-black text-cyan-400 mb-2">{event.countdown.split(' ')[0]}</div>
                            <div className="text-sm text-cyan-300 font-bold uppercase">{event.countdown.split(' ')[1]}</div>
                            <Badge className="mt-2 bg-orange-500/20 text-orange-400 border-orange-500/40">
                              {event.category}
                            </Badge>
                          </div>

                          {/* Event Info */}
                          <div className="md:col-span-2">
                            <h3 className="text-2xl font-black text-white mb-2">{event.name}</h3>
                            <p className="text-cyan-300 mb-3">{event.location}</p>
                            <div className="space-y-2">
                              <div className="flex items-center gap-2 text-sm text-cyan-200">
                                <Calendar className="h-4 w-4 text-cyan-400" />
                                {event.date} at {event.time}
                              </div>
                              <div className="flex items-center gap-2 text-sm text-cyan-200">
                                <Radio className="h-4 w-4 text-cyan-400" />
                                {event.drones} drones • {event.channels} backup channels
                              </div>
                              <div className="flex items-center gap-2 text-sm text-cyan-200">
                                <Clock className="h-4 w-4 text-cyan-400" />
                                Duration: {event.duration}
                              </div>
                            </div>
                          </div>

                          {/* Actions */}
                          <div className="space-y-3">
                            <div className="text-3xl font-black text-cyan-400">{event.price}</div>
                            <Button 
                              className="w-full bg-gradient-to-r from-cyan-600 to-blue-600 hover:from-cyan-500 hover:to-blue-500 font-black"
                            >
                              <Calendar className="h-4 w-4 mr-2" />
                              Add to Calendar
                            </Button>
                            <div className="flex gap-2">
                              {event.views.map((view, idx) => (
                                <Badge key={idx} className="bg-cyan-500/20 text-cyan-400 border-cyan-500/40 text-xs flex-1 justify-center">
                                  {view}
                                </Badge>
                              ))}
                            </div>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  </motion.div>
                ))}
              </div>

              {/* Subscription Tiers */}
              <div className="text-center mb-8">
                <h3 className="text-3xl font-black text-white mb-2">Choose Your Plan</h3>
                <p className="text-cyan-200/80">Flexible subscriptions based on events per year</p>
              </div>

              <div className={`grid gap-6 ${isMobile ? 'grid-cols-1' : 'grid-cols-3'}`}>
                {subscriptionTiers.map((tier, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: index * 0.1 }}
                  >
                    <Card className={`${
                      tier.popular 
                        ? 'bg-gradient-to-br from-cyan-900/40 to-blue-900/40 border-2 border-cyan-400 shadow-2xl shadow-cyan-500/20' 
                        : 'bg-gradient-to-br from-black/60 to-black/40 border-cyan-500/30'
                    } relative h-full`}>
                      {tier.popular && (
                        <div className="absolute -top-4 left-1/2 -translate-x-1/2">
                          <Badge className="bg-gradient-to-r from-cyan-500 to-blue-500 text-white border-none font-black px-4 py-2">
                            MOST POPULAR
                          </Badge>
                        </div>
                      )}
                      <CardContent className="p-8">
                        <h3 className="text-2xl font-black text-white mb-2">{tier.name}</h3>
                        <div className="mb-6">
                          <span className="text-5xl font-black text-cyan-400">{tier.price}</span>
                          <span className="text-cyan-300">{tier.period}</span>
                        </div>
                        <div className="text-cyan-200 mb-6 font-bold">{tier.events}</div>
                        <div className="space-y-3 mb-8">
                          {tier.features.map((feature, idx) => (
                            <div key={idx} className="flex items-center gap-2 text-cyan-200">
                              <CheckCircle className="h-5 w-5 text-cyan-400 flex-shrink-0" />
                              <span>{feature}</span>
                            </div>
                          ))}
                        </div>
                        <Button 
                          className={`w-full font-black ${
                            tier.popular
                              ? 'bg-gradient-to-r from-cyan-600 to-blue-600 hover:from-cyan-500 hover:to-blue-500'
                              : 'bg-gradient-to-r from-gray-700 to-gray-800 hover:from-gray-600 hover:to-gray-700'
                          }`}
                          size="lg"
                        >
                          Subscribe Now
                        </Button>
                      </CardContent>
                    </Card>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          </AnimatePresence>
        )}

        {/* $600M Vision Section */}
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
                  $600 MILLION VISION
                </h2>
                <p className="text-2xl text-cyan-200/80 max-w-3xl mx-auto">
                  Year 5 Projection — Revolutionizing Live Event Broadcasting
                </p>
              </div>

              {/* Financial Hero */}
              <Card className="bg-gradient-to-br from-green-900/30 to-emerald-900/30 border-2 border-green-500/50 mb-12 overflow-hidden">
                <div className="relative h-64">
                  <ImageWithFallback
                    src="https://images.unsplash.com/photo-1732971857119-ca6e9b52d4f9?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjb25jZXJ0JTIwc3RhZ2UlMjBhZXJpYWwlMjB2aWV3fGVufDF8fHx8MTc2NDI4MDM2MHww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral"
                    alt="Event Vision"
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
                        $600,000,000
                      </motion.div>
                      <div className="text-2xl text-green-200 font-bold">Year 5 Revenue Target</div>
                    </div>
                  </div>
                </div>
              </Card>

              {/* 5-Year Growth */}
              <Card className="bg-gradient-to-br from-black/60 to-black/40 border-cyan-500/30 mb-12">
                <CardHeader>
                  <CardTitle className="flex items-center gap-3 text-white text-2xl">
                    <TrendingUp className="h-7 w-7 text-green-400" />
                    5-Year Growth Trajectory
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {[
                      { year: 1, revenue: '$7M', users: '50K', events: '500', highlight: 'Beta Launch' },
                      { year: 2, revenue: '$50M', users: '300K', events: '2.5K', highlight: 'Global Expansion' },
                      { year: 3, revenue: '$150M', users: '1.2M', events: '8K', highlight: 'Enterprise Adoption' },
                      { year: 4, revenue: '$350M', users: '3M', events: '20K', highlight: 'Market Leadership' },
                      { year: 5, revenue: '$600M', users: '7M', events: '50K', highlight: 'Industry Dominance' },
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
                            : 'bg-cyan-500/10 border border-cyan-500/20'
                        }`}>
                          <div className="grid grid-cols-2 md:grid-cols-5 gap-4 items-center">
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
                              <div className="text-sm text-cyan-300/80 mb-1">Users</div>
                              <div className="text-xl font-black text-white">{milestone.users}</div>
                            </div>
                            <div>
                              <div className="text-sm text-cyan-300/80 mb-1">Events</div>
                              <div className="text-xl font-black text-white">{milestone.events}</div>
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
                          <div className="absolute left-8 top-full w-0.5 h-4 bg-cyan-500/30" />
                        )}
                      </motion.div>
                    ))}
                  </div>
                </CardContent>
              </Card>

              {/* Market Breakdown */}
              <div className={`grid gap-8 mb-12 ${isMobile ? 'grid-cols-1' : 'grid-cols-2'}`}>
                <Card className="bg-gradient-to-br from-cyan-900/30 to-blue-900/30 border-2 border-cyan-500/40">
                  <CardHeader>
                    <CardTitle className="flex items-center gap-3 text-white text-xl">
                      <Globe className="h-6 w-6 text-cyan-400" />
                      Total Addressable Market
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="text-5xl font-black text-white mb-2">$120B</div>
                    <div className="text-cyan-200/80 mb-6">Global Events Industry</div>
                    <div className="space-y-3">
                      {[
                        { segment: 'Sports & Concerts', size: '$60B' },
                        { segment: 'Fireworks & Festivals', size: '$30B' },
                        { segment: 'AR/VR Market', size: '$30B' },
                      ].map((segment, idx) => (
                        <div key={idx} className="flex justify-between items-center p-3 bg-black/40 rounded-lg">
                          <span className="text-cyan-200">{segment.segment}</span>
                          <span className="text-xl font-black text-cyan-400">{segment.size}</span>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>

                <Card className="bg-gradient-to-br from-green-900/30 to-emerald-900/30 border-2 border-green-500/50">
                  <CardHeader>
                    <CardTitle className="flex items-center gap-3 text-white text-xl">
                      <Target className="h-6 w-6 text-green-400" />
                      Revenue Breakdown
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      {[
                        { stream: 'Subscriptions', revenue: '$300M', percentage: '50%' },
                        { stream: 'Hardware Sales', revenue: '$180M', percentage: '30%' },
                        { stream: 'B2B Licensing', revenue: '$120M', percentage: '20%' },
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
                      { label: 'Annual Revenue', value: '$600M', icon: DollarSign, color: 'text-green-400' },
                      { label: 'Active Users', value: '7M', icon: Users, color: 'text-cyan-400' },
                      { label: 'Events Streamed', value: '50K+', icon: Calendar, color: 'text-orange-400' },
                      { label: 'Drones Deployed', value: '10K+', icon: Radio, color: 'text-blue-400' },
                      { label: 'Countries', value: '120+', icon: Globe, color: 'text-pink-400' },
                      { label: 'Glasses Sold', value: '5M', icon: Glasses, color: 'text-purple-400' },
                      { label: 'Net Profit', value: '$180M', icon: TrendingUp, color: 'text-emerald-400' },
                      { label: 'Team Size', value: '800+', icon: Users, color: 'text-indigo-400' },
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
            </motion.div>
          </AnimatePresence>
        )}
      </div>
    </div>
  );
}
