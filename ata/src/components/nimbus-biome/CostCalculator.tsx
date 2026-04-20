import React, { useState, useEffect } from 'react';
import { DollarSign, TrendingDown, TrendingUp, Calculator, Server, Database, Zap } from 'lucide-react';

interface CostBreakdown {
  service: string;
  monthlyCost: number;
  percentage: number;
  savings?: number;
  icon: React.ElementType;
  color: string;
}

const CostCalculator: React.FC = () => {
  const [buildingCount, setBuildingCount] = useState(2500);
  const [optimizationsEnabled, setOptimizationsEnabled] = useState(true);
  const [totalCost, setTotalCost] = useState(0);
  const [totalSavings, setTotalSavings] = useState(0);

  const calculateCosts = () => {
    const scaleFactor = buildingCount / 2500;

    const baseCosts = {
      ec2: 85000,
      rds: 12000,
      influxdb: 35000,
      elasticache: 8000,
      s3: 15000,
      dataTransfer: 20000,
      iotCore: 18000,
      loadBalancers: 5000,
      cloudfront: 8000,
      monitoring: 6000,
      other: 3000
    };

    // Apply scaling factor
    const scaledCosts: Record<string, number> = {};
    for (const [key, value] of Object.entries(baseCosts)) {
      scaledCosts[key] = value * scaleFactor;
    }

    // Apply optimizations
    const optimizations = optimizationsEnabled ? {
      ec2: 0.32,           // 32% savings via Reserved Instances
      s3: 0.40,            // 40% savings via Intelligent-Tiering
      dataTransfer: 0.78,  // 78% savings via VPC Endpoints
      iotCore: 0.15        // 15% savings via edge aggregation
    } : {};

    const optimizedCosts: Record<string, number> = {};
    let totalSav = 0;

    for (const [key, value] of Object.entries(scaledCosts)) {
      const savingsPct = optimizations[key as keyof typeof optimizations] || 0;
      const savings = value * savingsPct;
      optimizedCosts[key] = value - savings;
      totalSav += savings;
    }

    const total = Object.values(optimizedCosts).reduce((sum, cost) => sum + cost, 0);
    setTotalCost(total);
    setTotalSavings(totalSav);

    return { scaledCosts, optimizedCosts };
  };

  useEffect(() => {
    calculateCosts();
  }, [buildingCount, optimizationsEnabled]);

  const costBreakdown: CostBreakdown[] = [
    {
      service: 'EC2 (EKS nodes)',
      monthlyCost: 85000 * (buildingCount / 2500) * (optimizationsEnabled ? 0.68 : 1),
      percentage: 40,
      savings: optimizationsEnabled ? 85000 * (buildingCount / 2500) * 0.32 : 0,
      icon: Server,
      color: 'from-blue-500 to-blue-600'
    },
    {
      service: 'InfluxDB Cloud',
      monthlyCost: 35000 * (buildingCount / 2500),
      percentage: 16,
      icon: Database,
      color: 'from-purple-500 to-purple-600'
    },
    {
      service: 'Data Transfer',
      monthlyCost: 20000 * (buildingCount / 2500) * (optimizationsEnabled ? 0.22 : 1),
      percentage: 9,
      savings: optimizationsEnabled ? 20000 * (buildingCount / 2500) * 0.78 : 0,
      icon: Zap,
      color: 'from-green-500 to-green-600'
    },
    {
      service: 'AWS IoT Core',
      monthlyCost: 18000 * (buildingCount / 2500) * (optimizationsEnabled ? 0.85 : 1),
      percentage: 8,
      savings: optimizationsEnabled ? 18000 * (buildingCount / 2500) * 0.15 : 0,
      icon: Zap,
      color: 'from-orange-500 to-orange-600'
    },
    {
      service: 'S3 Storage',
      monthlyCost: 15000 * (buildingCount / 2500) * (optimizationsEnabled ? 0.60 : 1),
      percentage: 7,
      savings: optimizationsEnabled ? 15000 * (buildingCount / 2500) * 0.40 : 0,
      icon: Database,
      color: 'from-cyan-500 to-cyan-600'
    },
    {
      service: 'RDS (PostgreSQL)',
      monthlyCost: 12000 * (buildingCount / 2500),
      percentage: 6,
      icon: Database,
      color: 'from-indigo-500 to-indigo-600'
    },
    {
      service: 'ElastiCache (Redis)',
      monthlyCost: 8000 * (buildingCount / 2500),
      percentage: 4,
      icon: Database,
      color: 'from-red-500 to-red-600'
    },
    {
      service: 'CloudFront CDN',
      monthlyCost: 8000 * (buildingCount / 2500),
      percentage: 4,
      icon: Zap,
      color: 'from-yellow-500 to-yellow-600'
    }
  ];

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0
    }).format(amount);
  };

  const costPerBuilding = totalCost / buildingCount;
  const costPerSensor = totalCost / (buildingCount * 50000);

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-start justify-between">
        <div>
          <div className="flex items-center gap-3 mb-2">
            <div className="p-2 rounded-lg bg-gradient-to-br from-green-500/20 to-emerald-500/20 border border-green-500/30">
              <Calculator className="w-5 h-5 text-green-400" />
            </div>
            <h2 className="text-xl font-medium text-white">Cost Calculator</h2>
          </div>
          <p className="text-sm text-gray-400">
            AWS infrastructure cost modeling and optimization analysis
          </p>
        </div>

        {/* Total Cost Display */}
        <div className="text-right">
          <div className="text-xs text-gray-400 mb-1">Monthly Infrastructure Cost</div>
          <div className="text-2xl font-medium text-white">{formatCurrency(totalCost)}</div>
          {optimizationsEnabled && (
            <div className="flex items-center gap-1 text-xs text-green-400 mt-1">
              <TrendingDown className="w-3 h-3" />
              {formatCurrency(totalSavings)} saved (23%)
            </div>
          )}
        </div>
      </div>

      {/* Configuration Panel */}
      <div className="grid grid-cols-2 gap-6">
        {/* Building Count Slider */}
        <div className="p-4 rounded-lg bg-white/5 border border-white/10">
          <div className="flex items-center justify-between mb-3">
            <div className="text-sm font-medium text-white">Number of Buildings</div>
            <div className="text-lg font-medium text-white">{buildingCount.toLocaleString()}</div>
          </div>

          <input
            type="range"
            min="100"
            max="10000"
            step="100"
            value={buildingCount}
            onChange={(e) => setBuildingCount(parseInt(e.target.value))}
            className="w-full h-2 bg-white/10 rounded-lg appearance-none cursor-pointer accent-blue-500"
          />

          <div className="flex justify-between text-xs text-gray-500 mt-2">
            <span>100</span>
            <span>10,000</span>
          </div>
        </div>

        {/* Optimizations Toggle */}
        <div className="p-4 rounded-lg bg-white/5 border border-white/10">
          <div className="flex items-center justify-between mb-3">
            <div className="text-sm font-medium text-white">Cost Optimizations</div>
            <button
              onClick={() => setOptimizationsEnabled(!optimizationsEnabled)}
              className={`relative w-12 h-6 rounded-full transition-colors ${
                optimizationsEnabled ? 'bg-green-500' : 'bg-gray-600'
              }`}
            >
              <div
                className={`absolute top-1 left-1 w-4 h-4 rounded-full bg-white transition-transform ${
                  optimizationsEnabled ? 'translate-x-6' : 'translate-x-0'
                }`}
              />
            </button>
          </div>

          {optimizationsEnabled ? (
            <div className="space-y-1 text-xs text-green-300">
              <div>✓ Reserved Instances (32% EC2 savings)</div>
              <div>✓ S3 Intelligent-Tiering (40% savings)</div>
              <div>✓ VPC Endpoints (78% transfer savings)</div>
            </div>
          ) : (
            <div className="text-xs text-gray-400">
              Optimizations disabled (on-demand pricing)
            </div>
          )}
        </div>
      </div>

      {/* Key Metrics */}
      <div className="grid grid-cols-4 gap-4">
        <div className="p-4 rounded-lg bg-white/5 border border-white/10">
          <div className="flex items-center gap-2 mb-2">
            <DollarSign className="w-4 h-4 text-blue-400" />
            <div className="text-xs text-gray-400">Cost per Building</div>
          </div>
          <div className="text-lg font-medium text-white">{formatCurrency(costPerBuilding)}/mo</div>
        </div>

        <div className="p-4 rounded-lg bg-white/5 border border-white/10">
          <div className="flex items-center gap-2 mb-2">
            <DollarSign className="w-4 h-4 text-green-400" />
            <div className="text-xs text-gray-400">Cost per Sensor</div>
          </div>
          <div className="text-lg font-medium text-white">${costPerSensor.toFixed(4)}/mo</div>
        </div>

        <div className="p-4 rounded-lg bg-white/5 border border-white/10">
          <div className="flex items-center gap-2 mb-2">
            <Server className="w-4 h-4 text-purple-400" />
            <div className="text-xs text-gray-400">Total Sensors</div>
          </div>
          <div className="text-lg font-medium text-white">{(buildingCount * 50000).toLocaleString()}</div>
        </div>

        <div className="p-4 rounded-lg bg-white/5 border border-white/10">
          <div className="flex items-center gap-2 mb-2">
            <Database className="w-4 h-4 text-orange-400" />
            <div className="text-xs text-gray-400">Data Ingestion</div>
          </div>
          <div className="text-lg font-medium text-white">{Math.round(buildingCount * 40000).toLocaleString()}/hr</div>
        </div>
      </div>

      {/* Cost Breakdown */}
      <div>
        <h3 className="text-sm font-medium text-white mb-3">Cost Breakdown by Service</h3>
        <div className="space-y-3">
          {costBreakdown.map((item) => {
            const Icon = item.icon;
            const hasSavings = item.savings && item.savings > 0;

            return (
              <div key={item.service} className="p-4 rounded-lg bg-white/5 border border-white/10">
                <div className="flex items-center justify-between mb-2">
                  <div className="flex items-center gap-3">
                    <div className={`w-8 h-8 rounded-lg bg-gradient-to-br ${item.color} flex items-center justify-center`}>
                      <Icon className="w-4 h-4 text-white" />
                    </div>
                    <div>
                      <div className="text-sm font-medium text-white">{item.service}</div>
                      {hasSavings && (
                        <div className="text-xs text-green-400">
                          Optimized: -{formatCurrency(item.savings)} savings
                        </div>
                      )}
                    </div>
                  </div>

                  <div className="text-right">
                    <div className="text-lg font-medium text-white">{formatCurrency(item.monthlyCost)}</div>
                    <div className="text-xs text-gray-400">{item.percentage}% of total</div>
                  </div>
                </div>

                {/* Progress Bar */}
                <div className="h-2 bg-white/10 rounded-full overflow-hidden">
                  <div
                    className={`h-full rounded-full bg-gradient-to-r ${item.color}`}
                    style={{ width: `${item.percentage}%` }}
                  />
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Scaling Projections */}
      <div className="p-6 rounded-lg bg-gradient-to-br from-white/10 to-white/5 border border-white/20">
        <h3 className="text-sm font-medium text-white mb-4">Scaling Projections</h3>
        <div className="grid grid-cols-3 gap-4">
          {[
            { scale: 2500, label: 'Current (2025)' },
            { scale: 5000, label: 'Mid 2026 (2×)' },
            { scale: 10000, label: 'End 2026 (4×)' }
          ].map((projection) => {
            const projectedCost = (215000 * (projection.scale / 2500)) * (optimizationsEnabled ? 0.77 : 1);
            const projectedSavings = optimizationsEnabled ? projectedCost * 0.23 : 0;

            return (
              <div key={projection.scale} className="p-4 rounded-lg bg-white/5 border border-white/10">
                <div className="text-xs text-gray-400 mb-2">{projection.label}</div>
                <div className="text-xl font-medium text-white mb-1">{formatCurrency(projectedCost)}/mo</div>
                <div className="text-xs text-gray-500">{projection.scale.toLocaleString()} buildings</div>
                {optimizationsEnabled && (
                  <div className="text-xs text-green-400 mt-2">
                    -{formatCurrency(projectedSavings)} saved
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>

      {/* Cost Optimization Recommendations */}
      <div className="p-6 rounded-lg bg-gradient-to-br from-green-500/10 to-emerald-500/10 border border-green-500/30">
        <h3 className="text-sm font-medium text-white mb-4">💡 Cost Optimization Recommendations</h3>
        <div className="space-y-3">
          <div className="flex items-start gap-3">
            <div className="w-6 h-6 rounded bg-green-500/20 flex items-center justify-center flex-shrink-0">
              <span className="text-xs font-medium text-green-300">1</span>
            </div>
            <div>
              <div className="text-sm text-white font-medium">Reserved Instances (EC2)</div>
              <div className="text-xs text-gray-400 mt-1">
                Commit to 1-year Reserved Instances for steady-state workloads → Save $27K/month (32%)
              </div>
            </div>
          </div>

          <div className="flex items-start gap-3">
            <div className="w-6 h-6 rounded bg-green-500/20 flex items-center justify-center flex-shrink-0">
              <span className="text-xs font-medium text-green-300">2</span>
            </div>
            <div>
              <div className="text-sm text-white font-medium">S3 Intelligent-Tiering</div>
              <div className="text-xs text-gray-400 mt-1">
                Automatically move infrequently accessed data to cheaper storage tiers → Save $6K/month (40%)
              </div>
            </div>
          </div>

          <div className="flex items-start gap-3">
            <div className="w-6 h-6 rounded bg-green-500/20 flex items-center justify-center flex-shrink-0">
              <span className="text-xs font-medium text-green-300">3</span>
            </div>
            <div>
              <div className="text-sm text-white font-medium">VPC Endpoints for S3</div>
              <div className="text-xs text-gray-400 mt-1">
                Use VPC endpoints to avoid NAT Gateway data transfer fees → Save $7K/month (78%)
              </div>
            </div>
          </div>

          <div className="flex items-start gap-3">
            <div className="w-6 h-6 rounded bg-green-500/20 flex items-center justify-center flex-shrink-0">
              <span className="text-xs font-medium text-green-300">4</span>
            </div>
            <div>
              <div className="text-sm text-white font-medium">Spot Instances (ML Inference)</div>
              <div className="text-xs text-gray-400 mt-1">
                Use Spot Instances for non-critical ML workloads → Save $8.4K/month (70% discount)
              </div>
            </div>
          </div>
        </div>

        <div className="mt-4 pt-4 border-t border-green-500/30">
          <div className="flex items-center justify-between">
            <div className="text-sm text-white">Total Potential Savings</div>
            <div className="text-xl font-medium text-green-400">{formatCurrency(48400)}/month</div>
          </div>
          <div className="text-xs text-gray-400 mt-1">23% reduction from baseline costs</div>
        </div>
      </div>

      {/* Comparison Table */}
      <div>
        <h3 className="text-sm font-medium text-white mb-3">Cost Comparison</h3>
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-white/10">
                <th className="text-left py-2 text-gray-400 font-medium">Configuration</th>
                <th className="text-right py-2 text-gray-400 font-medium">Buildings</th>
                <th className="text-right py-2 text-gray-400 font-medium">Monthly Cost</th>
                <th className="text-right py-2 text-gray-400 font-medium">Cost/Building</th>
                <th className="text-right py-2 text-gray-400 font-medium">Savings</th>
              </tr>
            </thead>
            <tbody>
              <tr className="border-b border-white/10">
                <td className="py-3 text-white">Current (Optimized)</td>
                <td className="py-3 text-right text-white">2,500</td>
                <td className="py-3 text-right text-white">{formatCurrency(166600)}</td>
                <td className="py-3 text-right text-white">{formatCurrency(66.64)}</td>
                <td className="py-3 text-right text-green-400">23%</td>
              </tr>
              <tr className="border-b border-white/10">
                <td className="py-3 text-white">Current (Unoptimized)</td>
                <td className="py-3 text-right text-white">2,500</td>
                <td className="py-3 text-right text-white">{formatCurrency(215000)}</td>
                <td className="py-3 text-right text-white">{formatCurrency(86)}</td>
                <td className="py-3 text-right text-gray-400">0%</td>
              </tr>
              <tr className="border-b border-white/10">
                <td className="py-3 text-white">2026 Target (Optimized)</td>
                <td className="py-3 text-right text-white">10,000</td>
                <td className="py-3 text-right text-white">{formatCurrency(666400)}</td>
                <td className="py-3 text-right text-white">{formatCurrency(66.64)}</td>
                <td className="py-3 text-right text-green-400">23%</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default CostCalculator;
