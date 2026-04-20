import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "motion/react";
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";
import { Button } from "../ui/button";
import { Badge } from "../ui/badge";
import { ImageWithFallback } from "../figma/ImageWithFallback";
import { 
  Car,
  ParkingCircle,
  Bike,
  Wrench,
  Home,
  Zap,
  MapPin,
  Clock,
  Shield,
  Leaf,
  Battery,
  Sparkles,
  TrendingUp,
  Globe,
  Users,
  Award,
  BarChart3,
  Target,
  CheckCircle,
  DollarSign,
  Calendar,
  Building2,
  Sun,
  Droplets,
  Settings,
  Phone,
  Smartphone,
  CreditCard,
  QrCode,
  Lock,
  Key,
  Package
} from "lucide-react";

interface MparkerPrototypeProps {
  deviceView: 'desktop' | 'tablet' | 'mobile';
}

export function MparkerPrototype({ deviceView }: MparkerPrototypeProps) {
  const [activeSection, setActiveSection] = useState<'hero' | 'services' | 'workflow' | 'business' | 'vision'>('hero');
  const [totalParked, setTotalParked] = useState(8742);
  const [ridesCompleted, setRidesCompleted] = useState(12483);

  const isMobile = deviceView === 'mobile';
  const isTablet = deviceView === 'tablet';

  // Simulate real-time data
  useEffect(() => {
    const interval = setInterval(() => {
      setTotalParked(prev => prev + (Math.random() > 0.7 ? 1 : 0));
      setRidesCompleted(prev => prev + (Math.random() > 0.8 ? 1 : 0));
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  const services = [
    {
      id: 'parking',
      name: 'Secure Parking',
      icon: ParkingCircle,
      tagline: 'Park. Forget. Go.',
      features: ['AI-Guided Spaces', '24/7 Security', 'EV Charging', 'Automated Entry'],
      pricing: '$30/day or $400/month',
      color: 'from-blue-500 to-cyan-500',
      revenue: '60%'
    },
    {
      id: 'mobility',
      name: 'Mobility Network',
      icon: Bike,
      tagline: 'Ride home with ease.',
      features: ['Mglider E-Scooters', 'Mslider E-Skateboards', 'Mrider E-Bikes', 'App-Based'],
      pricing: '$0.30/min',
      color: 'from-green-500 to-emerald-500',
      revenue: '25%'
    },
    {
      id: 'care',
      name: 'Vehicle Care',
      icon: Wrench,
      tagline: 'Leave dirty, drive clean.',
      features: ['24/7 Service', 'Free Wash', 'Quick Checks', 'Tire Changes'],
      pricing: '$20 wash, $50 check',
      color: 'from-orange-500 to-red-500',
      revenue: '10%'
    },
    {
      id: 'residences',
      name: 'Smart Residences',
      icon: Home,
      tagline: 'Park, stay, explore.',
      features: ['4 Luxury Units', 'Digital Access', '1-7 Day Stays', 'Rooftop Views'],
      pricing: '$150/night avg',
      color: 'from-purple-500 to-pink-500',
      revenue: '5%'
    },
  ];

  const workflowSteps = [
    {
      step: 1,
      title: 'Drive In',
      description: 'AI scans your license plate and assigns optimal parking spot via app.',
      icon: Car,
      color: 'from-blue-500 to-cyan-500'
    },
    {
      step: 2,
      title: 'Get Ticket',
      description: 'Receive Mglider/Mslider/Mrider for last-mile transportation home.',
      icon: Bike,
      color: 'from-green-500 to-emerald-500'
    },
    {
      step: 3,
      title: 'We Clean',
      description: 'Your car gets washed while parked (included in daily rate).',
      icon: Droplets,
      color: 'from-cyan-500 to-blue-500'
    },
    {
      step: 4,
      title: 'Return M-Device',
      description: 'Drop off mobility device at any Mparker hub to get exit ticket.',
      icon: QrCode,
      color: 'from-purple-500 to-pink-500'
    },
    {
      step: 5,
      title: 'Pick Up Car',
      description: 'Scan ticket at kiosk, retrieve clean car, and drive away.',
      icon: Key,
      color: 'from-orange-500 to-red-500'
    },
  ];

  const businessModel = [
    {
      name: 'Parking Fees',
      revenue: '$12M',
      percentage: '60%',
      description: '500 spaces at $30/day, 70% occupancy',
      color: 'from-blue-500 to-cyan-500'
    },
    {
      name: 'Mobility Rentals',
      revenue: '$5M',
      percentage: '25%',
      description: '100 vehicles at $0.30/min, 15% parker usage',
      color: 'from-green-500 to-emerald-500'
    },
    {
      name: 'Vehicle Care',
      revenue: '$2M',
      percentage: '10%',
      description: 'Washes, checks, and maintenance services',
      color: 'from-orange-500 to-red-500'
    },
    {
      name: 'Residences',
      revenue: '$1M',
      percentage: '5%',
      description: '4 units at $150/night, 65% occupancy',
      color: 'from-purple-500 to-pink-500'
    },
  ];

  const useCases = [
    {
      persona: 'Daily Commuter',
      scenario: 'Sarah parks at Mparker, rides Mglider to office, returns evening to clean car',
      savings: '$800/year vs traditional parking'
    },
    {
      persona: 'Weekend Visitor',
      scenario: 'John parks Friday, stays in rooftop apartment, explores city on Mrider',
      benefit: 'Integrated parking + lodging = 30% savings'
    },
    {
      persona: 'Event Attendee',
      scenario: 'Festival-goer parks for 3 days, car gets detailed, uses Mslider for transport',
      convenience: 'No worry about vehicle or finding rides'
    },
  ];

  const navigationTabs = [
    { id: 'hero', label: 'Home', icon: Zap },
    { id: 'services', label: '4 Services', icon: Package },
    { id: 'workflow', label: 'How It Works', icon: Settings },
    { id: 'business', label: 'Business Model', icon: BarChart3 },
    { id: 'vision', label: '$22M Vision', icon: TrendingUp },
  ];

  return (
    <div className="h-full text-white overflow-auto relative">
      <div className="relative z-10">
        {/* Header */}
        <div className="glass-strong border-b border-white/5 sticky top-0 z-50">
          <div className="flex items-center justify-between p-4">
            <div className="flex items-center gap-4">
              <div className="relative">
                <div className="w-14 h-14 bg-gradient-to-br from-blue-500 via-green-500 to-purple-500 rounded-2xl p-3 shadow-xl">
                  <ParkingCircle className="h-8 w-8 text-white" />
                </div>
                <motion.div 
                  className="absolute inset-0 bg-blue-500 rounded-2xl blur-xl opacity-50"
                  animate={{ scale: [1, 1.2, 1], opacity: [0.3, 0.5, 0.3] }}
                  transition={{ duration: 2, repeat: Infinity }}
                />
              </div>
              <div>
                <h1 className="text-2xl font-black bg-gradient-to-r from-blue-400 via-green-400 to-purple-400 bg-clip-text text-transparent tracking-tight">
                  MPARKER
                </h1>
                <p className="text-sm text-blue-300 font-bold tracking-wide">URBAN MOBILITY ECOSYSTEM</p>
              </div>
            </div>
            
            {!isMobile && (
              <div className="flex items-center gap-6">
                <div className="text-right">
                  <div className="text-xs text-blue-300/80 font-bold uppercase tracking-wide">Cars Parked</div>
                  <div className="text-xl font-black text-blue-400">{totalParked.toLocaleString()}</div>
                </div>
                <div className="text-right">
                  <div className="text-xs text-green-300/80 font-bold uppercase tracking-wide">Rides Completed</div>
                  <div className="text-xl font-black text-green-400">{ridesCompleted.toLocaleString()}</div>
                </div>
                <Badge className="bg-gradient-to-r from-blue-500/20 to-green-500/20 text-blue-300 border border-blue-500/40 px-4 py-2 font-black uppercase tracking-wide">
                  <Leaf className="h-3 w-3 mr-2" />
                  Carbon Neutral
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
                      ? 'bg-gradient-to-r from-blue-600 via-green-600 to-purple-600 text-white shadow-lg shadow-blue-500/50 font-black' 
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
                    src="https://images.unsplash.com/photo-1628414579449-1ab6bb9cb156?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxwYXJraW5nJTIwZ2FyYWdlJTIwdXJiYW58ZW58MXx8fHwxNzY0MjAzOTE2fDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral"
                    alt="Parking Garage"
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-r from-blue-900/95 via-green-900/90 to-purple-900/95" />
                  
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
                      {i % 4 === 0 ? (
                        <Car className="h-6 w-6 text-blue-400/60" />
                      ) : i % 4 === 1 ? (
                        <Bike className="h-6 w-6 text-green-400/60" />
                      ) : i % 4 === 2 ? (
                        <Home className="h-6 w-6 text-purple-400/60" />
                      ) : (
                        <Sparkles className="h-6 w-6 text-cyan-400/60" />
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
                      <h1 className="text-6xl md:text-7xl font-black mb-6 bg-gradient-to-r from-blue-300 via-green-300 to-purple-300 bg-clip-text text-transparent leading-tight">
                        PARK. RIDE.<br />REFRESH. STAY.
                      </h1>
                    </motion.div>
                    
                    <motion.p
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.8, delay: 0.2 }}
                      className="text-2xl text-blue-200 mb-8 font-medium leading-relaxed"
                    >
                      The <span className="text-white font-bold">all-in-one urban hub</span> that combines secure parking,<br className="hidden md:block" />
                      electric mobility, vehicle care, and <span className="text-white font-bold">smart living</span> in one seamless experience.
                    </motion.p>

                    <motion.div
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.8, delay: 0.4 }}
                      className="flex flex-wrap gap-4 justify-center mb-8"
                    >
                      <Button 
                        size="lg" 
                        onClick={() => setActiveSection('services')}
                        className="bg-gradient-to-r from-blue-600 via-green-600 to-purple-600 hover:from-blue-500 hover:via-green-500 hover:to-purple-500 text-white font-black px-8 py-6 text-lg shadow-2xl shadow-blue-500/50 transition-colors duration-300 hover:scale-105"
                      >
                        <Package className="h-6 w-6 mr-3" />
                        Explore Services
                      </Button>
                      <Button 
                        size="lg" 
                        variant="outline"
                        onClick={() => setActiveSection('vision')}
                        className="border-2 border-blue-400/50 text-blue-200 hover:bg-blue-500/20 font-black px-8 py-6 text-lg backdrop-blur-xl"
                      >
                        <TrendingUp className="h-6 w-6 mr-3" />
                        $22M Vision
                      </Button>
                    </motion.div>

                    <motion.div
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{ duration: 0.8, delay: 0.6 }}
                      className="flex flex-wrap gap-8 justify-center"
                    >
                      {[
                        { label: '1 Hub', sublabel: '4 Solutions', icon: Building2 },
                        { label: '$30/Day', sublabel: 'All Inclusive', icon: DollarSign },
                        { label: '24/7', sublabel: 'Always Open', icon: Clock },
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
                    Urban Parking Crisis
                  </h2>
                  <p className="text-xl text-blue-200/80 max-w-3xl mx-auto">
                    Drivers waste 70+ hours/year searching for parking. We make it effortless.
                  </p>
                </div>

                <div className={`grid gap-8 ${isMobile ? 'grid-cols-1' : isTablet ? 'grid-cols-2' : 'grid-cols-4'}`}>
                  {services.map((service, index) => (
                    <motion.div
                      key={service.id}
                      initial={{ opacity: 0, y: 30 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true }}
                      transition={{ delay: index * 0.1 }}
                      whileHover={{ y: -8, scale: 1.02 }}
                    >
                      <Card className="bg-gradient-to-br from-black/60 to-black/40 border-blue-500/20 hover:border-blue-400/50 transition-colors duration-300 hover:shadow-2xl hover:shadow-blue-500/20 h-full">
                        <CardContent className="p-8">
                          <div className={`w-20 h-20 mb-6 rounded-2xl bg-gradient-to-br ${service.color} p-5 shadow-lg flex items-center justify-center`}>
                            <service.icon className="h-10 w-10 text-white" />
                          </div>
                          <h3 className="text-2xl font-black mb-2 text-white">{service.name}</h3>
                          <p className="text-blue-200/70 italic mb-4">"{service.tagline}"</p>
                          <Badge className="bg-blue-500/20 text-blue-400 border-blue-500/40 mb-4">
                            {service.revenue} of revenue
                          </Badge>
                          <div className="space-y-2 mb-4">
                            {service.features.map((feature, idx) => (
                              <div key={idx} className="flex items-center gap-2 text-sm text-blue-300">
                                <CheckCircle className="h-4 w-4 text-blue-400 flex-shrink-0" />
                                <span>{feature}</span>
                              </div>
                            ))}
                          </div>
                          <div className="p-3 bg-blue-500/10 rounded-lg">
                            <div className="text-xs text-blue-300/70 mb-1">Pricing</div>
                            <div className="text-lg font-black text-white">{service.pricing}</div>
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

        {/* Services Section */}
        {activeSection === 'services' && (
          <AnimatePresence mode="wait">
            <motion.div
              key="services"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="p-6 md:p-12 max-w-7xl mx-auto"
            >
              <div className="text-center mb-12">
                <h2 className="text-5xl font-black mb-4 bg-gradient-to-r from-blue-400 via-green-400 to-purple-400 bg-clip-text text-transparent">
                  Integrated Services
                </h2>
                <p className="text-xl text-blue-200/80 max-w-3xl mx-auto">
                  Four solutions working together seamlessly
                </p>
              </div>

              {/* Parking Deep Dive */}
              <Card className="bg-gradient-to-br from-blue-900/30 to-cyan-900/30 border-2 border-blue-500/50 mb-12">
                <div className="grid md:grid-cols-2 gap-8 p-8">
                  <div>
                    <div className="aspect-square bg-gradient-to-br from-blue-500/20 to-cyan-500/20 rounded-2xl flex items-center justify-center relative overflow-hidden mb-6">
                      <div className="relative z-10">
                        <ParkingCircle className="h-32 w-32 text-blue-400" />
                      </div>
                    </div>
                  </div>
                  <div className="flex flex-col justify-center">
                    <h3 className="text-3xl font-black text-white mb-4">High-Density Parking Pods</h3>
                    <p className="text-blue-200/80 mb-6 text-lg">
                      500 secure spaces with AI-guided allocation, automated license plate recognition, and EV charging. 
                      Park once, forget the hassle. Your car is safe, clean, and ready when you return.
                    </p>
                    <div className="grid grid-cols-2 gap-4">
                      {[
                        { label: 'Capacity', value: '500 spaces' },
                        { label: 'Pricing', value: '$30/day' },
                        { label: 'Security', value: '24/7 AI' },
                        { label: 'EV Charging', value: '20% spaces' },
                      ].map((spec, idx) => (
                        <div key={idx} className="p-4 bg-black/40 rounded-lg">
                          <div className="text-sm text-blue-300/70 mb-1">{spec.label}</div>
                          <div className="text-xl font-black text-white">{spec.value}</div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </Card>

              {/* Mobility Deep Dive */}
              <Card className="bg-gradient-to-br from-green-900/30 to-emerald-900/30 border-2 border-green-500/50 mb-12">
                <div className="grid md:grid-cols-2 gap-8 p-8">
                  <div className="flex flex-col justify-center order-2 md:order-1">
                    <h3 className="text-3xl font-black text-white mb-4">Mparker Mobility Network</h3>
                    <p className="text-blue-200/80 mb-6 text-lg">
                      When you park, grab a Mglider (e-scooter), Mslider (e-skateboard), or Mrider (e-bike) for free last-mile transport. 
                      Return it to any hub to get your exit ticket. Simple. Green. Fast.
                    </p>
                    <div className="space-y-3">
                      {[
                        { device: 'Mglider', description: 'E-scooter for quick trips', speed: '15 mph' },
                        { device: 'Mslider', description: 'E-skateboard for fun rides', speed: '12 mph' },
                        { device: 'Mrider', description: 'E-bike for longer journeys', speed: '20 mph' },
                      ].map((item, idx) => (
                        <div key={idx} className="p-4 bg-black/40 rounded-lg">
                          <div className="flex justify-between items-center">
                            <div>
                              <div className="text-white font-black text-lg">{item.device}</div>
                              <div className="text-blue-300 text-sm">{item.description}</div>
                            </div>
                            <Badge className="bg-green-500/20 text-green-400 border-green-500/40">
                              {item.speed}
                            </Badge>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                  <div className="order-1 md:order-2">
                    <div className="aspect-square bg-gradient-to-br from-green-500/20 to-emerald-500/20 rounded-2xl flex items-center justify-center relative overflow-hidden mb-6">
                      <ImageWithFallback
                        src="https://images.unsplash.com/photo-1713254249770-7e9a688064d7?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxlbGVjdHJpYyUyMHNjb290ZXIlMjBjaXR5fGVufDF8fHx8MTc2NDIxNzA3OXww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral"
                        alt="E-Scooter"
                        className="absolute inset-0 w-full h-full object-cover opacity-40 rounded-2xl"
                      />
                      <div className="relative z-10">
                        <Bike className="h-32 w-32 text-green-400" />
                      </div>
                    </div>
                  </div>
                </div>
              </Card>

              {/* Care + Residences Grid */}
              <div className={`grid gap-8 ${isMobile ? 'grid-cols-1' : 'grid-cols-2'}`}>
                <Card className="bg-gradient-to-br from-orange-900/30 to-red-900/30 border-2 border-orange-500/50">
                  <CardHeader>
                    <CardTitle className="flex items-center gap-3 text-white text-2xl">
                      <Wrench className="h-7 w-7 text-orange-400" />
                      24/7 Vehicle Care
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-blue-200/80 mb-6">
                      On-site mechanics handle washes, quick diagnostics, tire changes, and more. 
                      Your car gets cleaned automatically while parked (included).
                    </p>
                    <div className="space-y-3">
                      {[
                        { service: 'Free Wash', included: 'With parking' },
                        { service: 'Quick Check', price: '$50' },
                        { service: 'Tire Change', price: '$100' },
                        { service: 'Detailing', price: '$150' },
                      ].map((item, idx) => (
                        <div key={idx} className="flex justify-between items-center p-3 bg-black/40 rounded-lg">
                          <span className="text-white font-bold">{item.service}</span>
                          <Badge className={item.included ? 'bg-green-500/20 text-green-400' : 'bg-orange-500/20 text-orange-400'}>
                            {item.included || item.price}
                          </Badge>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>

                <Card className="bg-gradient-to-br from-purple-900/30 to-pink-900/30 border-2 border-purple-500/50">
                  <CardHeader>
                    <CardTitle className="flex items-center gap-3 text-white text-2xl">
                      <Home className="h-7 w-7 text-purple-400" />
                      Rooftop Residences
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-blue-200/80 mb-6">
                      Four luxury micro-apartments on top of the hub. Digital access, smart home features, 
                      and stunning city views. Perfect for visitors or staycations.
                    </p>
                    <div className="aspect-video bg-gradient-to-br from-purple-500/20 to-pink-500/20 rounded-xl overflow-hidden mb-4">
                      <ImageWithFallback
                        src="https://images.unsplash.com/photo-1664892798972-079f15663b16?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxtb2Rlcm4lMjBhcGFydG1lbnQlMjBsdXh1cnl8ZW58MXx8fHwxNzY0MjgzMzk1fDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral"
                        alt="Luxury Apartment"
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <div className="grid grid-cols-2 gap-3">
                      {[
                        { feature: 'Nightly Rate', value: '$150 avg' },
                        { feature: 'Occupancy', value: '65% target' },
                      ].map((item, idx) => (
                        <div key={idx} className="p-3 bg-black/40 rounded-lg">
                          <div className="text-sm text-purple-300/70">{item.feature}</div>
                          <div className="text-lg font-black text-white">{item.value}</div>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </div>
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
                <h2 className="text-5xl font-black mb-4 bg-gradient-to-r from-blue-400 via-green-400 to-purple-400 bg-clip-text text-transparent">
                  How Mparker Works
                </h2>
                <p className="text-xl text-blue-200/80 max-w-3xl mx-auto">
                  Five simple steps to a stress-free parking experience
                </p>
              </div>

              <div className="space-y-8 mb-12">
                {workflowSteps.map((step, index) => (
                  <motion.div
                    key={step.step}
                    initial={{ opacity: 0, x: -30 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: index * 0.1 }}
                  >
                    <Card className="bg-gradient-to-br from-black/60 to-black/40 border-blue-500/30 hover:border-blue-400/50 transition-colors duration-300">
                      <CardContent className="p-8">
                        <div className="grid md:grid-cols-12 gap-6 items-center">
                          <div className="md:col-span-2 flex justify-center">
                            <div className={`w-24 h-24 rounded-full bg-gradient-to-br ${step.color} p-6 flex items-center justify-center shadow-xl`}>
                              <step.icon className="h-12 w-12 text-white" />
                            </div>
                          </div>
                          <div className="md:col-span-1 text-center">
                            <div className="text-6xl font-black text-blue-400/30">
                              {step.step}
                            </div>
                          </div>
                          <div className="md:col-span-9">
                            <h3 className="text-2xl font-black text-white mb-2">{step.title}</h3>
                            <p className="text-blue-200/70 text-lg">{step.description}</p>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  </motion.div>
                ))}
              </div>

              {/* Use Cases */}
              <Card className="bg-gradient-to-br from-purple-900/30 to-pink-900/30 border-2 border-purple-500/50">
                <CardHeader>
                  <CardTitle className="flex items-center gap-3 text-white text-2xl">
                    <Users className="h-7 w-7 text-purple-400" />
                    Real User Scenarios
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="grid gap-6">
                    {useCases.map((useCase, index) => (
                      <motion.div
                        key={index}
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: index * 0.1 }}
                        className="p-6 bg-black/40 rounded-xl"
                      >
                        <h4 className="text-xl font-black text-white mb-2">{useCase.persona}</h4>
                        <p className="text-blue-200/70 mb-3">{useCase.scenario}</p>
                        <Badge className="bg-green-500/20 text-green-400 border-green-500/40">
                          {useCase.savings || useCase.benefit || useCase.convenience}
                        </Badge>
                      </motion.div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          </AnimatePresence>
        )}

        {/* Business Model Section */}
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
                <h2 className="text-5xl font-black mb-4 bg-gradient-to-r from-blue-400 via-green-400 to-purple-400 bg-clip-text text-transparent">
                  Business Model
                </h2>
                <p className="text-xl text-blue-200/80 max-w-3xl mx-auto">
                  Diversified revenue streams for sustainable growth
                </p>
              </div>

              <div className="grid gap-8 mb-12">
                {businessModel.map((stream, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: index * 0.1 }}
                  >
                    <Card className="bg-gradient-to-br from-black/60 to-black/40 border-blue-500/30">
                      <CardContent className="p-8">
                        <div className="grid md:grid-cols-12 gap-6 items-center">
                          <div className="md:col-span-3">
                            <h3 className="text-3xl font-black text-white mb-2">{stream.name}</h3>
                            <p className="text-blue-200/70">{stream.description}</p>
                          </div>
                          <div className="md:col-span-3 text-center">
                            <div className="text-5xl font-black text-white mb-2">{stream.percentage}</div>
                            <div className="text-sm text-blue-300/70">of total revenue</div>
                          </div>
                          <div className="md:col-span-6">
                            <div className="mb-2 flex justify-between">
                              <span className="text-blue-300">Year 5 Target</span>
                              <span className="text-2xl font-black text-white">{stream.revenue}</span>
                            </div>
                            <div className="h-4 bg-black/40 rounded-full overflow-hidden">
                              <motion.div
                                initial={{ width: 0 }}
                                whileInView={{ width: stream.percentage }}
                                viewport={{ once: true }}
                                transition={{ duration: 1, delay: index * 0.2 }}
                                className={`h-full bg-gradient-to-r ${stream.color}`}
                              />
                            </div>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  </motion.div>
                ))}
              </div>

              {/* Total Revenue */}
              <Card className="bg-gradient-to-br from-green-900/30 to-emerald-900/30 border-2 border-green-500/50">
                <CardContent className="p-12 text-center">
                  <div className="text-7xl font-black text-white mb-4">$22,000,000</div>
                  <div className="text-2xl text-green-200 font-bold mb-6">Year 5 Total Revenue</div>
                  <div className="grid md:grid-cols-4 gap-6">
                    {[
                      { label: 'Parking', amount: '$12M' },
                      { label: 'Mobility', amount: '$5M' },
                      { label: 'Care', amount: '$2M' },
                      { label: 'Residences', amount: '$1M' },
                    ].map((item, idx) => (
                      <div key={idx} className="p-4 bg-black/40 rounded-xl">
                        <div className="text-3xl font-black text-green-400 mb-1">{item.amount}</div>
                        <div className="text-blue-300">{item.label}</div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          </AnimatePresence>
        )}

        {/* Vision Section */}
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
                  $22 MILLION VISION
                </h2>
                <p className="text-2xl text-blue-200/80 max-w-3xl mx-auto">
                  Year 5 Projection — Redefining Urban Mobility
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
                        $22,000,000
                      </motion.div>
                      <div className="text-2xl text-green-200 font-bold">Year 5 Revenue Target</div>
                      <div className="text-blue-300 mt-2">3 hubs • 1,500 spaces • 28% net margin</div>
                    </div>
                  </div>
                </div>
              </Card>

              {/* 5-Year Growth */}
              <Card className="bg-gradient-to-br from-black/60 to-black/40 border-blue-500/30 mb-12">
                <CardHeader>
                  <CardTitle className="flex items-center gap-3 text-white text-2xl">
                    <TrendingUp className="h-7 w-7 text-green-400" />
                    5-Year Revenue Trajectory
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {[
                      { year: 1, revenue: '$1.2M', hubs: '1', spaces: '500', profit: '$200K', margin: '16%', highlight: 'Launch' },
                      { year: 2, revenue: '$2.7M', hubs: '1', spaces: '500', profit: '$600K', margin: '22%', highlight: 'Growth' },
                      { year: 3, revenue: '$5.6M', hubs: '2', spaces: '1,000', profit: '$1.4M', margin: '25%', highlight: 'Scale' },
                      { year: 4, revenue: '$11M', hubs: '2', spaces: '1,000', profit: '$2.9M', margin: '26%', highlight: 'Expansion' },
                      { year: 5, revenue: '$22M', hubs: '3', spaces: '1,500', profit: '$6.2M', margin: '28%', highlight: 'Dominance' },
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
                          <div className="grid grid-cols-2 md:grid-cols-7 gap-4 items-center">
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
                              <div className="text-sm text-blue-300/80 mb-1">Hubs</div>
                              <div className="text-xl font-black text-white">{milestone.hubs}</div>
                            </div>
                            <div>
                              <div className="text-sm text-blue-300/80 mb-1">Spaces</div>
                              <div className="text-xl font-black text-white">{milestone.spaces}</div>
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
                </CardContent>
              </Card>

              {/* Key Metrics */}
              <Card className="bg-gradient-to-br from-black/60 to-black/40 border-blue-500/30 mb-12">
                <CardHeader>
                  <CardTitle className="flex items-center gap-3 text-white text-2xl">
                    <BarChart3 className="h-7 w-7 text-blue-400" />
                    Year 5 Key Metrics
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
                    {[
                      { label: 'Total Revenue', value: '$22M', icon: DollarSign, color: 'text-green-400' },
                      { label: 'Parking Spaces', value: '1,500', icon: ParkingCircle, color: 'text-blue-400' },
                      { label: 'Net Margin', value: '28%', icon: TrendingUp, color: 'text-emerald-400' },
                      { label: 'Net Profit', value: '$6.2M', icon: Award, color: 'text-green-400' },
                      { label: 'Active Users', value: '15,000', icon: Users, color: 'text-cyan-400' },
                      { label: 'Mobility Fleet', value: '300', icon: Bike, color: 'text-green-400' },
                      { label: 'Residences', value: '12 units', icon: Home, color: 'text-purple-400' },
                      { label: 'Team Size', value: '45', icon: Users, color: 'text-indigo-400' },
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

              {/* Funding */}
              <Card className="bg-gradient-to-br from-green-900/30 to-emerald-900/30 border-2 border-green-500/50">
                <CardContent className="p-12 text-center">
                  <DollarSign className="h-16 w-16 mx-auto mb-6 text-green-400" />
                  <h3 className="text-3xl font-black text-white mb-4">$8M Funding Request</h3>
                  <p className="text-blue-200/80 max-w-2xl mx-auto mb-8 text-lg">
                    Loan at 6% interest over 10 years for real estate acquisition, fleet deployment, and technology platform. 
                    Collateral: property ($7M value) + fleet assets ($1.2M).
                  </p>
                  <div className="grid md:grid-cols-4 gap-6">
                    {[
                      { label: 'Real Estate', amount: '$5M', percent: '62.5%' },
                      { label: 'Fleet & Tech', amount: '$1.7M', percent: '21.25%' },
                      { label: 'Marketing', amount: '$1M', percent: '12.5%' },
                      { label: 'Contingency', amount: '$0.3M', percent: '3.75%' },
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
