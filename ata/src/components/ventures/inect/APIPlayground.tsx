import React, { useState } from 'react';
import { Play, Copy, CheckCircle, Code, Terminal } from 'lucide-react';

export function InectAPIPlayground() {
  const [selectedEndpoint, setSelectedEndpoint] = useState('create-event');
  const [response, setResponse] = useState('');
  const [loading, setLoading] = useState(false);
  const [copied, setCopied] = useState(false);

  const endpoints = [
    {
      id: 'create-event',
      method: 'POST',
      path: '/api/v1/events',
      description: 'Create a new live event',
      params: { 
        name: 'TechCon 2025 - Main Stage',
        broadcaster_id: 'broadcaster_abc123',
        cameras: 4,
        enable_ai_director: true
      },
      response: {
        event_id: 'event_xyz789',
        name: 'TechCon 2025 - Main Stage',
        status: 'created',
        stream_key: 'live_sk_a8f3h29d0s92',
        rtmp_url: 'rtmp://ingest.inect.tv/live',
        hls_url: 'https://cdn.inect.tv/event_xyz789/index.m3u8',
        created_at: '2025-11-30T10:45:23Z'
      },
    },
    {
      id: 'start-stream',
      method: 'POST',
      path: '/api/v1/events/{event_id}/start',
      description: 'Start live streaming',
      params: { event_id: 'event_xyz789' },
      response: {
        event_id: 'event_xyz789',
        status: 'live',
        started_at: '2025-11-30T10:46:00Z',
        viewer_count: 0,
        transcoding_profiles: ['360p', '720p', '1080p', '4K'],
        ai_director_active: true
      },
    },
    {
      id: 'get-analytics',
      method: 'GET',
      path: '/api/v1/events/{event_id}/analytics',
      description: 'Get real-time event analytics',
      params: { event_id: 'event_xyz789' },
      response: {
        event_id: 'event_xyz789',
        current_viewers: 45200,
        peak_viewers: 58900,
        total_views: 127400,
        avg_watch_time_mins: 42,
        quality_distribution: {
          '4K': 28,
          '1080p': 45,
          '720p': 22,
          '360p': 5
        },
        ai_camera_switches: 1247,
        avg_latency_ms: 820
      },
    },
    {
      id: 'ai-camera-switch',
      method: 'POST',
      path: '/api/v1/events/{event_id}/camera/switch',
      description: 'AI-powered camera switching',
      params: { 
        event_id: 'event_xyz789',
        mode: 'auto',
        sensitivity: 0.75
      },
      response: {
        from_camera: 2,
        to_camera: 1,
        reason: 'speaker_focus',
        confidence: 0.92,
        switched_at: '2025-11-30T10:47:15Z',
        viewer_retention: 0.98
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
    }, 700);
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
            <Terminal className="w-8 h-8 text-red-400" />
            <h1 className="text-white">API Playground</h1>
          </div>
          <p className="text-[#717182]">Test INECT Live Streaming API endpoints</p>
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
                        ? 'bg-red-500/20 border-2 border-red-500'
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
                  className="w-full bg-gradient-to-r from-red-500 to-orange-500 hover:from-red-600 hover:to-orange-600 disabled:opacity-50 text-white px-6 py-3 rounded-xl flex items-center justify-center gap-2 transition-all"
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
            <div className="text-2xl text-white mb-1">99.94%</div>
            <div className="text-sm text-[#717182]">API Uptime</div>
          </div>
          <div className="glass-light glass-hover rounded-2xl p-6">
            <div className="text-2xl text-white mb-1">&lt;35ms</div>
            <div className="text-sm text-[#717182]">Avg Response Time</div>
          </div>
          <div className="glass-light glass-hover rounded-2xl p-6">
            <div className="text-2xl text-white mb-1">200/min</div>
            <div className="text-sm text-[#717182]">Rate Limit</div>
          </div>
        </div>
      </div>
    </div>
  );
}