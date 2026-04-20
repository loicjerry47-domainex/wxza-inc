import { useState, useEffect } from "react";
import { motion } from "motion/react";
import { Card, CardContent, CardHeader, CardTitle } from "../../ui/card";
import { Badge } from "../../ui/badge";
import { 
  Activity, TrendingUp, TrendingDown, Zap, Users, 
  Server, Database, Clock, AlertCircle, CheckCircle,
  Cpu, HardDrive, Network, Globe
} from "lucide-react";

interface RealTimeMetricsDashboardProps {
  deviceView: 'desktop' | 'tablet' | 'mobile';
}

export function RealTimeMetricsDashboard({ deviceView }: RealTimeMetricsDashboardProps) {
  const [metrics, setMetrics] = useState({
    requestsPerSecond: 2847,
    activeUsers: 12450,
    apiLatency: 87,
    errorRate: 0.12,
    cpuUsage: 68,
    memoryUsage: 72,
    gpuUtilization: 84,
    dbConnections: 487,
    cacheHitRate: 98.5,
    queueDepth: 147
  });

  const [chartData, setChartData] = useState<number[]>(
    Array(60).fill(0).map(() => Math.random() * 100 + 50)
  );

  const isMobile = deviceView === 'mobile';

  // Simulate real-time updates
  useEffect(() => {
    const interval = setInterval(() => {
      setMetrics(prev => ({
        requestsPerSecond: Math.max(1000, prev.requestsPerSecond + (Math.random() - 0.5) * 200),
        activeUsers: Math.max(10000, prev.activeUsers + (Math.random() - 0.5) * 100),
        apiLatency: Math.max(50, Math.min(200, prev.apiLatency + (Math.random() - 0.5) * 10)),
        errorRate: Math.max(0, Math.min(2, prev.errorRate + (Math.random() - 0.5) * 0.05)),
        cpuUsage: Math.max(40, Math.min(90, prev.cpuUsage + (Math.random() - 0.5) * 5)),
        memoryUsage: Math.max(50, Math.min(85, prev.memoryUsage + (Math.random() - 0.5) * 3)),
        gpuUtilization: Math.max(60, Math.min(95, prev.gpuUtilization + (Math.random() - 0.5) * 4)),
        dbConnections: Math.max(300, Math.min(800, prev.dbConnections + (Math.random() - 0.5) * 20)),
        cacheHitRate: Math.max(95, Math.min(99.9, prev.cacheHitRate + (Math.random() - 0.5) * 0.2)),
        queueDepth: Math.max(50, Math.min(500, prev.queueDepth + (Math.random() - 0.5) * 30))
      }));

      setChartData(prev => [...prev.slice(1), Math.random() * 100 + 50]);
    }, 2000);

    return () => clearInterval(interval);
  }, []);

  const metricCards = [
    {
      title: "API Requests",
      value: metrics.requestsPerSecond.toFixed(0),
      unit: "req/s",
      icon: Activity,
      color: "from-blue-500 to-cyan-500",
      trend: metrics.requestsPerSecond > 2500 ? 'up' : 'down',
      trendValue: "+12.4%",
      target: 5000,
      status: metrics.requestsPerSecond < 4000 ? 'healthy' : 'warning'
    },
    {
      title: "Active Users",
      value: metrics.activeUsers.toLocaleString(),
      unit: "users",
      icon: Users,
      color: "from-green-500 to-emerald-500",
      trend: 'up',
      trendValue: "+8.2%",
      target: 25000,
      status: 'healthy'
    },
    {
      title: "API Latency (p95)",
      value: metrics.apiLatency.toFixed(0),
      unit: "ms",
      icon: Clock,
      color: "from-purple-500 to-pink-500",
      trend: metrics.apiLatency < 100 ? 'down' : 'up',
      trendValue: metrics.apiLatency < 100 ? "-5.3%" : "+2.1%",
      target: 100,
      status: metrics.apiLatency < 100 ? 'healthy' : 'warning'
    },
    {
      title: "Error Rate",
      value: metrics.errorRate.toFixed(2),
      unit: "%",
      icon: AlertCircle,
      color: "from-red-500 to-pink-500",
      trend: metrics.errorRate < 0.5 ? 'down' : 'up',
      trendValue: metrics.errorRate < 0.5 ? "-18%" : "+12%",
      target: 1,
      status: metrics.errorRate < 1 ? 'healthy' : 'critical'
    },
    {
      title: "CPU Usage",
      value: metrics.cpuUsage.toFixed(0),
      unit: "%",
      icon: Cpu,
      color: "from-yellow-500 to-orange-500",
      trend: metrics.cpuUsage < 70 ? 'down' : 'up',
      trendValue: metrics.cpuUsage < 70 ? "-3%" : "+7%",
      target: 80,
      status: metrics.cpuUsage < 80 ? 'healthy' : 'warning'
    },
    {
      title: "Memory Usage",
      value: metrics.memoryUsage.toFixed(0),
      unit: "%",
      icon: HardDrive,
      color: "from-indigo-500 to-purple-500",
      trend: 'stable',
      trendValue: "+0.8%",
      target: 85,
      status: metrics.memoryUsage < 85 ? 'healthy' : 'critical'
    },
    {
      title: "GPU Utilization",
      value: metrics.gpuUtilization.toFixed(0),
      unit: "%",
      icon: Zap,
      color: "from-cyan-500 to-blue-500",
      trend: 'up',
      trendValue: "+15%",
      target: 95,
      status: 'healthy'
    },
    {
      title: "DB Connections",
      value: metrics.dbConnections.toFixed(0),
      unit: "/1000",
      icon: Database,
      color: "from-pink-500 to-red-500",
      trend: 'stable',
      trendValue: "+2%",
      target: 1000,
      status: metrics.dbConnections < 900 ? 'healthy' : 'warning'
    },
    {
      title: "Cache Hit Rate",
      value: metrics.cacheHitRate.toFixed(1),
      unit: "%",
      icon: Zap,
      color: "from-green-500 to-cyan-500",
      trend: 'up',
      trendValue: "+0.3%",
      target: 99,
      status: metrics.cacheHitRate > 97 ? 'healthy' : 'warning'
    },
    {
      title: "Render Queue",
      value: metrics.queueDepth.toFixed(0),
      unit: "jobs",
      icon: Server,
      color: "from-orange-500 to-red-500",
      trend: metrics.queueDepth < 200 ? 'down' : 'up',
      trendValue: metrics.queueDepth < 200 ? "-12%" : "+8%",
      target: 1000,
      status: metrics.queueDepth < 500 ? 'healthy' : 'warning'
    }
  ];

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'healthy': return <CheckCircle className="w-4 h-4 text-green-400" />;
      case 'warning': return <AlertCircle className="w-4 h-4 text-yellow-400" />;
      case 'critical': return <AlertCircle className="w-4 h-4 text-red-400" />;
      default: return <Activity className="w-4 h-4 text-gray-400" />;
    }
  };

  const getTrendIcon = (trend: string) => {
    switch (trend) {
      case 'up': return <TrendingUp className="w-3 h-3 text-green-400" />;
      case 'down': return <TrendingDown className="w-3 h-3 text-red-400" />;
      default: return <div className="w-3 h-3" />;
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
            <div className="p-3 rounded-xl bg-gradient-to-br from-cyan-500/20 to-blue-500/20 backdrop-blur-xl border border-white/10">
              <Activity className="w-8 h-8 text-cyan-400" />
            </div>
            <div>
              <h2 className="text-2xl font-semibold text-white">Real-Time Metrics</h2>
              <p className="text-sm text-gray-400">Production monitoring · Updated every 2 seconds</p>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-2 h-2 rounded-full bg-green-400 animate-pulse" />
            <span className="text-xs text-gray-400">Live</span>
          </div>
        </div>

        {/* Overall Health */}
        <Card className="bg-gradient-to-r from-green-500/10 to-emerald-500/10 backdrop-blur-xl border-green-500/20">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <CheckCircle className="w-6 h-6 text-green-400" />
                <div>
                  <p className="font-semibold text-white">All Systems Operational</p>
                  <p className="text-xs text-gray-400">Last updated: {new Date().toLocaleTimeString()}</p>
                </div>
              </div>
              <Badge className="bg-green-500/20 text-green-300 border-green-500/30">
                99.97% Uptime
              </Badge>
            </div>
          </CardContent>
        </Card>
      </motion.div>

      {/* Metrics Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-4">
        {metricCards.map((metric, idx) => (
          <motion.div
            key={idx}
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: idx * 0.05 }}
          >
            <Card className="bg-white/5 backdrop-blur-xl border-white/10 hover:border-white/30 transition-all">
              <CardContent className="p-4">
                <div className="flex items-start justify-between mb-3">
                  <div className={`p-2 rounded-lg bg-gradient-to-br ${metric.color} bg-opacity-20`}>
                    <metric.icon className="w-5 h-5 text-white" />
                  </div>
                  {getStatusIcon(metric.status)}
                </div>

                <p className="text-xs text-gray-400 mb-1">{metric.title}</p>
                
                <div className="flex items-baseline gap-2 mb-2">
                  <motion.p
                    key={metric.value}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="text-2xl font-bold text-white"
                  >
                    {metric.value}
                  </motion.p>
                  <span className="text-xs text-gray-500">{metric.unit}</span>
                </div>

                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-1">
                    {getTrendIcon(metric.trend)}
                    <span className={`text-xs ${
                      metric.trend === 'up' ? 'text-green-400' :
                      metric.trend === 'down' ? 'text-red-400' :
                      'text-gray-400'
                    }`}>
                      {metric.trendValue}
                    </span>
                  </div>
                  <span className="text-xs text-gray-500">of {metric.target}</span>
                </div>

                {/* Progress Bar */}
                <div className="mt-3 h-1 bg-black/30 rounded-full overflow-hidden">
                  <motion.div
                    initial={{ width: 0 }}
                    animate={{ width: `${Math.min(100, (parseFloat(metric.value.replace(',', '')) / metric.target) * 100)}%` }}
                    className={`h-full bg-gradient-to-r ${metric.color}`}
                    transition={{ duration: 0.5 }}
                  />
                </div>
              </CardContent>
            </Card>
          </motion.div>
        ))}
      </div>

      {/* Time Series Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* API Throughput Chart */}
        <Card className="bg-white/5 backdrop-blur-xl border-white/10">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-white">
              <Activity className="w-5 h-5 text-blue-400" />
              API Throughput (Last 2 Minutes)
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="h-48 flex items-end gap-1">
              {chartData.map((value, idx) => (
                <motion.div
                  key={idx}
                  initial={{ height: 0 }}
                  animate={{ height: `${value}%` }}
                  transition={{ duration: 0.3 }}
                  className="flex-1 bg-gradient-to-t from-blue-500 to-cyan-500 rounded-t-sm opacity-80 hover:opacity-100 transition-opacity"
                  title={`${value.toFixed(0)}%`}
                />
              ))}
            </div>
            <div className="flex items-center justify-between mt-4 text-xs text-gray-400">
              <span>2 min ago</span>
              <span>Now</span>
            </div>
          </CardContent>
        </Card>

        {/* Resource Utilization */}
        <Card className="bg-white/5 backdrop-blur-xl border-white/10">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-white">
              <Server className="w-5 h-5 text-purple-400" />
              Resource Utilization
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            {[
              { name: "CPU", value: metrics.cpuUsage, color: "from-yellow-500 to-orange-500", icon: Cpu },
              { name: "Memory", value: metrics.memoryUsage, color: "from-indigo-500 to-purple-500", icon: HardDrive },
              { name: "GPU", value: metrics.gpuUtilization, color: "from-cyan-500 to-blue-500", icon: Zap },
              { name: "Network", value: 64, color: "from-green-500 to-emerald-500", icon: Network }
            ].map((resource, idx) => (
              <div key={idx} className="space-y-2">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <resource.icon className="w-4 h-4 text-gray-400" />
                    <span className="text-sm text-gray-400">{resource.name}</span>
                  </div>
                  <span className="text-sm font-semibold text-white">{resource.value.toFixed(0)}%</span>
                </div>
                <div className="h-2 bg-black/30 rounded-full overflow-hidden">
                  <motion.div
                    initial={{ width: 0 }}
                    animate={{ width: `${resource.value}%` }}
                    className={`h-full bg-gradient-to-r ${resource.color}`}
                    transition={{ duration: 0.5 }}
                  />
                </div>
              </div>
            ))}
          </CardContent>
        </Card>
      </div>

      {/* Regional Performance */}
      <Card className="bg-white/5 backdrop-blur-xl border-white/10">
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-white">
            <Globe className="w-5 h-5 text-green-400" />
            Regional Performance
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {[
              { region: "US East", flag: "🇺🇸", latency: 42, traffic: 48, status: 'healthy' },
              { region: "EU West", flag: "🇮🇪", latency: 38, traffic: 32, status: 'healthy' },
              { region: "AP Southeast", flag: "🇸🇬", latency: 51, traffic: 20, status: 'healthy' }
            ].map((region, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: idx * 0.1 }}
                className="p-4 bg-white/5 rounded-lg border border-white/10"
              >
                <div className="flex items-center justify-between mb-3">
                  <div className="flex items-center gap-2">
                    <span className="text-2xl">{region.flag}</span>
                    <div>
                      <p className="font-semibold text-white text-sm">{region.region}</p>
                      <p className="text-xs text-gray-400">{region.latency}ms avg latency</p>
                    </div>
                  </div>
                  <CheckCircle className="w-5 h-5 text-green-400" />
                </div>
                
                <div className="space-y-2">
                  <div className="flex items-center justify-between text-xs">
                    <span className="text-gray-400">Traffic Share</span>
                    <span className="text-white font-semibold">{region.traffic}%</span>
                  </div>
                  <div className="h-1.5 bg-black/30 rounded-full overflow-hidden">
                    <motion.div
                      initial={{ width: 0 }}
                      animate={{ width: `${region.traffic}%` }}
                      className="h-full bg-gradient-to-r from-green-500 to-emerald-500"
                      transition={{ duration: 0.5, delay: idx * 0.1 }}
                    />
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Recent Alerts */}
      <Card className="bg-white/5 backdrop-blur-xl border-white/10">
        <CardHeader>
          <CardTitle className="flex items-center justify-between text-white">
            <div className="flex items-center gap-2">
              <AlertCircle className="w-5 h-5 text-yellow-400" />
              Recent Alerts
            </div>
            <Badge className="bg-green-500/20 text-green-300 border-green-500/30">
              All Clear
            </Badge>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            {[
              { 
                time: "12 minutes ago", 
                severity: "info", 
                message: "Auto-scaled API pods: 25 → 30",
                icon: CheckCircle,
                color: "text-blue-400"
              },
              { 
                time: "1 hour ago", 
                severity: "warning", 
                message: "High GPU utilization detected (92%)",
                icon: AlertCircle,
                color: "text-yellow-400"
              },
              { 
                time: "2 hours ago", 
                severity: "resolved", 
                message: "Database connection pool exhaustion - Resolved",
                icon: CheckCircle,
                color: "text-green-400"
              }
            ].map((alert, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: idx * 0.1 }}
                className="flex items-start gap-3 p-3 bg-white/5 rounded-lg border border-white/10"
              >
                <alert.icon className={`w-5 h-5 ${alert.color} flex-shrink-0 mt-0.5`} />
                <div className="flex-1">
                  <p className="text-sm text-white">{alert.message}</p>
                  <p className="text-xs text-gray-400 mt-1">{alert.time}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
