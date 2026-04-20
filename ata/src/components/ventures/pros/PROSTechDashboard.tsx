import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "motion/react";
import { Card, CardContent, CardHeader, CardTitle } from "../../ui/card";
import { Button } from "../../ui/button";
import { Badge } from "../../ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../../ui/tabs";
import { DatabaseSchemaVisualizer } from "./DatabaseSchemaVisualizer";
import { ArchitectureDiagramVisualizer } from "./ArchitectureDiagramVisualizer";
import { APIPlayground } from "./APIPlayground";
import { RealTimeMetricsDashboard } from "./RealTimeMetricsDashboard";
import { SecurityComplianceTracker } from "./SecurityComplianceTracker";
import { CostCalculator } from "./CostCalculator";
import {
  Cpu,
  Zap,
  Database,
  Cloud,
  Shield,
  Activity,
  Code,
  Server,
  Workflow,
  Boxes,
  Eye,
  Radio,
  Gauge,
  Thermometer,
  Waves,
  Sparkles,
  BarChart3,
  FileCode,
  Settings,
  Layers,
  Binary,
  Braces,
  Terminal,
  Lock,
  DollarSign
} from "lucide-react";

interface PROSTechDashboardProps {
  deviceView: 'desktop' | 'tablet' | 'mobile';
}

export function PROSTechDashboard({ deviceView }: PROSTechDashboardProps) {
  const [activeTab, setActiveTab] = useState<'overview' | 'holographic' | 'api' | 'performance' | 'database' | 'architecture' | 'playground' | 'metrics' | 'security' | 'cost'>('overview');
  
  const isMobile = deviceView === 'mobile';
  const isTablet = deviceView === 'tablet';

  // Dynamic System State
  const [systemMetrics, setSystemMetrics] = useState({
    latency: 7.2,
    uptime: 99.97,
    activeUsers: 2847,
    gpuTemp: 68,
    renderQueue: 142,
    powerDraw: 840 // Watts
  });

  // Simulate live system data
  useEffect(() => {
    const interval = setInterval(() => {
      setSystemMetrics(prev => ({
        latency: Math.max(4, Math.min(12, prev.latency + (Math.random() - 0.5) * 2)),
        uptime: prev.uptime, // Keep stable usually
        activeUsers: Math.floor(Math.max(2000, prev.activeUsers + (Math.random() - 0.5) * 50)),
        gpuTemp: Math.max(60, Math.min(85, prev.gpuTemp + (Math.random() - 0.5) * 3)),
        renderQueue: Math.floor(Math.max(50, prev.renderQueue + (Math.random() - 0.5) * 20)),
        powerDraw: Math.floor(Math.max(800, Math.min(950, prev.powerDraw + (Math.random() - 0.5) * 10)))
      }));
    }, 2000);
    return () => clearInterval(interval);
  }, []);

  // Technical specifications data
  const coreSpecs = [
    {
      category: "Holographic Display",
      icon: Eye,
      specs: [
        { label: "Display Type", value: "Volumetric Light Field", highlight: true },
        { label: "Resolution", value: "4K per eye (8K effective)" },
        { label: "Refresh Rate", value: "120Hz native" },
        { label: "Viewing Angle", value: "360° horizontal" },
        { label: "Spatial Precision", value: "0.1mm (sub-millimeter)" },
        { label: "Brightness", value: "1,500 nits peak" }
      ]
    },
    {
      category: "Compute Architecture",
      icon: Cpu,
      specs: [
        { label: "Primary GPU", value: "NVIDIA RTX 6000 Ada (48GB)" },
        { label: "Neural Processor", value: "Custom NPU (200 TOPS)" },
        { label: "CPU", value: "AMD Threadripper PRO 7995WX (96-core)" },
        { label: "System Memory", value: "256GB DDR5-5600 ECC" },
        { label: "Storage", value: "4TB NVMe Gen5 (14GB/s)" },
        { label: "Network", value: "10GbE + WiFi 7 (6GHz)" }
      ]
    },
    {
      category: "AI/ML Pipeline",
      icon: Sparkles,
      specs: [
        { label: "Design Assistant", value: "GPT-4 Vision" },
        { label: "Texture Generation", value: "Stable Diffusion XL" },
        { label: "3D from Sketch", value: "ControlNet" },
        { label: "Gesture Recognition", value: "Custom transformer models" },
        { label: "Voice Processing", value: "Whisper V3" },
        { label: "Inference Speed", value: "Voice→3D in 6 seconds" }
      ]
    }
  ];

  const holographicTech = [
    {
      title: "Acousto-Optic Deflector Array",
      icon: Radio,
      details: [
        "192 independent AOD units",
        "40MHz ultrasonic frequency",
        "TeO₂ crystal substrate",
        "±15° deflection range",
        "Sub-microsecond switching"
      ],
      patent: "US Patent 11,234,567"
    },
    {
      title: "Photopolymer Waveguide",
      icon: Layers,
      details: [
        "Custom methacrylate-based polymer",
        "99.5% optical transmission",
        "5μm microstructured gratings",
        "Dual-layer design (2× brightness)",
        "Self-cleaning coating"
      ],
      patent: "US Patent 11,345,678"
    },
    {
      title: "RGB Laser Array",
      icon: Zap,
      details: [
        "576 laser diodes (RGB triads)",
        "86.4W total optical power",
        "120% DCI-P3 color gamut",
        "Class 1M eye-safe",
        "ΔE < 1.0 color accuracy"
      ],
      patent: "Eye-safe certified (IEC 60825-1)"
    },
    {
      title: "Spatial Tracking System",
      icon: Activity,
      details: [
        "12× 960fps global shutter cameras",
        "4× 1550nm solid-state LiDAR",
        "3.1mm hand tracking accuracy",
        "<3ms latency",
        "10,000+ gesture vocabulary"
      ],
      patent: "US Patent 11,567,890"
    }
  ];

  const apiEndpoints = [
    {
      method: "GET",
      endpoint: "/v2/designs",
      description: "List all designs",
      auth: "Bearer Token",
      rateLimit: "300/min"
    },
    {
      method: "POST",
      endpoint: "/v2/designs",
      description: "Create new design",
      auth: "Bearer Token",
      rateLimit: "60/min"
    },
    {
      method: "POST",
      endpoint: "/v2/render/jobs",
      description: "Submit rendering job",
      auth: "Bearer Token",
      rateLimit: "120/min"
    },
    {
      method: "POST",
      endpoint: "/v2/ai/generate",
      description: "AI design generation",
      auth: "Bearer Token",
      rateLimit: "3/min"
    },
    {
      method: "POST",
      endpoint: "/v2/collab/sessions",
      description: "Create collaboration session",
      auth: "Bearer Token",
      rateLimit: "60/min"
    },
    {
      method: "WS",
      endpoint: "wss://ws.pros.io/v2/stream",
      description: "Real-time WebSocket connection",
      auth: "Bearer Token",
      rateLimit: "10 concurrent"
    }
  ];

  const performanceMetrics = [
    {
      metric: "Rendering Latency",
      target: "<10ms",
      achieved: `${systemMetrics.latency.toFixed(1)}ms`,
      status: systemMetrics.latency < 10 ? "excellent" : "good",
      icon: Gauge
    },
    {
      metric: "Hand Tracking Accuracy",
      target: "<5mm",
      achieved: "3.1mm",
      status: "excellent",
      icon: Activity
    },
    {
      metric: "Gesture Recognition",
      target: ">95%",
      achieved: "97.8%",
      status: "excellent",
      icon: Sparkles
    },
    {
      metric: "Scene Complexity",
      target: "10M polygons",
      achieved: "15M polygons",
      status: "excellent",
      icon: Boxes
    },
    {
      metric: "Cloud Render Time",
      target: "<30s",
      achieved: "18s avg",
      status: "excellent",
      icon: Cloud
    },
    {
      metric: "API Latency",
      target: "<100ms",
      achieved: "42ms p95",
      status: "excellent",
      icon: Zap
    },
    {
      metric: "Uptime SLA",
      target: "99.9%",
      achieved: `${systemMetrics.uptime}%`,
      status: "excellent",
      icon: Activity
    },
    {
      metric: "Concurrent Users",
      target: "1,000",
      achieved: systemMetrics.activeUsers.toLocaleString(),
      status: "excellent",
      icon: Server
    }
  ];

  const techStack = {
    frontend: [
      { name: "React 19", purpose: "Server Components, Concurrent Rendering" },
      { name: "Three.js + WebGPU", purpose: "3D rendering pipeline" },
      { name: "Rust WASM", purpose: "Performance-critical computation" }
    ],
    backend: [
      { name: "Rust (Actix-web)", purpose: "Core API services" },
      { name: "Python (FastAPI)", purpose: "AI/ML inference" },
      { name: "Go", purpose: "Real-time collaboration (gRPC)" },
      { name: "Elixir/Phoenix", purpose: "WebSocket server (1M+ connections)" }
    ],
    database: [
      { name: "CockroachDB", purpose: "Distributed SQL" },
      { name: "Redis Stack", purpose: "Cache + vector search" },
      { name: "MinIO", purpose: "S3-compatible object storage" },
      { name: "TimescaleDB", purpose: "Metrics time-series" }
    ],
    infrastructure: [
      { name: "Kubernetes (K3s)", purpose: "Container orchestration on AWS EKS" },
      { name: "Istio", purpose: "Service mesh" },
      { name: "Cilium", purpose: "eBPF networking" },
      { name: "ArgoCD", purpose: "GitOps deployment" },
      { name: "Prometheus + Grafana", purpose: "Observability" }
    ],
    aiml: [
      { name: "GPT-4 Vision", purpose: "Design assistant" },
      { name: "Stable Diffusion XL", purpose: "Texture generation" },
      { name: "ControlNet", purpose: "3D from sketches" },
      { name: "Whisper V3", purpose: "Voice processing" },
      { name: "Custom transformers", purpose: "Gesture → intent" }
    ]
  };

  const getMethodColor = (method: string) => {
    switch (method) {
      case "GET": return "bg-blue-500/10 text-blue-400 border-blue-500/30";
      case "POST": return "bg-green-500/10 text-green-400 border-green-500/30";
      case "PUT": return "bg-yellow-500/10 text-yellow-400 border-yellow-500/30";
      case "DELETE": return "bg-red-500/10 text-red-400 border-red-500/30";
      case "WS": return "bg-purple-500/10 text-purple-400 border-purple-500/30";
      default: return "bg-gray-500/10 text-gray-400 border-gray-500/30";
    }
  };

  return (
    <div className={`space-y-${isMobile ? '4' : '6'} p-${isMobile ? '4' : '6'}`}>
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="space-y-4"
      >
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="p-3 rounded-xl bg-gradient-to-br from-purple-500/20 to-pink-500/20 backdrop-blur-xl border border-white/10">
              <Code className="w-8 h-8 text-purple-400" />
            </div>
            <div>
              <h2 className="text-2xl font-semibold text-white">Technical Architecture</h2>
              <p className="text-sm text-gray-400">Proprietary holographic display technology & infrastructure</p>
            </div>
          </div>
          
          {/* Live Indicator */}
          <div className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-green-500/10 border border-green-500/20">
             <div className="w-2 h-2 rounded-full bg-green-400 animate-pulse" />
             <span className="text-xs font-medium text-green-400">System Operational</span>
          </div>
        </div>

        {/* Quick Stats - Now Dynamic */}
        <div className={`grid grid-cols-2 ${isTablet ? 'lg:grid-cols-4' : 'lg:grid-cols-4'} gap-4`}>
          {[
            { label: "Patents", value: "23 Granted", icon: Shield, color: "from-blue-500 to-cyan-500" },
            { label: "API Endpoints", value: "150+", icon: Braces, color: "from-purple-500 to-pink-500" },
            { label: "Uptime", value: `${systemMetrics.uptime}%`, icon: Activity, color: "from-green-500 to-emerald-500" },
            { label: "Latency", value: `${systemMetrics.latency.toFixed(1)}ms`, icon: Zap, color: "from-yellow-500 to-orange-500" }
          ].map((stat, index) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: index * 0.1 }}
            >
              <Card className="glass-light liquid-border glass-hover transition-all duration-300">
                <CardContent className="p-4">
                  <div className="flex items-center justify-between mb-2">
                    <stat.icon className="w-5 h-5 text-gray-400" />
                    <Badge className={`bg-gradient-to-r ${stat.color} text-white border-0`}>
                      {stat.value}
                    </Badge>
                  </div>
                  <p className="text-xs text-gray-400">{stat.label}</p>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>
      </motion.div>

      {/* Tabs */}
      <Tabs value={activeTab} onValueChange={(v) => setActiveTab(v as any)} className="space-y-6">
        <TabsList className="glass-light liquid-border p-1">
          <TabsTrigger value="overview" className="data-[state=active]:bg-white/10">
            <Cpu className="w-4 h-4 mr-2" />
            Overview
          </TabsTrigger>
          <TabsTrigger value="holographic" className="data-[state=active]:bg-white/10">
            <Eye className="w-4 h-4 mr-2" />
            Holographic Tech
          </TabsTrigger>
          <TabsTrigger value="api" className="data-[state=active]:bg-white/10">
            <Code className="w-4 h-4 mr-2" />
            API
          </TabsTrigger>
          <TabsTrigger value="performance" className="data-[state=active]:bg-white/10">
            <Activity className="w-4 h-4 mr-2" />
            Performance
          </TabsTrigger>
          <TabsTrigger value="database" className="data-[state=active]:bg-white/10">
            <Database className="w-4 h-4 mr-2" />
            Database Schema
          </TabsTrigger>
          <TabsTrigger value="architecture" className="data-[state=active]:bg-white/10">
            <Layers className="w-4 h-4 mr-2" />
            Architecture Diagram
          </TabsTrigger>
          <TabsTrigger value="playground" className="data-[state=active]:bg-white/10">
            <Terminal className="w-4 h-4 mr-2" />
            API Playground
          </TabsTrigger>
          <TabsTrigger value="metrics" className="data-[state=active]:bg-white/10">
            <BarChart3 className="w-4 h-4 mr-2" />
            Real-Time Metrics
          </TabsTrigger>
          <TabsTrigger value="security" className="data-[state=active]:bg-white/10">
            <Lock className="w-4 h-4 mr-2" />
            Security Compliance
          </TabsTrigger>
          <TabsTrigger value="cost" className="data-[state=active]:bg-white/10">
            <DollarSign className="w-4 h-4 mr-2" />
            Cost Calculator
          </TabsTrigger>
        </TabsList>

        {/* Overview Tab */}
        <TabsContent value="overview" className="space-y-6">
          <AnimatePresence mode="wait">
            <motion.div
              key="overview"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="space-y-6"
            >
              {/* Core Specifications */}
              {coreSpecs.map((category, idx) => (
                <Card key={idx} className="glass-light liquid-border">
                  <CardHeader>
                    <CardTitle className="flex items-center justify-between text-white">
                        <div className="flex items-center gap-3">
                          <div className="p-2 rounded-lg bg-gradient-to-br from-purple-500/20 to-pink-500/20">
                            <category.icon className="w-5 h-5 text-purple-400" />
                          </div>
                          {category.category}
                        </div>
                        {/* Optional simulated activity for compute category */}
                        {category.category === "Compute Architecture" && (
                           <div className="flex items-center gap-2">
                              <span className="text-xs text-gray-400">Load:</span>
                              <div className="w-16 h-1.5 bg-white/10 rounded-full overflow-hidden">
                                <motion.div 
                                  className="h-full bg-purple-500"
                                  animate={{ width: `${(systemMetrics.activeUsers / 5000) * 100}%` }}
                                  transition={{ duration: 0.5 }}
                                />
                              </div>
                           </div>
                        )}
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      {category.specs.map((spec, specIdx) => (
                        <div
                          key={specIdx}
                          className={`p-4 rounded-lg bg-white/5 border border-white/10 ${
                            spec.highlight ? 'ring-2 ring-purple-500/30' : ''
                          }`}
                        >
                          <p className="text-xs text-gray-400 mb-1">{spec.label}</p>
                          <p className={`text-sm ${spec.highlight ? 'text-purple-400 font-semibold' : 'text-white'}`}>
                            {spec.value}
                          </p>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              ))}

              {/* Technology Stack */}
              <Card className="glass-light liquid-border">
                <CardHeader>
                  <CardTitle className="flex items-center gap-3 text-white">
                    <div className="p-2 rounded-lg bg-gradient-to-br from-blue-500/20 to-cyan-500/20">
                      <Layers className="w-5 h-5 text-blue-400" />
                    </div>
                    Technology Stack (Cutting-Edge)
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-6">
                  {Object.entries(techStack).map(([layer, technologies]) => (
                    <div key={layer}>
                      <h4 className="text-sm font-semibold text-gray-300 mb-3 uppercase tracking-wider">
                        {layer}
                      </h4>
                      <div className="space-y-2">
                        {technologies.map((tech, idx) => (
                          <div key={idx} className="flex items-start gap-3 p-3 rounded-lg bg-white/5 border border-white/10">
                            <Binary className="w-4 h-4 text-cyan-400 mt-0.5 flex-shrink-0" />
                            <div className="flex-1 min-w-0">
                              <p className="text-sm font-medium text-white">{tech.name}</p>
                              <p className="text-xs text-gray-400 mt-0.5">{tech.purpose}</p>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  ))}
                </CardContent>
              </Card>
            </motion.div>
          </AnimatePresence>
        </TabsContent>

        {/* Holographic Tech Tab */}
        <TabsContent value="holographic" className="space-y-6">
          <AnimatePresence mode="wait">
            <motion.div
              key="holographic"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="space-y-6"
            >
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                {holographicTech.map((tech, idx) => (
                  <Card key={idx} className="glass-light liquid-border glass-hover transition-all duration-300">
                    <CardHeader>
                      <CardTitle className="flex items-center gap-3 text-white">
                        <div className="p-2 rounded-lg bg-gradient-to-br from-purple-500/20 to-pink-500/20">
                          <tech.icon className="w-5 h-5 text-purple-400" />
                        </div>
                        <span className="text-base">{tech.title}</span>
                      </CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <div className="space-y-2">
                        {tech.details.map((detail, detailIdx) => (
                          <div key={detailIdx} className="flex items-start gap-2">
                            <div className="w-1.5 h-1.5 rounded-full bg-purple-400 mt-2 flex-shrink-0" />
                            <p className="text-sm text-gray-300">{detail}</p>
                          </div>
                        ))}
                      </div>
                      <div className="pt-3 border-t border-white/10">
                        <Badge className="bg-blue-500/10 text-blue-400 border-blue-500/30">
                          <Shield className="w-3 h-3 mr-1" />
                          {tech.patent}
                        </Badge>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>

              {/* Rendering Pipeline */}
              <Card className="glass-light liquid-border">
                <CardHeader>
                  <CardTitle className="flex items-center gap-3 text-white">
                    <div className="p-2 rounded-lg bg-gradient-to-br from-green-500/20 to-emerald-500/20">
                      <Workflow className="w-5 h-5 text-green-400" />
                    </div>
                    Rendering Pipeline ({systemMetrics.latency.toFixed(1)}ms total)
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    {[
                      { step: "Scene Graph Update", time: "0.8ms", color: "from-blue-500 to-cyan-500" },
                      { step: "Holographic View Generation", time: "2.1ms", color: "from-purple-500 to-pink-500" },
                      { step: "Ray Tracing & Lighting", time: "2.8ms", color: "from-green-500 to-emerald-500" },
                      { step: "Holographic Encoding", time: "1.0ms", color: "from-yellow-500 to-orange-500" },
                      { step: "AOD Control Signal", time: "0.3ms", color: "from-red-500 to-pink-500" },
                      { step: "Display Output", time: "0.2ms", color: "from-indigo-500 to-purple-500" }
                    ].map((stage, idx) => (
                      <div key={idx} className="flex items-center gap-3 p-3 rounded-lg bg-white/5 border border-white/10">
                        <div className="flex-shrink-0 w-8 h-8 rounded-lg bg-gradient-to-br from-purple-500/20 to-pink-500/20 flex items-center justify-center">
                          <span className="text-xs font-semibold text-purple-400">{idx + 1}</span>
                        </div>
                        <div className="flex-1">
                          <p className="text-sm font-medium text-white">{stage.step}</p>
                        </div>
                        <Badge className={`bg-gradient-to-r ${stage.color} text-white border-0 flex-shrink-0`}>
                          {stage.time}
                        </Badge>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          </AnimatePresence>
        </TabsContent>

        {/* API Tab */}
        <TabsContent value="api" className="space-y-6">
          <AnimatePresence mode="wait">
            <motion.div
              key="api"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="space-y-6"
            >
              <Card className="glass-light liquid-border">
                <CardHeader>
                  <CardTitle className="flex items-center gap-3 text-white">
                    <div className="p-2 rounded-lg bg-gradient-to-br from-cyan-500/20 to-blue-500/20">
                      <Braces className="w-5 h-5 text-cyan-400" />
                    </div>
                    API Endpoints (v2.1.0)
                  </CardTitle>
                  <p className="text-sm text-gray-400 mt-2">
                    Base URL: <code className="px-2 py-1 rounded bg-white/10 text-cyan-400">https://api.pros.io/v2</code>
                  </p>
                </CardHeader>
                <CardContent className="space-y-3">
                  {apiEndpoints.map((endpoint, idx) => (
                    <div key={idx} className="p-4 rounded-lg bg-white/5 border border-white/10 hover:bg-white/10 transition-all duration-300">
                      <div className="flex items-center gap-3 mb-2">
                        <Badge className={`${getMethodColor(endpoint.method)} border`}>
                          {endpoint.method}
                        </Badge>
                        <code className="text-sm text-gray-300 font-mono">{endpoint.endpoint}</code>
                      </div>
                      <p className="text-sm text-gray-400 mb-2">{endpoint.description}</p>
                      <div className="flex items-center gap-4 text-xs">
                        <span className="flex items-center gap-1 text-gray-500">
                          <Shield className="w-3 h-3" />
                          {endpoint.auth}
                        </span>
                        <span className="flex items-center gap-1 text-gray-500">
                          <Gauge className="w-3 h-3" />
                          {endpoint.rateLimit}
                        </span>
                      </div>
                    </div>
                  ))}
                </CardContent>
              </Card>

              {/* SDK Support */}
              <Card className="glass-light liquid-border">
                <CardHeader>
                  <CardTitle className="flex items-center gap-3 text-white">
                    <div className="p-2 rounded-lg bg-gradient-to-br from-green-500/20 to-emerald-500/20">
                      <FileCode className="w-5 h-5 text-green-400" />
                    </div>
                    Official SDKs & Libraries
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    {[
                      { lang: "JavaScript/TypeScript", package: "@pros/sdk", install: "npm install @pros/sdk" },
                      { lang: "Python", package: "pros-sdk", install: "pip install pros-sdk" },
                      { lang: "Unity", package: "unity-plugin", install: "Unity Package Manager" }
                    ].map((sdk, idx) => (
                      <div key={idx} className="p-4 rounded-lg bg-white/5 border border-white/10">
                        <p className="font-medium text-white mb-2">{sdk.lang}</p>
                        <code className="text-xs text-cyan-400 block mb-2">{sdk.package}</code>
                        <p className="text-xs text-gray-400">{sdk.install}</p>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          </AnimatePresence>
        </TabsContent>

        {/* Performance Tab */}
        <TabsContent value="performance" className="space-y-6">
          <AnimatePresence mode="wait">
            <motion.div
              key="performance"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="space-y-6"
            >
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {performanceMetrics.map((metric, idx) => (
                  <Card key={idx} className="glass-light liquid-border glass-hover transition-all duration-300">
                    <CardContent className="p-6">
                      <div className="flex items-start justify-between mb-4">
                        <div className="flex items-center gap-3">
                          <div className="p-2 rounded-lg bg-gradient-to-br from-green-500/20 to-emerald-500/20">
                            <metric.icon className="w-5 h-5 text-green-400" />
                          </div>
                          <div>
                            <p className="font-medium text-white">{metric.metric}</p>
                            <p className="text-xs text-gray-400">Target: {metric.target}</p>
                          </div>
                        </div>
                        <Badge className="bg-green-500/10 text-green-400 border-green-500/30">
                          ✓ Excellent
                        </Badge>
                      </div>
                      <div className="space-y-2">
                        <div className="flex justify-between items-baseline">
                          <span className="text-sm text-gray-400">Achieved</span>
                          <span className="text-2xl font-bold text-green-400">{metric.achieved}</span>
                        </div>
                        <div className="w-full h-2 rounded-full bg-white/10 overflow-hidden">
                          <motion.div
                            initial={{ width: 0 }}
                            animate={{ width: "100%" }}
                            transition={{ delay: idx * 0.1, duration: 0.5 }}
                            className="h-full bg-gradient-to-r from-green-500 to-emerald-500"
                          />
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>

              {/* Infrastructure Stats */}
              <Card className="glass-light liquid-border">
                <CardHeader>
                  <CardTitle className="flex items-center gap-3 text-white">
                    <div className="p-2 rounded-lg bg-gradient-to-br from-blue-500/20 to-cyan-500/20">
                      <Server className="w-5 h-5 text-blue-400" />
                    </div>
                    Current Infrastructure Capacity
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                    {[
                      { label: "GPU Nodes", value: "240", unit: "H100 80GB" },
                      { label: "CPU Cores", value: "1,200", unit: "AMD EPYC" },
                      { label: "System Memory", value: "48TB", unit: "Total" },
                      { label: "Storage", value: "2PB", unit: "MinIO" },
                      { label: "AWS Regions", value: "8", unit: "Global" },
                      { label: "Edge PoPs", value: "45", unit: "Cloudflare" },
                      { label: "Bandwidth", value: "100Gbps", unit: "Aggregate" },
                      { label: "Active Users", value: systemMetrics.activeUsers.toLocaleString(), unit: "Creators" }
                    ].map((stat, idx) => (
                      <div key={idx} className="p-4 rounded-lg bg-white/5 border border-white/10 text-center">
                        <p className="text-2xl font-bold text-white mb-1">{stat.value}</p>
                        <p className="text-xs text-gray-400">{stat.label}</p>
                        <p className="text-xs text-gray-500 mt-1">{stat.unit}</p>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          </AnimatePresence>
        </TabsContent>

        {/* Database Schema Tab */}
        <TabsContent value="database" className="space-y-6">
          <AnimatePresence mode="wait">
            <motion.div
              key="database"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="space-y-6"
            >
              <DatabaseSchemaVisualizer deviceView={deviceView} />
            </motion.div>
          </AnimatePresence>
        </TabsContent>

        {/* Architecture Diagram Tab */}
        <TabsContent value="architecture" className="space-y-6">
          <AnimatePresence mode="wait">
            <motion.div
              key="architecture"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="space-y-6"
            >
              <ArchitectureDiagramVisualizer deviceView={deviceView} />
            </motion.div>
          </AnimatePresence>
        </TabsContent>

        {/* API Playground Tab */}
        <TabsContent value="playground" className="space-y-6">
          <AnimatePresence mode="wait">
            <motion.div
              key="playground"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="space-y-6"
            >
              <APIPlayground deviceView={deviceView} />
            </motion.div>
          </AnimatePresence>
        </TabsContent>

        {/* Real-Time Metrics Tab */}
        <TabsContent value="metrics" className="space-y-6">
          <AnimatePresence mode="wait">
            <motion.div
              key="metrics"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="space-y-6"
            >
              <RealTimeMetricsDashboard deviceView={deviceView} />
            </motion.div>
          </AnimatePresence>
        </TabsContent>

        {/* Security Compliance Tab */}
        <TabsContent value="security" className="space-y-6">
          <AnimatePresence mode="wait">
            <motion.div
              key="security"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="space-y-6"
            >
              <SecurityComplianceTracker deviceView={deviceView} />
            </motion.div>
          </AnimatePresence>
        </TabsContent>

        {/* Cost Calculator Tab */}
        <TabsContent value="cost" className="space-y-6">
          <AnimatePresence mode="wait">
            <motion.div
              key="cost"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="space-y-6"
            >
              <CostCalculator deviceView={deviceView} />
            </motion.div>
          </AnimatePresence>
        </TabsContent>
      </Tabs>

      {/* Documentation Links */}
      <Card className="glass-light liquid-border">
        <CardContent className="p-6">
          <div className="flex items-start gap-4">
            <div className="p-3 rounded-xl bg-purple-500/20">
              <FileCode className="w-6 h-6 text-purple-400" />
            </div>
            <div className="flex-1">
              <h3 className="font-semibold text-white mb-2">Complete Technical Documentation</h3>
              <p className="text-sm text-gray-300 mb-4">
                Access comprehensive technical specifications, API references, and integration guides.
              </p>
              <div className="flex flex-wrap gap-2">
                <Button size="sm" className="bg-white/10 hover:bg-white/20 text-white border border-white/20">
                  <FileCode className="w-4 h-4 mr-2" />
                  Technical Overview
                </Button>
                <Button size="sm" className="bg-white/10 hover:bg-white/20 text-white border border-white/20">
                  <Eye className="w-4 h-4 mr-2" />
                  Holographic Architecture
                </Button>
                <Button size="sm" className="bg-white/10 hover:bg-white/20 text-white border border-white/20">
                  <Code className="w-4 h-4 mr-2" />
                  API Documentation
                </Button>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
