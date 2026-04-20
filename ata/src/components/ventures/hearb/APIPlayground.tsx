import React, { useState } from 'react';
import { Play, Copy, CheckCircle, Code, Terminal } from 'lucide-react';

export function HearbAPIPlayground() {
  const [selectedEndpoint, setSelectedEndpoint] = useState('speech-to-text');
  const [response, setResponse] = useState('');
  const [loading, setLoading] = useState(false);
  const [copied, setCopied] = useState(false);

  const endpoints = [
    {
      id: 'speech-to-text',
      method: 'POST',
      path: '/api/v1/transcribe',
      description: 'Real-time speech-to-text transcription',
      params: { 
        audio_format: 'wav',
        language: 'en-US',
        sample_rate: 16000,
        enable_punctuation: true
      },
      response: {
        transcription_id: 'trans_abc123',
        text: 'Hello, how can I help you today?',
        language: 'en-US',
        confidence: 0.98,
        latency_ms: 187,
        word_timings: [
          { word: 'Hello', start: 0.0, end: 0.5 },
          { word: 'how', start: 0.6, end: 0.8 }
        ]
      },
    },
    {
      id: 'object-detection',
      method: 'POST',
      path: '/api/v1/vision/detect',
      description: 'Real-time object recognition',
      params: { 
        image_format: 'jpeg',
        confidence_threshold: 0.85,
        max_objects: 10
      },
      response: {
        detection_id: 'det_xyz789',
        objects: [
          { label: 'door', confidence: 0.94, bbox: [120, 45, 380, 590] },
          { label: 'chair', confidence: 0.89, bbox: [450, 280, 620, 480] },
          { label: 'table', confidence: 0.92, bbox: [100, 350, 700, 600] }
        ],
        latency_ms: 142,
        processed_at: '2025-11-30T10:45:23Z'
      },
    },
    {
      id: 'voice-command',
      method: 'POST',
      path: '/api/v1/voice/command',
      description: 'Voice command processing',
      params: { 
        command_text: 'Navigate to nearest pharmacy',
        user_location: { lat: 37.7749, lon: -122.4194 }
      },
      response: {
        command_id: 'cmd_def456',
        intent: 'navigation',
        action: 'find_location',
        parameters: {
          place_type: 'pharmacy',
          distance_km: 0.8,
          name: 'CVS Pharmacy'
        },
        confidence: 0.95,
        executed: true
      },
    },
    {
      id: 'emergency-alert',
      method: 'POST',
      path: '/api/v1/emergency/alert',
      description: 'Trigger emergency assistance',
      params: { 
        user_id: 'user_123',
        alert_type: 'fall_detected',
        location: { lat: 37.7749, lon: -122.4194 }
      },
      response: {
        alert_id: 'alert_urgent_789',
        status: 'dispatched',
        emergency_contacts_notified: 3,
        estimated_response_mins: 7,
        responder_type: 'ambulance',
        created_at: '2025-11-30T10:45:23Z'
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
            <Terminal className="w-8 h-8 text-blue-400" />
            <h1 className="text-white">API Playground</h1>
          </div>
          <p className="text-[#717182]">Test HEARb ASSIST Accessibility API endpoints</p>
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
                        ? 'bg-blue-500/20 border-2 border-blue-500'
                        : 'bg-white/5 border-2 border-transparent hover:bg-white/10'
                    }`}
                  >
                    <div className="flex items-center gap-2 mb-2">
                      <span className="px-2 py-1 rounded text-xs bg-green-500/20 text-green-400">
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
                    <span className="text-green-400">{selectedEndpointData?.method}</span>
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
                  className="w-full bg-gradient-to-r from-blue-500 to-purple-500 hover:from-blue-600 hover:to-purple-600 disabled:opacity-50 text-white px-6 py-3 rounded-xl flex items-center justify-center gap-2 transition-all"
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
            <div className="text-2xl text-white mb-1">99.98%</div>
            <div className="text-sm text-[#717182]">API Uptime</div>
          </div>
          <div className="glass-light glass-hover rounded-2xl p-6">
            <div className="text-2xl text-white mb-1">&lt;200ms</div>
            <div className="text-sm text-[#717182]">Avg Latency</div>
          </div>
          <div className="glass-light glass-hover rounded-2xl p-6">
            <div className="text-2xl text-white mb-1">HIPAA</div>
            <div className="text-sm text-[#717182]">Compliant</div>
          </div>
        </div>
      </div>
    </div>
  );
}