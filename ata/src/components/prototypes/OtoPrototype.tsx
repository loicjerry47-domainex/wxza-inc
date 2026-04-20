import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "motion/react";
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";
import { Button } from "../ui/button";
import { Badge } from "../ui/badge";
import { Input } from "../ui/input";
import { Textarea } from "../ui/textarea";
import { ImageWithFallback } from "../figma/ImageWithFallback";
import { Avatar, AvatarFallback } from "../ui/avatar";
import { 
  Heart,
  Calendar,
  MessageSquare,
  Send,
  Sparkles,
  Users,
  Clock,
  Bell,
  Mail,
  Phone,
  MessageCircle,
  Instagram,
  Facebook,
  Cake,
  Gift,
  TrendingUp,
  Globe,
  Zap,
  Target,
  DollarSign,
  BarChart3,
  Brain,
  Wand2,
  CheckCircle,
  Star,
  Award,
  Settings,
  Volume2,
  Play,
  Download,
  Share2
} from "lucide-react";

interface OtoPrototypeProps {
  deviceView: 'desktop' | 'tablet' | 'mobile';
}

export function OtoPrototype({ deviceView }: OtoPrototypeProps) {
  const [activeSection, setActiveSection] = useState<'hero' | 'generator' | 'calendar' | 'analytics' | 'vision'>('hero');
  const [selectedContact, setSelectedContact] = useState<any>(null);
  const [messageStyle, setMessageStyle] = useState<'warm' | 'professional' | 'funny' | 'heartfelt'>('warm');
  const [selectedChannels, setSelectedChannels] = useState<string[]>(['sms']);
  const [isGenerating, setIsGenerating] = useState(false);
  const [generatedMessage, setGeneratedMessage] = useState<string | null>(null);
  const [greetingsSent, setGreetingsSent] = useState(24789);
  const [relationshipsManaged, setRelationshipsManaged] = useState(1247);

  const isMobile = deviceView === 'mobile';
  const isTablet = deviceView === 'tablet';

  // Simulate real-time data
  useEffect(() => {
    const interval = setInterval(() => {
      setGreetingsSent(prev => prev + Math.floor(Math.random() * 5));
      setRelationshipsManaged(prev => prev + (Math.random() > 0.9 ? 1 : 0));
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  const upcomingBirthdays = [
    {
      id: 1,
      name: 'Sarah Martinez',
      date: 'Tomorrow',
      fullDate: 'Nov 28',
      relationship: 'Friend',
      age: 28,
      preferredChannel: 'whatsapp',
      scheduledTime: '9:00 AM',
      status: 'scheduled',
      avatar: 'SM'
    },
    {
      id: 2,
      name: 'James Wilson',
      date: 'In 3 days',
      fullDate: 'Dec 1',
      relationship: 'Colleague',
      age: 35,
      preferredChannel: 'email',
      scheduledTime: '8:30 AM',
      status: 'scheduled',
      avatar: 'JW'
    },
    {
      id: 3,
      name: 'Emily Chen',
      date: 'In 5 days',
      fullDate: 'Dec 3',
      relationship: 'Family',
      age: 42,
      preferredChannel: 'sms',
      scheduledTime: '12:00 PM',
      status: 'pending',
      avatar: 'EC'
    },
    {
      id: 4,
      name: 'Michael Brown',
      date: 'In 1 week',
      fullDate: 'Dec 5',
      relationship: 'Client',
      age: 31,
      preferredChannel: 'linkedin',
      scheduledTime: '10:00 AM',
      status: 'pending',
      avatar: 'MB'
    },
  ];

  const channels = [
    { id: 'sms', name: 'SMS', icon: MessageSquare, color: 'from-blue-500 to-cyan-500' },
    { id: 'whatsapp', name: 'WhatsApp', icon: MessageCircle, color: 'from-green-500 to-emerald-500' },
    { id: 'email', name: 'Email', icon: Mail, color: 'from-purple-500 to-pink-500' },
    { id: 'instagram', name: 'Instagram', icon: Instagram, color: 'from-orange-500 to-red-500' },
    { id: 'facebook', name: 'Facebook', icon: Facebook, color: 'from-blue-600 to-indigo-600' },
  ];

  const messageStyles = [
    {
      id: 'warm',
      name: 'Warm & Friendly',
      description: 'Casual and heartfelt',
      example: 'Happy Birthday! 🎉 Hope your special day is filled with joy and amazing moments!',
      color: 'from-orange-500 to-pink-500'
    },
    {
      id: 'professional',
      name: 'Professional',
      description: 'Polished and respectful',
      example: 'Wishing you a wonderful birthday and continued success in the year ahead.',
      color: 'from-blue-500 to-cyan-500'
    },
    {
      id: 'funny',
      name: 'Funny & Light',
      description: 'Humorous and playful',
      example: 'Another year older, but still looking younger than your age! Happy Birthday! 😄',
      color: 'from-purple-500 to-pink-500'
    },
    {
      id: 'heartfelt',
      name: 'Heartfelt',
      description: 'Deep and meaningful',
      example: 'On your birthday, I want you to know how much you mean to me. May this year bring you endless happiness. ❤️',
      color: 'from-red-500 to-rose-500'
    },
  ];

  const handleGenerateMessage = () => {
    setIsGenerating(true);
    setTimeout(() => {
      const messages = {
        warm: `Happy Birthday, ${selectedContact?.name}! 🎉✨ Wishing you a day filled with laughter, love, and all your favorite things. Here's to another amazing year ahead!`,
        professional: `Warm birthday wishes to you, ${selectedContact?.name}. May this special day mark the beginning of a successful and fulfilling year. Best regards.`,
        funny: `${selectedContact?.name}, congrats on leveling up! 🎮 You've unlocked: +1 Year of Wisdom (hopefully!). Happy Birthday! 🎂`,
        heartfelt: `Dear ${selectedContact?.name}, on your special day, I want to celebrate the incredible person you are. Your kindness and spirit inspire everyone around you. Happy Birthday! ❤️🎈`
      };
      setGeneratedMessage(messages[messageStyle]);
      setIsGenerating(false);
    }, 2000);
  };

  const navigationTabs = [
    { id: 'hero', label: 'Home', icon: Heart },
    { id: 'generator', label: 'AI Generator', icon: Wand2 },
    { id: 'calendar', label: 'Calendar', icon: Calendar },
    { id: 'analytics', label: 'Analytics', icon: BarChart3 },
    { id: 'vision', label: '$100M Vision', icon: TrendingUp },
  ];

  return (
    <div className="h-full text-white overflow-auto relative">
      <div className="relative z-10">
        {/* Header */}
        <div className="glass-strong border-b border-white/5 sticky top-0 z-50">
          <div className="flex items-center justify-between p-4">
            <div className="flex items-center gap-4">
              <div className="relative">
                <div className="w-14 h-14 bg-gradient-to-br from-blue-500 via-cyan-500 to-pink-500 rounded-2xl p-3 shadow-xl">
                  <Heart className="h-8 w-8 text-white" />
                </div>
                <motion.div 
                  className="absolute inset-0 bg-cyan-500 rounded-2xl blur-xl opacity-50"
                  animate={{ scale: [1, 1.2, 1], opacity: [0.3, 0.5, 0.3] }}
                  transition={{ duration: 2, repeat: Infinity }}
                />
              </div>
              <div>
                <h1 className="text-2xl font-black bg-gradient-to-r from-blue-400 via-cyan-400 to-pink-400 bg-clip-text text-transparent tracking-tight">
                  OTO
                </h1>
                <p className="text-sm text-cyan-300 font-bold tracking-wide">RELATIONSHIP MANAGER</p>
              </div>
            </div>
            
            {!isMobile && (
              <div className="flex items-center gap-6">
                <div className="text-right">
                  <div className="text-xs text-cyan-300/80 font-bold uppercase tracking-wide">Greetings Sent</div>
                  <div className="text-xl font-black text-cyan-400">{greetingsSent.toLocaleString()}</div>
                </div>
                <div className="text-right">
                  <div className="text-xs text-pink-300/80 font-bold uppercase tracking-wide">Relationships</div>
                  <div className="text-xl font-black text-pink-400">{relationshipsManaged.toLocaleString()}</div>
                </div>
                <Badge className="bg-gradient-to-r from-cyan-500/20 to-pink-500/20 text-cyan-300 border border-cyan-500/40 px-4 py-2 font-black uppercase tracking-wide">
                  <Sparkles className="h-3 w-3 mr-2" />
                  AI-Powered
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
                      ? 'bg-gradient-to-r from-cyan-600 via-blue-600 to-pink-600 text-white shadow-lg shadow-cyan-500/50 font-black' 
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
                    src="https://images.unsplash.com/photo-1763951778440-13af353b122a?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxiaXJ0aGRheSUyMGNlbGVicmF0aW9uJTIwZnJpZW5kc3xlbnwxfHx8fDE3NjQxOTQ4Nzh8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral"
                    alt="Birthday Celebration"
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-r from-blue-900/95 via-cyan-900/90 to-pink-900/95" />
                  
                  {/* Floating Birthday Icons */}
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
                        rotate: [0, 360],
                      }}
                      transition={{
                        duration: Math.random() * 8 + 8,
                        repeat: Infinity,
                        delay: Math.random() * 5,
                      }}
                    >
                      {i % 3 === 0 ? (
                        <Cake className="h-6 w-6 text-pink-400/60" />
                      ) : i % 3 === 1 ? (
                        <Gift className="h-6 w-6 text-cyan-400/60" />
                      ) : (
                        <Heart className="h-6 w-6 text-blue-400/60" />
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
                      <h1 className="text-6xl md:text-7xl font-black mb-6 bg-gradient-to-r from-cyan-300 via-blue-300 to-pink-300 bg-clip-text text-transparent leading-tight">
                        NEVER MISS A<br />BIRTHDAY AGAIN
                      </h1>
                    </motion.div>
                    
                    <motion.p
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.8, delay: 0.2 }}
                      className="text-2xl text-cyan-200 mb-8 font-medium leading-relaxed"
                    >
                      AI-powered birthday greetings that sound like <span className="text-white font-bold">you.</span><br className="hidden md:block" />
                      Automated. Personalized. Never the same message twice.
                    </motion.p>

                    <motion.div
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.8, delay: 0.4 }}
                      className="flex flex-wrap gap-4 justify-center mb-8"
                    >
                      <Button 
                        size="lg" 
                        onClick={() => setActiveSection('generator')}
                        className="bg-gradient-to-r from-cyan-600 via-blue-600 to-pink-600 hover:from-cyan-500 hover:via-blue-500 hover:to-pink-500 text-white font-black px-8 py-6 text-lg shadow-2xl shadow-cyan-500/50 transition-colors duration-300 hover:scale-105"
                      >
                        <Wand2 className="h-6 w-6 mr-3" />
                        Try AI Generator
                      </Button>
                      <Button 
                        size="lg" 
                        variant="outline"
                        onClick={() => setActiveSection('vision')}
                        className="border-2 border-cyan-400/50 text-cyan-200 hover:bg-cyan-500/20 font-black px-8 py-6 text-lg backdrop-blur-xl"
                      >
                        <TrendingUp className="h-6 w-6 mr-3" />
                        $100M Vision
                      </Button>
                    </motion.div>

                    <motion.div
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{ duration: 0.8, delay: 0.6 }}
                      className="flex flex-wrap gap-8 justify-center"
                    >
                      {[
                        { label: '24,789+', sublabel: 'Greetings Sent', icon: Send },
                        { label: '5 Channels', sublabel: 'SMS to Instagram', icon: MessageSquare },
                        { label: '100% Unique', sublabel: 'Never Repeated', icon: Sparkles },
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

              {/* Key Features */}
              <div className="p-6 md:p-12 max-w-7xl mx-auto">
                <div className="text-center mb-12">
                  <h2 className="text-4xl md:text-5xl font-black mb-4 bg-gradient-to-r from-cyan-400 to-pink-400 bg-clip-text text-transparent">
                    How OTO Works
                  </h2>
                  <p className="text-xl text-cyan-200/80 max-w-3xl mx-auto">
                    It's about <span className="text-white font-bold">you</span>, not them — Automated greetings that maintain your relationships
                  </p>
                </div>

                <div className={`grid gap-8 ${isMobile ? 'grid-cols-1' : isTablet ? 'grid-cols-2' : 'grid-cols-3'}`}>
                  {[
                    {
                      icon: Brain,
                      title: 'AI Message Generation',
                      description: 'Our AI creates unique, personalized messages that sound like you. Trained on millions of greetings — no two messages are ever the same.',
                      gradient: 'from-cyan-500 to-blue-500'
                    },
                    {
                      icon: Calendar,
                      title: 'Smart Scheduling',
                      description: 'Import contacts and birthdays automatically. Set delivery time, frequency, and preferred channel. OTO handles the rest.',
                      gradient: 'from-blue-500 to-purple-500'
                    },
                    {
                      icon: MessageSquare,
                      title: 'Multi-Channel Delivery',
                      description: 'Send greetings via SMS, WhatsApp, Email, Instagram, or Facebook. Choose the right channel for each relationship.',
                      gradient: 'from-purple-500 to-pink-500'
                    },
                    {
                      icon: Users,
                      title: 'Relationship Types',
                      description: 'Categorize contacts as family, friends, colleagues, or clients. Messages adapt to match the relationship depth.',
                      gradient: 'from-pink-500 to-rose-500'
                    },
                    {
                      icon: Volume2,
                      title: 'Voice Confirmation',
                      description: 'Hear your message before sending. Approve with voice commands or make quick edits. Complete control, zero effort.',
                      gradient: 'from-green-500 to-emerald-500'
                    },
                    {
                      icon: Sparkles,
                      title: 'Infinite Variety',
                      description: 'Access a vast catalog of message templates. AI generates unlimited variations so you never send the same greeting twice.',
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
                      <Card className="bg-black/30 backdrop-blur-xl border-cyan-500/20 hover:border-cyan-400/50 transition-colors duration-300 hover:shadow-2xl hover:shadow-cyan-500/20 h-full">
                        <CardContent className="p-8">
                          <div className={`w-16 h-16 mb-6 rounded-2xl bg-gradient-to-br ${feature.gradient} p-4 shadow-lg`}>
                            <feature.icon className="h-8 w-8 text-white" />
                          </div>
                          <h3 className="text-2xl font-black mb-3 text-white">{feature.title}</h3>
                          <p className="text-cyan-200/70 leading-relaxed">{feature.description}</p>
                        </CardContent>
                      </Card>
                    </motion.div>
                  ))}
                </div>

                {/* Upcoming Birthdays Preview */}
                <div className="mt-20">
                  <div className="text-center mb-12">
                    <h2 className="text-4xl font-black mb-4 text-white">Upcoming Celebrations</h2>
                    <p className="text-xl text-cyan-200/80">Never forget another important date</p>
                  </div>

                  <div className={`grid gap-6 ${isMobile ? 'grid-cols-1' : 'grid-cols-2'}`}>
                    {upcomingBirthdays.slice(0, 4).map((birthday, index) => (
                      <motion.div
                        key={birthday.id}
                        initial={{ opacity: 0, x: index % 2 === 0 ? -30 : 30 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: index * 0.1 }}
                      >
                        <Card className="bg-black/30 backdrop-blur-xl border-cyan-500/30 hover:border-cyan-400 transition-colors duration-300">
                          <CardContent className="p-6">
                            <div className="flex items-center gap-4 mb-4">
                              <Avatar className="h-14 w-14 bg-gradient-to-br from-cyan-500 to-pink-500">
                                <AvatarFallback className="text-white font-black text-lg">
                                  {birthday.avatar}
                                </AvatarFallback>
                              </Avatar>
                              <div className="flex-1">
                                <h3 className="text-xl font-black text-white">{birthday.name}</h3>
                                <p className="text-sm text-cyan-300">{birthday.relationship}</p>
                              </div>
                              <div className="text-right">
                                <div className="text-2xl font-black text-cyan-400">{birthday.fullDate}</div>
                                <div className="text-xs text-cyan-300/70">{birthday.date}</div>
                              </div>
                            </div>
                            
                            <div className="flex items-center gap-4 mb-3">
                              <Clock className="h-4 w-4 text-cyan-400" />
                              <span className="text-sm text-cyan-200">Scheduled: {birthday.scheduledTime}</span>
                            </div>

                            <div className="flex items-center gap-2">
                              <Badge className={`${
                                birthday.status === 'scheduled' 
                                  ? 'bg-green-500/20 text-green-400 border-green-500/40' 
                                  : 'bg-yellow-500/20 text-yellow-400 border-yellow-500/40'
                              }`}>
                                {birthday.status === 'scheduled' ? <CheckCircle className="h-3 w-3 mr-1" /> : <Clock className="h-3 w-3 mr-1" />}
                                {birthday.status}
                              </Badge>
                              <Badge className="bg-cyan-500/20 text-cyan-400 border-cyan-500/40">
                                {birthday.preferredChannel}
                              </Badge>
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

        {/* AI Message Generator Section */}
        {activeSection === 'generator' && (
          <AnimatePresence mode="wait">
            <motion.div
              key="generator"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="p-6 md:p-12 max-w-6xl mx-auto"
            >
              <div className="text-center mb-12">
                <h2 className="text-5xl font-black mb-4 bg-gradient-to-r from-cyan-400 via-blue-400 to-pink-400 bg-clip-text text-transparent">
                  AI Message Generator
                </h2>
                <p className="text-xl text-cyan-200/80 max-w-3xl mx-auto">
                  Create personalized greetings powered by AI — never send the same message twice
                </p>
              </div>

              {/* Contact Selection */}
              <Card className="bg-black/30 backdrop-blur-xl border-cyan-500/30 mb-8">
                <CardHeader>
                  <CardTitle className="flex items-center gap-3 text-white text-2xl">
                    <Users className="h-7 w-7 text-cyan-400" />
                    Select Contact
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                    {upcomingBirthdays.map((contact) => (
                      <Card
                        key={contact.id}
                        onClick={() => setSelectedContact(contact)}
                        className={`cursor-pointer transition-colors duration-300 ${
                          selectedContact?.id === contact.id
                            ? 'border-2 border-cyan-400 bg-cyan-500/20 shadow-lg shadow-cyan-500/30'
                            : 'border border-cyan-500/30 bg-black/40 hover:border-cyan-400'
                        }`}
                      >
                        <CardContent className="p-4 text-center">
                          <Avatar className="h-16 w-16 mx-auto mb-3 bg-gradient-to-br from-cyan-500 to-pink-500">
                            <AvatarFallback className="text-white font-black text-xl">
                              {contact.avatar}
                            </AvatarFallback>
                          </Avatar>
                          <div className="text-sm font-black text-white mb-1">{contact.name}</div>
                          <div className="text-xs text-cyan-300">{contact.relationship}</div>
                        </CardContent>
                      </Card>
                    ))}
                  </div>
                </CardContent>
              </Card>

              {selectedContact && (
                <>
                  {/* Message Style Selection */}
                  <Card className="bg-black/30 backdrop-blur-xl border-cyan-500/30 mb-8">
                    <CardHeader>
                      <CardTitle className="flex items-center gap-3 text-white text-2xl">
                        <Sparkles className="h-7 w-7 text-cyan-400" />
                        Choose Message Style
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="grid md:grid-cols-2 gap-6">
                        {messageStyles.map((style) => (
                          <Card
                            key={style.id}
                            onClick={() => setMessageStyle(style.id as any)}
                            className={`cursor-pointer transition-colors duration-300 ${
                              messageStyle === style.id
                                ? 'border-2 border-cyan-400 bg-cyan-500/20 shadow-lg shadow-cyan-500/30'
                                : 'border border-cyan-500/30 bg-black/40 hover:border-cyan-400'
                            }`}
                          >
                            <CardContent className="p-6">
                              <div className="flex items-center gap-3 mb-3">
                                <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${style.color} p-3 flex items-center justify-center`}>
                                  <Wand2 className="h-6 w-6 text-white" />
                                </div>
                                <div>
                                  <h3 className="font-black text-white">{style.name}</h3>
                                  <p className="text-sm text-cyan-300">{style.description}</p>
                                </div>
                              </div>
                              <p className="text-sm text-cyan-200/70 italic">"{style.example}"</p>
                            </CardContent>
                          </Card>
                        ))}
                      </div>
                    </CardContent>
                  </Card>

                  {/* Channel Selection */}
                  <Card className="bg-black/30 backdrop-blur-xl border-cyan-500/30 mb-8">
                    <CardHeader>
                      <CardTitle className="flex items-center gap-3 text-white text-2xl">
                        <MessageSquare className="h-7 w-7 text-cyan-400" />
                        Delivery Channels
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
                        {channels.map((channel) => {
                          const Icon = channel.icon;
                          const isSelected = selectedChannels.includes(channel.id);
                          return (
                            <Card
                              key={channel.id}
                              onClick={() => {
                                if (isSelected) {
                                  setSelectedChannels(selectedChannels.filter(c => c !== channel.id));
                                } else {
                                  setSelectedChannels([...selectedChannels, channel.id]);
                                }
                              }}
                              className={`cursor-pointer transition-colors duration-300 ${
                                isSelected
                                  ? 'border-2 border-cyan-400 bg-cyan-500/20 shadow-lg shadow-cyan-500/30'
                                  : 'border border-cyan-500/30 bg-black/40 hover:border-cyan-400'
                              }`}
                            >
                              <CardContent className="p-4 text-center">
                                <div className={`w-12 h-12 mx-auto mb-2 rounded-xl bg-gradient-to-br ${channel.color} p-3 flex items-center justify-center`}>
                                  <Icon className="h-6 w-6 text-white" />
                                </div>
                                <div className="text-sm font-black text-white">{channel.name}</div>
                              </CardContent>
                            </Card>
                          );
                        })}
                      </div>
                    </CardContent>
                  </Card>

                  {/* Generate Button */}
                  <div className="mb-8">
                    <Button
                      size="lg"
                      onClick={handleGenerateMessage}
                      disabled={isGenerating || !selectedContact}
                      className="w-full bg-gradient-to-r from-cyan-600 via-blue-600 to-pink-600 hover:from-cyan-500 hover:via-blue-500 hover:to-pink-500 text-white font-black text-xl py-6 shadow-2xl shadow-cyan-500/50 disabled:opacity-50"
                    >
                      {isGenerating ? (
                        <>
                          <Brain className="h-6 w-6 mr-3 animate-pulse" />
                          AI Generating...
                        </>
                      ) : (
                        <>
                          <Wand2 className="h-6 w-6 mr-3" />
                          Generate Unique Message
                        </>
                      )}
                    </Button>
                  </div>

                  {/* Generated Message Preview */}
                  {generatedMessage && (
                    <motion.div
                      initial={{ opacity: 0, scale: 0.95 }}
                      animate={{ opacity: 1, scale: 1 }}
                      className="space-y-6"
                    >
                      <Card className="bg-gradient-to-br from-green-900/30 to-emerald-900/30 border-2 border-green-500/50">
                        <CardContent className="p-8">
                          <div className="flex items-center gap-3 mb-6">
                            <motion.div
                              initial={{ scale: 0 }}
                              animate={{ scale: 1 }}
                              transition={{ type: "spring", duration: 0.5 }}
                              className="w-14 h-14 bg-gradient-to-br from-green-500 to-emerald-500 rounded-full flex items-center justify-center"
                            >
                              <CheckCircle className="h-8 w-8 text-white" />
                            </motion.div>
                            <div>
                              <h3 className="text-2xl font-black text-white">Message Ready!</h3>
                              <p className="text-green-200">Preview and confirm before sending</p>
                            </div>
                          </div>

                          <div className="bg-black/40 rounded-xl p-6 mb-6 border border-green-500/30">
                            <p className="text-lg text-white leading-relaxed">{generatedMessage}</p>
                          </div>

                          <div className="flex gap-4">
                            <Button
                              size="lg"
                              className="flex-1 bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-500 hover:to-emerald-500 font-black"
                            >
                              <Volume2 className="h-5 w-5 mr-2" />
                              Hear Message
                            </Button>
                            <Button
                              size="lg"
                              className="flex-1 bg-gradient-to-r from-cyan-600 to-blue-600 hover:from-cyan-500 hover:to-blue-500 font-black"
                            >
                              <Send className="h-5 w-5 mr-2" />
                              Send Now
                            </Button>
                          </div>

                          <div className="mt-4 flex gap-2">
                            <Button
                              variant="outline"
                              size="sm"
                              className="flex-1 border-green-500/30 text-green-300 hover:bg-green-500/20"
                            >
                              <Clock className="h-4 w-4 mr-2" />
                              Schedule
                            </Button>
                            <Button
                              variant="outline"
                              size="sm"
                              onClick={handleGenerateMessage}
                              className="flex-1 border-green-500/30 text-green-300 hover:bg-green-500/20"
                            >
                              <Sparkles className="h-4 w-4 mr-2" />
                              Regenerate
                            </Button>
                          </div>
                        </CardContent>
                      </Card>
                    </motion.div>
                  )}
                </>
              )}
            </motion.div>
          </AnimatePresence>
        )}

        {/* Calendar Section */}
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
                <h2 className="text-5xl font-black mb-4 bg-gradient-to-r from-cyan-400 via-blue-400 to-pink-400 bg-clip-text text-transparent">
                  Birthday Calendar
                </h2>
                <p className="text-xl text-cyan-200/80 max-w-3xl mx-auto">
                  All your important dates in one place
                </p>
              </div>

              {/* Calendar Grid */}
              <div className="grid gap-6">
                {upcomingBirthdays.map((birthday, index) => (
                  <motion.div
                    key={birthday.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.1 }}
                  >
                    <Card className="bg-black/30 backdrop-blur-xl border-cyan-500/30 hover:border-cyan-400 transition-colors duration-300">
                      <CardContent className="p-6">
                        <div className={`grid ${isMobile ? 'grid-cols-1' : 'md:grid-cols-4'} gap-6 items-center`}>
                          {/* Date */}
                          <div className="text-center">
                            <div className="text-5xl font-black text-cyan-400 mb-1">{birthday.fullDate.split(' ')[1]}</div>
                            <div className="text-sm text-cyan-300 font-bold uppercase">{birthday.fullDate.split(' ')[0]}</div>
                            <Badge className="mt-2 bg-cyan-500/20 text-cyan-400 border-cyan-500/40">
                              {birthday.date}
                            </Badge>
                          </div>

                          {/* Contact Info */}
                          <div className="flex items-center gap-4">
                            <Avatar className="h-16 w-16 bg-gradient-to-br from-cyan-500 to-pink-500">
                              <AvatarFallback className="text-white font-black text-xl">
                                {birthday.avatar}
                              </AvatarFallback>
                            </Avatar>
                            <div>
                              <h3 className="text-xl font-black text-white">{birthday.name}</h3>
                              <p className="text-sm text-cyan-300">{birthday.relationship} • Turning {birthday.age}</p>
                            </div>
                          </div>

                          {/* Delivery Info */}
                          <div className="space-y-2">
                            <div className="flex items-center gap-2 text-sm text-cyan-200">
                              <Clock className="h-4 w-4 text-cyan-400" />
                              Scheduled: {birthday.scheduledTime}
                            </div>
                            <div className="flex items-center gap-2 text-sm text-cyan-200">
                              <MessageSquare className="h-4 w-4 text-cyan-400" />
                              Via {birthday.preferredChannel}
                            </div>
                          </div>

                          {/* Actions */}
                          <div className="flex flex-col gap-2">
                            <Badge className={`${
                              birthday.status === 'scheduled' 
                                ? 'bg-green-500/20 text-green-400 border-green-500/40' 
                                : 'bg-yellow-500/20 text-yellow-400 border-yellow-500/40'
                            } justify-center`}>
                              {birthday.status === 'scheduled' ? <CheckCircle className="h-3 w-3 mr-1" /> : <Clock className="h-3 w-3 mr-1" />}
                              {birthday.status}
                            </Badge>
                            <Button
                              size="sm"
                              variant="outline"
                              className="border-cyan-500/30 text-cyan-300 hover:bg-cyan-500/20"
                              onClick={() => {
                                setSelectedContact(birthday);
                                setActiveSection('generator');
                              }}
                            >
                              <Settings className="h-4 w-4 mr-2" />
                              Edit
                            </Button>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  </motion.div>
                ))}
              </div>

              {/* Add Contact CTA */}
              <Card className="mt-8 bg-gradient-to-br from-cyan-900/30 to-blue-900/30 border-2 border-cyan-500/40">
                <CardContent className="p-12 text-center">
                  <Calendar className="h-16 w-16 mx-auto mb-4 text-cyan-400" />
                  <h3 className="text-2xl font-black text-white mb-2">Add More Contacts</h3>
                  <p className="text-cyan-200/80 mb-6">Import from your phone, Google, or enter manually</p>
                  <Button
                    size="lg"
                    className="bg-gradient-to-r from-cyan-600 to-blue-600 hover:from-cyan-500 hover:to-blue-500 font-black"
                  >
                    <Users className="h-5 w-5 mr-2" />
                    Import Contacts
                  </Button>
                </CardContent>
              </Card>
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
                <h2 className="text-5xl font-black mb-4 bg-gradient-to-r from-cyan-400 via-blue-400 to-pink-400 bg-clip-text text-transparent">
                  Relationship Analytics
                </h2>
                <p className="text-xl text-cyan-200/80 max-w-3xl mx-auto">
                  Track your connection strength and engagement metrics
                </p>
              </div>

              {/* Key Metrics Grid */}
              <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-12">
                {[
                  { label: 'Greetings Sent', value: greetingsSent.toLocaleString(), icon: Send, color: 'from-cyan-500 to-blue-500', change: '+127 this month' },
                  { label: 'Relationships Managed', value: relationshipsManaged.toLocaleString(), icon: Users, color: 'from-blue-500 to-purple-500', change: '+23 this month' },
                  { label: 'Response Rate', value: '87%', icon: MessageSquare, color: 'from-purple-500 to-pink-500', change: '+5% vs last month' },
                  { label: 'Perfect Timing', value: '94%', icon: Clock, color: 'from-pink-500 to-rose-500', change: 'Optimal delivery' },
                ].map((metric, idx) => (
                  <motion.div
                    key={idx}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: idx * 0.1 }}
                  >
                    <Card className="bg-black/30 backdrop-blur-xl border-cyan-500/30 hover:border-cyan-400 transition-colors duration-300">
                      <CardContent className="p-6 text-center">
                        <div className={`w-14 h-14 mx-auto mb-4 rounded-xl bg-gradient-to-br ${metric.color} p-3 flex items-center justify-center`}>
                          <metric.icon className="h-8 w-8 text-white" />
                        </div>
                        <div className="text-3xl font-black text-white mb-1">{metric.value}</div>
                        <div className="text-sm text-cyan-300 mb-2">{metric.label}</div>
                        <div className="text-xs text-green-400 font-bold">{metric.change}</div>
                      </CardContent>
                    </Card>
                  </motion.div>
                ))}
              </div>

              {/* Channel Performance */}
              <Card className="bg-black/30 backdrop-blur-xl border-cyan-500/30 mb-12">
                <CardHeader>
                  <CardTitle className="flex items-center gap-3 text-white text-2xl">
                    <BarChart3 className="h-7 w-7 text-cyan-400" />
                    Channel Performance
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {[
                      { channel: 'SMS', sent: 12847, rate: 92, color: 'from-blue-500 to-cyan-500' },
                      { channel: 'WhatsApp', sent: 8234, rate: 89, color: 'from-green-500 to-emerald-500' },
                      { channel: 'Email', sent: 6891, rate: 76, color: 'from-purple-500 to-pink-500' },
                      { channel: 'Instagram', sent: 4234, rate: 84, color: 'from-orange-500 to-red-500' },
                      { channel: 'Facebook', sent: 2583, rate: 71, color: 'from-blue-600 to-indigo-600' },
                    ].map((channel, idx) => (
                      <div key={idx}>
                        <div className="flex justify-between items-center mb-2">
                          <div className="flex items-center gap-3">
                            <div className={`w-10 h-10 rounded-lg bg-gradient-to-br ${channel.color} p-2 flex items-center justify-center`}>
                              <MessageSquare className="h-6 w-6 text-white" />
                            </div>
                            <div>
                              <div className="font-black text-white">{channel.channel}</div>
                              <div className="text-sm text-cyan-300">{channel.sent.toLocaleString()} sent</div>
                            </div>
                          </div>
                          <div className="text-right">
                            <div className="text-xl font-black text-white">{channel.rate}%</div>
                            <div className="text-xs text-cyan-300">Response Rate</div>
                          </div>
                        </div>
                        <div className="h-2 bg-black/40 rounded-full overflow-hidden">
                          <motion.div
                            initial={{ width: 0 }}
                            animate={{ width: `${channel.rate}%` }}
                            transition={{ duration: 1, delay: idx * 0.1 }}
                            className={`h-full bg-gradient-to-r ${channel.color}`}
                          />
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>

              {/* Relationship Strength Distribution */}
              <div className={`grid gap-6 ${isMobile ? 'grid-cols-1' : 'grid-cols-3'}`}>
                {[
                  { type: 'Family', count: 247, strength: 96, color: 'from-red-500 to-rose-500' },
                  { type: 'Friends', count: 634, strength: 84, color: 'from-cyan-500 to-blue-500' },
                  { type: 'Colleagues', count: 366, strength: 71, color: 'from-purple-500 to-pink-500' },
                ].map((category, idx) => (
                  <motion.div
                    key={idx}
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: idx * 0.1 }}
                  >
                    <Card className="bg-black/30 backdrop-blur-xl border-cyan-500/30">
                      <CardContent className="p-6">
                        <div className={`w-12 h-12 mb-4 rounded-xl bg-gradient-to-br ${category.color} p-3 flex items-center justify-center`}>
                          <Heart className="h-6 w-6 text-white" />
                        </div>
                        <h3 className="text-xl font-black text-white mb-2">{category.type}</h3>
                        <div className="text-3xl font-black text-cyan-400 mb-1">{category.count}</div>
                        <div className="text-sm text-cyan-300 mb-4">Contacts</div>
                        <div className="flex items-center gap-2">
                          <div className="flex-1 h-2 bg-black/40 rounded-full overflow-hidden">
                            <div 
                              className={`h-full bg-gradient-to-r ${category.color}`}
                              style={{ width: `${category.strength}%` }}
                            />
                          </div>
                          <span className="text-sm font-black text-white">{category.strength}%</span>
                        </div>
                        <div className="text-xs text-cyan-300/70 mt-1">Avg. Connection Strength</div>
                      </CardContent>
                    </Card>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          </AnimatePresence>
        )}

        {/* $100M Vision Section */}
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
                  $100 MILLION VISION
                </h2>
                <p className="text-2xl text-cyan-200/80 max-w-3xl mx-auto">
                  Year 5 Projection — The Global Connection Platform
                </p>
              </div>

              {/* Financial Hero */}
              <Card className="bg-gradient-to-br from-green-900/30 to-emerald-900/30 border-2 border-green-500/50 mb-12 overflow-hidden">
                <div className="relative h-64">
                  <ImageWithFallback
                    src="https://images.unsplash.com/photo-1746727207301-aeaf7c08f9c0?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxwZW9wbGUlMjBjb25uZWN0aW9uJTIwY29tbXVuaXR5fGVufDF8fHx8MTc2NDIxMTUxOXww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral"
                    alt="Global Connection"
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
                        $100,000,000
                      </motion.div>
                      <div className="text-2xl text-green-200 font-bold">Year 5 ARR Target</div>
                    </div>
                  </div>
                </div>
              </Card>

              {/* 5-Year Growth Trajectory */}
              <Card className="bg-black/30 backdrop-blur-xl border-cyan-500/30 mb-12">
                <CardHeader>
                  <CardTitle className="flex items-center gap-3 text-white text-2xl">
                    <TrendingUp className="h-7 w-7 text-green-400" />
                    5-Year Growth Trajectory
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {[
                      { year: 1, revenue: '$2.6M', users: '50K', highlight: 'MVP Launch', profit: '$400K' },
                      { year: 2, revenue: '$10M', users: '200K', highlight: 'Multi-Channel Expansion', profit: '$2M' },
                      { year: 3, revenue: '$28M', users: '800K', highlight: 'Enterprise Launch', profit: '$8M' },
                      { year: 4, revenue: '$60M', users: '2M', highlight: 'Global Expansion', profit: '$18M' },
                      { year: 5, revenue: '$100M', users: '5M', highlight: 'Market Leadership', profit: '$30M' },
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
                              <div className="text-sm text-cyan-300/80 mb-1">Profit</div>
                              <div className="text-xl font-black text-green-400">{milestone.profit}</div>
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

              {/* Market Opportunity */}
              <div className={`grid gap-8 mb-12 ${isMobile ? 'grid-cols-1' : 'grid-cols-2'}`}>
                <Card className="bg-gradient-to-br from-cyan-900/30 to-blue-900/30 border-2 border-cyan-500/40">
                  <CardHeader>
                    <CardTitle className="flex items-center gap-3 text-white text-xl">
                      <Globe className="h-6 w-6 text-cyan-400" />
                      Market Size
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="text-5xl font-black text-white mb-2">$50B+</div>
                    <div className="text-cyan-200/80 mb-6">Global Relationship Management Market</div>
                    <div className="space-y-3">
                      {[
                        { segment: 'Individuals', size: '2B+ users', share: '$30B' },
                        { segment: 'SME Businesses', size: '400M companies', share: '$15B' },
                        { segment: 'Communities', size: '10M+ orgs', share: '$5B' },
                      ].map((segment, idx) => (
                        <div key={idx} className="flex justify-between items-center p-3 bg-black/40 rounded-lg">
                          <div>
                            <div className="font-black text-white">{segment.segment}</div>
                            <div className="text-sm text-cyan-300">{segment.size}</div>
                          </div>
                          <div className="text-xl font-black text-cyan-400">{segment.share}</div>
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
                        { stream: 'Freemium ($9.99/mo)', revenue: '$30M', percentage: '30%' },
                        { stream: 'Enterprise ($49/mo)', revenue: '$50M', percentage: '50%' },
                        { stream: 'API Access', revenue: '$20M', percentage: '20%' },
                      ].map((stream, idx) => (
                        <div key={idx}>
                          <div className="flex justify-between items-center mb-2">
                            <div>
                              <div className="font-black text-white">{stream.stream}</div>
                              <div className="text-sm text-green-300">Year 5 Target</div>
                            </div>
                            <div>
                              <div className="text-xl font-black text-white">{stream.revenue}</div>
                              <div className="text-sm text-green-300 text-right">{stream.percentage}</div>
                            </div>
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

              {/* Key Metrics Year 5 */}
              <Card className="bg-black/30 backdrop-blur-xl border-cyan-500/30">
                <CardHeader>
                  <CardTitle className="flex items-center gap-3 text-white text-2xl">
                    <BarChart3 className="h-7 w-7 text-cyan-400" />
                    Year 5 Key Metrics
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
                    {[
                      { label: 'Annual Revenue', value: '$100M', icon: DollarSign, color: 'text-green-400' },
                      { label: 'Active Users', value: '5M', icon: Users, color: 'text-blue-400' },
                      { label: 'Greetings/Day', value: '500K+', icon: Send, color: 'text-cyan-400' },
                      { label: 'Global Markets', value: '50+', icon: Globe, color: 'text-pink-400' },
                      { label: 'Enterprise Clients', value: '10K+', icon: Award, color: 'text-purple-400' },
                      { label: 'Languages', value: '25+', icon: MessageSquare, color: 'text-orange-400' },
                      { label: 'Net Profit', value: '$30M', icon: TrendingUp, color: 'text-emerald-400' },
                      { label: 'Team Size', value: '250+', icon: Users, color: 'text-indigo-400' },
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
