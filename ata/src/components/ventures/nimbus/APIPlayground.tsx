import React, { useState } from 'react';
import { Play, Copy, CheckCircle, Code, Terminal } from 'lucide-react';

export function NimbusAPIPlayground() {
  const [selectedEndpoint, setSelectedEndpoint] = useState('get-device-status');
  const [response, setResponse] = useState('');
  const [loading, setLoading] = useState(false);
  const [copied, setCopied] = useState(false);

  const endpoints = [
    {
      id: 'get-device-status',
      method: 'GET',
      path: '/api/v1/devices/{device_id}',
      description: 'Get current device environmental status',
      params: { device_id: 'NIMBUS-HOME-001' },
      response: {
        device_id: 'NIMBUS-HOME-001',
        model: 'NIMBUS-PRO-2025',
        location: 'Living Room',
        status: 'optimal',
        sensors: {
          temperature: 22.5,
          humidity: 68,
          light_level: 12000,
          co2_ppm: 450,
          soil_moisture: 72
        },
        last_sync: '2025-11-30T10:45:23Z'
      },
    },
    {
      id: 'get-sensor-history',
      method: 'GET',
      path: '/api/v1/devices/{device_id}/sensors',
      description: 'Get sensor readings history',
      params: { device_id: 'NIMBUS-HOME-001', hours: 24 },
      response: {
        device_id: 'NIMBUS-HOME-001',
        timerange: '24h',
        readings: [
          { timestamp: '2025-11-30T10:00:00Z', temperature: 22.3, humidity: 67, light: 12500 },
          { timestamp: '2025-11-30T09:00:00Z', temperature: 21.8, humidity: 69, light: 11000 },
          { timestamp: '2025-11-30T08:00:00Z', temperature: 21.5, humidity: 70, light: 8500 }
        ],
        total_readings: 1440
      },
    },
    {
      id: 'update-automation',
      method: 'POST',
      path: '/api/v1/devices/{device_id}/automation',
      description: 'Update automation rules',
      params: { 
        device_id: 'NIMBUS-HOME-001',
        rule: {
          type: 'watering',
          condition: { soil_moisture_below: 60 },
          action: { water_duration_seconds: 30 }
        }
      },
      response: {
        rule_id: 'rule_abc123',
        status: 'active',
        created_at: '2025-11-30T10:45:23Z',
        next_execution: '2025-12-01T08:00:00Z'
      },
    },
    {
      id: 'get-plant-health',
      method: 'GET',
      path: '/api/v1/devices/{device_id}/plant',
      description: 'Get AI plant health analysis',
      params: { device_id: 'NIMBUS-HOME-001' },
      response: {
        species: 'Monstera deliciosa',
        health_score: 92,
        status: 'thriving',
        recommendations: [
          'Optimal light levels',
          'Consider light fertilization',
          'Monitor for new growth'
        ],
        predicted_growth: 'New leaf in 7-10 days'
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
    }, 800);
  };

  const handleCopy = () => {
    navigator.clipboard.writeText(response);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="min-h-screen relative overflow-hidden">
      <div className="relative z-10 p-8">
        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center gap-3 mb-2">
            <Terminal className="w-8 h-8 text-green-400" />
            <h1 className="text-white">API Playground</h1>
          </div>
          <p className="text-[#717182]">Test NIMBUS BIOME™ IoT API endpoints</p>
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
                        ? 'bg-green-500/20 border-2 border-green-500'
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
                  className="w-full bg-gradient-to-r from-green-500 to-emerald-500 hover:from-green-600 hover:to-emerald-600 disabled:opacity-50 text-white px-6 py-3 rounded-xl flex items-center justify-center gap-2 transition-all"
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
            <div className="text-2xl text-white mb-1">99.95%</div>
            <div className="text-sm text-[#717182]">API Uptime</div>
          </div>
          <div className="glass-light glass-hover rounded-2xl p-6">
            <div className="text-2xl text-white mb-1">&lt;30ms</div>
            <div className="text-sm text-[#717182]">Avg Response Time</div>
          </div>
          <div className="glass-light glass-hover rounded-2xl p-6">
            <div className="text-2xl text-white mb-1">500/min</div>
            <div className="text-sm text-[#717182]">Rate Limit</div>
          </div>
        </div>
      </div>
    </div>
  );
}