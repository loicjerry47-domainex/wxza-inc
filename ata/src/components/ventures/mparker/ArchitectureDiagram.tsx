import React from 'react';
import { Server, Database, Cloud, Smartphone, Lock } from 'lucide-react';

export function MparkerArchitectureDiagram() {
  const layers = [
    {
      title: 'Client Layer',
      components: [
        { name: 'Mobile App', icon: Smartphone, description: 'iOS & Android' },
        { name: 'Web Portal', icon: Cloud, description: 'Admin Dashboard' }
      ],
      color: 'from-blue-500 to-cyan-500'
    },
    {
      title: 'API Layer',
      components: [
        { name: 'REST API', icon: Server, description: 'Node.js + Express' },
        { name: 'Auth Service', icon: Lock, description: 'OAuth 2.0 / JWT' }
      ],
      color: 'from-purple-500 to-pink-500'
    },
    {
      title: 'Data Layer',
      components: [
        { name: 'PostgreSQL', icon: Database, description: 'Primary Database' },
        { name: 'Redis Cache', icon: Database, description: 'Session & Real-time' }
      ],
      color: 'from-green-500 to-emerald-500'
    }
  ];

  return (
    <div className="min-h-screen relative overflow-hidden">
      <div className="relative z-10 p-8">
        <div className="mb-8">
          <div className="flex items-center gap-3 mb-2">
            <Server className="w-8 h-8 text-purple-400" />
            <h1 className="text-white">System Architecture</h1>
          </div>
          <p className="text-[#717182]">Mparker Platform Technical Infrastructure</p>
        </div>

        <div className="space-y-8">
          {layers.map((layer, index) => (
            <div key={index}>
              <h3 className="text-white mb-4">{layer.title}</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {layer.components.map((component, compIndex) => {
                  const Icon = component.icon;
                  return (
                    <div key={compIndex} className="glass-light glass-hover rounded-2xl p-6">
                      <div className={`w-14 h-14 rounded-xl bg-gradient-to-br ${layer.color} flex items-center justify-center mb-4`}>
                        <Icon className="w-7 h-7 text-white" />
                      </div>
                      <h4 className="text-white text-lg mb-2">{component.name}</h4>
                      <p className="text-[#717182] text-sm">{component.description}</p>
                    </div>
                  );
                })}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}