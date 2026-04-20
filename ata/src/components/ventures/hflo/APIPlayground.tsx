import React, { useState } from 'react';
import { Play, Copy, CheckCircle, Code, Terminal } from 'lucide-react';

export function HfloAPIPlayground() {
  const [selectedEndpoint, setSelectedEndpoint] = useState('get-species');
  const [response, setResponse] = useState('');
  const [loading, setLoading] = useState(false);
  const [copied, setCopied] = useState(false);

  const endpoints = [
    {
      id: 'get-species',
      method: 'GET',
      path: '/api/v1/species/{species_id}',
      description: 'Get flower species details',
      params: { species_id: 'spec_cherry_blossom' },
      response: {
        species_id: 'spec_cherry_blossom',
        name: 'Cherry Blossom (Sakura)',
        resolution: '4K',
        animation_fps: 60,
        duration_seconds: 120,
        color_palette: ['#FFB7C5', '#FFC0CB', '#FFFFFF'],
        file_size_mb: 45.3,
        downloads: 8923
      },
    },
    {
      id: 'get-unit-status',
      method: 'GET',
      path: '/api/v1/units/{unit_id}',
      description: 'Get hologram unit status',
      params: { unit_id: 'unit_abc123' },
      response: {
        unit_id: 'unit_abc123',
        status: 'active',
        solar_output_watts: 12.4,
        battery_level: 95,
        current_species: 'Cherry Blossom',
        display_uptime_hours: 8742,
        last_sync: '2025-11-30T10:42:00Z'
      },
    },
    {
      id: 'update-species',
      method: 'POST',
      path: '/api/v1/units/{unit_id}/species',
      description: 'Change displayed flower species',
      params: { 
        unit_id: 'unit_abc123',
        species_id: 'spec_orchid',
        transition_duration: 5
      },
      response: {
        unit_id: 'unit_abc123',
        previous_species: 'Cherry Blossom',
        new_species: 'Orchid',
        transition_started_at: '2025-11-30T10:45:23Z',
        estimated_completion: '2025-11-30T10:45:28Z',
        status: 'transitioning'
      },
    },
    {
      id: 'get-telemetry',
      method: 'GET',
      path: '/api/v1/units/{unit_id}/telemetry',
      description: 'Get unit telemetry data',
      params: { 
        unit_id: 'unit_abc123',
        timeframe: '24h'
      },
      response: {
        unit_id: 'unit_abc123',
        timeframe: '24h',
        avg_solar_output_watts: 11.8,
        peak_solar_output_watts: 15.2,
        total_energy_generated_wh: 283,
        uptime_percent: 99.8,
        data_points: 1440
      },
    },
  ];

  const selectedEndpointData = endpoints.find(e => e.id === selectedEndpoint);

  const handleRunRequest = () => {
    setLoading(true);
    setResponse('');
    
    setTimeout(() => {
      setResponse(JSON.stringify(selectedEndpointData?.response, null, 2));
      setLoading(false);
    }, 550);
  };

  const handleCopy = () => {
    navigator.clipboard.writeText(response);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="min-h-screen relative overflow-hidden">
      <div className="relative z-10 p-8">
        <div className="mb-8">
          <div className="flex items-center gap-3 mb-2">
            <Terminal className="w-8 h-8 text-pink-400" />
            <h1 className="text-white">API Playground</h1>
          </div>
          <p className="text-[#717182]">Test HFLO Holographic Flower API endpoints</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Endpoint Selector */}
          <div className="lg:col-span-1">
            <div className="glass-light rounded-2xl p-6">
              <h3 className="text-white mb-4 flex items-center gap-2">
                <Code className="w-5 h-5" />
                Endpoints
              </h3>
              <div className="space-y-2">
                {endpoints.map(endpoint => (
                  <button
                    key={endpoint.id}
                    onClick={() => setSelectedEndpoint(endpoint.id)}
                    className={`w-full text-left p-4 rounded-xl transition-all ${
                      selectedEndpoint === endpoint.id
                        ? 'bg-pink-500/20 border-2 border-pink-500'
                        : 'bg-white/5 border-2 border-transparent hover:bg-white/10'
                    }`}
                  >
                    <div className="flex items-center gap-2 mb-2">
                      <span className={`px-2 py-1 rounded text-xs ${
                        endpoint.method === 'GET' ? 'bg-blue-500/20 text-blue-400' : 'bg-green-500/20 text-green-400'
                      }`}>
                        {endpoint.method}
                      </span>
                    </div>
                    <div className="text-white text-sm mb-1">{endpoint.path}</div>
                    <div className="text-[#717182] text-xs">{endpoint.description}</div>
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Request/Response */}
          <div className="lg:col-span-2 space-y-6">
            {/* Request */}
            <div className="glass-light rounded-2xl p-6">
              <h3 className="text-white mb-4">Request</h3>
              <div className="space-y-4">
                <div>
                  <div className="text-sm text-[#717182] mb-2">Endpoint</div>
                  <div className="bg-black/30 rounded-lg p-4 font-mono text-sm">
                    <span className={`${
                      selectedEndpointData?.method === 'GET' ? 'text-blue-400' : 'text-green-400'
                    }`}>
                      {selectedEndpointData?.method}
                    </span>
                    <span className="text-white ml-2">{selectedEndpointData?.path}</span>
                  </div>
                </div>
                
                <div>
                  <div className="text-sm text-[#717182] mb-2">Parameters</div>
                  <div className="bg-black/30 rounded-lg p-4 font-mono text-sm text-cyan-400">
                    {JSON.stringify(selectedEndpointData?.params, null, 2)}
                  </div>
                </div>

                <button
                  onClick={handleRunRequest}
                  disabled={loading}
                  className="w-full bg-gradient-to-r from-pink-500 to-purple-500 hover:from-pink-600 hover:to-purple-600 disabled:opacity-50 text-white px-6 py-3 rounded-xl flex items-center justify-center gap-2 transition-all"
                >
                  {loading ? (
                    <>
                      <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                      <span>Running...</span>
                    </>
                  ) : (
                    <>
                      <Play className="w-4 h-4" />
                      <span>Run Request</span>
                    </>
                  )}
                </button>
              </div>
            </div>

            {/* Response */}
            {response && (
              <div className="glass-light rounded-2xl p-6">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-white">Response</h3>
                  <button
                    onClick={handleCopy}
                    className="flex items-center gap-2 px-3 py-2 rounded-lg bg-white/5 hover:bg-white/10 transition-colors text-sm"
                  >
                    {copied ? (
                      <>
                        <CheckCircle className="w-4 h-4 text-green-400" />
                        <span className="text-green-400">Copied!</span>
                      </>
                    ) : (
                      <>
                        <Copy className="w-4 h-4 text-[#717182]" />
                        <span className="text-[#717182]">Copy</span>
                      </>
                    )}
                  </button>
                </div>
                <div className="bg-black/30 rounded-lg p-4 font-mono text-sm text-green-400 overflow-x-auto">
                  <pre>{response}</pre>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* API Info */}
        <div className="mt-8 grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="glass-light glass-hover rounded-2xl p-6">
            <div className="text-2xl text-white mb-1">99.8%</div>
            <div className="text-sm text-[#717182]">Unit Uptime</div>
          </div>
          <div className="glass-light glass-hover rounded-2xl p-6">
            <div className="text-2xl text-white mb-1">1,247</div>
            <div className="text-sm text-[#717182]">Species Library</div>
          </div>
          <div className="glass-light glass-hover rounded-2xl p-6">
            <div className="text-2xl text-white mb-1">15 years</div>
            <div className="text-sm text-[#717182]">Avg Lifespan</div>
          </div>
        </div>
      </div>
    </div>
  );
}