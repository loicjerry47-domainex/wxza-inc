import React from 'react';
import { Server, Database, Cloud, Cpu, Wifi, Droplet, Zap } from 'lucide-react';

export function NimbusArchitectureDiagram() {
  const components = [
    {
      id: 'iot-devices',
      name: 'IoT Devices',
      description: '45K+ NIMBUS units',
      icon: Cpu,
      color: 'from-green-500 to-emerald-500',
      position: { x: 50, y: 200 },
    },
    {
      id: 'mqtt-broker',
      name: 'MQTT Broker',
      description: 'AWS IoT Core',
      icon: Wifi,
      color: 'from-blue-500 to-cyan-500',
      position: { x: 300, y: 100 },
    },
    {
      id: 'sensor-pipeline',
      name: 'Sensor Pipeline',
      description: 'Real-time processing',
      icon: Droplet,
      color: 'from-purple-500 to-pink-500',
      position: { x: 300, y: 300 },
    },
    {
      id: 'influxdb',
      name: 'InfluxDB',
      description: 'Time-series data',
      icon: Database,
      color: 'from-orange-500 to-red-500',
      position: { x: 550, y: 200 },
    },
    {
      id: 'api-server',
      name: 'API Server',
      description: 'Node.js + Express',
      icon: Server,
      color: 'from-indigo-500 to-violet-500',
      position: { x: 550, y: 100 },
    },
    {
      id: 'automation-engine',
      name: 'Automation Engine',
      description: 'AI climate control',
      icon: Zap,
      color: 'from-yellow-500 to-amber-500',
      position: { x: 50, y: 100 },
    },
    {
      id: 'aws-cloud',
      name: 'AWS Cloud',
      description: 'Multi-region',
      icon: Cloud,
      color: 'from-cyan-500 to-blue-500',
      position: { x: 550, y: 300 },
    },
  ];

  const connections = [
    { from: 'iot-devices', to: 'mqtt-broker' },
    { from: 'iot-devices', to: 'sensor-pipeline' },
    { from: 'mqtt-broker', to: 'api-server' },
    { from: 'sensor-pipeline', to: 'influxdb' },
    { from: 'api-server', to: 'influxdb' },
    { from: 'automation-engine', to: 'iot-devices' },
    { from: 'influxdb', to: 'aws-cloud' },
  ];

  return (
    <div className="min-h-screen relative overflow-hidden">
      <div className="relative z-10 p-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-white mb-2">System Architecture</h1>
          <p className="text-[#717182]">NIMBUS BIOME™ - IoT Climate Control Platform</p>
        </div>

        {/* Architecture Diagram */}
        <div className="glass-medium rounded-2xl p-12 mb-8">
          <div className="relative" style={{ height: '500px' }}>
            {/* Connection Lines */}
            <svg className="absolute inset-0 w-full h-full pointer-events-none">
              <defs>
                <marker
                  id="arrowhead-nimbus"
                  markerWidth="10"
                  markerHeight="10"
                  refX="9"
                  refY="3"
                  orient="auto"
                >
                  <polygon points="0 0, 10 3, 0 6" fill="rgba(255,255,255,0.3)" />
                </marker>
              </defs>
              {connections.map((conn, index) => {
                const fromComp = components.find(c => c.id === conn.from);
                const toComp = components.find(c => c.id === conn.to);
                if (!fromComp || !toComp) return null;

                const x1 = fromComp.position.x + 100;
                const y1 = fromComp.position.y + 50;
                const x2 = toComp.position.x + 100;
                const y2 = toComp.position.y + 50;

                return (
                  <line
                    key={index}
                    x1={x1}
                    y1={y1}
                    x2={x2}
                    y2={y2}
                    stroke="rgba(255,255,255,0.2)"
                    strokeWidth="2"
                    markerEnd="url(#arrowhead-nimbus)"
                    className="animate-pulse"
                    style={{ animationDelay: `${index * 0.2}s` }}
                  />
                );
              })}
            </svg>

            {/* Components */}
            {components.map((component) => {
              const Icon = component.icon;
              return (
                <div
                  key={component.id}
                  className="absolute bg-white/10 backdrop-blur-xl border border-white/20 rounded-xl p-6 hover:scale-105 transition-all duration-300 cursor-pointer group"
                  style={{
                    left: `${component.position.x}px`,
                    top: `${component.position.y}px`,
                    width: '200px',
                  }}
                >
                  <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${component.color} flex items-center justify-center mb-4 group-hover:scale-110 transition-transform`}>
                    <Icon className="w-6 h-6 text-white" />
                  </div>
                  <h3 className="text-white mb-1">{component.name}</h3>
                  <p className="text-sm text-[#717182]">{component.description}</p>
                </div>
              );
            })}
          </div>
        </div>

        {/* Architecture Highlights */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="glass-light glass-hover rounded-2xl p-6">
            <div className="flex items-center gap-3 mb-3">
              <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-green-500 to-emerald-500 flex items-center justify-center">
                <Wifi className="w-5 h-5 text-white" />
              </div>
              <h3 className="text-white">MQTT Protocol</h3>
            </div>
            <p className="text-sm text-[#717182]">Low-power messaging for IoT devices. Handles 45K+ concurrent connections.</p>
          </div>

          <div className="glass-light glass-hover rounded-2xl p-6">
            <div className="flex items-center gap-3 mb-3">
              <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-orange-500 to-red-500 flex items-center justify-center">
                <Database className="w-5 h-5 text-white" />
              </div>
              <h3 className="text-white">Time-Series Storage</h3>
            </div>
            <p className="text-sm text-[#717182]">InfluxDB stores 1.2B sensor readings per month with millisecond precision.</p>
          </div>

          <div className="glass-light glass-hover rounded-2xl p-6">
            <div className="flex items-center gap-3 mb-3">
              <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-yellow-500 to-amber-500 flex items-center justify-center">
                <Zap className="w-5 h-5 text-white" />
              </div>
              <h3 className="text-white">AI Automation</h3>
            </div>
            <p className="text-sm text-[#717182]">ML models optimize watering, lighting, and climate for each plant species.</p>
          </div>
        </div>
      </div>
    </div>
  );
}