import React from 'react';
import { Server, Database, Cloud, Cpu, Eye, Shield, Zap } from 'lucide-react';

export function LensstormArchitectureDiagram() {
  const components = [
    {
      id: 'ar-glasses',
      name: 'AR Glasses',
      description: '78K+ devices',
      icon: Eye,
      color: 'from-cyan-500 to-blue-500',
      position: { x: 50, y: 200 },
    },
    {
      id: 'edge-compute',
      name: 'Edge Computing',
      description: '15 on-device AI',
      icon: Cpu,
      color: 'from-purple-500 to-pink-500',
      position: { x: 300, y: 100 },
    },
    {
      id: 'cloud-sync',
      name: 'Cloud Sync',
      description: 'Real-time updates',
      icon: Cloud,
      color: 'from-green-500 to-emerald-500',
      position: { x: 300, y: 300 },
    },
    {
      id: 'postgres',
      name: 'PostgreSQL',
      description: 'User data, sessions',
      icon: Database,
      color: 'from-yellow-500 to-amber-500',
      position: { x: 550, y: 200 },
    },
    {
      id: 'api-server',
      name: 'API Server',
      description: 'Go microservices',
      icon: Server,
      color: 'from-indigo-500 to-violet-500',
      position: { x: 550, y: 100 },
    },
    {
      id: 'privacy-layer',
      name: 'Privacy Layer',
      description: 'Hardware shutters',
      icon: Shield,
      color: 'from-red-500 to-orange-500',
      position: { x: 50, y: 100 },
    },
    {
      id: 'ml-pipeline',
      name: 'ML Pipeline',
      description: 'Model training',
      icon: Zap,
      color: 'from-pink-500 to-rose-500',
      position: { x: 550, y: 300 },
    },
  ];

  const connections = [
    { from: 'ar-glasses', to: 'privacy-layer' },
    { from: 'privacy-layer', to: 'edge-compute' },
    { from: 'ar-glasses', to: 'cloud-sync' },
    { from: 'edge-compute', to: 'api-server' },
    { from: 'cloud-sync', to: 'postgres' },
    { from: 'api-server', to: 'postgres' },
    { from: 'postgres', to: 'ml-pipeline' },
  ];

  return (
    <div className="min-h-screen relative overflow-hidden">
      <div className="relative z-10 p-8">
        <div className="mb-8">
          <h1 className="text-white mb-2">System Architecture</h1>
          <p className="text-[#717182]">LENSSTORM - Edge-First AR Platform</p>
        </div>

        {/* Architecture Diagram */}
        <div className="glass-medium rounded-2xl p-12 mb-8">
          <div className="relative" style={{ height: '500px' }}>
            <svg className="absolute inset-0 w-full h-full pointer-events-none">
              <defs>
                <marker
                  id="arrowhead-lensstorm"
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
                    markerEnd="url(#arrowhead-lensstorm)"
                    className="animate-pulse"
                    style={{ animationDelay: `${index * 0.2}s` }}
                  />
                );
              })}
            </svg>

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
              <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-purple-500 to-pink-500 flex items-center justify-center">
                <Cpu className="w-5 h-5 text-white" />
              </div>
              <h3 className="text-white">Edge-First</h3>
            </div>
            <p className="text-sm text-[#717182]">15 AI models run on-device. Zero cloud latency for critical features.</p>
          </div>

          <div className="glass-light glass-hover rounded-2xl p-6">
            <div className="flex items-center gap-3 mb-3">
              <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-red-500 to-orange-500 flex items-center justify-center">
                <Shield className="w-5 h-5 text-white" />
              </div>
              <h3 className="text-white">Privacy Hardware</h3>
            </div>
            <p className="text-sm text-[#717182]">Physical camera shutter + mic mute. Hardware-enforced privacy.</p>
          </div>

          <div className="glass-light glass-hover rounded-2xl p-6">
            <div className="flex items-center gap-3 mb-3">
              <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-yellow-500 to-amber-500 flex items-center justify-center">
                <Database className="w-5 h-5 text-white" />
              </div>
              <h3 className="text-white">Minimal Cloud</h3>
            </div>
            <p className="text-sm text-[#717182]">Only syncs settings and analytics. All sensitive data stays local.</p>
          </div>
        </div>
      </div>
    </div>
  );
}