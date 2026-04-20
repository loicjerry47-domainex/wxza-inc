import React, { useState } from 'react';
import { Network, Server, Database, Cloud, Cpu, Wifi, Radio, Layers, Activity, Shield, Zap, Globe } from 'lucide-react';

interface ArchitectureLayer {
  id: string;
  name: string;
  components: ArchitectureComponent[];
  color: string;
}

interface ArchitectureComponent {
  id: string;
  name: string;
  type: string;
  status: 'operational' | 'degraded' | 'offline';
  metrics?: {
    label: string;
    value: string;
  }[];
  description: string;
}

const ArchitectureDiagramVisualizer: React.FC = () => {
  const [selectedLayer, setSelectedLayer] = useState<string>('all');
  const [selectedComponent, setSelectedComponent] = useState<ArchitectureComponent | null>(null);

  const layers: ArchitectureLayer[] = [
    {
      id: 'edge',
      name: 'Edge Layer',
      color: 'from-green-500 to-green-600',
      components: [
        {
          id: 'sensors',
          name: '125M IoT Sensors',
          type: 'Hardware',
          status: 'operational',
          metrics: [
            { label: 'Active Sensors', value: '124.8M' },
            { label: 'Connectivity', value: '99.98%' },
            { label: 'Battery Health', value: '94% avg' },
            { label: 'Data Points/hr', value: '100M+' }
          ],
          description: 'CO₂, temperature, humidity, occupancy, PM2.5 sensors deployed across 2,500 buildings'
        },
        {
          id: 'lorawan',
          name: 'LoRaWAN Gateway',
          type: 'Network',
          status: 'operational',
          metrics: [
            { label: 'Gateways', value: '2,500' },
            { label: 'Coverage', value: '100%' },
            { label: 'Packet Loss', value: '<0.2%' },
            { label: 'Latency', value: '45ms avg' }
          ],
          description: 'Low-power wide-area network for sensor communication (LoRa 915MHz)'
        },
        {
          id: 'greengrass',
          name: 'AWS IoT Greengrass',
          type: 'Edge Compute',
          status: 'operational',
          metrics: [
            { label: 'Edge Nodes', value: '2,500' },
            { label: 'Local ML', value: 'Enabled' },
            { label: 'Offline Buffer', value: '7 days' },
            { label: 'Sync Lag', value: '<30s' }
          ],
          description: 'Edge computing nodes (Raspberry Pi 4 / Intel NUC) for local data aggregation and ML inference'
        }
      ]
    },
    {
      id: 'iot',
      name: 'IoT Platform',
      color: 'from-blue-500 to-blue-600',
      components: [
        {
          id: 'iot-core',
          name: 'AWS IoT Core',
          type: 'Message Broker',
          status: 'operational',
          metrics: [
            { label: 'Devices', value: '125M' },
            { label: 'Messages/sec', value: '1M' },
            { label: 'Uptime', value: '99.99%' },
            { label: 'Protocol', value: 'MQTT/TLS 1.3' }
          ],
          description: 'Managed MQTT broker for device-to-cloud communication with 125M registered devices'
        },
        {
          id: 'device-shadow',
          name: 'Device Shadow',
          type: 'State Management',
          status: 'operational',
          metrics: [
            { label: 'Shadows', value: '125M' },
            { label: 'Sync Latency', value: '<500ms' },
            { label: 'Update Rate', value: '60s/device' }
          ],
          description: 'Persistent device state representation (battery, firmware, config)'
        },
        {
          id: 'iot-rules',
          name: 'IoT Rules Engine',
          type: 'Event Processing',
          status: 'operational',
          metrics: [
            { label: 'Rules', value: '47 active' },
            { label: 'Events/sec', value: '500K' },
            { label: 'Actions', value: '8 types' }
          ],
          description: 'Real-time message routing, filtering, and transformation (SQL-based rules)'
        }
      ]
    },
    {
      id: 'streaming',
      name: 'Data Pipeline',
      color: 'from-purple-500 to-purple-600',
      components: [
        {
          id: 'kinesis',
          name: 'Kinesis Firehose',
          type: 'Streaming',
          status: 'operational',
          metrics: [
            { label: 'Streams', value: '12' },
            { label: 'Throughput', value: '100M records/hr' },
            { label: 'Latency', value: '<60s' },
            { label: 'Durability', value: '99.99%' }
          ],
          description: 'Real-time data streaming pipeline from IoT Core to databases'
        },
        {
          id: 'kafka',
          name: 'Apache Kafka',
          type: 'Event Bus',
          status: 'operational',
          metrics: [
            { label: 'Brokers', value: '6 nodes' },
            { label: 'Topics', value: '50' },
            { label: 'Events/sec', value: '500K' },
            { label: 'Retention', value: '7 days' }
          ],
          description: 'Event streaming platform for ML pipeline, audit logs, and real-time analytics'
        },
        {
          id: 'lambda',
          name: 'AWS Lambda',
          type: 'Serverless',
          status: 'operational',
          metrics: [
            { label: 'Functions', value: '120' },
            { label: 'Invocations/day', value: '500M+' },
            { label: 'Avg Duration', value: '250ms' },
            { label: 'Error Rate', value: '<0.1%' }
          ],
          description: 'Event-driven functions for data transformation, alerts, and integrations'
        }
      ]
    },
    {
      id: 'compute',
      name: 'Compute Layer',
      color: 'from-orange-500 to-orange-600',
      components: [
        {
          id: 'eks',
          name: 'Amazon EKS',
          type: 'Kubernetes',
          status: 'operational',
          metrics: [
            { label: 'Nodes', value: '180 (500 max)' },
            { label: 'Pods', value: '5,000+' },
            { label: 'CPU Usage', value: '34%' },
            { label: 'Version', value: '1.28' }
          ],
          description: 'Managed Kubernetes cluster running API Gateway, ML inference, HVAC control, analytics'
        },
        {
          id: 'api-gateway',
          name: 'API Gateway (Rust)',
          type: 'REST API',
          status: 'operational',
          metrics: [
            { label: 'Replicas', value: '100' },
            { label: 'RPS', value: '5,000' },
            { label: 'Latency p95', value: '42ms' },
            { label: 'Uptime', value: '99.97%' }
          ],
          description: 'High-performance REST API (Actix-web) serving 120+ endpoints'
        },
        {
          id: 'ml-inference',
          name: 'ML Inference (Python)',
          type: 'Machine Learning',
          status: 'operational',
          metrics: [
            { label: 'Models', value: '5 active' },
            { label: 'Predictions/hr', value: '1M+' },
            { label: 'GPU Nodes', value: '20 (A10G)' },
            { label: 'Accuracy', value: '97.8%' }
          ],
          description: 'Climate prediction, HVAC optimization (RL), occupancy forecasting, anomaly detection'
        },
        {
          id: 'hvac-control',
          name: 'HVAC Controller (Rust)',
          type: 'Automation',
          status: 'operational',
          metrics: [
            { label: 'Buildings', value: '2,500' },
            { label: 'Control Loop', value: '15 min' },
            { label: 'Energy Savings', value: '35% avg' },
            { label: 'Comfort', value: '95% ASHRAE 55' }
          ],
          description: 'Real-time building automation using reinforcement learning for optimal HVAC control'
        }
      ]
    },
    {
      id: 'data',
      name: 'Data Layer',
      color: 'from-cyan-500 to-cyan-600',
      components: [
        {
          id: 'influxdb',
          name: 'InfluxDB',
          type: 'Time-Series',
          status: 'operational',
          metrics: [
            { label: 'Storage', value: '2.8TB (active)' },
            { label: 'Write/sec', value: '500K' },
            { label: 'Query p95', value: '87ms' },
            { label: 'Compression', value: '10:1' }
          ],
          description: 'Primary time-series database for sensor metrics, energy data, occupancy counts'
        },
        {
          id: 'postgresql',
          name: 'PostgreSQL + PostGIS',
          type: 'Relational + Spatial',
          status: 'operational',
          metrics: [
            { label: 'Storage', value: '500GB' },
            { label: 'Records', value: '50M+' },
            { label: 'Replication', value: 'Multi-AZ' },
            { label: 'Version', value: '16.1' }
          ],
          description: 'Relational database (users, buildings, alerts) with geospatial extension (PostGIS)'
        },
        {
          id: 'redis',
          name: 'Redis (ElastiCache)',
          type: 'Cache',
          status: 'operational',
          metrics: [
            { label: 'Memory', value: '50GB' },
            { label: 'Hit Rate', value: '98.5%' },
            { label: 'Latency', value: '<1ms' },
            { label: 'Nodes', value: '6 shards × 2' }
          ],
          description: 'In-memory cache for hot data (last 15 min), API responses, real-time aggregations'
        },
        {
          id: 's3',
          name: 'Amazon S3',
          type: 'Object Storage',
          status: 'operational',
          metrics: [
            { label: 'Storage', value: '680TB' },
            { label: 'Objects', value: '50M+' },
            { label: 'Durability', value: '99.999999999%' },
            { label: 'Growth', value: '15TB/month' }
          ],
          description: 'Long-term storage for historical data (>1 year), backups, ML training datasets'
        }
      ]
    },
    {
      id: 'monitoring',
      name: 'Observability',
      color: 'from-pink-500 to-pink-600',
      components: [
        {
          id: 'prometheus',
          name: 'Prometheus',
          type: 'Metrics',
          status: 'operational',
          metrics: [
            { label: 'Time-series', value: '10M active' },
            { label: 'Scrape Interval', value: '30s' },
            { label: 'Retention', value: '30 days' },
            { label: 'Storage', value: '500GB' }
          ],
          description: 'Metrics collection from all services, infrastructure, and applications'
        },
        {
          id: 'grafana',
          name: 'Grafana',
          type: 'Visualization',
          status: 'operational',
          metrics: [
            { label: 'Dashboards', value: '200+' },
            { label: 'Users', value: '500' },
            { label: 'Alerts', value: '350 rules' },
            { label: 'Data Sources', value: '8' }
          ],
          description: 'Real-time dashboards for platform health, business metrics, and alerts'
        },
        {
          id: 'jaeger',
          name: 'Jaeger',
          type: 'Tracing',
          status: 'operational',
          metrics: [
            { label: 'Traces/day', value: '100M+' },
            { label: 'Services', value: '45' },
            { label: 'Retention', value: '7 days' },
            { label: 'Sampling', value: '1%' }
          ],
          description: 'Distributed tracing for debugging latency, errors, and service dependencies'
        }
      ]
    }
  ];

  const allComponents = layers.flatMap(l => l.components);
  const filteredComponents = selectedLayer === 'all' 
    ? allComponents 
    : layers.find(l => l.id === selectedLayer)?.components || [];

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'operational': return 'bg-green-500/20 text-green-300 border-green-500/30';
      case 'degraded': return 'bg-yellow-500/20 text-yellow-300 border-yellow-500/30';
      case 'offline': return 'bg-red-500/20 text-red-300 border-red-500/30';
      default: return 'bg-gray-500/20 text-gray-300 border-gray-500/30';
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'operational': return <Activity className="w-3 h-3 text-green-400" />;
      case 'degraded': return <Activity className="w-3 h-3 text-yellow-400" />;
      case 'offline': return <Activity className="w-3 h-3 text-red-400" />;
      default: return <Activity className="w-3 h-3 text-gray-400" />;
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-start justify-between">
        <div>
          <div className="flex items-center gap-3 mb-2">
            <div className="p-2 rounded-lg bg-gradient-to-br from-blue-500/20 to-purple-500/20 border border-blue-500/30">
              <Network className="w-5 h-5 text-blue-400" />
            </div>
            <h2 className="text-xl font-medium text-white">System Architecture</h2>
          </div>
          <p className="text-sm text-gray-400">
            Multi-region AWS cloud architecture with edge computing and real-time data pipeline
          </p>
        </div>

        {/* Global Stats */}
        <div className="flex gap-4">
          <div className="text-right">
            <div className="text-xs text-gray-400 mb-1">Global Uptime</div>
            <div className="text-lg font-medium text-green-400">99.97%</div>
          </div>
          <div className="text-right">
            <div className="text-xs text-gray-400 mb-1">Total Nodes</div>
            <div className="text-lg font-medium text-white">188</div>
          </div>
        </div>
      </div>

      {/* Layer Selector */}
      <div className="grid grid-cols-7 gap-3">
        <button
          onClick={() => setSelectedLayer('all')}
          className={`p-4 rounded-lg border transition-all ${
            selectedLayer === 'all'
              ? 'bg-white/10 border-white/20'
              : 'bg-white/5 border-white/10 hover:bg-white/8'
          }`}
        >
          <Layers className="w-5 h-5 text-gray-300 mb-2" />
          <div className="text-sm font-medium text-white">All Layers</div>
          <div className="text-xs text-gray-400 mt-1">6 layers</div>
        </button>

        {layers.map((layer) => {
          const layerIcons = {
            'edge': Wifi,
            'iot': Radio,
            'streaming': Zap,
            'compute': Cpu,
            'data': Database,
            'monitoring': Activity
          };
          const Icon = layerIcons[layer.id as keyof typeof layerIcons] || Server;

          return (
            <button
              key={layer.id}
              onClick={() => setSelectedLayer(layer.id)}
              className={`p-4 rounded-lg border transition-all ${
                selectedLayer === layer.id
                  ? 'bg-white/10 border-white/20'
                  : 'bg-white/5 border-white/10 hover:bg-white/8'
              }`}
            >
              <div className={`w-10 h-10 rounded-lg bg-gradient-to-br ${layer.color} flex items-center justify-center mb-2`}>
                <Icon className="w-5 h-5 text-white" />
              </div>
              <div className="text-sm font-medium text-white">{layer.name}</div>
              <div className="text-xs text-gray-400 mt-1">{layer.components.length} components</div>
            </button>
          );
        })}
      </div>

      {/* Visual Architecture Diagram */}
      <div className="p-6 rounded-lg bg-gradient-to-br from-white/5 to-white/[0.02] border border-white/10">
        <h3 className="text-sm font-medium text-white mb-4">Data Flow Diagram</h3>
        
        <div className="space-y-4">
          {/* Edge Layer */}
          <div className="flex items-center gap-3">
            <div className="w-32 px-3 py-2 rounded bg-green-500/20 border border-green-500/30 text-xs text-green-300 text-center font-medium">
              125M Sensors
            </div>
            <div className="flex-1">
              <div className="h-px bg-gradient-to-r from-green-500/50 to-blue-500/50 relative">
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 px-2 bg-[#030213] text-xs text-gray-400">
                  LoRaWAN 915MHz
                </div>
              </div>
            </div>
            <div className="w-32 px-3 py-2 rounded bg-green-500/20 border border-green-500/30 text-xs text-green-300 text-center font-medium">
              Greengrass
            </div>
          </div>

          {/* IoT Platform */}
          <div className="flex items-center gap-3">
            <div className="w-32 px-3 py-2 rounded bg-blue-500/20 border border-blue-500/30 text-xs text-blue-300 text-center font-medium">
              MQTT/TLS 1.3
            </div>
            <div className="flex-1">
              <div className="h-px bg-gradient-to-r from-blue-500/50 to-purple-500/50 relative">
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 px-2 bg-[#030213] text-xs text-gray-400">
                  1M msg/sec
                </div>
              </div>
            </div>
            <div className="w-32 px-3 py-2 rounded bg-blue-500/20 border border-blue-500/30 text-xs text-blue-300 text-center font-medium">
              IoT Core
            </div>
          </div>

          {/* Streaming Pipeline */}
          <div className="flex items-center gap-3">
            <div className="w-32 px-3 py-2 rounded bg-purple-500/20 border border-purple-500/30 text-xs text-purple-300 text-center font-medium">
              IoT Rules
            </div>
            <div className="flex-1">
              <div className="h-px bg-gradient-to-r from-purple-500/50 to-orange-500/50 relative">
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 px-2 bg-[#030213] text-xs text-gray-400">
                  500K events/sec
                </div>
              </div>
            </div>
            <div className="w-32 px-3 py-2 rounded bg-purple-500/20 border border-purple-500/30 text-xs text-purple-300 text-center font-medium">
              Kinesis
            </div>
          </div>

          {/* Compute Layer */}
          <div className="flex items-center gap-3">
            <div className="w-32 px-3 py-2 rounded bg-orange-500/20 border border-orange-500/30 text-xs text-orange-300 text-center font-medium">
              EKS (180 nodes)
            </div>
            <div className="flex-1">
              <div className="h-px bg-gradient-to-r from-orange-500/50 to-cyan-500/50 relative">
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 px-2 bg-[#030213] text-xs text-gray-400">
                  5,000+ pods
                </div>
              </div>
            </div>
            <div className="w-32 px-3 py-2 rounded bg-orange-500/20 border border-orange-500/30 text-xs text-orange-300 text-center font-medium">
              API Gateway
            </div>
          </div>

          {/* Data Layer */}
          <div className="flex items-center gap-3">
            <div className="w-32 px-3 py-2 rounded bg-cyan-500/20 border border-cyan-500/30 text-xs text-cyan-300 text-center font-medium">
              InfluxDB
            </div>
            <div className="w-32 px-3 py-2 rounded bg-cyan-500/20 border border-cyan-500/30 text-xs text-cyan-300 text-center font-medium">
              PostgreSQL
            </div>
            <div className="w-32 px-3 py-2 rounded bg-cyan-500/20 border border-cyan-500/30 text-xs text-cyan-300 text-center font-medium">
              Redis
            </div>
            <div className="flex-1">
              <div className="h-px bg-gradient-to-r from-cyan-500/50 to-pink-500/50 relative">
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 px-2 bg-[#030213] text-xs text-gray-400">
                  3.96TB total
                </div>
              </div>
            </div>
            <div className="w-32 px-3 py-2 rounded bg-cyan-500/20 border border-cyan-500/30 text-xs text-cyan-300 text-center font-medium">
              S3 (680TB)
            </div>
          </div>
        </div>
      </div>

      {/* Components Grid */}
      <div className="grid grid-cols-3 gap-4">
        {filteredComponents.map((component) => (
          <button
            key={component.id}
            onClick={() => setSelectedComponent(component)}
            className={`p-4 rounded-lg border text-left transition-all ${
              selectedComponent?.id === component.id
                ? 'bg-white/10 border-white/20'
                : 'bg-white/5 border-white/10 hover:bg-white/8'
            }`}
          >
            <div className="flex items-start justify-between mb-3">
              <div>
                <div className="text-sm font-medium text-white mb-1">{component.name}</div>
                <div className="text-xs text-gray-400">{component.type}</div>
              </div>
              <span className={`flex items-center gap-1 text-xs px-2 py-0.5 rounded border ${getStatusColor(component.status)}`}>
                {getStatusIcon(component.status)}
                {component.status}
              </span>
            </div>

            {component.metrics && (
              <div className="grid grid-cols-2 gap-2">
                {component.metrics.slice(0, 2).map((metric, idx) => (
                  <div key={idx}>
                    <div className="text-xs text-gray-500">{metric.label}</div>
                    <div className="text-sm text-white font-medium">{metric.value}</div>
                  </div>
                ))}
              </div>
            )}
          </button>
        ))}
      </div>

      {/* Selected Component Details */}
      {selectedComponent && (
        <div className="p-6 rounded-lg bg-gradient-to-br from-white/10 to-white/5 border border-white/20">
          <div className="flex items-start justify-between mb-4">
            <div>
              <div className="flex items-center gap-3 mb-2">
                <h3 className="text-lg font-medium text-white">{selectedComponent.name}</h3>
                <span className={`flex items-center gap-1 text-xs px-2 py-0.5 rounded border ${getStatusColor(selectedComponent.status)}`}>
                  {getStatusIcon(selectedComponent.status)}
                  {selectedComponent.status}
                </span>
              </div>
              <div className="text-sm text-gray-400 mb-1">{selectedComponent.type}</div>
              <p className="text-sm text-gray-300">{selectedComponent.description}</p>
            </div>
          </div>

          {selectedComponent.metrics && (
            <div className="grid grid-cols-4 gap-4">
              {selectedComponent.metrics.map((metric, idx) => (
                <div key={idx} className="p-3 rounded-lg bg-white/5 border border-white/10">
                  <div className="text-xs text-gray-400 mb-1">{metric.label}</div>
                  <div className="text-lg font-medium text-white">{metric.value}</div>
                </div>
              ))}
            </div>
          )}
        </div>
      )}

      {/* Global Infrastructure Stats */}
      <div className="grid grid-cols-4 gap-4">
        <div className="p-4 rounded-lg bg-white/5 border border-white/10">
          <div className="flex items-center gap-2 mb-2">
            <Globe className="w-4 h-4 text-blue-400" />
            <div className="text-xs text-gray-400">Regions</div>
          </div>
          <div className="text-lg font-medium text-white">8 AWS Regions</div>
          <div className="text-xs text-gray-500 mt-1">Multi-region deployment</div>
        </div>

        <div className="p-4 rounded-lg bg-white/5 border border-white/10">
          <div className="flex items-center gap-2 mb-2">
            <Server className="w-4 h-4 text-green-400" />
            <div className="text-xs text-gray-400">Compute Nodes</div>
          </div>
          <div className="text-lg font-medium text-white">180 / 500</div>
          <div className="text-xs text-gray-500 mt-1">36% utilization</div>
        </div>

        <div className="p-4 rounded-lg bg-white/5 border border-white/10">
          <div className="flex items-center gap-2 mb-2">
            <Shield className="w-4 h-4 text-purple-400" />
            <div className="text-xs text-gray-400">Security</div>
          </div>
          <div className="text-lg font-medium text-white">TLS 1.3 + mTLS</div>
          <div className="text-xs text-gray-500 mt-1">Zero-trust architecture</div>
        </div>

        <div className="p-4 rounded-lg bg-white/5 border border-white/10">
          <div className="flex items-center gap-2 mb-2">
            <Zap className="w-4 h-4 text-yellow-400" />
            <div className="text-xs text-gray-400">Auto-Scaling</div>
          </div>
          <div className="text-lg font-medium text-white">Enabled</div>
          <div className="text-xs text-gray-500 mt-1">10-10,000+ RPS</div>
        </div>
      </div>
    </div>
  );
};

export default ArchitectureDiagramVisualizer;
