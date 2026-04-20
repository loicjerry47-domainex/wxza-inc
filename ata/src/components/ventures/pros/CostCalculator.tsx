import { useState, useEffect } from "react";
import { motion } from "motion/react";
import { Card, CardContent, CardHeader, CardTitle } from "../../ui/card";
import { Badge } from "../../ui/badge";
import { Slider } from "../../ui/slider";
import { 
  DollarSign, Server, Zap, Database, Cloud, 
  TrendingUp, Calculator, Download, Share2,
  HardDrive, Cpu, Network, Users, Activity
} from "lucide-react";

interface CostCalculatorProps {
  deviceView: 'desktop' | 'tablet' | 'mobile';
}

export function CostCalculator({ deviceView }: CostCalculatorProps) {
  const [users, setUsers] = useState(25000);
  const [apiRequests, setApiRequests] = useState(100); // millions/month
  const [storage, setStorage] = useState(1000); // GB
  const [gpuHours, setGpuHours] = useState(5000); // hours/month
  const [regions, setRegions] = useState(3);
  
  const [costs, setCosts] = useState({
    compute: 0,
    gpu: 0,
    database: 0,
    storage: 0,
    network: 0,
    monitoring: 0,
    total: 0
  });

  const isMobile = deviceView === 'mobile';

  // Calculate costs based on inputs
  useEffect(() => {
    // Compute costs (API servers)
    const computeNodes = Math.ceil(apiRequests * 10); // 10 nodes per million req/month
    const computeCost = computeNodes * 150 * regions; // $150/node/month

    // GPU costs (render servers)
    const gpuCost = gpuHours * 3.2; // $3.20/hour for H100

    // Database costs
    const dbSize = Math.ceil(users / 30); // TB (30 users per GB)
    const dbCost = dbSize * 350 * regions; // $350/TB/month with replication

    // Storage costs
    const storageCost = storage * 0.023 * regions; // $0.023/GB/month

    // Network costs (egress)
    const networkCost = (apiRequests * 0.5 + storage * 0.01) * regions; // Estimated egress

    // Monitoring costs
    const monitoringCost = (computeNodes + gpuHours / 100) * 10; // $10/resource/month

    const total = computeCost + gpuCost + dbCost + storageCost + networkCost + monitoringCost;

    setCosts({
      compute: computeCost,
      gpu: gpuCost,
      database: dbCost,
      storage: storageCost,
      network: networkCost,
      monitoring: monitoringCost,
      total
    });
  }, [users, apiRequests, storage, gpuHours, regions]);

  const costBreakdown = [
    { 
      name: "Compute (EC2)", 
      cost: costs.compute, 
      percentage: (costs.compute / costs.total) * 100,
      icon: Server,
      color: "from-blue-500 to-cyan-500",
      details: `${Math.ceil(apiRequests * 10 * regions)} nodes across ${regions} regions`
    },
    { 
      name: "GPU Instances", 
      cost: costs.gpu, 
      percentage: (costs.gpu / costs.total) * 100,
      icon: Zap,
      color: "from-yellow-500 to-orange-500",
      details: `${gpuHours.toLocaleString()} GPU hours/month (H100 80GB)`
    },
    { 
      name: "Database (CockroachDB)", 
      cost: costs.database, 
      percentage: (costs.database / costs.total) * 100,
      icon: Database,
      color: "from-purple-500 to-pink-500",
      details: `${Math.ceil(users / 30)} TB with ${regions}× replication`
    },
    { 
      name: "Storage (S3/MinIO)", 
      cost: costs.storage, 
      percentage: (costs.storage / costs.total) * 100,
      icon: HardDrive,
      color: "from-green-500 to-emerald-500",
      details: `${storage} GB object storage`
    },
    { 
      name: "Data Transfer", 
      cost: costs.network, 
      percentage: (costs.network / costs.total) * 100,
      icon: Network,
      color: "from-indigo-500 to-purple-500",
      details: `Egress + cross-region traffic`
    },
    { 
      name: "Monitoring & Tools", 
      cost: costs.monitoring, 
      percentage: (costs.monitoring / costs.total) * 100,
      icon: Activity,
      color: "from-cyan-500 to-blue-500",
      details: `Prometheus, Grafana, logging, alerts`
    }
  ];

  const growthProjections = [
    { 
      year: "2025 (Current)", 
      users: 25000, 
      cost: 420000,
      nodes: 180,
      revenue: 1250000
    },
    { 
      year: "2026 (Projected)", 
      users: 50000, 
      cost: 840000,
      nodes: 360,
      revenue: 2500000
    },
    { 
      year: "2027 (Target)", 
      users: 100000, 
      cost: 2800000,
      nodes: 1200,
      revenue: 5000000
    }
  ];

  const optimizationTips = [
    {
      title: "Use Spot Instances",
      savings: "60% on render workloads",
      description: "Replace 70% of GPU instances with spot instances",
      potential: costs.gpu * 0.6 * 0.7
    },
    {
      title: "Reserved Instances",
      savings: "70% on baseline compute",
      description: "Purchase 1-year RIs for 50% of capacity",
      potential: costs.compute * 0.7 * 0.5
    },
    {
      title: "S3 Intelligent-Tiering",
      savings: "40% on storage",
      description: "Auto-archive objects older than 90 days",
      potential: costs.storage * 0.4
    },
    {
      title: "Multi-AZ Optimization",
      savings: "25% on network",
      description: "Optimize cross-AZ traffic patterns",
      potential: costs.network * 0.25
    }
  ];

  const totalSavingsPotential = optimizationTips.reduce((sum, tip) => sum + tip.potential, 0);

  return (
    <div className={`space-y-${isMobile ? '4' : '6'} p-${isMobile ? '4' : '6'}`}>
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="space-y-4"
      >
        <div className="flex items-center gap-3">
          <div className="p-3 rounded-xl bg-gradient-to-br from-green-500/20 to-emerald-500/20 backdrop-blur-xl border border-white/10">
            <Calculator className="w-8 h-8 text-green-400" />
          </div>
          <div>
            <h2 className="text-2xl font-semibold text-white">Infrastructure Cost Calculator</h2>
            <p className="text-sm text-gray-400">Estimate and optimize your cloud infrastructure costs</p>
          </div>
        </div>

        {/* Cost Summary */}
        <Card className="bg-gradient-to-r from-green-500/10 to-emerald-500/10 backdrop-blur-xl border-green-500/20">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-400 mb-1">Estimated Monthly Cost</p>
                <motion.p
                  key={costs.total}
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="text-5xl font-bold text-white"
                >
                  ${costs.total.toLocaleString(undefined, { minimumFractionDigits: 0, maximumFractionDigits: 0 })}
                </motion.p>
                <p className="text-sm text-gray-400 mt-2">
                  Annual: ${(costs.total * 12).toLocaleString(undefined, { minimumFractionDigits: 0, maximumFractionDigits: 0 })}
                </p>
              </div>
              <div className="text-right">
                <p className="text-sm text-gray-400 mb-1">Cost per User</p>
                <p className="text-3xl font-bold text-cyan-400">
                  ${(costs.total / users).toFixed(2)}
                </p>
                <p className="text-sm text-gray-400 mt-2">
                  {users.toLocaleString()} active users
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
      </motion.div>

      {/* Input Sliders */}
      <Card className="bg-white/5 backdrop-blur-xl border-white/10">
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-white">
            <Users className="w-5 h-5 text-purple-400" />
            Configuration
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          {/* Active Users */}
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <label className="text-sm text-gray-400">Active Users</label>
              <Badge className="bg-purple-500/20 text-purple-300 border-purple-500/30">
                {users.toLocaleString()}
              </Badge>
            </div>
            <Slider
              value={[users]}
              onValueChange={(val) => setUsers(val[0])}
              min={1000}
              max={200000}
              step={1000}
              className="w-full"
            />
            <div className="flex justify-between text-xs text-gray-500">
              <span>1K</span>
              <span>100K</span>
              <span>200K</span>
            </div>
          </div>

          {/* API Requests */}
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <label className="text-sm text-gray-400">API Requests (millions/month)</label>
              <Badge className="bg-blue-500/20 text-blue-300 border-blue-500/30">
                {apiRequests}M
              </Badge>
            </div>
            <Slider
              value={[apiRequests]}
              onValueChange={(val) => setApiRequests(val[0])}
              min={10}
              max={1000}
              step={10}
              className="w-full"
            />
            <div className="flex justify-between text-xs text-gray-500">
              <span>10M</span>
              <span>500M</span>
              <span>1B</span>
            </div>
          </div>

          {/* Storage */}
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <label className="text-sm text-gray-400">Storage (GB)</label>
              <Badge className="bg-green-500/20 text-green-300 border-green-500/30">
                {storage.toLocaleString()} GB
              </Badge>
            </div>
            <Slider
              value={[storage]}
              onValueChange={(val) => setStorage(val[0])}
              min={100}
              max={10000}
              step={100}
              className="w-full"
            />
            <div className="flex justify-between text-xs text-gray-500">
              <span>100 GB</span>
              <span>5 TB</span>
              <span>10 TB</span>
            </div>
          </div>

          {/* GPU Hours */}
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <label className="text-sm text-gray-400">GPU Hours (H100/month)</label>
              <Badge className="bg-yellow-500/20 text-yellow-300 border-yellow-500/30">
                {gpuHours.toLocaleString()} hrs
              </Badge>
            </div>
            <Slider
              value={[gpuHours]}
              onValueChange={(val) => setGpuHours(val[0])}
              min={100}
              max={20000}
              step={100}
              className="w-full"
            />
            <div className="flex justify-between text-xs text-gray-500">
              <span>100</span>
              <span>10K</span>
              <span>20K</span>
            </div>
          </div>

          {/* Regions */}
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <label className="text-sm text-gray-400">AWS Regions</label>
              <Badge className="bg-cyan-500/20 text-cyan-300 border-cyan-500/30">
                {regions} regions
              </Badge>
            </div>
            <Slider
              value={[regions]}
              onValueChange={(val) => setRegions(val[0])}
              min={1}
              max={12}
              step={1}
              className="w-full"
            />
            <div className="flex justify-between text-xs text-gray-500">
              <span>1</span>
              <span>6</span>
              <span>12</span>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Cost Breakdown */}
      <Card className="bg-white/5 backdrop-blur-xl border-white/10">
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-white">
            <DollarSign className="w-5 h-5 text-green-400" />
            Cost Breakdown
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          {costBreakdown.map((item, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: idx * 0.05 }}
              className="space-y-2"
            >
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <item.icon className="w-4 h-4 text-gray-400" />
                  <span className="text-sm text-white">{item.name}</span>
                </div>
                <div className="text-right">
                  <p className="text-sm font-semibold text-white">
                    ${item.cost.toLocaleString(undefined, { minimumFractionDigits: 0, maximumFractionDigits: 0 })}/mo
                  </p>
                  <p className="text-xs text-gray-400">{item.percentage.toFixed(1)}%</p>
                </div>
              </div>
              <div className="h-2 bg-black/30 rounded-full overflow-hidden">
                <motion.div
                  initial={{ width: 0 }}
                  animate={{ width: `${item.percentage}%` }}
                  className={`h-full bg-gradient-to-r ${item.color}`}
                  transition={{ duration: 0.5, delay: idx * 0.05 }}
                />
              </div>
              <p className="text-xs text-gray-500">{item.details}</p>
            </motion.div>
          ))}
        </CardContent>
      </Card>

      {/* Growth Projections */}
      <Card className="bg-white/5 backdrop-blur-xl border-white/10">
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-white">
            <TrendingUp className="w-5 h-5 text-purple-400" />
            Growth Projections
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {growthProjections.map((projection, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: idx * 0.1 }}
                className="p-4 bg-white/5 rounded-lg border border-white/10"
              >
                <p className="text-sm text-gray-400 mb-3">{projection.year}</p>
                <div className="space-y-2">
                  <div>
                    <p className="text-xs text-gray-500">Users</p>
                    <p className="text-lg font-bold text-white">{projection.users.toLocaleString()}</p>
                  </div>
                  <div>
                    <p className="text-xs text-gray-500">Monthly Cost</p>
                    <p className="text-lg font-bold text-cyan-400">${(projection.cost / 1000).toFixed(0)}K</p>
                  </div>
                  <div>
                    <p className="text-xs text-gray-500">Monthly Revenue</p>
                    <p className="text-lg font-bold text-green-400">${(projection.revenue / 1000).toFixed(0)}K</p>
                  </div>
                  <div className="pt-2 border-t border-white/10">
                    <p className="text-xs text-gray-500">Profit Margin</p>
                    <p className="text-lg font-bold text-purple-400">
                      {(((projection.revenue - projection.cost) / projection.revenue) * 100).toFixed(0)}%
                    </p>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Optimization Tips */}
      <Card className="bg-gradient-to-br from-yellow-500/10 to-orange-500/10 backdrop-blur-xl border-yellow-500/20">
        <CardHeader>
          <CardTitle className="flex items-center justify-between text-white">
            <div className="flex items-center gap-2">
              <Zap className="w-5 h-5 text-yellow-400" />
              Cost Optimization Opportunities
            </div>
            <Badge className="bg-green-500/20 text-green-300 border-green-500/30">
              Save ${totalSavingsPotential.toLocaleString(undefined, { minimumFractionDigits: 0, maximumFractionDigits: 0 })}/mo
            </Badge>
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-3">
          {optimizationTips.map((tip, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: idx * 0.05 }}
              className="flex items-start gap-3 p-3 bg-white/5 rounded-lg border border-yellow-500/20"
            >
              <div className="p-2 rounded-lg bg-yellow-500/20">
                <Zap className="w-4 h-4 text-yellow-400" />
              </div>
              <div className="flex-1">
                <div className="flex items-center justify-between mb-1">
                  <p className="font-semibold text-white text-sm">{tip.title}</p>
                  <Badge className="bg-green-500/20 text-green-300 border-green-500/30">
                    -{tip.savings}
                  </Badge>
                </div>
                <p className="text-xs text-gray-400 mb-2">{tip.description}</p>
                <div className="flex items-center justify-between">
                  <p className="text-xs text-gray-500">Potential Monthly Savings</p>
                  <p className="text-sm font-bold text-green-400">
                    ${tip.potential.toLocaleString(undefined, { minimumFractionDigits: 0, maximumFractionDigits: 0 })}
                  </p>
                </div>
              </div>
            </motion.div>
          ))}
        </CardContent>
      </Card>

      {/* Export Actions */}
      <div className="flex gap-3">
        <button className="flex-1 px-4 py-3 bg-gradient-to-r from-purple-500 to-pink-500 rounded-lg text-white font-semibold hover:from-purple-600 hover:to-pink-600 transition-all flex items-center justify-center gap-2">
          <Download className="w-5 h-5" />
          Export Report (PDF)
        </button>
        <button className="flex-1 px-4 py-3 bg-white/10 backdrop-blur-xl border border-white/20 rounded-lg text-white font-semibold hover:bg-white/20 transition-all flex items-center justify-center gap-2">
          <Share2 className="w-5 h-5" />
          Share Configuration
        </button>
      </div>
    </div>
  );
}
