import React from 'react';
import { Server, Database, Shield, Cloud, Cpu, Network, Lock } from 'lucide-react';

export function AtableArchitectureDiagram() {
  const components = [
    {
      id: 'endpoints',
      name: 'Endpoints',
      description: '127K+ devices',
      icon: Cpu,
      color: 'from-blue-500 to-cyan-500',
      position: { x: 50, y: 200 },
    },
    {
      id: 'api-gateway',
      name: 'API Gateway',
      description: 'Kong (rate limiting)',
      icon: Network,
      color: 'from-purple-500 to-pink-500',
      position: { x: 300, y: 100 },
    },
    {
      id: 'threat-detection',
      name: 'Threat Detection',
      description: '8 ML models',
      icon: Shield,
      color: 'from-red-500 to-orange-500',
      position: { x: 300, y: 300 },
    },
    {
      id: 'database',
      name: 'PostgreSQL',
      description: 'Multi-region',
      icon: Database,
      color: 'from-green-500 to-emerald-500',
      position: { x: 550, y: 200 },
    },
    {
      id: 'kubernetes',
      name: 'Kubernetes',
      description: '320-node cluster',
      icon: Server,
      color: 'from-indigo-500 to-violet-500',
      position: { x: 550, y: 100 },
    },
    {
      id: 'zero-trust',
      name: 'Zero-Trust Network',
      description: 'Identity-based access',
      icon: Lock,
      color: 'from-yellow-500 to-amber-500',
      position: { x: 50, y: 100 },
    },
    {
      id: 'cloud',
      name: 'Multi-Cloud',
      description: 'AWS + GCP',
      icon: Cloud,
      color: 'from-cyan-500 to-blue-500',
      position: { x: 550, y: 300 },
    },
  ];

  const connections = [
    { from: 'endpoints', to: 'zero-trust' },
    { from: 'zero-trust', to: 'api-gateway' },
    { from: 'endpoints', to: 'threat-detection' },
    { from: 'api-gateway', to: 'kubernetes' },
    { from: 'threat-detection', to: 'database' },
    { from: 'kubernetes', to: 'database' },
    { from: 'database', to: 'cloud' },
  ];

  return (
    <div className="min-h-screen relative overflow-hidden">
      <div className="relative z-10 p-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-white mb-2">System Architecture</h1>
          <p className="text-[#717182]">ATABLE NEURAL 2077 - Zero-Trust Multi-Cloud Platform</p>
        </div>

        {/* Architecture Diagram */}
        <div className="glass-medium rounded-2xl p-12 mb-8">
          <div className="relative" style={{ height: '500px' }}>
            {/* Connection Lines */}
            <svg className="absolute inset-0 w-full h-full pointer-events-none">
              <defs>
                <marker
                  id="arrowhead"
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
                    markerEnd="url(#arrowhead)"
                    className="animate-pulse"
                    style={{ animationDelay: `${index * 0.2}s` }}
                  />
                );
              })}
            </svg>

            {/* Components */}
            {components.map((component, index) => {
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
              <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-blue-500 to-cyan-500 flex items-center justify-center">
                <Shield className="w-5 h-5 text-white" />
              </div>
              <h3 className="text-white">Zero-Trust Security</h3>
            </div>
            <p className="text-sm text-[#717182]">Identity-based access control with continuous verification. Never trust, always verify.</p>
          </div>

          <div className="glass-light glass-hover rounded-2xl p-6">
            <div className="flex items-center gap-3 mb-3">
              <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-purple-500 to-pink-500 flex items-center justify-center">
                <Server className="w-5 h-5 text-white" />
              </div>
              <h3 className="text-white">Auto-Scaling</h3>
            </div>
            <p className="text-sm text-[#717182]">Kubernetes auto-scales from 50-500 nodes based on threat volume. 99.99% uptime SLA.</p>
          </div>

          <div className="glass-light glass-hover rounded-2xl p-6">
            <div className="flex items-center gap-3 mb-3">
              <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-green-500 to-emerald-500 flex items-center justify-center">
                <Cloud className="w-5 h-5 text-white" />
              </div>
              <h3 className="text-white">Multi-Cloud</h3>
            </div>
            <p className="text-sm text-[#717182]">Deployed across AWS and GCP with automatic failover. No single point of failure.</p>
          </div>
        </div>
      </div>
    </div>
  );
}