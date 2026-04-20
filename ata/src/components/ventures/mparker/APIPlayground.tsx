import React, { useState } from 'react';
import { Code, Play, Copy, Check } from 'lucide-react';

export function MparkerAPIPlayground() {
  const [selectedEndpoint, setSelectedEndpoint] = useState('parking/book');
  const [copied, setCopied] = useState(false);

  const endpoints = [
    { id: 'parking/book', method: 'POST', name: 'Book Parking Space', category: 'Parking' },
    { id: 'parking/status', method: 'GET', name: 'Get Parking Status', category: 'Parking' },
    { id: 'mobility/ride', method: 'POST', name: 'Start Ride', category: 'Mobility' },
    { id: 'user/profile', method: 'GET', name: 'Get User Profile', category: 'User' },
  ];

  const exampleCode = {
    'parking/book': `POST /api/v1/parking/book
{
  "user_id": "usr_12345",
  "space_id": "sp_789",
  "start_time": "2025-11-30T14:00:00Z",
  "duration_hours": 3,
  "vehicle_type": "sedan",
  "ev_charging": true
}`,
    'parking/status': `GET /api/v1/parking/status?location_id=loc_123
Response:
{
  "total_spaces": 156,
  "available": 42,
  "ev_charging_available": 12,
  "occupancy_rate": 73
}`,
    'mobility/ride': `POST /api/v1/mobility/ride
{
  "user_id": "usr_12345",
  "device_id": "dev_456",
  "device_type": "e-scooter",
  "start_location": {
    "lat": 45.4215,
    "lng": -75.6972
  }
}`,
    'user/profile': `GET /api/v1/user/profile?user_id=usr_12345
Response:
{
  "id": "usr_12345",
  "name": "John Doe",
  "email": "john@example.com",
  "membership_tier": "premium",
  "total_rides": 42,
  "carbon_saved_kg": 127.5
}`,
  };

  const handleCopy = () => {
    navigator.clipboard.writeText(exampleCode[selectedEndpoint as keyof typeof exampleCode]);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="min-h-screen relative overflow-hidden">
      <div className="relative z-10 p-8">
        <div className="mb-8">
          <div className="flex items-center gap-3 mb-2">
            <Code className="w-8 h-8 text-green-400" />
            <h1 className="text-white">API Playground</h1>
          </div>
          <p className="text-[#717182]">Interactive API Documentation & Testing</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="glass-light rounded-2xl p-6">
            <h3 className="text-white mb-4">Endpoints</h3>
            <div className="space-y-2">
              {endpoints.map((endpoint) => (
                <button
                  key={endpoint.id}
                  onClick={() => setSelectedEndpoint(endpoint.id)}
                  className={`w-full text-left p-3 rounded-lg transition-all ${
                    selectedEndpoint === endpoint.id
                      ? 'bg-white/10 border border-white/20'
                      : 'hover:bg-white/5'
                  }`}
                >
                  <div className="flex items-center gap-2 mb-1">
                    <span className={`text-xs px-2 py-0.5 rounded ${
                      endpoint.method === 'POST' ? 'bg-green-500/20 text-green-400' : 'bg-blue-500/20 text-blue-400'
                    }`}>
                      {endpoint.method}
                    </span>
                    <span className="text-white text-sm">{endpoint.name}</span>
                  </div>
                  <div className="text-xs text-[#717182]">{endpoint.category}</div>
                </button>
              ))}
            </div>
          </div>

          <div className="lg:col-span-2 glass-light rounded-2xl p-6">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-white">Example Request</h3>
              <div className="flex gap-2">
                <button
                  onClick={handleCopy}
                  className="px-4 py-2 bg-white/10 hover:bg-white/20 rounded-lg text-white text-sm flex items-center gap-2 transition-all"
                >
                  {copied ? <Check className="w-4 h-4" /> : <Copy className="w-4 h-4" />}
                  {copied ? 'Copied!' : 'Copy'}
                </button>
                <button className="px-4 py-2 bg-gradient-to-r from-green-500 to-emerald-500 hover:from-green-600 hover:to-emerald-600 rounded-lg text-white text-sm flex items-center gap-2 transition-all">
                  <Play className="w-4 h-4" />
                  Run
                </button>
              </div>
            </div>
            <pre className="bg-black/40 rounded-lg p-4 overflow-x-auto">
              <code className="text-green-400 text-sm font-mono">
                {exampleCode[selectedEndpoint as keyof typeof exampleCode]}
              </code>
            </pre>
          </div>
        </div>
      </div>
    </div>
  );
}