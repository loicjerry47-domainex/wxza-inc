import React, { useState } from 'react';
import { Play, Copy, CheckCircle, Code, Terminal } from 'lucide-react';

export function AtableAPIPlayground() {
  const [selectedEndpoint, setSelectedEndpoint] = useState('get-endpoint-status');
  const [response, setResponse] = useState('');
  const [loading, setLoading] = useState(false);
  const [copied, setCopied] = useState(false);

  const endpoints = [
    {
      id: 'get-endpoint-status',
      method: 'GET',
      path: '/api/v1/endpoints/{endpoint_id}',
      description: 'Get endpoint security status',
      params: { endpoint_id: 'ep_abc123' },
      response: {
        id: 'ep_abc123',
        device_id: 'WIN-SERVER-2019-001',
        hostname: 'prod-web-01',
        os_type: 'Windows Server 2019',
        threat_level: 2,
        last_seen: '2025-11-30T10:45:23Z',
        status: 'protected',
      },
    },
    {
      id: 'list-threats',
      method: 'GET',
      path: '/api/v1/threats',
      description: 'List recent threats (paginated)',
      params: { limit: 5, severity: 'critical' },
      response: {
        threats: [
          { id: 'thr_001', type: 'Ransomware', severity: 'critical', status: 'blocked', detected_at: '2025-11-30T10:30:00Z' },
          { id: 'thr_002', type: 'SQL Injection', severity: 'high', status: 'blocked', detected_at: '2025-11-30T10:25:00Z' },
        ],
        total: 8234,
        page: 1,
      },
    },
    {
      id: 'analyze-file',
      method: 'POST',
      path: '/api/v1/analyze/file',
      description: 'Analyze file for malware (ML-powered)',
      params: { file_hash: 'sha256:abc123...', file_size: 1048576 },
      response: {
        file_hash: 'sha256:abc123...',
        is_malicious: false,
        confidence: 0.973,
        threat_type: null,
        scan_time_ms: 84,
      },
    },
    {
      id: 'get-ml-prediction',
      method: 'POST',
      path: '/api/v1/ml/predict',
      description: 'Run ML threat detection on network traffic',
      params: { source_ip: '203.45.67.89', destination_port: 3389, packet_size: 1500 },
      response: {
        prediction: 'brute_force_attack',
        confidence: 0.956,
        model: 'xgboost_v2.3',
        features: { port_scan_score: 0.82, geo_risk: 0.73, velocity_anomaly: 0.91 },
        recommended_action: 'block_ip',
      },
    },
  ];

  const selectedEndpointData = endpoints.find(e => e.id === selectedEndpoint);

  const handleRunRequest = () => {
    setLoading(true);
    setResponse('');
    
    // Simulate API call
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
          <p className="text-[#717182]">Test ATABLE NEURAL 2077 REST API endpoints</p>
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
            <div className="text-2xl text-white mb-1">99.9%</div>
            <div className="text-sm text-[#717182]">API Uptime</div>
          </div>
          <div className="glass-light glass-hover rounded-2xl p-6">
            <div className="text-2xl text-white mb-1">&lt;50ms</div>
            <div className="text-sm text-[#717182]">Avg Response Time</div>
          </div>
          <div className="glass-light glass-hover rounded-2xl p-6">
            <div className="text-2xl text-white mb-1">1,000/min</div>
            <div className="text-sm text-[#717182]">Rate Limit</div>
          </div>
        </div>
      </div>
    </div>
  );
}