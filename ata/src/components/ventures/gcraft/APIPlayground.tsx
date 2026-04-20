import React, { useState } from 'react';
import { Play, Copy, CheckCircle, Code, Terminal } from 'lucide-react';

export function GcraftAPIPlayground() {
  const [selectedEndpoint, setSelectedEndpoint] = useState('verify-balance');
  const [response, setResponse] = useState('');
  const [loading, setLoading] = useState(false);
  const [copied, setCopied] = useState(false);

  const endpoints = [
    {
      id: 'verify-balance',
      method: 'POST',
      path: '/api/v1/cards/verify',
      description: 'Verify gift card balance',
      params: { 
        card_number: '6011000990139424',
        pin: '1234',
        retailer: 'amazon'
      },
      response: {
        verification_id: 'ver_abc123',
        retailer: 'Amazon',
        verified_balance: 95.50,
        verification_method: 'api_direct',
        is_valid: true,
        verified_at: '2025-11-30T10:45:23Z'
      },
    },
    {
      id: 'create-listing',
      method: 'POST',
      path: '/api/v1/listings',
      description: 'Create new gift card listing',
      params: { 
        retailer: 'Target',
        balance: 50.00,
        asking_price: 47.50,
        verification_id: 'ver_abc123'
      },
      response: {
        listing_id: 'lst_xyz789',
        retailer: 'Target',
        balance: 50.00,
        asking_price: 47.50,
        discount_percent: 5.0,
        status: 'active',
        created_at: '2025-11-30T10:45:23Z'
      },
    },
    {
      id: 'fraud-check',
      method: 'POST',
      path: '/api/v1/fraud/check',
      description: 'Run fraud detection on transaction',
      params: { 
        transaction_id: 'tx_def456',
        seller_history_score: 0.92,
        card_age_days: 14
      },
      response: {
        fraud_id: 'fraud_ghi789',
        ml_score: 0.02,
        risk_level: 'low',
        confidence: 0.97,
        flagged: false,
        factors: [
          { factor: 'seller_reputation', contribution: 0.35 },
          { factor: 'transaction_velocity', contribution: 0.28 }
        ]
      },
    },
    {
      id: 'process-payout',
      method: 'POST',
      path: '/api/v1/payouts',
      description: 'Process instant seller payout',
      params: { 
        transaction_id: 'tx_def456',
        amount: 47.50,
        seller_stripe_account: 'acct_xyz123'
      },
      response: {
        payout_id: 'po_jkl012',
        amount: 47.50,
        status: 'completed',
        stripe_transfer_id: 'tr_abc123xyz',
        processing_time_seconds: 138,
        completed_at: '2025-11-30T10:47:41Z'
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
    }, 650);
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
            <Terminal className="w-8 h-8 text-green-400" />
            <h1 className="text-white">API Playground</h1>
          </div>
          <p className="text-[#717182]">Test Gcraft Gift Card Marketplace API endpoints</p>
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
            <div className="text-2xl text-white mb-1">&lt;150ms</div>
            <div className="text-sm text-[#717182]">Avg Response Time</div>
          </div>
          <div className="glass-light glass-hover rounded-2xl p-6">
            <div className="text-2xl text-white mb-1">500+</div>
            <div className="text-sm text-[#717182]">Retailer Integrations</div>
          </div>
        </div>
      </div>
    </div>
  );
}