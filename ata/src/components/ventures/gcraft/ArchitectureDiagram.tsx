import React from 'react';
import { Server, Database, CreditCard, Shield, Zap, Cloud, Activity } from 'lucide-react';

export function GcraftArchitectureDiagram() {
  const components = [
    {
      id: 'web-app',
      name: 'Web App',
      description: 'React/Next.js',
      icon: Activity,
      color: 'from-green-500 to-emerald-500',
      position: { x: 50, y: 200 },
    },
    {
      id: 'api-gateway',
      name: 'API Gateway',
      description: 'Node.js cluster',
      icon: Server,
      color: 'from-blue-500 to-cyan-500',
      position: { x: 300, y: 100 },
    },
    {
      id: 'fraud-engine',
      name: 'Fraud Engine',
      description: 'XGBoost ML',
      icon: Shield,
      color: 'from-red-500 to-orange-500',
      position: { x: 300, y: 300 },
    },
    {
      id: 'payment-processor',
      name: 'Payments',
      description: 'Stripe Connect',
      icon: CreditCard,
      color: 'from-purple-500 to-pink-500',
      position: { x: 550, y: 100 },
    },
    {
      id: 'postgres',
      name: 'PostgreSQL',
      description: 'Transactional data',
      icon: Database,
      color: 'from-yellow-500 to-amber-500',
      position: { x: 550, y: 200 },
    },
    {
      id: 'balance-api',
      name: 'Balance API',
      description: '500+ retailers',
      icon: Zap,
      color: 'from-indigo-500 to-violet-500',
      position: { x: 550, y: 300 },
    },
    {
      id: 'cdn',
      name: 'CDN',
      description: 'CloudFront',
      icon: Cloud,
      color: 'from-pink-500 to-rose-500',
      position: { x: 50, y: 100 },
    },
  ];

  const connections = [
    { from: 'web-app', to: 'cdn' },
    { from: 'cdn', to: 'api-gateway' },
    { from: 'web-app', to: 'fraud-engine' },
    { from: 'api-gateway', to: 'payment-processor' },
    { from: 'fraud-engine', to: 'postgres' },
    { from: 'api-gateway', to: 'postgres' },
    { from: 'api-gateway', to: 'balance-api' },
  ];

  return (
    <div className="min-h-screen relative overflow-hidden">
      <div className="relative z-10 p-8">
        <div className="mb-8">
          <h1 className="text-white mb-2">System Architecture</h1>
          <p className="text-[#717182]">Gcraft - Secure Gift Card Marketplace</p>
        </div>

        <div className="glass-medium rounded-2xl p-12 mb-8">
          <div className="relative" style={{ height: '500px' }}>
            <svg className="absolute inset-0 w-full h-full pointer-events-none">
              <defs>
                <marker
                  id="arrowhead-gcraft"
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
                    markerEnd="url(#arrowhead-gcraft)"
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

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="glass-light glass-hover rounded-2xl p-6">
            <div className="flex items-center gap-3 mb-3">
              <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-red-500 to-orange-500 flex items-center justify-center">
                <Shield className="w-5 h-5 text-white" />
              </div>
              <h3 className="text-white">ML Fraud Detection</h3>
            </div>
            <p className="text-sm text-[#717182]">XGBoost model. 99.7% accuracy. Flags suspicious transactions in real-time.</p>
          </div>

          <div className="glass-light glass-hover rounded-2xl p-6">
            <div className="flex items-center gap-3 mb-3">
              <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-purple-500 to-pink-500 flex items-center justify-center">
                <CreditCard className="w-5 h-5 text-white" />
              </div>
              <h3 className="text-white">Instant Payouts</h3>
            </div>
            <p className="text-sm text-[#717182]">Stripe Connect. 2.3 min avg payout time. PCI DSS Level 1 compliant.</p>
          </div>

          <div className="glass-light glass-hover rounded-2xl p-6">
            <div className="flex items-center gap-3 mb-3">
              <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-indigo-500 to-violet-500 flex items-center justify-center">
                <Zap className="w-5 h-5 text-white" />
              </div>
              <h3 className="text-white">Balance Verification</h3>
            </div>
            <p className="text-sm text-[#717182]">API integrations with 500+ retailers. Real-time balance checking.</p>
          </div>
        </div>
      </div>
    </div>
  );
}