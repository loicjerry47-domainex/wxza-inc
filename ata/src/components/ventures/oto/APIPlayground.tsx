import React, { useState } from 'react';
import { Play, Copy, CheckCircle, Code, Terminal } from 'lucide-react';

export function OtoAPIPlayground() {
  const [selectedEndpoint, setSelectedEndpoint] = useState('get-contact-insights');
  const [response, setResponse] = useState('');
  const [loading, setLoading] = useState(false);
  const [copied, setCopied] = useState(false);

  const endpoints = [
    {
      id: 'get-contact-insights',
      method: 'GET',
      path: '/api/v1/contacts/{contact_id}/insights',
      description: 'Get AI-generated relationship insights',
      params: { contact_id: 'contact_abc123' },
      response: {
        contact_id: 'contact_abc123',
        name: 'Sarah Johnson',
        insights: [
          { type: 'communication_pattern', insight: 'Prefers evening texts', confidence: 0.89 },
          { type: 'gift_preference', insight: 'Loves sustainable products', confidence: 0.92 },
          { type: 'relationship_health', insight: 'Strong connection, follow up recommended', confidence: 0.87 }
        ],
        health_score: 87,
        last_interaction: '2025-11-15T14:30:00Z',
        recommended_actions: ['Send check-in message', 'Birthday in 14 days - gift suggestion ready']
      },
    },
    {
      id: 'get-relationship-graph',
      method: 'GET',
      path: '/api/v1/relationships/graph',
      description: 'Get relationship network graph data',
      params: { user_id: 'user_xyz789', depth: 2 },
      response: {
        nodes: [
          { id: 'user_xyz789', name: 'You', type: 'user' },
          { id: 'contact_abc123', name: 'Sarah Johnson', type: 'contact', relationship: 'friend' },
          { id: 'contact_def456', name: 'Mike Chen', type: 'contact', relationship: 'colleague' }
        ],
        edges: [
          { from: 'user_xyz789', to: 'contact_abc123', strength: 0.87 },
          { from: 'user_xyz789', to: 'contact_def456', strength: 0.72 },
          { from: 'contact_abc123', to: 'contact_def456', strength: 0.45 }
        ],
        total_nodes: 147,
        total_edges: 423
      },
    },
    {
      id: 'create-reminder',
      method: 'POST',
      path: '/api/v1/reminders',
      description: 'Create AI-powered smart reminder',
      params: { 
        contact_id: 'contact_abc123',
        reminder_type: 'birthday',
        days_before: 7,
        ai_gift_suggestions: true
      },
      response: {
        reminder_id: 'rem_xyz123',
        contact_name: 'Sarah Johnson',
        event_date: '2025-12-14',
        notification_date: '2025-12-07',
        gift_suggestions: [
          { name: 'Eco-friendly yoga mat', price: 89, confidence: 0.94 },
          { name: 'Sustainable coffee set', price: 65, confidence: 0.88 }
        ],
        status: 'active'
      },
    },
    {
      id: 'analyze-sentiment',
      method: 'POST',
      path: '/api/v1/interactions/analyze',
      description: 'Analyze sentiment from interaction text',
      params: { 
        contact_id: 'contact_abc123',
        interaction_text: 'Had an amazing coffee chat! She seems really excited about the new project.',
        interaction_type: 'meeting'
      },
      response: {
        sentiment_score: 0.92,
        sentiment_label: 'very_positive',
        key_topics: ['project', 'excitement', 'collaboration'],
        relationship_impact: +5,
        new_health_score: 87,
        recommended_follow_up: 'Share project updates in 3 days'
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
            <Terminal className="w-8 h-8 text-pink-400" />
            <h1 className="text-white">API Playground</h1>
          </div>
          <p className="text-[#717182]">Test OTO AI Relationship API endpoints</p>
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
                  className="w-full bg-gradient-to-r from-pink-500 to-rose-500 hover:from-pink-600 hover:to-rose-600 disabled:opacity-50 text-white px-6 py-3 rounded-xl flex items-center justify-center gap-2 transition-all"
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
            <div className="text-2xl text-white mb-1">99.97%</div>
            <div className="text-sm text-[#717182]">API Uptime</div>
          </div>
          <div className="glass-light glass-hover rounded-2xl p-6">
            <div className="text-2xl text-white mb-1">&lt;40ms</div>
            <div className="text-sm text-[#717182]">Avg Response Time</div>
          </div>
          <div className="glass-light glass-hover rounded-2xl p-6">
            <div className="text-2xl text-white mb-1">300/min</div>
            <div className="text-sm text-[#717182]">Rate Limit</div>
          </div>
        </div>
      </div>
    </div>
  );
}