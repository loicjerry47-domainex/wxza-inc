import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "motion/react";
import { Card, CardContent, CardHeader, CardTitle } from "../../ui/card";
import { Button } from "../../ui/button";
import { Badge } from "../../ui/badge";
import { 
  Cloud, Server, Database, Zap, Shield, Globe, 
  Activity, AlertCircle, CheckCircle, Loader2,
  Box, Layers, Network, HardDrive, Cpu, Lock
} from "lucide-react";

interface ArchitectureDiagramVisualizerProps {
  deviceView: 'desktop' | 'tablet' | 'mobile';
}

export function ArchitectureDiagramVisualizer({ deviceView }: ArchitectureDiagramVisualizerProps) {
  const [selectedRegion, setSelectedRegion] = useState<string | null>("us-east-1");
  const [selectedLayer, setSelectedLayer] = useState<string | null>(null);
  const [showMetrics, setShowMetrics] = useState(true);
  const [liveStatus, setLiveStatus] = useState<Record<string, 'healthy' | 'degraded' | 'down'>>({});
  
  const isMobile = deviceView === 'mobile';

  // Simulate live status updates
  useEffect(() => {
    const interval = setInterval(() => {
      setLiveStatus({
        'cloudflare': Math.random() > 0.01 ? 'healthy' : 'degraded',
        'alb-us-east-1': Math.random() > 0.02 ? 'healthy' : 'degraded',
        'alb-eu-west-1': Math.random() > 0.02 ? 'healthy' : 'degraded',
        'eks-us-east-1': Math.random() > 0.01 ? 'healthy' : 'degraded',
        'eks-eu-west-1': Math.random() > 0.01 ? 'healthy' : 'degraded',
        'cockroachdb': Math.random() > 0.005 ? 'healthy' : 'degraded',
        'redis': Math.random() > 0.01 ? 'healthy' : 'degraded',
        'minio': Math.random() > 0.01 ? 'healthy' : 'degraded'
      });
    }, 3000);

    return () => clearInterval(interval);
  }, []);

  const regions = [
    { 
      id: "us-east-1", 
      name: "US East (N. Virginia)", 
      flag: "🇺🇸",
      status: "primary",
      stats: { nodes: 50, pods: 487, cpu: 68, memory: 72 }
    },
    { 
      id: "eu-west-1", 
      name: "EU West (Ireland)", 
      flag: "🇮🇪",
      status: "active",
      stats: { nodes: 35, pods: 312, cpu: 54, memory: 61 }
    },
    { 
      id: "ap-southeast-1", 
      name: "AP Southeast (Singapore)", 
      flag: "🇸🇬",
      status: "active",
      stats: { nodes: 30, pods: 278, cpu: 59, memory: 65 }
    }
  ];

  const layers = [
    {
      id: "edge",
      name: "Edge & CDN Layer",
      icon: Globe,
      color: "from-blue-500 to-cyan-500",
      components: [
        { 
          name: "Cloudflare CDN", 
          type: "CDN", 
          icon: Globe,
          status: liveStatus['cloudflare'] || 'healthy',
          metrics: { requests: "2.4M/min", cache_hit: "94.2%", latency: "12ms" }
        },
        { 
          name: "AWS Global Accelerator", 
          type: "Anycast", 
          icon: Network,
          status: 'healthy',
          metrics: { failover: "<3s", availability: "99.99%" }
        }
      ]
    },
    {
      id: "load-balancing",
      name: "Load Balancing Layer",
      icon: Activity,
      color: "from-green-500 to-emerald-500",
      components: [
        { 
          name: "Application Load Balancer", 
          type: "ALB", 
          icon: Activity,
          status: liveStatus['alb-us-east-1'] || 'healthy',
          metrics: { connections: "12.4K", throughput: "2.8Gbps", latency: "8ms" }
        },
        { 
          name: "WAF Rules", 
          type: "Security", 
          icon: Shield,
          status: 'healthy',
          metrics: { blocked: "1.2K/min", rules: "47 active" }
        }
      ]
    },
    {
      id: "compute",
      name: "Compute Layer (Kubernetes)",
      icon: Box,
      color: "from-purple-500 to-pink-500",
      components: [
        { 
          name: "EKS Control Plane", 
          type: "Kubernetes", 
          icon: Cpu,
          status: liveStatus['eks-us-east-1'] || 'healthy',
          metrics: { version: "1.28", nodes: "50", pods: "487" }
        },
        { 
          name: "API Gateway Pods", 
          type: "Deployment", 
          icon: Server,
          status: 'healthy',
          metrics: { replicas: "25/25", cpu: "68%", memory: "72%" }
        },
        { 
          name: "Render Engine Pods", 
          type: "Deployment", 
          icon: Zap,
          status: 'healthy',
          metrics: { replicas: "80/80", gpus: "80/80", queue: "147" }
        },
        { 
          name: "Istio Service Mesh", 
          type: "Service Mesh", 
          icon: Network,
          status: 'healthy',
          metrics: { mtls: "100%", policies: "23 active" }
        }
      ]
    },
    {
      id: "data",
      name: "Data Layer",
      icon: Database,
      color: "from-orange-500 to-red-500",
      components: [
        { 
          name: "CockroachDB Cluster", 
          type: "SQL Database", 
          icon: Database,
          status: liveStatus['cockroachdb'] || 'healthy',
          metrics: { nodes: "9", size: "2.8TB", qps: "12.4K", latency: "87ms" }
        },
        { 
          name: "Redis Cluster", 
          type: "Cache", 
          icon: Zap,
          status: liveStatus['redis'] || 'healthy',
          metrics: { nodes: "6", size: "450GB", hit_rate: "98.5%" }
        },
        { 
          name: "MinIO Storage", 
          type: "Object Storage", 
          icon: HardDrive,
          status: liveStatus['minio'] || 'healthy',
          metrics: { nodes: "16", size: "680TB", objects: "12M+" }
        },
        { 
          name: "Elasticsearch", 
          type: "Search", 
          icon: Database,
          status: 'healthy',
          metrics: { nodes: "12", indices: "240", docs: "847M" }
        }
      ]
    },
    {
      id: "security",
      name: "Security & Monitoring",
      icon: Shield,
      color: "from-red-500 to-pink-500",
      components: [
        { 
          name: "AWS KMS", 
          type: "Key Management", 
          icon: Lock,
          status: 'healthy',
          metrics: { keys: "247", requests: "48K/min" }
        },
        { 
          name: "Prometheus", 
          type: "Metrics", 
          icon: Activity,
          status: 'healthy',
          metrics: { series: "2.4M", storage: "1.2TB", scrapes: "15s" }
        },
        { 
          name: "AWS CloudTrail", 
          type: "Audit Logs", 
          icon: Shield,
          status: 'healthy',
          metrics: { events: "120K/hour", retention: "7 years" }
        }
      ]
    }
  ];

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'healthy': return <CheckCircle className="w-4 h-4 text-green-400" />;
      case 'degraded': return <AlertCircle className="w-4 h-4 text-yellow-400" />;
      case 'down': return <AlertCircle className="w-4 h-4 text-red-400" />;
      default: return <Loader2 className="w-4 h-4 text-gray-400 animate-spin" />;
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'healthy': return 'border-green-500/50 bg-green-500/10';
      case 'degraded': return 'border-yellow-500/50 bg-yellow-500/10';
      case 'down': return 'border-red-500/50 bg-red-500/10';
      default: return 'border-gray-500/50 bg-gray-500/10';
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
              <Cloud className="w-8 h-8 text-purple-400" />
            </div>
            <div>
              <h2 className="text-2xl font-semibold text-white">Infrastructure Architecture</h2>
              <p className="text-sm text-gray-400">Real-time global topology · 8 regions · 180 nodes</p>
            </div>
          </div>
          <Button
            size="sm"
            variant={showMetrics ? "default" : "outline"}
            onClick={() => setShowMetrics(!showMetrics)}
            className={showMetrics ? "bg-purple-500 hover:bg-purple-600" : ""}
          >
            <Activity className="w-4 h-4 mr-2" />
            {showMetrics ? "Hide" : "Show"} Metrics
          </Button>
        </div>

        {/* Global Status Banner */}
        <Card className="bg-gradient-to-r from-green-500/10 to-emerald-500/10 backdrop-blur-xl border-green-500/20">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <CheckCircle className="w-6 h-6 text-green-400" />
                <div>
                  <p className="font-semibold text-white">All Systems Operational</p>
                  <p className="text-xs text-gray-400">99.97% uptime · Last incident: 14 days ago</p>
                </div>
              </div>
              <div className="flex items-center gap-4 text-sm">
                <div className="text-center">
                  <p className="text-green-400 font-bold">2.4M</p>
                  <p className="text-xs text-gray-400">Req/min</p>
                </div>
                <div className="text-center">
                  <p className="text-cyan-400 font-bold">42ms</p>
                  <p className="text-xs text-gray-400">p95 Latency</p>
                </div>
                <div className="text-center">
                  <p className="text-purple-400 font-bold">487</p>
                  <p className="text-xs text-gray-400">Active Pods</p>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </motion.div>

      {/* Region Selector */}
      <div className="flex gap-2 overflow-x-auto pb-2">
        {regions.map((region, idx) => (
          <motion.button
            key={region.id}
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: idx * 0.1 }}
            onClick={() => setSelectedRegion(region.id)}
            className={`flex-shrink-0 px-4 py-3 rounded-xl border transition-all ${
              selectedRegion === region.id
                ? 'bg-gradient-to-r from-purple-500/20 to-pink-500/20 border-purple-500/50'
                : 'bg-white/5 border-white/10 hover:border-white/30'
            }`}
          >
            <div className="flex items-center gap-3">
              <span className="text-2xl">{region.flag}</span>
              <div className="text-left">
                <p className="font-semibold text-white text-sm">{region.name}</p>
                <div className="flex items-center gap-2 mt-1">
                  <Badge className={`${region.status === 'primary' ? 'bg-purple-500/20 text-purple-300 border-purple-500/30' : 'bg-cyan-500/20 text-cyan-300 border-cyan-500/30'} text-xs`}>
                    {region.status}
                  </Badge>
                  {showMetrics && (
                    <span className="text-xs text-gray-400">
                      {region.stats.nodes}N · {region.stats.pods}P
                    </span>
                  )}
                </div>
              </div>
            </div>
          </motion.button>
        ))}
      </div>

      {/* Architecture Layers */}
      <div className="space-y-4">
        {layers.map((layer, layerIdx) => (
          <motion.div
            key={layer.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: layerIdx * 0.1 }}
          >
            <Card 
              className={`bg-white/5 backdrop-blur-xl border-white/10 cursor-pointer transition-all ${
                selectedLayer === layer.id ? 'ring-2 ring-purple-500/50' : ''
              }`}
              onClick={() => setSelectedLayer(selectedLayer === layer.id ? null : layer.id)}
            >
              <CardHeader className={`bg-gradient-to-r ${layer.color} bg-opacity-20 p-4`}>
                <CardTitle className="flex items-center justify-between text-white">
                  <div className="flex items-center gap-3">
                    <layer.icon className="w-5 h-5" />
                    <span className="text-lg">{layer.name}</span>
                    <Badge className="bg-white/20 text-white border-0">
                      {layer.components.length} components
                    </Badge>
                  </div>
                  <div className="flex items-center gap-2">
                    {layer.components.every(c => c.status === 'healthy') ? (
                      <CheckCircle className="w-5 h-5 text-green-400" />
                    ) : (
                      <AlertCircle className="w-5 h-5 text-yellow-400" />
                    )}
                  </div>
                </CardTitle>
              </CardHeader>
              <CardContent className="p-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                  {layer.components.map((component, compIdx) => (
                    <motion.div
                      key={compIdx}
                      initial={{ opacity: 0, scale: 0.9 }}
                      animate={{ opacity: 1, scale: 1 }}
                      transition={{ delay: compIdx * 0.05 }}
                      className={`p-4 rounded-lg border ${getStatusColor(component.status)} backdrop-blur-xl`}
                    >
                      <div className="flex items-start justify-between mb-3">
                        <div className="flex items-center gap-3">
                          <div className={`p-2 rounded-lg bg-gradient-to-br ${layer.color} bg-opacity-20`}>
                            <component.icon className="w-5 h-5 text-white" />
                          </div>
                          <div>
                            <p className="font-semibold text-white text-sm">{component.name}</p>
                            <p className="text-xs text-gray-400">{component.type}</p>
                          </div>
                        </div>
                        {getStatusIcon(component.status)}
                      </div>

                      {showMetrics && component.metrics && (
                        <div className="space-y-1 mt-3 pt-3 border-t border-white/10">
                          {Object.entries(component.metrics).map(([key, value]) => (
                            <div key={key} className="flex items-center justify-between text-xs">
                              <span className="text-gray-400 capitalize">{key.replace('_', ' ')}</span>
                              <span className="font-semibold text-white">{value}</span>
                            </div>
                          ))}
                        </div>
                      )}
                    </motion.div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </motion.div>
        ))}
      </div>

      {/* Data Flow Visualization */}
      <Card className="bg-white/5 backdrop-blur-xl border-white/10">
        <CardHeader>
          <CardTitle className="flex items-center gap-3 text-white">
            <Network className="w-5 h-5 text-cyan-400" />
            Request Flow
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {[
              { step: 1, name: "Client Request", latency: "0ms", component: "User Device" },
              { step: 2, name: "CDN Edge", latency: "+12ms", component: "Cloudflare PoP" },
              { step: 3, name: "Global Accelerator", latency: "+3ms", component: "AWS Anycast" },
              { step: 4, name: "Load Balancer", latency: "+8ms", component: "Application LB" },
              { step: 5, name: "Service Mesh", latency: "+2ms", component: "Istio Gateway" },
              { step: 6, name: "Application", latency: "+15ms", component: "API Gateway Pod" },
              { step: 7, name: "Database Query", latency: "+87ms", component: "CockroachDB" },
              { step: 8, name: "Response", latency: "127ms total", component: "Client Receives" }
            ].map((flow, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: idx * 0.1 }}
                className="flex items-center gap-4"
              >
                <div className="flex items-center justify-center w-8 h-8 rounded-full bg-gradient-to-br from-purple-500 to-pink-500 text-white font-bold text-sm flex-shrink-0">
                  {flow.step}
                </div>
                <div className="flex-1">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="font-semibold text-white text-sm">{flow.name}</p>
                      <p className="text-xs text-gray-400">{flow.component}</p>
                    </div>
                    <Badge className={`${idx === 7 ? 'bg-green-500/20 text-green-300 border-green-500/30' : 'bg-cyan-500/20 text-cyan-300 border-cyan-500/30'}`}>
                      {flow.latency}
                    </Badge>
                  </div>
                </div>
                {idx < 7 && (
                  <motion.div
                    initial={{ scaleY: 0 }}
                    animate={{ scaleY: 1 }}
                    transition={{ delay: idx * 0.1 + 0.05 }}
                    className="absolute left-7 w-0.5 h-4 bg-gradient-to-b from-purple-500 to-pink-500 ml-[15px] mt-12"
                  />
                )}
              </motion.div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Infrastructure Stats */}
      <Card className="bg-white/5 backdrop-blur-xl border-white/10">
        <CardHeader>
          <CardTitle className="flex items-center gap-3 text-white">
            <Layers className="w-5 h-5 text-purple-400" />
            Infrastructure Capacity
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {[
              { label: "Total Nodes", value: "180", max: "1,200", icon: Server, color: "text-blue-400" },
              { label: "GPU Instances", value: "240", max: "2,000", icon: Zap, color: "text-yellow-400" },
              { label: "vCPU Cores", value: "7,200", max: "48,000", icon: Cpu, color: "text-purple-400" },
              { label: "Total Memory", value: "144TB", max: "960TB", icon: HardDrive, color: "text-green-400" }
            ].map((stat, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: idx * 0.1 }}
                className="p-4 bg-white/5 rounded-lg border border-white/10"
              >
                <div className="flex items-center gap-2 mb-2">
                  <stat.icon className={`w-4 h-4 ${stat.color}`} />
                  <p className="text-xs text-gray-400">{stat.label}</p>
                </div>
                <p className={`text-2xl font-bold ${stat.color}`}>{stat.value}</p>
                <p className="text-xs text-gray-500 mt-1">Target 2027: {stat.max}</p>
              </motion.div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
