import React, { useState } from 'react';
import { Play, Copy, CheckCircle, Code, Terminal } from 'lucide-react';

export function LensstormAPIPlayground() {
  const [selectedEndpoint, setSelectedEndpoint] = useState('get-device-status');
  const [response, setResponse] = useState('');
  const [loading, setLoading] = useState(false);
  const [copied, setCopied] = useState(false);

  const endpoints = [
    {
      id: 'get-device-status',
      method: 'GET',
      path: '/api/v1/devices/{device_id}',
      description: 'Get real-time device status',
      params: { device_id: 'LENS-PRO-0014' },
      response: {
        device_id: 'LENS-PRO-0014',
        model: 'LENSSTORM PRO',
        firmware_version: '2.4.1',
        battery_level: 78,
        is_online: true,
        current_feature: 'live_translation',
        session_duration_mins: 154,
        ai_models_loaded: 12,
        last_sync: '2025-11-30T10:42:00Z'
      },
    },
    {
      id: 'get-ar-session',
      method: 'GET',
      path: '/api/v1/sessions/{session_id}',
      description: 'Get AR session details',
      params: { session_id: 'sess_abc123' },
      response: {
        session_id: 'sess_abc123',
        device_id: 'LENS-PRO-0014',
        feature: 'object_recognition',
        started_at: '2025-11-30T09:30:00Z',
        duration_seconds: 4200,
        battery_consumed: 18,
        objects_detected: 1247,
        avg_latency_ms: 8.4
      },
    },
    {
      id: 'trigger-ai-model',
      method: 'POST',
      path: '/api/v1/ai/inference',
      description: 'Run on-device AI model inference',
      params: { 
        model: 'object_recognition_v3',
        input_type: 'camera_frame',
        confidence_threshold: 0.85
      },
      response: {
        inference_id: 'inf_xyz789',
        model: 'object_recognition_v3',
        latency_ms: 7.8,
        results: [
          { object: 'laptop', confidence: 0.94, bbox: [120, 45, 380, 290] },
          { object: 'coffee_cup', confidence: 0.89, bbox: [420, 180, 480, 250] }
        ],
        processed_at: '2025-11-30T10:45:23Z'
      },
    },
    {
      id: 'update-privacy-settings',
      method: 'PATCH',
      path: '/api/v1/devices/{device_id}/privacy',
      description: 'Update hardware privacy controls',
      params: { 
        device_id: 'LENS-PRO-0014',
        camera_shutter_enabled: true,
        mic_muted: false,
        privacy_mode: 'balanced'
      },
      response: {
        device_id: 'LENS-PRO-0014',
        camera_shutter_enabled: true,
        mic_muted: false,
        privacy_mode: 'balanced',
        updated_at: '2025-11-30T10:45:23Z',
        hardware_confirmed: true
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
    }, 600);
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
            <Terminal className="w-8 h-8 text-cyan-400" />
            <h1 className="text-white">API Playground</h1>
          </div>
          <p className="text-[#717182]">Test LENSSTORM AR Device API endpoints</p>
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
                        ? 'bg-cyan-500/20 border-2 border-cyan-500'
                        : 'bg-white/5 border-2 border-transparent hover:bg-white/10'
                    }`}
                  >
                    <div className="flex items-center gap-2 mb-2">
                      <span className={`px-2 py-1 rounded text-xs ${
                        endpoint.method === 'GET' ? 'bg-blue-500/20 text-blue-400' : 
                        endpoint.method === 'POST' ? 'bg-green-500/20 text-green-400' :
                        'bg-yellow-500/20 text-yellow-400'
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
                      selectedEndpointData?.method === 'GET' ? 'text-blue-400' : 
                      selectedEndpointData?.method === 'POST' ? 'text-green-400' :
                      'text-yellow-400'
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
                  className="w-full bg-gradient-to-r from-cyan-500 to-blue-500 hover:from-cyan-600 hover:to-blue-600 disabled:opacity-50 text-white px-6 py-3 rounded-xl flex items-center justify-center gap-2 transition-all"
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
            <div className="text-2xl text-white mb-1">99.96%</div>
            <div className="text-sm text-[#717182]">API Uptime</div>
          </div>
          <div className="glass-light glass-hover rounded-2xl p-6">
            <div className="text-2xl text-white mb-1">&lt;25ms</div>
            <div className="text-sm text-[#717182]">Avg Response Time</div>
          </div>
          <div className="glass-light glass-hover rounded-2xl p-6">
            <div className="text-2xl text-white mb-1">100/min</div>
            <div className="text-sm text-[#717182]">Rate Limit</div>
          </div>
        </div>
      </div>
    </div>
  );
}