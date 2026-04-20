import React, { useState, useEffect } from 'react';
import { Activity, Zap, Users, Wind, Thermometer, Droplets, Cloud, TrendingUp, TrendingDown, AlertTriangle } from 'lucide-react';

interface Metric {
  id: string;
  name: string;
  value: string | number;
  unit: string;
  change: number;
  status: 'good' | 'warning' | 'critical';
  threshold?: {
    min?: number;
    max?: number;
  };
}

interface TimeSeriesData {
  timestamp: string;
  value: number;
}

const RealTimeMetricsDashboard: React.FC = () => {
  const [selectedBuilding, setSelectedBuilding] = useState('bld_2L8F9mKpN4Qr');
  const [realTimeData, setRealTimeData] = useState<Metric[]>([]);
  const [lastUpdate, setLastUpdate] = useState(new Date());

  const buildings = [
    { id: 'bld_2L8F9mKpN4Qr', name: 'Empire State Building', city: 'New York, NY' },
    { id: 'bld_3Ab4Cd5Ef6Gh', name: 'Willis Tower', city: 'Chicago, IL' },
    { id: 'bld_7Ij8Kl9Mn0Op', name: 'Salesforce Tower', city: 'San Francisco, CA' }
  ];

  // Simulate real-time data updates
  useEffect(() => {
    const updateMetrics = () => {
      setRealTimeData([
        {
          id: 'energy',
          name: 'Current Power',
          value: 12450 + Math.random() * 500 - 250,
          unit: 'kW',
          change: -3.2,
          status: 'good'
        },
        {
          id: 'occupancy',
          name: 'Current Occupancy',
          value: 3842 + Math.floor(Math.random() * 100 - 50),
          unit: 'people',
          change: 12.5,
          status: 'good'
        },
        {
          id: 'co2',
          name: 'Average CO₂',
          value: 620 + Math.random() * 100 - 50,
          unit: 'ppm',
          change: -8.3,
          status: 650 > 800 ? 'critical' : 650 > 600 ? 'warning' : 'good',
          threshold: { max: 1000 }
        },
        {
          id: 'temperature',
          name: 'Average Temperature',
          value: 72.4 + Math.random() * 2 - 1,
          unit: '°F',
          change: 0.5,
          status: 'good',
          threshold: { min: 68, max: 76 }
        },
        {
          id: 'humidity',
          name: 'Average Humidity',
          value: 45.0 + Math.random() * 5 - 2.5,
          unit: '%',
          change: -1.2,
          status: 'good',
          threshold: { min: 30, max: 60 }
        },
        {
          id: 'pm25',
          name: 'PM2.5',
          value: 8.2 + Math.random() * 2 - 1,
          unit: 'μg/m³',
          change: -15.4,
          status: 8.2 > 35 ? 'critical' : 8.2 > 12 ? 'warning' : 'good',
          threshold: { max: 12 }
        }
      ]);
      setLastUpdate(new Date());
    };

    updateMetrics();
    const interval = setInterval(updateMetrics, 2000); // Update every 2 seconds

    return () => clearInterval(interval);
  }, [selectedBuilding]);

  const energyHistory: TimeSeriesData[] = Array.from({ length: 24 }, (_, i) => ({
    timestamp: new Date(Date.now() - (23 - i) * 3600000).toISOString(),
    value: 6000 + Math.random() * 3000 + Math.sin(i / 3) * 2000
  }));

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'good': return 'text-green-400';
      case 'warning': return 'text-yellow-400';
      case 'critical': return 'text-red-400';
      default: return 'text-gray-400';
    }
  };

  const getStatusBg = (status: string) => {
    switch (status) {
      case 'good': return 'bg-green-500/20 border-green-500/30';
      case 'warning': return 'bg-yellow-500/20 border-yellow-500/30';
      case 'critical': return 'bg-red-500/20 border-red-500/30';
      default: return 'bg-gray-500/20 border-gray-500/30';
    }
  };

  const metricIcons: Record<string, React.ElementType> = {
    energy: Zap,
    occupancy: Users,
    co2: Wind,
    temperature: Thermometer,
    humidity: Droplets,
    pm25: Cloud
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-start justify-between">
        <div>
          <div className="flex items-center gap-3 mb-2">
            <div className="p-2 rounded-lg bg-gradient-to-br from-blue-500/20 to-green-500/20 border border-blue-500/30">
              <Activity className="w-5 h-5 text-blue-400" />
            </div>
            <h2 className="text-xl font-medium text-white">Real-Time Metrics</h2>
          </div>
          <p className="text-sm text-gray-400">
            Live environmental monitoring and building performance data
          </p>
        </div>

        {/* Live Indicator */}
        <div className="flex items-center gap-2 px-3 py-1.5 rounded-lg bg-red-500/20 border border-red-500/30">
          <div className="w-2 h-2 rounded-full bg-red-400 animate-pulse" />
          <span className="text-xs text-red-300 font-medium">LIVE</span>
        </div>
      </div>

      {/* Building Selector */}
      <div>
        <div className="text-sm text-gray-400 mb-2">Select Building</div>
        <div className="grid grid-cols-3 gap-3">
          {buildings.map((building) => (
            <button
              key={building.id}
              onClick={() => setSelectedBuilding(building.id)}
              className={`p-4 rounded-lg border text-left transition-all ${
                selectedBuilding === building.id
                  ? 'bg-white/10 border-white/20'
                  : 'bg-white/5 border-white/10 hover:bg-white/8'
              }`}
            >
              <div className="text-sm font-medium text-white mb-1">{building.name}</div>
              <div className="text-xs text-gray-400">{building.city}</div>
            </button>
          ))}
        </div>
      </div>

      {/* Real-Time Metrics Grid */}
      <div className="grid grid-cols-3 gap-4">
        {realTimeData.map((metric) => {
          const Icon = metricIcons[metric.id] || Activity;
          const isIncreasing = metric.change > 0;

          return (
            <div
              key={metric.id}
              className={`p-4 rounded-lg border ${getStatusBg(metric.status)}`}
            >
              <div className="flex items-start justify-between mb-3">
                <div className="flex items-center gap-2">
                  <Icon className={`w-4 h-4 ${getStatusColor(metric.status)}`} />
                  <span className="text-xs text-gray-400">{metric.name}</span>
                </div>
                {metric.status === 'critical' && (
                  <AlertTriangle className="w-4 h-4 text-red-400" />
                )}
              </div>

              <div className="flex items-end justify-between">
                <div>
                  <div className="text-2xl font-medium text-white">
                    {typeof metric.value === 'number' ? metric.value.toFixed(1) : metric.value}
                  </div>
                  <div className="text-xs text-gray-400 mt-1">{metric.unit}</div>
                </div>

                <div className={`flex items-center gap-1 text-xs ${isIncreasing ? 'text-red-400' : 'text-green-400'}`}>
                  {isIncreasing ? (
                    <TrendingUp className="w-3 h-3" />
                  ) : (
                    <TrendingDown className="w-3 h-3" />
                  )}
                  {Math.abs(metric.change).toFixed(1)}%
                </div>
              </div>

              {metric.threshold && (
                <div className="mt-3 pt-3 border-t border-white/10">
                  <div className="text-xs text-gray-500 mb-1">Threshold</div>
                  <div className="text-xs text-gray-400">
                    {metric.threshold.min && `Min: ${metric.threshold.min} ${metric.unit}`}
                    {metric.threshold.min && metric.threshold.max && ' • '}
                    {metric.threshold.max && `Max: ${metric.threshold.max} ${metric.unit}`}
                  </div>
                </div>
              )}
            </div>
          );
        })}
      </div>

      {/* Energy Time-Series Chart */}
      <div className="p-6 rounded-lg bg-gradient-to-br from-white/10 to-white/5 border border-white/20">
        <div className="flex items-center justify-between mb-4">
          <div>
            <h3 className="text-sm font-medium text-white mb-1">Energy Consumption (24 Hours)</h3>
            <p className="text-xs text-gray-400">Hourly power usage trend</p>
          </div>
          <div className="flex items-center gap-4">
            <div className="text-right">
              <div className="text-xs text-gray-400">Current</div>
              <div className="text-lg font-medium text-white">12.5 kW</div>
            </div>
            <div className="text-right">
              <div className="text-xs text-gray-400">Peak Today</div>
              <div className="text-lg font-medium text-white">15.2 kW</div>
            </div>
            <div className="text-right">
              <div className="text-xs text-gray-400">Total Today</div>
              <div className="text-lg font-medium text-white">156 kWh</div>
            </div>
          </div>
        </div>

        {/* Simple Bar Chart */}
        <div className="flex items-end gap-1 h-40">
          {energyHistory.map((point, idx) => {
            const maxValue = Math.max(...energyHistory.map(p => p.value));
            const height = (point.value / maxValue) * 100;
            const hour = new Date(point.timestamp).getHours();

            return (
              <div key={idx} className="flex-1 flex flex-col items-center gap-1">
                <div 
                  className="w-full bg-gradient-to-t from-blue-500 to-blue-400 rounded-t transition-all hover:from-blue-400 hover:to-blue-300"
                  style={{ height: `${height}%` }}
                  title={`${hour}:00 - ${point.value.toFixed(0)} kW`}
                />
                {idx % 3 === 0 && (
                  <div className="text-xs text-gray-500">{hour}:00</div>
                )}
              </div>
            );
          })}
        </div>
      </div>

      {/* Zone-Level Breakdown */}
      <div className="grid grid-cols-2 gap-6">
        {/* Occupancy by Floor */}
        <div className="p-4 rounded-lg bg-white/5 border border-white/10">
          <h3 className="text-sm font-medium text-white mb-3">Occupancy by Floor</h3>
          <div className="space-y-2">
            {[
              { floor: 'Floor 25', count: 420, capacity: 500, utilization: 84 },
              { floor: 'Floor 24', count: 385, capacity: 500, utilization: 77 },
              { floor: 'Floor 23', count: 445, capacity: 500, utilization: 89 },
              { floor: 'Floor 22', count: 312, capacity: 500, utilization: 62 },
              { floor: 'Floor 21', count: 398, capacity: 500, utilization: 80 }
            ].map((floor) => (
              <div key={floor.floor} className="space-y-1">
                <div className="flex items-center justify-between text-xs">
                  <span className="text-gray-400">{floor.floor}</span>
                  <span className="text-white">{floor.count}/{floor.capacity}</span>
                </div>
                <div className="h-2 bg-white/10 rounded-full overflow-hidden">
                  <div
                    className={`h-full rounded-full transition-all ${
                      floor.utilization > 90
                        ? 'bg-red-500'
                        : floor.utilization > 75
                        ? 'bg-yellow-500'
                        : 'bg-green-500'
                    }`}
                    style={{ width: `${floor.utilization}%` }}
                  />
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Air Quality Distribution */}
        <div className="p-4 rounded-lg bg-white/5 border border-white/10">
          <h3 className="text-sm font-medium text-white mb-3">Air Quality Distribution</h3>
          <div className="space-y-3">
            {[
              { metric: 'Excellent (< 600 ppm CO₂)', count: 85, color: 'bg-green-500' },
              { metric: 'Good (600-800 ppm)', count: 32, color: 'bg-blue-500' },
              { metric: 'Fair (800-1000 ppm)', count: 8, color: 'bg-yellow-500' },
              { metric: 'Poor (> 1000 ppm)', count: 0, color: 'bg-red-500' }
            ].map((item) => (
              <div key={item.metric} className="flex items-center gap-3">
                <div className={`w-3 h-3 rounded-full ${item.color}`} />
                <div className="flex-1 text-xs text-gray-400">{item.metric}</div>
                <div className="text-sm font-medium text-white">{item.count} zones</div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* System Health Indicators */}
      <div className="grid grid-cols-4 gap-4">
        <div className="p-4 rounded-lg bg-white/5 border border-white/10">
          <div className="flex items-center gap-2 mb-2">
            <div className="w-2 h-2 rounded-full bg-green-400" />
            <div className="text-xs text-gray-400">Sensors Online</div>
          </div>
          <div className="text-lg font-medium text-white">49,856 / 50,000</div>
          <div className="text-xs text-green-400 mt-1">99.7% connectivity</div>
        </div>

        <div className="p-4 rounded-lg bg-white/5 border border-white/10">
          <div className="flex items-center gap-2 mb-2">
            <div className="w-2 h-2 rounded-full bg-blue-400" />
            <div className="text-xs text-gray-400">HVAC Systems</div>
          </div>
          <div className="text-lg font-medium text-white">125 / 125</div>
          <div className="text-xs text-blue-400 mt-1">All operational</div>
        </div>

        <div className="p-4 rounded-lg bg-white/5 border border-white/10">
          <div className="flex items-center gap-2 mb-2">
            <div className="w-2 h-2 rounded-full bg-purple-400" />
            <div className="text-xs text-gray-400">Data Ingestion</div>
          </div>
          <div className="text-lg font-medium text-white">102.5M/hr</div>
          <div className="text-xs text-purple-400 mt-1">+2.5% above avg</div>
        </div>

        <div className="p-4 rounded-lg bg-white/5 border border-white/10">
          <div className="flex items-center gap-2 mb-2">
            <div className="w-2 h-2 rounded-full bg-yellow-400" />
            <div className="text-xs text-gray-400">Active Alerts</div>
          </div>
          <div className="text-lg font-medium text-white">8</div>
          <div className="text-xs text-yellow-400 mt-1">0 critical</div>
        </div>
      </div>

      {/* Last Update */}
      <div className="flex items-center justify-between text-xs text-gray-500">
        <div>Auto-refresh: Every 2 seconds</div>
        <div>Last updated: {lastUpdate.toLocaleTimeString()}</div>
      </div>
    </div>
  );
};

export default RealTimeMetricsDashboard;
